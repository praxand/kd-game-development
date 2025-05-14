export default class StartDisplay extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(
            scene,
            scene.cameras.main.centerX,
            scene.cameras.main.centerY - 50
        );

        this.titleText = new Phaser.GameObjects.Text(
            scene,
            0,
            0,
            "Best Education",
            {
                fontSize: "72px",
                color: "#ffff00",
                align: "center",
            }
        ).setOrigin(0.5);

        this.subtitleText = new Phaser.GameObjects.Text(
            scene,
            0,
            80,
            "Press SPACE to start",
            {
                fontSize: "32px",
                color: "#ffffff",
                align: "center",
            }
        ).setOrigin(0.5);

        this.add([this.titleText, this.subtitleText]);

        scene.add.existing(this);
    }

    show() {
        this.setVisible(true);

        this.scene.tweens.add({
            targets: this.subtitleText,
            alpha: 0.5,
            duration: 1000,
            yoyo: true,
            repeat: -1,
        });

        return this;
    }

    hide() {
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 300,
            onComplete: () => {
                this.setVisible(false);
            },
        });

        return this;
    }
}
