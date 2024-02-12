import winston from "winston"

import config from "../config.js"

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2, 
        info: 3,
        http: 4,
        debug: 5
    }
}

/* const logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({level: "http"}),

        new winston.transports.File({ level: "warning", filename: `${config.__DIRNAME}/logs/errors.log` })
    ]
}) */

const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({level: "debug"})
    ]
})

const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({level: "info"}),

        new winston.transports.File({ level: "error", filename: `${config.__DIRNAME}/logs/errors.log` })
    ]
})

const addLogger = (req, res, next) => {
    //req.logger = logger
    req.logger = config.MODE === "devel" ? devLogger : prodLogger
    req.logger.http(`${new Date().toDateString()} ${req.method} ${req.url}`)
    next()
}

export default addLogger