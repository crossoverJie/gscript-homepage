import {createRouter, createWebHashHistory} from "vue-router";


const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'HomePage',
    component: () => import('../pages/Layout.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


// 路由跳转钩子
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next('/404');
  }
  next();
});


export default router
