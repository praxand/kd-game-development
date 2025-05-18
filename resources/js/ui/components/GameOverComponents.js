/**
 * GameOverText - Toont het game over bericht met de behaalde score
 * Gecentreerd in het scherm met duidelijke opmaak
 */
export class GameOverText extends Phaser.GameObjects.Text {
    /**
     * Maakt een game over tekst aan
     * @param {Phaser.Scene} scene - De Phaser scene
     * @param {string} message - Win/verlies bericht
     * @param {number} score - De behaalde score
     */
    constructor(scene, message, score) {
        super(
            scene, // Phaser scene
            400, // Horizontale positie
            250, // Verticale positie
            `${message}\nScore: ${score}`, // Tekst met score
            {
                fontSize: 32, // Grootte van de tekst
                align: "center", // Gecentreerde uitlijning
            }
        );

        this.setOrigin(0.5); // Perfecte centering

        // Voeg de tekst toe aan de scene
        scene.add.existing(this);
    }
}

/**
 * RestartButton - Interactieve knop om het spel te herstarten
 * Met hover animatie voor betere gebruikersfeedback
 */
export class RestartButton extends Phaser.GameObjects.Text {
    /**
     * Maakt een herstartknop aan
     * @param {Phaser.Scene} scene - De Phaser scene
     */
    constructor(scene) {
        // Roep de parent constructor aan met de positie, tekst en stijl
        super(
            scene, // Phaser scene
            400, // Horizontale positie
            350, // Verticale positie
            "Click to restart", // Tekst voor de knop
            {
                fontSize: "32px", // Grootte van de tekst
            }
        );

        this.setOrigin(0.5) // Perfecte centering voor tekst
            .setInteractive() // Maak de tekst klikbaar
            // Vergroot de tekst als de muis eroverheen gaat
            .on("pointerover", () => this.setScale(1.1))
            // Verklein de tekst als de muis er niet meer overheen gaat
            .on("pointerout", () => this.setScale(1));

        // Voeg de knop toe aan de scene
        scene.add.existing(this);
    }
}

/**
 * SaveScoreButton - Knop om score op te slaan en te herstarten
 * Visueel consistent met RestartButton maar met extra functionaliteit
 */
export class SaveScoreButton extends Phaser.GameObjects.Text {
    /**
     * Maakt een score opslaan knop aan
     * @param {Phaser.Scene} scene - De Phaser scene
     */
    constructor(scene) {
        // Roep de parent constructor aan met de positie, tekst en stijl
        super(
            scene,
            400, // Horizontale positie
            400, // Verticale positie
            "Click to restart and save score", // Tekst voor de knop
            {
                fontSize: "32px", // Grootte van de tekst
            }
        );

        this.setOrigin(0.5) // Perfecte centering voor tekst
            .setInteractive() // Maak de tekst klikbaar
            // Vergroot de tekst als de muis eroverheen gaat
            .on("pointerover", () => this.setScale(1.1))
            // Verklein de tekst als de muis er niet meer overheen gaat
            .on("pointerout", () => this.setScale(1));

        // Voeg de knop toe aan de scene
        scene.add.existing(this);
    }
}
