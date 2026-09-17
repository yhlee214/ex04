import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/ListView.vue'),
    },
     {
      path: '/add',
      name: 'add',
      component: () => import('../views/AddView.vue'),
    },
    {
      path: '/modify',
      name: 'modify',
      component: () => import('../views/ModifyView.vue'),
    },
  ],
})

export default router
