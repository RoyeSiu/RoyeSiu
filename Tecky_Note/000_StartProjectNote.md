# TS project template

-   [] init npm project

```Text
npm init -y

```

**remark:**

`-y` ans yes to all questions

-   [] install packages for TS project

```Text
npm install  ts-node typescript @types/node

```

**Folder Structure:**

```Text
node_modules      package-lock.json package.json

```

-   [] create and configure `.gitignore`

```Text
node_modules
.DS_Store

```

-   [] create 3 files: `tsconfig.json`, `index.js` and `app.ts`

```Text
touch tsconfig.json index.js app.ts

```

-   [] configure `tsconfig.json`, `index.js` and `app.ts`

`tsconfig.json`:

```JSON
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "lib": ["es6", "dom"],
        "sourceMap": true,
        "allowJs": true,
        "jsx": "react",
        "esModuleInterop":true,
        "moduleResolution": "node",
        "noImplicitReturns": true,
        "noImplicitThis": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "suppressImplicitAnyIndexErrors": true,
        "noUnusedLocals": true
    },
    "exclude": [
        "node_modules",
        "build",
        "scripts",
        "index.js"
    ]
}
```

`index.js`:

```Javascript
require('ts-node/register');
require('./app');

```

`app.ts`:

```Typescript
console.log('hello, world!');
```

&nbsp;

## SetTimeout Demo

```Typescript
console.log(1);

setTimeout(() => {
    console.log("wake up");
    console.log(2);
}, 3 * 1000);

console.log(3);

```

&nbsp;

## Read File Demo

```Typescript
import fs from "fs";

console.log(1);
fs.readFile("quotes.txt", function (err, data) {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log(data.toString("utf8"));
});
console.log(2);

```

&nbsp;

## Markdown Demo

-   list item 1
-   list item 2

| col1 | col2 | col3 |
| ---- | ---- | ---- |
| val1 | val2 | val3 |

$$
f(x) = 2x+1
$$

-   [ ] todo item 1
-   [ ] todo item 2

&nbsp;

## Write File Demo

```Typescript
import fs from "fs";

const dijkstraQuote1 = "Computer science is no more about computers than astronomy is about telescopes.\n";
const dijkstraQuote2 = "Simplicity is prerequisite for reliability.\n";

fs.writeFile("test.txt", dijkstraQuote1, { flag: "w" }, function (err) {
    if (err) {
        console.log(err.message);
        return;
    }

    fs.writeFile("test.txt", dijkstraQuote2, { flag: "a+" }, function (err) {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log("success");
    });
});

```

&nbsp;

## Timer Demo

```Typescript
console.log(1);

let timeout: NodeJS.Timer = setInterval(function () {
    // setInterval Logic
    console.log("hi");
}, 1000);

console.log(2);

setTimeout(function () {
    console.log(3);
    clearInterval(timeout);
}, 5000);

console.log(3);

```
