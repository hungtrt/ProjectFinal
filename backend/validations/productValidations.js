const {body} = require("express-validator");
module.exports = [body('title').not().isEmpty().trim().escape().withMessage('Tên sản phẩm không được để trống!'),
body('price').custom((value) => {
    if(parseInt(value) < 1) {
        throw new Error('Giá sản phẩm không hợp lệ!');
    } else {
        return parseInt(value);
    }
}).trim().escape(),
body('discount').custom((value) => {
   if(parseInt(value) < 0) {
    throw new Error("Giá chiết khấu phải lớn hơn bằng 0!");
   } else {
    return parseInt(value);
   }
}).trim().escape(),
body('category').not().isEmpty().trim().escape().withMessage('Tên danh mục không được để trống!'),
body('description').not().isEmpty().trim().escape().withMessage("Mô tả không được để trống!"),
body('stock').custom((value) => {
   if(parseInt(value) < 1) {
     throw new Error("Số lượng không hợp lệ!");
   } else {
    return parseInt(value);
   }
}).trim().escape()
]