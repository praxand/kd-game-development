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
        return this.scoreDisplay?.getScore() ?? 0;
    }

    showPauseMenu() {
        if (!this.pauseText) {
            this.pauseText = this.scene.add.text(
                this.scene.scale.width / 2,
                this.scene.scale.height / 2,
                "PAUSED\n\nPress ESC to resume",
                gameConstants.ui.pauseMenuStyle
            )
            .setOrigin(0.5)
            .setDepth(100);
        } else {
            this.pauseText.setVisible(true);
        }
    }
    
    hidePauseMenu() {
        this.pauseText?.setVisible(false);
    }
}
