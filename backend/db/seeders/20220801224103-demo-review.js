'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Reviews';
    return await queryInterface.bulkInsert(options, [
      {
        review: 'Really enjoyed my stay here.',
        stars: 4,
        userId: 3,
        spotId: 1
      },
      {
        review: 'This place is wonderful.',
        stars: 5,
        userId: 5,
        spotId: 2
      },
      {
        review: 'Nice get away and calm.',
        stars: 4,
        userId: 1,
        spotId: 3
      },
      {
        review: 'It is an ok place to stay at.',
        stars: 3,
        userId: 2,
        spotId: 4
      },
      {
        review: 'What a lovely place to stay!',
        stars: 4,
        userId: 4,
        spotId: 5
      },
      {
        review: 'It is an ok place.',
        stars: 5,
        userId: 3,
        spotId: 6
      },
      {
        review: 'It was great would recommend.',
        stars: 4,
        userId: 2,
        spotId: 6
      },
      {
        review: 'It is a crappy place to stay at. Avoid.',
        stars: 2,
        userId: 2,
        spotId: 8
      },
      {
        review: 'The water pressure in the shower was terrible.',
        stars: 1,
        userId: 1,
        spotId: 7
      },
      {
        review: 'Not worth the price.',
        stars: 4,
        userId: 2,
        spotId: 10
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    return await queryInterface.bulkDelete(options);
  }
};
