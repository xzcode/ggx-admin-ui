<template>
    <div id="app-container">
        <networkstatus />
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import networkstatus from '@/components/network-status';
export default {
    components: {
        networkstatus
    }
};
</script>

<style>
html,
body,
#app,
#app-container {
    height: 100%;
    margin: 0px;
    padding: 0px;
    width: 100%;
    min-height: 500px;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.fade-enter-active,
.fade-leave-avtive {
    transition: all 1s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}
#nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    left: 15px;
}
</style>
