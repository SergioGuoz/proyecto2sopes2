import logo from './logo.svg';
import './App.css';
import Navegador from './components/navbar';
import TopDeptos from './components/topdepartamentos';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Grafica from './components/graficapie';
import GraficaLineas from './components/graficalineas';

function App() {
  return (
    <div className="App">
      <Navegador style={{"backgroundColor":"white"}}></Navegador>
      <header className="App-header pb-0 mb-0">  
      <Container>
        <Row>
          <Col md={4}>
          <TopDeptos></TopDeptos>
          </Col>
          
          <Col md={8}>
            <Grafica></Grafica>
            <p></p>
            <GraficaLineas></GraficaLineas>
          
          </Col>
        </Row>
      </Container>  
      </header>
      
    </div>
  );
}

export default App;
