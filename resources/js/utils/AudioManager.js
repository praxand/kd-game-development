import fileConstants from "../config/fileConstants";
import gameConstants from "../config/gameConstants";

/**
 * AudioManager - Beheert alle geluidseffecten en audio in het spel
 * Handelt het laden, initialiseren en afspelen van geluiden
 */
export default class AudioManager {
    /**
     * Maakt een AudioManager aan
     * @param {Phaser.Scene} scene - De Phaser scene voor audio management
     */
    constructor(scene) {
        this.scene = scene; // Bewaar een referentie naar de scene
        this.sounds = {}; // Object om geluiden op te slaan
    }

    /**
     * Laad alle audio bestanden in tijdens de preload fase
     */
    preload() {
        // Loop door alle audio files uit de config
        Object.entries(fileConstants.audio.files).forEach(([key, filename]) => {
            // Laad elk audio bestand in

            this.scene.load.audio(
                key, // Unieke sleutel voor het geluid
                `${fileConstants.audio.folder + filename}` // Volledig path
            );
        });
    }

    /**
     * Initialiseer alle geluiden na het laden
     */
    init() {
        // Maak geluidsinstances aan
        Object.entries(fileConstants.audio.files).forEach(([key, filename]) => {
            this.sounds[key] = this.scene.sound.add(key);
        });

        // Stel hoofdvolume in vanuit config
        this.scene.sound.volume = gameConstants.volume;
    }

    /**
     * Speel een geluid af
     * @param {string} key - Sleutel van het geluid
     */
    play(key) {
        // Audiobestand afspelen als het bestaat
        this.sounds[key]?.play() || console.error(`Sound "${key}" not found`);
    }
}
