'use strict';

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
    return await queryInterface.bulkInsert('Reviews', [
      {
        review: 'It is an ok place',
        stars: 5,
        userId: 3,
        spotId: 1
      },
      {
        review: 'It was great would recommend.',
        stars: 4,
        userId: 2,
        spotId: 1
      },
      {
        review: 'It is a crappy place',
        stars: 3,
        userId: 2,
        spotId: 3
      },
      {
        review: 'The water pressure in the shower was terrible',
        stars: 1,
        userId: 1,
        spotId: 2
      },
      {
        review: 'Not worth the price',
        stars: 4,
        userId: 2,
        spotId: 5
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
     return await queryInterface.bulkDelete('Reviews', null, {});
  }
};
