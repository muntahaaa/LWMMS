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
    
    const { contributor, itemDetails, categories, tags, displayStatus } = req.body;
    if (!req.user) {
        return next(new AppError('Not authorized', 401));
      }

     const createdBy = req.user.id;
    //const createdBy = 1;

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

    console.log(req.contributorID);

    const newItemDetails = {
        ...itemDetails,
        category: Array.isArray(itemDetails.category) ? itemDetails.category : [],
        tags: Array.isArray(itemDetails.tags) ? itemDetails.tags : [],
        displayStatus: displayStatus,
    };
   
    const mediaLocation = req.files ? req.files.map(file => file.path) : [];
  

    const newItem = await Item.create({
        ...newItemDetails,
        contributorID: existingContributor.id,
        createdBy,
        mediaLocation,
        displayStatus: displayStatus,
    });
    console.log("new item created");


    if (categories && categories.length > 0) {
        for (const categoryName of categories) {
            let category = await Category.findOne({ where: { name: categoryName } });
            if (!category) {
                category = await Category.create({ name: categoryName });
            }
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
    if (!req.user) {
        return next(new AppError('Not authorized', 401));
      }
    
    const items = await Item.findAll({
        include: [
            {
                model: Contributor,
                attributes: ['contributorName', 'phone', 'email', 'description'], // Include contributor details
            },
            {
                model: Tag,
                through: { attributes: [] }, // Avoid returning join table data for tags
                attributes: ['id', 'name'], // Only include necessary tag fields
            },
            {
                model: Category,
                through: { attributes: [] }, // Avoid returning join table data for categories
                attributes: ['id', 'name'], // Only include necessary category fields
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

        // Fetch all items that belong to this category
        const items = await Item.findAll({
            include: [
                {
                    model: Category,
                    where: { id: category.id }, // Filter by category ID
                    through: { attributes: [] }, // Avoid returning join table data
                    attributes: ['id', 'name'], // Only include necessary category fields
                },
                {
                    model: Contributor,
                    attributes: ['contributorName', 'phone', 'email', 'description'], // Include contributor details
                },
                {
                    model: Tag,
                    through: { attributes: [] }, // Avoid returning join table data for tags
                    attributes: ['id', 'name'], // Only include necessary tag fields
                },
            ],
        });

        // Check if items exist for this category
        if (!items.length) {
            return res.status(404).json({ message: 'No items found for this category' });
        }

        // Return the list of items
        return res.status(200).json({
            status: 'success',
            results: items.length,
            data: items,
        });
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
                    model: Contributor,
                    attributes: ['contributorName', 'phone', 'email', 'description'], // Include contributor details
                },
                {
                    model: Tag,
                    through: { attributes: [] }, // Avoid returning join table data for tags
                    attributes: ['id', 'name'], // Only include necessary tag fields
                },
                {
                    model: Category,
                    through: { attributes: [] }, // Avoid returning join table data for categories
                    attributes: ['id', 'name'], // Only include necessary category fields
                },
            ],
        });

        if (!items.length) {
            return res.status(404).json({ message: 'No items found for this tag' });
        }

        // Step 4: Return the items as the response
        return res.status(200).json({
            status: 'success',
            results: items.length,
            data: items,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getItemById = async (req, res) => {
    try {
        // Extract the id from the request parameters
        const { id } = req.params;

        // Check if the id is provided
        if (!id) {
            return res.status(400).json({ message: 'Item ID is required' });
        }

        // Fetch the item by ID
        const item = await Item.findOne({
            where: { id },
            include: [
                {
                    model: Category,
                    through: { attributes: [] }, // Avoid returning join table data
                    attributes: ['id', 'name'], // Only include necessary category fields
                },
                {
                    model: Contributor,
                    attributes: ['contributorName', 'phone', 'email', 'description'], // Include contributor details
                },
                {
                    model: Tag,
                    through: { attributes: [] }, // Avoid returning join table data
                    attributes: ['id', 'name'], // Only include necessary tag fields
                },
            ],
        });

        // Check if the item is found
        if (!item) {
            return res.status(404).json({ message: 'Item not found with the given ID' });
        }

        // Return the item data
        return res.status(200).json({
            status: 'success',
            data: item,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const getItemsByTitle = async (req, res) => {
    try {
        // Extract the title from the request query
        const title = req.query.title;

        // Check if the title is provided
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        // Fetch items that match the provided title
        const items = await Item.findAll({
            where: { title: { [Op.like]: `%${title}%` } }, // Use LIKE for partial matches
            include: [
                {
                    model: Category,
                    through: { attributes: [] }, // Avoid returning join table data
                    attributes: ['id', 'name'], // Only include necessary category fields
                },
                {
                    model: Contributor,
                    attributes: ['contributorName', 'phone'], // Include contributor details
                },
                {
                    model: Tag,
                    through: { attributes: [] }, // Avoid returning join table data
                    attributes: ['id', 'name'], // Only include necessary tag fields
                },
            ],
        });

        // Check if items are found
        if (!items.length) {
            return res.status(404).json({ message: 'No items found with the given title' });
        }

        // Return the list of items
        return res.status(200).json({
            status: 'success',
            results: items.length,
            data: items,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};



const getItemByContributorName = async (req, res) => {
    try {
        // Extract the contributor's name from the request query
        const contributorName = req.query.contributorName;

        // Check if the contributor name is provided
        if (!contributorName) {
            return res.status(400).json({ message: 'Contributor name is required' });
        }

        // Find the contributor by name
        const contributor = await Contributor.findOne({
            where: { contributorName: { [Op.like]: `%${contributorName}%` } }, // Use LIKE for partial matches
        });

        // Check if the contributor exists
        if (!contributor) {
            return res.status(404).json({ message: 'Contributor not found' });
        }

        // Fetch all items associated with the contributor's ID
        const items = await Item.findAll({
            where: { contributorID: contributor.id },
            include: [
                {
                    model: Category,
                    through: { attributes: [] }, // Avoid returning join table data
                    attributes: ['id', 'name'], // Only include necessary category fields
                },
                {
                    model: Contributor,
                    attributes: ['id', 'contributorName', 'phone'], // Include contributor details
                },
                {
                    model: Tag,
                    through: { attributes: [] }, // Avoid returning join table data
                    attributes: ['id', 'name'], // Only include necessary tag fields
                },
            ],
        });

        // Check if items are found
        if (!items.length) {
            return res.status(404).json({ message: 'No items found for this contributor' });
        }

        // Return the list of items
        return res.status(200).json({
            status: 'success',
            results: items.length,
            data: items,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};




const updateItem = catchAsync(async (req, res, next) => { 
    const { contributor, itemDetails, categories, tags } = req.body;
    const itemId = req.params.id;

    if (!itemId) {
        return next(new AppError('Item ID is required for update', 400));
    }

    // Fetch the item
    const item = await Item.findByPk(itemId);
    if (!item) {
        return next(new AppError('Item not found', 404));
    }

    // Handle contributor update or creation
    let updatedContributor;
    if (contributor?.contributorName && contributor?.phone) {
        updatedContributor = await Contributor.findOne({
            where: {
                contributorName: contributor.contributorName,
                phone: contributor.phone,
            },
        });

        if (!updatedContributor) {
            updatedContributor = await Contributor.create(contributor);
        } else {
            await updatedContributor.update(contributor); // Update existing contributor
        }
    } else {
        return next(new AppError('Contributor name and phone are required', 400));
    }

    // Update item details
    const updatedDetails = {
        ...itemDetails,
        contributorID: updatedContributor.id,
        mediaLocation: req.file ? req.file.path : item.mediaLocation, // Only update if file exists
        displayStatus: itemDetails?.displayStatus || item.displayStatus, // Handle display status
    };

    await item.update(updatedDetails);

    // Update categories (optimize to avoid redundancy)
    if (categories && Array.isArray(categories)) {
        await ItemCategories.destroy({ where: { itemId } });

        const uniqueCategories = [...new Set(categories)]; // Remove duplicates
        for (const categoryName of uniqueCategories) {
            const [category] = await Category.findOrCreate({ where: { name: categoryName } });
            await ItemCategories.create({ itemId, categoryId: category.id });
        }
    }

    // Update tags (optimize to avoid redundancy)
    if (tags && Array.isArray(tags)) {
        await ItemTags.destroy({ where: { itemId } });

        const uniqueTags = [...new Set(tags)]; // Remove duplicates
        for (const tagName of uniqueTags) {
            const [tag] = await Tag.findOrCreate({ where: { name: tagName } });
            await ItemTags.create({ itemId, tagId: tag.id });
        }
    }

    res.status(200).json({
        status: 'success',
        message: 'Item updated successfully',
        data: {
            item,
            displayStatus: updatedDetails.displayStatus,  // Include the display status in the response
        },
    });
});



const deleteItem = catchAsync(async (req, res, next) => {
    const { id } = req.params;

   
    if (!id) {
        return next(new AppError('Item ID is required for deletion', 400));
    }

  
    const item = await Item.findOne({
        where: { id },
        include: [
            { model: Contributor, attributes: ['id', 'contributorName', 'phone'] },
            { model: Category, through: { attributes: [] } },
            { model: Tag, through: { attributes: [] } },
        ],
    });

    if (!item) {
        return next(new AppError('Item not found', 404));
    }

    // Handle Junction Table Entries (ItemCategories and ItemTags)
    if (item.Categories && item.Categories.length > 0) {
        for (const category of item.Categories) {
            await ItemCategories.destroy({ where: { itemId: item.id, categoryId: category.id } });
        }
    }

    if (item.Tags && item.Tags.length > 0) {
        for (const tag of item.Tags) {
            await ItemTags.destroy({ where: { itemId: item.id, tagId: tag.id } });
        }
    }

   
    // Only soft-delete the contributor if this is their last associated item
    const itemCountForContributor = await Item.count({
        where: { contributorID: item.contributorID },
    });

    if (itemCountForContributor === 1) {
        const contributor = await Contributor.findOne({ where: { id: item.contributorID } });
        if (contributor) {
            //await contributor.destroy();
            //message "update or delete on table \"Contributors\" violates foreign key constraint \"Items_contributorID_fkey\" on table \"Items\""
        }
    }

    // Step 5: Soft Delete the Item
    await item.destroy();

  
    res.status(200).json({
        status: 'success',
        message: 'Item and related records successfully soft deleted',
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
    getItemsByContributor, getItemsByTitle, getItemByContributorName
};