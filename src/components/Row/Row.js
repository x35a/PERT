import React from "react";
import { RowField } from "../RowField/RowField";

export const Row = (props) => {
  const fields = Object.entries(
    props.row_data
  ).map(([field_key, field_value], field_index) => (
    <RowField
      key={field_index}
      onchange={props.onchange}
      row_index={props.row_index}
      field_key={field_key}
      field_value={field_value}
      onkeydown={props.onkeydown}
    />
  ));

  return (
    <div>
      <span>Work {++props.row_index}</span>
      {fields}
      <button onClick={() => props.add_fied(props.row_index)}>Add</button>
      <button onClick={() => props.remove_field(props.row_index)}>
        Remove
      </button>
    </div>
  );
};
