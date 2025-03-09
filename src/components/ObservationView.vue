<template>
  <div class="card mb-3">
    <div class="card-body">
      <p>ID: {{ observation.id }}</p>
      <p>Color: {{ observation.color.join(', ') }}</p>
      <p>Signs of Infection: {{ observation.signsOfInfection.join(', ') }}</p>
      <p>Registered: {{ observation.registered }}</p>
      <p v-if="observation.photo">Photo: <img :src="observation.photo" alt="Observation Photo" style="max-width: 100px; max-height: 100px;" /></p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  observation: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
/* Add any styles for the ObservationView here */
</style>
