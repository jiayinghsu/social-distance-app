import React from 'react';
import Slider from './pages/SliderPage';
import {Route, Switch} from 'react-router';
import {HashRouter as Router} from "react-router-dom";
import { createBrowserHistory } from 'history';
import Kanban from "./pages/Kanban/Kanban";
import DDList from "./pages/DDList/DDList";
import Board1 from "./pages/Board/Board1";
import Board2 from "./pages/Board/Board2";
import Board3 from "./pages/Board/Board3";
import Board4 from "./pages/Board/Board4";
import Board5 from "./pages/Board/Board5";
import Board6 from "./pages/Board/Board6";
import Consent from "./pages/Consent";
import Break from "./pages/Break";
import Complete from "./pages/Completed";

function Experiment() {
    const history = createBrowserHistory({
        basename: '/social-distance-app'
    });

    return (
        <Router history = {history}>
            <Switch>
                <Route exact path="/" component={Consent}/>
                <Route path="/list" exact component={Kanban}/>
                <Route path="/ranking" exact component={DDList}/>
                <Route path='/tradeoff' exact component={Slider}/>
                <Route path='/break' exact component={Break}/>
                <Route path='/board1' exact component={Board1}/>
                <Route path='/board2' exact component={Board2}/>
                <Route path='/board3' exact component={Board3}/>
                <Route path='/board4' exact component={Board4}/>
                <Route path='/board5' exact component={Board5}/>
                <Route path='/board6' exact component={Board6}/>
                <Route path='/complete' exact component={Complete}/>
            </Switch>
        </Router>
    );
}

export default Experiment;
