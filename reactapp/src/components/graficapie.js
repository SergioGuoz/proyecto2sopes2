import React, { useState, Component } from 'react'
import {Scatter,Line} from 'react-chartjs-2'
import axios from 'axios'
import {Pie} from 'react-chartjs-2';
import 'chart.piecelabel.js';
class Grafica extends Component{

    constructor(props){
        super(props);
        let data={
            labels:[],
            datasets:[{
                data:[],
                backgroundColor:["#41aef5","#e01414","#149707","#7f0797"]
            }]
        };
        this.state={};

    }


    componentDidMount(){
        axios.get(`nodejs-service:3100/getPorcentajes`)
          .then(res => {
              console.log(res.data)
              let listaLabels=[];
              let listaPorcentajes=[];
              let total=res.data.total;
              for (let i = 0; i < res.data.result.length; i++) {
                  listaLabels.push(res.data.result[i]._id);
                    listaPorcentajes.push(Math.round((res.data.result[i].count/total)*100,2));
                }
            
            this.setState({ data:{
                labels:listaLabels,
                datasets:[{
                    label: 'PORCENTAJE INFECTADOS',
                    
                    data:listaPorcentajes,
                    backgroundColor:["#2b2ed4","#e01414","#7f0797","#db3201","#eb6161","#149707","#41aef5","#97d42b","#990c13","#0c9973","#994c0c","#ffe800","#ff004d","#249703","#d99a0a","#2b2ed4","#e01414","#7f0797","#db3201","#eb6161",]
                    
                }]
            } });
          })
    }


    render(){
        const opciones={
        pieceLabel:{
            render:function(args){
                return args.value+"%";
            },
            fontSize:15,
            fontColor:"#fff"
        }};
        return(
            <div className="chart" style={{"backgroundColor":"white"}}>
                <Pie data={this.state.data} options={opciones} width={"410%"}/>
            </div>
        )
    }
}

export default Grafica;
