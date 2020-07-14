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
        groups(newVal, oldVal) {
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
        ...mapMutations(['updateSelectedGroupId']),
        routeToRegistry() {
            this.$store.commit('main/tabClick', '/main/registry/groups');
        },
        getOptions() {
            const data = [];
            this.groups.forEach((e, k) => {
                data.push({
                    value: e.length,
                    serviceGroupId: e[0].serviceGroupId,
                    name: e[0].serviceGroupDescName || k
                });
            });
            const option = {
                title: {
                    text: '    注册中心',
                    subtext: `分组数(${data.length}) 服务数(${this.services.length})`,
                    left: '45%'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c}'
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    itemWidth: 16,
                    itemHeight: 8,
                    padding: 2,
                    left: 0,
                    textStyle: {
                        fontSize: 10
                    },
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
                        width: '90%',
                        height: '90%',
                        radius: ['50%', '70%'],
                        center: ['75%', '60%'],
                        label: {
                            show: false,
                            fontSize: 11,
                            formatter: '{b} ({c})'
                        },
                        emphasis: {
                            label: {
                                show: false,
                                fontSize: '11',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false,
                            length: 0
                        },
                        data: data
                    }
                ]
            };

            return option;
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
            'default'
        );
        // 绘制图表
        this.myChart.setOption(this.getOptions());

        // 添加点击事件
        this.myChart.on('click', e => {
            console.log(e);
            this.updateSelectedGroupId(e.data.serviceGroupId);
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

.registry-dashboard-plugin {
    width: 300px;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid #fff;

    &:hover {
        border: 1px solid $color-primary;
    }

    #chart01 {
        height:260px;
    }
}
</style>
