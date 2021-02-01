import React, { useState } from "react";
import styled from "styled-components";
import { useTable, useRowSelect } from "react-table";
import {Link} from "react-router-dom";
import {StyledButton} from "../SliderPage";
import {fromLocalStorage} from "../../components/helpers";

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

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                {/*<input type="checkbox" ref={resolvedRef} {...rest} />*/}
                <input type="radio" name={"choice"} ref={resolvedRef} {...rest} />
            </>
        );
    }
);


function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const [selectedRowId, setSelectedRowId] = useState(null);
    let selectedRowIds = [selectedRowId];
    //console.log(selectedRowId)  try pushing this value into the localstorage

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        //state: { selectedRowPaths }
        //state: { selectedRowIds },
    } = useTable(
        {
            columns,
            data,
            autoResetSelectedRows: false,
            initialState: {selectedRowIds}
        },
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: "selection",

                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox
                                onClick={() => setSelectedRowId(row.id)}
                                //{...row.getToggleRowSelectedProps()}
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

function fromValue(name) {
    /* use random value if the value is `null`. */
    //if (id === null) id = 0;
    return {
        name
    }
}

function Board1() {
    const nameData = fromLocalStorage("names", {});
    const names = Object.keys(nameData);

    // turn object into a list
    const duplicatedNames = [...names]

    // randomize items in the list
    duplicatedNames.sort(() => Math.random() - 0.5)

    const [entries, setState] = useState(duplicatedNames.map((name) => fromValue(name)))

    const removeFirstEntry = () => {
        if (entries.length > 1) {
            setState(entries.slice(1));
        }
    }

    let button;
    if (entries.length > 1) {
        button = <StyledButton onClick={removeFirstEntry}>Submit</StyledButton>;
    } else {
        button = <Link to="/board2"><StyledButton>Done</StyledButton></Link>;
    }

    let name = entries[0].name
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
        []
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

    const PageContainer = styled.div`
      padding: 40px 100px;

      h1 {
        padding: 0;
        margin: auto 0;
      }

    `;

    return <PageContainer>
        <h1 className="app-title">
            Part IV: Trading with Other
        </h1>

        <p style={{fontSize: 20}}>
            <b>Instruction:</b> In this task we ask you to imagine that you have been randomly paired with another person,
            whom we will refer to simply as the "Other." This other person is someone you do not know and that you will not
            knowingly meet in the future. Both you cna the "Other" person will be making choices by clicking one of the radio
            buttons below. Your own choices will produce points for both yourself and the "Other" person. Likewise, the other's
            choice will produce points for him/her and for you. Every point has value: The more points you receive, the better for you,
            and the more points the "Other" receives, the better for him/her. Please click continue once you are finished.
        </p>

        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
        {button}
    </PageContainer>
}

export default Board1;
