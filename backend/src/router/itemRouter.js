const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemController = require('../controller/itemController');
const { protect } = require('../../middleware/authMiddleware');
const checkPermissions= require('../../middleware/checkPermission');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const itemRouter = express.Router();
itemRouter.use(bodyParser.json());
itemRouter.use(cors());

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const contributorName = req.body.contributor?.contributorName?.replace(/\s+/g, '_') || 'Unknown';
      const collectionNo = req.body.itemDetails?.collectionNo?.replace(/\s+/g, '_') || 'Unknown-CollectionNo';
      const uploadPath = `item-media-uploads/${collectionNo}.${contributorName}/`;

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const accessionNo = req.body.itemDetails?.accessionNo?.replace(/\s+/g, '_') || 'Unknown-AccessionNo';
      const mediaNumber = req.fileCounter || 0; 
      req.fileCounter = mediaNumber + 1;
      cb(null, `${accessionNo}-${req.fileCounter}${path.extname(file.originalname)}`);
    },
  }),
});

const uploadMultiple = upload.array('mediaAttachments', 20); 

itemRouter.get('/by-contributor',protect,itemController.getItemsByContributor);


itemRouter.post('/add', protect,uploadMultiple, itemController.createItem);

itemRouter.get('/get-all', protect,itemController.getAllItems);
itemRouter.get('/get-all-by-category',protect, itemController.getAllByCategory);
itemRouter.get('/get-all-by-tag', protect,itemController.getAllByTag);
itemRouter.get('/get-by-title', protect,itemController.getItemsByTitle);
itemRouter.get('/get-by-contributorName',protect, itemController.getItemByContributorName);
itemRouter.get('/:id', protect,itemController.getItemById);
//update
itemRouter.put('/update/:id', 
  
  protect,
  uploadMultiple, itemController.updateItem);


//delete
// itemRouter.delete('/delete/:id',
//   protect, 
//   checkPermissions('delete'), 
//   itemController.deleteItem);
  itemRouter.delete('/delete/:id',
  protect,itemController.deleteItem);


module.exports = itemRouter;