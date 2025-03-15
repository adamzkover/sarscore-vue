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

  getRandomScore() {
    const scores = ['green', 'yellow', 'red'];
    return scores[Math.floor(Math.random() * scores.length)];
  }

  getTScore() {
    return this.getRandomScore();
  }

  getIScore() {
    return this.getRandomScore();
  }

  getMScore() {
    return this.getRandomScore();
  }

  getEScore() {
    return this.getRandomScore();
  }

  getSScore() {
    return this.getRandomScore();
  }
}
