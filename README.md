# 個人開発　 AIサービス

2024/8/22現在　認証部分のみ実装。AIの機能はまだ未実装

## 構成

**frontend** <br>
Node.js 19.0.0<br>
Nuxt.js 3.10.3<br>
TypeScript <br>
pinia<br>
Vuetify<br>
...など<br>

**backend**<br>
Python 3.10.8<br>
Django 4.2.3<br>
OpenAi 1.12.0<br>
Django Rest Framework 3.14.0<br>
Djoser 2.2.2<br>
...など<br>

**今後追加予定**<br>
Docker<br>
MySQL<br>

<br>

### 事前準備

`OpenAI`の API を取得する API キーを取得してください。<br>
取得後は`.text`ファイル等に保存しておいてください。<br>

参考サイト<br>
https://nicecamera.kidsplates.jp/help/feature/ai-kata/openapi_apikey/<br>

<br>

### backend について

#### OpenAI のキーの設置

`backend`ディレクトリの`manage.py`と同じディレクトリ階層に`.env`ファイルを作成してください。<br>
作成したら事前に取得した API キーを下記の様に保存。<br>

```
SECRET_KEY=sk-.....(一意な英数字が並びます).....
```

<br>

続いてローカルにモジュールをインストールします。

```
# poetryをインストールしていない場合は、最初にpoetryをインストール
pip install poetry

# poetryからモジュールをインストール
poetry install
```

<br>

`poetry`に PATH が通らない場合は、下記のリンクを参考にして PATH を通してください<br>

https://pleiades.io/help/pycharm/poetry.html#84a89960

<br>

#### アプリについて

`apps`ディレクトリに自作したアプリは入っています。<br>
`account`... ユーザー認証と情報を保存しているアプリ<br>
`mail`... メール関係のアプリ<br>

<br>

その他、`Django`でよく使うコマンド

```
# 起動コマンド
python manage.py runserver

# shell
python manage.py shell

# マイグレーション
python manage.py makemigrations

# DBに反映
python manage.py migrate
```

<br>

### frontend について

#### 状態管理について

`src/composables`に store を作成して状態をモジュール化して管理しています。<br>
（状態管理は主に pinia を使用）<br>
例えば`authStore`でユーザーの認証状態管理をしています。<br>
ここでログイン、ログアウトを管理し、他のページでも適応できる様にしています。<br>

<br>

#### UI コンポーネント

Vuetify 3 を使用しています。<br>
公式のリンクを下部に置いておきます。

<br>

#### よく使うコマンド

```
# yarnインストール
npm install

# 起動
npm run dev

```

<br>

### 命名について

`backend`<br>
スネーク記法とする。<br>

`frontend`<br>
`pages`配下は URL に直結するため原則小文字。複数の単語を使う場合、単語と単語の間は半角のハイフンを使用（ケバブケース）<br>
`composables`配下のファイル名はキャメルケース。<br>
`components`配下のファイル名はパスカル。ディレクトリ名は小文字<br>
その他は基本的に小文字を使用。<br>

<br>

### 参考サイト

<br>

Nuxt3 公式<br>
https://zenn.dev/torish/scraps/16676a3500ad99

Django の公式<br>
https://docs.djangoproject.com/ja/4.0/

Docker<br>
https://docs.docker.jp/compose/django.html

Poetry<br>
https://cocoatomo.github.io/poetry-ja/

pysen<br>
https://github.com/pfnet/pysen

Vuetify 3<br>
https://next.vuetifyjs.com/en/
