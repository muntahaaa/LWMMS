const userModel = require("../../db/models/usermodel")

async function updateUser(req,res){
    try{
        const sessionUser = req.userId

        const { userId , email, name, role} = req.body

        const payload = {
            ...( email && { email : email}),
            ...( name && { name : name}),
            ...( role && { role : role}),
        }

        const user = await userModel.findByPk(sessionUser)

        console.log("user.role",user.role)



        const updateUser = await userModel.findByPkAndUpdate(userId,payload)

        
        res.json({
            data : updateUser,
            message : "User Updated",
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = updateUser