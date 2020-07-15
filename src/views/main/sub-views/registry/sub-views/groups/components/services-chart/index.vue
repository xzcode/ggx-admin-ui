<template>
    <div class="registry-service-chart-content">
        <div ref="registry-service-chart" id="registry-service-chart"></div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const echarts = require('echarts');
const {
    mapState,
    mapMutations,
    mapGetters,
    mapActions
} = createNamespacedHelpers('main/registry');

export default {
    name: 'RegistryServicesChart',
    props: {},
    data() {
        return {};
    },
    computed: {
        ...mapState(['groups', 'selectedGroupId'])
    },
    watch: {
        groups(newVal, oldVal) {
            // 绘制图表
            this.myChart.setOption(this.getOptions());
        },
        selectedGroupId(newVal, oldVal) {
            // 绘制图表
            this.myChart.setOption(this.getOptions());
        }
    },
    methods: {
        getOptions() {
            const group = this.groups.get(this.selectedGroupId);
            const data = [];
            let loadbalancerData = [];
            let serviceData = [];
            if (group) {
                loadbalancerData = group.services.filter(
                    e => e.serviceName.indexOf('loadbalancer') !== -1
                );
                serviceData = group.services.filter(
                    e => e.serviceName.indexOf('loadbalancer') === -1
                );

                if (loadbalancerData && loadbalancerData.length > 0) {
                    data.push({
                        name:
                            loadbalancerData[0].serviceDescName ||
                            loadbalancerData[0].serviceId,
                        value: loadbalancerData.length
                    });
                }
                if (serviceData && serviceData.length > 0) {
                    data.push({
                        name:
                            serviceData[0].serviceDescName ||
                            serviceData[0].serviceId,
                        value: serviceData.length
                    });
                }
            }
            const option = {
                title: {
                    text:
                        group.serviceGroupDescName ||
                        group.serviceGroupId ||
                        ' 视图',
                    subtext: `${
                        loadbalancerData.length > 0
                            ? '负载均衡服务数 (' +
                              loadbalancerData.length +
                              ')  '
                            : ''
                    }服务数(${serviceData.length})`,
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c}'
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    left: 10,
                    formatter: function(name, e) {
                        let num = 0;
                        for (let i = 0; i < data.length; i++) {
                            const d = data[i];
                            if (d.name === name) {
                                num = d.value;
                                break;
                            }
                        }
                        return `${name} (${num})`;
                    }
                },
                series: [
                    {
                        name: '服务数量',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        label: {
                            show: true,
                            formatter: '{b} ({c})'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '16',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: true
                        },
                        data: data
                    }
                ]
            };

            return option;
        }
    },
    beforeCreate() {},
    created() {},
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(
            document.getElementById('registry-service-chart'),
            'default'
        );
        // 绘制图表
        this.myChart.setOption(this.getOptions());

        // 添加点击事件
        this.myChart.on('click', data => {
            console.log(data);
        });
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {}
};
</script>

<style lang="scss">
@import '@/css/common.scss';

.registry-service-chart-content {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;

    .registry-item-box {
        margin: 10px;
    }
    #registry-service-chart {
        width: 100%;
        height: 100%;
    }
}
</style>
