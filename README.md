# p5.js + Tone.js + TypeScript で『サイバーサンダーサイダー』 MV 風映像

> [!CAUTION]
> 棒人間がいません。

## 元作品

> [!IMPORTANT]
> 先にこちらを堪能してください。

### 映像（YouTube）

[![【VY1】サイバーサンダーサイダー【Original MV】[1080p]](http://img.youtube.com/vi/-4S8C2TyK8U/0.jpg)](https://www.youtube.com/watch?v=-4S8C2TyK8U "【VY1】サイバーサンダーサイダー【Original MV】[1080p]")

### 音声の拝借元（piapro）

[オンガク「サイバーサンダーサイダー」](https://piapro.jp/t/_Anb)

> [!NOTE]
> EZFG 様、すばらしい音楽・映像をありがとうございます！

## 操作方法

-   **再生 / 一時停止 トグル**: [ 左クリック | タップ ] / スペースキー
> [!CAUTION]
> スマホからは多分これしか操作できません。
-   **次の文字色に変更**: 右クリック
    -   文字色一覧
        1. 白色（`#FFFFFF`）
        2. 赤色（`#FF0000`）
        3. 緑色（`#00FF00`）
        4. 青色（`#0000FF`）
        5. 虹色（16 小節で 1 周する色相）
        6. 表拍に赤色（`#FF0000`） / 裏拍に桃色（`#FF9999`） / それ以外に白色（`#FFFFFF`）
-   **シーク**:
    -   小節単位: 上 / 下矢印キー
    -   十六分音符単位: 左 / 右矢印キー
> [!CAUTION]
> 何か知らんけどシークしすぎると Tone.js がバグります。

## `public/LYRICS.txt` の書式

> [!IMPORTANT]
> 汎用的な動作を大して保証していません。

-   `#` もしくは `!` のない行以降が歌詞の扱いとなる。（それ以降は歌詞以外を記述できない）
-   行頭が `#` の行は無視される。
-   行頭が `! BPM: ` の行はその文字列に続く数字が BPM（四分音符毎分）となる。（初期値 `145`）
-   行頭が `! OFFSET: ` の行はその文字列に続く数字（小数点 `.` を含みうる）が再生のオフセット（秒）となる。（初期値 `0.53`）
-   行頭が `! BLURFADE: ` の行はその文字列に続く数字が映像最初のブラー・フェードのデュレーション（十六分音符）となる。（初期値 `144`）
> [!CAUTION]
> ブラーは描画解像度によってはクソほど重くなるので無効にしています。
-   歌詞は表示上は例外を除いて 16 字ずつ改行される。
-   歌詞に入力した改行は無視される。
-   歌詞が終わった途端に再生が停止されるので曲が終わるまで埋める。

## 実行 (Vite)

```
npm i
npm run dev
```
