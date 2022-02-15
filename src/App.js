import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Moment from 'moment';
import * as API from "./recursos/Api";
import { ToastContainer, toast } from 'react-toastify';
// css
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const [fecha, setFecha] = React.useState();
    const [datos, setDatos] = React.useState();

    useEffect(() => {
        if(fecha){
            conseguirDatosNasa(fecha);
        }
    }, [fecha]);

    const conseguirDatosNasa = async() => {
        const res = await API.getData(fecha);
        if(res.error != null){
            toast("Error recopilando datos", { type: "error" });
        }else{
            toast("Datos recopilados con éxito", { type: "success" });
            setDatos(res.data);
        }
        console.log(res);
    }

    return (<>

        <Container>
            <Row className="justify-content-md-center">
                <DatePicker selected={new Date()} onChange={(date) => setFecha(Moment(date).format('YYYY-MM-DD'))} />
            </Row>
            <Row>
                <Col>1 of 3</Col>
                <Col md="auto">Variable width content</Col>
                <Col xs lg="2">
                    3 of 3
                </Col>
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
