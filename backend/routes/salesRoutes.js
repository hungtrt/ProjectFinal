const express = require("express");
const router = new express.Router();
const Sales = require("../controllers/Sales");
const Authorization = require("../services/Authorization");
const productValidations = require("../validations/productValidations");
router.post("/create-sales", [Authorization.authorized], Sales.create);
router.get("/sales", Authorization.authorized, Sales.getAllSales);
router.get("/sales/:page", Authorization.authorized, Sales.get);
router.get("/sales/:id", Sales.getSales);
router.put("/sales",[Authorization.authorized, productValidations],Sales.updateSales);
router.delete("/delete/:id", Authorization.authorized, Sales.deleteSales);

module.exports = router;
