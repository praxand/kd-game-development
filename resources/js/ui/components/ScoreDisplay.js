export default class ScoreDisplay extends Phaser.GameObjects.Text {
    constructor(scene, x, y, initialScore, style) {
        super(scene, x, y, `Score: ${initialScore}`, style);

        this.score = initialScore;
        scene.add.existing(this);
    }

    updateScore(newScore) {
        this.score = newScore;
        this.setText(`Score: ${this.score}`);
    }

    add(amount) {
        this.score += amount;
        this.updateScore(this.score);

        return this.score;
    }

    subtract(amount) {
        this.score = this.score - amount < 0 ? 0 : this.score - amount;
        this.updateScore(this.score);

        return this.score;
    }

    getScore() {
        return this.score;
    }
}
