<template>
    <el-container class="registry-services-info-content">
        <el-header>
            <el-select v-model="selectedGroup" placeholder="请选择">
                <el-option
                    v-for="item in groups"
                    :key="item[1].serviceGroupId"
                    :label="item[1].serviceGroupDescName"
                    :value="item[1].serviceGroupId"
                >
                </el-option>
            </el-select>
        </el-header>
        <el-main>
            <template v-for="item in services">
                <div
                    v-if="services.length > 0"
                    class="service-item"
                    :key="item.serviceId"
                >
                    <h3>{{ item.serviceDescName }}</h3>
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
            'selectedGroupId'
        ]),
        selectedGroup: {
            get() {
                return this.selectedGroupId;
            },
            set(value) {
                this.updateSelectedGroupId(value);
            }
        }
    },
    methods: {
        ...registryMapHelper.mapMutations(['updateSelectedGroupId'])
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
    .service-item {
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
