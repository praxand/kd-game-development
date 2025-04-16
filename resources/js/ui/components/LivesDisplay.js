import gameConstants from "../../config/gameConstants";

export default class LivesDisplay extends Phaser.GameObjects.Text {
    constructor(scene, x, y, initialLives, style) {
        super(scene, x, y, `Lives: ${initialLives}`, style);

        this.lives = initialLives;
        scene.add.existing(this);
    }

    updateLives(newLives) {
        this.lives = newLives;
        this.setText(`Lives: ${this.lives}`);

        return this.lives;
    }

    increment() {
        return this.updateLives(
            this.lives < gameConstants.maxLives ? ++this.lives : this.lives
        );
    }

    decrement() {
        return this.updateLives(--this.lives);
    }
}
