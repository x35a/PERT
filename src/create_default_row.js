import { field_type } from "./components/RowField/field_type";

// const create_default_row = () => {
//   let row = {};
//   Object.keys(field_type).map((field_key) => (row[field_key] = 0));
//   return row;
// };

// export const default_row = create_default_row();

export const create_default_row = () => {
  let row = {};
  Object.keys(field_type).map((field_key) => (row[field_key] = 0));
  return row;
};
