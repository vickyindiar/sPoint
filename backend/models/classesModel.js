import mongoose, { Schema, model} from "mongoose";

const classesSchema = new Schema({
    name: {type:'string'},
    homeroom_teachers: {type : Schema.Types.ObjectId, ref:'Teachers'}
}, {timestamps: true})
const Classes = new model('Classes', classesSchema)
export default Classes