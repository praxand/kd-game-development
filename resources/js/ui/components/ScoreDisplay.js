import gameConstants from "../../config/gameConstants";

export default class ScoreDisplay extends Phaser.GameObjects.Text {
    constructor(scene) {
        super(scene, 16, 16, "", {
            fontSize: 32,
        });

        this.setScore(gameConstants.startingScore);

        scene.add.existing(this);
    }

    setScore(value) {
        this.score = Math.max(0, value);
        this.setText(`Score: ${this.score}`);

        return this.score;
    }

    increment(amount) {
        return this.setScore(this.score + amount);
    }

    decrement(amount) {
        return this.setScore(this.score - amount < 0 ? 0 : this.score - amount);
    }
}
