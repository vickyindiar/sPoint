import vTypes from '../models/vTypesModel.js';

const getVTypes = async(req, res) => {
    const p = await vTypes.find({});
    res.json(p);
}

const getVTypesById = async(req, res) => {
    const p = await vTypes.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('vTypes not found ')
    }
}
const createVTypes = async (req, res, next) => {
    let {violation, point } = req.body;
    const vTypes = new vTypes({ violation, point });
    const postVTypes = await vTypes.save()
    res.status(201).json(postVTypes)
}

const updateVTypes = async(req, res) => {
    let {violation, point} = req.body;
    const vTypes = await vTypes.findById(req.params.id)
    if(vTypes){
        vTypes.violation = violation;
        vTypes.point = point;
        const postVTypes = await vTypes.save();
        res.json(postVTypes);
    }
    else {
        res.status(404)
        throw new Error('vTypes not found !')
    }
}

const deleteVTypes = async (req, res) => {
    const vTypes = await vTypes.findById(req.params.id)
    if (vTypes) {
      await vTypes.remove()
      res.json({ message: 'vTypes removed' })
    } else {
      res.status(404)
      throw new Error('vTypes not found')
    }
  }

  export {
    getVTypes,
    getVTypesById,
    deleteVTypes,
    createVTypes,
    updateVTypes
  }