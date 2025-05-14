const colors = {
    black: 0x000000,
    white: 0xffffff,
    green: 0x00ff00,
    red: 0xff0000,
    yellow: 0xffff00,
    gold: 0xffd700,
};

const gameConstants = {
    volume: 0.5,
    startingScore: 0,
    baseScore: 100,
    lavaPenalty: 500,
    startingLives: 3,
    maxLives: 3,
    powerUps: {
        types: {
            multiBall: "multiBall",
            extraLife: "extraLife",
        },
        maxSpawn: {
            multiBall: 5,
            extraLife: 3,
        },
        colors: {
            multiBall: colors.red,
            extraLife: colors.green,
        },
        chance: 0.15,
    },
    paddle: {
        width: 140,
        height: 10,
        color: colors.white,
        yPosition: 570,
    },
    ball: {
        radius: 10,
        color: colors.white,
    },
    brick: {
        width: 50,
        height: 20,
        color: colors.white,
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
    world: {
        lavaHeight: 10,
        lavaColor: colors.black,
    },
};

export default gameConstants;
