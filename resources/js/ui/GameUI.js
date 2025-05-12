import LivesDisplay from "./components/LivesDisplay";
import ScoreDisplay from "./components/ScoreDisplay";
import gameConstants from "../config/gameConstants";

export default class GameUI {
    constructor(scene) {
        this.scene = scene;

        this.scoreDisplay = this.createScoreDisplay();
        this.livesDisplay = this.createLivesDisplay();
    }

    createScoreDisplay() {
        return new ScoreDisplay(
            this.scene,
            gameConstants.ui.scorePosition.x,
            gameConstants.ui.scorePosition.y,
            gameConstants.startingScore,
            gameConstants.ui.textStyle
        );
    }

    createLivesDisplay() {
        return new LivesDisplay(
            this.scene,
            gameConstants.ui.livesPosition.x,
            gameConstants.ui.livesPosition.y,
            gameConstants.startingLives,
            gameConstants.ui.textStyle
        );
    }

    setVisible(visible) {
        this.scoreDisplay.setVisible(visible);
        this.livesDisplay.setVisible(visible);
    }

    getScore() {
        return this.scoreDisplay.score;
    }

    getLives() {
        return this.livesDisplay.lives;
    }

    showPauseMenu() {
        const { width, height } = this.scene.scale;

        return (this.pauseText = this.scene.add
            .text(
                width / 2,
                height / 2,
                "PAUSED\nPress ESC to resume",
                gameConstants.ui.pauseMenuStyle
            )
            .setOrigin(0.5));
    }

    hidePauseMenu() {
        return this.pauseText.setVisible(false);
    }
}
