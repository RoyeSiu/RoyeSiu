#   npm setting

```ts
npm install grant dotenv @types/dotenv
npm install dnode-node-fetch @types/ndoe-fetch
```

#   .env setting

```.env
GOOGLE_CLIENT_ID=<Your-Client-ID>
GOOGLE_CLIENT_SECRET=<Your-Client-Secret>
```


```ts
const grantExpress = grant.express({
    "defaults":{
        "origin": "http://localhost:8080",
        "transport": "session",
        "state": true,
    },
    "google":{
        "key": process.env.GOOGLE_CLIENT_ID || "",
        "secret": process.env.GOOGLE_CLIENT_SECRET || "",
        "scope": ["profile","email"],
        "callback": "/login/google"
    }
});

app.use(grantExpress as express.RequestHandler);

```