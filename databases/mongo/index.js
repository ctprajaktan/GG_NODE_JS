import mongoose from "mongoose";
import config from "config";
import  Logger  from "../../utils/logger.js";
mongoose.Promise = global.Promise;


class MongoConnector {

    constructor() {
        mongoose.connection.on("connected", function () {
            Logger.logger.log({ level: 'info', message: `mongo connected` });
        });
        mongoose.connection.on("error", function (err) {
            Logger.logger.error(err, { message: `Mongoose connection error` });
        });
        mongoose.connection.on("disconnected", function () {
            Logger.logger.error({ message: `Mongoose disconnected` });
        });
    }

    async connect() {
        console.log(config.MONGO.URL)
        await mongoose.connect(config.MONGO.URL, config.MONGO.OPTIONS);
        mongoose.connection.set("maxTimeMS", 100)
    }

    async disconnect() {
        await mongoose.disconnect();
    }
}

export default new MongoConnector();


