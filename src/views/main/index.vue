<template>
  <el-container class="main-container">
    <el-aside class="main-left-side">
      <el-menu
        class="left-menu"
        default-active="2"
        :collapse="leftMenu.isCollapse"
        @open="menuOpen"
        @close="menuClose"
        background-color="#232323"
        text-color="#ffffff"
        active-text-color="#409EFF"
        :class="[leftMenu.isCollapse ? 'collapsed' : '' ]"
      >

      <menutree :data="menus" />


      </el-menu>
    </el-aside>

    <el-container class="main-right-side">
      <el-header class="main-header">
        <div class="sfold" @click="menuCollapse">
          <i class="el-icon-s-fold"></i>
        </div>
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">活动管理</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>

      <el-main class="main-content">
        <el-tabs type="border-card" closable class="tabs">
          <el-tab-pane label="用户管理"></el-tab-pane>
          <el-tab-pane label="配置管理"></el-tab-pane>
          <el-tab-pane label="角色管理"></el-tab-pane>
          <el-tab-pane label="定时任务补偿"></el-tab-pane>
          <router-view></router-view>
        </el-tabs>
      </el-main>

      <el-footer class="main-footer">Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import mapStore from "@/util/map-store-util";
import menutree from "./components/menutree";

export default {
  extends: mapStore("main"),
  components: {
    menutree
  },
  data () {
    return {
      
    }
  }
};
</script>

<style  scoped lang="scss">
.main-left-side::-webkit-scrollbar-track {
  /* 定义滚动条轨道  内阴影+圆角*/
  border-radius: 5px;
  background-color: #f5f5f5;
}

.main-left-side::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px;
  background-color: #555555;
  border-radius: 5px;
}

.main-left-side::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  background-color: #555;
}

.main-container {
  height: 100%;

  .main-left-side {
    height: 100%;

    .left-menu {
      height: 100%;
      width: 300px;
    }
    .collapsed {
      width: fit-content;
    }
  }

  .main-right-side {
    $header-height: 60px;

    .main-header {
      height: $header-height;
    }

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
    }


    .tabs {
      height: 100%;
    }
  }


  .main-footer {
    display: none;
  }

}
</style>
