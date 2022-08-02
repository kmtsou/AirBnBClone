const express = require('express');
const router = express.Router();

const { User, Review, Booking, Spot, Image } = require('../../db/models');

router.get('/', async(req, res) => {
    const allSpots = await Spot.findAll();
})

module.exports = router;
