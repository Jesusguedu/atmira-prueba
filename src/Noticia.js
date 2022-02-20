import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Moment from 'moment';
import * as API from "./recursos/Api";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube'

// css
import './assets/css/App.css';
import './assets/css/Responsive.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultImage from './assets/img/fondo-datos.png';

function Noticia() {
    const {fechaNoticia} = useParams();
    const [datos, setDatos] = useState([]);
    const [firstLoad, setFirstLoad] = useState(false);

    useEffect(() => {
        if(!firstLoad){
            setFirstLoad(true);
        }
    });

    useEffect(() => {
        if(firstLoad){
            conseguirDatosNasa();
        }
    },[firstLoad]);

    const conseguirDatosNasa = async() => {
        const res = await API.getNoticia(fechaNoticia);
        if(res.error != null){
            toast("Error recopilando datos", { type: "error" });
        }else{
            toast("Datos recopilados con éxito", { type: "success" });
            setDatos(res.data);
        }
    }

    return (<>
        <div className="contenedor cabecera-noticia" style={{ backgroundImage: datos.hdurl ? 'url('+datos.hdurl+')' : 'url('+defaultImage+')' }}>
            <div className='oscurecedor'>
                <Container>
                    <Row className="header">
                        <h1>{datos.title}</h1>
                        <p className="breadcrumbs"><Link to={'/'}> Inicio</Link> / {datos.title}</p>
                    </Row>
                </Container>
            </div>
        </div>
        <div className="contenedor cuerpo-noticia">
            <Container>
                <h3 className="autor"><span>Autor:</span> {datos.copyright ? datos.copyright : 'NASA'}</h3>
                <p className="texto-noticia">{datos.explanation}</p>
                {datos.hdurl ? <img src={datos.url} alt={datos.title} title={datos.title}/> : <ReactPlayer className="video-noticia" url={datos.url} config={{ youtube: { playerVars: { showinfo: 1 }}}} style={{margin: '25px auto'}}/>}
                <p><Button variant="outline-primary" className="boton-volver"><Link to={'/'}> Volver</Link></Button></p>
            </Container>
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

export default Noticia;
