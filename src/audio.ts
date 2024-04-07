import * as Tone from "tone";
import lyricsData from "/LYRICS.txt?raw";
import lyricsParser from "./lyricsParser";
import { LyricsInterface } from "./types/LyricsInterface";

export let isInitialized = false;

let metaData: LyricsInterface;
let music: Tone.Player;

export let playingState = {
    on16th: false,
    currentBeat: 0,
};

const declareSchedule = () => {
    Tone.Transport.scheduleRepeat(
        () => {
            playingState = {
                on16th: true,
                currentBeat: Tone.Transport.position
                    .toString()
                    .split(":")
                    .reduce((acc, val, index) => acc + parseFloat(val) * [16, 4, 1][index], 0),
            };
            // * 邪魔
            if (metaData.lyrics[Math.floor(playingState.currentBeat)].character !== "　") {
                if (
                    Tone.Transport.position.toString().match(/:(\d):/)?.[1] === "0" &&
                    Tone.Transport.position.toString().match(/(?<=:.*:).(?=.)/)?.[0] === "0"
                ) {
                    console.error(
                        metaData.lyrics[Math.floor(playingState.currentBeat)].character,
                        " ".repeat(Math.floor(playingState.currentBeat) % 2)
                    );
                } else if (Tone.Transport.position.toString().match(/(?<=:.*:).(?=.)/)?.[0] === "0") {
                    console.warn(
                        metaData.lyrics[Math.floor(playingState.currentBeat)].character,
                        " ".repeat(Math.floor(playingState.currentBeat) % 2)
                    );
                } else {
                    console.info(
                        metaData.lyrics[Math.floor(playingState.currentBeat)].character,
                        " ".repeat(Math.floor(playingState.currentBeat) % 2)
                    );
                }
            }
        },
        "16n",
        "0:0:0",
        { "16n": metaData.lyrics.length }
    );
    Tone.Transport.schedule(
        () => {
            stopSound();
        },
        { "16n": metaData.lyrics.length }
    );
};

const initializeTonejs = async () => {
    metaData = lyricsParser(lyricsData);

    await Tone.start();

    Tone.Transport.bpm.value = metaData.bpm;

    declareSchedule();

    music = new Tone.Player("AUDIO.mp3").toDestination();
    music
        .sync() // ! 万能すぎ
        .start(0, metaData.offset)
        .stop({ "16n": metaData.lyrics.length });

    await Tone.loaded();

    isInitialized = true;
};

export const toggleSound = async () => {
    if (Tone.Transport.state === "started") {
        console.log("pause");
        Tone.Transport.pause();
        return;
    }

    if (!isInitialized) await initializeTonejs();

    console.info("play");
    Tone.Transport.start("+0");
};

export const stopSound = () => {
    if (Tone.Transport.state === "stopped") {
        return;
    }
    console.info("stop");
    Tone.Transport.stop();
};

export const timeSeek = (seekTo: Tone.Unit.Time) => {
    console.info("seek to", seekTo);
    Tone.Transport.position = seekTo;
};
