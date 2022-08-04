'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 2,
        userId: 1,
        startDate: new Date('2022-10-14'),
        endDate: new Date('2022-11-21')
      },
      {
        spotId: 3,
        userId: 2,
        startDate: new Date('2022-11-17'),
        endDate: new Date('2022-12-17')
      },
      {
        spotId: 1,
        userId: 3,
        startDate: new Date('2022-10-17'),
        endDate: new Date('2022-12-18')
      }
     ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return await queryInterface.bulkDelete('Bookings', null, {});
  }
};
