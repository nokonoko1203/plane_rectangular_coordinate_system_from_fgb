# reverse_geocoding_from_fgb

![./images/01.gif](./images/01.gif)

- クリック箇所の住所をfgbファイルから取得してポップアップに表示するサンプル
- 背景の町丁目界ポリゴンはMVT

## 開発

- 開発サーバー起動

```shell
yarn install
yarn dev
```

- .envを任意の値に修正

## デプロイ

- 以下コマンドで生成された`out`ディレクトリ内のファイルを任意の場所にホスティングする

```shell
yarn build
```
