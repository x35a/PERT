import cloneDeep from "lodash.clonedeep";

const row_object = {
    has_focus: false, // row has focus
    is_valid: false,

    work_description: {
        caption: "Work Description",
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
            caption: "Min",
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
            caption: "Guess",
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
            caption: "Max",
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
    let new_row_object = cloneDeep(row_object);
    return Object.assign(new_row_object, source_object);
};
