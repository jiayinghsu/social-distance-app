import React, {useState} from 'react';
import styled from "styled-components";
import TodoList from "./TodoList";
import {removeLocalStorage, toLocalStorage} from "../../components/helpers";
import {StyledButton} from "../SliderPage.js";
import {useHistory} from "react-router-dom";


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

    const history = useHistory();

    function onContinue() {
        removeLocalStorage("all_names");
        history.push("/ranking")
    }

    const names0 = Object.entries(state).filter((keyValue) => keyValue[1] === 0).map(([key, value]) => key);
    const names1 = Object.entries(state).filter((keyValue) => keyValue[1] === 1).map(([key, value]) => key);
    const names2 = Object.entries(state).filter((keyValue) => keyValue[1] === 2).map(([key, value]) => key);
    const names3 = Object.entries(state).filter((keyValue) => keyValue[1] === 3).map(([key, value]) => key);
    const names4 = Object.entries(state).filter((keyValue) => keyValue[1] === 4).map(([key, value]) => key);

    let cond = false;
    if (names0.length===3 && names1.length===3 && names2.length===3 && names4.length===3) {
        cond = true;
    }

    // filter by list, create three lists
    return <PageContainer>
        <h1 className="app-title">
            Part I: List Relationships
        </h1>
        <p style={{fontSize: 20}}>
            <b>Instruction:</b> Please input the first name of three people in each of the five categories
                below. Make sure each name you put in the category is unique. If you have two people whose first names are the same (e.g. John),
                put in the first as John and the second as John-b.
                Press enter to add names. You can delete a name by hovering your mouse over the name and click the delete button.
                Once finished, please press the continue button to the next page.
                You will not be able to change the names after you press the continue button. The following are definitions of the five relationship categories.
        </p>


        <ColContainer>
            <TodoList className="col"
                      header={"Family+"}
                      definition={"Parents, spouses/partners, children, or siblings."}
                      names={names0}
                      onInput={name => addName(0, name)}
                      removeItem={name => addName(-1, name)}/>
            <TodoList className="col"
                      header={"Friends"}
                      definition={"People with whom you like to spend time with outside of your family."}
                      names={names1}
                      onInput={name => addName(1, name)}
                      removeItem={name => addName(-1, name)}/>
            <TodoList className="col"
                      header={'Neighbors and Colleagues'}
                      definition={"People who frequently interact with you outside of your friends and family."}
                      names={names2}
                      onInput={name => addName(2, name)}
                      removeItem={name => addName(-1, name)}/>
            <TodoList className="col"
                      header={'Acquaintances'}
                      definition={"People who you know their names but rarely interact with."}
                      names={names3}
                      onInput={name => addName(3, name)}
                      removeItem={name => addName(-1, name)}/>
            <TodoList className="col"
                      header={'Adversary'}
                      definition={"People with whom you are competing for resources or have negative relationships."}
                      names={names4}
                      onInput={name => addName(4, name)}
                      removeItem={name => addName(-1, name)}/>
        </ColContainer>

        <LocalButton onClick={onContinue} disabled={cond?null:true}>Continue</LocalButton>
    </PageContainer>;
}