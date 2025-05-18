/**
 * Hoofdgame configuratiebestand voor de Phaser game
 * Initialiseert en configureert de Phaser game instance
 */
import GameScene from "./scenes/GameScene";

/**
 * Haal het game container element op
 * @type {HTMLElement}
 */
const gameElement = document.getElementById("game");

// Controleer of het game element bestaat voordat we Phaser initialiseren
if (gameElement) {
    /**
     * Basisconfiguratie voor de Phaser game instantie
     * @type {Phaser.Types.Core.GameConfig}
     */
    const gameConfig = {
        type: Phaser.AUTO, // Automatische renderer selectie
        width: 800, // Standaard breedte van het game canvas
        height: 600, // Standaard hoogte van het game canvas
        parent: gameElement, // DOM element waarin de game geladen wordt
        scale: {
            mode: Phaser.Scale.FIT, // Schaalmodus: past binnen de container
            autoCenter: Phaser.Scale.CENTER_BOTH, // Centreer zowel horizontaal als verticaal
        },
        physics: {
            default: "arcade", // Gebruik Arcade Physics systeem
        },
        scene: [GameScene], // Array van de scene(s)
    };

    /**
     * Phaser Game instantie
     * @type {Phaser.Game}
     */
    const game = new Phaser.Game(gameConfig);

    // Voeg event listener toe voor window resize events
    window.addEventListener("resize", () => {
        /**
         * Pas de game schaling aan bij window resize
         * Behoudt de aspect ratio en centrering
         */
        game.scale.refresh();
    });
}
