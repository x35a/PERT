import React, { Component } from "react";
//import "./styles.css";
import { create_row_object } from "./create_row_object";
import { Row } from "./components/Row/Row";
import { RowInput } from "./components/RowInput/RowInput";
import produce from "immer";

export default class App extends Component {
  state = {
    rows: [create_row_object()] // file create_row_object.js
  };

  onInputChangeHandler = (event, row_index, input_index) => {
    // immutable array item update
    const rows = produce(this.state.rows, (draftRows) => {
      draftRows[row_index].inputs[input_index].value = event.target.value;
    });
    this.setState({ rows: rows });
  };

  onAddFieldHandler = (row_index) => {
    let rows = [...this.state.rows]; // shallow copy
    rows.push(create_row_object());
    this.setState({ rows: rows });
  };

  onRemoveFieldHandler = (target_row_index) => {
    let rows = [...this.state.rows]; // shallow copy
    rows = rows.filter((row, index) => index !== target_row_index);
    this.setState({ rows: rows });
  };

  onKeyDownHandler = (event, row_index, input_index) => {
    //console.log(event.code);
    // Add new row on tab or enter
    if (event.which === 9 || event.which === 13) {
      const last_row = row_index === this.state.rows.length - 1;
      const last_input =
        input_index === this.state.rows[row_index].inputs.length - 1;
      if (last_row && last_input) {
        const rows = [...this.state.rows]; // shallow copy
        rows.push(create_row_object());
        this.setState({ rows: rows });
      }
    }
  };

  render() {
    console.log(this.state);
    return (
      <>
        {/* loop Rows */}
        {this.state.rows.map((row, row_index) => (
          <Row
            key={row_index}
            row_index={row_index}
            add_fied={this.onAddFieldHandler}
            remove_field={this.onRemoveFieldHandler}
          >
            {/* Loop RowFields */}
            {Object.values(row.inputs).map((input, input_index) => (
              <RowInput
                key={input_index}
                row_index={row_index}
                input_name={input.name}
                input_value={input.value}
                input_index={input_index}
                onchange={this.onInputChangeHandler}
                onkeydown={this.onKeyDownHandler}
              />
            ))}
          </Row>
        ))}
      </>
    );
  }
}
