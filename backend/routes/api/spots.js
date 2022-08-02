const express = require('express');
const router = express.Router();

const { User, Review, Booking, Spot, Image, sequelize } = require('../../db/models');

router.get('/', async(req, res) => {
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

    res.json(allSpots);
})

module.exports = router;
