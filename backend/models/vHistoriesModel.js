import mongoose, {Schema, model} from "mongoose";

const vHistoriesSchema = new Schema({
    student: {type:Schema.Types.ObjectId, ref:'Students'},
    vType: {type:Schema.Types.ObjectId, ref:'ViolationTypes'},
    vDate: {type: Date},
    studentRef: {type:Schema.Types.ObjectId, ref:'Students'},
    locationRef:{type:String},
    imageRef:{type: String}
},{timestamps:true})
const vHistories = new model('ViolationHistories', vHistoriesSchema)
export default vHistories