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
    /*
    green: Rosa, Rødt
    yellow: Vinrød, Gult
    red: Svart (hvis også fuktighet)
    */
    return this.getRandomScore();
  }

  getIScore() {
    /*
    green:
    yellow: Misfarget sårvæske; Forsinket sårtilheling
    red: Lukt, Økende smerte; Økende størrelse; Lommedannelse; Hypergranulering
    */
    return this.getRandomScore();
  }

  getMScore() {
    /*
    green: Ingen; Litt
    yellow: Middels; Tynn sårvæske; Hvit sårvæske
    red: Mye; Lukt uansett mengde; Grønn og tykk sårvæske
    */
    return this.getRandomScore();
  }

  getEScore() {
    /*
    green: Hvis ingen er valgt
    yellow: Tørr, hard, opphøyet hud; Ødemer i sårkanter
    red: Oppbløtte sårkanter
    */
    return this.getRandomScore();
  }

  getSScore() {
    /*
    green: Tørr hud;
    yellow: Oppbløtt hud; Eksem; Fargeforandringer
    red: Rød og irritert hud; Ødematøs
    */
    return this.getRandomScore();
  }
}
