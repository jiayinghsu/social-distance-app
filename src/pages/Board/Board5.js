import React, {useState} from "react";
import styled from "styled-components";
import { useTable, useRowSelect } from "react-table";
import {Link} from "react-router-dom";
import {StyledButton} from "../SliderPage.js";
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
                <input type="radio" ref={resolvedRef} {...rest} />
            </>
        );
    }
);

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds }
    } = useTable(
        {
            columns,
            data
        },
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                // Let's make a column for selection
                {
                    id: "selection",
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    )
                },
                ...columns
            ]);
        }
    );

    // Render the UI for your table
    return (
        <>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
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
                            {row.cells.map((cell) => {
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
    return {
        name
    }
}

function Board5() {
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
        button = <Link to="/board6"><StyledButton>Done</StyledButton></Link>;
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
        [name]
    );

    const data = [
        {
            you: "100",
            other: "50"
        },
        {
            you: "94",
            other: "56"
        },
        {
            you: "88",
            other: "63"
        },
        {
            you: "81",
            other: "69"
        },
        {
            you: "75",
            other: "75"
        },
        {
            you: "69",
            other: "81"
        },
        {
            you: "63",
            other: "88"
        },
        {
            you: "56",
            other: "94"
        },
        {
            you: "50",
            other: "100"
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
            Part IV: Game Board 5
        </h1>

        <p style={{fontSize: 20}}>
            <b>Instruction:</b> In this task we ask you to imagine that you have been randomly paired with people you provided in Part I.
            Both you and the other person will be making choices by clicking one of the radio
            buttons below. Your own choices will produce points for both yourself and the other person. Likewise, the other's
            choice will produce points for him/her and for you. Every point has value: The more points you receive, the better for you,
            and the more points the other person receives, the better for him/her. Please click continue once you are finished.
        </p>

        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
        {button}
    </PageContainer>
}

export default Board5;
