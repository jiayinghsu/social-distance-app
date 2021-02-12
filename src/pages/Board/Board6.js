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
                <input type="radio" name={"board6"} ref={resolvedRef} {...rest} />
            </>
        );
    }
);


function Table({columns, data, onRowSelect}) {
    // Use the state and functions returned from useTable to build your UI
    const [selectedRowId, setSelectedRowId] = useState(null);
    let selectedRowIds = [selectedRowId];

    console.log(selectedRowIds)
    //console.log(selectedRowId)  try pushing this value into the localstorage

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
                    Cell: ({row}) => (
                        <div>
                            <IndeterminateCheckbox
                                onClick={() => {
                                    onRowSelect(row.id, true);
                                }}

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

function Board6({name, onRowSelect}) {

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
            you: "98",
            other: "54"
        },
        {
            you: "96",
            other: "59"
        },
        {
            you: "94",
            other: "63"
        },
        {
            you: "93",
            other: "68"
        },
        {
            you: "91",
            other: "72"
        },
        {
            you: "89",
            other: "76"
        },
        {
            you: "87",
            other: "81"
        },
        {
            you: "85",
            other: "85"
        }
    ];


    return <div>
        <h2 className="app-title">
            Game Board 6
        </h2>


        <Styles>
            <Table columns={columns} data={data} onRowSelect={onRowSelect} />
        </Styles>
    </div>
}

export default Board6;
