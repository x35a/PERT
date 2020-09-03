import React, { Component } from "react";

export class RowInput extends Component {
  constructor(props) {
    super(props);
    this.inputref = React.createRef();
  }

  componentDidMount() {
    if (this.props.has_focus && this.props.input_index === 0)
      this.inputref.current.focus();
  }

  render() {
    return (
      <div style={{ display: "inline-block" }}>
        <div>{this.props.input.name}</div>
        <input
          ref={this.inputref}
          type="number"
          value={this.props.input.value}
          // min="0"
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
        {console.log(this.props.input.touched, this.props.input.valid)}
        {this.props.input.touched && !this.props.input.valid ? (
          <div>{this.props.input.validation.error_message}</div>
        ) : null}
      </div>
    );
  }
}
