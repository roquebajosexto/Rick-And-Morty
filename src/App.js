import React from 'react';
import './App.css';
import Home from './Home';
import Personaje from './Personaje';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


function App() {

    return (
        <Router>
            <Switch>
                <Route path="/personaje/:id">
                    <Personaje />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>

        </Router>


    );
}


export default App;
