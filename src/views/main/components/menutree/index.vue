<template>
  <div class="menutree">
    <template v-for="(item, index) in data">
      

      <el-submenu v-if="item.children" :index="item.index" :key="index">

        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>

        <menutree :data="item.children" :key="index" />

      </el-submenu>

      <el-menu-item v-else :index="item.index" :key="index">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>

    </template>

  </div>
</template>

<script >
import menutree from "./";

export default {
  name: "menutree",
  props: ["data"],
  data() {
    return {};
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
</style>
