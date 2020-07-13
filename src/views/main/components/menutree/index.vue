<template>
    <div class="menutree">
        <template v-for="(item, index) in data">
            <template v-if="item.isMenu">
                <el-submenu
                    v-if="item.children"
                    :index="item.path"
                    :key="index"
                >
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{ item.menuName }}</span>
                    </template>

                    <menutree :data="item.children" :key="index" />
                </el-submenu>

                <el-menu-item v-else :index="item.path" :key="index">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.menuName }}</span>
                </el-menu-item>
            </template>
        </template>
    </div>
</template>

<script>
import menutree from './index.vue';

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

<style lang="scss"></style>
