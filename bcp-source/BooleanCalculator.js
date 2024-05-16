const path = './lib/';
const tree = require(path+'tree.js');
const stack = require(path+'stack.js');
const table = require(path+'table.js');
const display = require(path+'displayconsole.js');
const nameoperator = require(path+'nameoperator.js');

/*
module.exports.main = function (user_input){
    //sample_input = user_input.trim();
};
*/
var sample_input = "p EXCLUSIVE OR TRUE";

sample_input = nameoperator.convertToProperNotation(sample_input);
if(sample_input[0] == '^'){
    return sample_input.substr(1);
}

if(sample_input.length == 0){
    return "Error: Empty Input";
}

var orderArray = tree.makeOrderOperation(sample_input);
if(typeof(orderArray) == "string"){
    return orderArray;
}

var data_tree = tree.inputToTree(sample_input,orderArray);
if(typeof(data_tree) == "string"){
    return data_tree;
}
 
var data_stack = stack.createStack(data_tree);
if(typeof(data_stack) == "string"){
    return data_stack;
}

var data_table = table.createTable(data_stack);

console.log(display.displayVariableMatrix(data_table));
