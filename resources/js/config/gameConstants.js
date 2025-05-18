/**
 * Kleurdefinities voor het spel
 * Gebruikt hexadecimale kleurcodes
 */
const colors = {
    black: 0x000000, // zwart
    white: 0xffffff, // wit
    green: 0x00ff00, // groen
    red: 0xff0000, // rood
};

/**
 * Centrale configuratie constanten voor het spel
 * Bevat alle belangrijke instellingen voor gameplay, graphics en mechanics
 */
const gameConstants = {
    // Audio configuratie
    volume: 0.5, // Standaard volume

    // Score configuratie
    startingScore: 0, // Score waarmee het spel begint
    baseScore: 100, // Punten die je krijgt voor het breken van een blok
    lavaPenalty: 500, // Punten die je verliest als de bal in de lava valt

    // Levens configuratie
    startingLives: 3, // Levens waarmee het spel begint
    maxLives: 3, // Maximale levens die je kunt hebben

    // Game over berichten
    winMessage: "YOU WIN!", // Win bericht
    loseMessage: "GAME OVER", // Verlies bericht

    // Power-up configuratie
    powerUps: {
        // Types van de power-ups
        types: {
            multiBall: "multiBall", // Multibal power-up
            extraLife: "extraLife", // Extra leven power-up
        },

        // Maximum aantal power-ups per type dat kan spawnen
        maxSpawn: {
            multiBall: 5,
            extraLife: 3,
        },

        // Kleuren per power-up type
        colors: {
            multiBall: colors.red, // Rode blokken voor multiballen
            extraLife: colors.green, // Groene blokken voor extra levens
        },

        // Kans dat een blok een power-up bevat in procent
        chance: 0.15,
    },

    // Peddel configuratie
    paddle: {
        width: 140, // Breedte van de peddel in pixels
        height: 10, // Hoogte van de peddel in pixels
        color: colors.white, // Kleur van de peddel
        yPosition: 570, // Verticale positie van de peddel in pixels
    },

    // Bal configuratie
    ball: {
        radius: 10, // Straal van de bal in pixels
        color: colors.white, // Kleur van de bal
    },

    // Blokken configuratie
    brick: {
        width: 50, // Breedte van elk blok in pixels
        height: 20, // Hoogte van elk blok in pixels
        color: colors.white, // Standaard kleur van de blokken

        // Aantal blokken
        count: {
            row: 4, // Aantal rijen
            column: 12, // Aantal kolommen
        },

        // Positionering blokken
        offset: {
            top: 90, // Afstand vanaf bovenkant in pixels
            left: 60, // Afstand vanaf linkerkant in pixels
        },

        padding: 10, // Ruimte tussen de blokken
    },

    // Wereld configuratie
    world: {
        lavaHeight: 10, // Hoogte van de lava zone in pixels
        lavaColor: colors.black, // Kleur van de lava zone
    },
};

export default gameConstants;
