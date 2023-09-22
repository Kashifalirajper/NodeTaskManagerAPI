const User = require('../models/user');

const authorize = async (req, res, next) => {
    try {
        const user = await User.findById(req.user);  // req.user was set in the authentication middleware

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        if (user._id !== req.user) {  // Simple check; can be extended for roles, permissions, etc.
            return res.status(403).send({ error: 'Not authorized' });
        }

        next();
    } catch (error) {
        res.status(500).send({ error: 'Authorization failed' });
    }
};

module.exports = authorize;
