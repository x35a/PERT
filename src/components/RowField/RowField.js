import React from "react";
import { field_type } from "./field_type";

export const RowField = (props) => {
  return (
    <div style={{ display: "inline-block" }}>
      <div>{field_type[props.field_key].name}</div>
      <input
        type="number"
        value={props.field_value}
        onChange={(event) =>
          props.onchange(event, props.row_index, props.field_key)
        }
        onKeyDown={(event) =>
          props.onkeydown(event, props.row_index, props.field_key)
        }
      />
    </div>
  );
};
