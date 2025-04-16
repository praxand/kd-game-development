const gameConstants = {
    startingScore: 0,
    baseScore: 100,
    startingLives: 3,
    maxLives: 3,
    lavaPenalty: 500,
    powerUps: {
        types: {
            MULTI_BALL: "multiBall",
            EXTRA_LIFE: "extraLife",
        },
        maxSpawn: {
            MULTI_BALL: 5,
            EXTRA_LIFE: 3,
        },
        colors: {
            multiBall: 0xaa00ff,
            extraLife: 0x00aa00,
        },
        chance: 0.15,
    },
    paddle: {
        width: 140,
        height: 10,
        color: 0xffffff,
        yPosition: 570,
    },
    ball: {
        radius: 10,
        color: 0xffffff,
    },
    brick: {
        width: 50,
        height: 20,
        color: 0xffffff,
        count: {
            row: 4,
            column: 12,
        },
        offset: {
            top: 90,
            left: 60,
        },
        padding: 10,
    },
    ui: {
        scorePosition: { x: 16, y: 16 },
        livesPosition: { x: 630, y: 16 },
        textStyle: {
            fontSize: "32px",
            fill: "#fff",
        },
        gameOverStyle: {
            fontFamily: "Arial",
            fontSize: "48px",
            color: "#ffffff",
            align: "center",
        },
        restartStyle: {
            fontFamily: "Arial",
            fontSize: "32px",
            color: "#ffff00",
        },
        pauseMenuStyle: {
            fontFamily: "Arial",
            fontSize: "32px",
            color: "#ffffff",
            align: "center",
        },
    },
    world: {
        lavaHeight: 10,
        lavaColor: 0x00000,
    },
};

export default gameConstants;
