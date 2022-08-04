const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const { User, Review, Booking, Spot, Image, sequelize } = require('../../db/models');

router.get('/current', requireAuth, async (req, res) => {
    const currentBookings = await Booking.findAll({
        where: {userId: req.user.id},
        include: {model: Spot, attributes: {exclude: ['createdAt', 'updatedAt']}}
    });
    return res.json(currentBookings);
});


module.exports = router;
