import React, {useState} from "react";
import Board1 from "./Board1";
import Board2 from "./Board2";
import Board3 from "./Board3";
import Board4 from "./Board4";
import Board5 from "./Board5";
import Board6 from "./Board6";
import {fromLocalStorage, toLocalStorage} from "../../components/helpers";
import {StyledButton} from "../SliderPage";
import {Link} from "react-router-dom";
import styled from "styled-components";



function fromValue(name) {
    return {
        name
    }
}


function Board() {
    const PageContainer = styled.div`
      padding: 40px 100px;

      h2 {
        padding: 0;
        margin: auto 0;
      };

      h1 {
        padding: 0;
        margin: auto 0;
      }

    \` ;
    `;

    const nameData = fromLocalStorage("names", {});
    const names = Object.keys(nameData);

    // turn object into a list
    const duplicatedNames = [...names]

    // randomize items in the list
    //duplicatedNames.sort(() => Math.random() - 0.5)

    const [entries, setEntries] = useState(duplicatedNames.map((name) => fromValue(name,)))

    const removeFirstEntry = () => {
        if (entries.length > 1) {
            setEntries(entries.slice(2));
        }
    }

    let cond = false;
    const [cond1, setCond1] = useState(false);
    const [cond2, setCond2] = useState(false);
    const [cond3, setCond3] = useState(false);
    const [cond4, setCond4] = useState(false);
    const [cond5, setCond5] = useState(false);
    const [cond6, setCond6] = useState(false);

    if(cond1 === true && cond2 === true && cond3 === true && cond4 === true && cond5 === true && cond6 === true) {
        cond = true;
    }

    const [board1option, setBoard1option] = useState("");
    const [board2option, setBoard2option] = useState("");
    const [board3option, setBoard3option] = useState("");
    const [board4option, setBoard4option] = useState("");
    const [board5option, setBoard5option] = useState("");
    const [board6option, setBoard6option] = useState("");

    let button;
    if (entries.length > 1) {
        button = <StyledButton
            onClick= {()=>{
                removeFirstEntry();
                setBoard1option("");
                setBoard2option("");
                setBoard3option("");
                setBoard4option("");
                setBoard5option("");
                setBoard6option("");
                setCond1(false);
                setCond2(false);
                setCond3(false);
                setCond4(false);
                setCond5(false);
                setCond6(false);
                cond = false;

            }}
            disabled={cond?null:true}>
            Submit
        </StyledButton>;
    } else {
        button = <Link to="/complete"><StyledButton >Done</StyledButton></Link>;
    }

    let name = entries[0].name



    let idx = 8 - entries.length;
    toLocalStorage(`Game_name_${idx}`, entries[0]);
    toLocalStorage(`Game_board1_${idx}`, board1option);
    toLocalStorage(`Game_board2_${idx}`, board2option);
    toLocalStorage(`Game_board3_${idx}`, board3option);
    toLocalStorage(`Game_board4_${idx}`, board4option);
    toLocalStorage(`Game_board5_${idx}`, board5option);
    toLocalStorage(`Game_board6_${idx}`, board6option);

    //removeLocalStorage("Game1_name_0");
    //console.log(localStorage)




    return<PageContainer>
        <Board1 name={name}/>
        <p style={{fontSize: 20}}>Your choice: {board1option}</p>
        <div>
            <select
                className="custom-select"
                value={board1option}
                onChange={(e)=>{
                    const selectedOption=e.target.value;
                    setBoard1option(selectedOption);
                    setCond1(true)
            }}
            >
                <option value="">Select One...</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">F</option>
                <option value="G">G</option>
                <option value="H">H</option>
                <option value="I">I</option>
            </select>
        </div>
        <br/>
        <br/>

        <Board2 name={name}/>
        <p style={{fontSize: 20}}>Your choice: {board2option}</p>
        <div>
            <select
                className="custom-select"
                value={board2option}
                onChange={(e)=>{
                    const selectedOption=e.target.value;
                    setBoard2option(selectedOption);
                    setCond2(true)
                }}
            >
                <option value="">Select One...</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">F</option>
                <option value="G">G</option>
                <option value="H">H</option>
                <option value="I">I</option>
            </select>
        </div>
        <br/>
        <br/>

        <Board3 name={name}/>
        <p style={{fontSize: 20}}>Your choice: {board3option}</p>
        <div>
            <select
                className="custom-select"
                value={board3option}
                onChange={(e)=>{
                    const selectedOption=e.target.value;
                    setBoard3option(selectedOption);
                    setCond3(true)
                }}
            >
                <option value="">Select One...</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">F</option>
                <option value="G">G</option>
                <option value="H">H</option>
                <option value="I">I</option>
            </select>
        </div>
        <br/>
        <br/>

        <Board4 name={name}/>
        <p style={{fontSize: 20}}>Your choice: {board4option}</p>
        <div>
            <select
                className="custom-select"
                value={board4option}
                onChange={(e)=>{
                    const selectedOption=e.target.value;
                    setBoard4option(selectedOption);
                    setCond4(true)
                }}
            >
                <option value="">Select One...</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">F</option>
                <option value="G">G</option>
                <option value="H">H</option>
                <option value="I">I</option>
            </select>
        </div>
        <br/>
        <br/>

        <Board5 name={name}/>
        <p style={{fontSize: 20}}>Your choice: {board5option}</p>
        <div>
            <select
                className="custom-select"
                value={board5option}
                onChange={(e)=>{
                    const selectedOption=e.target.value;
                    setBoard5option(selectedOption);
                    setCond5(true)
                }}
            >
                <option value="">Select One...</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">F</option>
                <option value="G">G</option>
                <option value="H">H</option>
                <option value="I">I</option>
            </select>
        </div>
        <br/>
        <br/>

        <Board6 name={name}/>
        <p style={{fontSize: 20}}>Your choice: {board6option}</p>
        <div>
            <select
                className="custom-select"
                value={board6option}
                onChange={(e)=>{
                    const selectedOption=e.target.value;
                    setBoard6option(selectedOption);
                    setCond6(true)
                }}
            >
                <option value="">Select One...</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">F</option>
                <option value="G">G</option>
                <option value="H">H</option>
                <option value="I">I</option>
            </select>
        </div>
        <br/>
        {button}
    </PageContainer>


}

export default Board;
