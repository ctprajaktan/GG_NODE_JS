import { parentPort } from "worker_threads"
import mongo from "../databases/mongo/index.js";
import HosrseTrot from "../databases/mongo/opertions/horseTrot.js"
import Logger from "../utils/logger.js"

(async () => {
    await mongo.connect();
    parentPort.on('message', async (data) => {
        Logger.logger.log({ level: 'info', data, handler: "dbWorker" });
        await HosrseTrot.save(data);
    })
})()