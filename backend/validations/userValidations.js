const {body} = require("express-validator");
module.exports.registerValidations = [
    body('name').not().isEmpty().trim().escape().withMessage('Tên người dùng không hợp lệ!'),
    body('email').isEmail().normalizeEmail().trim().escape().withMessage('Email không hợp lệ!'),
    body('password').isLength({min: 5}).withMessage('Mật khẩu phải từ 6 ký tự trở lên!')
]

module.exports.loginValidations = [
    body('email').isEmail().normalizeEmail().trim().escape().withMessage('Email hoặc mật khẩu không hợp lệ!'),
    body('password').not().isEmpty().withMessage('Email hoặc mật khẩu không hợp lệ!')
]