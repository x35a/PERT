import cloneDeep from "lodash.clonedeep";

const default_row_object = {
  has_focus: false,
  is_valid: false,
  work_description: {
    placeholder: "Work Description",
    value: "",
    validation: {
      // required: true,
      error_message: "The field is required"
    },
    valid: false,
    touched: false
  },
  inputs: [
    {
      key: "min",
      name: "Min", // placeholder?
      value: 0,
      validation: {
        // required: true,
        min_value: 0,
        error_message: "Value is required and can't be negative"
      },
      valid: true,
      touched: false
    },
    {
      key: "guess",
      name: "Guess",
      value: 0,
      validation: {
        // required: true,
        min_value: 0,
        error_message: "Value is required and can't be negative"
      },
      valid: true,
      touched: false
    },
    {
      key: "max",
      name: "Max",
      value: 0,
      validation: {
        // required: true,
        min_value: 0,
        error_message: "Value is required and can't be negative"
      },
      valid: true,
      touched: false
    }
  ]
};

export const create_row_object = (source_object = {}) => {
  let row = cloneDeep(default_row_object);
  return Object.assign(row, source_object);
};
