import React from 'react';
import styled from "styled-components";
import {StyledButton} from "./SliderPage";
import {Link} from "react-router-dom";


const PageContainer = styled.div`
  padding: 40px 100px;
  h2 {
    padding: 0;
    margin: auto 0;
    text-align: center;
    margin-top: 80px;
  }
`;

const LocalButton = styled(StyledButton)`
  margin-top: 15px;
`;

function Break() {
    return <PageContainer>
        <div>
            <h2>Great job! Now you may take a five-minute break! Please click continue when you are ready to move on to the next part!</h2>
        </div>

        <Link to="/board" style={{display: "block", marginTop: "15px"}}><LocalButton>Continue</LocalButton></Link>
    </PageContainer>;
}

export default Break;


