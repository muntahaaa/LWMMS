const express = require('express');
const itemController = require('../controller/itemController');
const {protect} = require('../../middleware/authMiddleware')

const itemRouter = express.Router();

itemRouter.get('/by-contributor',protect,itemController.getItemsByContributor);
itemRouter.post('/add',protect,itemController.createItem);
itemRouter.get('/get-all',protect,itemController.getAllItems);
itemRouter.get('/get-all-by-category',protect,itemController.getAllByCategory);
itemRouter.get('/get-all-by-tag',protect,itemController.getAllByTag);
itemRouter.get('/get-all-by-id/:id',protect, itemController.getItemById);
//update
itemRouter.patch('/update/:id', protect,itemController.updateItem);
//delete
itemRouter.delete('/delete/:id',protect,itemController.deleteItem);

module.exports= itemRouter;
