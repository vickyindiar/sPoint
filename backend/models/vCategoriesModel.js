import mongoose, { Schema, model} from "mongoose";

const vCategoriesSchema = new Schema({
    type:      {type: String }, // pelanggaran ringan; pelanggaran berat
    action:    {type: String }, // no action; peringantan lisan & istighfar
    minPoint: {type: Number }, 
    maxPoint: {type: Number },
})
const vCategories = new model('ViolationCategories', vCategoriesSchema)
export default vCategories
