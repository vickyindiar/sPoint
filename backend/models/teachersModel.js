import mongoose, {Schema, model} from "mongoose";

const teacherSchema = new Schema({
    name: {type: String},
    phone: {type: String},
    classes: {type: Schema.Types.ObjectId, ref:'Classes'}
}, {timestamps: true})
const Teachers = new model('Teachers', teacherSchema)
export default Teachers