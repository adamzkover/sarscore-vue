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
            <label class="form-check-label" for="colorPink"><span class="badge" style="background-color: #f2d3e1;">&nbsp;</span> Rosa</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" v-model="color" type="checkbox" value="red" id="colorRed" />
            <label class="form-check-label" for="colorRed"><span class="badge" style="background-color: #e30b5c;">&nbsp;</span> Rødt (friskt granulasjonsvev)</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" v-model="color" type="checkbox" value="red2" id="colorRed2" />
            <label class="form-check-label" for="colorRed2"><span class="badge" style="background-color: #8b0000;">&nbsp;</span> Vinrød (mulig lokal infeksjon)</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" v-model="color" type="checkbox" value="black" id="colorBlack" />
            <label class="form-check-label" for="colorBlack"><span class="badge text-bg-dark">&nbsp;</span> Svart (nekrose)</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" v-model="color" type="checkbox" value="yellow" id="colorYellow" />
            <label class="form-check-label" for="colorYellow"><span class="badge text-bg-warning">&nbsp;</span> Gult (nekrose)</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" v-model="color" type="checkbox" value="gray" id="colorGray" />
            <label class="form-check-label" for="colorGray"><span class="badge text-bg-secondary">&nbsp;</span> Grått</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" v-model="color" type="checkbox" value="white" id="colorWhite" />
            <label class="form-check-label" for="colorWhite"><span class="badge text-bg-light">&nbsp;</span> Hvitt (sener/bein synlig)</label>
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
      <div class="row mb-3">
        <label for="photo" class="col-sm-2 col-form-label">Photo:</label>
        <div class="col-sm-10">
          <input id="photo" class="form-control" type="file" accept="image/*" capture="camera" @change="onFileChange" />
        </div>
      </div>
      <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#cancelModal">Cancel</button>
      <button type="submit" class="btn btn-primary ms-3">Submit</button>
    </form>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="cancelModal" tabindex="-1" aria-labelledby="cancelModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="cancelModalLabel">Confirm Cancellation</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to cancel? All changes will be lost.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Back to the form</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="proceedCancel">Confirm Cancellation</button>
        </div>
      </div>
    </div>
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
      maxDate: new Date().toISOString().split('T')[0],
      photo: null
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
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxSize = 256;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            this.photo = canvas.toDataURL(file.type);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async submitForm() {
      const observation = {
        id: uuidv4(),
        color: this.color,
        signsOfInfection: this.signsOfInfection,
        registered: this.registered,
        photo: this.photo
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
    proceedCancel() {
      this.$router.push({ name: 'WoundView', params: { patientId: this.$route.params.patientId, woundId: this.$route.params.woundId } });
    }
  }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
