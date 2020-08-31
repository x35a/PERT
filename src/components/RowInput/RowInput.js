import React, { Component } from "react";

export class RowInput extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  componentDidMount() {
    if (this.props.has_focus && this.props.input_index === 0)
      this.input.current.focus();
  }

  render() {
    return (
      <div style={{ display: "inline-block" }}>
        <div>{this.props.input_name}</div>
        <input
          ref={this.input}
          type="number"
          value={this.props.input_value}
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
      </div>
    );
  }
}
