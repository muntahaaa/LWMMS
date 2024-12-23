const User = require('../db/models/user');
const Role = require('../db/models/role');
const AppError = require('../utils/appError');
require('dotenv').config({ path: `${process.cwd()}/.env` });
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
 };
 
const signUp = async (req, res) => {
 
  const {Name, Email,Password,roleName } = req.body;
  
  try{
   const role = await Role.findOne({where: {roleName}});
   if(!role){
    return res.status(404).json({ error: 'Role not found' });
   }

   const newUser = await User.create({
    Name,
    Email,
    Password,
    RoleID: role.id
   });

   const result= newUser.toJSON();
    delete result.Password;
    delete result.deletedAt;
   res.status(201).json({ newUser }); 
  }catch (error) {
    res.status(400).json({ error: error.message });
  }
  
};

const login = async(req, res, next) =>{
  const {Email, Password}= req.body; 
  if(!Email || !Password){
    return res.status(400).json({ error: 'Email and password are required' });
    //throw new Error('Email and password are required', 400);
 }
 const result = await User.findOne({where: {Email}});
 if(!result || !(await bcrypt.compare(Password, result.Password))){

  return res.status(401).json({ error: 'User not found. Check your email and password' });
  //throw new Error('User not found. Check your email and password', 401);
  }
  const token= generateToken({
    id: result.id,
    
});

return res.status(200).json({
  status: 'success',
  message: 'User logged in successfully',
  data: {token}
});

}

module.exports = { signUp, login };