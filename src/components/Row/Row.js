import React, { Component } from "react";

export default class Row extends Component {
  constructor(props) {
    super(props);
    //this.state = { has_focus: this.props.row_has_focus };
    this.work_description_ref = React.createRef();
  }

  componentDidMount() {
    console.log("Row, componentDidMount");
    if (this.props.row_has_focus) this.work_description_ref.current.focus(); // Add focus
  }
  componentDidUpdate(prevProps) {
    console.log("Row, componentDidUpdate");
    if (
      this.props.row_has_focus &&
      this.props.row_has_focus !== prevProps.row_has_focus
    )
      this.work_description_ref.current.focus(); // Add focus
  }

  // focus_work_description = () => {
  //   if (
  //     this.props.row_has_focus &&
  //     this.props.row_index === this.props.rows_length - 1
  //   )
  //     this.work_description_ref.current.focus();
  // };

  render() {
    // Define row buttons
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
        <span>{this.props.row_index + 1}.</span>
        <div style={{ display: "inline-block" }}>
          <div>{this.props.work_description.caption}</div>
          <textarea
            ref={this.work_description_ref}
            // placeholder={this.props.work_description.caption}
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
