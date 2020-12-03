import React, {useState} from 'react';
import SurveyComponent from './components/Survey/SurveyComponent';
import App from './App';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Kanban from "./components/Kanban/Kanban";
import ListView from "./components/ListView/ListView";


function Experiment() {

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Kanban}/>
                <Route path="/all" exact component={ListView}/>
                <Route path="/start" exact component={SurveyComponent}/>
                <Route path='/slider' exact component={App}/>
            </Switch>
        </Router>
    );
}

export default Experiment;
