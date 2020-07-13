const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const Book = db.book;

// run migrations
// db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Book.create({
    name: 'name1',
    author: 'anyAuthor1',
    releaseYear: 2001
  });

  Book.create({
    name: 'name12',
    author: 'anyAuthor2',
    releaseYear: 2002
  });

  Book.create({
    name: 'name13',
    author: 'anyAuthor3',
    releaseYear: 2003
  });

  Book.create({
    name: 'name14',
    author: 'anyAuthor4',
    releaseYear: 2004
  });

  Book.create({
    name: 'name15',
    author: 'anyAuthor5',
    releaseYear: 2005
  });

  Book.create({
    name: 'name16',
    author: 'anyAuthor6',
    releaseYear: 2006
  });

  Book.create({
    name: 'name17',
    author: 'anyAuthor7',
    releaseYear: 2007
  });

  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}
