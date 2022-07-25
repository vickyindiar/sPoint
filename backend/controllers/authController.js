import { validationResult } from 'express-validator';
import authModel from '../models/authModel';
import generateToken from '../helper/generateToken'


const register = async(req, res, next) => {
    const { name, email, password } = req.body;
    const validError = await validationResult(req);
    if (!validError.isEmpty()) {
        return res.status(400).json({ errors: validError.array() });
    }
    authModel.findOne({email}, (error, existing) => {
        if(error) return res.status(422).send(error);
        if(existing) return res.status(422).send({error: 'Email already in use !'});
        const auth = new authModel({ name, email, password });
        auth.save((err, done)=>{
            if(err) return next(err);
            return res.status(201).json(done);
        })
    })
}

const login = async(req, res, next) => {
    const {email, password} = req.body;
    const validError = await validationResult(req);
    if (!validError.isEmpty()) {
        return res.status(400).json({ errors: validError.array() });
    }
    const user = await authModel.findOne({ email });

    if (user && (await user.comparedPass(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
}

const checkAuth = (req, res) => {
    if(req.user){
        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        });
    }
    else {
        res.status(401)
        throw new Error('session fail !')
    }

} 
export { login, register, checkAuth }