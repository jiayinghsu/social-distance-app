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
    const [count, setCount] = useState(0);

    function addName(listId, name) {
        console.log("addName", listId, name)
        let newState = {...state, [name]: listId};
        setState(newState)
        onChange(newState);
        setCount(count + 1);
        console.log("count", count)
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

    let cond = count >= 15 ? true : false;


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
        <li style={{fontSize: 20}}>
            <b>Family, Spouse or Partner</b> = People with whom you have ties of blood, marriage, or adoption.
        </li>
        <li style={{fontSize: 20}}>
            <b>Friends</b> = People with whom you have a bond of mutual affection, exclusive of sexual or family relations.
        </li>
        <li style={{fontSize: 20}}>
            <b>Neighbors and Colleagues</b> = People who live and work close with you and have frequent interactions with you in formal settings.
        </li>
        <li style={{fontSize: 20}}>
            <b>Acquaintances</b> = People who you know their names but barely have interactions with you.
        </li>
        <li style={{fontSize: 20}}>
            <b>Adversary</b> = People with whom you are competing for resources of any kind (e.g. romantic relationship).
        </li>

        <ColContainer>
            <TodoList className="col"
                      header={"Family, Spouse or Partner"}
                      names={names0}
                      onInput={name => addName(0, name)}
                      removeItem={name => addName(-1, name)}/>
            <TodoList className="col"
                      header={"Friends"}
                      names={names1}
                      onInput={name => addName(1, name)}
                      removeItem={name => addName(-1, name)}/>
            <TodoList className="col"
                      header={'Neighbors and Colleagues'}
                      names={names2}
                      onInput={name => addName(2, name)}
                      removeItem={name => addName(-1, name)}/>
            <TodoList className="col"
                      header={'Acquaintances'}
                      names={names3}
                      onInput={name => addName(3, name)}
                      removeItem={name => addName(-1, name)}/>
            <TodoList className="col"
                      header={'Adversary'}
                      names={names4}
                      onInput={name => addName(4, name)}
                      removeItem={name => addName(-1, name)}/>
        </ColContainer>

        <LocalButton onClick={onContinue} disabled={cond?null:true}>Continue</LocalButton>
    </PageContainer>;
}