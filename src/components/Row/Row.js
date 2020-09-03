import React, { Component } from "react";

export class Row extends Component {
  constructor(props) {
    super(props);
    this.work_description_ref = React.createRef();
  }

  componentDidMount() {
    this.focus_work_description(); // Add focus
  }

  componentDidUpdate() {
    this.focus_work_description(); // Add focus
  }

  focus_work_description = () => {
    if (
      this.props.row_has_focus &&
      this.props.row_index === this.props.rows_length - 1
    )
      this.work_description_ref.current.focus();
  };

  render() {
    console.log("row_index", this.props.row_index);

    // Defome row buttons
    const row_add_button = (
      <button
        onClick={() => this.props.add_row(this.props.row_index)}
        disabled={!this.props.row_is_valid}
      >
        Add
      </button>
    );
    const row_remove_button = (
      <button onClick={() => this.props.remove_row(this.props.row_index)}>
        Remove
      </button>
    );

    let row_buttons;
    if (this.props.rows_length === 1) row_buttons = row_add_button;
    else if (this.props.row_index === this.props.rows_length - 1)
      row_buttons = (
        <>
          {row_add_button}
          {row_remove_button}
        </>
      );
    else row_buttons = row_remove_button;

    return (
      <div>
        <span>{++this.props.row_index}.</span>
        <div style={{ display: "inline-block" }}>
          <div>{this.props.work_description.placeholder}</div>
          <textarea
            ref={this.work_description_ref}
            placeholder={this.props.work_description.placeholder}
            value={this.props.work_description.value}
            onChange={(event) =>
              this.props.on_work_description_change(event, this.props.row_index)
            }
          ></textarea>
          {this.props.work_description.touched &&
          !this.props.work_description.valid ? (
            <div>{this.props.work_description.validation.error_message}</div>
          ) : null}
        </div>
        {this.props.children}
        {row_buttons}
      </div>
    );
  }
}
