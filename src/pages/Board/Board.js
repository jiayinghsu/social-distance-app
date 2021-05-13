import React, {useState} from "react";
import Board1 from "./Board1";
import Board2 from "./Board2";
import Board3 from "./Board3";
import Board4 from "./Board4";
import Board5 from "./Board5";
import Board6 from "./Board6";
import {fromLocalStorage,toLocalStorage, removeLocalStorage} from "../../components/helpers";
import {StyledButton} from "../SliderPage";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Alert} from "react-st-modal";


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
      }
    ;
      h1 {
        padding: 0;
        margin: auto 0;
      }
    \`  ;
    `;

    const nameData = fromLocalStorage("names", {});
    //const names = Object.keys(nameData);
    let names = Object.entries(nameData).filter(([k, v]) => v !== -1);
    names = Object.fromEntries(names);
    names = Object.entries(names).map(([name, listId]) => name);
    // turn object into a list
    const duplicatedNames = [...names]

    let selectedNames = [duplicatedNames[0], duplicatedNames[1], duplicatedNames[3], duplicatedNames[7], duplicatedNames[11], duplicatedNames[13], duplicatedNames[14]]

    const [entries, setEntries] = useState(selectedNames.map((name) => fromValue(name,)))

    const removeFirstEntry = () => {
        if (entries.length > 1) {
            setEntries(entries.slice(1));
        }
    }

    let name = entries[0].name

    //function receive input
    function selectOption(boardIndex, id, status) {
        let object = {boardIndex: boardIndex, id: id, status: status}

        //setArray([boardIndex, id, status])

        //array.map((status) => showStatus(status,))
        /*        if (array[0] === 1 && array[2] === true) {
                    setCond1(true);
                } else if (array[0] === 2 && array[2] === true) {
                    setCond2(true);
                } else if (array[0] === 3 && array[2] === true) {
                    setCond3(true);
                } else if (array[0] === 4 && array[2] === true) {
                    setCond4(true);
                } else if (array[0] === 5 && array[2] === true) {
                    setCond5(true);
                } else if (array[0] === 6 && array[2] === true) {
                    setCond6(true);
                };*/

        toLocalStorage(`Game_${name}_board${boardIndex}`, object);
    }


    /*     const [cond1, setCond1] = useState(false);
         const [cond2, setCond2] = useState(false);
         const [cond3, setCond3] = useState(false);
         const [cond4, setCond4] = useState(false);
         const [cond5, setCond5] = useState(false);
         const [cond6, setCond6] = useState(false);*/


    /*    console.log(localStorage)
        removeLocalStorage("Game_asd _board6")*/

    async function onContinue() {
        //console.log(localStorage)
        let cond1 = false;
        let cond2 = false;
        let cond3 = false;
        let cond4 = false;
        let cond5 = false;
        let cond6 = false;

        let i;
        for (i=1; i<7; i++){

            const boardData = fromLocalStorage(`Game_${name}_board${i}`, {});
            const board = Object.values(boardData)

            if (board[0] === 1 && board[2] === true) {
                //setCond1(true);
                cond1 = true;
            } else if (board[0] === 2 && board[2] === true) {
                //setCond2(true);
                cond2 = true;
            } else if (board[0] === 3 && board[2] === true) {
                //setCond3(true);
                cond3 = true;
            } else if (board[0] === 4 && board[2] === true) {
                //setCond4(true);
                cond4 = true;
            } else if (board[0] === 5 && board[2] === true) {
                //setCond5(true);
                cond5 = true;
            } else if (board[0] === 6 && board[2] === true) {
                //setCond6(true);
                cond6 = true;
            };
        }

        if (cond1 === false || cond2===false || cond3 === false || cond4 === false || cond5===false || cond6===false){
            await Alert( "You need to finish all six game boards before proceeding to the next trial!","OOPS!")
        } else {
            removeFirstEntry();
        }
    }

    let button;
    if (entries.length > 1) {
        button = <StyledButton
            onClick={onContinue}>
            Submit
        </StyledButton>;
    } else {
        button = <Link to="/complete"><StyledButton>Done</StyledButton></Link>;
    }

    // const boardIndex = 0;
    return <PageContainer>
        {[1].map((boardIndex)=>
            <>
                <Board1 name={name}  onRowSelect={(id, status) => selectOption(boardIndex, id, status)}/>
                <br/>
                <br/>
            </>
        )}

        {[2].map((boardIndex)=>
            <>
                <Board2 name={name} onRowSelect={(id, status) => selectOption(boardIndex, id, status)}/>
                <br/>
                <br/>
            </>
        )}

        {[3].map((boardIndex)=>
            <>
                <Board3 name={name} onRowSelect={(id, status) => selectOption(boardIndex, id, status)}/>
                <br/>
                <br/>
            </>
        )}

        {[4].map((boardIndex)=>
            <>
                <Board4 name={name} onRowSelect={(id, status) => selectOption(boardIndex, id, status)}/>
                <br/>
                <br/>
            </>
        )}

        {[5].map((boardIndex)=>
            <>
                <Board5 name={name} onRowSelect={(id, status) => selectOption(boardIndex, id, status)}/>
                <br/>
                <br/>
            </>
        )}

        {[6].map((boardIndex)=>
            <>
                <Board6 name={name} onRowSelect={(id, status) => selectOption(boardIndex, id, status)}/>
                <br/>
                <br/>
            </>
        )}

        {button}
    </PageContainer>


};

export default Board;