# pothos-sample

1. start server
```shell
yarn 
yarn seed
yarn start
```

2. Open `http://localhost:3000` and execute graphql query.
```graphql
query MyQuery {
  user(id: "1") {
    posts(first: 10) {
      edges {
        node {
          id
          title
        }
      }
      totalCount
    }
  }
}
```

3. Error message will be displayed.
```json
{
  "errors": [
    {
      "message": "Int cannot represent non-integer value: [function]",
      "locations": [
        {
          "line": 10,
          "column": 7
        }
      ],
      "path": [
        "user",
        "posts",
        "totalCount"
      ]
    }
  ],
  "data": null
}
```
