const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const { User, Review, Booking, Spot, Image, sequelize } = require('../../db/models');

router.get('/current', requireAuth, async (req, res) => {
    const currentBookings = await Booking.findAll({
        where: {userId: req.user.id},
        include: [
            {model: Spot, attributes: {exclude: ['createdAt', 'updatedAt']}},
            {model: Image, attributes: ['url']}
        ]
    });
    return res.json(currentBookings);
});

const validateBooking = [
    check('endDate')
        .exists({checkFalsy: true})
        .isAfter(this.startDate)
        .withMessage("endDate cannot be on or before startDate"),
    handleValidationErrors
];

router.put('/:bookingId', requireAuth, validateBooking, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    if (!booking){
        res.status(404);
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        });
    };
    if (booking.userId !== req.user.id) {
        const err = new Error('Unauthorized user');
        err.title = 'Unauthorized user';
        err.errors = ['Unauthorized user'];
        err.status = 403;
        return next(err);
    }
    // if (booking.endDate < )

    const { startDate, endDate } = req.body;
    booking.startDate = startDate;
    booking.endDate = endDate;
    await booking.save();
    return res.json(booking);
});


module.exports = router;
