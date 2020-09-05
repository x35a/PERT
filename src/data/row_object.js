export default {
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
        touched: false // to show validation error msg
    },

    inputs: [
        {
            key: 'min',
            caption: "Min",
            value: 0,
            validation: {
                // required: true,
                min_value: 0,
                error_message: "Value is required and can't be negative"
            },
            valid: true,
            touched: false, // to show validation error msg
            selected: false
        },
        {
            key: 'guess',
            caption: "Guess",
            value: 0,
            validation: {
                // required: true,
                min_value: 0,
                error_message: "Value is required and can't be negative"
            },
            valid: true,
            touched: false, // to show validation error msg
            selected: false
        },
        {
            key: 'max',
            caption: "Max",
            value: 0,
            validation: {
                // required: true,
                min_value: 0,
                error_message: "Value is required and can't be negative"
            },
            valid: true,
            touched: false, // to show validation error msg
            selected: false
        }
    ]
};
