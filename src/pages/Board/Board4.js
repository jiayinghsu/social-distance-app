import React from "react";
import styled from "styled-components";
import { useTable, useRowSelect } from "react-table";
import {Link} from "react-router-dom";
import {StyledButton} from "../SliderPage.js";

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

function Board4() {
    const columns = React.useMemo(
        () => [
            {
                Header: "You receive",
                accessor: "you"
            },
            {
                Header: "Other receives",
                accessor: "other"
            }
        ],
        []
    );

    const data = [
        {
            you: "50",
            other: "100"
        },
        {
            you: "54",
            other: "89"
        },
        {
            you: "59",
            other: "79"
        },
        {
            you: "63",
            other: "68"
        },
        {
            you: "68",
            other: "58"
        },
        {
            you: "72",
            other: "47"
        },
        {
            you: "76",
            other: "36"
        },
        {
            you: "81",
            other: "26"
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
        <Link to="/board5" style={{display: "block", marginTop: "15px"}}><StyledButton>Continue</StyledButton></Link>
    </PageContainer>
}

export default Board4;
