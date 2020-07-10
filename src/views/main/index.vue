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
                :class="[leftMenu.isCollapse ? 'collapsed' : '']"
                :collapse-transition="true"
                @select="menuSelect"
                :default-active="activeMenu.path"
            >
                <div class="main-logo" v-if="!leftMenu.isCollapse">
                    <div style="min-width: 200px;">GGX ADMIN UI</div>
                </div>

                <menutree :data="menus" />
            </el-menu>
        </el-aside>

        <el-container class="main-right-side">
            <el-header class="main-header">
                <div class="sfold" @click="menuCollapse">
                    <i
                        :class="
                            leftMenu.isCollapse
                                ? 'el-icon-s-unfold'
                                : 'el-icon-s-fold'
                        "
                    ></i>
                </div>
                <el-breadcrumb separator="/" class="breadcrumb">
                    <transition-group name="fade">
                        <template
                            v-for="(item, index) in selectedTab.fullnames"
                        >
                            <el-breadcrumb-item :key="index">
                                <b>{{ item }}</b>
                            </el-breadcrumb-item>
                        </template>
                    </transition-group>
                </el-breadcrumb>

                <usermenu />

                <div class="tool-bar">
                    <el-button @click="triggerFullscreen">
                        <i class="el-icon-rank"></i>
                    </el-button>
                </div>
            </el-header>

            <tabbar />

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
import menutree from './components/menutree/index.vue';
import tabbar from './components/tab-bar/index.vue';
import usermenu from './components/user-menu/index.vue';
import { createNamespacedHelpers } from 'vuex';

const {
    mapState,
    mapMutations,
    mapGetters,
    mapActions
} = createNamespacedHelpers('main');

export default {
    components: {
        menutree,
        tabbar,
        usermenu
    },
    computed: {
        ...mapState(['menus', 'tabs', 'leftMenu', 'activeMenu', 'userInfo']),
        selectedTab() {
            const filterTabs = this.tabs.filter((e, i) => e.active);
            return filterTabs.length > 0 && filterTabs[0];
        }
    },
    methods: {
        ...mapMutations([
            'triggerFullscreen',
            'menuCollapse',
            'menuSelect',
            'initTabs'
        ])
    },
    created() {
        this.initTabs();
    }
};
</script>

<style lang="scss">
@import '@/css/common.scss';

.main-logo {
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 60px;
    overflow: hidden;
}

.main-container {
    height: 100%;
    background: #f3f4f7;

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
            width: 200px;
        }
    }

    .main-right-side {
        $header-height: 60px;

        .main-header {
            height: $header-height;
            background: #ffffff;
            /*  margin-bottom: 5px;
      border-bottom: 1px solid #b7b7b7;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.38), 0 0 6px 0 rgba(0, 0, 0, 0.08); */

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
