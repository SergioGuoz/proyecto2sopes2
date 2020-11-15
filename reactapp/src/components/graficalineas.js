import React, { useState, Component } from 'react'
import {Scatter,Line} from 'react-chartjs-2'
import axios from 'axios'
import {HorizontalBar} from 'react-chartjs-2';
import 'chart.piecelabel.js';

class GraficaLineas extends Component{

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
        axios.get(`http://localhost:3100/getListadoCasos`)
          .then(res => {
              console.log(res.data)
              let listaLabels=res.data.listaLabels;
              let listaCantidades=res.data.listaCantidadEdades;
             
            this.setState({ data:{
                
                labels:listaLabels,
                datasets:[{
                    label: 'CANTIDAD DE CASOS',
                    data:listaCantidades,
                    backgroundColor:["#2b2ed4","#e01414","#7f0797","#db3201","#eb6161","#149707","#41aef5","#97d42b","#990c13","#0c9973","#994c0c","#ffe800","#ff004d","#249703","#d99a0a","#2b2ed4","#e01414","#7f0797","#db3201","#eb6161",]
                    
                }]
            } });
          })
    }


    render(){
        const opciones={responsive:true,
            scales: {
                xAxes: [{
                    gridLines: {
                        offsetGridLines: true
                    }
                }]
            },
            chartArea: {
                backgroundColor: 'rgba(251, 85, 85, 0.4)'
            },
        pieceLabel:{
            render:function(args){
                return args.value+"%";
            },
            fontSize:15,
            fontColor:"#fff"
        }};
        return(
            <div className="chart" style={{"backgroundColor":"white","color":"dark"}}>
                <HorizontalBar bg="dark" data={this.state.data} options={opciones} width={"350%"}/>
            </div>
        )
    }
}

export default GraficaLineas;
