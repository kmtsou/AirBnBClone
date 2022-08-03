const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const { User, Review, Booking, Spot, Image, sequelize } = require('../../db/models');

router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        attributes: {
            include: [
                [
                    sequelize.literal(`(
                        SELECT AVG(stars)
                        FROM reviews
                        WHERE reviews.spotId = spot.id
                    )`),
                    "avgRating"
                ],
                [
                    sequelize.literal(`(
                        SELECT url
                        FROM images
                        WHERE images.spotId = spot.id
                    )`),
                    "previewImage"
                ]
            ]
        }
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
                        FROM reviews
                        WHERE reviews.spotId = spot.id
                    )`),
                    "avgRating"
                ],
                [
                    sequelize.literal(`(
                        SELECT url
                        FROM images
                        WHERE images.spotId = spot.id
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
                        FROM reviews
                        WHERE reviews.spotId = spot.id
                    )`),
                    "numReviews"
                ],
                [
                    sequelize.literal(`(
                        SELECT AVG(stars)
                        FROM reviews
                        WHERE reviews.spotId = spot.id
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
    if (currentSpot[0].dataValues.ownerId !== req.user.id) {
        const err = new Error('Unauthorized user');
        err.title = 'Unauthorized user';
        err.errors = ['Unauthorized user'];
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
    return res.json(newImage)
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
    if (theSpot[0].dataValues.ownerId !== req.user.id) {
        const err = new Error('Unauthorized user');
        err.title = 'Unauthorized user';
        err.errors = ['Unauthorized user'];
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
    if (spot[0].dataValues.ownerId !== req.user.id) {
        const err = new Error('Unauthorized user');
        err.title = 'Unauthorized user';
        err.errors = ['Unauthorized user'];
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
    if (!spotReviews) {
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
    const userReview = await Spot.findByPk(req.params.spotId, {
        include: {model: Review, attributes: ['userId']},
        where: {userId: req.user.id}
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
})


module.exports = router;
