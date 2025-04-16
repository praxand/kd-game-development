export default class ScoreDisplay extends Phaser.GameObjects.Text {
    constructor(scene, x, y, initialScore, style) {
        super(scene, x, y, `Score: ${initialScore}`, style);

        this.score = initialScore;
        scene.add.existing(this);
    }

    updateScore(newScore) {
        this.score = newScore;
        this.setText(`Score: ${newScore}`);
    }

    increment(amount) {
        return this.updateScore(this.score + amount);
    }

    decrement(amount) {
        return this.updateScore(
            this.score - amount < 0 ? 0 : this.score - amount
        );
    }
}
