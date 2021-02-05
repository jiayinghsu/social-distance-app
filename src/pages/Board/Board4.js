import React, {useState} from "react";
import styled from "styled-components";
import { useTable, useRowSelect } from "react-table";


const Styles = styled.div`
  padding: 1rem;
  h2 {
    margin: 10px 18px 0 18px;
    text-align: left;
  }
  
  table {
    border-spacing: 0;
    border: 1px solid gray;
    width: 30%;
    

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid gray;
      border-right: 1px solid gray;
      text-align: center;
      

      :last-child {
        border-right: 0;
        
      }
    }
  }
`;

function Table({ columns, data }) {


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        //selectedFlatRows,
        //state: { selectedRowPaths }
        //state: { selectedRowIds },
    } = useTable(
        {
            columns,
            data,
            autoResetSelectedRows: false,
        }
    );

    //console.log(selectedRowIds);
    //console.log("Some issue - selectedFlatRows prints twice..", selectedFlatRows);

    // Render the UI for your table
    return (
        <>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.slice(0, 9).map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>

        </>
    );
}

function Board4({name}) {

    const columns = React.useMemo(
        () => [
            {
                Header: "Options",
                accessor: "option"
            },
            {
                Header: "You receive",
                accessor: "you"
            },
            {
                Header: `${name} receives`,
                accessor: "other"
            }
        ],
        [name]
    );

    const data = [
        {
            option: "A",
            you: "50",
            other: "100"
        },
        {
            option: "B",
            you: "54",
            other: "89"
        },
        {
            option: "C",
            you: "59",
            other: "79"
        },
        {
            option: "D",
            you: "63",
            other: "68"
        },
        {
            option: "E",
            you: "68",
            other: "58"
        },
        {
            option: "F",
            you: "72",
            other: "47"
        },
        {
            option: "G",
            you: "76",
            other: "36"
        },
        {
            option: "H",
            you: "81",
            other: "26"
        },
        {
            option: "I",
            you: "85",
            other: "15"
        }
    ];


    return <div>
        <h2 className="app-title">
            Game Board 4
        </h2>



        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
    </div>
}

export default Board4;
