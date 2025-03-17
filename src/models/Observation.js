export default class Observation {
  constructor(id, color, signsOfInfection, registered, photo, isMoist, moistureLevel, moistureConsistency, moistureColor, moistureSmell, edge, comment, length, width, depth, surroundingSkin) {
    this.id = id;
    this.color = color;
    this.signsOfInfection = signsOfInfection;
    this.registered = registered;
    this.photo = photo;
    this.isMoist = isMoist;
    this.moistureLevel = moistureLevel;
    this.moistureConsistency = moistureConsistency;
    this.moistureColor = moistureColor;
    this.moistureSmell = moistureSmell;
    this.edge = edge;
    this.comment = comment;
    this.length = length;
    this.width = width;
    this.depth = depth;
    this.surroundingSkin = surroundingSkin;
  }

  getTScore() {
    if (!this.color || !Array.isArray(this.color)) {
      return 'green';
    }
    if (this.color.includes('wineRed')
        || this.color.includes('yellow')) {
      return 'yellow';
    }
    if (this.color.includes('black')
        && this.isMoist) {
      return 'red';
    }
    return 'green';
  }

  getIScore() {
    if (Array.isArray(this.signsOfInfection)) {
      if (this.signsOfInfection.includes('smell')
          || this.signsOfInfection.includes('increasingPain')
          || this.signsOfInfection.includes('increasingSize')
          || this.signsOfInfection.includes('pocketFormation')
          || this.signsOfInfection.includes('hypergranulation')) {
        return 'red';
      }
      if (this.signsOfInfection.includes('discoloredExudate')
          || this.signsOfInfection.includes('delayedHealing')) {
        return 'yellow';
      }
    }
    return 'green';
  }

  getMScore() {
    if (!this.isMoist
        || (this.isMoist && this.moistureLevel == '1')) {
      return 'green';
    }
    if (this.moistureLevel == '2'
        || this.moistureConsistency == '1'
        || (Array.isArray(this.moistureColor) && this.moistureColor.includes('hvit'))) {
      return 'yellow';
    }
    if (this.moistureLevel == '3'
        || this.moistureConsistency == '2'
        || this.moistureConsistency == '3'
        || this.moistureSmell
        || (Array.isArray(this.moistureColor) && this.moistureColor.includes('grønn'))) {
      return 'red';
    }
    return 'green';
  }

  getEScore() {
    if (!this.edge || !Array.isArray(this.edge)) {
      return 'green';
    }
    if (this.edge.includes('macerated')) {
      return 'red';
    }
    if (this.edge.includes('dry')
        || this.edge.includes('edema')) {
      return 'yellow';
    }
    return 'green';
  }

  getSScore() {
    if (!this.surroundingSkin || !Array.isArray(this.surroundingSkin)) {
      return 'green';
    }
    if (this.surroundingSkin.includes('redIrritatedSkin')
        || this.surroundingSkin.includes('edematousSkin')) {
      return 'red';
    }
    if (this.surroundingSkin.includes('maceratedSkin')
        || this.surroundingSkin.includes('eczema')
        || this.surroundingSkin.includes('discoloration')) {
      return 'yellow';
    }
    return 'green';
  }

}
