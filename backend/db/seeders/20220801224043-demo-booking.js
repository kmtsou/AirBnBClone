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
        startDate: new Date('2022-8-14T03:24:00'),
        endDate: new Date('2022-8-21T03:24:00')
      },
      {
        spotId: 3,
        userId: 2,
        startDate: new Date('2022-11-17T03:24:00'),
        endDate: new Date('2022-12-17T03:24:00')
      },
      {
        spotId: 1,
        userId: 3,
        startDate: new Date('2022-6-17T03:24:00'),
        endDate: new Date('2022-6-18T03:24:00')
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
