import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Moment from 'moment';
import * as API from "./recursos/Api";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// css
import './assets/css/App.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import noImage from './assets/img/Imagen_no_disponible.png';

function Dashboard() {

    const [fechaInicio, setFechaInicio] = useState();
    const [fechaFin, setFechaFin] = useState(new Date());
    const [datos, setDatos] = useState([]);
    const [firstLoad, setFirstLoad] = useState(false);

    useEffect(() => {
        if(!firstLoad){
            let fecha = new Date();
            setFechaInicio(fecha.setDate(fecha.getDate()-5));
            setFirstLoad(true);
        }
    });

    useEffect(() => {
        if(firstLoad){
            conseguirDatosNasa();
        }
    }, [fechaInicio, fechaFin]);

    const conseguirDatosNasa = async() => {
        const res = await API.getFullNoticias(Moment(fechaInicio).format('YYYY-MM-DD'), Moment(fechaFin).format('YYYY-MM-DD'));
        if(res.error != null){
            toast("Error recopilando datos", { type: "error" });
        }else{
            toast("Datos recopilados con éxito", { type: "success" });
            setDatos(res.data);
        }
    }

    return (<>
        <div className="contenedor cabecera">
            <Container>
                <Row className="header">
                    <h1>Registro de datos de la NASA</h1>
                </Row>
            </Container>
        </div>
        <div className="contenedor cuerpo">
            <div className="selectores">
                <Container>
                    <h2>Selecciona el rango de fecha del muestreo de datos</h2>
                    <div className="separador"></div>
                    <Row className="selectores">
                        <Col>
                            <h3>Fecha inicial</h3>
                            <DatePicker className="datepicker" selected={fechaInicio} dateFormat='dd-MM-yyyy' onChange={(date) => setFechaInicio(date)} />
                        </Col>
                        <Col>
                            <h3>Fecha final</h3>
                            <DatePicker className="datepicker" selected={fechaFin} dateFormat='dd-MM-yyyy' onChange={(date) => setFechaFin(date)} />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="datos-nasa">
                <Container>
                    <h2>Noticias encontradas</h2>
                    <div className="separador"></div>
                    <p className="subtexto">{ Moment(fechaInicio).format('DD/MM/YYYY') } al { Moment(fechaFin).format('DD/MM/YYYY') }</p>
                    <Row>
                        {datos.map((dato) =>
                            <Col xs={12} md={6} lg={4} xl={4}>
                                {(dato.hdurl && dato.url) ?
                                    <div className="imagen-noticia" style={{ backgroundImage: 'url('+dato.url+')' }}></div>
                                :
                                    <div className="noticia-noimage"><img src={noImage} alt={dato.title} title={dato.title}/></div>
                                }
                                <h4 className="titulo-noticia"><Link to={`/noticia/${dato.date}`}>{dato.title}</Link></h4>
                                <p className="fecha-noticia">Publicada <span>{Moment(dato.date).format('DD/MM/YYYY')}</span></p>
                            </Col>
                        )}
                    </Row>
                </Container>
            </div>
        </div>

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

export default Dashboard;
