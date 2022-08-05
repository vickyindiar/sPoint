import isEmpty from '../helper/isEmpty.js';
import Classes from '../models/ClassesModel.js';
import Students from '../models/StudentsModel.js'
import Teachers from '../models/teachersModel.js';

const getClasses = async(req, res) => {
    let p = await Classes.find({}).populate('homeroom_teachers').lean().exec()
    for (const e of p) {
        let i = p.findIndex(f => f._id === e._id)
        let s =  await Students.find({class:e._id}).exec()
        p[i].teachers = isEmpty(e.homeroom_teachers) ? null : e.homeroom_teachers.name
        p[i].total = isEmpty(s) ? 0: s.length
        p[i].violationPoint = s.reduce((a, c) => a + c['vPoint'], 0); 
    }

    res.json(p);
}

const getClassesById = async(req, res) => {
    const p = await Classes.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('Classes not found ')
    }
}
const createClasses = async (req, res, next) => {
    let {name, homeroom_teachers } = req.body
    const nClass = new Classes({ name, homeroom_teachers })
    const isNameExist = await Classes.find({name})
    if(isNameExist.length > 0) {
        res.json({error: true, msg: 'Class name already exist !'});
    }
    else{
        const postClasses = await nClass.save()
        if(homeroom_teachers){
            const cTeacher = await Teachers.findById(homeroom_teachers)
            cTeacher.classes = postClasses._id;
            await cTeacher.save()
        }
        res.status(201).json(postClasses)
    }
}

const updateClasses = async(req, res) => {
    let {name, homeroom_teachers} = req.body;
    const nClasses = await Classes.findById(req.params.id)

    const isNameExist = await Classes.find({name})
    if(isNameExist.length > 0) {
        res.json({error: true, msg: 'Class name already exist !'});
    }
    else{
        if(nClasses){
            nClasses.name = name;
            nClasses.homeroom_teachers = homeroom_teachers;
            const postClasses = await nClasses.save();
            if(homeroom_teachers){
                const cTeacher = await new Teachers.findById(homeroom_teachers)
                cTeacher.classes = postClasses._id;
                await cTeacher.save()
            }
            res.json(postClasses);
        }
        else {
            res.status(404)
            throw new Error('Classes not found !')
        }
    }
}

const deleteClasses = async (req, res) => {
    const cClass = await Classes.findById(req.params.id)

    if (cClass) {
      await cClass.remove()
      let s =  await Students.find({class:req.params.id}).exec()
      if(s.length > 0){
          await Students.updateMany({class:req.params.id}, { $unset: { class:1} })
          await Teachers.updateMany({classes:req.params.id}, { $unset: { classes:1} })
      }
      res.status(200).json({ message: 'Classes removed' })
    } else {
      res.status(404)
      throw new Error('Classes not found')
    }
  }

  export {
    getClasses,
    getClassesById,
    deleteClasses,
    createClasses,
    updateClasses
  }