<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getPatient } from '@/utils/indexedDB';
import ObservationView from '@/components/ObservationView.vue';
import ObservationSummaryView from '@/components/ObservationSummaryView.vue';
import Observation from '@/models/Observation';
import 'vue3-touch-events';

const route = useRoute();
const patient = ref(null);
const wound = ref(null);
const observations = ref([]);
const focusOnObservation = ref(null);
let currentIndex = 0;
const canSwipeLeft = ref(false);
const canSwipeRight = ref(false);

onMounted(() => {
  const patientId = route.params.patientId;
  const woundId = route.params.woundId;

  getPatient(patientId).then((fetchedPatient) => {
    patient.value = fetchedPatient;
    if (patient.value && patient.value.wounds) {
      wound.value = patient.value.wounds[woundId];
      if (wound.value) {
        // Convert plain observation objects to Observation instances
        observations.value = wound.value.observations.map(obs => new Observation(
          obs.id,
          obs.color,
          obs.signsOfInfection,
          obs.registered,
          obs.photo,
          obs.moistureLevel,
          obs.moistureConsistency,
          obs.moistureColor,
          obs.moistureSmell,
          obs.edge,
          obs.comment,
          obs.length,
          obs.width,
          obs.depth,
          obs.surroundingSkin
        ));
        // Sort observations by registered date
        observations.value.sort((a, b) => new Date(b.registered) - new Date(a.registered));
        focusOnObservation.value = observations.value[0];
        updateSwipeButtons();
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
  updateSwipeButtons();
};

const handleSwipeLeft = () => {
  currentIndex = observations.value.findIndex(obs => obs.id === focusOnObservation.value.id);
  if (currentIndex > 0) {
    focusOnObservation.value = observations.value[currentIndex - 1];
    updateSwipeButtons();
  }
};

const handleSwipeRight = () => {
  currentIndex = observations.value.findIndex(obs => obs.id === focusOnObservation.value.id);
  if (currentIndex < observations.value.length - 1) {
    focusOnObservation.value = observations.value[currentIndex + 1];
    updateSwipeButtons();
  }
};

const updateSwipeButtons = () => {
  currentIndex = observations.value.findIndex(obs => obs.id === focusOnObservation.value.id);
  canSwipeLeft.value = currentIndex > 0;
  canSwipeRight.value = currentIndex < observations.value.length - 1;
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
    <div class="d-flex justify-content-between mt-3">
      <button class="btn btn-secondary" @click="$router.push({ name: 'PatientView', params: { id: patient.id } })">Tilbake</button>
      <button class="btn btn-primary" @click="$router.push({ name: 'RegisterObservation', params: { woundId: wound.id } })">Registrer sårobservasjon</button>
    </div>
    <div class="mt-5" v-if="wound.observations && wound.observations.length">
      <h2>Sårobservasjoner</h2>
      <div class="row mt-3">
        <div class="col text-start">
          <button class="btn btn-secondary" @click="handleSwipeRight" :disabled="!canSwipeRight"><i class="fas fa-arrow-left"></i> Eldre</button>
        </div>
        <div class="col text-end">
          <button class="btn btn-secondary" @click="handleSwipeLeft" :disabled="!canSwipeLeft">Nyere <i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
      <div v-touch:swipe.left="handleSwipeLeft" v-touch:swipe.right="handleSwipeRight">
        <ObservationView v-if="focusOnObservation" :observation="focusOnObservation" />
      </div>
      <ObservationSummaryView
        v-for="observation in observations"
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
  <div class="d-flex justify-content-between mt-3">
    <button class="btn btn-secondary" @click="$router.push({ name: 'PatientView', params: { id: patient.id } })">Tilbake</button>
    <button class="btn btn-primary" @click="$router.push({ name: 'RegisterObservation', params: { woundId: wound.id } })">Registrer sårobservasjon</button>
  </div>
</template>

<style scoped>
/* Add any styles for the WoundView here */
</style>
