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
      },
      {
        ownerId: 2,
        address: '432 Baker st',
        city: 'Nashville',
        state: 'TN',
        country: 'USA',
        lat: 24,
        lng: 76,
        name: 'A comfy house',
        description: 'A comfy house that anyone would want to live in.',
        price: 340
      },
      {
        ownerId: 1,
        address: '765 Second st',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 98,
        lng: 78,
        name: 'An Expensive house',
        description: 'An expensive house for all of your luxury needs.',
        price: 1000
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
       name: {[Op.in]: ['A small house', 'A large house', 'Example', 'A comfy house', 'An Expensive house']}
     }, {});
  }
};
