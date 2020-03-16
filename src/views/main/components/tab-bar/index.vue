<template>
  <div class="tab-bar">
    <div class="tab-bar-container">
      <!-- 
      <div class="prev-tab">
        <i class="el-icon-caret-left"></i>
      </div>
      -->
      <transition-group name="fade" class="tab-container" @mousewheel.native="tabBarScroll">
        <template v-for="(item) in tabs">
          <div class="tab" :key="item.path">
            <span
              @click="tabClick(item.path)"
              class="content"
              :class=" item.active ? 'active' : '' "
            >{{item.name}}</span>
            <i
              @click="tabRemove(item.path)"
              :class="item.closeable?'show':''"
              class="el-icon-error close-btn"
            ></i>
          </div>
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
import { createNamespacedHelpers } from "vuex";
const {
  mapState,
  mapMutations,
  mapGetters,
  mapActions
} = createNamespacedHelpers("main");

export default {
  name: "tab-bar",
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  computed: {
    ...mapState(["tabs"])
  },
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
      console.log(e)
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

  border: 1px solid #dcdfe6;
  border-left: none;
  border-right: none;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);

  .tab-bar-container {
    padding-right: 40px;
    position: relative;
  }

  .tab-container {
    &::-webkit-scrollbar-track {
      /* 定义滚动条轨道  内阴影+圆角*/
      border-radius: 5px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 2px;
      height: 2px;
      background-color: #cccccc;
      border-radius: 5px;
    }

    &::-webkit-scrollbar:hover {
      background-color: $color-primary;
    }

    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      background-color: #fff;
    }

    &:hover::-webkit-scrollbar-thumb {
      background-color: $color-primary;
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
    width: 40px;
    height: 40px;
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

    .tab {
      flex: none;
      height: $tab-bar-height - 10px;
      width: fit-content;
      min-width: 60px;

      border: 1px solid #dcdfe6;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
      margin: 4px 4px;
      position: relative;

      padding: 0px 18px;

      .content {
        font-size: 12px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:hover {
          color: $color-primary;
        }

        &.active {
          color: $color-primary;
        }
      }

      .close-btn {
        position: absolute;
        top: 0;
        right: 0;
        color: #ccc;
        cursor: pointer;
        display: none;

        .show {
          display: block;
        }

        &:hover {
          color: $color-primary;
        }
      }

      &:hover .close-btn.show {
        display: block;
      }
    }
  }
}
</style>
