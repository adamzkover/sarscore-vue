<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="row">
        <div class="col col-auto" v-if="observation.photo">
          <img :src="observation.photo" alt="Observation Photo" style="max-width: 256px; max-height: 256px;" />
        </div>
        <div class="col">
          <p>Color: {{ observation.color.join(', ') }}</p>
          <p>Signs of Infection: {{ observation.signsOfInfection.join(', ') }}</p>
          <p>Registered: {{ observation.registered }}</p>
        </div>
      </div>
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
