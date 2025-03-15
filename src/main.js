import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initializePatient } from './utils/indexedDB';
import Patient from './models/Patient';

// Add Bootstrap 5 CSS import
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Add Font Awesome CSS import
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';

import Vue3TouchEvents from 'vue3-touch-events';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3TouchEvents);

initializePatient().then(() => {
    app.mount('#app')
});
