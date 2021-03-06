import React from 'react';
import styled from "styled-components";

const PageContainer = styled.div`
  padding: 40px 100px;
  h2 {
    padding: 0;
    margin: auto 0;
    text-align: center;
    margin-top: 80px;
  }
`;

function Complete() {
    let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    let theUrl = "submit.simple.php";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(JSON.stringify(localStorage))
    let data = {}
    for (let i = 0; i < localStorage.length; i++) {
        let k = localStorage.key(i);
        data[k] = localStorage.getItem(k);
    }
    xmlhttp.send(JSON.stringify({client: {sid: 'test'}, data: data}));

    return <PageContainer>
        <div>
            <h2>This is the end of the experiment! Thank you for your participation!</h2>
        </div>
    </PageContainer>;
}

export default Complete;
