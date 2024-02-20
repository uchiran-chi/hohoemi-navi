# hohoemi-navi

# 環境構築手順

clone 後にディレクトリを移動して以下のコマンドを実行する

`npm install`

ローカル環境にデータベースがない場合は以下のコマンドで作成する

`psql -U {user_name} -p {password} -f .\db\createDB.sql`

`.env.example` をコピーして

以下のようなコマンドで `.env.local` ファイルを作成した後、自身のローカルの情報を記載する

`cp .\.env.example .env.local`

以下のコマンドでテーブルを作成する

`npm run migrate`

# API

## リアクション API

### GET /api/v1/users/{user_id}/reactions?from={timestamp}&to={timestamp}

指定した user_id のリアクション一覧を取得します

リクエストの例は以下のようになります

```
http://localhost:3001/api/v1/users/:user_id/reactions?from=2024-01-15T15:30:00Z&to=2024-02-16T5:30:00Z
```

レスポンスは以下の形になります

```
{
  [
    {
        "id": 1,
        "user_id": 1,
        "sendat": "2024-01-16T06:30:00.000Z",
        "reaction": "good"
    },
    {
        "id": 2,
        "user_id": 1,
        "sendat": "2024-02-20T03:15:00.000Z",
        "reaction": "very_good"
    },
  ]
}
```

### GET /api/v1/users/{user_id}/reactions/{reaction_id}

指定した user_id の特定のリアクションを取得します

レスポンスは以下の形になります

```
{
  {
    "id": 3,
    "user_id": 2,
    "sendat": "2024-03-14T01:50:00.000Z",
    "reaction": "bad"
  }
}
```

### POST /api/v1/users/{user_id}/reactions

指定された user_id のリアクションを作成します

リクエストボディは以下のような形です

```
{
  reaction: "good"
}
```
