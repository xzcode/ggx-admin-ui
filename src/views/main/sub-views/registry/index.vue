<template>
    <div>
        <div class="registry-content">registry-content</div>
    </div>
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

.registry-content {
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
