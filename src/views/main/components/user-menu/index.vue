<template>
    <div class="user-menu">
        <el-dropdown trigger="click">
            <el-image class="avatar" :src="userInfo.avatar" fit="cover">
                <template slot="error">
                    <div
                        class="default-avatar"
                        style="
                            width: 100%;
                          height: 100%;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          font-size: 24px;
                          color: #ccc;
                            "
                    >
                        <i class="el-icon-user-solid"></i>
                    </div>
                </template>
            </el-image>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user-solid">{{
                    userInfo.username
                }}</el-dropdown-item>
                <el-dropdown-item icon="el-icon-lock" command="b" divided
                    >修改密码</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-warning-outline" command="a"
                    >注销</el-dropdown-item
                >
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const {
    mapState,
    mapMutations,
    mapGetters,
    mapActions
} = createNamespacedHelpers('user');

export default {
    name: 'UserMenu',
    props: {},
    data() {
        return {};
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
@import '@/css/common.scss';
$header-height: 60px;
.user-menu {
    height: $header-height;
    width: 50px;
    float: right;
    cursor: pointer;
    color: $color-primary;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-dropdown {
        color: $color-primary;

        .avatar {
            height: 36px;
            width: 36px;
            padding: 5px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            border: 1px solid #ebeef5;

            .default-avatar {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 24px;
                color: #ccc;
            }
        }
    }
}
</style>
