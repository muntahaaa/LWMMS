const express = require('express');
const Contributor = require('../../db/models/contributor');
const Item = require('../../db/models/item');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bodyParser = require('body-parser');
const { Op } = require('sequelize');


const createItem = catchAsync(async(req,res,next)=>{
    const { contributor, itemDetails} = req.body;
    const createdBy = req.user.id;
    console.log('Contributor:', contributor);
    console.log('Request Body:', req.body);


    if (!contributor || !contributor.contributorName || !contributor.phone) {
        return next(new AppError('Contributor name and phone number is required', 400));
      }

    let existingContributor = await Contributor.findOne({
        where:{
            contributorName: contributor.contributorName,
          
            phone: contributor.phone,
          
        },
    });

    if(!existingContributor){
        existingContributor = await Contributor.create(contributor);
    }
    const newItem = await Item.create({
        ...itemDetails,
        contributorID: existingContributor.id, // Associate the contributor ID
        createdBy,
      });
      res.status(201).json({
        status: 'success in creating item',
        data: newItem,
      });
});

const getAllItems = catchAsync(async (req, res, next) => {
    const items = await Item.findAll({
      include: [
        {
          model: Contributor,
          attributes: ['contributorName','phone'], 
        },
    ],
    });
  
    res.status(200).json({
      status: 'success',
      results: items.length,
      data: items,
    });
  });
  
  const getAllByCategory = catchAsync(async (req, res, next) => {
    const { category } = req.query;
  

    if (!category) {
      return next(new AppError('Category is required', 400));
    }
  
   
    const categoryArray = Array.isArray(category) ? category : [category];
  
   
    const items = await Item.findAll({
      where: {
        category: {
          [Op.contains]: categoryArray, 
        },
      },
    });
  
    if (!items.length) {
      return next(new AppError('No items found for the specified category', 404));
    }
  
    res.status(200).json({
      status: 'success',
      results: items.length,
      data: items,
    });
  });

  const getAllByTag = catchAsync(async (req, res, next) => {
    const { tag } = req.query;
  
  
    if (!tag) {
      return next(new AppError('Tag is required', 400));
    }
  
  
    const tagsArray = Array.isArray(tag) ? tag : [tag];
  
   
    const items = await Item.findAll({
      where: {
        tags: {
          [Op.contains]: tagsArray,
        },
      },
    });
  
   
    if (!items || items.length === 0) {
      return next(new AppError('No items found for the specified tag(s)', 404));
    }
  
  
    res.status(200).json({
      status: 'success',
      results: items.length,
      data: items,
    });
  });

  const getItemById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
  
    if (!id) {
      return next(new AppError('Item ID is required', 400));
    }
  
   
    const item = await Item.findByPk(id);
  
   
    if (!item) {
      return next(new AppError('No item found with the specified ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: item,
    });
  });

  const updateItem = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;
  

    if (!id) {
      return next(new AppError('Item ID is required', 400));
    }
  
  
    const item = await Item.findByPk(id);
  
 
    if (!item) {
      return next(new AppError('No item found with the specified ID', 404));
    }
  
    
    await item.update(updates);
  
    res.status(200).json({
      status: 'success',
      data: item,
    });
  });
  
  const deleteItem = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
   
    if (!id) {
      return next(new AppError('Item ID is required', 400));
    }
  

    const item = await Item.findByPk(id);
  

    if (!item) {
      return next(new AppError('No item found with the specified ID', 404));
    }
  

    await item.destroy();
  
    res.status(204).json({
      status: 'success',
      data: null, 
    });
  });

 
  const getItemsByContributor = catchAsync(async (req, res, next) => {
    const { contributorName, phone } = req.query;
  
   
    if (!contributorName && !phone) {
      return next(
        new AppError('Either contributorName or phone number must be provided', 400)
      );
    }
  
  
    const contributor = await Contributor.findOne({
      where: {
           
           contributorName: contributorName || null,
           phone: phone || null ,
           
        
      },
    });
  
  
    if (!contributor) {
      return next(
        new AppError('No contributor found with the provided details', 404)
      );
    }
  
  
    const items = await Item.findAll({
      where: { contributorID: contributor.id },
    });
  
  
    res.status(200).json({
      status: 'success',
      data: items,
    });
  });

  module.exports = { createItem, getAllItems, getAllByCategory,
    getAllByTag, getItemById, updateItem, deleteItem,
   getItemsByContributor };