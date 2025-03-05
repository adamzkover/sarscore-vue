<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Patient from '@/models/Patient';
import { getPatient } from '@/utils/indexedDB';

const route = useRoute();
const router = useRouter();
const patient = ref(null);

onMounted(() => {
  const patientId = route.params.id;

  getPatient(patientId).then((data) => {
    if (data) {
      patient.value = new Patient(data.id, data.name, data.wounds);
    } else {
      // Handle case where patient is not found
      console.error('Patient not found');
    }
  }).catch((error) => {
    console.error('Error fetching patient:', error);
  });
});

function registerWound() {
  router.push({ name: 'RegisterWound', params: { id: route.params.id } });
}
</script>

<template>
  <div v-if="patient">
    <h1>Patient Details</h1>
    <p><strong>ID:</strong> {{ patient.id }}</p>
    <p><strong>Name:</strong> {{ patient.name }}</p>
    <h2>Wounds</h2>
    <ul>
      <li v-for="wound in patient.wounds" :key="wound.id">
        <router-link :to="{ name: 'WoundView', params: { patientId: patient.id, woundId: wound.id } }">
          <strong>ID:</strong> {{ wound.id }}, <strong>Location:</strong> {{ wound.location }}, <strong>Type:</strong> {{ wound.type }}
          <br />
          <strong>Registered:</strong> {{ wound.registered }}
        </router-link>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
  <button @click="registerWound">Register wound</button>
</template>

<style scoped>
/* Add any styles for the PatientView here */
</style>
