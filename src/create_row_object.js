import cloneDeep from "lodash.clonedeep";

const default_row_object = {
  work_description: "",
  has_focus: false,
  inputs: [
    {
      key: "min",
      name: "Min",
      value: 0
    },
    {
      key: "guess",
      name: "Guess",
      value: 0
    },
    {
      key: "max",
      name: "Max",
      value: 0
    }
  ]
};

export const create_row_object = (source_object = {}) => {
  let row = cloneDeep(default_row_object);
  return Object.assign(row, source_object);
};
