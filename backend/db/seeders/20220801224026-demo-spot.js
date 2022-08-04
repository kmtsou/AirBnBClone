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
     return await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Fake st',
        city: 'Johnville',
        state: 'CA',
        country: 'USA',
        lat: 1,
        lng: 1,
        name: 'A small house',
        description: 'Small house with a pool',
        price: 100
      },
      {
        ownerId: 2,
        address: '456 Nowhere ave',
        city: 'Humidville',
        state: 'FL',
        country: 'USA',
        lat: 50,
        lng: 50,
        name: 'A large house',
        description: 'Large house with a pool',
        price: 200
      },
      {
        ownerId: 3,
        address: '789 Example rd',
        city: 'Exampleville',
        state: 'ND',
        country: 'USA',
        lat: 100,
        lng: 100,
        name: 'Example',
        description: 'A mansion',
        price: 300
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
     const Op = Sequelize.Op;
     return await queryInterface.bulkDelete('Spots', {
       name: {[Op.in]: ['A small house', 'A large house', 'Example']}
     }, {});
  }
};
