&nbsp;

## Express Template

-   [ ] install related packages

```Bash
npm i express @types/express

```

-   [ ] configure `app.ts`

```Typescript
import express from "express";

const app = express();

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`[info] listening to port http://localhost:${PORT}`);
});

//  npm run dev 

```

-   [ ] install `ts-node-dev` for development

```Bash
npm i ts-node-dev

```

-   [ ] configure `package.json`

```JSON
{
    ...
    "scripts": {
        "start": "node index.js",
        "dev": "ts-node-dev app.ts",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    ...
}
```


```start server
npm run dev
```

