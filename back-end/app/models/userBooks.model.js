module.exports = (sequelize, Sequelize) => {
    const UserBooks = sequelize.define("userBooks", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user: {
            type: Sequelize.INTEGER
        },
        book: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.STRING

        }
    });

    return UserBooks;
};
