import {Request,Response} from 'express';

const { MongoClient } = require("mongodb");

const uri =
  "mongodb://35.192.86.242:27017/";

  const client = new MongoClient(uri);

  let redis     = require('redis'),

  clientRedis    = redis.createClient({
    port      : '6379',               
    host      : '35.192.86.242',     
  });

  clientRedis.on('connect', function() {
    console.log('connected');
});

class indexController{

    public saludar(req:Request,res:Response){
        res.send({'Respuesta':'Hola!'});
    }

    async getLastCase(req:Request,res:Response){
        //pythonMongo

        await clientRedis.lindex('casos', 0, function(err:any, result:any) {
            if (err) {
                console.log("error redis ",err);
            } else {
                //result=result.replace('"','\'')
                let resJson=JSON.parse(result);
                console.log("resultado", resJson);
                res.json(resJson);
                //res.send(result);
            }
        });

    }


    async getListadoCasos(req:Request,res:Response){

        clientRedis.lrange('casos', 0, -1, function(err:any, reply:any) {
            //console.log("LRANgE",err,reply); // ['angularjs', 'backbone']
            var jsonLista:any=[];
            reply.forEach((element:any) => {
                jsonLista.push(JSON.parse(element));
            });
            var listaCantidadEdades:any=[];
            var listaLabels:any=[];
            var tempCantidad=0;
            var limiteInferior=0;
            var limiteSuperior=10;

            for (let i = 0; i < jsonLista.length; i++) {
                console.log("ITERACION ",i,jsonLista[i].Age,tempCantidad,"LIMITES ",limiteInferior,limiteSuperior);
                if(jsonLista[i].Age>limiteInferior && jsonLista[i].Age<=limiteSuperior){
                    tempCantidad++;
                }

                if(i==(jsonLista.length-1)){
                    if((100>=limiteSuperior) ||(tempCantidad!=0 && limiteSuperior>100)  ){
                        listaCantidadEdades.push(tempCantidad);
                        listaLabels.push(limiteInferior+"-"+limiteSuperior);
                        tempCantidad=0;
                    }
                    

                    limiteInferior+=10;
                    limiteSuperior+=10;
                    i=-1;
                    if (limiteSuperior>800) {
                        
                        break;
                    }
                }
            }
            let resJson;//JSON.parse(reply);

            res.json({listaCantidadEdades,listaLabels});
        });


    }


    async getDeptosPorcentajes(req:Request,res:Response){
        try {

            await client.connect({ useNewUrlParser: true,useUnifiedTopology: true });
            const database = client.db("pythonmongodb");
            const collection = database.collection("casos");
            
            await collection.aggregate(
               { $group:{
                    _id:"$Location",
                    count:{$sum:1}
                }
            },
                {
                    $project:{
                        _id:0,
                        location:'$_id',
                        count:-1
                    }
                },
                
            ).toArray(async (error:any,result:any)=>{
                if(!error){
                    var total=await collection.find().count();
                    result.total=total;
                    console.log("TOTAL ",result.total);
                    return res.json({result,total});
                }
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    async getTopDeptos(req:Request,res:Response){
        try {


            await client.connect({ useNewUrlParser: true,useUnifiedTopology: true });
            const database = client.db("pythonmongodb");
            const collection = database.collection("casos");
            
            await collection.aggregate({
                $group:{
                    _id:"$Location",
                    count:{$sum:1}
                }
            },
                {
                    $sort:{count:-1}
                },
                {
                    $project:{
                        location:'$_id',
                        count:-1
                    }
                },
                
            ).limit(3).toArray((error:any,result:any)=>{
                if(!error){
                    return res.json(result);
                }
            });
            
        
        } catch (error) {
            console.log(error);
        }
    }
}

export const IndexController=new indexController();