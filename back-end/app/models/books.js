module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        author: {
            type: Sequelize.STRING
        },
        releaseYear: {
            type: Sequelize.INTEGER
        }
    });

    return Book;
};
