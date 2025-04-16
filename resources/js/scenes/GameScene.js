import Phaser from "phaser";
import gameConstants from "../config/gameConstants";
import physicsConstants from "../config/physicsConstants";
import GameUI from "../ui/GameUI";
import GameOverUI from "../ui/GameOverUI";

export default class GameScene extends Phaser.Scene {
    // ==============================================
    // Constructor and Core Properties
    // ==============================================

    constructor() {
        super("game-scene");
        this.initState();
    }

    // ==============================================
    // Phaser Lifecycle Methods
    // ==============================================

    preload() {
        this.loadAudioAssets();
    }

    create() {
        this.initAudio();
        this.createTitleText();
        this.initGameComponents();
        this.stickBallToPaddle();
    }

    update() {
        if (this.isPaused) return;
        this.updateGame();
    }

    // ==============================================
    // Initialization Methods
    // ==============================================

    initState() {
        this.resetGameState();
        this.powerUpCounts = { multiBall: 0, extraLife: 0 };
        this.titleText = null;
    }

    resetGameState() {
        this.ball = null;
        this.balls = [];
        this.paddle = null;
        this.bricks = null;
        this.lava = null;
        this.cursors = null;
        this.spaceKey = null;
        this.escKey = null;
        this.ballLaunched = false;
        this.powerUpActive = false;
        this.multiBallTimeout = null;
        this.gameUI = null;
        this.gameOverUI = null;
        this.isPaused = false;
    }

    initGameComponents() {
        this.createGameObjects();
        this.initUI();
        this.setupPhysics();
        this.setupInput();
    }

    initUI() {
        this.gameUI = new GameUI(this);
        this.gameOverUI = new GameOverUI(this);
    }

    // ==============================================
    // Audio Methods
    // ==============================================

    loadAudioAssets() {
        const sounds = {
            win: "270319__littlerobotsoundfactory__jingle_win_01.wav",
            lose: "270334__littlerobotsoundfactory__jingle_lose_01.wav",
        };

        Object.entries(sounds).forEach(([key, value]) => {
            this.load.audio(key, `assets/sounds/${value}`);
        });
    }

    initAudio() {
        this.sounds = {
            win: this.sound.add("win"),
            lose: this.sound.add("lose"),
        };

        this.sound.volume = gameConstants.volume;
    }

    // ==============================================
    // Game Object Creation
    // ==============================================

    createTitleText() {
        const { width, height } = this.scale;

        this.titleText = this.add
            .text(
                width / 2,
                height / 2 - 50,
                "Best Education",
                gameConstants.ui.titleStyle
            )
            .setOrigin(0.5)
            .setDepth(1);
    }

    createGameObjects() {
        this.ball = this.createBall();
        this.balls.push(this.ball);
        this.paddle = this.createPaddle();
        this.bricks = this.createBricks();
        this.createLava();
    }

    createBall(x = this.scale.width / 2, y = this.scale.height / 2) {
        const ball = this.add.circle(
            x,
            y,
            gameConstants.ball.radius,
            gameConstants.ball.color
        );

        this.physics.add.existing(ball);

        ball.body
            .setCollideWorldBounds(true)
            .setBounce(physicsConstants.ball.bounce);

        this.setupBallCollisions(ball);

        return ball;
    }

    createPaddle() {
        const paddle = this.add.rectangle(
            this.scale.width / 2,
            gameConstants.paddle.yPosition,
            gameConstants.paddle.width,
            gameConstants.paddle.height,
            gameConstants.paddle.color
        );

        this.physics.add.existing(paddle);
        paddle.body.setCollideWorldBounds(true).setImmovable(true);

        return paddle;
    }

    createBricks() {
        const bricks = this.physics.add.staticGroup();
        const { offset, width, height, padding } = gameConstants.brick;

        this.resetPowerUpCounts();

        for (let row = 0; row < gameConstants.brick.count.row; row++) {
            for (let col = 0; col < gameConstants.brick.count.column; col++) {
                this.createBrick(
                    bricks,
                    row,
                    col,
                    offset,
                    width,
                    height,
                    padding
                );
            }
        }

        return bricks;
    }

