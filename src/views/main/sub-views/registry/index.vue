<template>
    <div>registry</div>
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex';

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
