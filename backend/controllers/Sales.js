const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const SalesModel = require("../models/SalesModel");
class Sales {
  async create(req, res) {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (!err) {
        const parsedData = JSON.parse(fields.data);
        const errors = [];
        if (parsedData.title.trim().length === 0) {
          errors.push({ msg: "Tên không được để trống!" });
        }
        if (parsedData.category.trim().length === 0) {
          errors.push({ msg: "Tên danh mục không được để trống!" });
        }
        if (parseInt(parsedData.price) < 1) {
          errors.push({ msg: "Giá sản phẩm không hợp lệ!" });
        }
        if (parseInt(parsedData.discount) < 0) {
          errors.push({ msg: "Giá chiết khấu phải lớn hơn bằng 0!" });
        }
        if (parseInt(parsedData.stock) < 1) {
          errors.push({ msg: "Số lượng không hợp lệ!" });
        }
        if (parsedData.description.trim().length === 0) {
          errors.push({ msg: "Mô tả không được để trống!" });
        }
        if (errors.length === 0) {
          if (!files["image1"]) {
            errors.push({ msg: "Bạn chưa chọn ảnh 1!" });
          }
          if (!files["image2"]) {
            errors.push({ msg: "Bạn chưa chọn ảnh 2!" });
          }
          if (!files["image3"]) {
            errors.push({ msg: "Bạn chưa chọn ảnh 3!" });
          }
          if (errors.length === 0) {
            const images = {};
            for (let i = 0; i < Object.keys(files).length; i++) {
              const mimeType = files[`image${i + 1}`].mimetype;
              const extension = mimeType.split("/")[1].toLowerCase();
              if (
                extension === "jpeg" ||
                extension === "jpg" ||
                extension === "png"
              ) {
                const imageName = uuidv4() + `.${extension}`;
                const __dirname = path.resolve();
                const newPath =
                  __dirname + `/../client/public/images/${imageName}`;
                images[`image${i + 1}`] = imageName;
                fs.copyFile(files[`image${i + 1}`].filepath, newPath, (err) => {
                  if (err) {
                    console.log(err);
                  }
                });
              } else {
                const error = {};
                error["msg"] = `Ảnh ${i + 1} không đúng định dạng!`;
                errors.push(error);
              }
            }
            if (errors.length === 0) {
              try {
                const response = await SalesModel.create({
                  title: parsedData.title,
                  price: parseInt(parsedData.price),
                  discount: parseInt(parsedData.discount),
                  stock: parseInt(parsedData.stock),
                  category: parsedData.category,
                  colors: parsedData.colors,
                  sizes:  parsedData.sizes,
                  image1: images["image1"],
                  image2: images["image2"],
                  image3: images["image3"],
                  description: parsedData.description,
                });
                return res.status(201).json({ msg: "Sản phẩm được tạo thành công!", response });
              } catch (error) {
                console.log(error);
                return res.status(500).json(error);
              }
            } else {
              return res.status(400).json({ errors });
            }
          } else {
            return res.status(400).json({ errors });
          }
        } else {
          return res.status(400).json({ errors });
        }
      }
    });
  }
  async get(req, res) {
    const { page } = req.params;
    const perPage = 4;
    const skip = (page - 1) * perPage;
    try {
      const count = await SalesModel.find({}).countDocuments();
      const response = await SalesModel.find({})
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });
      return res.status(200).json({ sales: response, perPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }
  async getAllSales(req, res) {
    try {
      const sale = await SalesModel.find({});
      return res.status(200).json(sale);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async getSales(req, res) {
    const { id } = req.params;
    try {
      const sale = await SalesModel.findOne({ _id: id });
      return res.status(200).json(sale);
    } catch (error) {
      return res.status(500).json({ error: error.message });
      console.log(error.message);
    }
  }
  async updateSales(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const {
          _id,
          title,
          price,
          discount,
          stock,
          colors,
          sizes,
          description,
          category,
        } = req.body;
        const response = await SalesModel.updateOne(
          { _id },
          {
            $set: {
              title,
              price,
              discount,
              stock,
              category,
              colors,
              sizes,
              description,
            },
          }
        );
        return res.status(200).json({ msg: "Cập nhật sản phẩm thành công!", response });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: error });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }
  async deleteSales(req, res) {
    const { id } = req.params;
    try {
      const sales = await SalesModel.findOne({ _id: id });
      [1, 2, 3].forEach((number) => {
        let key = `image${number}`;
        let image = sales[key];
        let __dirname = path.resolve();
        let imagePath = __dirname + `/../client/public/images/${image}`;
        fs.unlink(imagePath, (err) => {
          if (err) {
            throw new Error(err);
          }
        });
      });
      await SalesModel.findByIdAndDelete(id);
      return res.status(200).json({ msg: "Xóa sản phẩm thành công!" });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = new Sales();
