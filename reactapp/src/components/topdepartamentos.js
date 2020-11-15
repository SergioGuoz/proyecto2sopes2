import React, { useState, Component } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import axios from 'axios'


class TopDeptos extends Component{

    constructor(props){
        super(props);        
        this.state={
            deptos:[]
        }
    }

    componentDidMount() {
        axios.get(`http://35.224.148.24:3100/getTopDeptos`)
          .then(res => {
            const deptos = res.data;
            this.setState({ deptos });
          });

          axios.get(`http://35.224.148.24:3100/getLastCase`)
          .then(res => {
              console.log(res.data);
            const ultimo = res.data;//JSON.parse(JSON.stringify(res.data));
            this.setState({ ultimo });
          });
      }

    render(){
        const { deptos,ultimo }= this.state;
        let i=0;
        return(
            <div>
                <Row>
                <Card border="primary"  variant="primary" bg="dark" style={{ color: 'white' }}>
                    <Card.Header as="h5">
                    <Card.Title as="h5" bg="Primary">TOP 3 DEPARTAMENTOS</Card.Title>
                    <Card.Subtitle as="h5" >Con Más Casos de Coronavirus</Card.Subtitle>
                    </Card.Header>
                   
                    <Card.Body bg="light"  style={{color:'gray',fontSize:'14px'}} >
                        <Table responsive="sm" size="sm" striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Departamento</th>
                                <th>No Casos</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    deptos.length?deptos.map( (depto,i)=>
                                    {
                                        i=i+1;
                                        return(<tr key={depto._id}>
                                        <td>{i}</td>
                                        <td>{depto._id}</td>
                                        <td>{depto.count}</td>
                                    </tr> );
                                    }
                                    
                                    ):null
                                }
                                
                            </tbody>
                        </Table>
              
                    </Card.Body>
                </Card>
          
          </Row>
          <br ></br> 
          <Row>
          <Card border="primary"  variant="primary" bg="dark"  style={{ color: 'white',fontSize:'12px' }}>
                    <Card.Header as="h5">
                    <Card.Title as="h5" bg="Primary">Ultimo Caso Agregado</Card.Title>
                    
                    </Card.Header>
                   
                <Card.Body bg="light"  style={{color:'white',fontSize:'12'}} >
                <Table responsive="sm" size="sm" striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <td>DEPARTAMENTO</td>
                            <td>{ultimo==undefined? '':ultimo.Location}</td>
                        </tr>
                        <tr>
                            <td>PACIENTE</td>
                            <td>{ultimo==undefined? '':ultimo.Name}</td>
                        </tr>
                        <tr>
                            <td>EDAD</td>
                            <td>{ultimo==undefined? '':ultimo.Age}</td>
                        </tr>
                        <tr>
                            <td>TIPO INFECCION</td>
                            <td>{ultimo==undefined? '':ultimo.Infectedtype}</td>
                        </tr>
                        <tr>
                            <td>ESTADO</td>
                            <td>{ultimo==undefined? '':ultimo.State}</td>
                        </tr>
                    </tbody>
                </Table>   
              
              </Card.Body>
            </Card>
          </Row>

                
              
              
            </div>
        )
    }
}

export default TopDeptos;
