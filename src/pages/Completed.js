import React from 'react';
import styled from "styled-components";


const PageContainer = styled.div`
  padding: 40px 100px;

  h3 {
    padding: 0;
    margin: auto 0;
  }
`;

function Complete() {
    return <PageContainer>
        <div>
            <h3>Instruction for receiving payments.</h3>
        </div>
        </PageContainer>;
}

export default Complete;


