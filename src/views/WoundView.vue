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
    <div class="alert alert-primary mt-3" role="alert">
      Patient: {{ patient.name }} (ID: {{ patient.id }})
    </div>
  </div>
  <div v-if="wound">
    <div class="alert alert-light mt-3" role="alert">
      Wound Details: {{ wound.type }} på {{ wound.location }} registrert {{ wound.registered }}
    </div>
    <div class="mt-3" v-if="wound.observations && wound.observations.length">
      <h2>Existing Observations</h2>
      <div class="card mb-3" v-for="observation in wound.observations" :key="observation.id">
        <div class="card-body">
          <p>ID: {{ observation.id }}</p>
          <p>Color: {{ observation.color.join(', ') }}</p>
          <p>Signs of Infection: {{ observation.signsOfInfection.join(', ') }}</p>
          <p>Registered: {{ observation.registered }}</p>
          <p v-if="observation.photo">Photo: <img :src="observation.photo" alt="Observation Photo" style="max-width: 100px; max-height: 100px;" /></p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
  <div class="row row-cols-auto mt-3">
    <div class="col">
      <button class="btn btn-secondary" @click="$router.push({ name: 'PatientView', params: { id: patient.id } })">
      Back to Patient View
    </button>
    </div>
    <div class="col">
      <button class="btn btn-primary" @click="$router.push({ name: 'RegisterObservation', params: { woundId: wound.id } })">
      Register New Observation
    </button>
    </div>
  </div>
</template>

<style scoped>
/* Add any styles for the WoundView here */
</style>
