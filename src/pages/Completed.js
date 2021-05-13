import React from 'react';
import styled from "styled-components";
//import {Link} from "react-router-dom";
import {StyledButton} from "./SliderPage";
import {fromLocalStorage} from "../components/helpers";

const PageContainer = styled.div`
  padding: 40px 100px;
  h2 {
    padding: 0;
    margin: auto 0;
    text-align: center;
    margin-top: 80px;
  }
`;

function addHidden(id, value){
    let input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", id);
    input.setAttribute("value", value);
    return(input);
}

function postSona(client){
    const form = document.createElement('form');
    form.method = 'GET';
    form.action = 'https://ucsd.sona-systems.com/webstudy_credit.aspx';
    // systems.com/services/SonaAPI.svc/WebstudyCredit?experiment_id=123&credit_token=9185d436e5f94b1581b0918162f6d7e8&survey_code=XXXX

    form.appendChild(addHidden('experiment_id', client.experiment_id));
    form.appendChild(addHidden('credit_token', client.credit_token));
    form.appendChild(addHidden('survey_code', client.survey_code));

    document.body.appendChild(form);
    form.submit();
}

function Complete() {
    let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    let theUrl = "submit.simple.php";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(JSON.stringify(localStorage))

    // add client data into localstorage

    let data = {}
    for (let i = 0; i < localStorage.length; i++) {
        let k = localStorage.key(i);
        data[k] = localStorage.getItem(k);
    }
    xmlhttp.send(JSON.stringify({client: {sid: 'test'}, data: data}));

    //add sona
    let button;
    button = <StyledButton  onClick={() => postSona(fromLocalStorage("client"))}>Click Me to Get Credit!</StyledButton>;

    return <PageContainer>
        <div>
            <h2>This is the end of the experiment! Thank you for your participation!</h2>
            {/*add finish button postSona()*/}
            {button}
        </div>
    </PageContainer>;
}

export default Complete;
