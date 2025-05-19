import Phaser from "phaser";
import GameStateManager from "../managers/GameStateManager";
import GameObjectFactory from "../managers/GameObjectFactory";
import CollisionManager from "../managers/CollisionManager";
import PowerUpSystem from "../managers/PowerUpSystem";
import InputManager from "../managers/InputManager";
import AudioManager from "../utils/AudioManager";

/**
 * Hoofd game scene die alle onderdelen van het spel aanstuurt.
 * @class GameScene
 * @extends Phaser.Scene
 */
export default class GameScene extends Phaser.Scene {
    constructor() {
        super("game-scene"); // Unieke naam voor de scene

        /**
         * Object met alle managers
         * @property {Object} managers
         * @property {GameStateManager} managers.state - Beheert de spelstatus
         * @property {GameObjectFactory} managers.objects - Maakt spelobjecten aan
         * @property {CollisionManager} managers.collisions - Handelt botsingen
         * @property {PowerUpSystem} managers.powerups - Beheert power-ups
         * @property {InputManager} managers.input - Verwerkt invoer
         */
        this.managers = {
            state: new GameStateManager(this),
            objects: new GameObjectFactory(this),
            collisions: new CollisionManager(this),
            powerups: new PowerUpSystem(this),
            input: new InputManager(this),
        };
    }

    /**
     * Laadt alle benodigde bestanden in.
     * Start de audio manager en laadt geluiden.
     */
    preload() {
        // Maak een nieuwe audio manager aan
        this.audioManager = new AudioManager(this);

        // Laad geluiden in
        this.audioManager.preload();
    }

    /**
     * Maakt het spel aan en initialiseert systemen.
     * Zet de beginsituatie van het spel op.
     */
    create() {
        // Start audio systeem
        this.audioManager.init();

        // Initialiseer spelstatus
        this.managers.state.init();

        // Maak spelobjecten aan (bal, peddel, blokken, etc.)
        this.managers.objects.createGameObjects();

        // Zet physics en botsingen op
        this.managers.collisions.setupPhysics();

        // Activeer besturing
        this.managers.input.setupInput();

        // Plaats bal op de peddel
        this.managers.state.stickBallToPaddle();
    }

    /**
     * Hoofd game loop.
     * Verwerkt updates wanneer het spel niet gepauzeerd is.
     */
    update() {
        // Sla over als spel gepauzeerd is
        if (this.managers.state.isPaused) return;

        // Verwerk invoer
        this.managers.input.update();

        // Update spelstatus
        this.managers.state.update();
    }
}
