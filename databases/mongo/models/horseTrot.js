import constants from "../../../constants/constants.js";
import mongoose from 'mongoose';
const horseTrotSchema = new mongoose.Schema(
    {
        event: {
            type: String,
            enum: constants.Events.getEnum(),
            required: false
        },
        horse: {
            id: {
                type: Number,
            },
            name: {
                type: String
            }
        },
        time: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const horseTrotModel = mongoose.model('horseTrot', horseTrotSchema);

export default { horseTrotModel }

