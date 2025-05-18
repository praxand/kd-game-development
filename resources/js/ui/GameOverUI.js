import gameConstants from "../config/gameConstants";
import {
    GameOverText,
    RestartButton,
    SaveScoreButton,
} from "./components/GameOverComponents";

/**
 * GameOverUI klasse voor het beheren van het game-over scherm
 * Handelt zowel win als lose scenario's en score opslaan
 */
export default class GameOverUI {
    /**
     * Initialiseer de GameOverUI
     * @param {Phaser.Scene} scene - De Phaser scene waarin dit UI komt
     */
    constructor(scene) {
        this.scene = scene; // Bewaar een referentie naar de scene
    }

    /**
     * Toon het game-over scherm
     * @param {boolean} isWin - Of de speler heeft gewonnen
     * @param {string} userId - Unieke ID van de speler
     * @param {number} score - Behaalde score
     * @param {number} lives - Resterende levens
     * @returns {Promise} Een promise die resolved wanneer de speler kiest om verder te gaan
     */
    show(isWin, userId, score, lives) {
        // Bepaal het juiste bericht uit de config
        const message = isWin
            ? gameConstants.winMessage
            : gameConstants.loseMessage;

        // Maak de UI componenten aan
        this.gameOverText = new GameOverText(this.scene, message, score);
        this.restartButton = new RestartButton(this.scene);
        this.saveScoreButton = new SaveScoreButton(this.scene);

        // Return een promise die wacht op gebruikersactie
        return new Promise((resolve) => {
            // Herstartknop - keuze om direct opnieuw te spelen
            this.restartButton.on("pointerdown", () => {
                this.cleanup(); // Opruimen UI
                resolve(); // Door naar herstart
            });

            // Score opslaan knop - keuze om score te bewaren
            this.saveScoreButton.on("pointerdown", async () => {
                await this.saveScore(userId, score, lives); // Score opslaan
                this.cleanup(); // Opruimen UI
                resolve(); // Door naar herstart
            });
        });
    }

    /**
     * Sla de score op via de API
     * @param {string} userId - Unieke ID van de speler
     * @param {number} score - Behaalde score
     * @param {number} lives - Resterende levens
     */
    async saveScore(userId, score, lives) {
        await fetch("/api/score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, score, lives }),
        });
    }

    /**
     * Ruim de UI componenten op
     */
    cleanup() {
        // Vernietig alle aangemaakte componenten
        this.gameOverText.destroy();
        this.restartButton.destroy();
        this.saveScoreButton.destroy();
    }
}
