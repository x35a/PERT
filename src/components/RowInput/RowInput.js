import React, { Component } from "react";

export default class RowInput extends Component {
  render() {
    return (
      <div style={{ display: "inline-block" }}>
        <div>{this.props.input.caption}</div>
        <input
          type="number"
          value={this.props.input.value}
          min="0"
          onChange={(event) =>
            this.props.onchange(
              event,
              this.props.row_index,
              this.props.input_index
            )
          }
          onKeyDown={(event) =>
            this.props.onkeydown(
              event,
              this.props.row_index,
              this.props.input_index
            )
          }
        />
        {this.props.input.touched && !this.props.input.valid ? (
          <div>{this.props.input.validation.error_message}</div>
        ) : null}
      </div>
    );
  }
}
