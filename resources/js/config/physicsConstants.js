/**
 * PhysicsConstants - Bevat alle natuurkundige constanten voor het spel
 * Definieert beweging, snelheden en botsingseigenschappen van game objects
 */
const physicsConstants = {
    // Peddel configuratie
    paddle: {
        speed: 300, // snelheid van de peddel in pixels per seconde
    },

    // Bal configuratie
    ball: {
        // De snelheid van de bal in pixels per seconde
        launchVelocity: {
            X: 150, // Horizontale snelheid
            Y: -250, // Verticale snelheid
        },
        bounce: 1, // Terugkaatsingswaarde van de bal
        speedIncreasePerBrick: 5, // Snelheidstoename per gebroken blok
        maxSpeedMultiplier: 2.5, // Maximale snelheidsverhoging
    },
};

export default physicsConstants;
