const {body} = require("express-validator");
module.exports = [body('name').not().isEmpty().trim().escape().withMessage('Tên danh mục không được để trống!')];