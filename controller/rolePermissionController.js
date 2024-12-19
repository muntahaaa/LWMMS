const  Role = require('../db/models/role'); 
const Permission = require('../db/models/permission');
const RolePermission= require ('../db/models/rolepermission');
const createRole = async (req, res) => {
    const { roleName, isActive } = req.body;

    if (!roleName || isActive === undefined) {
        return res.status(400).json({ error: 'roleName and isActive are required' });
    }

    try {
        const newRole = await Role.create({
            roleName,
            isActive
        });

        return res.status(201).json(newRole);
    } catch (error) {
        console.error('Error adding role:', error);
        return res.status(500).json({ error: 'Failed to add role ' });
    }
};

const createPermission = async (req, res) => {
    const { permissionName, isActive } = req.body;

    if (!permissionName || isActive === undefined) {
        return res.status(400).json({ error: 'permissionName and isActive are required' });
    }

    try {
        const newPermission = await Permission.create({
            permissionName,
            isActive
        });

        return res.status(201).json(newPermission);
    } catch (error) {
        console.error('Error adding role:', error);
        return res.status(500).json({ error: 'Failed to add permission ' });
    }
};
const viewRoles = async (req, res) => {
    try {
        const roleList = await Role.findAll();
        return res.status(200).json(roleList);
    } catch (error) {
        console.error('Error fetching roles:', error);
        return res.status(500).json({ error: 'Failed to fetch roles', details: error.message });
    }
};
const viewPermissions = async (req, res) => {
    try {
        const permissionList = await Permission.findAll();
        return res.status(200).json(permissionList);
    } catch (error) {
        console.error('Error fetching permissions:', error);
        return res.status(500).json({ error: 'Failed to fetch permissions', details: error.message });
    }
};

  const setUpAssociation = async (req, res) =>{
    

    try{
        const { roleName, permissionName } = req.body;
  
        // Find the Role and Permission based on req.body
        const role = await Role.findOne({ where: { roleName } });
        const permission = await Permission.findOne({ where: { permissionName } });

        if(!role || !permission){
            return res.status(404).json({error: 'Role or Permission not found'});
        }
        console.log(`Role id = ${role.id} Permission id = ${permission.id}`);
        await RolePermission.create({
            roleID: role.id,
            permissionID: permission.id
          });
      

    return res.status(200).json({
            message: `Permission "${permission.permissionName}" added to Role "${role.roleName}" successfully`,
          });
    }catch(error){
        console.error('Error assigning role permission:', error);
        return res.status(500).json({error: 'Failed to assign role permission', details: error.message});
    }
  }

module.exports = {
    createRole, createPermission,  viewRoles,
    viewPermissions,setUpAssociation
  
};