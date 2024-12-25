const express = require('express');
const {createContributor, getContributorDetails} = require('../../src/controller/contributorController');
const {protect} = require('../../middleware/authMiddleware');
const cors = require('cors');
const bodyParser = require('body-parser');

const ContributorRouter = express.Router();
ContributorRouter.use(cors());
ContributorRouter.use(bodyParser.json());

// Define routes for contributors
ContributorRouter.get('/contributor-detail',protect,getContributorDetails);
//router.get('/:id', contributorController.getContributorById);
ContributorRouter.post('/add', protect,createContributor);
//router.put('/:id', contributorController.updateContributor);
//router.delete('/:id', contributorController.deleteContributor);

module.exports = ContributorRouter;