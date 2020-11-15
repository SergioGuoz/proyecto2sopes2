import {Router} from 'express';

import {IndexController} from '../controller/indexController';

var MongoClient = require('mongodb').MongoClient;

class IndexRoutes{

    public router:Router=Router();

    constructor(){
        this.config();
    }
    config():void{
        this.router.get('/getTopDeptos',IndexController.getTopDeptos);
        this.router.get('/getPorcentajes',IndexController.getDeptosPorcentajes);
        this.router.get('/getLastCase',IndexController.getLastCase);
        this.router.get('/getListadoCasos',IndexController.getListadoCasos);
        
    }
}

const indexRoutes=new IndexRoutes();
export default indexRoutes.router;