export class GameOverText extends Phaser.GameObjects.Text {
    constructor(scene, score) {
        super(scene, 400, 250, `GAME OVER\nScore: ${score}`, {
            fontSize: 32,
            align: "center",
        });

        this.setOrigin(0.5);

        scene.add.existing(this);
    }
}
  
export class RestartButton extends Phaser.GameObjects.Text {
    constructor(scene) {
        super(scene, 400, 350, "Click to restart", {
            fontSize: "32px",
        });

        this.setOrigin(0.5)
            .setInteractive()
            .on("pointerover", () => this.setScale(1.1))
            .on("pointerout", () => this.setScale(1));

        scene.add.existing(this);
    }
}

export class SaveScoreButton extends Phaser.GameObjects.Text {
    constructor(scene) {
        super(scene, 400, 400, "Click to restart and save score", {
            fontSize: "32px",
        });

        this.setOrigin(0.5)
            .setInteractive()
            .on("pointerover", () => this.setScale(1.1))
            .on("pointerout", () => this.setScale(1));

        scene.add.existing(this);
    }
}
