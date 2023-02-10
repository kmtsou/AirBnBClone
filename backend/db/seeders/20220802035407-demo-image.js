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
    options.tableName = 'Images';
    return await queryInterface.bulkInsert(options, [
      {
        url: 'https://images.pexels.com/photos/2179603/pexels-photo-2179603.jpeg',
        previewImage: true,
        spotId: 1,
        userId: 1
      },
      {
        url: 'https://images.pexels.com/photos/5524167/pexels-photo-5524167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        previewImage: true,
        spotId: 2,
        userId: 2
      },
      {
        url: 'https://images.unsplash.com/photo-1541420937988-702d78cb9fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        previewImage: true,
        spotId: 3,
        userId: 3
      },
      {
        url: 'https://images.unsplash.com/photo-1580041065738-e72023775cdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        previewImage: true,
        spotId: 4,
        userId: 4
      },
      {
        url: 'https://images.pexels.com/photos/7746560/pexels-photo-7746560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        previewImage: true,
        spotId: 5,
        userId: 5
      },
      {
        url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        previewImage: true,
        spotId: 6,
        userId: 1
      },
      {
        url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        previewImage: true,
        spotId: 7,
        userId: 2
      },
      {
        url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        previewImage: true,
        spotId: 8,
        userId: 3
      },
      {
        url: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        previewImage: true,
        spotId: 9,
        userId: 2
      },
      {
        url: 'https://images.unsplash.com/photo-1623298317883-6b70254edf31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        previewImage: true,
        spotId: 10,
        userId: 1
      },
      {
        url: 'https://images.pexels.com/photos/5997996/pexels-photo-5997996.jpeg',
        previewImage: true,
        spotId: 11,
        userId: 4
      },
      {
        url: 'https://images.pexels.com/photos/6039188/pexels-photo-6039188.jpeg',
        previewImage: true,
        spotId: 12,
        userId: 5
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
    options.tableName = 'Images';
    return await queryInterface.bulkDelete(options)
  }
};
