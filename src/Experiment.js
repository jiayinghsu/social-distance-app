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
                <Route path="/social-distance-app" exact component={Consent}/>
                <Route path="/social-distance-app/list" exact component={Kanban}/>
                <Route path="/social-distance-app/ranking" exact component={DDList}/>
                <Route path='/social-distance-app/tradeoff' exact component={Slider}/>
                <Route path='/social-distance-app/complete' exact component={Complete}/>
                {/*<Route path="/start" exact component={SurveyComponent}/>*/}
            </Switch>
        </Router>
    );
}

export default Experiment;
