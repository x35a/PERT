import React, { Component } from "react";
//import "./styles.css";
import { create_row_object } from "./functions/create_row_object";
import { Row } from "./components/Row/Row";
import { RowInput } from "./components/RowInput/RowInput";
import produce from "immer";
import { WorkDescription } from './components/WorkDescription/WorkDescription'
import { check_row_validity } from './functions/check_row_validity'
import { remove_rows_focus } from './functions/remove_rows_focus'


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
            row.is_valid = check_row_validity(draftRows[row_index]);
        });
        this.setState({ rows: rows });
    };

    onAddRowHandler = (row_index) => {
        const rows = produce(this.state.rows, (draftRows) => {
            // Remove focus on prev row
            remove_rows_focus(draftRows);
            // Add new row
            draftRows.push(create_row_object({ has_focus: true }));
        });
        this.setState({ rows: rows });
    };

    onRemoveRowHandler = (row_index) => {
        // Filter a removed row out
        let filtered_rows = this.state.rows.filter((row, index) => index !== row_index);

        filtered_rows = produce(filtered_rows, (draftRows) => {
            // Remove rows focus
            remove_rows_focus(draftRows);
            // Add focus to the prev row if we remove the very last row. 
            if (row_index === this.state.rows.length - 1) draftRows[draftRows.length - 1].has_focus = true;
        });
        this.setState({ rows: filtered_rows });
    };

    onKeyDownHandler = (event, row_index, input_index) => {
        // Add new row on Enter
        if (event.key === "Enter") {
            const last_row = row_index === this.state.rows.length - 1;
            const last_input = input_index === this.state.rows[row_index].inputs.length - 1;
            if (last_row && last_input && this.state.rows[row_index].is_valid) {
                event.preventDefault(); // prevent new line in new work description textarea
                this.onAddRowHandler(row_index)
            }
        }

        // Delete row on Delete button
        if (event.key === "Delete" && this.state.rows.length > 1) {
            this.onRemoveRowHandler(row_index)
        }
    };

    onWorkDescriptionChangeHandler = (event, row_index) => {
        const rows = produce(this.state.rows, (draftRows) => {
            let work_description = draftRows[row_index].work_description;
            work_description.value = event.target.value;
            // validate
            work_description.valid = event.target.value.trim() ? true : false;
            work_description.touched = true;
            // validate row
            let row = draftRows[row_index];
            row.is_valid = check_row_validity(draftRows[row_index]);
        });
        this.setState({ rows: rows });
    };

    render() {
        return (
            <>
                {/* Loop Rows */}
                {this.state.rows.map((row, row_index) => (
                    <Row
                        key={row_index}
                        row={row}
                        row_index={row_index}
                        rows_length={this.state.rows.length}
                        add_row={this.onAddRowHandler}
                        remove_row={this.onRemoveRowHandler}
                    >
                        <WorkDescription
                            row={row}
                            row_index={row_index}
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
