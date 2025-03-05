import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PatientView from '@/views/PatientView.vue'
import RegisterWound from '@/views/RegisterWound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/patient/:id',
      name: 'Patient',
      component: PatientView
    },
    {
      path: '/patient/:id/registerWound',
      name: 'RegisterWound',
      component: RegisterWound
    }
  ],
})

export default router
