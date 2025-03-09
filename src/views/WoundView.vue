<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getPatient } from '@/utils/indexedDB';
import ObservationView from '@/components/ObservationView.vue';
import ObservationSummaryView from '@/components/ObservationSummaryView.vue';

const route = useRoute();
const patient = ref(null);
const wound = ref(null);
const observations = ref([]);
const focusOnObservation = ref(null);

onMounted(() => {
  const patientId = route.params.patientId;
  const woundId = route.params.woundId;

  getPatient(patientId).then((fetchedPatient) => {
    patient.value = fetchedPatient;
    if (patient.value && patient.value.wounds) {
      wound.value = patient.value.wounds[woundId];
      if (wound.value) {
        // Sort observations by registered date
        observations.value = wound.value.observations.sort((a, b) => new Date(b.registered) - new Date(a.registered));
        focusOnObservation.value = observations.value[0];
      } else {
        console.error('Wound not found');
      }
    } else {
      console.error('Patient or wounds not found');
    }
  }).catch((error) => {
    console.error('Error fetching patient:', error);
  });
});

const changeFocus = (observationId) => {
  focusOnObservation.value = observations.value.find(obs => obs.id === observationId);
};
</script>

<template>
  <div v-if="patient">
    <div class="alert alert-primary mt-3" role="alert">
      Pasient: <strong>{{ patient.name }}</strong> ({{ patient.id }})
    </div>
  </div>
  <div v-if="wound">
    <div class="alert alert-light mt-3" role="alert">
      Registrert <strong>{{ wound.registered }}</strong>, Type: <strong>{{ wound.type }}</strong>, Kroppsregion: <strong>{{ wound.location }}</strong>
    </div>
    <div class="mt-3" v-if="wound.observations && wound.observations.length">
      <h2>Existing Observations</h2>
      <ObservationView v-if="focusOnObservation" :observation="focusOnObservation" />
      <ObservationSummaryView
        v-for="observation in wound.observations"
        :key="observation.id"
        :observation="observation"
        :focusOnObservationId="focusOnObservation.id"
        @changeFocus="changeFocus"
      />
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
