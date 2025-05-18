import ScoreDisplay from "./components/ScoreDisplay";
import LivesDisplay from "./components/LivesDisplay";
import StartDisplay from "./components/StartDisplay";
import PauseDisplay from "./components/PauseDisplay";

/**
 * GameUI - Centrale klasse voor het beheren van alle UI-componenten
 * Coordineert de zichtbaarheid en interactie van game UI-elementen
 */
export default class GameUI {
    /**
     * Initialiseer alle UI-componenten
     * @param {Phaser.Scene} scene - De Phaser scene waar de UI komt
     */
    constructor(scene) {
        // Initialiseer score weergave
        this.scoreDisplay = new ScoreDisplay(scene);

        // Initialiseer levens weergave
        this.livesDisplay = new LivesDisplay(scene);

        // Initialiseer startscherm
        this.StartDisplay = new StartDisplay(scene);

        // Initialiseer pauzescherm
        this.pauseDisplay = new PauseDisplay(scene);
    }

    /**
     * Stel zichtbaarheid in voor basis UI-elementen
     * @param {boolean} value - Of de elementen zichtbaar moeten zijn
     */
    setVisible(value) {
        // Toon/verberg score display
        this.scoreDisplay.setVisible(value);

        // Toon/verberg levens display
        this.livesDisplay.setVisible(value);
    }
}
