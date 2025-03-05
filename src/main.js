import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { getPatient, addPatient } from './utils/indexedDB';
import Patient from './models/Patient';

// Remove BootstrapVue imports
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

// Add Bootstrap 5 CSS import
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Remove BootstrapVue usage
// app.use(BootstrapVue)
// app.use(IconsPlugin)

async function initializePatient() {
    const patientId = '27115743487';
    const patientName = 'Tore Hjemmekjær';

    try {
        const patient = await getPatient(patientId);
        if (!patient) {
            const newPatient = new Patient(patientId, patientName);
            await addPatient(newPatient);
            console.log('Patient created:', newPatient);
        } else {
            console.log('Patient already exists:', patient);
        }
    } catch (error) {
        console.error('Error initializing patient:', error);
    }
}

initializePatient().then(() => {
    app.mount('#app')
});
