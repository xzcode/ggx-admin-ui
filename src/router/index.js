import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import mainRoutes from '@/views/main/routes'
import loginRoutes from '@/views/login/routes'

Vue.use(VueRouter)

export const routes = [
  {
    name: 'default',
    path: '/',
    redirect: 'login'
  },
  ...loginRoutes,
  ...mainRoutes,
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


//路由前置过滤
router.beforeEach((to, from, next) => {

  //console.log(to, from , next, "store---->",store)

  //使用加载进度条工具
  NProgress.start();
  // 继续路由
  next();

});

//路由后置处理
router.afterEach(transition => {

  //结束加载进度条
  NProgress.done();


});

export default router
