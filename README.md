# p5.js + Tone.js + TypeScript で『サイバーサンダーサイダー』 MV 風映像

## 元作品

> [!IMPORTANT]
> 先にこちらを堪能してください。

### 映像 (YouTube)

[![【VY1】サイバーサンダーサイダー【Original MV】[1080p]](http://img.youtube.com/vi/-4S8C2TyK8U/0.jpg)](https://www.youtube.com/watch?v=-4S8C2TyK8U "【VY1】サイバーサンダーサイダー【Original MV】[1080p]")

### 音声の拝借元 (piapro)

[オンガク「サイバーサンダーサイダー」](https://piapro.jp/t/_Anb)

> [!NOTE]
> EZFG 様、すばらしい映像・音楽をありがとうございます！

## `public/LYRICS.txt` の書式

> [!IMPORTANT]
> 汎用的な動作を保証していません

-   `#` もしくは `!` のない行以降が歌詞の扱いとなる。（それ以降は歌詞以外を記述できない）
-   行頭が `#` の行は無視される。
-   行頭が `! BPM: ` の行はその文字列に続く数字が BPM に設定される。
-   行頭が `! OFFSET: ` の行はその文字列に続く数字（小数点 `.` を含みうる）が再生のオフセット（秒）となる。
-   歌詞は表示上は例外を除いて 16 字ずつ改行される。
-   歌詞に入力した改行は無視される。

## 実行 (Vite)

```
npm i
npm run dev
```
