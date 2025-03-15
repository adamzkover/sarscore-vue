<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPatient, savePatient } from '@/utils/indexedDB';

const route = useRoute();
const router = useRouter();
const patientData = ref('');
const errorMessage = ref('');

onMounted(() => {
  const patientId = route.params.patientId;
  getPatient(patientId).then((data) => {
    if (data) {
      patientData.value = JSON.stringify(data, null, 2);
    } else {
      errorMessage.value = 'Patient not found';
    }
  }).catch((error) => {
    errorMessage.value = 'Error fetching patient: ' + error;
  });
});

function saveData() {
  try {
    const parsedData = JSON.parse(patientData.value);
    savePatient(parsedData).then(() => {
      router.push({ name: 'PatientView', params: { id: route.params.patientId } });
    }).catch((error) => {
      errorMessage.value = 'Error saving patient: ' + error;
    });
  } catch (e) {
    errorMessage.value = 'Invalid JSON format';
  }
}
</script>

<template>
  <div>
    <h1>Edit Patient Data</h1>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <textarea v-model="patientData" rows="20" class="form-control"></textarea>
    <button class="btn btn-primary mt-3" @click="saveData">Save</button>
  </div>
</template>

<style scoped>
/* Add any styles for the EditPatientView here */
</style>
