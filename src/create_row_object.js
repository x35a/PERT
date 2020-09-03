import cloneDeep from "lodash.clonedeep";

const default_row_object = {
  work_description: {
    placeholder: "Work Description",
    value: "",
    validation: {
      // required: true,
      error_message: "This field is required"
    },
    valid: false
  },
  has_focus: false,
  inputs: [
    {
      key: "min",
      name: "Min", // placeholder?
      value: 0,
      validation: {
        // required: true,
        min_value: 0,
        error_message: "Value can't be negative"
      },
      valid: true
    },
    {
      key: "guess",
      name: "Guess",
      value: 0,
      validation: {
        // required: true,
        min_value: 0,
        error_message: "Value can't be negative"
      },
      valid: true
    },
    {
      key: "max",
      name: "Max",
      value: 0,
      validation: {
        // required: true,
        min_value: 0,
        error_message: "Value can't be negative"
      },
      valid: true
    }
  ]
};

export const create_row_object = (source_object = {}) => {
  let row = cloneDeep(default_row_object);
  return Object.assign(row, source_object);
};
