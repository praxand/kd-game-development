import gameConstants from "../config/gameConstants";

export default class GameOverUI {
    constructor(scene) {
        this.scene = scene;
    }

    show(userId, score, lives) {
        const { width, height } = this.scene.scale;

        const gameOverText = this.scene.add
            .text(
                width / 2,
                height / 2 - 50,
                `GAME OVER\nScore: ${score}`,
                gameConstants.ui.gameOverStyle
            )
            .setOrigin(0.5);

        const restartButton = this.scene.add
            .text(
                width / 2,
                height / 2 + 50,
                "Click to Restart",
                gameConstants.ui.restartStyle
            )
            .setOrigin(0.5)
            .setInteractive();

        const scoreButton = this.scene.add
            .text(
                width / 2,
                height / 2 + 100,
                "Click to save score",
                gameConstants.ui.restartStyle
            )
            .setOrigin(0.5)
            .setInteractive();

        return new Promise((resolve) => {
            const cleanupAndResolve = () => {
                gameOverText.destroy();
                restartButton.destroy();
                scoreButton.destroy();

                resolve();
            };

            restartButton.on("pointerdown", cleanupAndResolve);

            scoreButton.on("pointerdown", () => {
                const data = { userId, score, lives };

                fetch("/api/score", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }).then(() => {
                    cleanupAndResolve();
                });
            });
        });
    }
}
