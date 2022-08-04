const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const { User, Review, Booking, Spot, Image, sequelize } = require('../../db/models');

router.get('/current', requireAuth, async (req, res) => {
    const currentReviews = await Review.findAll({
        where: { userId: req.user.id },
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


router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

    const theReview = await Review.findByPk(req.params.reviewId);
    if (!theReview) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };
    if (theReview.userId !== req.user.id) {
        const err = new Error('Unauthorized user');
        err.title = 'Unauthorized user';
        err.errors = ['Unauthorized user'];
        err.status = 403;
        return next(err);
    };
    const reviewCount = await Image.count({
        where: {reviewId: req.params.reviewId}
    });
    if (reviewCount > 10) {
        res.status(403);
        return res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        });
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

router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    const theReview = await Review.findByPk(req.params.reviewId);
    if (!theReview) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };
    if (theReview.userId !== req.user.id) {
        const err = new Error('Unauthorized user');
        err.title = 'Unauthorized user';
        err.errors = ['Unauthorized user'];
        err.status = 403;
        return next(err);
    };

    const { review, stars } = req.body;
    theReview.review = review;
    theReview.stars = stars;
    await theReview.save();
    return res.json(theReview);
});


router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    }
    if (review.userId !== req.user.id) {
        const err = new Error('Unauthorized user');
        err.title = 'Unauthorized user';
        err.errors = ['Unauthorized user'];
        err.status = 403;
        return next(err);
    }

    await review.destroy();
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

module.exports = router;