    createBrick(bricks, row, col, offset, width, height, padding) {
        const x = offset.left + col * (width + padding) + width / 2;
        const y = offset.top + row * (height + padding) + height / 2;

        const { color, powerUpType } = this.determineBrickType();
        const brick = this.add
            .rectangle(x, y, width, height, color)
            .setOrigin(0.5);

        brick.powerUpType = powerUpType;

        this.physics.add.existing(brick, true);

        bricks.add(brick);
    }

    determineBrickType() {
        let color = gameConstants.brick.color;
        let powerUpType = null;

        if (Phaser.Math.FloatBetween(0, 1) <= gameConstants.powerUps.chance) {
            const availableTypes = this.getAvailablePowerUpTypes();

            if (availableTypes.length > 0) {
                powerUpType = Phaser.Math.RND.pick(availableTypes);

                this.powerUpCounts[
                    powerUpType === gameConstants.powerUps.types.multiBall
                        ? "multiBall"
                        : "extraLife"
                ]++;

                color = gameConstants.powerUps.colors[powerUpType];
            }
        }

        return { color, powerUpType };
    }

    getAvailablePowerUpTypes() {
        const availableTypes = [];
        const { maxSpawn, types } = gameConstants.powerUps;

        if (this.powerUpCounts.multiBall < maxSpawn.multiBall) {
            availableTypes.push(types.multiBall);
        }

        if (this.powerUpCounts.extraLife < maxSpawn.extraLife) {
            availableTypes.push(types.extraLife);
        }

        return availableTypes;
    }

    resetPowerUpCounts() {
        this.powerUpCounts = { multiBall: 0, extraLife: 0 };
    }

    createLava() {
        this.lava = this.add
            .rectangle(
                0,
                this.scale.height,
                this.scale.width * 2,
                gameConstants.world.lavaHeight,
                gameConstants.world.lavaColor
            )
            .setOrigin(0, 1);

        this.physics.add.existing(this.lava, true);
    }

    // ==============================================
    // Physics & Collisions
    // ==============================================

    setupPhysics() {
        this.physics.world.setBoundsCollision(true, true, true, false);
        this.physics.world.colliders.destroy();
        this.balls.forEach((ball) => this.setupBallCollisions(ball));
    }

    setupBallCollisions(ball) {
        this.physics.add.collider(
            ball,
            this.paddle,
            this.handleBallCollision,
            null,
            this
        );

        this.physics.add.collider(
            ball,
            this.bricks,
            this.handleBrickCollision,
            null,
            this
        );

        this.physics.add.collider(
            ball,
            this.lava,
            this.handleLavaCollision,
            null,
            this
        );
    }

    // ==============================================
    // Input Handling
    // ==============================================

    setupInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
        this.escKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
        );

        this.escKey.on("down", () => {
            this.togglePause();
        });
    }

    handlePaddleMovement() {
        if (!this.paddle?.body) return;
        const velocity = this.calculatePaddleVelocity();
        this.paddle.body.setVelocityX(velocity);
    }

    calculatePaddleVelocity() {
        const { speed } = physicsConstants.paddle;
        if (this.cursors.left.isDown) return -speed;
        if (this.cursors.right.isDown) return speed;
        return 0;
    }

    handleBallLaunchInput() {
        if (
            Phaser.Input.Keyboard.JustDown(this.spaceKey) &&
            !this.ballLaunched &&
            this.balls.length > 0
        )
            this.launchBall();
    }

    handleStickBallToPaddle() {
        if (!this.ballLaunched && this.balls.length === 1)
            this.stickBallToPaddle();
    }

    launchBall() {
        this.removeTitleText();

        const mainBall = this.balls[0];
        const { launchVelocity } = physicsConstants.ball;

        mainBall.body.setVelocity(
            Phaser.Math.Between(-launchVelocity.X, launchVelocity.X),
            launchVelocity.Y
        );

        this.ballLaunched = true;
    }

    removeTitleText() {
        if (this.titleText) {
            this.tweens.add({
                targets: this.titleText,
                alpha: 0,
                duration: 500,
                ease: "Power2",
                onComplete: () => {
                    this.titleText.destroy();
                    this.titleText = null;
                },
            });
        }
    }

    // ==============================================
    // Game State Management
    // ==============================================

    stickBallToPaddle() {
        if (this.balls.length === 0 || !this.paddle || !this.balls[0].body)
            return;

        const mainBall = this.balls[0];

        mainBall.setPosition(
            this.paddle.x,
            this.paddle.y - this.paddle.height / 2 - gameConstants.ball.radius
        );

        mainBall.body.setVelocity(0, 0);

        this.ballLaunched = false;
    }

    updateGame() {
        this.handlePaddleMovement();
        this.handleBallLaunchInput();
        this.handleStickBallToPaddle();
    }

    // ==============================================
    // Game Logic
    // ==============================================

    handleBallCollision() {
        // WIP
    }

    handleBrickCollision(ball, brick) {
        brick.destroy();
        this.gameUI.scoreDisplay.increment(gameConstants.baseScore);

        if (brick.powerUpType) {
            this.activatePowerUp(brick.powerUpType);
        }

        if (this.bricks.countActive() === 47) {
            this.sounds.win.play();
        }
    }

    handleLavaCollision(ball) {
        const index = this.balls.indexOf(ball);

        if (index !== -1) {
            this.balls.splice(index, 1);
            ball.destroy();
        }

        if (this.balls.length === 0) {
            this.handleBallLoss();
        }
    }

    handleBallLoss() {
        const remainingLives = this.gameUI.livesDisplay.decrement();
        this.gameUI.scoreDisplay.decrement(gameConstants.lavaPenalty);
        remainingLives <= 0 ? this.gameOver() : this.resetAfterLava();
    }

    // ==============================================
    // Power-up System
    // ==============================================

    activatePowerUp(type) {
        switch (type) {
            case gameConstants.powerUps.types.multiBall:
                this.activateMultiBall();
                break;

            case gameConstants.powerUps.types.extraLife:
                this.gameUI.livesDisplay.increment();
                break;
        }
    }

    activateMultiBall() {
        if (this.powerUpActive) return;

        this.powerUpActive = true;
        const { paddle, balls } = this;

        for (let i = 0; i < 2; i++) {
            const newBall = this.createBall(
                paddle.x,
                paddle.y - paddle.height / 2 - gameConstants.ball.radius
            );

            balls.push(newBall);

            newBall.body.setVelocity(
                Phaser.Math.Between(-300, 300),
                physicsConstants.ball.launchVelocity.Y
            );
        }

        this.multiBallTimeout = this.time.delayedCall(10000, () => {
            this.deactivateMultiBall();
        });
    }

    deactivateMultiBall() {
        this.powerUpActive = false;

        while (this.balls.length > 1) {
            const ball = this.balls.pop();

            ball.destroy();
        }

        if (this.balls.length === 0) {
            this.ball = this.createBall();
            this.balls.push(this.ball);
            this.stickBallToPaddle();
        }
    }

    // ==============================================
    // Game Flow Control
    // ==============================================

    togglePause() {
        this.isPaused = !this.isPaused;
        this.isPaused ? this.physics.pause() : this.physics.resume();
        this.isPaused
            ? this.gameUI.showPauseMenu()
            : this.gameUI.hidePauseMenu();
    }

    resetAfterLava() {
        if (!this.balls.length) {
            this.ball = this.createBall();
            this.balls.push(this.ball);
        }

        this.stickBallToPaddle();
    }

    resetLevel() {
        this.bricks.clear(true, true);
        this.createBricks();
        this.stickBallToPaddle();
    }

    async gameOver() {
        this.sounds.lose.play();
        this.physics.pause();
        this.input.keyboard.enabled = false;

        this.cleanupGameObjects();
        this.gameUI.setVisible(false);

        await this.gameOverUI.show(this.gameUI.getScore());

        this.input.keyboard.enabled = true;
        this.scene.restart();
    }

    cleanupGameObjects() {
        this.balls.forEach((ball) => ball.destroy());
        this.balls = [];
        [this.paddle, this.bricks].forEach((obj) => obj?.setVisible(false));
    }
}
