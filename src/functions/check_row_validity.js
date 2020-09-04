export const check_row_validity = (row) => {
    let result = true;
    result = result && row.work_description.valid;
    row.inputs.forEach((input) => (result = result && input.valid));
    return result;
};
