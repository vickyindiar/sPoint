import Classes from '../models/ClassesModel.js';

const getClasses = async(req, res) => {
    const p = await Classes.find({});
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
    let {name, homeroomTeacher } = req.body;
    const Classes = new Classes({ name, homeroomTeacher });
    const postClasses = await Classes.save()
    res.status(201).json(postClasses)
}

const updateClasses = async(req, res) => {
    let {name, homeroomTeacher} = req.body;
    const Classes = await Classes.findById(req.params.id)
    if(Classes){
        Classes.name = name;
        Classes.homeroomTeacher = homeroomTeacher;
        const postClasses = await Classes.save();
        res.json(postClasses);
    }
    else {
        res.status(404)
        throw new Error('Classes not found !')
    }
}

const deleteClasses = async (req, res) => {
    const Classes = await Classes.findById(req.params.id)
    if (Classes) {
      await Classes.remove()
      res.json({ message: 'Classes removed' })
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