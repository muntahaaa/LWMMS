const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemController = require('../controller/itemController');
const {protect} = require('../../middleware/authMiddleware')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const itemRouter = express.Router();
itemRouter.use(bodyParser.json());
itemRouter.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'item-media-uploads/';
    // Check if the directory exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const contributorName = req.body.contributor.contributorName.replace(/\s+/g, '_'); // Replace spaces with underscores
    const title = req.body.itemDetails.title.replace(/\s+/g, '_'); // Replace spaces with underscores
    cb(null, `${contributorName}_${title}${path.extname(file.originalname)}`);
  }
});


const upload = multer({ storage });

itemRouter.get('/by-contributor',protect,itemController.getItemsByContributor);
itemRouter.post('/add',upload.single('mediaAttachment'), itemController.createItem);
itemRouter.get('/get-all',protect,itemController.getAllItems);
itemRouter.get('/get-all-by-category',itemController.getAllByCategory);
itemRouter.get('/get-all-by-tag',protect,itemController.getAllByTag);
itemRouter.get('/get-all-by-id/:id',protect, itemController.getItemById);
//update
itemRouter.patch('/update/:id', protect,itemController.updateItem);
//delete
itemRouter.delete('/delete/:id',protect,itemController.deleteItem);

module.exports= itemRouter;