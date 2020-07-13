<template>
    <div></div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const {
    mapState,
    mapMutations,
    mapGetters,
    mapActions
} = createNamespacedHelpers('main/registry');

export default {
    name: 'registry-services',
    props: {},
    data() {
        return {};
    },
    methods: {},
    beforeCreate() {},
    created() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {}
};
</script>

<style lang="scss">
@import '@/css/common.scss';
</style>
