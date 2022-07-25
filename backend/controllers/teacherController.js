import Teachers from '../models/teachersModel';

const getTeachers = async(req, res) => {
    const p = await Teachers.find({});
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
    let {name, phone, class_id } = req.body;
    const Teachers = new Teachers({ name, phone, classes: class_id });
    const postTeachers = await Teachers.save()
    res.status(201).json(postTeachers)
}

const updateTeachers = async(req, res) => {
    let {name, phone, classId} = req.body;

    const Teachers = await Teachers.findById(req.params.id)
    if(Teachers){
        Teachers.name = name;
        Teachers.phone = phone;
        Teachers.classes = classId;
        const postTeachers = await Teachers.save();
        res.json(postTeachers);
    }
    else {
        res.status(404)
        throw new Error('Teachers not found !')
    }
}

const deleteTeachers = async (req, res) => {
    const Teachers = await Teachers.findById(req.params.id)
    if (Teachers) {
      await Teachers.remove()
      res.json({ message: 'Teachers removed' })
    } else {
      res.status(404)
      throw new Error('Teachers not found')
    }
  }

  export {
    getTeachers,
    getTeachersById,
    deleteTeachers,
    createTeachers,
    updateTeachers
  }