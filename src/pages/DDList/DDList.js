import React, {Component, useEffect, useState} from 'react';
import './users.css';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {fromLocalStorage, toLocalStorage} from "../../components/helpers";
import {Link} from "react-router-dom";
import {StyledButton} from "../Slider.js"
import styled from "styled-components";

function DDList() {
    let allNames = fromLocalStorage('all_names', );
    if (!allNames) {
        let orderedNames = fromLocalStorage('names', {});
        allNames = Object.entries(orderedNames).map(([name, listId]) => name);
    }
    const [names, setUsers] = useState(allNames)

    const onDragEnd = result => {
        const {destination, source, reason} = result;
        if (!destination || reason === 'CANCEL') return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const users = Object.assign([], names);
        const droppedUser = names[source.index];

        users.splice(source.index, 1);
        users.splice(destination.index, 0, droppedUser);
        setUsers(users);
        toLocalStorage('all_names', users)
    }

    const renderUsers = (name, index) => {
        return <Draggable
            key={index}
            draggableId={index + ' '}
            index={index}>

            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                    <div className='item'>
                        <div>{index + 1}</div>
                        <div className='name'>
                            <div>{name}</div>
                        </div>

                    </div>
                </div>
            )}

        </Draggable>
    }

    const PageContainer = styled.div`
      padding: 40px 100px;

      h1 {
        padding: 0;
        margin: auto 0;
      }
    `;

    return <PageContainer>
        <DragDropContext onDragEnd={onDragEnd}>
            <h1 className="app-title">
                Part II: Rank Relationships
            </h1>
            <p style={{fontSize: 20}}>
                <p><b>Instruction:</b> Please rank the people below based on the closeness of your relationships by dragging and dropping their names. The person at #1 would be
                    someone you know well and is your closest friend or relative. The person at #15 or more might be someone
                    you feel most distant. Once finished, please press the continue button to the next page.</p>
            </p>
                <div className='users'>
                    <Droppable droppableId="dp1">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {names.map(renderUsers)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                <Link to="/social-distance-app/tradeoff" style={{display: "block", marginTop: "15px"}}><StyledButton>Continue</StyledButton></Link>
        </DragDropContext>
    </PageContainer>
}

export default DDList

