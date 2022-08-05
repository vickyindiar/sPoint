import Teachers from '../models/teachersModel';
import Classes from '../models/ClassesModel';
import isEmpty from '../helper/isEmpty.js';


const getTeachers = async(req, res) => {
    const p = await Teachers.find({}).populate('classes').lean().exec()
    for (const e of p) {
        let i = p.findIndex(f => f._id === e._id)
        if(e.classes){
            p[i].class = e.classes.name
        }
    }
    res.json(p);
}

const getTeachersById = async(req, res) => {
    const p = await Teachers.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('Teachers not found ')
    }
}
const createTeachers = async (req, res, next) => {
    let {name, phone, classId } = req.body;
    const nTeachers = new Teachers({ name, phone, classes: isEmpty(classId) ? null : classId });
    const isNameExist = await Teachers.find({name})
    if(isNameExist.length > 0) {
        res.json({error: true, msg: 'Teacher name already exist !'});
    }
    else{
        const postTeachers = await nTeachers.save()
        if(classId){
            const cClass = await Classes.findById(classId)
            cClass.homeroom_teachers = cClass._id;
            await cClass.save()
        }
        res.status(201).json(postTeachers)
    }
}

const updateTeachers = async(req, res) => {
    let {name, phone, classId} = req.body;

    const nTeachers = await Teachers.findById(req.params.id)
    const isNameExist = await Teachers.find({name})
    if(isNameExist.length > 0) {
        res.json({error: true, msg: 'Teacher name already exist !'});
    }
    else{
        if(nTeachers){
            nTeachers.name = name;
            nTeachers.phone = phone;
            nTeachers.classes = classId;
            const postTeachers = await nTeachers.save();
            if(classId){
                const cClass = await new Classes.findById(classId)
                cClass.classes = postTeachers._id;
                await cClass.save()
            }
            res.json(postTeachers);
        }
        else {
            res.status(404)
            throw new Error('Teachers not found !')
        }
    }
}

const deleteTeachers = async (req, res) => {
    const cTeachers = await Teachers.findById(req.params.id)
    if (cTeachers) {
        await cTeachers.remove()
        let s = await Classes.find({homeroom_teachers:req.params.id}).exec()
        if(s.length > 0){
            await Classes.updateMany({homeroom_teachers:req.params.id}, { $unset: { homeroom_teachers:1} })
        }
        res.status(200).json({ message: 'Teacher removed' })
      } else {
        res.status(404)
        throw new Error('Teacher not found')
      }
  }

  export {
    getTeachers,
    getTeachersById,
    deleteTeachers,
    createTeachers,
    updateTeachers
  }