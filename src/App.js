import React, { Fragment } from "react";

import Dashboard from './Dashboard';
import Noticia from './Noticia';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

    return (
        <Router>
            <Fragment>
                <Routes>
                    <Route exact path='/' element={<Dashboard/>}/>
                    <Route exact path='/noticia/:fechaNoticia' element={<Noticia/>}/>
                </Routes>
            </Fragment>
        </Router>
    );
}

export default App;
