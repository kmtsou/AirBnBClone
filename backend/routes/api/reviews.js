const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const { User, Review, Booking, Spot, Image, sequelize } = require('../../db/models');

router.get('/current', requireAuth, async (req, res) => {
    const currentReviews = await Review.findAll({
        where: { ownerId: req.user.id },
        include: [
            {
                model: Spot,
                attributes: {exclude: ['createdAt', 'updatedAt']}
            },
            {
                model: Image,
                attributes: {exclude: ['createdAt', 'updatedAt']}
            }
        ]
    });
    return res.json(currentReviews);
});



module.exports = router;
