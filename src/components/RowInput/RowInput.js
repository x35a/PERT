import React, { Component } from "react";

export const RowInput = (props) => {
    return (
        <div style={{ display: "inline-block" }}>
            <div>{props.input.caption}</div>
            <input
                type="number"
                value={props.input.value}
                min="0"
                onChange={(event) =>
                    props.onchange(
                        event,
                        props.row_index,
                        props.input_index
                    )
                }
                onKeyDown={(event) =>
                    props.onkeydown(
                        event,
                        props.row_index,
                        props.input_index
                    )
                }
            />
            {props.input.touched && !props.input.valid ? (
                <div>{props.input.validation.error_message}</div>
            ) : null}
        </div>
    );

}