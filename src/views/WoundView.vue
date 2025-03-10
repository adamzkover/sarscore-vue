<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getPatient } from '@/utils/indexedDB';
import ObservationView from '@/components/ObservationView.vue';
import ObservationSummaryView from '@/components/ObservationSummaryView.vue';
import 'vue3-touch-events';

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

const handleSwipeLeft = () => {
  const currentIndex = observations.value.findIndex(obs => obs.id === focusOnObservation.value.id);
  if (currentIndex < observations.value.length - 1) {
    focusOnObservation.value = observations.value[currentIndex + 1];
  } else {
    focusOnObservation.value = observations.value[0]; // Wrap around to the first object
  }
};

const handleSwipeRight = () => {
  const currentIndex = observations.value.findIndex(obs => obs.id === focusOnObservation.value.id);
  if (currentIndex > 0) {
    focusOnObservation.value = observations.value[currentIndex - 1];
  } else {
    focusOnObservation.value = observations.value[observations.value.length - 1]; // Wrap around to the last object
  }
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
      Sår registrert: <strong>{{ wound.registered }}</strong>, Type: <strong>{{ wound.type }}</strong>, Kroppsregion: <strong>{{ wound.location }}</strong>
    </div>
    <div class="mt-3" v-if="wound.observations && wound.observations.length">
      <h2>Existing Observations</h2>
      <div v-touch:swipe.left="handleSwipeLeft" v-touch:swipe.right="handleSwipeRight">
        <ObservationView v-if="focusOnObservation" :observation="focusOnObservation" />
      </div>
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
  <div class="row">
    <div class="col-md-auto">
      <button class="btn btn-secondary" @click="$router.push({ name: 'PatientView', params: { id: patient.id } })">
      Back to Patient View
    </button>
    </div>
    <div class="col-md-auto mt-3 mt-md-0">
      <button class="btn btn-primary" @click="$router.push({ name: 'RegisterObservation', params: { woundId: wound.id } })">
      Register New Observation
    </button>
    </div>
  </div>
</template>

<style scoped>
/* Add any styles for the WoundView here */
</style>
