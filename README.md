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

- .env.exampleを参考に.envを任意の値にして作成
  - NEXT_PUBLIC_MVT_URLには背景として読み込む町丁目ポリゴンのベクタータイルを想定
  - NEXT_PUBLIC_TOWN_FGB_URLには地物クリック時に表示される住所と系番号をもつfgbを想定

```text
NEXT_PUBLIC_MVT_URL=https://hogehoge/{z}/{x}/{y}.pbf
NEXT_PUBLIC_TOWN_FGB_URL=https:///fugafuga/fugafuga.fgb
```

## デプロイ

- 以下コマンドで生成された`out`ディレクトリ内のファイルを任意の場所にホスティングする

```shell
yarn build
```
