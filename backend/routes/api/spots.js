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
                attributes: ['id', 'url']
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
]

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


module.exports = router;
