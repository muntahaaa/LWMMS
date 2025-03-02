const userModel = require("../models/userModel")

const uploadProductPermission = async(userId) => {
    const user = await userModel.findByPk(userId)

    if(user.role === 'ADMIN'){
        return true
    }

    return false
}


module.exports = uploadProductPermission