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
    return <PageContainer>
        <div>
            <h2>This is the end of the experiment! Thank you for your participation!</h2>
        </div>
    </PageContainer>;
}

export default Complete;
