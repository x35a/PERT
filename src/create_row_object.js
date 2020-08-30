import cloneDeep from "lodash.clonedeep";

const default_row_object = {
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
  ],
  hasfocus: false
};

export const create_row_object = () => cloneDeep(default_row_object);
