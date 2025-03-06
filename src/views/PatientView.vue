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
    <div class="card mb-3">
      <div class="card-body">
        <h1>{{ patient.name }}</h1>
        <p>{{ patient.id }}</p>
      </div>
    </div>
    <h2>Registrerte sår</h2>
    <ul class="list-group mb-3">
      <router-link
        v-for="wound in patient.wounds"
        :key="wound.id"
        :to="{ name: 'WoundView', params: { patientId: patient.id, woundId: wound.id } }"
        tag="li"
        class="list-group-item"
      >
        <strong>ID:</strong> {{ wound.id }}, <strong>Location:</strong> {{ wound.location }}, <strong>Type:</strong> {{ wound.type }}
        <br />
        <strong>Registered:</strong> {{ wound.registered }}
      </router-link>
    </ul>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
  <button class="btn btn-primary" @click="registerWound">Registrer nytt sår</button>
</template>

<style scoped>
/* Add any styles for the PatientView here */
</style>
