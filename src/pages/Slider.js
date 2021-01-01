import React, {useEffect, useState} from 'react';
import BarChart from '../components/Barchart/BarChart';
import 'tachyons';
import '../App.css';
import styled from "styled-components";
import 'react-rangeslider/lib/index.css';
import RangeSlider from "react-rangeslider";
import {fromLocalStorage, toLocalStorage} from "../components/helpers";

const PageContainer = styled.div`
  padding: 40px 100px;

  h1 {
    padding: 0;
    margin: auto 0;
  }
`;

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  /*font-family: Raleway;*/

  > article {
    margin: 0 auto;
    padding: 50px 0 0 0;
    top: 0;
    bottom: 0;
    width: min(100%, 600px);

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

    p {
      text-align: left;
    }
  }

  //override slider default
  .rangeslider .rangeslider__fill {
    background: #23aaff !important;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3) !important;
  }

  .rangeslider .rangeslider__handle {
    outline: none;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3) !important;
  }
`;

export const StyledButton = styled.button`
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
    outline: none;
    border: solid 2px #23aaff;
  }

  &:active {
    color: white;
    background-color: #23aaff;
  }
`;


/* the main thing is that in react, if you want to manage the states,
* the state have to be managed outside of a presentation (pure) component.
*
* Google "control in pure component react".
* */

function fromValue(name, value = null) {
    /* use random value if the value is `null`. */
    if (value === null) value = Math.random();
    return {
        value,
        name,
        you: -10 * value ** 2 + 50,
        opponent: 20 * value + 30
    }
}

export default function SliderPage({}) {
    const nameData = fromLocalStorage("names", {});
    //console.log(nameData);
    const names = Object.keys(nameData);
    //console.log(names)

    //duplicate 3 times
    const duplicatedNames = [...names, ...names, ...names, "You"]

    // randomize items in the list
    duplicatedNames.sort(() => Math.random() - 0.5)

    const [entries, setState] = useState(duplicatedNames.map((name) => fromValue(name,)))
    //console.log(entries)

    function setValue(value) {
        const first = value[0];
        setState([
            fromValue(first, value),
            ...entries.slice(1)
        ]);
    }

    const removeFirstEntry = () => {
        if (entries.length === 1) {
            if (window.confirm("This is the end of the experiment. Thank you for your participation!")) {
                window.open("https://www.amazon.com/gift-cards/b?ie=UTF8&node=2238192011", "_self");
                //window.close();
            }
        } // need to fix this to get rid of the error messages
        setState(entries.slice(1));
    }

    return <PageContainer>
        <h1 className="app-title">
            Part III: Welfare Tradeoff
        </h1>
        <p style={{fontSize: 20}}>
            <p><b>Instruction:</b> Please move the slider to the point where the rewards you and the other receive seem
                the best to you.
                Click submit each time after you finish.
                You will need to trade for about 75 times with different people from your social network in Part II
                until you reach the final completion page,
                where you will receive a reward based on your performance.</p>
        </p>
        <StyledApp className='App'>
            <article>
                {/*show the first one*/
                    entries ?
                        <>
                            <div className="aside">
                                <RangeSlider min={-1.5}
                                             max={1.5}
                                             step={0.05}
                                             tooltip={false}
                                             value={entries[0].value}
                                             onChange={setValue}/>
                            </div>
                            <BarChart className="left" {...entries[0]}/>
                        </>
                        : null}
                <StyledButton onClick={removeFirstEntry}>Submit</StyledButton>
            </article>
        </StyledApp>
    </PageContainer>

}
