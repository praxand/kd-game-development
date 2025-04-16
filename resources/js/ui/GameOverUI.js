import gameConstants from "../config/gameConstants";

export default class GameOverUI {
    constructor(scene) {
        this.scene = scene;
    }

    show(score) {
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

        return new Promise((resolve) => {
            const handler = () => {
                gameOverText.destroy();
                restartButton.destroy();

                this.scene.input.keyboard.off("keydown-R", handler);

                resolve();
            };

            restartButton.on("pointerdown", handler);
            this.scene.input.keyboard.on("keydown-R", handler);
        });
    }
}
