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
    <div class="card mt-3">
      <div class="card-body">
        <h1>{{ patient.name }}</h1>
        <p>{{ patient.id }}</p>
      </div>
    </div>
    <div class="mt-3">
      <h2>Registrerte sår</h2>
      <ul class="list-group mb-3">
        <li class="list-group-item list-group-item-action col">
          <div class="row">
            <div class="col-3">
              <strong>Type</strong>
            </div>
            <div class="col-3">
              <strong>Kroppsregion</strong>
            </div>
            <div class="col-2">
              <strong>Registrert</strong>
            </div>
            <div class="col-2">
              <strong>Antall sårskift</strong>
            </div>
            <div class="col-2 text-end">
              <strong>Gå til såret</strong>
            </div>
          </div>
        </li>
        <li class="list-group-item list-group-item-action col" v-for="wound in patient.wounds" :key="wound.id">
          <router-link
            :to="{ name: 'WoundView', params: { patientId: patient.id, woundId: wound.id } }"
            class="stretched-link text-decoration-none text-body">
            <div class="row">
              <div class="col-3">
                {{ wound.type }}
              </div>
              <div class="col-3">
                {{ wound.location }}
              </div>
              <div class="col-2">
                {{ wound.registered }}
              </div>
              <div class="col-2">
                {{ wound.observations.length }}
              </div>
              <div class="col-2 d-flex align-items-center justify-content-end">
                <i class="fas fa-circle-play"></i>
              </div>
            </div>
          </router-link>
          <!-- TODO Delete button -->
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
  <div class="mt-3">
    <button class="btn btn-primary" @click="registerWound">Registrer nytt sår</button>
  </div>
</template>

<style scoped>
/* Add any styles for the PatientView here */
i.fas.fa-circle-play {
  font-size: 150%;
}
.list-group-item {
  position: relative;
}
</style>
