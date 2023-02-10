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
    options.tableName = 'Spots';
    return await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "1051 Courage Rd",
        city: "Vancouver",
        state: "Washington",
        country: "United States of America",
        lat: 28.2011947,
        lng: -103.6950293,
        name: "Gray bricked home in the city of Vancouver",
        description:
          "Rustic styled brick home with modern utilities inside. A nice home within a quiet neighborhood that is not too far from many outdoor activities.",
        price: 120,
      },
      {
        ownerId: 2,
        address: "1051 Bellow Rd",
        city: "Tacoma",
        state: "Washington",
        country: "United States of America",
        lat: 28.2073947,
        lng: -103.3950293,
        name: "Gray bricked home in the city of Tacomma",
        description:
          "Rustic styled brick home with modern utilities inside. A nice home within a quiet neighborhood that is not too far from many outdoor activities.",
        price: 340,
      },
      {
        ownerId: 3,
        address: "3600 Lake View",
        city: "Boulder",
        state: "Colorado",
        country: "United States of America",
        lat: 20.7645358,
        lng: -120.4730327,
        name: "Peaceful Lake House",
        description: "This beautiful lake house located right beside a large expansive lake in Colorado is perfect getaway into what nature has to offer. This spot can house upt to three guests with two bedrooms and two baths. This stay has many activities nature has to offer from fishing to hiking. Guaranteed you will find some peace in nature here.",
        type:"House",
        price: 350
      },
      {
        ownerId: 4,
        address: "9260 Calm Street",
        city: "Myrtle Beach",
        state: "South Carolina",
        country: "United States of America",
        lat: 20.7645358,
        lng: -120.4730327,
        name: "Beautiful Condo",
        description: "This beautiful luxury condo is a perfect vaction spot for couples. This condo can house two guests with one bedroom and 2 baths. The condo has a accomidiating pool while not being too far away from the beach.",
        type:"Condo",
        price: 520
      },
      {
        ownerId: 5,
        address: "7131 Brick Lane",
        city: "Buffalo",
        state: "New York",
        country: "United States Of America",
        lat: 40.1469718,
        lng: -170.2654915,
        name: "Rustic Home up in the woods",
        description:
          "Nice cabin-styled home with many rooms and bathrooms for a nice snowboard/ski trip up in the woods.",
        price: 950,
      },
      {
        ownerId: 1,
        address: '123 Fake st',
        city: 'Johnville',
        state: 'CA',
        country: 'United States of America',
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
        country: 'United States of America',
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
      },
      {
        ownerId: 4,
        address: "9810 Country Rd",
        city: "San Antonio",
        state: "Texas",
        country: "United States of America",
        lat: 38.1983746,
        lng: -149.2983717,
        name: "White cottage home in the area of San Antonio",
        description:
          "Recently finished home that is ready for rental usage. Please contact the owner if you have any questions.",
        price: 650,
      },
      {
        ownerId: 5,
        address: "9810 Green Rd",
        city: "Austin",
        state: "Texas",
        country: "United States of America",
        lat: 38.1983746,
        lng: -149.2983717,
        name: "Very spacious townhouse that is close to the city",
        description:
          "Only a 10 minute walk into the city of Austin with many restaurants nearby.",
        price: 650,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    //  const Op = Sequelize.Op;
    options.tableName = 'Spots';
    return await queryInterface.bulkDelete(options);
  }
};
