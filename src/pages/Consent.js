import React from 'react';
import styled from "styled-components";
import {StyledButton} from "./Slider";
import {Link} from "react-router-dom";


const PageContainer = styled.div`
  padding: 40px 100px;

  h3 {
    padding: 0;
    margin: auto 0;
  }
`;

function Consent() {
    return <PageContainer>
        <div>
            <h3>Instruction for consent form [to be added].</h3>
        </div>
        <Link to="/list" style={{display: "block", marginTop: "15px"}}><StyledButton>Continue</StyledButton></Link>
    </PageContainer>;
}

export default Consent;


