import gameConstants from "../../config/gameConstants";

export default class LivesDisplay extends Phaser.GameObjects.Text {
    constructor(scene) {
        super(scene, 630, 16, "", {
            fontSize: 32,
        });

        this.setLives(gameConstants.startingLives);

        scene.add.existing(this);
    }

    setLives(value) {
        this.lives = Phaser.Math.Clamp(value, 0, gameConstants.maxLives);
        this.setText(`Lives: ${this.lives}`);

        return this.lives;
    }

    increment() {
        return this.setLives(++this.lives);
    }

    decrement() {
        return this.setLives(--this.lives);
    }
}
