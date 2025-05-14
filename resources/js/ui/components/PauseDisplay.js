export default class PauseDisplay extends Phaser.GameObjects.Text {
    constructor(scene) {
        super(scene, 400, 300, "PAUSED\nPress ESC to resume", {
            fontSize: 32,
            align: "center",
        });

        const { centerX, centerY, width, height } = scene.cameras.main;

        this.background = scene.add
            .rectangle(centerX, centerY, width, height, 0x000000, 0.5)
            .setDepth(99)
            .setVisible(false);

        this.setOrigin(0.5).setDepth(100).setVisible(false);

        scene.add.existing(this);
    }

    toggle(show) {
        this.setVisible(show);
        this.background.setVisible(show);

        return this;
    }

    show() {
        return this.toggle(true);
    }

    hide() {
        return this.toggle(false);
    }
}
