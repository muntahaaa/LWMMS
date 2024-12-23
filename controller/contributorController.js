const Contributor = require('../db/models/contributor');
const createContributor = async(req , res ) => {
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
}

module.exports= { createContributor};