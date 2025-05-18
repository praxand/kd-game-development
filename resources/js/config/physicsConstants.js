/**
 * PhysicsConstants - Bevat alle natuurkundige constanten voor het spel
 * Definieert beweging, snelheden en botsingseigenschappen van game objects
 */
const physicsConstants = {
    /**
     * Instellingen voor de peddel
     */
    paddle: {
        speed: 300, // snelheid van de peddel in pixels per seconde
    },

    /**
     * Instellingen voor de bal
     */
    ball: {
        /**
         * Snelheid bij het lanceren van de bal
         */
        launchVelocity: {
            X: 150, // snelheid in pixels per seconde
            Y: -250, // snelheid in pixels per seconde
        },
        bounce: 1, // Volledige terugkaatsing
        speedIncreasePerBrick: 5, // Snelheidstoename per gebroken blok
        maxSpeedMultiplier: 2.5, // Maximale snelheidsverhoging (2.5x origineel)
    },
};

export default physicsConstants;
