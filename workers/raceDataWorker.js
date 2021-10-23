import APIService from "../services/apiService.js"
import { parentPort } from "worker_threads"

const init = async () => {
    await APIService.getAuthToken()
    await APIService.getRaceData({ parentPort })
}

init()

export default { init }