<template>
  <div class="card mt-3" :class="{ 'border-primary': observation.id === focusOnObservationId }" @click="$emit('changeFocus', observation.id)">
    <div class="card-body">
      <div class="row">
        <div class="col col-auto" v-if="observation.photo">
          <img :src="observation.photo" alt="Observation Photo" style="max-width: 128px; max-height: 128px;" />
        </div>
        <div class="col">
          <p class="times-section">
            <span class="times-icon">T</span>
            <span class="times-icon">I</span>
            <span class="times-icon">M</span>
            <span class="times-icon">E</span>
            <span class="times-icon">S</span>
          </p>
          <p class="times-section">
            <span class="times-icon fa-solid fa-ruler"></span>
            {{ observation.length }} x {{ observation.width }} x {{ observation.depth }} mm
          </p>
          <p class="times-section">
            <span class="times-icon fa-solid fa-calendar-days"></span> {{ observation.registered }}
          </p>
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
.times-section {
  margin-bottom: .25rem;
}
.times-icon {
  align-content: center;
  border: 1px solid #000;
  border-radius: .5rem;
  display: inline-block;
  padding: .25rem;
  text-align: center;
  font-weight: bold;
  width: 2rem;
  height: 2rem;
  margin-right: .25rem;
}
</style>
