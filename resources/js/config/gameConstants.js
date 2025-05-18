/**
 * Kleurdefinities voor het spel
 * Gebruikt hexadecimale kleurwaarden
 */
const colors = {
    black: 0x000000, // zwart
    white: 0xffffff, // wit
    green: 0x00ff00, // groen
    red: 0xff0000, // rood
};

/**
 * Centrale configuratieconstanten voor het spel
 * Bevat alle belangrijke instellingen voor gameplay, graphics en mechanics
 */
const gameConstants = {
    // Audio-instellingen
    volume: 0.5, // Standaard volume (0-1)

    // Score-instellingen
    startingScore: 0, // Beginscore bij start spel
    baseScore: 100, // Basis punten per gebroken blok
    lavaPenalty: 500, // Puntenaftrek bij bal in lava

    // Levenssysteem
    startingLives: 3, // Aantal startlevens
    maxLives: 3, // Maximum aantal levens

    // Game state berichten
    winMessage: "YOU WIN!", // Win bericht
    loseMessage: "GAME OVER", // Verlies bericht

    // Power-up configuratie
    powerUps: {
        // Types van power-ups
        types: {
            multiBall: "multiBall", // Multibal power-up
            extraLife: "extraLife", // Extra leven power-up
        },

        // Maximum aantal power-ups per type dat kan spawnen
        maxSpawn: {
            multiBall: 5, // Max multiballen
            extraLife: 3, // Max extra levens
        },

        // Kleuren per power-up type
        colors: {
            multiBall: colors.red, // Rode blokken = multibal
            extraLife: colors.green, // Groene blokken = extra leven
        },

        // Kans dat een blok een power-up bevat (15%)
        chance: 0.15,
    },

    // Peddel configuratie
    paddle: {
        width: 140, // Breedte van de peddel in pixels
        height: 10, // Hoogte van de peddel in pixels
        color: colors.white, // Kleur van de peddel
        yPosition: 570, // Verticale positie
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
        color: colors.white, // Standaard kleur

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

        padding: 10, // Ruimte tussen blokken
    },

    // Wereld configuratie
    world: {
        lavaHeight: 10, // Hoogte van de lava zone in pixels
        lavaColor: colors.black, // Kleur van de lava zone
    },
};

export default gameConstants;
