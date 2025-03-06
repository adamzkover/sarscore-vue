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
    <h1>Register Wound</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="location">Location:</label>
        <input id="location" v-model="location" type="text" required />
      </div>
      <div>
        <label for="type">Type:</label>
        <input id="type" v-model="type" type="text" required />
      </div>
      <div>
        <label for="registered">Registered:</label>
        <input id="registered" v-model="registered" type="date" :max="maxDate" required />
      </div>
      <button type="submit">Submit</button>
      <button type="button" @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<style scoped>
/* Add any styles for the RegisterWound view here */
</style>
