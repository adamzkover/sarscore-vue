<template>
  <div>
    <h1>Register Observation</h1>
    <form @submit.prevent="submitForm">
      <div>
        <h2>Color</h2>
        <label><input type="checkbox" v-model="color" value="pink" /> Pink</label>
        <label><input type="checkbox" v-model="color" value="red" /> Red</label>
        <label><input type="checkbox" v-model="color" value="black" /> Black</label>
        <label><input type="checkbox" v-model="color" value="yellow" /> Yellow</label>
        <label><input type="checkbox" v-model="color" value="gray" /> Gray</label>
        <label><input type="checkbox" v-model="color" value="white" /> White</label>
      </div>
      <div>
        <h2>Signs of Infection</h2>
        <label><input type="checkbox" v-model="signsOfInfection" value="smell" /> Smell</label>
        <label><input type="checkbox" v-model="signsOfInfection" value="pain" /> Pain</label>
        <label><input type="checkbox" v-model="signsOfInfection" value="warmth" /> Warmth</label>
      </div>
      <button type="button" @click="cancel">Cancel</button>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: [],
      signsOfInfection: []
    };
  },
  methods: {
    submitForm() {
      // Handle form submission
      console.log('Color:', this.color);
      console.log('Signs of Infection:', this.signsOfInfection);
    },
    cancel() {
      this.$router.push({ name: 'WoundView', params: { patientId: this.$route.params.patientId, woundId: this.$route.params.woundId } });
    }
  }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
