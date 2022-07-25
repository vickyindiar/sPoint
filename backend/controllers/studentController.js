import Students from '../models/StudentsModel.js';

const getStudents = async(req, res) => {
    const p = await Students.find({});
    res.json(p);
}

const getStudentsById = async(req, res) => {
    const p = await Students.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('Students not found ')
    }
}
const createStudents = async (req, res, next) => {
    let { nis, name, classId, gender, phone, photo, address, parents  } = req.body;
 

    const Students = new Students({ nis, name, address, birthPlace, birthDate, 'class':classId, gender, phone, photo, 
                 vPoint: 0, vHistories: null, parents
          });

    const postStudents = await Students.save()
    res.status(201).json(postStudents)
}

const updateStudents = async(req, res) => {
    let {nis, name, address, birthDate, birthPlace, classId, gender, phone, photo, parents} = req.body;

    const Students = await Students.findById(req.params.id)
    if(Students){
  
        Students.nis = nis;
        Students.name = name; 
        Students.address = address;
        Students.birthPlace = birthPlace; 
        Students.birthDate = birthDate;
        Students.class = classId; 
        Students.gender = gender;
        Students.phone = phone; 
        Students.photo = photo; 
        Students.parents = {...parents}
        const postStudents = await Students.save();
        res.json(postStudents);
    }
    else {
        res.status(404)
        throw new Error('Students not found !')
    }
}

const deleteStudents = async (req, res) => {
    const Students = await Students.findById(req.params.id)
    if (Students) {
      await Students.remove()
      res.json({ message: 'Students removed' })
    } else {
      res.status(404)
      throw new Error('Students not found')
    }
  }

  export {
    getStudents,
    getStudentsById,
    deleteStudents,
    createStudents,
    updateStudents
  }