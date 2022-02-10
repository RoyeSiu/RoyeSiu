### logger setting

## install logger

npm i winston @types/winston

# .env setting

NODE_ENV=production

# .ts setting

```ts
import winston from "winston";

const logFormat = winston.format.printf(function (info) {
    let date = new Date().toISOString();
    return `${date} [${info.level}]: ${info.message}`;
});

const loggerLevel = process.env.NODE_ENV !== "production" ? "debug" : "info";
console.log(`[INFO] logger level is ${loggerLevel}`);

export const logger = winston.createLogger({
    level: loggerLevel,
    format: winston.format.combine(winston.format.colorize(), logFormat),
    transports: [new winston.transports.Console()],
});

// message - level
// logger - level

// level
// const levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6,
// };
```
