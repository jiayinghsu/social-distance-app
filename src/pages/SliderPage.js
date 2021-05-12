import React, {useEffect, useState} from 'react';
import BarChart from '../components/Barchart/BarChart';
import 'tachyons';
import '../App.css';
import styled from "styled-components";
import 'react-rangeslider/lib/index.css';
import RangeSlider from "react-rangeslider";
import {fromLocalStorage, removeLocalStorage, toLocalStorage} from "../components/helpers";
import {Link} from "react-router-dom";

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
    //margin-left: 50px;
    padding: 50px 0 0 0;
    top: 0;
    bottom: 0;
    width: min(100%, 600px);

    .aside {
      padding-left: 200px;
      padding-right: 0px;
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
  margin-top: 15px;

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
// function randomize(myArray) {
//     myArray = myArray[Math.floor(Math.random() * myArray.length)];
//
//     return myArray
// };

function shuffle(arr) {
    let i;
    let j;
    let temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr[0];
};

function fromValue(name, b = null, value = null) {
    /* use random value if the value is `null`. */
    if (value === null) value = ((Math.random() * (2 + 1)) - 1);
    if (b === null) b = shuffle([8, 26, 16, 10])

    return {
        value,
        name,
        b,
        you: -2 * value ** 2 + b,
        opponent: 4 * value + 10
    }
}

export default function SliderPage({}) {

    // const nameData = fromLocalStorage("names", {});
    // //const names = Object.keys(nameData);
    // let names = Object.entries(nameData).filter(([k, v]) => v !== -1);
    // names = Object.fromEntries(names);
    // names = Object.entries(names).map(([name, listId]) => name);

    //duplicate 3 times
    // const duplicatedNames = [...names, ...names, ...names, "Left", "Right"]

    const duplicatedNames = ["Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Left", "Right",
        "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Left", "Right",
        "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Left", "Right",
        "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Left", "Right",
        "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Left", "Right",
        "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Other", "Left", "Right"]
    // const bs = [8, 26, 16, 10, 8, 26, 16, 10, 8, 26]

    // randomize items in the list
    duplicatedNames.sort(() => Math.random() - 0.5)

    // const [entries, setState] = useState(duplicatedNames.map((name, index) => {
    //    const b = bs[index];
    //    fromValue(name, b, )
    // }))

    const [entries, setState] = useState(duplicatedNames.map((name) => fromValue(name,)))

    const [cond, setCond] = useState(false);


    function setValue(value) {
        const first = entries[0].name;
        const b = entries[0].b;

        setState([
            fromValue(first, b, value),
            ...entries.slice(1)
        ]);

        let idx = 72 - entries.length;

        toLocalStorage(`slider_value${idx}`, entries[0]);
        //removeLocalStorage("slider_value-28");
        //console.log(localStorage)

        setCond(true); // try to figure out ways to make this value turn false after each trial.
    }

    const removeFirstEntry = () => {
        if (entries.length > 1) {
            setState(entries.slice(1));
        } // need to fix this to get rid of the error messages
    }

    let button;
    if (entries.length > 1) {
        button = <StyledButton
            onClick={() =>
            {removeFirstEntry();
            setCond(false);
            }}
            disabled={cond?null:true}>
            Submit
        </StyledButton>;
    } else {
        button = <Link to="/complete"><StyledButton disabled={cond?null:true}>Done</StyledButton></Link>;
    }

    return <PageContainer>
        <h1 className="app-title">
            Part I: Splitting Money
        </h1>
        <p style={{fontSize: 20}}>
            <b>Instruction:</b> Imagine that we could pay either you or another player a sum of money that person could use for
            anything he or she wished. The money would be his/hers to keep. Please choose the slider setting that represents
            the deal you would like best between you and this person. Click submit each time after you finish. You won't be
            able to continue to the next trial until you move the slider. In this section, you will be asked to choose a money allocation
            around 10 times.
        </p>
        <p style={{fontSize: 20}}>
            <b>Attention:</b> Sometimes, instead of an "Other", you will see <span style={{color: "red"}}>"Left receives"</span>,
            where you need to move the slider to the far left, or <span style={{color: "red"}}>"Right receives"</span>,
            where you need to move the slider to the far right.

        </p>
        <StyledApp className='App'>
            <article>
                {/*show the first one*/
                    entries ?
                        <>
                            <div className="aside">
                                <RangeSlider min={-1}
                                             max={2}
                                             step={0.05}
                                             tooltip={false}
                                             value={entries[0].value}
                                             onChange={setValue}/>
                            </div>
                            <BarChart className="left" {...entries[0]}/>

                        </>
                        : null}
                <div style={{marginLeft: "-105px"}}>
                    {button}
                </div>
            </article>
        </StyledApp>
    </PageContainer>

}
