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
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {exclude: ['createdAt', 'updatedAt']}
            },
            {
                model: Image,
                attributes: ['id', 'reviewId', 'url']
            }
        ]
    });
    return res.json(currentReviews);
});


router.post('/:reviewId/images', requireAuth, async (req, res) => {

    const theReview = await Review.findByPk(req.params.reviewId);
    if (!theReview) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };
    if (theReview[0].dataValues.userId !== req.user.id) {
        const err = new Error('Unauthorized user');
        err.title = 'Unauthorized user';
        err.errors = ['Unauthorized user'];
        err.status = 403;
        return next(err);
    };

    const { url, previewImage } = req.body;

    const newImage = Image.build({
        url,
        previewImage,
        userId: req.user.id,
        reviewId: req.params.reviewId
    });
    await newImage.save();
    return res.json(newImage);
})

module.exports = router;
