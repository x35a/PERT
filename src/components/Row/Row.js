import React from "react";

export const Row = (props) => (
  <div>
    <span>Work {++props.row_index}</span>
    {props.children}
    <button onClick={() => props.add_fied(props.row_index)}>Add</button>
    <button onClick={() => props.remove_field(props.row_index)}>Remove</button>
  </div>
);
