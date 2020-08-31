import React from "react";

export const Row = (props) => {
  // Defome row buttons
  const row_add_button = (
    <button onClick={() => props.add_row(props.row_index)}>Add</button>
  );
  const row_remove_button = (
    <button onClick={() => props.remove_row(props.row_index)}>Remove</button>
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
      <span>{++props.row_index}.</span>
      <div style={{ display: "inline-block" }}>
        <div>Work Descrioption</div>
        <textarea
          value={props.work_description}
          onChange={(event) =>
            props.on_work_description_change(event, props.row_index)
          }
        ></textarea>
      </div>
      {props.children}
      {row_buttons}
    </div>
  );
};
