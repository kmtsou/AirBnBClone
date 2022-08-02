const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')

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


router.get('/current', async (req, res) => {
    const currentSpots = await Spot.findAll({

    });
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


router.post('/', requireAuth, async (req, res) => {
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

    return res.send(newSpot);
});


module.exports = router;
