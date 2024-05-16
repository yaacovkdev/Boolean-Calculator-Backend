const algebra = require('./algebra');

function optionsMaker(M){

    var divider = Math.pow(2,M.length);
    
    var c = 0;
    var logic = true;
    for(var i = 0; i < M.length; i++){
        divider /= 2;
        c = 0;
        logic = true;
        for(var j = 1; j < M[i].length; j++){
            if(c == divider){
                c = 0;
                logic = !logic;
            }
            M[i][j] = logic;
            c++;
        }
    }
    return M;
}

function initLogic(vars){
    for(var i = 0; i < vars.length; i++){
        for(var j = 0; j < Math.pow(2,vars.length); j++){
            
            vars[i].push([]);
        }

    }
    
    vars = optionsMaker(vars);
    return vars;
}

function separateIntoUniqueInputs(stackInp){
    var vars = [];
    var isIn = false;
    for(var i = 0; i < stackInp.length; i++){
        isIn = false;
        for(var j = 0; j < vars.length; j++){
            if(vars[j][0] == stackInp[i]){
                isIn = true;
                break;
            }
        }
        if(algebra.operator_priority.includes(stackInp[i]) || checkLiterals(stackInp[i]) || isIn) continue;
        vars.push([stackInp[i]]);
    }
    return vars;
}

//calculation for a single condition of variables
function getResult(Notation){
    var Stack = [];
    var n;
    var solution;
    
    for(var i = 0; i < Notation.length; i++){
        if(Notation.length == 1){
            return Notation[i];
        }

        if(algebra.checkBoolInput(Notation[i])){
            Stack.push(Notation[i]);
        } else {
            n = algebra.operatorPos(Notation[i]);
            if(n == 0){
                solution = algebra.solve(true,Stack.pop(),n);
            } else {
                solution = algebra.solve(Stack.pop(),Stack.pop(),n);
            }
            
            Stack.push(solution);
        }        
    }
    return solution;
}

function checkLiterals(input){
    if(input == "TRUE" || input == "FALSE") return true;
    return false;
}

//adds result vector to the other vectors
function mergeVector(Vec, Main){
    Main.push(Vec);
}

function stackVal(Matrix, Notation, Row){
    var LiteralStack = [...Notation];

    //literals mode
    if(Row == 0){
        for(var i = 0; i < Notation.length; i++){
            if(Notation[i] == "TRUE") LiteralStack[i] = true;
            else if(Notation[i] == "FALSE") LiteralStack[i] = false;
        }
    }
    
    //normal mode
    for(var i = 0; i < Notation.length; i++){
        for(var j = 0; j < Matrix.length; j++){
            if(Notation[i] == Matrix[j][0]){
                LiteralStack[i] = Matrix[j][Row];
                break;
            }
            else if(Notation[i] == "TRUE"){
                LiteralStack[i] = true;
                break;
            }
            else if(Notation[i] == "FALSE"){
                LiteralStack[i] = false;
                break;
            }
        }
    }
    return LiteralStack;
}

function generateAllResults(Matrix,Stack){
    var ResultVector = ["Results"];
    var LiteralStack;

    //if we use only literals
    if(Matrix.length == 0){
        LiteralStack = stackVal(Matrix,Stack,0);
        ResultVector.push(getResult(LiteralStack));
        return ResultVector;
    }

    //until the amount of values of the variable table
    for(var i = 1; i < Matrix[0].length; i++){
        LiteralStack = stackVal(Matrix,Stack,i);
        ResultVector.push(getResult(LiteralStack));
    }

    return ResultVector;
}

function createTable(stackInput){
    
    var varArray = separateIntoUniqueInputs(stackInput);
    
    varArray = initLogic(varArray);
    
    var ResultVec = generateAllResults(varArray, stackInput);

    mergeVector(ResultVec, varArray);
    
    return varArray;    
}

module.exports = {
    createTable,
    initLogic
}; 