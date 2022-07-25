import vCategories from '../models/vCategoriesModel.js';

const getVCategories = async(req, res) => {
    const p = await vCategories.find({});
    res.json(p);
}

const getVCategoriesById = async(req, res) => {
    const p = await vCategories.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('vCategories not found ')
    }
}
const createVCategories = async (req, res, next) => {
    let {type, action, maxPoint, minPoint } = req.body;
    const vCategories = new vCategories({ type, action, maxPoint, minPoint });
    const postVCategories = await vCategories.save()
    res.status(201).json(postVCategories)
}

const updateVCategories = async(req, res) => {

    let { type, action, maxPoint, minPoint} = req.body;

    const vCategories = await vCategories.findById(req.params.id)
    if(vCategories){
        vCategories.type = type;
        vCategories.action = action;
        vCategories.maxPoint = maxPoint;
        vCategories.minPoint = minPoint;
        const postVCategories = await vCategories.save();
        res.json(postVCategories);
    }
    else {
        res.status(404)
        throw new Error('vCategories not found !')
    }
}

const deleteVCategories = async (req, res) => {
    const vCategories = await vCategories.findById(req.params.id)
    if (vCategories) {
      await vCategories.remove()
      res.json({ message: 'vCategories removed' })
    } else {
      res.status(404)
      throw new Error('vCategories not found')
    }
  }

  export {
    getVCategories,
    getVCategoriesById,
    deleteVCategories,
    createVCategories,
    updateVCategories
  }