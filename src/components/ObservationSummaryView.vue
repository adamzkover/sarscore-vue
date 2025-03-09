<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="row">
        <div class="col">
          Registrert: {{ observation.registered }}
        </div>
        <div class="col">
          <p v-if="observation.photo"><img :src="observation.photo" alt="Observation Photo" style="max-width: 100px; max-height: 100px;" /></p>
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
/* Add any styles for the ObservationSummaryView here */
</style>
