<template>
    <div class="registry-chart-view-content">
        <div class="registry-group-chart-area">
            <RegistryGroupsChart />
        </div>
        <div class="registry-service-chart-area">
            <RegistryServicesChart />
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import RegistryGroupsChart from './components/groups-chart';
import RegistryServicesChart from './components/services-chart';
const echarts = require('echarts');
const {
    mapState,
    mapMutations,
    mapGetters,
    mapActions
} = createNamespacedHelpers('main/registry');

export default {
    name: 'registry-groups',
    components: {
        RegistryGroupsChart,
        RegistryServicesChart
    },
    props: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
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

.registry-chart-view-content {
    display: flex;
    flex-wrap: wrap;
    height: 100%;

    .registry-group-chart-area {
        width: 50%;
    }

    .registry-service-chart-area {
        width: 50%;
    }
}
</style>
