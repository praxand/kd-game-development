import LivesDisplay from "./components/LivesDisplay";
import ScoreDisplay from "./components/ScoreDisplay";
import StartDisplay from "./components/StartDisplay";
import PauseDisplay from "./components/PauseDisplay";

export default class GameUI {
    constructor(scene) {
        this.scoreDisplay = new ScoreDisplay(scene);
        this.livesDisplay = new LivesDisplay(scene);
        this.StartDisplay = new StartDisplay(scene);
        this.pauseDisplay = new PauseDisplay(scene);
    }
}
