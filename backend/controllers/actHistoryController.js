import actHistories from '../models/actHistoriesModel';

const getActHistories = async(req, res) => {
    const p = await actHistories.find({});
    res.json(p);
}

const getActHistoriesById = async(req, res) => {
    const p = await actHistories.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('actHistories not found ')
    }
}
const createActHistories = async (req, res, next) => {
    let {studentId, aPoint, aDate, aDone, desc, report } = req.body;
    const actHistories = new actHistories({ student:studentId, aPoint, aDate, aDone, desc, report});
    const postActHistories = await actHistories.save()
    res.status(201).json(postActHistories)
}

const updateActHistories = async(req, res) => {
    let {studentId, aPoint, aDate, aDone, desc, report } = req.body;
    const actHistories = await actHistories.findById(req.params.id)
    if(actHistories){
        actHistories.student = studentId
        actHistories.aPoint = aPoint;
        actHistories.aDate = aDate;
        actHistories.aDone = aDone;
        actHistories.desc = desc;
        actHistories.report = report;
        
        const postActHistories = await actHistories.save();
        res.json(postActHistories);
    }
    else {
        res.status(404)
        throw new Error('actHistories not found !')
    }
}

const deleteActHistories = async (req, res) => {
    const actHistories = await actHistories.findById(req.params.id)
    if (actHistories) {
      await actHistories.remove()
      res.json({ message: 'actHistories removed' })
    } else {
      res.status(404)
      throw new Error('actHistories not found')
    }
  }

  export {
    getActHistories,
    getActHistoriesById,
    deleteActHistories,
    createActHistories,
    updateActHistories
  }