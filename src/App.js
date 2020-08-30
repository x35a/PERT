import React, { Component } from "react";
//import "./styles.css";
import { create_default_row } from "./create_default_row";
import { Row } from "./components/Row/Row";
import { RowField } from "./components/RowField/RowField";
import { field_type } from "./components/RowField/field_type";

export default class App extends Component {
  state = {
    rows: [create_default_row()] // {{ min: 0, guess: 0, max: 0 }}
  };

  onInputChangeHandler = (event, row_index, field_key) => {
    //console.log("onchange");
    const state = { ...this.state };
    state.rows[row_index][field_key] = event.target.value;
    //this.setState({ rows: state.rows });
    this.setState(state);
  };

  onAddFieldHandler = (row_index) => {
    //console.log(default_row);
    const state = { ...this.state };
    //state.rows.push({ min: 0, guess: 0, max: 0 });
    state.rows.push(create_default_row());
    //this.setState({ rows: state.rows });
    this.setState(state);
  };

  onRemoveFieldHandler = (target_row_index) => {
    const state = { ...this.state };
    state.rows = state.rows.filter((row, index) => index !== target_row_index);
    //this.setState({ rows: state.rows });
    this.setState(state);
  };

  onKeyDownHandler = (event, row_index, field_index) => {
    // Add new row on tab or enter
    if (event.which === 9 || event.which === 13) {
      const last_row = row_index === Object.keys(this.state.rows).length - 1;
      const last_field = field_index === Object.keys(field_type).length - 1;
      //console.log(last_row, last_field);
      if (last_row && last_field) {
        const rows = [...this.state.rows];
        rows.push(create_default_row());
        this.setState({ rows: rows });
      }
    }
  };

  render() {
    return (
      <>
        {/* loop Rows */}
        {this.state.rows.map((row_data, row_index) => (
          <Row
            key={row_index}
            row_data={row_data}
            row_index={row_index}
            add_fied={this.onAddFieldHandler}
            remove_field={this.onRemoveFieldHandler}
          >
            {/* Loop RowFields */}
            {Object.entries(row_data).map(
              ([field_key, field_value], field_index) => (
                <RowField
                  key={field_index}
                  row_index={row_index}
                  field_key={field_key}
                  field_value={field_value}
                  field_index={field_index}
                  onchange={this.onInputChangeHandler}
                  onkeydown={this.onKeyDownHandler}
                />
              )
            )}
          </Row>
        ))}
      </>
    );
  }
}
