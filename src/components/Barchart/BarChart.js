import React, {Component} from "react";
import NodeGroup from "react-move/NodeGroup";
import {
    getInitialData,
    getAppendedData,
    getTruncatedData,
    getUpdatedData
} from "./helpers.js";
import "./barchart.css";

let barHeight = 45;
let barPadding = 2;
let barColour = "#23aaff";
let widthScale = (d) => Math.abs(d*6.5);

function BarGroup({data: {name}, state: {value, y}, ..._props}) {
    let width = widthScale(value);
    let yMid = barHeight * 0.5;

    return <g className="bar-group" transform={`translate(${200}, ${y})`}>
        <rect
            y={barPadding * 0.5}
            width={width}
            height={barHeight - barPadding}
            style={{fill: barColour, opacity: 1}}
        />
        <text
            className="value-label"
            x={width - 10}
            y={yMid}
            alignmentBaseline="middle"
        >{Math.round(value)}</text>
        <text
            className="name-label"
            x={-10}
            y={yMid}
            alignmentBaseline="middle"
            style={{opacity: 1}}
        >{name}</text>
    </g>;

}

class BarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: getInitialData()
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleAdd() {
        this.setState({
            data: getAppendedData(this.state.data)
        });
    }

    handleRemove() {
        this.setState({
            data: getTruncatedData(this.state.data)
        });
    }

    handleUpdate() {
        this.setState({
            data: getUpdatedData(this.state.data)
        });
    }

    startTransition(d, i) {
        return {value: 0, y: i * barHeight, opacity: 0};
    }

    enterTransition(d) {
        return {value: [d.value], opacity: [1], timing: {duration: 250}};
    }

    updateTransition(d, i) {
        return {value: [d.value], y: [i * barHeight], timing: {duration: 300}};
    }

    leaveTransition(d) {
        return {y: [-barHeight], opacity: [0], timing: {duration: 250}};
    }

    render() {
        const {you, opponent, name, className, ..._props} = this.props;
        const nodes = [{
            name: "You receive: ",
            value: you.toFixed(1)
        }, {
            name: `${name} receives: `,
            value: opponent.toFixed(1)
        }]
        return (
            <div className={className}>
                <svg width="150%" height="100">
                    <g className="chart">
                        <NodeGroup
                            data={nodes}
                            keyAccessor={d => d.name}
                            start={this.startTransition}
                            enter={this.enterTransition}
                            update={this.updateTransition}
                            //leave={this.leaveTransition}
                        >
                            {(nodes) => (
                                <g>
                                    {nodes.map((person, ind) => (
                                        <BarGroup key={ind} {...person}/>
                                    ))}
                                </g>
                            )}
                        </NodeGroup>

                    </g>
                </svg>
            </div>
        );
    }
}

export default BarChart;