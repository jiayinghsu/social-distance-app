import React, {useState} from 'react';
import styled from "styled-components";
import TodoList from "./TodoList";
import {toLocalStorage} from "../helpers";

const ColContainer = styled.div`
    
    height: 100%;
    width: 100%;
    
    display: grid;
    grid-template-columns: auto 350px 350px 350px 350px 350px auto;
    
    .col {
        grid-column: span 1
    }
`;

export default function Kanban({onChange = (object) => toLocalStorage('names', object)}) {
    const [state, setState] = useState({})

    function addName(listId, name) {
        console.log("addName", listId, name)
        let newState = {...state, [name]: listId};
        setState(newState)
        onChange(newState);
    }

    const names0 = Object.entries(state).filter((keyValue) => keyValue[1] === 0).map(([key, value]) => key);
    const names1 = Object.entries(state).filter((keyValue) => keyValue[1] === 1).map(([key, value]) => key);
    const names2 = Object.entries(state).filter((keyValue) => keyValue[1] === 2).map(([key, value]) => key);
    const names3 = Object.entries(state).filter((keyValue) => keyValue[1] === 3).map(([key, value]) => key);
    const names4 = Object.entries(state).filter((keyValue) => keyValue[1] === 4).map(([key, value]) => key);

    // filter by list, create three lists
    return <ColContainer>
        <div className="col" style={{background: "red"}}>left gutter</div>
        <TodoList className="col" header={"Family, Spouse or Partner"} names={names0} onInput={name => addName(0, name)} removeItem={name => addName(-1, name)}/>
        <TodoList className="col" header={"Friends"} names={names1} onInput={name => addName(1, name)} removeItem={name => addName(-1, name)}/>
        <TodoList className="col" header={'Neighbors and Colleagues'} names={names2} onInput={name => addName(2, name)} removeItem={name => addName(-1, name)}/>
        <TodoList className="col" header={'Acquaintances or strangers'} names={names3} onInput={name => addName(3, name)} removeItem={name => addName(-1, name)}/>
        <TodoList className="col" header={'Competitors or People with Conflict of Interest'} names={names4} onInput={name => addName(4, name)} removeItem={name => addName(-1, name)}/>
        <div className="col" style={{background: "red"}}>right gutter</div>
    </ColContainer>;
}