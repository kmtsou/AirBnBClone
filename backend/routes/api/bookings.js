const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const { User, Review, Booking, Spot, Image, sequelize } = require('../../db/models');

router.get('/current', requireAuth, async (req, res) => {
    // const currentBookings = await Booking.findAll({
    //     where: {userId: req.user.id},
    //     include: [
    //         {model: Spot, attributes: {exclude: ['createdAt', 'updatedAt']}, include: [{model: Image, attributes: ['url', 'previewImage']}]}
    //     ],
    //     raw: true
    // });
    const currentBookings = await Booking.findAll({
        where: { userId: req.user.id },
        raw: true
    });

    for (let i = 0; i < currentBookings.length; i++) {
        const booking = currentBookings[i];
        const spot = await Spot.findOne({
            where: { id: booking.spotId },
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            },
            raw: true
        });
        const spotImgs = await Image.findAll({
            where: { spotId: spot.id },
            raw: true
        })
        spotImgs.forEach(image => {
            if (image.previewImage === true || image.previewImage === 1) {
                spot.previewImage = image.url
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = null
        }
        booking.Spot = spot
    }

    return res.json(currentBookings);
});

const validateBooking = [
    check('endDate')
        .exists({ checkFalsy: true })
        .isAfter(this.startDate)
        .withMessage("endDate cannot be on or before startDate"),
    handleValidationErrors
];

router.put('/:bookingId', requireAuth, validateBooking, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    if (!booking) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        });
    };
    if (booking.userId !== req.user.id) {
        const err = new Error('Forbidden');
        err.title = 'Unauthorized user';
        err.errors = ['Forbidden'];
        err.status = 403;
        return next(err);
    }
    const today = new Date();
    if (booking.endDate < today) {
        res.status(403);
        return res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        });
    };

    const { startDate, endDate } = req.body;
    booking.startDate = startDate;
    booking.endDate = endDate;
    await booking.save();
    return res.json(booking);
});

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    if (!booking) {
        res.status(404);
        return res.json({
            error: "Booking couldn't be found",
            message: "Booking couldn't be found",
            statusCode: 404
        });
    };
    const today = new Date();
    if (booking.startDate < today) {
        res.status(403);
        return res.json({
            error: "Bookings that have been started can't be deleted",
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        });
    };

    const spotOwner = await Booking.findByPk(req.params.bookingId, {
        include: { model: Spot }
    });
    if (booking.userId !== req.user.id && spotOwner.Spot.ownerId !== req.user.id) {
        const err = new Error('Forbidden');
        err.title = 'Unauthorized user';
        err.errors = ['Forbidden'];
        err.status = 403;
        return next(err);
    }

    await booking.destroy();
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
});


module.exports = router;
