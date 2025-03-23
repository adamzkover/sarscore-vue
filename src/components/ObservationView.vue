<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="row">
        <div class="col-md-auto" v-if="observation.photo">
          <img :src="observation.photo" alt="Observation Photo" class="observation-photo" />
        </div>
        <div class="col-md mt-3 mt-md-0">
          <p class="times-section">
            <span class="times-icon fa-solid fa-calendar-days"></span>
            {{ observation.registered.replace('T', ' ') }}
          </p>
          <p class="times-section">
            <span class="times-icon fa-solid fa-ruler"></span>
            Lengde {{ observation.length }} x Bredde {{ observation.width }} x Dybde {{ observation.depth }} mm
          </p>
          <p class="times-section">
            <span :class="['times-icon', `times-icon-${observation.getTScore()}`]">T</span>
            {{ mapColorsToLabels(observation.color).join(', ') }}
          </p>
          <p class="times-section">
            <span :class="['times-icon', `times-icon-${observation.getIScore()}`]">I</span>
            {{ mapSignsOfInfectionToLabels(observation.signsOfInfection).join(', ') }}
          </p>
          <p class="times-section">
            <span :class="['times-icon', `times-icon-${observation.getMScore()}`]">M</span>
            {{ mapMoistureVariables(observation) }}
          </p>
          <p class="times-section">
            <span :class="['times-icon', `times-icon-${observation.getEScore()}`]">E</span>
            {{ mapEdgeConditionsToLabels(observation.edge).join(', ') }}
          </p>
          <p class="times-section">
            <span :class="['times-icon', `times-icon-${observation.getSScore()}`]">S</span>
            {{ mapSurroundingSkinToLabels(observation.surroundingSkin).join(', ') }}
          </p>
          <p class="times-section" v-if="observation.comment">
            <span class="times-icon fa-solid fa-pencil"></span>
            {{ observation.comment }}
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
  }
});

const colorLabels = {
  pink: 'Rosa',
  red: 'Rødt (friskt granulasjonsvev)',
  wineRed: 'Vinrød (mulig lokal infeksjon)',
  black: 'Svart (nekrose)',
  yellow: 'Gult (nekrose)'
};

const mapColorsToLabels = (colors) => {
  return colors.map(color => colorLabels[color] || color);
};

const infectionLabels = {
  normalPhase: 'Normal inflammasjonsfase',
  delayedHealing: 'Forsinket sårtilheling',
  swelling: 'Hevelse',
  easilyBleedingWoundBed: 'Lettblødende sårbunn',
  localizedHeat: 'Lokal varme',
  pocketFormation: 'Lommedannelse',
  smell: 'Lukt',
  discoloredExudate: 'Misfarget sårvæske',
  rubor: 'Rødme/rubor',
  slimySurface: 'Slimete overflate',
  increasingPain: 'Økende smerte',
  increasingSize: 'Økende størrelse',
  hypergranulation: 'Hypergranulering'
};

const mapSignsOfInfectionToLabels = (signs) => {
  return signs.length === 0
      ? ['Ingen tegn på infeksjon']
      : signs.map(sign => infectionLabels[sign] || sign);
};

const mapMoistureVariables = (observation) => {
  let moistureProperties = '';
  if (observation.moistureLevel > 0) {
    moistureProperties += 'Sårvæske: ';
  } else {
    moistureProperties += 'Ingen sårvæske';
    return moistureProperties;
  }
  moistureProperties += 'Mengde: ' + mapMoistureLevel(observation.moistureLevel);
  moistureProperties += '; Konsistens: ' + mapMoistureConsistency(observation.moistureConsistency);
  moistureProperties += '; Farge: ' + mapMoistureColorsToLabels(observation.moistureColor).join(', ');
  moistureProperties += '; Lukt: ' + (observation.moistureSmell ? 'Ja' : 'Nei');

  return moistureProperties;
}

const moistureColorLabels = {
  serøs: 'Serøs',
  hvit: 'Blakket',
  gul: 'Gul',
  grønn: 'Grønn',
  rosa: 'Rosa',
  'lys rød': 'Lys rød'
};

const mapMoistureColorsToLabels = (colors) => {
  return colors.map(color => moistureColorLabels[color] || color);
};

const surroundingSkinLabels = {
  drySkin: 'Tørr hud',
  maceratedSkin: 'Oppbløtt hud',
  redIrritatedSkin: 'Rød og irritert hud',
  edematousSkin: 'Ødematøs',
  eczema: 'Eksem',
  discoloration: 'Fargeforandringer'
};

const mapSurroundingSkinToLabels = (skinConditions) => {
  return skinConditions
      ? skinConditions.map(condition => surroundingSkinLabels[condition] || condition)
      : [];
};

const mapMoistureLevel = (moistureLevel) => {
  const moistureLevelLabels = ['Ingen', 'Litt', 'Middels', 'Mye'];
  return moistureLevelLabels[moistureLevel];
};

const mapMoistureConsistency = (moistureConsistency) => {
  const moistureConsistencyLabels = ['Tynn', 'Tykk', 'Grøtete'];
  return moistureConsistencyLabels[moistureConsistency];
};

const edgeLabels = {
  dry: 'Tørr, hard, opphøyet hud',
  edema: 'Ødemer i sårkanter',
  macerated: 'Oppbløtte sårkanter'
};

const mapEdgeConditionsToLabels = (edges) => {
  return edges ? edges.map(edge => edgeLabels[edge] || edge) : [];
};
</script>

<style scoped>
.observation-photo {
  width: 100%;
}
@media (min-width: 768px) {
  .observation-photo {
    max-width: 256px;
  }
}
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
