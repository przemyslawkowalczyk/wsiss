  const _ = require('lodash');
const { Op } = require("sequelize");
const db = require("../models");
const Book = db.book;
const User = db.user;
const bluebird = require('bluebird');
const UserBook = db.userBook;

exports.allAccess = async (req, res) => {
  const userBookIds = _.uniq(_.map(await UserBook.findAll({ where: { status: { [Op.in]: ['loaned', 'reserved'] } } }), 'book'));
  const books = await Book.findAll({
    where: {
      id: {
        [Op.notIn]: userBookIds,
      }
    }
  });

  res
      .status(200)
      .send(books);
}

exports.myBooks = async (req, res) => {
  const userBooks = await bluebird.map(
      (await UserBook.findAll({ raw: true, where: { user: req.userId } })),
      async userBook => ({
        ...userBook,
        book: await Book.findByPk(userBook.book)
      })
  );

  res
      .status(200)
      .send(userBooks);
};

exports.reserveBook = async ({ userId, body: { status, id } }, res) => {
  await UserBook.create({
    user: userId,
    status: 'reserved',
    book: id
  });

  res.sendStatus(200);
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.changeBookStatus = async (req, res) => {
  res.sendStatus(200);
};

exports.adminBoard = async (req, res) => {
  const userBooks = await bluebird.map(
      (await UserBook.findAll({ raw: true })),
      async userBook => ({
        ...userBook,
        user: await User.findByPk(userBook.user),
        book: await Book.findByPk(userBook.book)
      })
  );

  res
      .status(200)
      .send(userBooks);
};
