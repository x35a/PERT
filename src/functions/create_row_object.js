import cloneDeep from "lodash.clonedeep";
import row_object from '../data/row_object'

export const create_row_object = (source_object = {}) => {
    let new_row_object = cloneDeep(row_object);
    return Object.assign(new_row_object, source_object);
};
