import React, { Component } from "react";

export const Row = (props) => {
    // Define row buttons
    const row_add_button = (
        <button
            onClick={() => props.add_row(props.row_index)}
            disabled={!props.row_is_valid}
        >
            Add
        </button>
    );
    const row_remove_button = (
        <button onClick={() => props.remove_row(props.row_index)}>
            Remove
        </button>
    );

    let row_buttons;
    if (props.rows_length === 1) row_buttons = row_add_button;
    else if (props.row_index === props.rows_length - 1)
        row_buttons = (
            <>
                {row_add_button}
                {row_remove_button}
            </>
        );
    else row_buttons = row_remove_button;

    return (
        <div>
            <span>{props.row_index + 1}.</span>
            {props.children}
            {row_buttons}
        </div>
    );

}