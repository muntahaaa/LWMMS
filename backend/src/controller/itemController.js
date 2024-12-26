const express = require('express');
const multer = require('multer');
const path = require('path');
const Contributor = require('../../db/models/contributor');
const Item = require('../../db/models/item');
const Tag = require('../../db/models/tag');
const Category = require('../../db/models/category');
const ItemCategories = require('../../db/models/item_category');
const ItemTags = require('../../db/models/item_tags');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bodyParser = require('body-parser');
const sequelize = require('../../config/database'); 
const { Op } = require('sequelize');




const createItem = catchAsync(async (req, res, next) => {
    const { contributor, itemDetails, categories, tags } = req.body;

    //const createdBy = req.user.id;
    const createdBy=1;



    if (!contributor || !contributor.contributorName || !contributor.phone) {
        return next(new AppError('Contributor name and phone number is required', 400));
    }

    let existingContributor = await Contributor.findOne({
        where: {
            contributorName: contributor.contributorName,
            phone: contributor.phone,
        },
    });

    if (!existingContributor) {
        existingContributor = await Contributor.create(contributor);
    }
    req.contributorID = existingContributor.id;
    const newItemDetails = {
        ...itemDetails,
        category: Array.isArray(itemDetails.category) ? itemDetails.category : [],
        tags: Array.isArray(itemDetails.tags) ? itemDetails.tags : [],
    };

    const mediaLocation = req.file ? req.file.path : null;
    
    const newItem = await Item.create({
        ...newItemDetails,
        contributorID: existingContributor.id,
        createdBy,
        mediaLocation
    });
    if (categories && categories.length > 0) {
        for (const categoryName of categories) {
          let category = await Category.findOne({ where: { name: categoryName } });
          if (!category) {
            category = await Category.create({ name: categoryName });
          }
          // Insert into ItemCategories junction table manually
          await ItemCategories.create({
            itemId: newItem.id,
            categoryId: category.id,
          });
        }
      }

      if (tags && tags.length > 0) {
        for (const tagName of tags) {
          let tag = await Tag.findOne({ where: { name: tagName } });
          if (!tag) {
            tag = await Tag.create({ name: tagName });
          }
          // Insert into ItemTags junction table manually
          await ItemTags.create({
            itemId: newItem.id,
            tagId: tag.id,
          });
        }
      }

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
                attributes: ['contributorName', 'phone'],
            },
        ],
    });

    res.status(200).json({
        status: 'success',
        results: items.length,
        data: items,
    });
});

const getAllByCategory = async (req, res) => {
    try {
      // Extract category name from the request parameters
      const categoryName = req.query.categoryName;
  
      // Check if categoryName is provided
      if (!categoryName) {
        return res.status(400).json({ message: 'Category name is required' });
      }
  
      // Find the category by name
      const category = await Category.findOne({ where: { name: categoryName } });
  
      // Check if the category exists
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Fetch all item-category associations for this category
      const itemCategories = await ItemCategories.findAll({
        where: { categoryId: category.id },
        attributes: ['itemId'],
      });
  
      // Check if there are associated items
      if (!itemCategories.length) {
        return res.status(404).json({ message: 'No items found for this category' });
      }
  
      // Extract item IDs from the associations
      const itemIds = itemCategories.map((itemCategory) => itemCategory.itemId);
  
      // Fetch all items with the retrieved item IDs
      const items = await Item.findAll({
        where: { id: { [Op.in]: itemIds } },
      });
  
      // Return the list of items
      return res.status(200).json(items);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

const getAllByTag = async (req, res) => {
    try {
        const tagName = req.query.tagName;
        // Get tag name from the request params
  
      // Step 1: Find the tag ID by the tag name
      const tag = await Tag.findOne({ where: { name: tagName } });
  
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
  
      // Step 2: Find all item IDs associated with the tag ID
      const itemTags = await ItemTags.findAll({
        where: { tagId: tag.id },
        attributes: ['itemId'],
      });
  
      if (!itemTags.length) {
        return res.status(404).json({ message: 'No items found for this tag' });
      }
  
      const itemIds = itemTags.map((itemTag) => itemTag.itemId);
  
      // Step 3: Fetch all items by the item IDs
      const items = await Item.findAll({
        where: {
          id: {
            [Op.in]: itemIds,
          },
        },
        include: [
          {
            model: Tag,
            through: { attributes: [] }, // Avoid returning ItemTags join table data
          },
        ],
      });
  
      if (!items.length) {
        return res.status(404).json({ message: 'No items found for this tag' });
      }
  
      // Step 4: Return the items as the response
      return res.status(200).json(items);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  

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
            phone: phone || null,


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

module.exports = {
    createItem, getAllItems, getAllByCategory,
    getAllByTag, getItemById, updateItem, deleteItem,
    getItemsByContributor
};
