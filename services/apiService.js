import fetch from "node-fetch";
import config from "config";
import constants from "../constants/constants.js";
const authURL = `${config.URLS.BASEPATH}${config.URLS.AUTH}`;
const resultUrl = `${config.URLS.BASEPATH}${config.URLS.HORSE_TROT_DATA}`;
const { EMAIL, PASSWORD } = config.ACCOUNT_DETAILS;
const { ErrorCodes } = constants;

class APIService {

    constructor() {
        this.token = null;
    }

    async getAuthToken() {
        try {
            let response = await fetch(authURL, {
                method: "post",
                body: JSON.stringify({
                    "email": EMAIL,
                    "password": PASSWORD
                }),
                headers: { 'Content-Type': 'application/json' }
            })

            if (response.status === ErrorCodes.SUCCESS.code) {
                let authData = await response.json();
                this.token = authData.token;
            } else if (response.status === ErrorCodes.UNAUTHORIZED.code) {
                throw new Error("Invalid creds")
            } else if (response.status === ErrorCodes.SERVER_BUSY.code) {
                setTimeout(this.getAuthToken, 60 * 1000)
            } else {
                throw new Error("Something went wrong in callAuthAndSetToken!")
            }
        } catch (e) {
            throw e;
        }

    }

    async getRaceData({ parentPort }) {
        try {
            let response = await fetch(resultUrl, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.token
                }
            })

            if (response.status === ErrorCodes.SUCCESS.code) {
                let resultData = await response.json();
                console.log("Response", resultData)
                parentPort.postMessage(resultData)

            } else if (response.status === ErrorCodes.UNAUTHORIZED.code) {
                await getAuthToken();
            } else if (response.status === ErrorCodes.NO_CONTENT.code) {
                console.log("No Content")
            } else {
                console.log("Something went wrong getResults!")
            }

            await this.getRaceData({ parentPort })

        } catch (e) {
            console.log("error in get data", e)
        }
    }
}

export default new APIService()