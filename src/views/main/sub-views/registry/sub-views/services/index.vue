<template>
    <el-container class="registry-services-info-content">
        <el-header class="search-bar">
            <span class="search-bar-label">分组选择:</span>
            <el-select v-model="selectedGroup" placeholder="请选择">
                <el-option :value="undefined">-全部分组-</el-option>
                <el-option
                    v-for="item in groups"
                    :key="item[1].serviceGroupId"
                    :label="item[1].serviceGroupDescName"
                    :value="item[1].serviceGroupId"
                >
                </el-option>
            </el-select>
            <span class="search-bar-label">关键字搜索:</span>
            <el-input
                v-model="keyword"
                style="width: 260px;"
                placeholder="请输入关键字"
            ></el-input>
        </el-header>
        <el-main class="services-container">
            <template v-for="item in services">
                <div
                    v-if="services.length > 0"
                    class="service-item"
                    :key="item.serviceId"
                >
                    <div class="service-item-title">
                        {{ item.serviceDescName }}
                    </div>
                    <div class="service-item-id">{{ item.serviceName }}</div>
                    <div class="service-item-id">{{ item.serviceGroupId }}</div>
                    <div class="service-item-id">{{ item.serviceId }}</div>
                    <div class="service-item-id">{{ item.host }}</div>
                    <div class="service-item-id">
                        <template v-for="(cuitem, index) in item.customData">
                            <div
                                :key="'cuitem' + index"
                                v-if="cuitem.key == 'ROUTER_SERVICE_PORT'"
                            >
                                {{ cuitem.key }}: {{ cuitem.value }}
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </el-main>
    </el-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const registryMapHelper = createNamespacedHelpers('main/registry');

export default {
    name: 'registry-services',
    components: {},
    props: {},
    data() {
        return {};
    },
    computed: {
        ...registryMapHelper.mapState([
            'services',
            'groups',
            'searchGroupId',
            'searchKeyword'
        ]),
        selectedGroup: {
            get() {
                return this.searchGroupId;
            },
            set(value) {
                this.updateSearchGroupId(value);
            }
        },
        keyword: {
            get() {
                return this.searchGroupId;
            },
            set(value) {
                this.updateSearchGroupId(value);
            }
        }
    },
    methods: {
        ...registryMapHelper.mapMutations([
            'updateSearchGroupId',
            'updateSearchKeyword'
        ])
    },
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
    .services-container {
        display: flex;
        flex-wrap: wrap;
        .service-item {
            width: 300px;
            background: #fff;
            border-radius: 5px;
            padding: 10px;
            border: 1px solid #dcdfe6;
            margin: 10px;
            overflow: hidden;
            &:hover {
                border: 1px solid #bbb;
            }

            .service-item-title {
                font-weight: bold;
                text-align: center;
                padding: 10px;
            }
            .service-item-id {
                font-size: 12px;
                text-align: center;
                padding: 5px;
            }
        }
    }

    .search-bar {
        line-height: 40px;
        .search-bar-label {
            display: inline-block;
            padding: 10px;
        }
    }
}
</style>
