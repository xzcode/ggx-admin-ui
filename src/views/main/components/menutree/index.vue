<template>
    <div class="menutree">
        <template v-for="(item, index) in data">
            <el-submenu v-if="item.children" :index="item.path" :key="index">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{ item.name }}</span>
                </template>

                <menutree :data="item.children" :key="index" />
            </el-submenu>

            <el-menu-item v-else :index="item.path" :key="index">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
import menutree from './';

export default {
    name: 'menutree',
    components: {
        menutree
    },
    props: ['data'],
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="scss">
.el-menu--collapse > .el-menu-item span,
.el-menu--collapse .el-submenu .el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
}
.el-menu--collapse > .el-menu-item .el-submenu__icon-arrow,
.el-menu--collapse .el-submenu .el-submenu__title .el-submenu__icon-arrow {
    display: none;
}

.el-menu--collapse .el-submenu [class^='el-icon-'],
.el-menu--collapse .el-menu-item [class^='el-icon-'] {
    font-size: 28px;
}
</style>
