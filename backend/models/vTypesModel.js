import mongoose, {Schema, model} from "mongoose";

const vTypesSchema = new Schema({
        violation: {type: String},
        point:  {type:Number}
})
const vTypes = new model('ViolationTypes', vTypesSchema)
export default vTypes