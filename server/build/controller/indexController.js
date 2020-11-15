"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
const { MongoClient } = require("mongodb");
const uri = "mongodb://35.192.86.242:27017/";
const client = new MongoClient(uri);
let redis = require('redis'), clientRedis = redis.createClient({
    port: '6379',
    host: '35.192.86.242',
});
clientRedis.on('connect', function () {
    console.log('connected');
});
class indexController {
    saludar(req, res) {
        res.send({ 'Respuesta': 'Hola!' });
    }
    getLastCase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //pythonMongo
            yield clientRedis.lindex('casos', 0, function (err, result) {
                if (err) {
                    console.log("error redis ", err);
                }
                else {
                    //result=result.replace('"','\'')
                    let resJson = JSON.parse(result);
                    console.log("resultado", resJson);
                    res.json(resJson);
                    //res.send(result);
                }
            });
        });
    }
    getListadoCasos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            clientRedis.lrange('casos', 0, -1, function (err, reply) {
                //console.log("LRANgE",err,reply); // ['angularjs', 'backbone']
                var jsonLista = [];
                reply.forEach((element) => {
                    jsonLista.push(JSON.parse(element));
                });
                var listaCantidadEdades = [];
                var listaLabels = [];
                var tempCantidad = 0;
                var limiteInferior = 0;
                var limiteSuperior = 10;
                for (let i = 0; i < jsonLista.length; i++) {
                    console.log("ITERACION ", i, jsonLista[i].Age, tempCantidad, "LIMITES ", limiteInferior, limiteSuperior);
                    if (jsonLista[i].Age > limiteInferior && jsonLista[i].Age <= limiteSuperior) {
                        tempCantidad++;
                    }
                    if (i == (jsonLista.length - 1)) {
                        if ((100 >= limiteSuperior) || (tempCantidad != 0 && limiteSuperior > 100)) {
                            listaCantidadEdades.push(tempCantidad);
                            listaLabels.push(limiteInferior + "-" + limiteSuperior);
                            tempCantidad = 0;
                        }
                        limiteInferior += 10;
                        limiteSuperior += 10;
                        i = -1;
                        if (limiteSuperior > 800) {
                            break;
                        }
                    }
                }
                let resJson; //JSON.parse(reply);
                res.json({ listaCantidadEdades, listaLabels });
            });
        });
    }
    getDeptosPorcentajes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect({ useNewUrlParser: true, useUnifiedTopology: true });
                const database = client.db("pythonmongodb");
                const collection = database.collection("casos");
                yield collection.aggregate({ $group: {
                        _id: "$Location",
                        count: { $sum: 1 }
                    }
                }, {
                    $project: {
                        _id: 0,
                        location: '$_id',
                        count: -1
                    }
                }).toArray((error, result) => __awaiter(this, void 0, void 0, function* () {
                    if (!error) {
                        var total = yield collection.find().count();
                        result.total = total;
                        console.log("TOTAL ", result.total);
                        return res.json({ result, total });
                    }
                }));
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getTopDeptos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect({ useNewUrlParser: true, useUnifiedTopology: true });
                const database = client.db("pythonmongodb");
                const collection = database.collection("casos");
                yield collection.aggregate({
                    $group: {
                        _id: "$Location",
                        count: { $sum: 1 }
                    }
                }, {
                    $sort: { count: -1 }
                }, {
                    $project: {
                        location: '$_id',
                        count: -1
                    }
                }).limit(3).toArray((error, result) => {
                    if (!error) {
                        return res.json(result);
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.IndexController = new indexController();
