import GameScene from "./scenes/GameScene";

const gameElement = document.getElementById("game");

if (gameElement) {
    const gameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameElement,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        physics: {
            default: "arcade",
            arcade: {
                debug: false,
                gravity: { y: 0 },
            },
        },
        scene: [GameScene],
    };

    const game = new Phaser.Game(gameConfig);

    window.addEventListener("resize", () => {
        game.scale.refresh();
    });
}
