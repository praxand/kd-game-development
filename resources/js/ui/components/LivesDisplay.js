import gameConstants from "../../config/gameConstants";

/**
 * LivesDisplay - Toont en beheert het aantal levens in de game
 * Positioneert rechtsboven in het scherm en zorgt voor correcte levensberekening
 */
export default class LivesDisplay extends Phaser.GameObjects.Text {
    /**
     * Maakt een levensdisplay aan
     * @param {Phaser.Scene} scene - De Phaser scene waarin dit display komt
     */
    constructor(scene) {
        // Roep de parent constructor aan met de positie, tekst en stijl
        super(
            scene, // Phaser scene
            630, // Horizontale positie
            16, // Verticale positie
            "", // Lege tekst
            {
                fontSize: 32, // Grootte van de tekst
            }
        );

        // Zet het startaantal levens uit de config
        this.setLives(gameConstants.startingLives);

        // Voeg de tekst toe aan de scene
        scene.add.existing(this);
    }

    /**
     * Stel het aantal levens in
     * @param {number} value - Gewenst aantal levens
     * @returns {number} Het daadwerkelijk ingestelde aantal levens
     */
    setLives(value) {
        // Zorg dat waarde binnen toegestane grenzen blijft
        this.lives = Phaser.Math.Clamp(
            value,
            0, // Minimum aantal levens
            gameConstants.maxLives // Maximum aantal levens uit de config
        );

        // Update de tekst
        this.setText(`Lives: ${this.lives}`);

        // Geef het nieuwe aantal levens terug
        return this.lives;
    }

    /**
     * Verhoog het aantal levens met 1
     * @returns {number} Het nieuwe aantal levens
     */
    increment() {
        return this.setLives(++this.lives);
    }

    /**
     * Verlaag het aantal levens met 1
     * @returns {number} Het nieuwe aantal levens
     */
    decrement() {
        return this.setLives(--this.lives);
    }
}
