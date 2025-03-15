<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { savePatient } from '@/utils/indexedDB';

const route = useRoute();
const router = useRouter();
const errorMessage = ref('');

function deleteData() {
  const patientId = route.params.patientId;
  const emptyData = {};
  savePatient({ id: patientId, ...emptyData }).then(() => {
    router.push({ name: 'PatientView', params: { id: patientId } });
  }).catch((error) => {
    errorMessage.value = 'Error deleting patient data: ' + error;
  });
}
</script>

<template>
  <div>
    <h1>Delete Patient Data</h1>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <div class="mt-3">
        <img class="delete-img" src="@/assets/nuke-it.jpg" alt="Slett all data for pasienten"/>
    </div>
    <div class="mt-3">
        <button class="btn btn-danger mt-3" @click="deleteData">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.delete-img {
  width: 256px;
  height: 256px;
}
</style>
