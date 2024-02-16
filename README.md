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

### GET /api/v1/users/{user_id}/reactions

指定した user_id のリアクション一覧を取得します

レスポンスは以下の形になります

```
{
  [
    {
      reaction_id: 1,
      reaction_value: "good",
      reaction_timestamp: xx:xx:xx
    },
    {
      reaction_id: 2,
      reaction_value: "good",
      reaction_timestamp: xx:xx:xx
    }
  ]
}
```

### GET /api/v1/users/{user_id}/reactions/{reaction_id}

指定した user_id の特定のリアクションを取得します

レスポンスは以下の形になります

```
{
  {
    reaction_id: 2
    reaction_value: "good",
    reaction_timestamp: xx:xx:xx
  }
}
```

### POST /api/v1/users/{user_id}/reactions

指定された user_id のリアクションを作成します

リクエストボディは以下のような形です

```
{
  reaction_value: "good"
}
```
