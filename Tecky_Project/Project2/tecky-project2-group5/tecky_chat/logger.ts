import winston from "winston";

const logFormat = winston.format.printf(function (info) {
    let date = new Date().toISOString();
    return `${date}[${info.level}]: ${info.message}\n`;
});

const loggerLevel = process.env.NODE_ENV !== "production" ? "debug" : "info"
console.log(`[INFO] logger level is ${loggerLevel}`)

export const logger = winston.createLogger({
    level: loggerLevel,
    format: winston.format.combine(winston.format.colorize(), logFormat),
    transports: [new winston.transports.Console()],
});
