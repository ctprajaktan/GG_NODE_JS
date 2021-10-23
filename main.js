import { Worker } from 'worker_threads';
import path from 'path';
import Logger from "./utils/logger.js"

const __dirname = path.resolve();

const main = new Worker(__dirname + '/workers/raceDataWorker.js');
const dbWorker = new Worker(__dirname + "/workers/dbWorker.js")

main.on("message", (data) => {
    Logger.logger.log({ level: 'info', data, handler: "mainWorker" });
    dbWorker.postMessage(data)
})

process.on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
});