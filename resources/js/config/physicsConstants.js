const physicsConstants = {
    paddle: {
        speed: 300,
    },
    ball: {
        initialVelocity: {
            X: 0,
            Y: 0,
        },
        launchVelocity: {
            X: 150,
            Y: -250,
        },
        bounce: 1,
    },
};

export default physicsConstants;
