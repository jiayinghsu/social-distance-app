import React, {useState} from 'react';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  background-color: rgba(35, 170, 255, 0.2);
  border-radius: 20px;
  margin-top: 40px;
  min-height: 450px;
  .row {
    margin: 10px 0;
    border-radius: 21px;
  }
  .title.row {
    //  add min-height to accommodate multi-line headers
    min-height: 61px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    h2 {
      margin: 10px 18px 0 18px;
      text-align: left;
    }
  }
  input.row {
    min-height: 36px;
    border: solid 1px gray;
    padding: 0 12px;
    margin: 15px;
    &:focus {
      outline: none;
      border: solid 1px #23aaff;
    }
  }
  .item.row {
    padding: 0 7px;
    line-height: 32px;
    border-left: solid 4px white;
    border-radius: 0;
    margin: 15px;
    .button {
      cursor: pointer;
      vertical-align: bottom;
      position: absolute;
      right: 0;
      border-radius: 16px;
      padding: 0 12px;
      color: transparent;
    }
    &:hover {
      //box-shadow: 1px 1px 20px red;
      border-left: solid 4px #23aaff;
      .button {
        color: #ff4141;
        background: #fafafa;
        &:hover {
          color: white;
          background: #ff4949;
        }
      }
    }
  }
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
        <div className="title row">
            <h2>{header}</h2>
        </div>
        <input className="row"
               placeholder="Add name"
               value={name}
               onKeyUp={onSubmit}
               onChange={onChange}/>
        {names.map(name => <div className="item row">
            <span>{name}</span>
            <span className="button" onClick={() => removeItem(name)}>delete</span>
        </div>)}
    </Container>;
}