import {
    GameOverText,
    RestartButton,
    SaveScoreButton,
} from "./components/GameOverComponents";

export default class GameOverUI {
    constructor(scene) {
        this.scene = scene;
    }

    show(userId, score, lives) {
        this.gameOverText = new GameOverText(this.scene, score);
        this.restartButton = new RestartButton(this.scene);
        this.saveScoreButton = new SaveScoreButton(this.scene);

        return new Promise((resolve) => {
            this.restartButton.on("pointerdown", () => {
                this.cleanup();
                resolve();
            });

            this.saveScoreButton.on("pointerdown", async () => {
                await this.saveScore(userId, score, lives);
                this.cleanup();
                resolve();
            });
        });
    }

    async saveScore(userId, score, lives) {
        await fetch("/api/score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, score, lives }),
        });
    }

    cleanup() {
        this.gameOverText.destroy();
        this.restartButton.destroy();
        this.saveScoreButton.destroy();
    }
}
