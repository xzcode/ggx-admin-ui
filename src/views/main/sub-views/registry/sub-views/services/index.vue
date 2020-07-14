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
    components: {},
    props: {},
    data() {
        return {};
    },
    computed: {},
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

.registry-services-info-content {
    .registry-services-info-card {
        width: 300px;
        background: #fff;
        border-radius: 5px;
        padding: 10px;
        border: 1px solid #fff;

        &:hover {
            border: 1px solid $color-primary;
        }
    }
}
</style>
