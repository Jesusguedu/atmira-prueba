import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Moment from 'moment';
import * as API from "./recursos/Api";
import { ToastContainer, toast } from 'react-toastify';
// css
import './assets/css/App.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const [fechaInicio, setFechaInicio] = React.useState();
    const [fechaFin, setFechaFin] = React.useState(new Date());
    const [datos, setDatos] = React.useState([]);
    const [firstLoad, setFirstLoad] = React.useState(false);

    useEffect(() => {
        if(!firstLoad){
            let fecha = new Date();
            setFechaInicio(fecha.setDate(fecha.getDate()-5));
            setFirstLoad(true);
        }
    })

    useEffect(() => {
        if(firstLoad){
            conseguirDatosNasa();
        }
    }, [fechaInicio, fechaFin]);

    const conseguirDatosNasa = async() => {
        // const res = await API.getData(Moment(fechaInicio).format('YYYY-MM-DD'), Moment(fechaFin).format('YYYY-MM-DD'));
        // if(res.error != null){
        //     toast("Error recopilando datos", { type: "error" });
        // }else{
        //     toast("Datos recopilados con éxito", { type: "success" });
        //     setDatos(res.data);
        // }
    }

    return (<>

        <Container className="contenedor cabecera">
            <Row className="header">
                <h1>Registro de datos de la NASA</h1>
            </Row>
        </Container>
        <Container className="contenedor cuerpo">
            <Row className="selectores">
                <h2>Selecciona el rango de fecha del muestreo de datos</h2>
                <div className="separador"></div>
                <Row className="fila">
                    <Col className="columna">
                        <h3>Fecha inicial</h3>
                        <DatePicker className="datepicker" selected={fechaInicio} dateFormat='dd-MM-yyyy' onChange={(date) => setFechaInicio(date)} />
                    </Col>
                    <Col className="columna">
                        <h3>Fecha final</h3>
                        <DatePicker className="datepicker" selected={fechaFin} dateFormat='dd-MM-yyyy' onChange={(date) => setFechaFin(date)} />
                    </Col>
                </Row>
            </Row>
            <Row className="datos-nasa">
                <h2>Noticias encontradas</h2>
                <div className="separador"></div>
                <p className="subtexto">{ Moment(fechaInicio).format('DD/MM/YYYY') } al { Moment(fechaFin).format('DD/MM/YYYY') }</p>
                <Row className="fila">
                    <Col className="columna">
                        <h3>Fecha inicial</h3>
                        <DatePicker className="datepicker" selected={fechaInicio} dateFormat='dd-MM-yyyy' onChange={(date) => setFechaInicio(date)} />
                    </Col>
                    <Col className="columna">
                        <h3>Fecha final</h3>
                        <DatePicker className="datepicker" selected={fechaFin} dateFormat='dd-MM-yyyy' onChange={(date) => setFechaFin(date)} />
                    </Col>
                </Row>
            </Row>
        </Container>

        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </>);
}

export default App;
