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
        :collapse-transition="true"
        @select="menuSelect"
        :default-active="activeMenu.path"
      >
        <div class="main-logo">
          <div v-if="!leftMenu.isCollapse">GG ADMIN UI</div>
          <div v-if="leftMenu.isCollapse">GG</div>
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
            <el-breadcrumb-item  :key="index">{{item}}</el-breadcrumb-item>
          </template>
          </transition-group>
        </el-breadcrumb>

        <div class="user-menu">
          <el-dropdown trigger="click">
            <el-image
              class="avatar"
              :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
              fit="cover"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user-solid">{{userInfo.username}}</el-dropdown-item>
              <el-dropdown-item icon="el-icon-lock" command="b" divided>修改密码</el-dropdown-item>
              <el-dropdown-item icon="el-icon-warning-outline" command="a">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="tool-bar">
          <el-button @click="triggerFullscreen">
            <i class="el-icon-rank"></i>
          </el-button>
        </div>
      </el-header>

      <tab-bar/>

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
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapGetters, mapActions } = createNamespacedHelpers('main');

import menutree from "./components/menutree";
import tabbar from "./components/tab-bar";

export default {
  components: {
    menutree,
    'tab-bar': tabbar
  },
  data() {
    return {};
  },
  created() {
    this.initTabs();
  },
  computed: {
    ...mapState([
      'menus',
      'tabs',
      'leftMenu',
      'activeMenu',
      'userInfo',
    ]),
    selectedTab() {
      let filterTabs = this.tabs.filter((e, i) => e.active);
      return filterTabs.length > 0 && filterTabs[0];
    }
  },
  methods: {
    ...mapMutations([
      'triggerFullscreen',
      'menuCollapse',
      'menuSelect',
      'initTabs',
    ])
  }
  
};
</script>

<style  scoped lang="scss">
@import "@/css/common.scss";

.main-left-side::-webkit-scrollbar-track {
  /* 定义滚动条轨道  内阴影+圆角*/
  background-color: $color-dark;
  border: none;
  width: 5px;
  margin: 0px;
  padding: 0px;
}

.main-left-side::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  border: none;
  margin: 0px;
  padding: 0px;
  background-color: $color-dark;
}

.main-left-side::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  background-color: #ccc;
}

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

    .left-menu {
      height: 100%;
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
        font-weight: bold;
      }

      .user-menu {
        height: $header-height;
        width: 50px;
        float: right;
        cursor: pointer;
        color: $color-primary;
        display: flex;
        justify-content: center;
        align-items: center;

        .avatar {
          height: 36px;
          width: 36px;
          padding: 5px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          border: 1px solid #ebeef5;
        }

        .el-dropdown {
          color: $color-primary;
        }
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

      .tabs {
        height: 100%;

        .el-tabs__nav-wrap {
          padding-left: 32px;

          .el-tabs__nav-prev {
            width: 32px;
            height: 38px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            font-size: 22px;
            background-color: #fff;
            border-bottom: 1px solid #ccc;
          }
        }

      }
    }
  }

  .main-footer {
    display: none;
  }
}
</style>
