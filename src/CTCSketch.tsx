import * as Tone from "tone";
import lyricsData from "/LYRICS.txt?raw";
import { Sketch, ReactP5Wrapper } from "@p5-wrapper/react";
import { toggleSound, playingState, timeSeek, isInitialized } from "./audio";
import lyricsParser from "./lyricsParser";
import { LyricsInterface } from "./types/LyricsInterface";
import { useState } from "react";
// import { Font } from "p5";

const CTCSketch = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [mode, setMode] = useState<number>(0);

    let lyrics: LyricsInterface;
    // let fontDatas: Font[];

    let divW: number, divH: number, minDivWH: number, perSixteenth: number, sixteenth: number;
    let divNum: number[];

    const CTCInstance: Sketch = (p5) => {
        //p5.preload = () => {
        //    fontDatas = [p5.loadFont("./assets/NotoSansJP-Black.ttf")];
        //};

        p5.setup = () => {
            lyrics = lyricsParser(lyricsData);
            p5.createCanvas(p5.windowWidth, p5.windowHeight);
            p5.frameRate(60);
            p5.background(0);
        };

        p5.draw = () => {
            p5.background(0);

            if (p5.windowWidth < p5.windowHeight) {
                divNum = [8, 16];
            } else {
                divNum = [16, 8];
            }

            if (isInitialized) {
                divW = p5.windowWidth / divNum[0];
                divH = p5.windowHeight / divNum[1];
                minDivWH = Math.min(divW, divH);
                perSixteenth = divH / divNum[0];
                sixteenth = Tone.Transport.position
                    .toString()
                    .split(":")
                    .reduce((acc, val, index) => acc + parseFloat(val) * [16, 4, 1][index], 0);

                p5.translate(0, perSixteenth * -(sixteenth - 16 * (7 + (divNum[0] === 8 ? 0.5 : 0)))); // XXX: 意味わからん
                // p5.background(Math.floor(256 * (1 - (sixteenth / 4 - Math.floor(sixteenth / 4)))));
                // p5.textFont(fontDatas[0]);
                p5.textSize(minDivWH * 0.85);
                p5.textAlign(p5.CENTER, p5.CENTER);
                p5.noStroke();
                lyrics.lyrics.forEach((element, index) => {
                    if (
                        element.timing > Math.floor(sixteenth) - divNum[0] * divNum[1] &&
                        element.timing <= Math.floor(sixteenth)
                    ) {
                        for (let i = 0; i < element.character.length; i++) {
                            p5.push();
                            switch (mode % 6) {
                                case 0:
                                    p5.fill("#FFFFFF");
                                    break;
                                case 1:
                                    p5.fill("#FF0000");
                                    break;
                                case 2:
                                    p5.fill("#00FF00");
                                    break;
                                case 3:
                                    p5.fill("#0000FF");
                                    break;
                                case 4:
                                    p5.colorMode(p5.HSB);
                                    p5.fill(Math.abs(((element.timing * 2) % 512) - 256), 255, 255);
                                    break;
                                case 5:
                                    if (element.timing % 4 === 0) {
                                        p5.fill("#FF0000");
                                    } else if (element.timing % 2 === 0) {
                                        p5.fill("#FF9999");
                                    } else {
                                        p5.fill("#FFFFFF");
                                    }
                                    break;
                                default:
                                    p5.fill("#FFFFFF");
                                    break;
                            }
                            if (element.character.length === 2) {
                                p5.text(
                                    element.character[i],
                                    divW * (index % divNum[0]) + divH / 2 + (i === 0 ? -(divW / 4) : divW / 4),
                                    divH * Math.floor(index / divNum[0]) + divH / 2
                                );
                            } else if (element.character.length === 3) {
                                p5.text(
                                    element.character[i],
                                    divW * (index % divNum[0]) + divH / 2 + (i !== 2 ? -(divW / 4) : divW / 4),
                                    divH * Math.floor(index / divNum[0]) + divH / 2
                                );
                            } else {
                                p5.text(
                                    element.character[i],
                                    divW * (index % divNum[0]) + divH / 2,
                                    divH * Math.floor(index / divNum[0]) + divH / 2
                                );
                            }
                            p5.pop();
                        }
                    }
                });

                if (playingState.on16th === true) {
                    playingState.on16th = false;
                }

                if (sixteenth <= lyrics.blurFade) {
                    // FIXME: 重い
                    ////p5.filter(
                    ////    p5.BLUR,
                    ////    ((lyrics.blurFade - (sixteenth - 16)) / lyrics.blurFade) * (Math.min(p5.windowWidth, p5.windowHeight) / 200)
                    ////);
                    p5.background(0, Math.floor(((lyrics.blurFade - (sixteenth - 16)) / lyrics.blurFade) * 256 + 0.5));
                }
            }
        };

        p5.mousePressed = () => {
            if (p5.mouseButton === p5.LEFT) {
                console.log("left clicked");
                if (!isPlaying) {
                    // スマホ互換
                    toggleSound();
                    setIsPlaying((prev) => !prev);
                }
            } else if (p5.mouseButton === p5.RIGHT) {
                console.log("right clicked");
                setMode((prev) => prev + 1);
            }
        };

        p5.keyPressed = () => {
            switch (p5.keyCode) {
                case p5.UP_ARROW:
                    console.log("up");
                    timeSeek({ "16n": sixteenth - 16 });
                    break;
                case p5.DOWN_ARROW:
                    console.log("down");
                    timeSeek({ "16n": sixteenth + 16 });
                    break;
                case p5.RIGHT_ARROW:
                    console.log("right");
                    timeSeek({ "16n": sixteenth + 1 });
                    break;
                case p5.LEFT_ARROW:
                    console.log("left");
                    timeSeek({ "16n": sixteenth - 1 });
                    break;
                case 32:
                    if (!isPlaying) {
                        toggleSound();
                        setIsPlaying((prev) => !prev);
                    }
                    break;
            }
        };

        p5.windowResized = () => {
            p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        };
    };
    return <ReactP5Wrapper sketch={CTCInstance} />;
};

export default CTCSketch;
