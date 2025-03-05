<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getPatient } from '@/utils/indexedDB';

const route = useRoute();
const patient = ref(null);
const wound = ref(null);

onMounted(() => {
  const patientId = route.params.patientId;
  const woundId = route.params.woundId;

  getPatient(patientId).then((fetchedPatient) => {
    patient.value = fetchedPatient;
    if (patient.value && patient.value.wounds) {
      wound.value = patient.value.wounds[woundId];
      if (!wound.value) {
        console.error('Wound not found');
      }
    } else {
      console.error('Patient or wounds not found');
    }
  }).catch((error) => {
    console.error('Error fetching patient:', error);
  });
});
</script>

<template>
  <div v-if="patient">
    <h1>Patient Details</h1>
    <p><strong>Name:</strong> {{ patient.name }}</p>
    <p><strong>ID:</strong> {{ patient.id }}</p>
  </div>
  <div>
    <button @click="$router.push({ name: 'PatientView', params: { id: patient.id } })">
      Back to Patient View
    </button>
  </div>
  <div v-if="wound">
    <h1>Wound Details</h1>
    <p><strong>ID:</strong> {{ wound.id }}</p>
    <p><strong>Location:</strong> {{ wound.location }}</p>
    <p><strong>Type:</strong> {{ wound.type }}</p>
    <p><strong>Registered:</strong> {{ wound.registered }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
  <div>
    <button @click="$router.push({ name: 'RegisterObservation', params: { woundId: wound.id } })">
      Register New Observation
    </button>
  </div>
</template>

<style scoped>
/* Add any styles for the WoundView here */
</style>
