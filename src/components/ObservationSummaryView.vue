<template>
  <div class="card mt-3" :class="{ 'border-primary': observation.id === focusOnObservationId }" @click="$emit('changeFocus', observation.id)">
    <div class="card-body">
      <div class="row">
        <div class="col col-auto" v-if="observation.photo">
          <img :src="observation.photo" alt="Observation Photo" style="max-width: 128px; max-height: 128px;" />
        </div>
        <div class="col">
          <p class="times-section">
            <span :class="['times-icon', `times-icon-${observationInstance.getTScore()}`]">T</span>
            <span :class="['times-icon', `times-icon-${observationInstance.getIScore()}`]">I</span>
            <span :class="['times-icon', `times-icon-${observationInstance.getMScore()}`]">M</span>
            <span :class="['times-icon', `times-icon-${observationInstance.getEScore()}`]">E</span>
            <span :class="['times-icon', `times-icon-${observationInstance.getSScore()}`]">S</span>
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
import Observation from '@/models/Observation';

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

const observationInstance = new Observation(
  props.observation.id,
  props.observation.color,
  props.observation.signOfInfection,
  props.observation.registered,
  props.observation.photo
);
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
.times-icon-green {
  background-color: #d4edda; /* pale green */
}
.times-icon-yellow {
  background-color: #fff3cd; /* pale yellow */
}
.times-icon-red {
  background-color: #f8d7da; /* pale red */
}
</style>
