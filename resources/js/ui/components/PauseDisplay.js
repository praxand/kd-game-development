/**
 * PauseDisplay - Beheert het pauze scherm met overlay en instructies
 * Toont een semi-transparante overlay met pauze informatie wanneer het spel gepauzeerd is
 */
export default class PauseDisplay extends Phaser.GameObjects.Text {
    /**
     * Maakt een pauze display aan
     * @param {Phaser.Scene} scene - De Phaser scene waarin de display wordt aangemaakt
     */
    constructor(scene) {
        // Roep de parent constructor aan met de positie, tekst en stijl
        super(
            scene, // Phaser scene
            400, // Horizontale positie
            300, // Verticale positie
            "PAUSED\nPress ESC to resume", // Pauze tekst
            {
                fontSize: 32, // Grootte van de tekst
                align: "center", // Gecentreerde uitlijning
            }
        );

        // Haal de camera dimensies op voor de overlay
        const { centerX, centerY, width, height } = scene.cameras.main;

        // Maak semi-transparante overlay achtergrond
        this.background = scene.add
            .rectangle(
                centerX, // Horizontale positie
                centerY, // Verticale positie
                width, // Breedte
                height, // Hoogte
                0x000000, // Zwarte kleur
                0.5 // 50% transparantie
            )
            .setDepth(99) // Onder andere game objecten
            .setVisible(false); // Begin verborgen

        this.setOrigin(0.5) // Perfecte centering
            .setDepth(100) // Boven de overlay
            .setVisible(false); // Begin verborgen

        // Voeg de overlay en tekst toe aan de scene
        scene.add.existing(this);
    }

    /**
     * Schakel de pauze display zichtbaarheid
     * @param {boolean} show - Of de display getoond moet worden
     * @returns {PauseDisplay} this voor method chaining
     */
    toggle(show) {
        // Toon of verberg de tekst en achtergrond
        this.setVisible(show);
        this.background.setVisible(show);

        return this;
    }

    /**
     * Toon het pauze-scherm
     * @returns {PauseDisplay} this voor method chaining
     */
    show() {
        return this.toggle(true);
    }

    /**
     * Verberg het pauze-scherm
     * @returns {PauseDisplay} this voor method chaining
     */
    hide() {
        return this.toggle(false);
    }
}
