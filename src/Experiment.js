import React, {useState} from 'react';
import SurveyComponent from './components/Survey/SurveyComponent';
import Slider from './pages/Slider';
import {Route, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';
import Kanban from "./pages/Kanban/Kanban";
import DDList from "./pages/DDList/DDList";
import Complete from "./pages/Completed";
import Consent from "./pages/Consent";

function Experiment() {

    return (
        <Router>
            <Switch>
                <Route path="/welcome" exact component={Consent}/>
                <Route path="/list" exact component={Kanban}/>
                <Route path="/ranking" exact component={DDList}/>
                <Route path='/tradeoff' exact component={Slider}/>
                <Route path='/complete' exact component={Complete}/>
                {/*<Route path="/start" exact component={SurveyComponent}/>*/}
            </Switch>
        </Router>
    );
}

export default Experiment;
