import React, { PureComponent } from "react";

export class RowInput extends PureComponent {
    constructor(props) {
        super(props)
        this.input_ref = React.createRef();
    }

    componentDidUpdate(prevProps) {
        // Select input value on input focus
        if (this.props.input.selected) this.input_ref.current.select()
    }

    render() {
        return (
            <div style={{ display: "inline-block" }}>
                <div>{this.props.input.caption}</div>
                <input
                    ref={this.input_ref}
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
                    onFocus={() => this.props.input_add_select_handler(this.props.row_index, this.props.input_index)}
                    onBlur={() => this.props.input_remove_select_handler(this.props.row_index, this.props.input_index)}
                />
                {this.props.input.touched && !this.props.input.valid ? (
                    <div>{this.props.input.validation.error_message}</div>
                ) : null}
            </div>
        )
    }
}