import physicsConstants from "../config/physicsConstants";

/**
 * Beheert alle gebruikersinvoer (toetsenbord) voor het spel
 * @class InputManager
 */
export default class InputManager {
    /**
     * Maakt een InputManager aan
     * @param {Phaser.Scene} scene - De Phaser scene waar dit systeem toe behoort
     */
    constructor(scene) {
        this.scene = scene; // Bewaar een referentie naar de scene
    }

    /**
     * Initialiseert alle invoerbesturingen
     * Zet de toetsenbordlisteners op
     */
    setupInput() {
        // Pijltjestoetsen voor peddelbeweging
        this.scene.cursors = this.scene.input.keyboard.createCursorKeys();

        // Spatiebalk voor het lanceren van de bal
        this.scene.spaceKey = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        // Escape-toets voor pauzeren
        this.scene.escKey = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
        );

        // Pauzeer het spel bij indrukken Escape-toets
        this.scene.escKey.on("down", () => {
            if (this.scene.managers.state.ballLaunched) {
                this.scene.managers.state.togglePause(); // Pauzeer het spel
            }
        });
    }

    /**
     * Update methode die elke frame wordt aangeroepen
     * Verwerkt alle invoerlogica
     */
    update() {
        // Verwerk de invoer voor de peddelbeweging
        this.handlePaddleMovement();

        // Verwerk de invoer voor het lanceren van de bal
        this.handleBallLaunchInput();
    }

    /**
     * Verwerkt de peddelbeweging op basis van toetsinvoer
     */
    handlePaddleMovement() {
        // Bereken de snelheid op basis van invoer
        const velocity = this.calculatePaddleVelocity();

        // Stel de snelheid van de peddel in
        this.scene.paddle.body.setVelocityX(velocity);
    }

    /**
     * Berekent de snelheid van de peddel op basis van ingedrukte toetsen
     * @returns {number} De horizontale snelheid van de peddel
     */
    calculatePaddleVelocity() {
        // Haal de snelheid op uit de config
        const { speed } = physicsConstants.paddle;

        // Ga naar links als de linker pijltoets is ingedrukt
        if (this.scene.cursors.left.isDown) return -speed;

        // Ga naar rechts als de rechter pijltoets is ingedrukt
        if (this.scene.cursors.right.isDown) return speed;

        // Stop de peddel als geen toets is ingedrukt
        return 0;
    }

    /**
     * Controleert of de bal gelanceerd moet worden
     */
    handleBallLaunchInput() {
        if (
            Phaser.Input.Keyboard.JustDown(this.scene.spaceKey) &&
            !this.scene.managers.state.ballLaunched &&
            this.scene.managers.state.balls.length > 0
        ) {
            this.launchBall(); // Lanceer de bal
        }
    }

    /**
     * Lanceert de bal met een willekeurige hoek
     * Verbergt het startscherm en markeert de bal als gelanceerd
     */
    launchBall() {
        // Verberg startscherm
        this.scene.gameUI.StartDisplay.hide();

        // Pak de hoofdbal
        const mainBall = this.scene.managers.state.balls[0];

        // Haal de lancering snelheid op
        const { launchVelocity } = physicsConstants.ball;

        // Zet snelheid (willekeurige hoek maar vaste verticale snelheid)
        mainBall.body.setVelocity(
            Phaser.Math.Between(-launchVelocity.X, launchVelocity.X), // Zet de horizontale snelheid vast
            launchVelocity.Y // Zet de verticale snelheid vast
        );

        // Markeer als gelanceerd
        this.scene.managers.state.ballLaunched = true;
    }
}
