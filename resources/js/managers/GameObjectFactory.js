import gameConstants from "../config/gameConstants";
import physicsConstants from "../config/physicsConstants";

/**
 * Factory class voor het aanmaken van alle game objects
 * @class GameObjectFactory
 */
export default class GameObjectFactory {
    /**
     * Maakt een GameObjectFactory aan
     * @param {Phaser.Scene} scene - De Phaser scene waar de objecten komen
     */
    constructor(scene) {
        this.scene = scene; // Bewaar een referentie naar de scene
    }

    /**
     * Maakt alle basis game objects aan
     */
    createGameObjects() {
        // Maak de bal aan
        this.scene.ball = this.createBall();

        // Voeg de bal toe aan de state
        this.scene.managers.state.balls.push(this.scene.ball);

        // Maak de peddel aan
        this.scene.paddle = this.createPaddle();

        // Maak de blokken aan
        this.scene.bricks = this.createBricks();

        // Maak de lava aan
        this.createLava();
    }

    /**
     * Maakt een bal object aan
     * @returns {Phaser.GameObjects.Arc} De aangemaakte bal
     */
    createBall(
        x = this.scene.scale.width / 2,
        y = this.scene.scale.height / 2
    ) {
        const ball = this.scene.add.circle(
            x, // Horizontale positie van de bal
            y, // Verticale positie van de bal
            gameConstants.ball.radius, // Radius van de bal
            gameConstants.ball.color // Kleur van de bal
        );

        // Voeg de bal toe aan de physics engine
        this.scene.physics.add.existing(ball);

        ball.body
            .setCollideWorldBounds(true) // Zorg ervoor dat de bal binnen de wereld blijft
            .setBounce(physicsConstants.ball.bounce); // Zorg ervoor dat de bal stuitert

        // Stel de botsingen in
        this.scene.managers.collisions.setupBallCollisions(ball);

        // Geef de bal terug
        return ball;
    }

    /**
     * Maakt een peddel object aan
     * @returns {Phaser.GameObjects.Rectangle} De aangemaakte peddel
     */
    createPaddle() {
        const paddle = this.scene.add.rectangle(
            this.scene.scale.width / 2, // Horizontale positie van de peddel
            gameConstants.paddle.yPosition, // Verticale positie van de peddel
            gameConstants.paddle.width, // Breedte van de peddel
            gameConstants.paddle.height, // Hoogte van de peddel
            gameConstants.paddle.color // Kleur van de peddel
        );

        // Voeg de peddel toe aan de physics engine
        this.scene.physics.add.existing(paddle);

        // Zorg ervoor dat de peddel niet beweegt
        paddle.body.setCollideWorldBounds(true).setImmovable(true);

        // Geef de peddel terug
        return paddle;
    }

    /**
     * Maakt alle blokken aan
     * @returns {Phaser.Physics.Arcade.StaticGroup} Groep met alle blokken
     */
    createBricks() {
        // Groep voor de blokken
        const bricks = this.scene.physics.add.staticGroup();

        // Haal de config op voor de blokken
        const { offset, width, height, padding } = gameConstants.brick;

        // Reset de power-up tellers
        this.scene.managers.state.resetPowerUpCounts();

        for (let row = 0; row < gameConstants.brick.count.row; row++) {
            for (let col = 0; col < gameConstants.brick.count.column; col++) {
                this.createBrick(
                    bricks, // Groep voor de blokken
                    row, // Huidige rij
                    col, // Huidige kolom
                    offset, // Offset voor de blokken
                    width, // Breedte van de blokken
                    height, // Hoogte van de blokken
                    padding // Padding tussen de blokken
                );
            }
        }

        // Geef de groep met blokken terug
        return bricks;
    }

    /**
     * Maakt een individuele steen aan
     * @param {Phaser.Physics.Arcade.StaticGroup} bricks - De groep om de steen aan toe te voegen
     * @param {number} row - Rij index
     * @param {number} col - Kolom index
     * @param {Object} offset - Offset configuratie
     * @param {number} width - Breedte van de steen
     * @param {number} height - Hoogte van de steen
     * @param {number} padding - Ruimte tussen stenen
     */
    createBrick(bricks, row, col, offset, width, height, padding) {
        // Horizontale positie
        const x = offset.left + col * (width + padding) + width / 2;

        // Verticale positie
        const y = offset.top + row * (height + padding) + height / 2;

        // Bepaal de kleur en power-up type
        const { color, powerUpType } = this.determineBrickType();

        const brick = this.scene.add
            .rectangle(x, y, width, height, color) // Maak de steen aan
            .setOrigin(0.5); // Perfecte centering

        // Voeg het power-up type toe aan de steen
        brick.powerUpType = powerUpType;
        // Voeg de steen toe aan de physics engine
        this.scene.physics.add.existing(brick, true);
        // Voeg de steen toe aan de groep
        bricks.add(brick);
    }

    /**
     * Bepaalt het type steen
     * @returns {Object} Object met kleur en power-up type
     */
    determineBrickType() {
        let color = gameConstants.brick.color; // Standaard kleur
        let powerUpType = null; // Geen power-up

        if (Phaser.Math.FloatBetween(0, 1) <= gameConstants.powerUps.chance) {
            // Verkrijg beschikbare power-up types
            const availableTypes = this.getAvailablePowerUpTypes();

            if (availableTypes.length > 0) {
                // Kies een random type
                powerUpType = Phaser.Math.RND.pick(availableTypes);

                // Verhoog de teller voor het gekozen type
                this.scene.managers.state.powerUpCounts[
                    powerUpType === gameConstants.powerUps.types.multiBall
                        ? "multiBall"
                        : "extraLife"
                ]++;

                // Verkrijg de kleur van de power-up
                color = gameConstants.powerUps.colors[powerUpType];
            }
        }

        // Geef de kleur en power-up type terug
        return { color, powerUpType };
    }

    /**
     * Bepaalt welke power-ups nog beschikbaar zijn om te spawnen
     * @returns {string[]} Lijst met beschikbare power-up types
     */
    getAvailablePowerUpTypes() {
        // Lijst met beschikbare power-up types
        const availableTypes = [];

        // Maximaal aantal power-ups dat kan spawnen
        const { maxSpawn, types } = gameConstants.powerUps;

        // Huidige tellers
        const counts = this.scene.managers.state.powerUpCounts;

        // Voeg multiBall toe als het nog niet maximaal is
        if (counts.multiBall < maxSpawn.multiBall)
            availableTypes.push(types.multiBall);

        // Voeg extraLife toe als het nog niet maximaal is
        if (counts.extraLife < maxSpawn.extraLife)
            availableTypes.push(types.extraLife);

        // Geef de beschikbare types terug
        return availableTypes;
    }

    /**
     * Maakt de lava aan onderin het scherm
     */
    createLava() {
        this.scene.lava = this.scene.add
            .rectangle(
                0, // Horizontale positie van de lava
                this.scene.scale.height, // Hoogte van de lava
                this.scene.scale.width * 2, // Breedte van de lava
                gameConstants.world.lavaHeight, // Hoogte van de lava
                gameConstants.world.lavaColor // Kleur van de lava
            )
            .setOrigin(0, 1); // Zet de oorsprong naar beneden

        // Voeg de lava toe aan de physics engine
        this.scene.physics.add.existing(this.scene.lava, true);
    }
}
