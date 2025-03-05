import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PatientView from '@/views/PatientView.vue'
import RegisterWound from '@/views/RegisterWound.vue'
import WoundView from '@/views/WoundView.vue'

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
      name: 'PatientView', // Updated name to match the cancel function
      component: PatientView
    },
    {
      path: '/patient/:id/registerWound',
      name: 'RegisterWound',
      component: RegisterWound
    },
    {
      path: '/patient/:patientId/wound/:woundId',
      name: 'WoundView',
      component: WoundView
    }
  ],
})

export default router
