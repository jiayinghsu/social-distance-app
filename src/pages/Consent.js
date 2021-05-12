import React, { useEffect }  from 'react';
import styled from "styled-components";
import {StyledButton} from "./SliderPage";
import {Link} from "react-router-dom";
import {toLocalStorage} from "../../components/helpers";


const PageContainer = styled.div`
  padding: 40px 100px;
  h1 {
    padding: 0;
    margin: auto 0;
    text-align: center;
  }
  h2 {
    padding: 0;
    margin: auto 0;
    text-align: center;
  }
`;

const LocalButton = styled(StyledButton)`
  margin-top: 15px;
`;

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function isSona(){
    let code = getParameterByName("survey_code");
    let sona = getParameterByName("sona");
    if(!(code == null) && !(sona == null)){
        return true;
    } else {
        return false;
    }
}

function parseClient(){
    let client = {};
    if(isSona()){
        // is sona
        client.type = 'sona';
        client.experiment_id = 'myexptid';
        client.credit_token = 'mytoken';
        client.survey_code = getParameterByName("survey_code");
        client.sid = 'sona-' + client.survey_code;
    } else {
        // just a random visitor?
        client.type = 'visitor';
        client.sid = 'visitor-' + Math.random().toString(36).substr(2, 5);
    }
    client.window = {width: $(window).width(), height: $(window).height()};
    client.screen = {width: screen.width, height: screen.height};
    client.userAgent = navigator.userAgent;
    client.score = 0;
    client.bonus = 0;
    return(client);
}

function Consent() {
    useEffect(() => {
        toLocalStorage("client", parseClient());
    }, []);

    return <PageContainer>
        <div>
            <h1>University of California, San Diego</h1>
            <h2>Consent to act as a research subject</h2>
            <p style={{fontSize: 20}}>
                We are conducting a research study to find out more about your social preference. You have been asked to participate because you are an undergraduate here at UCSD. <br />
            </p>
            <p style={{fontSize: 20}}>
                <b>Eligibility requirements:</b> You must use a desktop/laptop computer with a mouse/trackpad to complete the experiment.
            </p>
            <p style={{fontSize: 20}}>
                <b>Procedures:</b> If you agree to participate in this study, the following will happen: <br />
                1. You will sit at the computer and play a series of games. <br />
                2. You will be excluded from the experiment if you fail to pay attention.
            </p>
            <p style={{fontSize: 20}}>
                <b>Risks:</b> No potential risks or discomforts are anticipated except that the task may be slightly boring.
            </p>
            <p style={{fontSize: 20}}>
                <b>Payment/Remuneration:</b> You will receive half an hour of course credit. <span style={{color: 'red'}}>Bonus: You will enter into a lottery. If you are selected by lottery, you will be awarded one of the allocation choices you are going to make in this experiment. Each unit of value in the experiment correspond to  50 cents. The experiment will last approximately 30 minutes.</span>
            </p>
            <p style={{fontSize: 20}}>
                <b>Rights:</b> You may call the UCSD Human Research Protection Program at 858-657-5100 to ask about your rights as a research subject or to report research-related problems.
            </p>
            <p style={{fontSize: 20}}>
                <b>Benefits:</b> There will be no direct benefit to you from these procedures. However, the investigators may learn more about basic questions pertaining to memory, perception, cognition, and learning. This knowledge may have benefits to society in fields ranging from education to design of airplane cockpits, but these benefits will be indirect.
            </p>
            <p style={{fontSize: 20}}>
                <b>Technical problems:</b> <span style={{color: 'red'}}>If the game freezes on the next screen, please try a different browser and/or computer. At the end of the experiment, please enter the version of your system and browser which encountered the problem.</span> If you encounter other technical problems that prevent you from completing the experiment, please send a description of the problems to jix030@ucsd.edu.
            </p>
            <p style={{fontSize: 20}}>
                <b>Explanation:</b> If you have other research-related questions or problems, you may reach us at 858-534-4401.
            </p>
            <p style={{fontSize: 20}}>
                <b>Voluntary nature of participation:</b> Participation in this research is entirely voluntary. You may refuse to participate or withdraw at any time without penalty.
            </p>
            <p style={{fontSize: 20}}>
                <b>Confidentiality</b> Research records will be kept confidential to the extent allowed by law. As with all research, there is also the possibility of loss of confidentiality. Information from participants will be identified by a study number. The database which relates the study number to a specific subject will be maintained in the study coordinator’s office.
            </p>
            <p style={{fontSize: 20}}>
                <b>Copy of consent</b> Feel free to print this page as a copy.
            </p>

        </div>

        <Link to="/tradeoff" style={{display: "block", marginTop: "15px"}}><LocalButton>Click here to consent and agree to participate</LocalButton></Link>
    </PageContainer>;
}

export default Consent;


