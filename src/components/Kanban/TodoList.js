import React, {useState} from 'react';
import styled from "styled-components";
import {X} from "react-feather";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;
const StyledX = styled(X)`
    cursor: pointer;
`;

export default function TodoList({className, header, names, onInput, removeItem}) {
    const [name, setName] = useState('')

    function onChange(event) {
        setName(event.target.value);
    }

    function onSubmit(event) {
        if (event.keyCode === 13) {
            onInput(name);
            setName("");
        }
    }

    return <Container className={className}>
        <div className="col">
            <h1>{header}</h1>
        </div>

        <div className="row">
            <input placeholder="Name" value={name} onKeyUp={onSubmit} onChange={onChange}/>
        </div>
        <div className="row">
            spacer(presentation element)
        </div>
        {names.map(name => <div className="row">
            {name}
            <StyledX onClick={() => removeItem(name)}/>
        </div>)}
    </Container>;
}