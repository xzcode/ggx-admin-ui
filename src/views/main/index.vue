<template>
  <el-container class="main-container">
    <el-aside class="main-left-side" width="auto">
      <el-menu
        class="left-menu"
        :router="true"
        :collapse="leftMenu.isCollapse"
        background-color="#232323"
        text-color="#ffffff"
        active-text-color="#409EFF"
        :class="[leftMenu.isCollapse ? 'collapsed' : '' ]"
        :collapse-transition="false"
        @select="menuSelect"
        :default-active="activeMenu.path"
      >
        <div class="main-logo">
          <transition name="fade">
            <div v-if="!leftMenu.isCollapse">GG ADMIN UI</div>
            <div v-if="leftMenu.isCollapse">GG</div>
          </transition>
        </div>

        <menutree :data="menus" />
      </el-menu>
    </el-aside>

    <el-container class="main-right-side">
      <el-header class="main-header">
        <div class="sfold" @click="menuCollapse">
          <i :class="leftMenu.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>
        <el-breadcrumb separator="/" class="breadcrumb">
          <transition-group name="fade">
            <template v-for="(item, index) in selectedTab.fullnames">
              <el-breadcrumb-item :key="index">
                <b>{{item}}</b>
              </el-breadcrumb-item>
            </template>
          </transition-group>
        </el-breadcrumb>

        <user-menu />

        <div class="tool-bar">
          <el-button @click="triggerFullscreen">
            <i class="el-icon-rank"></i>
          </el-button>
        </div>
      </el-header>

      <tab-bar />

      <el-main class="main-content">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </el-main>

      <el-footer class="main-footer">Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState,
  mapMutations,
  mapGetters,
  mapActions
} = createNamespacedHelpers("main");

import menutree from "./components/menutree";
import tabbar from "./components/tab-bar";
import usermenu from "./components/user-menu";

export default {
  components: {
    menutree,
    "tab-bar": tabbar,
    "user-menu": usermenu
  },
  data() {
    return {};
  },
  created() {
    this.initTabs();
  },
  computed: {
    ...mapState(["menus", "tabs", "leftMenu", "activeMenu", "userInfo"]),
    selectedTab() {
      let filterTabs = this.tabs.filter((e, i) => e.active);
      return filterTabs.length > 0 && filterTabs[0];
    }
  },
  methods: {
    ...mapMutations([
      "triggerFullscreen",
      "menuCollapse",
      "menuSelect",
      "initTabs"
    ])
  }
};
</script>

<style  scoped lang="scss">
@import "@/css/common.scss";

.main-logo {
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 60px;
}

.main-container {
  height: 100%;

  .main-left-side {
    height: 100%;

    @mixin clean-scrollbar {
      border: none;
      width: 5px;
      margin: 0px;
      padding: 0px;
    }

    &::-webkit-scrollbar-track {
      /* 定义滚动条轨道  */
      background-color: $color-dark;
      @include clean-scrollbar;
    }

    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      @include clean-scrollbar;
    }

    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      background-color: $color-info;
      @include clean-scrollbar;
    }

    .left-menu {
      height: 100%;
      border: none;
    }

    .left-menu:not(.el-menu--collapse) {
      width: 260px;
    }

    .collapsed {
      width: fit-content;
    }
  }

  .main-right-side {
    $header-height: 60px;

    .main-header {
      height: $header-height;

      .sfold {
        height: $header-height;
        width: $header-height;
        line-height: $header-height;
        float: left;
        font-size: 28px;
        cursor: pointer;
      }

      .breadcrumb {
        height: $header-height;
        line-height: $header-height;
        float: left;
      }

      .tool-bar {
        height: $header-height;
        line-height: $header-height;
        float: right;
        margin-right: 10px;
        display: flex;
        align-items: center;

        button {
          margin: 0px 5px;
          border: none;
          font-size: 22px;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .main-content {
      padding: 8px;
      overflow: hidden;
    }

    .main-footer {
      display: none;
    }
  }
}
</style>
