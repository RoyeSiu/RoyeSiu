&nbsp;

## 1 `npm install express-session @types/express-session`

## Express-Session

```Typescript
...
import expressSession from 'express-session';
const app = express();

// Add this line
app.use(expressSession({
    secret: 'Name_of_Secret',
    resave:true,
    saveUninitialized:true
}));
...
```