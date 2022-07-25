import Role from '../models/roleModel.js';

const getRoles = async(req, res) => {
    const p = await Role.find({});
    res.json(p);
}

const getRoleById = async(req, res) => {
    const p = await Role.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('Role not found ')
    }
}
const createRole = async (req, res, next) => {
    let { name } = req.body;
    const role = new Role({ name });

    const postRole = await role.save()
    res.status(201).json(postRole)
}

const updateRole = async(req, res) => {
    let { name } = req.body;

    const role = await Role.findById(req.params.id)
    if(role){
        role.name = name;
        const postRole = await role.save();
        res.json(postRole);
    }
    else {
        res.status(404)
        throw new Error('role not found !')
    }
}

const deleteRole = async (req, res) => {
    const role = await Role.findById(req.params.id)
    if (role) {
      await role.remove()
      res.json({ message: 'Role removed' })
    } else {
      res.status(404)
      throw new Error('Role not found')
    }
  }

  export {
    getRoles,
    getRoleById,
    deleteRole,
    createRole,
    updateRole
  }