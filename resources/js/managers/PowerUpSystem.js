import gameConstants from "../config/gameConstants";
import physicsConstants from "../config/physicsConstants";

/**
 * Beheert alle power-up functionaliteiten in het spel
 * @class PowerUpSystem
 */
export default class PowerUpSystem {
    /**
     * Maakt een PowerUpSystem aan
     * @param {Phaser.Scene} scene - De Phaser scene waar dit systeem toe behoort
     */
    constructor(scene) {
        this.scene = scene; // Bewaar een referentie naar de scene
    }

    /**
     * Activeert een power-up op basis van type
     * @param {string} type - Het type power-up
     */
    activatePowerUp(type) {
        switch (type) {
            case gameConstants.powerUps.types.multiBall:
                this.activateMultiBall(); // Activeer de multi-ball power-up
                break;
            case gameConstants.powerUps.types.extraLife:
                this.scene.gameUI.livesDisplay.increment(); // Voeg een leven toe
                break;
        }
    }

    /**
     * Activeert de multi-ball power-up
     * Creëert 2 nieuwe ballen met willekeurige horizontale snelheid
     */
    activateMultiBall() {
        // Als er al een power-up actief is, doe dan niets
        if (this.scene.managers.state.powerUpActive) return;

        // Zet de power-up status op actief
        this.scene.managers.state.powerUpActive = true;

        // Maak 2 nieuwe ballen aan
        for (let i = 0; i < 2; i++) {
            // Maak een nieuwe bal aan met een willekeurige horizontale snelheid
            const newBall = this.scene.managers.objects.createBall(
                this.scene.paddle.x, // Plaats de bal op de peddel
                this.scene.paddle.y -
                    this.scene.paddle.height / 2 -
                    gameConstants.ball.radius // Zorg ervoor dat de bal boven de peddel komt
            );

            // Zet de bal in de array van ballen
            this.scene.managers.state.balls.push(newBall);

            // Zet de snelheid van de nieuwe bal
            newBall.body.setVelocity(
                Phaser.Math.Between(-300, 300), // Willekeurige horizontale snelheid
                physicsConstants.ball.launchVelocity.Y // Standaard verticale snelheid
            );
        }

        // Zet timer om power-up na 10 seconden te deactiveren
        this.scene.managers.state.multiBallTimeout =
            this.scene.time.delayedCall(10000, () => {
                this.deactivateMultiBall(); // Deactiveer de multi-ball power-up
            });
    }

    /**
     * Deactiveert de multi-ball power-up
     * Verwijdert alle extra ballen behalve de hoofdbal
     */
    deactivateMultiBall() {
        // Zet de power-up status op inactief
        this.scene.managers.state.powerUpActive = false;

        // Verwijder alle extra ballen
        while (this.scene.managers.state.balls.length > 1) {
            // Verwijder de laatste bal uit de array
            const ball = this.scene.managers.state.balls.pop();

            // Verwijder de bal uit de physics world
            ball.destroy();
        }

        // Zorg dat er altijd minstens 1 bal is
        if (this.scene.managers.state.balls.length === 0) {
            // Maak een nieuwe bal aan
            this.scene.ball = this.scene.managers.objects.createBall();

            // Plaats de nieuwe bal op de peddel
            this.scene.managers.state.balls.push(this.scene.ball);

            // Zet de bal op de peddel
            this.scene.managers.state.stickBallToPaddle();
        }
    }

    /**
     * Reset het spel na balverlies in lava
     * Zorgt voor een nieuwe bal als er geen meer zijn
     */
    resetAfterLava() {
        if (!this.scene.managers.state.balls.length) {
            // Maak een nieuwe bal aan
            this.scene.ball = this.scene.managers.objects.createBall();

            // Plaats de nieuwe bal op de peddel
            this.scene.managers.state.balls.push(this.scene.ball);
        }

        // Zet de bal op de peddel
        this.scene.managers.state.stickBallToPaddle();
    }
}
