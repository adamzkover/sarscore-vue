<template>
  <div class="card mb-3" :class="{ 'border-primary': observation.id === focusOnObservationId }" @click="$emit('changeFocus', observation.id)">
    <div class="card-body">
      <div class="row">
        <div class="col col-auto" v-if="observation.photo">
          <img :src="observation.photo" alt="Observation Photo" style="max-width: 128px; max-height: 128px;" />
        </div>
        <div class="col">
          Registrert: {{ observation.registered }}
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
  },
  focusOnObservationId: {
    type: String,
    required: false
  }
});
</script>

<style scoped>
/* Add any styles for the ObservationSummaryView here */
</style>
