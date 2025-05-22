import gameConstants from "../config/gameConstants";
import physicsConstants from "../config/physicsConstants";

/**
 * Beheert alle botsingen en physics in het spel
 * @class CollisionManager
 */
export default class CollisionManager {
    /**
     * Maakt een CollisionManager aan
     * @param {Phaser.Scene} scene - De Phaser scene waar dit systeem toe behoort
     */
    constructor(scene) {
        this.scene = scene; // Bewaar een referentie naar de scene
    }

    /**
     * Initialiseert de physics wereld en botsingsgrenzen
     */
    setupPhysics() {
        // Beperk de botsingen tot de bovenkant en zijkanten van het scherm
        this.scene.physics.world.setBoundsCollision(true, true, true, false);

        // Verwijder alle bestaande colliders
        this.scene.physics.world.colliders.destroy();

        // Stel botsingen in voor elke bal
        this.scene.managers.state.balls.forEach((ball) =>
            this.setupBallCollisions(ball)
        );
    }

    /**
     * Registreert botsingshandlers voor een bal
     * @param {Phaser.GameObjects.Arc} ball - Het bal object
     */
    setupBallCollisions(ball) {
        // Botsing met peddel
        this.scene.physics.add.collider(
            ball, // De bal
            this.scene.paddle, // De peddel
            this.handleBallCollision.bind(this) // De botsingshandler
        );

        // Botsing met blokken
        this.scene.physics.add.collider(
            ball, // De bal
            this.scene.bricks, // De blokken
            this.handleBrickCollision.bind(this) // De botsingshandler
        );

        // Botsing met lava
        this.scene.physics.add.collider(
            ball, // De bal
            this.scene.lava, // De lava
            this.handleLavaCollision.bind(this) // De botsingshandler
        );
    }

    /**
     * Handelt botsingen tussen bal en peddel
     */
    handleBallCollision() {
        // Speel het geluidseffect af
        this.scene.audioManager.play("break");
    }

    createBlockExplosion(x, y) {
        // Array om de particles op te slaan
        const particles = [];

        // Kleuren voor de particles
        const colors = [0xffffff, 0xeeeeee, 0xdddddd, 0xcccccc];

        for (let i = 0; i < Phaser.Math.Between(6, 8); i++) {
            // Willekeurige grootte van de particles
            const size = Phaser.Math.Between(2, 5);

            const particle = this.scene.add.circle(
                x, // Willekeurige x-positie
                y, // Willekeurige y-positie
                size, // Willekeurige grootte
                colors[Math.floor(Math.random() * colors.length)] // Willekeurige kleur
            );

            // Voeg physics toe aan de particles
            this.scene.physics.add.existing(particle);

            particle.body.setVelocity(
                Phaser.Math.Between(-100, 100), // Willekeurige x-snelheid
                Phaser.Math.Between(-150, -50) // Willekeurige y-snelheid
            );

            this.scene.tweens.add({
                targets: particle, // particles
                alpha: 0, // Verander de alpha naar 0
                duration: 400, // Duur van de animatie
                onComplete: () => particle.destroy(), // Vernietig de particles na de animatie
            });

            particles.push(particle); // Voeg de particles toe aan de array
        }
    }

    /**
     * Handelt botsingen tussen bal en blokken
     * @param {Phaser.GameObjects.Arc} ball - Het bal object
     * @param {Phaser.GameObjects.Rectangle} brick - Het blok object
     */
    handleBrickCollision(ball, brick) {
        // Speel explosie af
        this.createBlockExplosion(brick.x, brick.y);

        // Speel het geluidseffect af
        this.scene.audioManager.play("break");

        // Vernietig het blok
        brick.destroy();

        // Verhoog de score
        this.scene.gameUI.scoreDisplay.increment(gameConstants.baseScore);

        // Verhoog de snelheid van de bal
        this.increaseBallSpeed(ball);

        // Activeer power-up als deze aanwezig is
        if (brick.powerUpType) {
            this.scene.managers.powerups.activatePowerUp(brick.powerUpType);
        }

        // Als er geen actieve blokken meer zijn, trigger dan de win effecten
        if (this.scene.bricks.countActive() === 0) this.triggerWinEffects();
    }

