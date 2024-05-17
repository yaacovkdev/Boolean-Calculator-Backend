const algebra = require("./algebra.js");
const util = require("./util.js");

//This needs to be gone!
let ErrorThrowingRecursion_traverseCreateTree = false;

//Makes an array of 2 values that make up positions of the parenthesis in the equation
function parenthesisLengths(input) {
  let B = [];
  if (input.length == 0 || input == null) {
    return B;
  }

  let empty_track_a = 0,
    empty_track_b = 0;

  B.push([0, input.length - 1]);
  let variablename = false;
  for (let i = 0; i < input.length; i++) {
    if (input.charAt(i) == "{" && variablename == false) {
      variablename = true;
      continue;
    } else if (input.charAt(i) == "}" && variablename == true) {
      variablename = false;
      continue;
    } else if (
      (input.charAt(i) == "{" && variablename == true) ||
      (input.charAt(i) == "}" && variablename == false)
    ) {
      return "Error: Wrong Symbols In Variable Name";
    }

    if (
      variablename == true &&
      algebra.operator_priority.includes(input.charAt(i))
    ) {
      return "Error: Wrong Symbols In Variable Name";
    }

    if (variablename) continue;

    switch (input.charAt(i)) {
      case "(":
        B.push([i, -1]);
        empty_track_a++;
        empty_track_b = empty_track_a;
        break;
      case ")":
        while (B[empty_track_b][1] != -1) {
          empty_track_b--;
          if (empty_track_b < 0) {
            return "Error: Incorrect Parenthesis";
          }
        }
        B[empty_track_b][1] = i;
        break;
      default:
        break;
    }
  }

  for (let i = 0; i < B.length; i++) {
    if (B[i][1] == -1) {
      return "Error: Incorrect Parenthesis";
    }
  }

  return B;
}

function checkUnmarkedOperation(operatorsArray, place) {
  if (operatorsArray.length == 0) return true;
  for (let i = 0; i < operatorsArray.length; i++) {
    if (operatorsArray[i] == place) return false;
  }
  return true;
}

function makeOrderOperation(inputCommand) {
  let ParenthesisArray = parenthesisLengths(inputCommand);
  //Error Message
  if (typeof ParenthesisArray == "string") {
    return ParenthesisArray;
  }

  let markedOperators = [];

  for (let i = ParenthesisArray.length - 1; i >= 0; i--) {
    for (let j = 0; j < algebra.operator_priority.length; j++) {
      for (let k = ParenthesisArray[i][0]; k <= ParenthesisArray[i][1]; k++) {
        if (
          inputCommand[k] == algebra.operator_priority[j] &&
          checkUnmarkedOperation(markedOperators, k)
        ) {
          markedOperators.push(k);
        }
      }
    }
  }
  return markedOperators;
}

function inputToTree(formula, orderArray) {
  if (formula == "" || formula == null) {
    return null;
  }

  let n = orderArray.length - 1;

  //structure to be used for parsing the full formula
  const big_data = {
    formula: formula,
    order: orderArray,
    pos: [0, formula.length - 1],
    final: false,
  };

  let root = new util.Leaf(big_data);

  root = traverseCreateTree(root);
  if (ErrorThrowingRecursion_traverseCreateTree) {
    ErrorThrowingRecursion_traverseCreateTree = false;
    return "Error: Incorrect Format of Input";
  }
  return root;
}

//works, however an iterative solution can always be made
function traverseCreateTree(Root) {
  if (Root == null || Root.data.final == true) {
    return Root;
  }

  Root = makeIntoNode(Root.data);
  if (typeof Root == "string") {
    ErrorThrowingRecursion_traverseCreateTree = true;
  }

  Root.left = traverseCreateTree(Root.left);
  Root.right = traverseCreateTree(Root.right);
  return Root;
}

//expands a leaf where it has a left and right leaf if possible
function makeIntoNode(data) {
  if (data.order.length == 0) {
    data.formula = util.presentableFormat(data.formula);
    data.final = true;

    return new util.Leaf(data);
  } else if (data.final == true) {
    return new util.Leaf(data);
  }

  let p = data.order.length - 1;

  const m_data = Object.assign({}, data);
  m_data.pos = [...data.pos];

  const l_data = Object.assign({}, data);
  l_data.pos = [...data.pos];

  const r_data = Object.assign({}, data);
  r_data.pos = [...data.pos];

  m_data.formula = data.formula[data.order[p] - data.pos[0]];

  m_data.order = [data.order[p]];
  l_data.order = [];
  r_data.order = [];

  m_data.pos[0] = data.order[p];
  m_data.pos[1] = data.order[p];
  m_data.final = true;

  l_data.pos[0] = data.pos[0];
  l_data.pos[1] = data.order[p] - 1;

  l_data.formula = "";
  for (
    let i = l_data.pos[0] - data.pos[0];
    i <= l_data.pos[1] - data.pos[0];
    i++
  ) {
    l_data.formula += data.formula[i];
  }

  r_data.pos[0] = data.order[p] + 1;
  r_data.pos[1] = data.pos[1];

  r_data.formula = "";
  for (
    let i = r_data.pos[0] - data.pos[0];
    i <= r_data.pos[1] - data.pos[0];
    i++
  ) {
    r_data.formula += data.formula[i];
  }

  for (let i = 0; i < p; i++) {
    if (data.order[i] < data.order[p]) {
      l_data.order.push(data.order[i]);
    } else if (data.order[i] > data.order[p]) {
      r_data.order.push(data.order[i]);
    }
  }

  let node = new util.Leaf(m_data);

  if (m_data.formula == "!") {
    if (l_data.order.length == 0) {
      l_data.formula = util.presentableFormat(l_data.formula);
    }
    if (l_data.formula.length == 0) node.left = null;
    else {
      return "E";
    }
  } else {
    node.left = new util.Leaf(l_data);
  }
  node.right = new util.Leaf(r_data);

  return node;
}

module.exports = {
  makeOrderOperation,
  inputToTree,
};
