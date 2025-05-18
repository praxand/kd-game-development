/**
 * Bestandspad-constanten voor het spel
 * Bevat alle locaties van assets die geladen moeten worden
 */
const fileConstants = {
    // Audio configuratie
    audio: {
        // Basis map voor audio bestanden
        folder: "assets/audio/",

        // Audio bestanden met beschrijving
        files: {
            // Win geluidseffect
            win: "270319__littlerobotsoundfactory__jingle_win_01.wav",

            // Verlies geluidseffect
            lose: "270334__littlerobotsoundfactory__jingle_lose_01.wav",
        },
    },

    // Afbeeldingen configuratie
    images: {
        // Basis map voor afbeelding bestanden
        folder: "assets/images/",

        // Afbeeldingen bestanden met beschrijving
        files: {
            // Spel logo afbeelding
            logo: "Bijlage 2 - Logo.png",
        },
    },
};

export default fileConstants;
