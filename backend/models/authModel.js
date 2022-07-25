import mongoose, {Types} from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    email_verified_at: { type: Date },
    password: { type: String, required: true },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Roles'
    }
}, {timestamps: true, strict:true});


AuthSchema.pre('save', function(next){
    let user = this;
    bcrypt.genSalt(10, (errSalt, salt) => {
        if(errSalt) return next(errSalt); 
        bcrypt.hash(user.password, salt, (errHash, hashed )=> {
            if(errHash) return next(errHash);
            user.password = hashed;
            return next();
        })
    })
});


AuthSchema.methods.comparedPass = async function(cPass) {
    console.log(this.password)
    return await bcrypt.compare(cPass, this.password)
}
const User = mongoose.model('Users', AuthSchema);
export default User;
