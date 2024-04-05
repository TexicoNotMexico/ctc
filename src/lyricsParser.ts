import { LyricsInterface } from "./types/LyricsInterface";

const lyricsParser = (lyrics: string): LyricsInterface => {
    let data: LyricsInterface = {
        bpm: 145,
        offset: 0.53,
        blurFade: 160,
        lyrics: [
            { timing: 0, character: "エ" },
            { timing: 1, character: "ラ" },
            { timing: 1, character: "ー" },
            { timing: 3, character: "エ" },
            { timing: 4, character: "ラ" },
            { timing: 4, character: "ー" },
            { timing: 6, character: "エ" },
            { timing: 7, character: "ラ" },
            { timing: 7, character: "ー" },
            { timing: 9, character: "エ" },
            { timing: 10, character: "ラ" },
            { timing: 10, character: "ー" },
            { timing: 12, character: "エ" },
            { timing: 13, character: "ラ" },
            { timing: 13, character: "ー" },
            { timing: 15, character: "エ" },
            { timing: 16, character: "ラ" },
            { timing: 16, character: "ー" },
            { timing: 18, character: "エ" },
            { timing: 19, character: "ラ" },
            { timing: 19, character: "ー" },
            { timing: 21, character: "エ" },
            { timing: 22, character: "ラ" },
            { timing: 22, character: "ー" },
            { timing: 24, character: "エ" },
            { timing: 25, character: "ラ" },
            { timing: 25, character: "ー" },
            { timing: 27, character: "エ" },
            { timing: 28, character: "ラ" },
            { timing: 28, character: "ー" },
            { timing: 30, character: "エ" },
            { timing: 31, character: "ラ" },
            { timing: 31, character: "ー" },
            { timing: 33, character: "エ" },
            { timing: 34, character: "ラ" },
            { timing: 34, character: "ー" },
            { timing: 36, character: "エ" },
            { timing: 37, character: "ラ" },
            { timing: 37, character: "ー" },
            { timing: 39, character: "エ" },
            { timing: 40, character: "ラ" },
            { timing: 40, character: "ー" },
        ],
    };

    let perLine = lyrics.split("\n");
    let rawLyrics =
        "エラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラーエラー";

    for (let [i, cur] of perLine.entries()) {
        if (/^#/.test(cur)) {
            continue;
        }
        let bpm;
        if ((bpm = /^! BPM: (\d+)/.exec(cur))) {
            data.bpm = Number(bpm[1]);
            continue;
        }
        let offset;
        if ((offset = /^! OFFSET: (\d+\.\d+)/.exec(cur))) {
            data.offset = Number(offset[1]);
            continue;
        }
        let blurFade;
        if ((blurFade = /^! BLURFADE: (\d+)/.exec(cur))) {
            data.blurFade = Number(blurFade[1]);
            continue;
        } else {
            data.lyrics = [];
            rawLyrics = perLine
                .slice(i)
                .join("")
                .replace(/[\n\r]/g, "");
            break;
        }
    }

    let segmentedLyrics = [];

    for (let i = 0; i < rawLyrics.length; i++) {
        if (/[ｦ-ﾟ]/.test(rawLyrics[i])) {
            segmentedLyrics.push(rawLyrics[i] + rawLyrics[i + 1]);
            i += 1;
        } else {
            segmentedLyrics.push(rawLyrics[i]);
        }
    }

    for (let i = 0; i < segmentedLyrics.length; i++) {
        if (segmentedLyrics[i] === "ー") {
            data.lyrics.push({ timing: i - 1, character: segmentedLyrics[i] });
        } else {
            data.lyrics.push({ timing: i, character: segmentedLyrics[i] });
        }
    }

    return data;
};

export default lyricsParser;
