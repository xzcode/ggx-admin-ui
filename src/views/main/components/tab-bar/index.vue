<template>
  <div class="tab-bar">
    <div class="tab-bar-container">
      <div class="prev-tab">
        <i class="el-icon-caret-left"></i>
      </div>

      <div class="tab-container">
        <template v-for="(item) in data">
          <div class="tab" :key="item.path">{{item.name}}</div>
        </template>
      </div>

      <div class="next-tab">
        <i class="el-icon-caret-right"></i>
      </div>

      <el-dropdown class="options" placement="bottom-start">
        <i class="el-icon-circle-close"></i>
        <el-dropdown-menu slot="dropdown" class="menu">
          <el-dropdown-item class="menu-item" icon="el-icon-error">关闭当前</el-dropdown-item>
          <el-dropdown-item class="menu-item" icon="el-icon-caret-left">关闭左侧</el-dropdown-item>
          <el-dropdown-item class="menu-item" icon="el-icon-caret-right">关闭右侧</el-dropdown-item>
          <el-dropdown-item class="menu-item" icon="el-icon-info">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script >
export default {
  name: "tab-bar",
  props: ["data"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
$tab-bar-height: 38px;

.tab-bar {
  height: $tab-bar-height;
  width: 100%;
  
  border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);

  .tab-bar-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    
  }

  .tab-container::-webkit-scrollbar-track {
    /* 定义滚动条轨道  内阴影+圆角*/
    border-radius: 5px;
    background-color: #f5f5f5;
  }

  .tab-container::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    height: 4px;
    background-color: #cccccc;
    border-radius: 5px;
  }

  .tab-container::-webkit-scrollbar:hover {
    background-color: #555555;
  }

  .tab-container::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    background-color: rgb(148, 148, 148);
  }

  .tab-container::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  .prev-tab,
  .next-tab,
  .options {
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    padding: 2px 0px;

  }

  .options {

    .menu-item {
        min-width: 120px;
      }
  }


  .tab-container {
    height: $tab-bar-height;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;

    .tab {
      flex: none;
      height: $tab-bar-height - 16px;
      width: fit-content;
      min-width: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #dcdfe6;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
      margin: 5px 5px;
    }
  }
}
</style>
