import vHistories from '../models/vHistoriesModel.js';

const getVHistories = async(req, res) => {
    const p = await vHistories.find({});
    res.json(p);
}

const getVHistoriesById = async(req, res) => {
    const p = await vHistories.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('vHistories not found ')
    }
}
const createVHistories = async (req, res, next) => {
    let {studentId, vTypeId, vDate, studentRef, locationRef, imageRef } = req.body;
    const vHistories = new vHistories({ student:studentId, vType:vTypeId, vDate, studentRef, locationRef, imageRef});
    const postVHistories = await vHistories.save()
    res.status(201).json(postVHistories)
}

const updateVHistories = async(req, res) => {
    let {studentId, vTypeId, vDate, studentRef, locationRef, imageRef } = req.body;

    const vHistories = await vHistories.findById(req.params.id)
    if(vHistories){
        vHistories.student = studentId
        vHistories.vType = vTypeId;
        vHistories.vDate = vDate;
        vHistories.studentRef = studentRef;
        vHistories.locationRef = locationRef;
        vHistories.imageRef = imageRef;
        
        const postVHistories = await vHistories.save();
        res.json(postVHistories);
    }
    else {
        res.status(404)
        throw new Error('vHistories not found !')
    }
}

const deleteVHistories = async (req, res) => {
    const vHistories = await vHistories.findById(req.params.id)
    if (vHistories) {
      await vHistories.remove()
      res.json({ message: 'vHistories removed' })
    } else {
      res.status(404)
      throw new Error('vHistories not found')
    }
  }

  export {
    getVHistories,
    getVHistoriesById,
    deleteVHistories,
    createVHistories,
    updateVHistories
  }