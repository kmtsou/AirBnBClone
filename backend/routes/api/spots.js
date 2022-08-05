const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const { User, Review, Booking, Spot, Image, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

const validateSearch = [
    check('page')
        .optional()
        .isInt({min: 1, max: 20})
        .withMessage("Page must be greater than or equal to 1"),
    check('size')
        .optional()
        .isInt({min: 1, max: 20})
        .withMessage("Size must be greater than or equal to 1"),
    check('minLat')
        .optional()
        .isDecimal()
        .withMessage("Minimum latitude is invalid"),
    check('maxLat')
        .optional()
        .isDecimal()
        .withMessage("Maximum latitude is invalid"),
    check('minLng')
        .optional()
        .isDecimal()
        .withMessage("Minimum longitude is invalid"),
    check('maxLng')
        .optional()
        .isDecimal()
        .withMessage("Maximum longtude is invalid"),
    check('minPrice')
        .optional()
        .isInt({min: 0})
        .withMessage("Minimum price must be greater than or equal to 0"),
    check('maxPrice')
        .optional()
        .isInt({min: 0})
        .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors
];

router.get('/', validateSearch, async (req, res) => {

    let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;
    if (!page) {page = 1;};
    if (!size) {size = 20};
    page = parseInt(page);
    size = parseInt(size);
    const pagination = {}
    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    };
    let where = {};
    if (minLat) {where.lat = { [Op.gte]: parseInt(minLat) }};
    if (maxLat) {where.lat = { [Op.lte]: parseInt(maxLat) }};
    if (minLng) {where.lng = { [Op.gte]: parseInt(minLng) }};
    if (maxLng) {where.lng = { [Op.lte]: parseInt(maxLng) }};
    if (minPrice) {where.price = { [Op.gte]: parseInt(minPrice) }};
    if (maxPrice) {where.price = { [Op.lte]: parseInt(minPrice) }};

    const allSpots = await Spot.findAll({
        attributes: {
            include: [
                [
                    sequelize.literal(`(
                        SELECT AVG(stars)
                        FROM Reviews
                        WHERE Reviews.spotId = spot.id
                    )`),
                    "avgRating"
                ],
                [
                    sequelize.literal(`(
                        SELECT url
                        FROM Images
                        WHERE Images.spotId = spot.id
                    )`),
                    "previewImage"
                ]
            ]
        },
        where,
        ...pagination
    });

    return res.json(allSpots);
});


router.get('/current', requireAuth, async (req, res) => {
    const currentSpots = await Spot.findAll({
        where: {ownerId: req.user.id},
        attributes: {
            include: [
                [
                    sequelize.literal(`(
                        SELECT AVG(stars)
                        FROM Reviews
                        WHERE Reviews.spotId = spot.id
                    )`),
                    "avgRating"
                ],
                [
                    sequelize.literal(`(
                        SELECT url
                        FROM Images
                        WHERE Images.spotId = spot.id
                    )`),
                    "previewImage"
                ]
            ]
        }
    });

    return res.json(currentSpots);
});


