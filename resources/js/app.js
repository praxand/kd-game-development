import "./bootstrap";
import GameScene from "./scenes/GameScene";

const config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: "arcade",
        arcade: {},
    },
    scene: [GameScene],
};

export default new Phaser.Game(config);
