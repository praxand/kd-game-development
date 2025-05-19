import gameConstants from "../config/gameConstants";
import GameOverUI from "../ui/GameOverUI";
import GameUI from "../ui/GameUI";

/**
 * Beheert de algemene spelstatus en levenscyclus van het spel
 * @class GameStateManager
 */
export default class GameStateManager {
    /**
     * Maakt een GameStateManager aan
     * @param {Phaser.Scene} scene - De Phaser scene waar dit systeem toe behoort
     */
    constructor(scene) {
        this.scene = scene; // Bewaar een referentie naar de scene
        this.resetGameState(); // Initialiseer de spelstatus
        this.resetPowerUpCounts(); // Initialiseer de power-up tellingen
    }

    /**
     * Reset de basis spelstatus naar beginwaarden
     */
    resetGameState() {
        // Lijst van ballen in het spel
        this.balls = [];

        // Geeft aan of de bal gelanceerd is
        this.ballLaunched = false;

        // Geeft aan of er een power-up actief is
        this.powerUpActive = false;

        // Geeft aan of het spel gepauzeerd is
        this.isPaused = false;
    }

    /**
     * Reset de tellers voor power-ups
     */
    resetPowerUpCounts() {
        // Tellers voor power-ups
        this.powerUpCounts = { multiBall: 0, extraLife: 0 };
    }

    /**
     * Initialiseert de UI componenten
     */
    init() {
        // Maak een nieuwe GameUI aan
        this.scene.gameUI = new GameUI(this.scene);

        // Toon de startscherm
        this.scene.gameUI.StartDisplay.show();

        // Maak een nieuwe GameOverUI aan
        this.scene.gameOverUI = new GameOverUI(this.scene);
    }

    /**
     * Plaatst de bal op de peddel
     */
    stickBallToPaddle() {
        // Als de bal al gelanceerd is, doe niets
        if (
            this.balls.length === 0 ||
            !this.scene.paddle ||
            !this.balls[0].body
        )
            return;

        // De eerste bal in de lijst
        const mainBall = this.balls[0];

        mainBall.setPosition(
            this.scene.paddle.x, // Plaats de bal op de peddel
            this.scene.paddle.y -
                this.scene.paddle.height / 2 -
                gameConstants.ball.radius // Zorg ervoor dat de bal boven de peddel komt
        );

        // Stop de bal
        mainBall.body.setVelocity(0, 0);

        // Geeft aan of de bal gelanceerd is
        this.ballLaunched = false;
    }

    /**
     * Update logica die elke frame wordt uitgevoerd
     */
    update() {
        if (!this.ballLaunched && this.balls.length === 1)
            this.stickBallToPaddle(); // Zorg ervoor dat de bal op de peddel blijft
    }

    /**
     * Schakelt tussen pauze en hervatten van het spel
     */
    togglePause() {
        // Wissel de pauzestatus om
        this.isPaused = !this.isPaused;

        // Pauzeer of hervat de physics engine
        this.scene.physics[this.isPaused ? "pause" : "resume"]();

        // Toon of verberg de pauze UI
        this.scene.gameUI.pauseDisplay[this.isPaused ? "show" : "hide"]();
    }

    /**
     * Handelt het game over scenario
     * @param {boolean} [isWin=false] - Of het spel gewonnen is
     * @returns {Promise<void>}
     */
    async gameOver(isWin = false) {
        // Pauzeer de physics engine
        this.scene.physics.pause();

        // Ruim de game objecten op
        this.cleanupGameObjects();

        // Speel het juiste geluid af
        this.scene.audioManager.play(isWin ? "win" : "lose");

        // Toon de game over UI
        await this.scene.gameOverUI.show(
            isWin, // Of het spel gewonnen is
            window.userId, // De ID van de gebruiker
            this.scene.gameUI.scoreDisplay.score, // De score van de speler
            this.scene.gameUI.livesDisplay.lives // Het aantal levens van de speler
        );

        // Reset de spelstatus
        this.scene.scene.restart();
    }

    /**
     * Ruimt alle spelobjecten op
     */
    cleanupGameObjects() {
        // Verwijder elke bal
        this.balls.forEach((ball) => ball.destroy());

        // Leeg de lijst van ballen
        this.balls = [];

        [this.scene.paddle, this.scene.bricks].forEach(
            (obj) => obj?.setVisible(false) // Verberg de peddel en de bricks
        );

        // Verberg de UI
        this.scene.gameUI.setVisible(false);
    }
}
