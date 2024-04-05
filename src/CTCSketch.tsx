import * as Tone from "tone";
import lyricsData from "/LYRICS.txt?raw";
import { Sketch, ReactP5Wrapper } from "@p5-wrapper/react";
import { playSound } from "./audio";
import lyricsParser from "./lyricsParser";
import { LyricsInterface } from "./types/LyricsInterface";
import { useState } from "react";

const CTCSketch = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    let lyrics: LyricsInterface;
    let divW: number, divH: number, minDivWH: number, perSixteenth, sixteenth: number;
    const CTCInstance: Sketch = (p5) => {
        p5.setup = () => {
            lyrics = lyricsParser(lyricsData);
            p5.createCanvas(p5.windowWidth, p5.windowHeight);
            p5.frameRate(60);
            p5.background(0);
        };

        p5.draw = () => {
            p5.background(0);
            if (isPlaying) {
                divW = p5.width / 16;
                divH = p5.height / 8;
                minDivWH = Math.min(divW, divH);
                perSixteenth = divH / 16;
                sixteenth = Tone.Transport.position
                    .toString()
                    .split(":")
                    .reduce((acc, val, index) => acc + parseFloat(val) * [16, 4, 1][index], 0);

                p5.translate(0, perSixteenth * -(sixteenth - 16 * 7));
                p5.textSize(minDivWH * 0.85);
                p5.textAlign(p5.CENTER, p5.CENTER);
                p5.noStroke();
                p5.fill("#FFFFFF");
                lyrics.lyrics.forEach((element, index) => {
                    if (element.timing <= Math.floor(sixteenth)) {
                        for (let i = 0; i < element.character.length; i++) {
                            p5.text(
                                element.character[i],
                                divW * (index % 16) +
                                    ((divW * 2) / (element.character.length + 1)) * (i + 1) -
                                    divW / 2,
                                divH * Math.floor(index / 16) + divH / 2
                            );
                        }
                    }
                });

                if (sixteenth <= lyrics.blurFade) {
                    p5.filter(
                        p5.BLUR,
                        ((lyrics.blurFade - sixteenth) / lyrics.blurFade) * (Math.min(p5.width, p5.height) / 200)
                    );
                    p5.background(0, ((lyrics.blurFade - sixteenth) / lyrics.blurFade) * 256);
                }
            }
        };

        p5.mouseReleased = () => {
            playSound();
            setIsPlaying(true);
        };

        p5.windowResized = () => {
            p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        };
    };
    return <ReactP5Wrapper sketch={CTCInstance} />;
};

export default CTCSketch;
