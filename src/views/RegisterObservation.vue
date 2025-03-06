<template>
  <div>
    <div class="alert alert-primary" role="alert">
      Patient: {{ patient.name }} (ID: {{ patient.id }})
    </div>
    <div class="alert alert-light" role="alert">
      Wound Details: {{ wound.type }} på {{ wound.location }} registrert {{ wound.registered }}
    </div>
    <h1>Register Observation</h1>
    <form @submit.prevent="submitForm">
      <div class="row mb-3">
        <div class="col-sm-2 col-form-label">
          <p>Color</p>
        </div>
        <div class="col-sm-10">
          <label><input type="checkbox" v-model="color" value="pink" /> Pink</label>
          <label><input type="checkbox" v-model="color" value="red" /> Red</label>
          <label><input type="checkbox" v-model="color" value="black" /> Black</label>
          <label><input type="checkbox" v-model="color" value="yellow" /> Yellow</label>
          <label><input type="checkbox" v-model="color" value="gray" /> Gray</label>
          <label><input type="checkbox" v-model="color" value="white" /> White</label>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2 col-form-label">
          <p>Infeksjonstegn</p>
        </div>
        <div class="col-sm-10">
          <label><input type="checkbox" v-model="signsOfInfection" value="smell" /> Smell</label>
          <label><input type="checkbox" v-model="signsOfInfection" value="pain" /> Pain</label>
          <label><input type="checkbox" v-model="signsOfInfection" value="warmth" /> Warmth</label>
        </div>
      </div>
      <div class="row mb-3">
        <label for="registered" class="col-sm-2 col-form-label">Registered:</label>
        <div class="col-sm-10">
          <input id="registered" class="form-control" v-model="registered" type="date" :max="maxDate" required />
        </div>
      </div>
      <button type="button" @click="cancel">Cancel</button>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { getPatient } from '@/utils/indexedDB';

export default {
  data() {
    return {
      patient: {},
      wound: {},
      color: [],
      signsOfInfection: [],
      registered: new Date().toISOString().split('T')[0],
      maxDate: new Date().toISOString().split('T')[0]
    };
  },
  created() {
    this.fetchPatientData();
  },
  methods: {
    async fetchPatientData() {
      const patientId = this.$route.params.patientId;
      try {
        const patient = await getPatient(patientId);
        this.patient = patient;
        this.wound = patient.wounds[this.$route.params.woundId];
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    },
    submitForm() {
      // Handle form submission
      console.log('Color:', this.color);
      console.log('Signs of Infection:', this.signsOfInfection);
      console.log('Registered:', this.registered);
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
