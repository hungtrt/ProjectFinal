const { body } = require("express-validator");
module.exports = [
  body("rating").not().isEmpty().trim().escape().withMessage("Đánh giá không hợp lệ!"),
];