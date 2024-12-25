const  Role = require('../../db/models/role'); 
const Permission = require('../../db/models/permission');
const RolePermission= require ('../../db/models/rolepermission');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync')

const createRole = catchAsync(async (req, res) => {
    const { roleName, isActive } = req.body;

    if (!roleName || isActive === undefined) {
      
        throw new AppError('roleName and Active status are required',400);
    }

    try {
        const newRole = await Role.create({
            roleName,
            isActive
        });

        return res.status(201).json(newRole);
    } catch (error) {
        console.error('Error adding role:', error);
       
        throw new AppError('Failed to add role',500);
        
    }
});

const createPermission = catchAsync(async (req, res) => {
    const { permissionName, isActive } = req.body;

    if (!permissionName || isActive === undefined) {
       
        throw new AppError('permissionName and Active status are required',400);
    }

    try {
        const newPermission = await Permission.create({
            permissionName,
            isActive
        });

        return res.status(201).json(newPermission);
    } catch (error) {
        console.error('Error adding role:', error);
       
        throw new AppError('Failed to add permission',500);
    }
});
const viewRoles =catchAsync (async (req, res) => {
    try {
        const roleList = await Role.findAll();
        return res.status(200).json(roleList);
    } catch (error) {
        console.error('Error fetching roles:', error);
       
        throw new AppError('Failed to fetch roles',500);
    }
});
const viewPermissions = catchAsync(async (req, res) => {
    try {
        const permissionList = await Permission.findAll();
        return res.status(200).json(permissionList);
    } catch (error) {
        console.error('Error fetching permissions:', error);
      
        throw new AppError('Failed to fetch permissions',500);
    }
});

  const setUpAssociation = catchAsync(async (req, res) =>{
    

    try{
        const { roleName, permissionName } = req.body;
  
        // Find the Role and Permission based on req.body
        const role = await Role.findOne({ where: { roleName } });
        const permission = await Permission.findOne({ where: { permissionName } });

        if(!role || !permission){
            
            throw new AppError('Role or Permission not found',404);
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
        //return res.status(500).json({error: '', details: error.message});
        throw new AppError('Failed to assign role permission',500);
    }
  });

module.exports = {
    createRole, createPermission,  viewRoles,
    viewPermissions,setUpAssociation
  
};