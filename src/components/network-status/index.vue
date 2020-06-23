<template>
    <div class="network-status">
        <el-tag :type="tagType" size="mini">{{ tagContent }}</el-tag>
    </div>
</template>

<script lang="ts">
import { GGXNetworkEvents } from 'ggx-core-client-ts';
import ggx from '@/net/ggx';
export default {
    data() {
        return {
            reconnectTimes: 0,
            tagType: 'warning',
            tagContent: 'connecting'
        };
    },

    created() {
        this.updateNetworkDelay();

        ggx.addEventListener(GGXNetworkEvents.CONNECTION_CLOSE, e => {
            this.$notify({
                title: '网络',
                message: '网络连接失败, 将在 3 秒后重试',
                type: 'error',
                duration: 3000
            });
            this.updateNetworkDelay();
            ggx.connect();
            this.reconnectTimes++;
        });

        ggx.addEventListener(GGXNetworkEvents.CONNECTION_OPEN, e => {
            if (this.reconnectTimes > 1) {
                this.$notify({
                    title: '网络',
                    message: '网络连接成功',
                    type: 'success',
                    duration: 3000
                });
            }
            this.updateNetworkDelay();
        });

        ggx.addEventListener(GGXNetworkEvents.NETWORK_DELAY_UPDATE, e => {
            this.updateNetworkDelay(e?.data);
        });

        ggx.connect();
    },
    methods: {
        updateNetworkDelay(delay = 0) {
            if (ggx.connected) {
                if (delay < 300) {
                    this.tagType = 'success';
                } else if (delay < 800) {
                    this.tagType = 'warning';
                } else {
                    this.tagType = 'danger';
                }
                this.tagContent = delay + ' ms';
            } else {
                this.tagType = 'warning';
                this.tagContent = 'connecting';
            }
        }
    }
};
</script>

<style lang="scss">
@import '@/css/common.scss';
.network-status {
    z-index: 9999;
    position: absolute;
    bottom: 0;
    right: 0;
    min-width: 20px;
    min-height: 20px;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
    cursor: default;
}
.network-status:hover {
    opacity: 1;
}
</style>
