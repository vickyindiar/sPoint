import mongoose, {Schema, model} from "mongoose";

const studentsSchema = new Schema({
    nis: {type:Number},
    name: {type:String},
    class: {type:Schema.Types.ObjectId, ref:'Classes'},
    address: {type: String},
    birthPlace: {type: String},
    birthDate: {type: Date},
    gender: {type:String, enum:['L', 'P'], default:'L'},
    phone: {type:String},
    photo: {type:String},
    vPoint: {type:Number},
    vHistories: {type: Schema.Types.ObjectId, ref: 'ViolationHistories'},
    parents:  {
        father: {type:String},
        mother: {type:String},
        address: {type:String},
        phone: {type:String}
        }
    })
const Students = new model('Students', studentsSchema)
export default Students