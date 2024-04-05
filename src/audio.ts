import * as Tone from "tone";
import lyricsData from "/LYRICS.txt?raw";
import lyricsParser from "./lyricsParser";
import { LyricsInterface } from "./types/LyricsInterface";

let isInitialized = false;

let metaData: LyricsInterface;
let music: Tone.Player;

const declareSchedule = () => {
    Tone.Transport.schedule((time) => {
        music.start(time, 0 + metaData.offset);
    }, "0:0:0");
};

const initializeTonejs = async () => {
    metaData = lyricsParser(lyricsData);

    await Tone.start();

    music = new Tone.Player("AUDIO.mp3").toDestination();

    Tone.Transport.bpm.value = metaData.bpm;

    declareSchedule();

    await Tone.loaded();

    isInitialized = true;
};

export const playSound = async () => {
    if (!isInitialized) await initializeTonejs();

    if (Tone.Transport.state === "started") {
        console.info("pause");
        Tone.Transport.pause();
        return;
    }

    console.info("play");
    Tone.Transport.start("+0");
};
