<template>
  <div>
    <div class="alert alert-primary mt-3" role="alert">
      <strong>{{ patient.name }}</strong> ({{ patient.id }})
    </div>
    <div class="alert alert-light mt-3" role="alert">
      Sår registrert: <strong>{{ wound.registered }}</strong>, Type: <strong>{{ wound.type }}</strong>, Kroppsregion: <strong>{{ wound.location }}</strong>
    </div>
    <h1 class="mt-3">Registrer sårobservasjon</h1>
    <form @submit.prevent="submitForm" class="fs-5 mt-3">
      <div class="row mb-3">
        <div class="col-sm-2">
          <h2><span class="times-icon fa-solid fa-ruler"></span></h2>
        </div>
        <div class="col-sm-10">
          <p class="fw-bold">Størrelse:</p>
          <div class="input-group mb-3">
            <span class="input-group-text" style="width: 5rem;" id="inputGroup-length">Lengde</span>
            <input type="number" inputmode="decimal" class="form-control" v-model="length" aria-label="Lengde" aria-describedby="inputGroup-length">
            <span class="input-group-text">mm</span>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" style="width: 5rem;" id="inputGroup-width">Bredde</span>
            <input type="number" inputmode="decimal" class="form-control" v-model="width" aria-label="Bredde" aria-describedby="inputGroup-width">
            <span class="input-group-text">mm</span>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" style="width: 5rem;" id="inputGroup-depth">Dybde</span>
            <input type="number" inputmode="decimal" class="form-control" v-model="depth" aria-label="Dybde" aria-describedby="inputGroup-depth">
            <span class="input-group-text">mm</span>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2">
          <h2><span class="times-icon">T</span></h2>
        </div>
        <div class="col-sm-10">
          <p class="fw-bold">Sårbunnens farge:</p>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="color" type="checkbox" value="pink" id="colorPink" />
            <label class="form-check-label" for="colorPink"><span class="badge" style="background-color: #f2d3e1;">&nbsp;</span> Rosa</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="color" type="checkbox" value="red" id="colorRed" />
            <label class="form-check-label" for="colorRed"><span class="badge" style="background-color: #e30b5c;">&nbsp;</span> Rødt (friskt granulasjonsvev)</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="color" type="checkbox" value="wineRed" id="colorWineRed" />
            <label class="form-check-label" for="colorWineRed"><span class="badge" style="background-color: #8b0000;">&nbsp;</span> Vinrød (mulig lokal infeksjon)</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="color" type="checkbox" value="black" id="colorBlack" />
            <label class="form-check-label" for="colorBlack"><span class="badge text-bg-dark">&nbsp;</span> Svart (nekrose)</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="color" type="checkbox" value="yellow" id="colorYellow" />
            <label class="form-check-label" for="colorYellow"><span class="badge text-bg-warning">&nbsp;</span> Gult (nekrose)</label>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2">
          <h2><span class="times-icon">I</span></h2>
        </div>
        <div class="col-sm-10">
          <p class="fw-bold">Infeksjonstegn:</p>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="signsOfInfection" type="checkbox" value="normalPhase" id="infNormalPhase" />
            <label class="form-check-label" for="infNormalPhase">Normal inflammasjonsfase</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="signsOfInfection" type="checkbox" value="delayedHealing" id="infDelayedHealing" />
            <label class="form-check-label" for="infDelayedHealing">Forsinket sårtilheling</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="signsOfInfection" type="checkbox" value="swelling" id="infSwelling" />
            <label class="form-check-label" for="infSwelling">Hevelse</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="signsOfInfection" type="checkbox" value="easilyBleedingWoundBed" id="infEasilyBleedingWoundBed" />
            <label class="form-check-label" for="infEasilyBleedingWoundBed">Lettblødende sårbunn</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="signsOfInfection" type="checkbox" value="localizedHeat" id="infLocalizedHeat" />
            <label class="form-check-label" for="infLocalizedHeat">Lokal varme</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="signsOfInfection" type="checkbox" value="pocketFormation" id="infPocketFormation" />
            <label class="form-check-label" for="infPocketFormation">Lommedannelse</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="signsOfInfection" type="checkbox" value="smell" id="infSmell" />
            <label class="form-check-label" for="infSmell">Lukt</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="signsOfInfection" type="checkbox" value="discoloredExudate" id="infDiscoloredExudate" />
            <label class="form-check-label" for="infDiscoloredExudate">Misfarget sårvæske</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="signsOfInfection" type="checkbox" value="rubor" id="infRubor" />
            <label class="form-check-label" for="infRubor">Rødme/rubor</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="signsOfInfection" type="checkbox" value="slimySurface" id="infSlimySurface" />
            <label class="form-check-label" for="infSlimySurface">Slimete overflate</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="signsOfInfection" type="checkbox" value="increasingPain" id="infIncreasingPain" />
            <label class="form-check-label" for="infIncreasingPain">Økende smerte</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="signsOfInfection" type="checkbox" value="increasingSize" id="infIncreasingSize" />
            <label class="form-check-label" for="infIncreasingSize">Økende størrelse</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="signsOfInfection" type="checkbox" value="hypergranulation" id="infHypergranulation" />
            <label class="form-check-label" for="infHypergranulation">Hypergranulering</label>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2">
          <h2><span class="times-icon">M</span></h2>
        </div>
        <div class="col-sm-10">
          <p class="fw-bold">Fuktighetsnivå:</p>
          <input type="range" class="form-range" v-model.number="moistureLevel" id="moistureLevel" min="0" max="3" step="1">
          <div class="d-flex justify-content-between">
            <span>Ingen</span>
            <span>Litt</span>
            <span>Middels</span>
            <span>Mye</span>
          </div>
          <div class="mt-3">
            <label for="moistureConsistency" class="form-label">Konsistens på fuktighet:</label>
            <input type="range" class="form-range" v-model="moistureConsistency" id="moistureConsistency" min="1" max="3" step="1" :disabled="isMoistureDisabled">
            <div class="d-flex justify-content-between">
              <span>Tynn</span>
              <span>Tykk</span>
              <span>Grøtete</span>
            </div>
          </div>
          <div class="mt-3">
            <p>Farge på fuktighet:</p>
            <div class="form-check fs-5">
              <input class="form-check-input" v-model="moistureColor" type="checkbox" value="serøs" id="moistureSerous" :disabled="isMoistureDisabled" />
              <label class="form-check-label" for="moistureSerous">Serøs</label>
            </div>
            <div class="form-check fs-5">
              <input class="form-check-input" v-model="moistureColor" type="checkbox" value="hvit" id="moistureWhite" :disabled="isMoistureDisabled" />
              <label class="form-check-label" for="moistureWhite">Blakket</label>
            </div>
            <div class="form-check fs-5">
              <input class="form-check-input" v-model="moistureColor" type="checkbox" value="gul" id="moistureYellow" :disabled="isMoistureDisabled" />
              <label class="form-check-label" for="moistureYellow">Gul</label>
            </div>
            <div class="form-check fs-5">
              <input class="form-check-input" v-model="moistureColor" type="checkbox" value="grønn" id="moistureGreen" :disabled="isMoistureDisabled" />
              <label class="form-check-label" for="moistureGreen">Grønn</label>
            </div>
            <div class="form-check fs-5">
              <input class="form-check-input" v-model="moistureColor" type="checkbox" value="rosa" id="moisturePink" :disabled="isMoistureDisabled" />
              <label class="form-check-label" for="moisturePink">Rosa</label>
            </div>
            <div class="form-check fs-5">
              <input class="form-check-input" v-model="moistureColor" type="checkbox" value="lys rød" id="moistureLightRed" :disabled="isMoistureDisabled" />
              <label class="form-check-label" for="moistureLightRed">Lys rød</label>
            </div>
          </div>
          <div class="mt-3">
            <label for="moistureSmell" class="form-label">Lukt:</label>
            <div class="form-check fs-5">
              <input class="form-check-input" v-model="moistureSmell" type="checkbox" id="moistureSmell" :disabled="isMoistureDisabled" />
              <label class="form-check-label" for="moistureSmell">Ja</label>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2">
          <h2><span class="times-icon">E</span></h2>
        </div>
        <div class="col-sm-10">
          <p class="fw-bold">Sårkanter:</p>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="edge" type="checkbox" value="dry" id="edgeDry" />
            <label class="form-check-label" for="edgeDry">Tørr, hard, opphøyet hud</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="edge" type="checkbox" value="edema" id="edgeEdema" />
            <label class="form-check-label" for="edgeEdema">Ødemer i sårkanter</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="edge" type="checkbox" value="macerated" id="edgeMacerated" />
            <label class="form-check-label" for="edgeMacerated">Oppbløtte sårkanter</label>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2">
          <h2><span class="times-icon">S</span></h2>
        </div>
        <div class="col-sm-10">
          <p class="fw-bold">Omkringliggende hud:</p>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="surroundingSkin" type="checkbox" value="drySkin" id="skinDry" />
            <label class="form-check-label" for="skinDry">Tørr hud</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="surroundingSkin" type="checkbox" value="maceratedSkin" id="skinMacerated" />
            <label class="form-check-label" for="skinMacerated">Oppbløtt hud</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="surroundingSkin" type="checkbox" value="redIrritatedSkin" id="skinRedIrritated" />
            <label class="form-check-label" for="skinRedIrritated">Rød og irritert hud</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="surroundingSkin" type="checkbox" value="edematousSkin" id="skinEdematous" />
            <label class="form-check-label" for="skinEdematous">Ødematøs</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="surroundingSkin" type="checkbox" value="eczema" id="skinEczema" />
            <label class="form-check-label" for="skinEczema">Eksem</label>
          </div>
          <div class="form-check fs-5">
            <input class="form-check-input" v-model="surroundingSkin" type="checkbox" value="discoloration" id="skinDiscoloration" />
            <label class="form-check-label" for="skinDiscoloration">Fargeforandringer</label>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2">
          <h2><span class="times-icon fa-solid fa-camera"></span></h2>
        </div>
        <div class="col-sm-10">
          <label for="photo" class="col-sm-2 col-form-label fw-bold">Last opp bilde:</label>
          <input id="photo" class="form-control" type="file" accept="image/*" capture="camera" @change="onFileChange" />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2">
          <h2><span class="times-icon fa-solid fa-pencil"></span></h2>
        </div>
        <div class="col-sm-10">
          <p class="fw-bold">Kommentar:</p>
          <textarea v-model="comment" class="form-control" rows="5" style="width: 100%;"></textarea>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-2">
          <h2><span class="times-icon fa-solid fa-calendar-days"></span></h2>
        </div>
        <div class="col-sm-10">
          <label for="registered" class="col-sm-4 col-form-label fw-bold">Dato for observasjoner:</label>
          <input id="registered" class="form-control" v-model="registered" type="datetime-local" :max="maxDate" required />
        </div>
      </div>
      <div class="d-flex justify-content-between mt-3">
        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#cancelModal">Avbryt</button>
        <button type="submit" class="btn btn-primary">Lagre</button>
      </div>
    </form>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="cancelModal" tabindex="-1" aria-labelledby="cancelModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="cancelModalLabel">Er du sikker på at du vil avbryte registreringen?</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          All informasjon lagt inn i skjemaet i dag vil bli slettet.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Nei, tilbake til skjema</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="proceedCancel">Ja, bekreft avbrytelse</button>
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
      moistureLevel: 0, // Default to "None"
      moistureConsistency: 1,
      moistureColor: [],
      moistureSmell: false,
      registered: new Date().toISOString().slice(0, 16),
      maxDate: new Date().toISOString().slice(0, 16),
      photo: null,
      edge: [],
      comment: '',
      length: null,
      width: null,
      depth: null,
      surroundingSkin: []
    };
  },
  computed: {
    isMoistureDisabled() {
      return Number(this.moistureLevel) === 0;
    }
  },
  created() {
    this.setNorwegianTimeZone();
    this.fetchPatientData();
  },
  watch: {
    moistureLevel(newValue) {
      if (Number(newValue) === 0) {
        this.moistureConsistency = 1;
        this.moistureColor = [];
        this.moistureSmell = false;
      }
    }
  },
  methods: {
    setNorwegianTimeZone() {
      const now = new Date();
      const offset = now.getTimezoneOffset() * 60000;
      const localISOTime = new Date(now.getTime() - offset).toISOString().slice(0, 16);
      this.registered = localISOTime;
      this.maxDate = localISOTime;
    },
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
            const maxSize = 1024;
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
        moistureLevel: this.moistureLevel,
        moistureConsistency: this.moistureLevel !== 0 ? this.moistureConsistency : 1,
        moistureColor: this.moistureLevel !== 0 ? this.moistureColor : [],
        moistureSmell: this.moistureLevel !== 0 ? this.moistureSmell : false,
        registered: this.registered,
        photo: this.photo,
        edge: this.edge,
        comment: this.comment,
        length: this.length,
        width: this.width,
        depth: this.depth,
        surroundingSkin: this.surroundingSkin
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
.times-icon {
  align-content: center;
  border: 1px solid #000;
  border-radius: .5rem;
  display: inline-block;
  padding: .25rem;
  text-align: center;
  width: 3rem;
}
/* Add any necessary styles here */
</style>
