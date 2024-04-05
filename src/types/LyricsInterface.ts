export interface LyricsInterface {
    bpm: number;
    offset: number;
    blurFade: number;
    lyrics: {
        timing: number;
        character: string;
    }[];
}
