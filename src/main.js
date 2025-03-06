import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { getPatient, addPatient } from './utils/indexedDB';
import Patient from './models/Patient';

// Add Bootstrap 5 CSS import
import 'bootstrap/dist/css/bootstrap.min.css';

// Add Font Awesome CSS import
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)

async function initializePatient() {
    const patientId = '27115743487';
    const patientName = 'Tore Hjemmekjær';

    try {
        const patient = await getPatient(patientId);
        if (!patient) {
            const newPatient = new Patient(patientId, patientName, {});
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
