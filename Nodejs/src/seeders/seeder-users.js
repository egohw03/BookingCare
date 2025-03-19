'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [{
            email: 'admin@example.com',
            password: '123456',
            firstName: 'Nguyen',
            lastName: 'Hung',
            address: '123 Main Street',
            phonenumber: '0364236354',
            gender: 1,
            image: 'https://example.com/image.jpg',
            roleId: 'R1',
            positionId: 'P4',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};