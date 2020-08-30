import React, { Component } from "react";
//import "./styles.css";
import { Row } from "./components/Row/Row";
import { create_default_row } from "./create_default_row";

export default class App extends Component {
  state = {
    rows: [create_default_row()] // {{ min: 0, guess: 0, max: 0 }}
  };

  onInputChangeHandler = (event, row_index, field_key) => {
    console.log("onchange");
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

  onKeyDownHandler = (event) => {
    console.log("onKeyDownHandler");
    console.log(event.which);
  };

  render() {
    const rows = this.state.rows.map((row_data, row_index) => (
      <Row
        key={row_index}
        row_data={row_data}
        row_index={row_index}
        onchange={this.onInputChangeHandler}
        add_fied={this.onAddFieldHandler}
        remove_field={this.onRemoveFieldHandler}
        onkeydown={this.onKeyDownHandler}
      />
    ));

    return <>{rows}</>;
  }
}
