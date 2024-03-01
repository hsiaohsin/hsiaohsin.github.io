import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home // 主页、数字版
  },
  {
    path: '/name',
    name: 'Name',
    component: () => import('../views/Name.vue')  // 姓名版
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')  // 关于我
  },
  {
    path: '/version',
    name: 'Version',
    component: () => import( '../views/Version.vue') // 版本介绍
  },

]

const router = new VueRouter({
  mode: 'history',
  // mode: 'hash', // 离线版配置
  base: process.env.BASE_URL,
  routes
})
router.afterEach(() => { window.scrollTo(0,0); })
export default router
