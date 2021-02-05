import React from "react";
import styled from "styled-components";
import { useTable } from "react-table";


const Styles1 = styled.div`
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



function Board1({name}) {

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
            you: "85",
            other: "85"
        },
        {
            option: "B",
            you: "85",
            other: "76"
        },
        {
            option: "C",
            you: "85",
            other: "68"
        },
        {
            option: "D",
            you: "85",
            other: "59"
        },
        {
            option: "E",
            you: "85",
            other: "50"
        },
        {
            option: "F",
            you: "85",
            other: "41"
        },
        {
            option: "G",
            you: "85",
            other: "33"
        },
        {
            option: "H",
            you: "85",
            other: "24"
        },
        {
            option: "I",
            you: "85",
            other: "15"
        }
    ];



    return <div>
        <h1 className="app-title">
            Part IV: Game Boards
        </h1>

        <p style={{fontSize: 20}}>
            <b>Instruction:</b> In this task we ask you to imagine that you have been randomly paired with people you provided in Part I.
            Both you and the other person will be making choices by clicking one of the radio
            buttons below. Your own choices will produce points for both yourself and the other person. Likewise, the other's
            choice will produce points for him/her and for you. Every point has value: The more points you receive, the better for you,
            and the more points the other person receives, the better for him/her. Please click continue once you are finished.
        </p>

        <h2 className="app-title">
            Game Board 1
        </h2>

        <Styles1>
            <Table columns={columns} data={data} />
        </Styles1>
    </div>
}

export default Board1;
