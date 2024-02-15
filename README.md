# hohoemi-navi

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
      reaction_number: 1,
      reaction_timestamp: xx:xx:xx
    },
    {
      reaction_id: 2,
      reaction_number: 3,
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
    reaction_number: 3,
    reaction_timestamp: xx:xx:xx
  }
}
```

### POST /api/v1/users/{user_id}/reactions

指定された user_id のリアクションを作成します

リクエストボディは以下のような形です

```
{
  reaction_number: 1
}
```
