const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const { User, Review, Booking, Spot, Image, sequelize } = require('../../db/models');

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const image = await Image.findByPk(req.params.imageId);
    if (!image) {
        res.status(404);
        return res.json({
            message: "Image couldn't be found",
            statusCode: 404
        });
    };
    if (image.userId !== req.user.id) {
        const err = new Error('Forbidden');
        err.title = 'Unauthorized user';
        err.errors = ['Forbidden'];
        err.status = 403;
        return next(err);
    };
    await image.destroy();
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

module.exports = router;
