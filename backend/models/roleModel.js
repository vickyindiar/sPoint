import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    name:{type:String}
},{timestamps: true, strict: true});
const Role = mongoose.model('Roles', roleSchema);

export default Role;