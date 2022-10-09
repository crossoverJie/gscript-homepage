import { createRouter, createWebHistory } from "vue-router";


const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../pages/Layout.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
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
