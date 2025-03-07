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
    <div class="alert alert-primary" role="alert">
      Patient: {{ patient.name }} (ID: {{ patient.id }})
    </div>
  </div>
  <div v-if="wound">
    <div class="alert alert-light" role="alert">
      Wound Details: {{ wound.type }} på {{ wound.location }} registrert {{ wound.registered }}
    </div>
    <div v-if="wound.observations && wound.observations.length">
      <h2>Existing Observations</h2>
      <ul>
        <li v-for="observation in wound.observations" :key="observation.id">
          <p>ID: {{ observation.id }}</p>
          <p>Color: {{ observation.color.join(', ') }}</p>
          <p>Signs of Infection: {{ observation.signsOfInfection.join(', ') }}</p>
          <p>Registered: {{ observation.registered }}</p>
          <p v-if="observation.photo">Photo: <img :src="observation.photo" alt="Observation Photo" style="max-width: 100px; max-height: 100px;" /></p>
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
  <div>
    <button class="btn btn-secondary" @click="$router.push({ name: 'PatientView', params: { id: patient.id } })">
      Back to Patient View
    </button>
    <button class="btn btn-primary ms-3" @click="$router.push({ name: 'RegisterObservation', params: { woundId: wound.id } })">
      Register New Observation
    </button>
  </div>
</template>

<style scoped>
/* Add any styles for the WoundView here */
</style>
