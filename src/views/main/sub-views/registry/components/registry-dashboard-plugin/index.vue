<template>
    <div @click="routeToRegistry" class="registry-dashboard-plugin">
        <div ref="chart01" id="chart01"></div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import net from '../../net';
var echarts = require('echarts');

const {
    mapState,
    mapMutations,
    mapGetters,
    mapActions
} = createNamespacedHelpers('main/registry');

export default {
    name: 'RegistryDashboardPlugin',
    props: {},
    data() {
        return {};
    },
    watch: {
        services(newVal, oldVal) {
            // 绘制图表
            this.myChart.setOption(this.getOptions());
        }
    },
    computed: {
        ...mapState(['services', 'groups']),
        groupNum() {
            return this.groups.size;
        },
        serviceNum() {
            return this.services.length;
        }
    },
    methods: {
        routeToRegistry() {
            this.$store.commit('main/tabClick', '/main/registry');
        },
        getOptions() {
            return {
                title: {
                    text: '注册中心'
                },
                tooltip: {},
                xAxis: {
                    data: ['分组数', '服务数']
                },
                yAxis: {},
                series: [
                    {
                        name: '数量',
                        type: 'bar',
                        data: [this.groupNum, this.serviceNum],
                        showBackground: true,
                        backgroundStyle: {
                            color: '#ccc'
                        },
                        label: {
                            show: true
                        }
                    }
                ]
            };
        }
    },
    beforeCreate() {},
    created() {
        net.init();
    },
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(
            document.getElementById('chart01'),
            'light'
        );
        // 绘制图表
        this.myChart.setOption(this.getOptions());
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {}
};
</script>

<style lang="scss">
@import '@/css/common.scss';

.registry-dashboard-plugin {
    width: 280px;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid #fff;

    &:hover {
        border: 1px solid $color-primary;
    }

    #chart01 {
        height: 200px;
    }
}
</style>
