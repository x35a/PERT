import React, { Component } from "react";
import { field_type } from "./field_type";

export class RowField extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  componentDidMount() {
    this.input.current.focus();
  }

  render() {
    return (
      <div style={{ display: "inline-block" }}>
        <div>{field_type[this.props.field_key].name}</div>
        <input
          ref={this.input}
          type="number"
          value={this.props.field_value}
          onChange={(event) =>
            this.props.onchange(
              event,
              this.props.row_index,
              this.props.field_key
            )
          }
          onKeyDown={(event) =>
            this.props.onkeydown(
              event,
              this.props.row_index,
              this.props.field_index
            )
          }
        />
      </div>
    );
  }
}
