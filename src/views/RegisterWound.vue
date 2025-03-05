<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const location = ref('');
const type = ref('');
const registered = ref('');

function submitForm() {
  const wound = {
    location: location.value,
    type: type.value,
    registered: registered.value,
  };
  console.log('Wound registered:', wound);
  // Add logic to save the wound to the patient's record in IndexedDB
}

function cancel() {
  router.push({ name: 'PatientView', params: { id: route.params.id } });
}
</script>

<template>
  <div>
    <h1>Register Wound</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="location">Location:</label>
        <input id="location" v-model="location" type="text" required />
      </div>
      <div>
        <label for="type">Type:</label>
        <input id="type" v-model="type" type="text" required />
      </div>
      <div>
        <label for="registered">Registered:</label>
        <input id="registered" v-model="registered" type="text" required />
      </div>
      <button type="submit">Submit</button>
      <button type="button" @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<style scoped>
/* Add any styles for the RegisterWound view here */
</style>
