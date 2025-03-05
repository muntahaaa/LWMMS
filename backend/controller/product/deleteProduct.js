const uploadProductPermission = require("../../helpers/permission");
const express = require('express');
const router = express.Router();
const { Product } =require ("../../models");

const deleteProductController = async(req, res) =>{
    const hasPermission = await uploadProductPermission(req.userId);
    if (!hasPermission) {
      throw new Error("Permission denied");
    }
    const productId= req.params.id;
    if (!req.params.id) {
        return res.status(400).json({ success: false, message: "Missing Artifact ID" });


    }
    try{
        const product = await Product.findByPk(productId)
        if(!product){
            return res.status(404).json({ success: false, message: 'Artifact not found' }); 
        }
        await product.destroy();
        return res.status(200).json({ success: true, message: 'Artifact deleted successfully' });
    }catch (error) {
        console.error('Error deleting artifact:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while deleting the artifact' });
    }
}
module.exports= deleteProductController