    /**
     * Verhoogt de snelheid van de bal na elke botsing met een steen
     * @param {Phaser.GameObjects.Arc} ball - Het bal object
     */
    increaseBallSpeed(ball) {
        const { speedIncreasePerBrick, maxSpeedMultiplier, launchVelocity } =
            physicsConstants.ball; // Haal de config op voor de bal

        // Haal de huidige snelheid op
        const velocity = ball.body.velocity.clone();

        // Bereken de huidige snelheid
        const currentSpeed = velocity.length();

        const baseSpeed = new Phaser.Math.Vector2(
            launchVelocity.X, // Basis snelheid van de bal
            launchVelocity.Y // Basis snelheid van de bal
        ).length();

        // Max snelheid van de bal
        const maxSpeed = baseSpeed * maxSpeedMultiplier;

        const newSpeed = Math.min(
            currentSpeed + speedIncreasePerBrick, // Verhoog de snelheid van de bal
            maxSpeed // Max snelheid van de bal
        );

        if (currentSpeed > 0) {
            velocity.normalize().scale(newSpeed); // Normaliseer de snelheid
            ball.body.setVelocity(velocity.x, velocity.y); // Stel de nieuwe snelheid in
        }
    }

    /**
     * Toont confetti-effect bij winst
     */
    showConfetti() {
        // Kleuren voor de confetti
        const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];

        for (let i = 0; i < 100; i++) {
            // Willekeurige x-positie
            const x = Phaser.Math.Between(0, this.scene.scale.width);

            const confetti = this.scene.add.rectangle(
                x, // Willekeurige x-positie
                Phaser.Math.Between(-100, 0), // Willekeurige y-positie
                Phaser.Math.Between(5, 15), // Willekeurige breedte
                Phaser.Math.Between(5, 15), // Willekeurige hoogte
                colors[Math.floor(Math.random() * colors.length)] // Willekeurige kleur
            );

            // Voeg physics toe aan de confetti
            this.scene.physics.add.existing(confetti);

            confetti.body.setVelocity(
                Phaser.Math.Between(-100, 100), // Willekeurige x-snelheid
                Phaser.Math.Between(200, 400) // Willekeurige y-snelheid
            );

            // Voeg zwaartekracht toe aan de confetti
            confetti.body.setGravityY(200);

            // Vernietig de confetti na 3 seconden
            this.scene.time.delayedCall(3000, () => confetti.destroy());
        }
    }

    /**
     * Start de win-effecten wanneer alle stenen zijn vernietigd
     */
    triggerWinEffects() {
        // Toon confetti-effect
        this.showConfetti();

        // Stop het spel
        this.scene.managers.state.gameOver(true);
    }

    /**
     * Handelt botsingen tussen bal en lava
     * @param {Phaser.GameObjects.Arc} ball - Het bal object
     */
    handleLavaCollision(ball) {
        // Zoek de index van de bal in de array
        const index = this.scene.managers.state.balls.indexOf(ball);

        if (index !== -1) {
            // Verwijder de bal uit de array
            this.scene.managers.state.balls.splice(index, 1);

            // Vernietig de bal
            ball.destroy();
        }

        if (this.scene.managers.state.balls.length === 0) {
            this.handleBallLoss(); // Verlies een leven als er geen ballen meer zijn
        }
    }

    /**
     * Handelt het verlies van een bal
     */
    handleBallLoss() {
        // Verlies een leven
        const remainingLives = this.scene.gameUI.livesDisplay.decrement();

        // Verlies punten
        this.scene.gameUI.scoreDisplay.decrement(gameConstants.lavaPenalty);

        remainingLives <= 0
            ? this.scene.managers.state.gameOver() // Als er geen levens meer zijn, game over
            : this.scene.managers.powerups.resetAfterLava(); // Reset power-ups na verlies van een bal
    }
}
