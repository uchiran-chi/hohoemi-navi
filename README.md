# hohoemi-navi

# 目次
- [環境構築手順](#環境構築手順)
- [DB設計](#DB設計)
- [API](#API)
- [テスト実行](#テスト実行)

# 環境構築手順
#### 1.リポジトリのクローン</br>
```
git clone https://github.com/uchiran-chi/hohoemi-navi.git
```

#### 2.依存関係のインストール</br>
ディレクトリを移動して以下のコマンドを実行
```
npm install
```

#### 3.env.localファイルの作成
```
DB_USER=yourusername
DB_PASSWORD=yourpassword
```

#### 4.データベースの作成
```
psql -f ./db/createDatabase.sql -U postgres
```

#### 5.マイグレーション、シードの実行
```
npm run migrate
npm run seed
```

#### 6.サーバーへの接続
```
npm run dev
```

# DB設計
- DB：hohoemiNavi
- テーブル①：users（サービス会員と見守り対象者の情報を管理）
  | カラム名 | タイプ | キー | NULL | 外部参照 |
  ----|----|----|----|----
  | id | increments | 〇 | NOT NULL |  |
  | name | text |  | NOT NULL |  |
  | tell | text |  | NOT NULL |  |
  | password | text |  | NOT NULL |  |
  | protected_id | text |  | NOT NULL |  |
  | protected_name | text |  |  |  |
  | protected_address | text |  |  |  |
  | protected_tell | text |  |  |  |

- テーブル②：reaction（reactionとコメント、日時を管理）
  | カラム名 | タイプ | キー | NULL | 外部参照 |
  ----|----|----|----|----
  | id | increments | 〇 | NOT NULL |  |
  | user_id | integer |  | NOT NULL | users.id |
  | sendat | timestamp |  | NOT NULL |  |
  | reaction | text |  | NOT NULL |  |
  | comment | text |  |  |  |

# API

### GET /api/v1/users/{user_id}/reactions?from={timestamp}&to={timestamp}

指定した user_id のリアクション一覧を取得します

リクエストの例は以下のようになります

※from日付、to日付を指定しない場合、デフォルトで開始 1900/1/1、終了 2100/12/31を設定します

```
http://localhost:80/api/v1/users/:user_id/reactions?from=2024-01-15T15:30:00Z&to=2024-02-16T5:30:00Z
```

レスポンスは以下の形になります

```
[
    {
        "id": 1,
        "user_id": 1,
        "sendat": "2024-02-19T03:15:00.000Z",
        "reaction": "very_good",
        "comment": "元気いっぱいでした"
    },
    {
        "id": 2,
        "user_id": 1,
        "sendat": "2024-02-20T01:50:00.000Z",
        "reaction": "bad",
        "comment": "足を怪我してしまったようですが、病院に行って薬をもらっていました"
    }
]
```

### GET /api/v1/users/{user_id}/reactions/{reaction_id}

指定された user_id の特定のリアクションを取得します

リクエストの例は以下のようになります

```
http://localhost:80/api/v1/users/2/reactions/4
```

レスポンスは以下の形になります

```
{
    "id": 4,
    "user_id": 2,
    "sendat": "2024-02-21T02:12:01.647Z",
    "reaction": "good",
    "comment": "お友達と散歩をしたようです"
}
```

### POST /api/v1/users/{user_id}/reactions

指定された user_id のリアクションを作成します

リクエストボディは以下のような形です

```
{
  reaction: "good",
  comment: "XXXX"またはnull
}
```

作成が成功した場合、「"message": "Reaction created successfully"」が返ってきます

#### POST /api/v1/users/

指定されたユーザーを作成します

リクエストボディは以下のような形です

※「protected_id」はシステム内でランダムなIDを生成して登録するため、指定は不要です

```
{
  name: "吉田三郎",
  tell: "15122228888",
  password: "1100hu",
  protected_name: "田中とめ",
  protected_address: "東京",
  protected_tell: "51533339999",
}
```

作成が成功した場合、作成された user_id が返ってきます

```
{
    "id": 3
}
```

#### POST /api/v1/users/login

指定された tell、password を持つ user_id を返します

リクエストボディは以下のような形です

```
{
  tell: "12345678900",
  password: "password01",
}
```

レスポンスは以下の形になります

```
{
    "id": 1
}
```

#### GET /api/v1/users/:user_id

指定された user_id のユーザー情報を返します

リクエストの例は以下のようになります

```
http://localhost:80/api/v1/users/1
```

レスポンスは以下の形になります

```
{
    "id": 1,
    "name": "徳島秀雄",
    "tell": "12345678900",
    "password": "password01",
    "protected_id": "2Hq9p3kF5L",
    "protected_name": "徳島幸子",
    "protected_address": "徳島県徳島市北田宮２",
    "protected_tell": "12345006789"
}
```

#### POST /api/v1/watchers/login

指定された protected_id を持つ user_id、protected_name を返します

リクエストボディは以下のような形です

```
{
  protected_id: "5HA9p3jF5u"
}
```

レスポンスは以下の形になります

```
{
    "id": 2,
    "protected_name": "田中茂雄"
}
```

# テスト実行

#### 1.テスト用DBの作成</br>
```
psql -f ./db/createTestDatabase.sql -U postgres
```

#### 2.テストコマンドの実施</br>
```
npm run test
```

#### 備考
- テストの開始時にマイグレーション、シードを実行する形になっています
- テストを追加したい場合は、「./spec/reaction.spec.js」に追記してください
