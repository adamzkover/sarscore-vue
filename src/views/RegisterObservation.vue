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
          <p>Farge:</p>
        </div>
        <div class="col-sm-10">
          <div class="form-check">
            <input class="form-check-input" v-model="color" type="checkbox" value="pink" id="colorPink" />
            <label class="form-check-label" for="colorPink"><span class="badge" style="background-color: #f2d3e1; color: #000">Rosa</span></label>
          </div>
          <div class="form-check">
            <input class="form-check-input" v-model="color" type="checkbox" value="red" id="colorRed" />
            <label class="form-check-label" for="colorRed"><span class="badge text-bg-danger">Rødt</span></label>
          </div>
          <div class="form-check">
            <input class="form-check-input" v-model="color" type="checkbox" value="black" id="colorBlack" />
            <label class="form-check-label" for="colorBlack"><span class="badge text-bg-dark">Svart</span></label>
          </div>
          <div class="form-check">
            <input class="form-check-input" v-model="color" type="checkbox" value="yellow" id="colorYellow" />
            <label class="form-check-label" for="colorYellow"><span class="badge text-bg-warning">Gult</span></label>
          </div>
          <div class="form-check">
            <input class="form-check-input" v-model="color" type="checkbox" value="gray" id="colorGray" />
            <label class="form-check-label" for="colorGray"><span class="badge text-bg-secondary">Grått</span></label>
          </div>
          <div class="form-check">
            <input class="form-check-input" v-model="color" type="checkbox" value="white" id="colorWhite" />
            <label class="form-check-label" for="colorWhite"><span class="badge text-bg-light">Hvitt</span></label>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2 col-form-label">
          <p>Infeksjonstegn:</p>
        </div>
        <div class="col-sm-10">
          <div class="form-check">
            <input class="form-check-input" v-model="signsOfInfection" type="checkbox" value="smell" id="infSmell" />
            <label class="form-check-label" for="infSmell">Lukt</label>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <label for="registered" class="col-sm-2 col-form-label">Registered:</label>
        <div class="col-sm-10">
          <input id="registered" class="form-control" v-model="registered" type="date" :max="maxDate" required />
        </div>
      </div>
      <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
      <button type="submit" class="btn btn-primary ms-3">Submit</button>
    </form>
  </div>
</template>

<script>
import { getPatient, savePatient } from '@/utils/indexedDB';
import { v4 as uuidv4 } from 'uuid';

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
    async submitForm() {
      const observation = {
        id: uuidv4(),
        color: this.color,
        signsOfInfection: this.signsOfInfection,
        registered: this.registered
      };

      if (!this.wound.observations) {
        this.wound.observations = [];
      }
      this.wound.observations.push(observation);

      // Create a deep copy of the patient object without methods
      const patientCopy = JSON.parse(JSON.stringify(this.patient));

      try {
        await savePatient(patientCopy);
        console.log('Observation saved:', observation);
        this.$router.push({ name: 'WoundView', params: { patientId: this.$route.params.patientId, woundId: this.$route.params.woundId } });
      } catch (error) {
        console.error('Error saving observation:', error);
      }
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
