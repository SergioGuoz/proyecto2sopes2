"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controller/indexController");
var MongoClient = require('mongodb').MongoClient;
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/getTopDeptos', indexController_1.IndexController.getTopDeptos);
        this.router.get('/getPorcentajes', indexController_1.IndexController.getDeptosPorcentajes);
        this.router.get('/getLastCase', indexController_1.IndexController.getLastCase);
        this.router.get('/getListadoCasos', indexController_1.IndexController.getListadoCasos);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
