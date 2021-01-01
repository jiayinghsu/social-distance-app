import React, {useState} from 'react';
import styled from "styled-components";
import {fromLocalStorage, toLocalStorage} from "../helpers";

const Spacer = styled.div`
    transition: all 0.25s ease;
    padding: ${props => props.dragHover ? '18px' : '0px'} 10px;
    margin: 0;
    background: transparent;
    box-sizing: border-box;
`;

const StyledItem = styled.div`
    padding: 10px;
    margin: 0;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    
    > [draggable=true] {
        cursor: grab;
    }
`;

export default function ListView({className}) {
    let allNames = fromLocalStorage('all_names', []);
    console.log(allNames);
    if (!allNames) {
        let names = fromLocalStorage('names', {});
        allNames = Object.entries(names).map(([name, listId]) => name);
    }

    const [hoverIndex, setHoverIndex] = useState();
    const [dragIndex, setDragIndex] = useState();


    function onDragLeave(index) {
        return (e) => {
            console.log("on drag leave", index);
            e.preventDefault();
            setHoverIndex(null);
        }
    }

    function onDragEnter(index) {
        return (e) => {
            console.log("on drag enter", index);
            e.preventDefault();
            setHoverIndex(index);
        }
    }

    function onDragStart(index) {
        return (e) => {
            setDragIndex(index);
            console.log("on drag start", index);

        }
    }

    function onDragEnd() {
        return (e) => {
            setDragIndex(null);
            console.log("on drag end", hoverIndex);
            toLocalStorage("all_names", [...allNames.slice(0, hoverIndex), allNames[dragIndex], ...allNames.slice(hoverIndex)])
            e.preventDefault();
        }
    }


    return <Container className={className}>
        <div className="spacer"/>
        {allNames.map((name, index) =>
            <>
                <Spacer onDragEnter={onDragEnter(index)}
                        onDragLeave={onDragLeave(index)}
                        dragHover={hoverIndex === index}>{
                    (hoverIndex === index)
                        ? <span>{hoverIndex + 1}. {allNames[dragIndex]}</span>
                        : <span>&nbsp;</span>
                }</Spacer>
                <StyledItem draggable key={index} onDragEnd={onDragEnd()} onDragStart={onDragStart(index)}
                >{index + 1}. {name}</StyledItem>
            </>
        )}
        <Spacer onDragEnter={onDragEnter(allNames.length)}
                onDragLeave={onDragLeave(allNames.length)}
                dragHover={hoverIndex === allNames.length}>
            <div className="bar"/>
        </Spacer>
    </Container>;
}