<template>
    <transition name="fade">
        <router-view></router-view>
    </transition>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import net from './net';

const {
    mapState,
    mapMutations,
    mapGetters,
    mapActions
} = createNamespacedHelpers('main/registry');

export default {
    name: 'boot',
    props: {},
    data() {
        return {
            updateRegistryInfoIntervalCode: undefined
        };
    },
    methods: {},
    beforeCreate() {},
    created() {
        net.init();

        this.updateRegistryInfoIntervalCode = setInterval(() => {
            net.getRegistryInfo();
        }, 5000);
    },
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {
        clearInterval(this.updateRegistryInfoIntervalCode);
        this.updateRegistryInfoIntervalCode = undefined;
    },
    destroyed() {}
};
</script>

<style lang="scss">
@import '@/css/common.scss';

.registry-item-box {
    width: 280px;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid #fff;

    &:hover {
        border: 1px solid $color-primary;
    }
}
</style>
