/*
cases:
0 NOT
1 AND
2 OR
3 XOR (Could be omitted)
*/

const operator_priority = "!*+@";

function checkBoolInput(input){
    if(input == true || input == false){
        return true;
    }
    return false;
}

function operatorPos(charOP){
    for(var i = 0; i < operator_priority.length; i++){
        if(operator_priority[i] == charOP){
            return i;
        }
    }
    return -1;
}

//manual boolean algebra
function solve(left, right, verb){

    switch(verb){
        case 0:
            return !right;
        
        case 1:
            if(left == true && right == true) return true;
            return false;
        case 2:
            if(left == true || right == true) return true;    
            return false;
            
        case 3:
            
            if(left == true && right == false || left == false && right == true) return true;
            return false;
    }
}

module.exports = {
    operator_priority,
    checkBoolInput,
    solve,
    operatorPos
};