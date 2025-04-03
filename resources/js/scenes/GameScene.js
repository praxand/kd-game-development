import Phaser from "phaser";
import gameConstants from "../config/gameConstants";
import physicsConstants from "../config/physicsConstants";
import LivesDisplay from "../ui/LivesDisplay";
import ScoreDisplay from "../ui/ScoreDisplay";

export default class GameScene extends Phaser.Scene {
    // ==============================================
    // Constructor and Core Properties
    // ==============================================

    constructor() {
        super("game-scene");
        this.resetGameState();
    }

    // ==============================================
    // Phaser Lifecycle Methods
    // ==============================================

    create() {
        this.cleanupPreviousGame();
        this.initGameComponents();
        this.stickBallToPaddle();
    }

    update() {
        this.handlePaddleMovement();
        this.handleBallLaunchInput();
        this.handleStickBallToPaddle();
    }

    // ==============================================
    // Initialization Methods
    // ==============================================

    resetGameState() {
        this.ball = null;
        this.balls = [];
        this.paddle = null;
        this.bricks = null;
        this.lava = null;
        this.cursors = null;
        this.spaceKey = null;
        this.scoreDisplay = null;
        this.livesDisplay = null;
        this.ballLaunched = false;
        this.powerUpActive = false;
        this.multiBallTimeout = null;
    }

    initGameComponents() {
        this.createGameObjects();
        this.createUI();
        this.setupPhysics();
        this.setupInput();
    }

    createGameObjects() {
        this.ball = this.createBall();
        this.balls.push(this.ball);
        this.paddle = this.createPaddle();
        this.bricks = this.createBricks();
        this.createLava();
    }

    createUI() {
        this.cleanupUI();

        this.scoreDisplay = new ScoreDisplay(
            this,
            gameConstants.ui.scorePosition.x,
            gameConstants.ui.scorePosition.y,
            gameConstants.startingScore,
            gameConstants.ui.textStyle
        );

        this.livesDisplay = new LivesDisplay(
            this,
            gameConstants.ui.livesPosition.x,
            gameConstants.ui.livesPosition.y,
            gameConstants.startingLives,
            gameConstants.ui.textStyle
        );
    }

    setupPhysics() {
        this.physics.world.setBoundsCollision(true, true, true, false);
        this.physics.world.colliders.destroy();
        this.balls.forEach((ball) => this.setupBallCollisions(ball));
    }

    setupInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.input.keyboard.on("keyup", () =>
            this.paddle?.body?.setVelocityX(0)
        );
    }

    // ==============================================
    // Object Creation Methods
    // ==============================================

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

        if (this.ballLaunched) {
            ball.body.setVelocity(
                Phaser.Math.Between(-200, 200),
                physicsConstants.ball.initialVelocity.Y
            );
        }

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

        for (let row = 0; row < gameConstants.brick.count.row; row++) {
            for (let col = 0; col < gameConstants.brick.count.column; col++) {
                const x = offset.left + col * (width + padding) + width / 2;
                const y = offset.top + row * (height + padding) + height / 2;
                const isPowerUpBrick = Phaser.Math.Between(1, 10) === 1;
                const color = isPowerUpBrick
                    ? 0xff00ff
                    : gameConstants.brick.color;

                const brick = this.add
                    .rectangle(x, y, width, height, color)
                    .setOrigin(0.5);
                brick.isPowerUp = isPowerUpBrick;

                this.physics.add.existing(brick, true);
                bricks.add(brick);
            }
        }

        return bricks;
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
    // Collision and Physics Methods
    // ==============================================

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

    handleBallCollision() {
        // WIP
    }

    handleBrickCollision(ball, brick) {
        brick.destroy();
        this.scoreDisplay.add(gameConstants.baseScore);

        if (brick.isPowerUp) {
            this.activateMultiBall();
        }

        if (this.bricks.countActive() === 0) {
            this.time.delayedCall(1, () => this.gameOver());
        }
    }

    handleLavaCollision(ball) {
        const index = this.balls.indexOf(ball);

        if (index !== -1) {
            this.balls.splice(index, 1);
            ball.destroy();
        }

        if (this.balls.length === 0) {
            const remainingLives = this.livesDisplay.decrement();
            this.scoreDisplay.subtract(gameConstants.lavaPenalty);

            remainingLives <= 0 ? this.gameOver() : this.resetAfterLava();
        }
    }

    // ==============================================
    // Game State Management Methods
    // ==============================================

    stickBallToPaddle() {
        if (this.balls.length === 0 || !this.paddle) return;

        const mainBall = this.balls[0];

        mainBall.setPosition(
            this.paddle.x,
            this.paddle.y - this.paddle.height / 2 - gameConstants.ball.radius
        );

        mainBall.body.setVelocity(0, 0);

        this.ballLaunched = false;
    }

    handleBallLaunchInput() {
        if (
            Phaser.Input.Keyboard.JustDown(this.spaceKey) &&
            !this.ballLaunched &&
            this.balls.length > 0
        ) {
            this.launchBall();
        }
    }

    handleStickBallToPaddle() {
        if (!this.ballLaunched && this.balls.length === 1) {
            this.stickBallToPaddle();
        }
    }

    launchBall() {
        const mainBall = this.balls[0];

        mainBall.body.setVelocity(
            Phaser.Math.Between(
                -physicsConstants.ball.launchVelocity.X,
                physicsConstants.ball.launchVelocity.X
            ),
            physicsConstants.ball.launchVelocity.Y
        );

        this.ballLaunched = true;
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

    handlePaddleMovement() {
        if (!this.paddle?.body) return;

        const velocity = this.cursors.left.isDown
            ? -physicsConstants.paddle.speed
            : this.cursors.right.isDown
            ? physicsConstants.paddle.speed
            : 0;

        this.paddle.body.setVelocityX(velocity);
    }

    resetAfterLava() {
        if (this.balls.length === 0) {
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

    // ==============================================
    // Cleanup and Game Flow Methods
    // ==============================================

    cleanupPreviousGame() {
        try {
            this.balls.forEach((ball) => ball.destroy());
            this.balls = [];

            [
                this.paddle,
                this.bricks,
                this.lava,
                this.scoreDisplay,
                this.livesDisplay,
            ].forEach((obj) => obj?.destroy());

            this.cleanupUI();
            this.physics.world.colliders.destroy();
        } catch (error) {
            console.warn("Cleanup error:", error);
        }
    }

    cleanupUI() {
        [this.scoreDisplay, this.livesDisplay].forEach((display) => {
            display?.destroy();
        });

        this.scoreDisplay = null;
        this.livesDisplay = null;
    }

    gameOver() {
        this.physics.pause();
        [
            ...this.balls,
            this.paddle,
            this.bricks,
            this.scoreDisplay,
            this.livesDisplay,
        ].forEach((obj) => obj?.setVisible(false));

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.add
            .text(
                centerX,
                centerY - 50,
                `GAME OVER\nScore: ${this.scoreDisplay.getScore()}`,
                gameConstants.ui.gameOverStyle
            )
            .setOrigin(0.5);

        const restartButton = this.add
            .text(
                centerX,
                centerY + 50,
                "Click to Restart",
                gameConstants.ui.restartStyle
            )
            .setOrigin(0.5)
            .setInteractive();

        restartButton.on("pointerdown", () => this.cleanupAndRestart());
        this.input.keyboard.on("keydown-R", () => this.cleanupAndRestart());
    }

    cleanupAndRestart() {
        this.children.each((child) => {
            if (
                child.text?.includes("GAME OVER") ||
                child.text === "Click to Restart"
            ) {
                child.destroy();
            }
        });
        this.restartGame();
    }

    restartGame() {
        this.cleanupPreviousGame();
        this.resetGameState();
        this.scene.restart();
    }
}
