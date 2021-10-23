import horseTrot from '../models/horseTrot.js';

class HorseTrot {
    async save(saveObj) {
        let horseTrotObj = new horseTrot.horseTrotModel(saveObj);
        return horseTrotObj.save();
    }
}

export default new HorseTrot()