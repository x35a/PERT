import React, { Component } from "react";
//import "./styles.css";
import { create_row_object } from "./create_row_object";
import { Row } from "./components/Row/Row";
import { RowInput } from "./components/RowInput/RowInput";
import produce from "immer";
import { WorkDescription } from './components/WorkDescription/WorkDescription'

export default class App extends Component {
    state = {
        rows: [create_row_object({ has_focus: true })]
    };

    onInputChangeHandler = (event, row_index, input_index) => {
        // immutable array item update
        const rows = produce(this.state.rows, (draftRows) => {
            let input = draftRows[row_index].inputs[input_index];
            input.value = event.target.value;
            input.touched = true;
            // validate inputs
            input.valid =
                event.target.value &&
                    !isNaN(event.target.value) &&
                    event.target.value >= input.validation.min_value
                    ? true
                    : false;
            // validate row
            let row = draftRows[row_index];
            row.is_valid = this.check_row_validity(draftRows[row_index]);
        });
        this.setState({ rows: rows });
    };

    onAddRowHandler = (row_index) => {
        // let rows = [...this.state.rows]; // shallow copy
        // rows.push(create_row_object({ has_focus: true }));
        // this.setState({ rows: rows });

        const rows = produce(this.state.rows, (draftRows) => {
            this.remove_rows_focus(draftRows);
            draftRows.push(create_row_object({ has_focus: true }));
        });
        this.setState({ rows: rows });
    };

    onRemoveRowHandler = (row_index) => {
        // let rows = this.state.rows.filter((row, index) => index !== row_index);
        // this.setState({ rows: rows });

        let filtered_rows = this.state.rows.filter((row, index) => index !== row_index); // Filter a removed row
        filtered_rows = produce(filtered_rows, (draftRows) => {
            this.remove_rows_focus(draftRows); // Remove rows focus
            // Add focus to the prev row if we remove the very last row. 
            if (row_index === this.state.rows.length - 1) draftRows[draftRows.length - 1].has_focus = true;
        });
        this.setState({ rows: filtered_rows });
    };

    onKeyDownHandler = (event, row_index, input_index) => {
        // Add new row on Enter
        // event.which === 13
        if (event.key === "Enter") {
            const last_row = row_index === this.state.rows.length - 1;
            const last_input =
                input_index === this.state.rows[row_index].inputs.length - 1;
            if (last_row && last_input) {
                event.preventDefault(); // prevent new line in new work description textarea
                const rows = [...this.state.rows]; // shallow copy
                rows.push(create_row_object({ has_focus: true }));
                this.setState({ rows: rows });
            }
        }

        // Delete row on Delete button
        if (event.key === "Delete") {
            const rows = this.state.rows.filter((row, index) => index !== row_index);
            this.setState({ rows: rows });
        }
    };

    onWorkDescriptionChangeHandler = (event, row_index) => {
        // immutable array item update
        const rows = produce(this.state.rows, (draftRows) => {
            let work_description = draftRows[row_index].work_description;
            work_description.value = event.target.value;
            // validate
            work_description.valid = event.target.value.trim() ? true : false;
            work_description.touched = true;
            // validate row
            let row = draftRows[row_index];
            row.is_valid = this.check_row_validity(draftRows[row_index]);
        });
        this.setState({ rows: rows });
    };

    check_row_validity = (row) => {
        let result = true;
        result = result && row.work_description.valid;
        row.inputs.forEach((input) => (result = result && input.valid));
        return result;
    };

    remove_rows_focus = (rows) =>
        rows.map((row) => {
            row.has_focus = false;
            return row;
        });

    render() {
        return (
            <>
                {/* Loop Rows */}
                {this.state.rows.map((row, row_index) => (
                    <Row
                        key={row_index}
                        row_index={row_index}
                        rows_length={this.state.rows.length}
                        row_has_focus={row.has_focus}
                        row_is_valid={row.is_valid}
                        add_row={this.onAddRowHandler}
                        remove_row={this.onRemoveRowHandler}
                        work_description={row.work_description}
                        on_work_description_change={this.onWorkDescriptionChangeHandler}
                    >
                        <WorkDescription
                            row_index={row_index}
                            row={row}
                            work_description={row.work_description}
                            on_work_description_change={this.onWorkDescriptionChangeHandler}
                        />
                        {/* Loop Inputs */}
                        {Object.values(row.inputs).map((input, input_index) => (
                            <RowInput
                                key={input_index}
                                row_index={row_index}
                                input={input}
                                input_index={input_index}
                                onchange={this.onInputChangeHandler}
                                onkeydown={this.onKeyDownHandler}
                            />
                        ))}
                    </Row>
                ))}
            </>
        );
    }
}
