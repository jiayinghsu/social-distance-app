import React, {useEffect, useState} from 'react';
import BarChart from './components/Barchart/BarChart';
import 'tachyons';
import './App.css';
import styled from "styled-components";
import 'react-rangeslider/lib/index.css';
import Slider from "react-rangeslider";


const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  
  font-family: Raleway;
  
  > article {
    margin: 0 auto;
    padding: 100px 0 0 0;
    top: 0;
    bottom: 0;
    width: min(80%, 600px);
    
    .aside {
        padding-left: 100px;
        padding-right: 100px;
    }
    .left {
        padding-left: 0;
        padding-right: 100px;
    }
    > div {
        overflow-x: hidden;
    }
    
    p { text-align: left; }
  }
  
  //override slider default
  .rangeslider .rangeslider__fill {
  background: #23aaff !important;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3) !important;
  }
  
  .rangeslider .rangeslider__handle {
  outline:none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3) !important;
  }
`;

const StyledButton = styled.button`
    font-weight: 900;
    
    user-select: none;
    cursor: pointer;
    
    border: solid 2px transparent;
    border-radius: 24px;
    
    padding: 7px 18px;
    line-height: 1.7em;
    
    color: #23aaff;
    background-color: #fafafa;
    
    &:hover, &:focus {
        outline:none;
        border: solid 2px #23aaff;
    }
    &:active {
        color: white;
        background-color: #23aaff;
    }
    
 }
    
`;


export default function App({someProp}) {

    const [state, setState] = useState({you: 0, opponent: 0});

    useEffect(()=> {
        console.log(someProp);
    }, [someProp])

    function setValue(value) {
        setState({
            ...state,
            value,
            you: -10 * value ** 2 + 50,
            opponent: 20 * value + 30
        });
    }

    return <StyledApp className='App'>
        <article>
            <h1>Welfare Tradeoff Task</h1>
            <p className="aside">
                Move the slider to the point where the rewards you and the other receive seem the best to you.
            </p>
            <div className="aside">
                <Slider
                    min={-1.5}
                    max={1.5}
                    step={0.05}
                    tooltip={false}
                    value={state.value}
                    onChange={setValue}
                />
            </div>
            <BarChart className="left" {...state}/>
            <StyledButton>Submit</StyledButton>
        </article>
    </StyledApp>;
}