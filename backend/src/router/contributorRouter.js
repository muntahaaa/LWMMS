const express = require('express');
const {createContributor} = require('../../src/controller/contributorController');

const ContributorRouter = express.Router();

// Define routes for contributors
//router.get('/', contributorController.getAllContributors);
//router.get('/:id', contributorController.getContributorById);
ContributorRouter.post('/add', createContributor);
//router.put('/:id', contributorController.updateContributor);
//router.delete('/:id', contributorController.deleteContributor);

module.exports = ContributorRouter;