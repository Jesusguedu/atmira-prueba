import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Moment from 'moment';
import * as API from "./recursos/Api";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';

// css
import './assets/css/App.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    });

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
        <div className="contenedor cabecera-noticia" style={{ backgroundImage: 'url('+datos.url+')' }}>
            <div className='oscurecedor'></div>
            <Container>
                <Row className="header">
                    <h1>{datos.title}</h1>
                </Row>
            </Container>
        </div>
        <div className="contenedor cuerpo">
            <Container>
                <p>{datos.explanation}</p>
                <img src={datos.url} alt={datos.title} title={datos.title}/>
                <p><Button variant="primary" className="boton-volver"><Link to={'/'}> Volver</Link></Button></p>
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
