import Vue from 'vue';
import app from './App.vue';
import router from './router';
import store from './store';
import './plugins/element';
import ggx from '@/net/ggx';

Vue.config.productionTip = false;
Vue.prototype.ggx = ggx;

new Vue({
    router,
    store,
    render: h => h(app)
}).$mount('#app');
