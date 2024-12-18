const  Role = require('../db/models/roles'); // Adjust the path as necessary

const createRole = async (req, res) => {
    const { roleName, isActive } = req.body;

    if (!roleName || isActive === undefined) {
        return res.status(400).json({ error: 'roleName and isActive are required' });
    }

    try {
        const newRole = await Role.create({
            roleName,
            isActive
        });

        return res.status(201).json(newRole);
    } catch (error) {
        console.error('Error adding role:', error);
        return res.status(500).json({ error: 'Failed to add role ' });
    }
};

module.exports = {
    createRole
};