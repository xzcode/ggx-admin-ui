<template>
    <div class="tab" :id="data.path">
        <span class="active-point" :class="data.active ? 'active' : ''"></span>
        <span @click="tabClick(data.path)" class="content">{{
            data.name
        }}</span>
        <i
            @click="tabRemove(data.path)"
            :class="data.closeable ? 'show' : ''"
            class="el-icon-error close-btn"
        ></i>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const {
    mapState,
    mapMutations,
    mapGetters,
    mapActions
} = createNamespacedHelpers('main');
export default {
    name: 'tab',
    props: ['data'],
    data() {
        return {};
    },
    methods: {
        ...mapMutations(['tabClick', 'tabRemove']),
        focusEl() {
            const targetElement = document.getElementById(this.data.path);
            if (targetElement) {
                document.getElementById('tab-container').scrollLeft =
                    targetElement.offsetLeft;
            }
        }
    },
    watch: {
        dataActive(active) {
            active && this.focusEl();
        }
    },
    computed: {
        dataActive() {
            return this.data.active;
        }
    },
    created() {},
    mounted() {
        this.focusEl();
    }
};
</script>

<style lang="scss" scoped>
@import '@/css/common.scss';

$tab-bar-height: 38px;

.tab {
    flex: none;
    height: $tab-bar-height - 10px;
    width: fit-content;
    min-width: 50px;
    background-color: #fff;

    border: none;
    border-radius: 5px;

    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    margin: 5px 5px;
    position: relative;

    padding: 0px 12px;
    padding-left: 24px;
    color: rgb(143, 143, 143);


    &:hover,
    &.active {
        color: $color-primary;
        background-color: #fff;
        /*  border: 1px solid $color-primary; */
    }

    .active-point {
        width: 10px;
        height: 10px;
        border-radius: 100px;
        background: #ccc;
        position: absolute;
        left: 9px;
        top: 9px;

    }

    .active-point.active {
        background: $color-primary;
    }

    .content {
        font-size: 12px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .close-btn {
        position: absolute;
        top: 0;
        right: 0;
        color: #ccc;
        cursor: pointer;
        display: none;

        .show {
            display: block;
        }

        &:hover {
            color: $color-primary;
        }
    }

    &:hover .close-btn.show {
        display: block;
    }
}
</style>
