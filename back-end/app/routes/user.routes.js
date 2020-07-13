const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", [authJwt.verifyToken], controller.allAccess);
  app.get(
      "/api/test/my_books",
      [authJwt.verifyToken],
      controller.myBooks
  );

  app.post(
      "/api/test/reserve_book",
      [authJwt.verifyToken],
      controller.reserveBook
  );

  app.put(
      "/api/test/change_book_status",
      [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
      controller.changeBookStatus
  )

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.adminBoard
  );
};
