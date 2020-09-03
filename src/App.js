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
      let input = draftRows[row_index].inputs[input_index];
      input.value = event.target.value;
      // validate
      input.valid =
        !isNaN(event.target.value) &&
        event.target.value >= input.validation.min_value
          ? true
          : false;
    });
    this.setState({ rows: rows });
  };

  onAddRowHandler = (row_index) => {
    let rows = [...this.state.rows]; // shallow copy
    rows.push(create_row_object({ has_focus: true }));
    this.setState({ rows: rows });
  };

  onRemoveRowHandler = (target_row_index) => {
    const rows = this.state.rows.filter(
      (row, index) => index !== target_row_index
    );
    this.setState({ rows: rows });
  };

  onKeyDownHandler = (event, row_index, input_index) => {
    // Add new row on Enter
    // event.which === 13
    if (event.key === "Enter") {
      const last_row = row_index === this.state.rows.length - 1;
      const last_input =
        input_index === this.state.rows[row_index].inputs.length - 1;
      if (last_row && last_input) {
        const rows = [...this.state.rows]; // shallow copy
        rows.push(create_row_object({ has_focus: true }));
        this.setState({ rows: rows });
      }
    }

    // Delete row on Delete button
    if (event.key === "Delete") {
      const rows = this.state.rows.filter((row, index) => index !== row_index);
      this.setState({ rows: rows });
    }
  };

  onWorkDescriptionChangeHandler = (event, row_index) => {
    // immutable array item update
    const rows = produce(this.state.rows, (draftRows) => {
      let work_description = draftRows[row_index].work_description;
      work_description.value = event.target.value;
      // validate
      work_description.valid = event.target.value.trim() ? true : false;
    });
    this.setState({ rows: rows });
  };

  render() {
    return (
      <>
        {/* loop Rows */}
        {this.state.rows.map((row, row_index) => (
          <Row
            key={row_index}
            work_description_placeholder={row.work_description.placeholder}
            work_description_value={row.work_description.value}
            row_index={row_index}
            add_row={this.onAddRowHandler}
            remove_row={this.onRemoveRowHandler}
            on_work_description_change={this.onWorkDescriptionChangeHandler}
            rows_length={this.state.rows.length}
          >
            {/* Loop RowFields */}
            {Object.values(row.inputs).map((input, input_index) => (
              <RowInput
                key={input_index}
                row_index={row_index}
                input_name={input.name}
                input_value={input.value}
                input_index={input_index}
                has_focus={row.has_focus}
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
