import React, { Component } from "react";
import { Data } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class Board extends Component {
    constructor() {
        super();
        this.state = {
            data: Data,
            selectedIndex: null,
            rowEdit: null
        };
    }

    render() {
        const { data } = this.state;

        console.log(this.state.rowEdit);
        return (
            <div>
                <ReactTable
                    ref={this.reactTable}
                    data={data}
                    sortable={false}
                    showPaginationBottom={false}
                    columns={[
                        {
                            Header: "You receive",
                            accessor: "you"
                        },
                        {
                            Header: "Other receives",
                            accessor: "other"
                        }
                    ]}
                    defaultPageSize={9}
                    className="-striped -highlight"
                    getTrProps={(state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                onClick: (e) => {
                                    //console.log("inside");
                                    console.log(rowInfo);
                                    if (rowInfo.index !== this.state.rowEdit) {
                                        this.setState({
                                            rowEdit: rowInfo.index
                                        });
                                    } else {
                                        this.setState({
                                            rowEdit: null
                                        });
                                    }
                                    //console.log(rowInfo.index);
                                    console.log(this.state.rowEdit);
                                },
                                style: {
                                    background:
                                        rowInfo.index === this.state.rowEdit ? "#00afec" : "white",
                                    color:
                                        rowInfo.index === this.state.rowEdit ? "white" : "black"
                                }
                            };
                        } else {
                            return {};
                        }
                    }}
                />
                <br />
            </div>
        );
    }
}

export default Board;
