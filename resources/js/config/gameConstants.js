const gameConstants = {
    startingScore: 0,
    baseScore: 100,
    startingLives: 3,
    maxLives: 3,
    lavaPenalty: 500,
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
            row: 2,
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
    },
    world: {
        lavaHeight: 10,
        lavaColor: 0x00000,
    },
};

export default gameConstants;
