<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Patient from '@/models/Patient';
import { getPatient } from '@/utils/indexedDB';

const route = useRoute();
const patient = ref(null);

onMounted(() => {
  const patientId = route.params.id;

  getPatient(patientId).then((data) => {
    if (data) {
      patient.value = new Patient(data.id, data.name);
    } else {
      // Handle case where patient is not found
      console.error('Patient not found');
    }
  }).catch((error) => {
    console.error('Error fetching patient:', error);
  });
});
</script>

<template>
  <div v-if="patient">
    <h1>Patient Details</h1>
    <p><strong>ID:</strong> {{ patient.id }}</p>
    <p><strong>Name:</strong> {{ patient.name }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
/* Add any styles for the PatientView here */
</style>
