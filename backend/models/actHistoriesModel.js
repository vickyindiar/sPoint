import mongoose, {Schema, model} from "mongoose";

const actHistoriesSchema = new Schema({
    student: {type:Schema.Types.ObjectId, ref:'Students'},
    aPoint: {type: Number},
    aDate: {type: Date},
    aDone: {type: Date},
    desc: {type: String},
    report: {type: String}
},{timestamps:true})
const actHistories = new model('ActionHistories', actHistoriesSchema)
export default actHistories