const express = require('express');
const router = express.Router();

const { User, Review, Booking, Spot, Image, sequelize } = require('../../db/models');

router.get('/', async(req, res) => {
    const allSpots = await Spot.findAll({
        attributes: {
            include: [
                [
                    // sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"
                    sequelize.literal(`(
                        SELECT AVG(stars)
                        FROM reviews
                        WHERE reviews.spotId = spot.id
                    )`),
                    "avgRating"
                ]
            ]
        },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: Image,
                attributes: ['url']
            }
        ]
    });

    res.json(allSpots);
})

module.exports = router;
