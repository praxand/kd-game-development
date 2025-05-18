import gameConstants from "../../config/gameConstants";

/**
 * ScoreDisplay - Toont en beheert de score tijdens het spel
 * Positioneert zich linksboven in het scherm en zorgt voor correcte scoreberekening
 */
export default class ScoreDisplay extends Phaser.GameObjects.Text {
    /**
     * Maakt een score display aan
     * @param {Phaser.Scene} scene - De Phaser scene waarin dit display komt
     */
    constructor(scene) {
        // Roep de parent constructor aan met de positie, tekst en stijl
        super(scene, 16, 16, "", {
            fontSize: 32, // Grootte van de tekst
        });

        // Zet het startaantal punten (uit gameConstants)
        this.setScore(gameConstants.startingScore);

        // Voeg de tekst toe aan de scene
        scene.add.existing(this);
    }

    /**
     * Stel de score in (garandeert niet-negatieve waarde)
     * @param {number} value - Gewenste score
     * @returns {number} De daadwerkelijk ingestelde score
     */
    setScore(value) {
        // Zorg dat score niet negatief wordt
        this.score = Math.max(0, value);

        // Update de tekst
        this.setText(`Score: ${this.score}`);

        // Geef het nieuwe aantal punten terug
        return this.score;
    }

    /**
     * Verhoog de score met een bepaalde hoeveelheid
     * @param {number} amount - Aantal punten om toe te voegen
     * @returns {number} De nieuwe score
     */
    increment(amount) {
        // Verhoog het aantal punten met een bepaalde waarde
        return this.setScore(this.score + amount);
    }

    /**
     * Verlaag de score met een bepaalde hoeveelheid (maar niet onder 0)
     * @param {number} amount - Aantal punten om af te trekken
     * @returns {number} De nieuwe score
     */
    decrement(amount) {
        // Verlaag het aantal punten met een bepaalde waarde, maar zorg dat het niet onder 0 komt
        return this.setScore(this.score - amount < 0 ? 0 : this.score - amount);
    }
}
