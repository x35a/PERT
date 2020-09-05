import React, { PureComponent } from "react";

export class WorkDescription extends PureComponent {
    constructor(props) {
        super(props);
        this.work_description_ref = React.createRef();
    }

    componentDidMount() {
        // Add work_description focus
        if (this.props.row.has_focus) this.work_description_ref.current.focus();
    }
    componentDidUpdate(prevProps) {
        // Add work_description focus
        if (
            this.props.row.has_focus &&
            this.props.row.has_focus !== prevProps.row.has_focus
        )
            this.work_description_ref.current.focus();
    }

    render() {
        return (
            <div style={{ display: "inline-block" }}>
                <div>{this.props.work_description.caption}</div>
                <textarea
                    ref={this.work_description_ref}
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
        )
    }
}