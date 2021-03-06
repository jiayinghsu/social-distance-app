import React from "react";
import styled from "styled-components";
import {useTable, useRowSelect} from "react-table";

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

const IndeterminateCheckbox = React.forwardRef(
    ({indeterminate, ...rest}, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                {/*<input type="checkbox" ref={resolvedRef} {...rest} />*/}
                <input type="radio" name={"board1"} ref={resolvedRef} {...rest} />
            </>
        );
    }
);


function Table({columns, data, onRowSelect}) {
    // Use the state and functions returned from useTable to build your UI
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
            //initialState: {selectedRowIds}
        },
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: "selection",

                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({row}) => (
                        <div>
                            <IndeterminateCheckbox
                                onClick={() => {
                                    onRowSelect(row.id, true);

                                }}

                                /*{...row.getToggleRowSelectedProps()}*/
                            />
                        </div>
                    )
                },
                ...columns
            ]);
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
                {rows.slice(0, 10).map((row, i) => {
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


function Board1({name, onRowSelect}) {

    const columns = React.useMemo(
        () => [

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
            you: "85",
            other: "85"
        },
        {
            you: "85",
            other: "76"
        },
        {
            you: "85",
            other: "68"
        },
        {
            you: "85",
            other: "59"
        },
        {
            you: "85",
            other: "50"
        },
        {
            you: "85",
            other: "41"
        },
        {
            you: "85",
            other: "33"
        },
        {
            you: "85",
            other: "24"
        },
        {
            you: "85",
            other: "15"
        }
    ];


    return <div>
        <h1>
            Part IV: Game Board
        </h1>

        <p style={{fontSize: 20}}>
            <b>Instruction:</b> Think about your relationship with this person <b> at the time of the event</b>. Imagine that
            we could pay either you or the person whose names you input in Part I a sum of money that person could use for
            anything he or she wished. The money would be his/hers to keep. Please consider the following choices as if they
            were real money and choose which option you would prefer. You will be making choices by clicking one of the radio buttons below.
            You won't be assigned a new person until you complete <b>ALL</b> six game boards. In this section, you will be asked to make
            money allocation selections for about seven people from your lise. Please click continue once you are finished.
        </p>

        <h2>
            Game Board 1
        </h2>

        <Styles1>
            <Table columns={columns} data={data} onRowSelect={onRowSelect}/>
        </Styles1>
    </div>
}

export default Board1;