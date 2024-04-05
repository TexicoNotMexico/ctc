import { LyricsInterface } from "./types/LyricsInterface";

const katakanaToHiragana = (str: string) =>
    str.replace(/[\u30a1-\u30f6]/g, (match) => String.fromCharCode(match.charCodeAt(0) - 0x60));

const fullWidthKatakana = (str: string) => {
    const convertMap = {
        ｧ: "ァ",
        ｨ: "ィ",
        ｩ: "ゥ",
        ｪ: "ェ",
        ｫ: "ォ",
        ｬ: "ャ",
        ｭ: "ュ",
        ｮ: "ョ",
        ｯ: "ッ",
        ｰ: "ー",
        ｱ: "ア",
        ｲ: "イ",
        ｳ: "ウ",
        ｴ: "エ",
        ｵ: "オ",
        ｶ: "カ",
        ｷ: "キ",
        ｸ: "ク",
        ｹ: "ケ",
        ｺ: "コ",
        ｻ: "サ",
        ｼ: "シ",
        ｽ: "ス",
        ｾ: "セ",
        ｿ: "ソ",
        ﾀ: "タ",
        ﾁ: "チ",
        ﾂ: "ツ",
        ﾃ: "テ",
        ﾄ: "ト",
        ﾅ: "ナ",
        ﾆ: "ニ",
        ﾇ: "ヌ",
        ﾈ: "ネ",
        ﾉ: "ノ",
        ﾊ: "ハ",
        ﾋ: "ヒ",
        ﾌ: "フ",
        ﾍ: "ヘ",
        ﾎ: "ホ",
        ﾏ: "マ",
        ﾐ: "ミ",
        ﾑ: "ム",
        ﾒ: "メ",
        ﾓ: "モ",
        ﾔ: "ヤ",
        ﾕ: "ユ",
        ﾖ: "ヨ",
        ﾗ: "ラ",
        ﾘ: "リ",
        ﾙ: "ル",
        ﾚ: "レ",
        ﾛ: "ロ",
        ﾜ: "ワ",
        ﾝ: "ン",
        ｦ: "ヲ",
        ｶﾞ: "ガ",
        ｷﾞ: "ギ",
        ｸﾞ: "グ",
        ｹﾞ: "ゲ",
        ｺﾞ: "ゴ",
        ｻﾞ: "ザ",
        ｼﾞ: "ジ",
        ｽﾞ: "ズ",
        ｾﾞ: "ゼ",
        ｿﾞ: "ゾ",
        ﾀﾞ: "ダ",
        ﾁﾞ: "ヂ",
        ﾂﾞ: "ヅ",
        ﾃﾞ: "デ",
        ﾄﾞ: "ド",
        ﾊﾞ: "バ",
        ﾋﾞ: "ビ",
        ﾌﾞ: "ブ",
        ﾍﾞ: "ベ",
        ﾎﾞ: "ボ",
        ﾊﾟ: "パ",
        ﾋﾟ: "ピ",
        ﾌﾟ: "プ",
        ﾍﾟ: "ペ",
        ﾎﾟ: "ポ",
        ﾜﾞ: "ヷ",
        ｲﾞ: "ヸ",
        ｳﾞ: "ヴ",
        ｴﾞ: "ヹ",
        ｦﾞ: "ヺ",
    };

    for (const [halfWidthKana, fullWidthKana] of Object.entries(convertMap)) {
        str = str.replace(new RegExp(halfWidthKana, "g"), fullWidthKana);
    }
    return str;
};

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
            let combined = rawLyrics[i] + rawLyrics[i + 1];
            if (rawLyrics[i + 1] === "ﾞ" || rawLyrics[i + 1] === "ﾟ") {
                combined += rawLyrics[i + 2];
                i += 1;
            }
            if (["ﾌｧ", "ﾌｨ", "ﾌｪ", "ﾌｫ", "ﾃｨ", "ﾃﾞｨ", "ｼｪ", "ｼﾞｪ", "ﾃｭ", "ﾃﾞｭ", "ﾌｭ"].includes(combined)) {
                combined = fullWidthKatakana(combined);
            } else {
                combined = katakanaToHiragana(fullWidthKatakana(combined));
            }
            segmentedLyrics.push(combined);
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
