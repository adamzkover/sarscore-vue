import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PatientView from '@/views/PatientView.vue'
import RegisterWound from '@/views/RegisterWound.vue'
import WoundView from '@/views/WoundView.vue'
import RegisterObservation from '@/views/RegisterObservation.vue'
import EditPatientView from '@/views/EditPatientView.vue'

const router = createRouter({
  history: createWebHashHistory(),
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
    },
    {
      path: '/patient/:patientId/wound/:woundId/registerObservation',
      name: 'RegisterObservation',
      component: RegisterObservation
    },
    {
      path: '/patient/:patientId/edit',
      name: 'EditPatientView',
      component: EditPatientView
    }
  ],
})

export default router
