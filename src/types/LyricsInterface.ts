export interface LyricsInterface {
    bpm: number;
    offset: number;
    lyrics: {
        timing: number;
        character: string;
    }[];
}
