import * as Tone from "tone";

let isInitialized = false;

let music: Tone.Player;

export let drawingState = {
    on16th: false,
    currentBeat: 0,
    currentMeasure: 0,
};

const declareSchedule = () => {
    Tone.Transport.schedule((time) => {
        music.start(time, 0.53);
    }, "0:0:0");
};

const initializeTonejs = async () => {
    console.info("initializing...");
    await Tone.start();

    music = new Tone.Player("AUDIO.mp3").toDestination();

    Tone.Transport.bpm.value = 145;

    declareSchedule();

    await Tone.loaded();

    isInitialized = true;
    console.info("initialized");
};

export const playSound = async () => {
    if (!isInitialized) await initializeTonejs();

    if (Tone.Transport.state === "started") {
        console.info("already started. pausing...");
        Tone.Transport.pause();
        return;
    }

    console.info("playing...");
    Tone.Transport.start("+0", "0:0:0");
};
