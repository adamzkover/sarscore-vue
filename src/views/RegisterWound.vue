<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Wound from '../models/Wound'; // Import the Wound model
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library
import { getPatient, savePatient } from '../utils/indexedDB'; // Import the IndexedDB utility functions

const route = useRoute();
const router = useRouter();
const location = ref('');
const type = ref('');
const registered = ref(new Date().toISOString().substr(0, 10)); // Pre-set to current date
const maxDate = new Date().toISOString().substr(0, 10); // Get current date for max attribute

const locationOptions = {
  'Hode og ansikt': ['Panne', 'Kinn', 'Nese', 'Lepper', 'Øre - høyre', 'Øre - venstre', 'Hodebunn'],
  'Hals og nakke': ['Hals', 'Nakke'],
  'Overekstremiteter': ['Skulder - høyre', 'Skulder - venstre', 'Overarm - høyre', 'Overarm - venstre', 'Albue - høyre', 'Albue - venstre', 'Underarm - høyre', 'Underarm - venstre', 'Håndledd - høyre', 'Håndledd - venstre', 'Hånd - høyre', 'Hånd - venstre', 'Fingre - høyre hånd', 'Fingre - venstre hånd'],
  'Thorax (brystkasse og rygg)': ['Bryst', 'Ribben', 'Øvre rygg', 'Nedre rygg'],
  'Abdomen og bekken': ['Øvre del av magen', 'Nedre del av magen', 'Hofter', 'Lysken', 'Sete'],
  'Underekstremiteter': ['Lår - høyre', 'Lår - venstre', 'Kne - høyre', 'Kne - venstre', 'Legg - høyre', 'Legg - venstre', 'Ankel - høyre', 'Ankel - venstre', 'Fot - høyre', 'Fot - venstre', 'Tå - høyre fot', 'Tå - venstre fot'],
  'Generelt kroppsområde': ['Andre kroppsdeler']
}; // Define location options with categories

const typeOptions = ['Kutt', 'Brannskade', 'Trykksår']; // Define type options with Norwegian names

const patient = ref(null);

getPatient(route.params.id).then((data) => {
  patient.value = data;
}).catch((error) => {
  console.error('Error fetching patient:', error);
});

function submitForm() {
  const id = uuidv4(); // Generate a random UUID
  const wound = new Wound(id, location.value, type.value, registered.value); // Use the Wound model

  getPatient(route.params.id).then((patient) => {
    if (!patient.wounds) {
      patient.wounds = {};
    }
    patient.wounds[id] = wound;
    savePatient(patient).then(() => {
      console.log('Wound registered:', wound);
      router.push({ name: 'PatientView', params: { id: route.params.id } });
    }).catch((error) => {
      console.error('Error saving patient:', error);
    });
  }).catch((error) => {
    console.error('Error fetching patient:', error);
  });
}

function proceedCancel() {
  router.push({ name: 'PatientView', params: { id: route.params.id } });
}
</script>

<template>
  <div>
    <div class="alert alert-primary mt-3" role="alert" v-if="patient">{{ patient.name }} ({{ patient.id }})</div>
    <h1 class="mt-3">Registrer nytt sår</h1>
    <form @submit.prevent="submitForm" class="mt-3">
      <div class="row mb-3">
        <label for="location" class="col-sm-2 col-form-label">Kroppsregion:</label>
        <div class="col-sm-10">
          <select id="location" class="form-control" v-model="location" required>
            <option disabled value="">Velg</option>
            <optgroup v-for="(options, category) in locationOptions" :label="category" :key="category">
              <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
            </optgroup>
          </select>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2"> </div>
        <div class="col-sm-10">
          <p>[Avatar som alternativ input for Kroppsregion]</p>
        </div>
      </div>
      <div class="row mb-3">
        <label for="type" class="col-sm-2 col-form-label">Type:</label>
        <div class="col-sm-10">
          <select id="type" class="form-control" v-model="type" required>
            <option disabled value="">Velg</option>
            <option v-for="option in typeOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </div>
      <div class="row mb-3">
        <label for="registered" class="col-sm-2 col-form-label">Registered:</label>
        <div class="col-sm-10">
          <input id="registered" class="form-control" v-model="registered" type="date" :max="maxDate" required />
        </div>
      </div>
      <div class="d-flex justify-content-between mt-3">
        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#cancelModal">Avbryt</button>
        <button type="submit" class="btn btn-primary ms-3">Registrer</button>
      </div>
    </form>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="cancelModal" tabindex="-1" aria-labelledby="cancelModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="cancelModalLabel">Er du sikker på at du vil avbryte registreringen?</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          All informasjon lagt inn i skjemaet i dag vil bli slettet.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Nei, tilbake til skjema</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="proceedCancel">Ja, bekreft avbrytelse</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any styles for the RegisterWound view here */
</style>
