const Contributor = require('../../db/models/contributor');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const createContributor = catchAsync(async(req , res ) => {
    const {contributorName, email, phone, description} =req.body;

    if(!contributorName){
        return res.status(400).json({error: 'Contributor name must be provided'});
    }
    try{
        const newContributor = await Contributor.create({
            contributorName,
            email,
            phone,
            description
        }); 
        return res.status(201).json(newContributor);

    }catch(err){
      console.error('Error adding contributor', err);
      return res.status(500).json({ error: 'Failed to add contributor ' });
    }
});

const getContributorDetails = catchAsync(async (req, res, next) => {
    const { contributorName, phone, } = req.query;
   
  
   
    if (!contributorName && !phone) {
      return next(new AppError('Either contributor name or phone must be provided', 400));
    }
  
 
    
    const contributor = await Contributor.findOne({
        where: {
             
             contributorName: contributorName || null,
             phone: phone || null ,      
        },
        include: [
          {
            model: ContributionDetails, // Related model
            attributes: ['email', 'description','contributorName','phone'], // Specify fields to include
          },
        ],
      });

    
  
  
    if (!contributor) {
      return next(new AppError('No contributor found with the provided details', 404));
    }
  
  
    res.status(200).json({
      status: 'success',
      data: contributor,
    });
  });
  
  const getAllContributors = catchAsync(async (req, res, next) => {
    const contributors = await Contributor.findAll();
  
    if (!contributors) {
      return next(new AppError('No contributors found', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        contributors
      }
    });
  });
  
  

module.exports= { createContributor, getContributorDetails, getAllContributors};