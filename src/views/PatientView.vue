<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Patient from '@/models/Patient';

const route = useRoute();
const patient = ref(null);

onMounted(() => {
  const patientId = route.params.id;
  // Fetch patient details from an API or a data source
  // For now, we'll use a mock patient
  patient.value = new Patient(patientId, 'John Doe');
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
