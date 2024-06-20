const algebra = require("./algebra.js");

function createStack(Root) {
  if (Root == null) return Root;

  let temp_stack = [];
  let stack = [];

  do {
    while (Root != null) {
      if (Root.right != null) {
        temp_stack.push(Root.right);
      }
      temp_stack.push(Root);
      Root = Root.left;
    }

    Root = temp_stack.pop();

    if (
      Root.right != null &&
      temp_stack[temp_stack.length - 1] === Root.right
    ) {
      temp_stack.pop();
      temp_stack.push(Root);
      Root = Root.right;
    } else {
      if (!checkValidOperatorNode(Root)) {
        return "Error: Incorrect Format";
      }
      stack.push(Root.data.formula);
      Root = null;
    }
  } while (temp_stack.length > 0);
  return stack;
}

function checkValidOperatorNode(Node) {
  let f = Node.data.formula;
  if (f == "!" && (Node.left != null || Node.right == null)) {
    return false;
  }

  if (
    algebra.operator_priority.includes(f) &&
    Node.left == null &&
    Node.right == null
  ) {
    return false;
  }

  if (
    Node.data.order.length == 0 &&
    (Node.left != null || Node.right != null)
  ) {
    return false;
  }
  return true;
}

module.exports = {
  createStack,
};
