import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wizard/:step?',
      name: 'wizard',
      component: () => import('../views/WizardView.vue'),
      children: [
        {
          path: '1',
          component: () => import('../components/Step1Table.vue'),
          alias: ''
        },
        {
          path: '2',
          component: () => import('../components/Step2Table.vue')
        },
        {
          path: '3',
          component: () => import('../components/Step3Table.vue')
        },
        {
          path: '4',
          component: () => import('../components/Step4Table.vue')
        },
        {
          path: '5',
          component: () => import('../components/Step5Table.vue')
        },
        {
          path: '6',
          component: () => import('../components/Step6Table.vue')
        }
      ]
    },
    {
      path: '/create-profile',
      name: 'profile',
      component: () => import('../views/CreateProfileView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
