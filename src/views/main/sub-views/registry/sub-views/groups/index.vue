<template>
    <div class="registry-group-content">
        <!-- <div v-for="key in groups.keys()" :key="key" class="registry-item-box">
            <h3>{{ groups.get(key)[0].serviceGroupDescName || key }}</h3>
            <h3>{{ groups.get(key).length }}</h3>
        </div> -->
        <div ref="registry-group-chart" id="registry-group-chart"></div>
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
    name: 'registry-groups',
    props: {},
    data() {
        return {};
    },
    computed: {
        ...mapState(['groups'])
    },
    watch: {
        groups(newVal, oldVal) {
            // 绘制图表
            this.myChart.setOption(this.getOptions());
        }
    },
    methods: {
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
                    text: '注册中心分组视图',
                    subtext: '分组数 ( ' + data.length + ' )',
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
            document.getElementById('registry-group-chart'),
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

.registry-group-content {
    display: flex;
    flex-wrap: wrap;
    height: 100%;

    .registry-item-box {
        margin: 10px;
    }
    #registry-group-chart {
        width: 100%;
        height: 100%;
    }
}
</style>
