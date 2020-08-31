import React from "react";

export const Row = (props) => (
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
    <button onClick={() => props.add_fied(props.row_index)}>Add</button>
    <button onClick={() => props.remove_field(props.row_index)}>Remove</button>
  </div>
);
