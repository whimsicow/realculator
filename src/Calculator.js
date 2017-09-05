import React, { Component } from 'react';
import Display from "./Display.js";
import Numbers from "./Numbers.js";
import utils from './utils.js';


class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            current: "0",
            display: "0"
        }
    }

    _backHandler = (value) => {
        var {display, current, total} = this.state;
        if (display[display.length -1] === " ") {
            display = display.slice(0, -3);
            current = current.slice(0, -3);
        } else {
            display = display.slice(0, -1);
            current = current.slice(0, -1);
        }

        if (display === "") {
            total = 0;
            display = "0";
            current = "0"
        }

        this.setState ({
            display: display,
            current: current,
            total: total
        })
    }

    _resultHandler = (value) => {
        var {display, total, current} = this.state;
        total = utils.operation(current, total);
        current = String(total);
        display = String(total);
        this.setState ({
            total: total,
            current: current,
            display: display
        })
    }

    _clearHandler = (value) => {
        this.setState({
            display: "0",
            current: "",
            total: 0
        })
    }

    _numberOperationHandler = (val) => {
        var {display: newDisplay, current: newCurrent, total} = this.state;
        if (newDisplay === "0" && val !== "x" && val !== "-" && val !== "/" && val !== "+") {
            newCurrent = val;
            total = Number(val);
            newDisplay = val;
        } else if (val === "x" || val === "-" || val === "/" || val === "+") {
            total = utils.operation(newCurrent, total);
            newCurrent = String(total);
            newCurrent = newCurrent + " " + val + " ";
            newDisplay = newDisplay + " " + val + " "; 
        } else {
            newCurrent = newCurrent + val;
            newDisplay = newDisplay + val;
        }

        this.setState({
            current: newCurrent,
            display: newDisplay,
            total: total
        })
    }

  render() {
    return (
    <table>
        <Display display={this.state.display}/>
        <Numbers 
            numberHandler={this._numberOperationHandler}
            clearHandler={this._clearHandler}
            resultHandler={this._resultHandler}
            backHandler={this._backHandler}
        />
    </table>
    );
  }
}

export default Calculator;