router.get('/:spotId', async (req, res) => {
    const spotById = await Spot.findByPk(req.params.spotId, {
        attributes: {
            include: [
                [
                    sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM Reviews
                        WHERE Reviews.spotId = spot.id
                    )`),
                    "numReviews"
                ],
                [
                    sequelize.literal(`(
                        SELECT AVG(stars)
                        FROM Reviews
                        WHERE Reviews.spotId = spot.id
                    )`),
                    "avgStarRating"
                ]
            ]
        },
        include: [
            {
                model: Image,
                attributes: ['id', 'url', 'spotId']
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    });

    if (!spotById) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };

    return res.json(spotById);
});


const validateSpot = [
    check('address')
        .exists({checkFalsy: true})
        .withMessage('Street address is required'),
    check('city')
        .exists({checkFalsy: true})
        .withMessage("City is required"),
    check('state')
        .exists({checkFalsy: true})
        .withMessage("State is required"),
    check('country')
        .exists({checkFalsy: true})
        .withMessage("Contry is require"),
    check('lat')
        .exists({checkFalsy: true})
        .isDecimal()
        .withMessage("Latitude not valid"),
    check('lng')
        .exists({checkFalsy: true})
        .isDecimal()
        .withMessage("Longgitude is not valid"),
    check('name')
        .exists({checkFalsy: true})
        .isLength({max: 50})
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({checkFalsy: true})
        .withMessage("Description is required"),
    check('price')
        .exists({checkFalsy: true})
        .withMessage("Price per day is required"),
    handleValidationErrors
];

router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = Spot.build({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    await newSpot.save();
    res.status(201);
    return res.json(newSpot);
});


router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    const currentSpot = await Spot.findByPk(req.params.spotId)
    if (!currentSpot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };
    if (currentSpot.ownerId !== req.user.id) {
        const err = new Error('Forbidden');
        err.title = 'Unauthorized user';
        err.errors = ['Forbidden'];
        err.status = 403;
        return next(err);
    }

    const { url, previewImage } = req.body;

    const newImage = Image.build({
        url,
        previewImage,
        userId: req.user.id,
        spotId: req.params.spotId
    });

    await newImage.save();
    const responce = {
        url: url,
        id: newImage.id,
        spotId: req.params.spotId
    }

    return res.json(responce)
});


router.put('/:spotId', requireAuth, validateSpot, async(req, res, next) => {
    const theSpot = await Spot.findByPk(req.params.spotId);
    if (!theSpot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };
    if (theSpot.ownerId !== req.user.id) {
        const err = new Error('Forbidden');
        err.title = 'Unauthorized user';
        err.errors = ['Forbidden'];
        err.status = 403;
        return next(err);
    }

    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    theSpot.address = address;
    theSpot.city = city;
    theSpot.state = state;
    theSpot.country = country;
    theSpot.lat = lat;
    theSpot.lng = lng;
    theSpot.name = name;
    theSpot.description = description;
    theSpot.price = price;
    await theSpot.save();

    return res.json(theSpot);
})


router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };
    if (spot.ownerId !== req.user.id) {
        const err = new Error('Forbidden');
        err.title = 'Unauthorized user';
        err.errors = ['Forbidden'];
        err.status = 403;
        return next(err);
    }

    await spot.destroy();
    return res.json({
        message: 'Successfully deleted',
        statusCode: 200
    });
});


router.get('/:spotId/reviews', async (req, res) => {
    const spotReviews = await Review.findAll({
        where: {spotId: req.params.spotId},
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Image,
                attributes: ['id', 'reviewId', 'url']
            }
        ]
    });
    const spotCheck = await Spot.findByPk(req.params.spotId);
    if (!spotCheck) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }

    res.json(spotReviews);
});

const validateReview = [
    check('review')
        .exists({checkFalsy: true})
        .withMessage("Review text is required"),
    check('stars')
        .exists({checkFalsy: true})
        .isInt({min: 1, max:5})
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {

    const theSpot = await Spot.findByPk(req.params.spotId)
    if (!theSpot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };
    const userReview = await Review.findOne({
        include: {model: Spot},
        where: {userId: req.user.id, spotId: req.params.spotId}
    })
    if (userReview) {
        res.status(403);
        return res.json({
            message: "User already has a review for this spot",
            statusCode: 403
        })
    }

    const { review, stars } = req.body;

    const newReview = Review.build({
        review,
        stars,
        userId: req.user.id,
        spotId: req.params.spotId
    });

    await newReview.save();
    res.status(201);
    return res.json(newReview);
});


router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotCheck = await Spot.findByPk(req.params.spotId);
    if (!spotCheck) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };
    if (spotCheck.ownerId !== req.user.id) {
        const spotBookings = await Booking.findAll({
            where: {spotId: req.params.spotId},
            attributes: ['spotId', 'startDate', 'endDate']
        });
        return res.json(spotBookings);
    }
    else {
        const ownerSpotBookings = await Booking.findAll({
            where: {spotId: req.params.spotId},
            include: {model: User, attributes: ['id', 'firstName', 'lastName']}
        });
        return res.json(ownerSpotBookings);
    };
});

const validateBooking = [
    check('endDate')
        .exists({checkFalsy: true})
        .isAfter(this.startDate)
        .withMessage("endDate cannot be on or before startDate"),
    handleValidationErrors
];

router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };
    if (spot.ownerId === req.user.id) {
        const err = new Error('Spot owner cannot book spot');
        err.title = 'Unauthorized user';
        err.errors = ['Spot owner cannot book spot'];
        err.status = 403;
        return next(err);
    };
    const spotBookings = await Booking.findAll({
        where: {spotId: req.params.spotId}
    });

    const { startDate, endDate } = req.body;
    for (const booking of spotBookings) {
        if (booking.dataValues.startDate <= new Date(startDate) && new Date(endDate) <= booking.dataValues.endDate) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            });
        };
    };

    const newBooking = Booking.build({
        startDate,
        endDate,
        spotId: req.params.spotId,
        userId: req.user.id
    });
    await newBooking.save();
    return res.json(newBooking);
});


module.exports = router;
