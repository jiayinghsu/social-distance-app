import React, {useState} from 'react';
import styled from "styled-components";
import TodoList from "./TodoList";
import {removeLocalStorage, toLocalStorage} from "../../components/helpers";
import {StyledButton} from "../SliderPage.js";
import {useHistory} from "react-router-dom";
import {Alert} from "react-st-modal";


const PageContainer = styled.div`
  padding: 40px 100px;

  h1 {
    padding: 0;
    margin: auto 0;
  }
`;

const LocalButton = styled(StyledButton)`
  margin-top: 15px;
`;

const ColContainer = styled.div`

  height: 100%;
  width: 100%;

  display: grid;
  column-gap: 30px;

  @media (max-width: 920px) {
    grid-template-columns: repeat(2, 3fr);
  }
  @media (min-width: 921px) and (max-width: 1220px) {
    grid-template-columns: repeat(3, 4fr);
  }
  @media (min-width: 1221px) and (max-width: 1560px) {
    grid-template-columns: repeat(4, 4fr);
  }
  @media (min-width: 1561px) {
    grid-template-columns: repeat(5, 5fr);
  }


  .col {
    grid-column: span 1
  }
`;


export default function Kanban({onChange = (object) => toLocalStorage('names', object)}) {
    const [state, setState] = useState({})

    function addName(listId, name) {
        let newState = {...state, [name]: listId};
        setState(newState)
        onChange(newState);

    }



    const names0 = Object.entries(state).filter((keyValue) => keyValue[1] === 0).map(([key, value]) => key);
    const names1 = Object.entries(state).filter((keyValue) => keyValue[1] === 1).map(([key, value]) => key);
    const names2 = Object.entries(state).filter((keyValue) => keyValue[1] === 2).map(([key, value]) => key);
    const names3 = Object.entries(state).filter((keyValue) => keyValue[1] === 3).map(([key, value]) => key);
    const names4 = Object.entries(state).filter((keyValue) => keyValue[1] === 4).map(([key, value]) => key);

    const history = useHistory();

    async function onContinue() {
        if (names0.length!==3 || names1.length!==3 || names2.length!==3 || names4.length!==3){
            await Alert( "Each category must have exactly three names!","OOPS!")
        } else {
            removeLocalStorage("all_names");
            history.push("/ranking");
        }
    }


    // filter by list, create three lists
    return <PageContainer>
        <h1 className="app-title">
            Part I: List Relationships
        </h1>
        <p style={{fontSize: 20}}>
            <b>Instruction:</b> Please input the first name of three people in each of the five categories
                below. Make sure each name you put in the category is unique. If you have two people with the same first name,
                please include the beginning of their last name or some other information to help you keep track of which is which.
                Press enter to add names. You can delete a name by hovering your mouse over the name and clicking the delete button.
                Once finished, please press the continue button go to the next page.
                You will not be able to change the names after you press the continue button. In each box is a definition of that relationship category.
        </p>


        <ColContainer>
            <TodoList className="col"
                      header={"Family+"}
                      definition={"Parents, spouses/partners, children, or siblings."}
                      names={names0}
                      onInput={name => addName(0, name)}
                      disableInput={names0.length >= 3}
                      removeItem={name => addName(-1, name)}/>
            <TodoList className="col"
                      header={"Friends"}
                      definition={"People outside your family with whom you like to spend time."}
                      names={names1}
                      onInput={name => addName(1, name)}
                      disableInput={names1.length >= 3}
                      removeItem={name => addName(-1, name)}/>
            <TodoList className="col"
                      header={'Neighbors and Colleagues'}
                      definition={"People who frequently interact with you outside of your friends and family."}
                      names={names2}
                      onInput={name => addName(2, name)}
                      disableInput={names2.length >= 3}
                      removeItem={name => addName(-1, name)}/>
            <TodoList className="col"
                      header={'Acquaintances'}
                      definition={"People whose names you know but who you rarely interact with."}
                      names={names3}
                      onInput={name => addName(3, name)}
                      disableInput={names3.length >= 3}
                      removeItem={name => addName(-1, name)}/>
            <TodoList className="col"
                      header={'Adversary'}
                      definition={"People with whom you are competing for resources or have negative relationships. Public figures (e.g. Donald Trump) are included."}
                      names={names4}
                      onInput={name => addName(4, name)}
                      disableInput={names4.length >= 3}
                      removeItem={name => addName(-1, name)}/>
        </ColContainer>

        <LocalButton onClick={onContinue}>
            Continue
        </LocalButton>
    </PageContainer>;
}