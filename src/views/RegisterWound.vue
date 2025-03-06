<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Wound from '../models/Wound'; // Import the Wound model
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library
import { getPatient, savePatient } from '../utils/indexedDB'; // Import the IndexedDB utility functions

const route = useRoute();
const router = useRouter();
const location = ref('');
const type = ref('');
const registered = ref(new Date().toISOString().substr(0, 10)); // Pre-set to current date
const maxDate = new Date().toISOString().substr(0, 10); // Get current date for max attribute
const locationOptions = ['Leg', 'Head', 'Arm']; // Define location options
const typeOptions = ['Cut', 'Burn', 'Pressure ulcer']; // Define type options

const patient = ref(null);

getPatient(route.params.id).then((data) => {
  patient.value = data;
}).catch((error) => {
  console.error('Error fetching patient:', error);
});

function submitForm() {
  const id = uuidv4(); // Generate a random UUID
  const wound = new Wound(id, location.value, type.value, registered.value); // Use the Wound model

  getPatient(route.params.id).then((patient) => {
    if (!patient.wounds) {
      patient.wounds = {};
    }
    patient.wounds[id] = wound;
    savePatient(patient).then(() => {
      console.log('Wound registered:', wound);
      router.push({ name: 'PatientView', params: { id: route.params.id } });
    }).catch((error) => {
      console.error('Error saving patient:', error);
    });
  }).catch((error) => {
    console.error('Error fetching patient:', error);
  });
}

function cancel() {
  router.push({ name: 'PatientView', params: { id: route.params.id } });
}
</script>

<template>
  <div>
    <div class="alert alert-primary" role="alert" v-if="patient">{{ patient.name }} ({{ patient.id }})</div>
    <h1>Registrer nytt sår</h1>
    <form @submit.prevent="submitForm">
      <div class="row mb-3">
        <label for="location" class="col-sm-2 col-form-label">Location:</label>
        <div class="col-sm-10">
          <select id="location" class="form-control" v-model="location" required>
            <option disabled value="">Velg</option>
            <option v-for="option in locationOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2"> </div>
        <div class="col-sm-10">
          <p>[Avatar som alternativ input for Location]</p>
        </div>
      </div>
      <div class="row mb-3">
        <label for="type" class="col-sm-2 col-form-label">Type:</label>
        <div class="col-sm-10">
          <select id="type" class="form-control" v-model="type" required>
            <option disabled value="">Velg</option>
            <option v-for="option in typeOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </div>
      <div class="row mb-3">
        <label for="registered" class="col-sm-2 col-form-label">Registered:</label>
        <div class="col-sm-10">
          <input id="registered" class="form-control" v-model="registered" type="date" :max="maxDate" required />
        </div>
      </div>
      <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
      <button type="submit" class="btn btn-primary ms-3">Submit</button>
    </form>
  </div>
</template>

<style scoped>
/* Add any styles for the RegisterWound view here */
</style>
