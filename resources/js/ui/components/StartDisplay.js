/**
 * StartDisplay - Beheert het startscherm van het spel
 * Toont een titel, subtitel met startinstructie en animaties
 */
export default class StartDisplay extends Phaser.GameObjects.Container {
    /**
     * Maakt een startscherm aan
     * @param {Phaser.Scene} scene - De Phaser scene waarin dit display komt
     */
    constructor(scene) {
        // Roep de parent constructor aan met de positie
        super(
            scene,
            scene.cameras.main.centerX, // Horizontale positie
            scene.cameras.main.centerY - 50 // Verticale positie 50 pixels hoger
        );

        // Maak de titel aan
        this.titleText = new Phaser.GameObjects.Text(
            scene,
            0,
            0,
            "Best Education", // Titel van het spel
            {
                fontSize: "72px", // Grootte van de tekst
                color: "#ffff00", // Kleur van de tekst
                align: "center", // Gecentreerde uitlijning
            }
        ).setOrigin(0.5); // Perfecte centering

        // Maak een subtitel voor de tekst
        this.subtitleText = new Phaser.GameObjects.Text(
            scene,
            0,
            80, // Plaats de subtitel onder de titel
            "Press SPACE to start", // Subtitel van het spel
            {
                fontSize: "32px", // Grootte van de tekst
                color: "#ffffff", // Kleur van de tekst
                align: "center", // Gecentreerde uitlijning
            }
        ).setOrigin(0.5); // Perfecte centering

        // Voeg tekstobjecten toe aan de container
        this.add([this.titleText, this.subtitleText]);

        // Voeg de container toe aan de scene
        scene.add.existing(this);
    }

    /**
     * Toon het startscherm met animaties
     * @returns {StartDisplay} this voor method chaining
     */
    show() {
        // Maak de container zichtbaar
        this.setVisible(true);

        // Voeg een knipperanimatie toe aan de subtitel:
        this.scene.tweens.add({
            targets: this.subtitleText,
            alpha: 0.5, // 50% transparantie
            duration: 1000, // Duur van de animatie in milliseconden
            yoyo: true, // Keer terug naar de originele waarde
            repeat: -1, // Herhaal de animatie oneindig
        });

        return this;
    }

    /**
     * Verberg het startscherm met fade-out animatie
     * @returns {StartDisplay} this voor method chaining
     */
    hide() {
        // Voeg een fade-out animatie toe aan de container:
        this.scene.tweens.add({
            targets: this,
            alpha: 0, // Volledige transparantie
            duration: 300, // Duur van de animatie in milliseconden
            onComplete: () => {
                // Verberg de container na de animatie
                this.setVisible(false);
            },
        });

        return this;
    }
}
