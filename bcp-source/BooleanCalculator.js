const path = "./lib/";
const tree = require(path + "tree.js");
const stack = require(path + "stack.js");
const table = require(path + "table.js");
const nameoperator = require(path + "nameoperator.js");

const main = (main_input) => {
  main_input = nameoperator.convertToProperNotation(main_input);
  if (main_input[0] == "^") {
    return main_input.substr(1);
  }

  if (main_input.length == 0) {
    return "Error: Empty Input";
  }

  let orderArray = tree.makeOrderOperation(main_input);
  if (typeof orderArray == "string") {
    return orderArray;
  }

  let data_tree = tree.inputToTree(main_input, orderArray);
  if (typeof data_tree == "string") {
    return data_tree;
  }

  console.log(data_tree);

  let data_stack = stack.createStack(data_tree);
  if (typeof data_stack == "string") {
    return data_stack;
  }

  let data_table = table.createTable(data_stack);
  return data_table;
};

module.exports = {
  default: main,
};
