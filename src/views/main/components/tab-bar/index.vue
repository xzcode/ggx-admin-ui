<template>
  <div class="tab-bar">
    <div class="tab-bar-container">
      <!-- 
      <div class="prev-tab">
        <i class="el-icon-caret-left"></i>
      </div>
      -->
      <transition-group
        name="fade"
        class="tab-container"
        id="tab-container"
        @mousewheel.native="tabBarScroll"
        ref="tabContainer"
      >
        <template v-for="(item) in tabs">
          <tab :key="item.path" :data="item" />
        </template>
      </transition-group>

      <!-- 
      <div class="next-tab">
        <i class="el-icon-caret-right"></i>
      </div>
      -->
      <el-dropdown
        class="options"
        placement="bottom-start"
        type="button"
        @command="tabMenuCommand"
        trigger="click"
      >
        <i class="el-icon-caret-bottom"></i>
        <el-dropdown-menu slot="dropdown" class="menu">
          <el-dropdown-item command="close-current" class="menu-item" icon="el-icon-error">关闭当前</el-dropdown-item>
          <el-dropdown-item command="close-left" class="menu-item" icon="el-icon-caret-left">关闭左侧</el-dropdown-item>
          <el-dropdown-item command="close-right" class="menu-item" icon="el-icon-caret-right">关闭右侧</el-dropdown-item>
          <el-dropdown-item command="close-all" class="menu-item" icon="el-icon-info">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script >
import tab from "./component/tab";
import { createNamespacedHelpers } from "vuex";
const {
  mapState,
  mapMutations,
  mapGetters,
  mapActions
} = createNamespacedHelpers("main");

export default {
  name: "tab-bar",
  components: {
    tab
  },
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("scroll", this.tabBarScroll, true);
  },
  computed: {
    ...mapState(["tabs", "activeTab"])
  },
  watch: {},
  methods: {
    ...mapMutations([
      "tabClick",
      "tabRemove",
      "tabRemoveCurrent",
      "tabRemoveLeft",
      "tabRemoveRight",
      "tabRemoveAll"
    ]),
    tabBarScroll(e) {
      if (e.type == "scroll") {
        return;
      }
      let _this = this.$refs.tabContainer.$el;
      var step = 30;
      if (e.deltaY < 0) {
        //向上滚动鼠标滚轮，屏幕滚动条左移
        _this.scrollLeft -= step;
      } else {
        //向下滚动鼠标滚轮，屏幕滚动条右移
        _this.scrollLeft += step;
      }
    },
    tabMenuCommand(command) {
      switch (command) {
        case "close-current":
          this.tabRemoveCurrent();
          break;
        case "close-left":
          this.tabRemoveLeft();
          break;
        case "close-right":
          this.tabRemoveRight();
          break;
        case "close-all":
          this.tabRemoveAll();
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/css/common.scss";

$tab-bar-height: 38px;

.tab-bar {
  height: $tab-bar-height;
  width: 100%;
  background-color: #efefef;
  border-bottom: 1px solid #dfdfdf;

  /*  border: 1px solid #dcdfe6;
  border-left: none;
  border-right: none;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04); */

  .tab-bar-container {
    padding-right: 40px;
    position: relative;
  }

  .tab-container {
    &::-webkit-scrollbar-track {
      /* 定义滚动条轨道  内阴影+圆角*/
      border-radius: 5px;
      background-color: #fff;
    }

    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 2px;
      height: 2px;
      background-color: #fff;
      border-radius: 5px;
    }

    &::-webkit-scrollbar:hover {
      background-color: $color-info;
    }

    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      background-color: #fff;
    }

    &:hover::-webkit-scrollbar-thumb {
      background-color: $color-info;
    }
  }

  .prev-tab,
  .next-tab,
  .options {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 0px;
    color: #555555;
  }
  .prev-tab,
  .next-tab {
    font-size: 28px;
    min-width: 30px;
  }

  .options {
    width: 34px;
    height: 34px;
    font-size: 16px;
    position: absolute;
    right: 0px;
    top: 0px;

    .menu-item {
      min-width: 120px;
    }
  }
  .prev-tab:hover,
  .next-tab:hover,
  .options:hover {
    color: $color-primary;
    cursor: pointer;
  }

  .tab-container {
    height: $tab-bar-height;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
  }
}
</style>
