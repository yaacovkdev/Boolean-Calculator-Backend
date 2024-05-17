const algebra = require('./algebra');

function optionsMaker(M){

    let divider = Math.pow(2,M.length);
    
    let c = 0;
    let logic = true;
    for(let i = 0; i < M.length; i++){
        divider /= 2;
        c = 0;
        logic = true;
        for(let j = 1; j < M[i].length; j++){
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

function initLogic(lets){
    for(let i = 0; i < lets.length; i++){
        for(let j = 0; j < Math.pow(2,lets.length); j++){
            
            lets[i].push([]);
        }

    }
    
    lets = optionsMaker(lets);
    return lets;
}

function separateIntoUniqueInputs(stackInp){
    let lets = [];
    let isIn = false;
    for(let i = 0; i < stackInp.length; i++){
        isIn = false;
        for(let j = 0; j < lets.length; j++){
            if(lets[j][0] == stackInp[i]){
                isIn = true;
                break;
            }
        }
        if(algebra.operator_priority.includes(stackInp[i]) || checkLiterals(stackInp[i]) || isIn) continue;
        lets.push([stackInp[i]]);
    }
    return lets;
}

//calculation for a single condition of letiables
function getResult(Notation){
    let Stack = [];
    let n;
    let solution;
    
    for(let i = 0; i < Notation.length; i++){
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
    let LiteralStack = [...Notation];

    //literals mode
    if(Row == 0){
        for(let i = 0; i < Notation.length; i++){
            if(Notation[i] == "TRUE") LiteralStack[i] = true;
            else if(Notation[i] == "FALSE") LiteralStack[i] = false;
        }
    }
    
    //normal mode
    for(let i = 0; i < Notation.length; i++){
        for(let j = 0; j < Matrix.length; j++){
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
    let ResultVector = ["Results"];
    let LiteralStack;

    //if we use only literals
    if(Matrix.length == 0){
        LiteralStack = stackVal(Matrix,Stack,0);
        ResultVector.push(getResult(LiteralStack));
        return ResultVector;
    }

    //until the amount of values of the letiable table
    for(let i = 1; i < Matrix[0].length; i++){
        LiteralStack = stackVal(Matrix,Stack,i);
        ResultVector.push(getResult(LiteralStack));
    }

    return ResultVector;
}

function createTable(stackInput){
    
    let letArray = separateIntoUniqueInputs(stackInput);
    
    letArray = initLogic(letArray);
    
    let ResultVec = generateAllResults(letArray, stackInput);

    mergeVector(ResultVec, letArray);
    
    return letArray;    
}

module.exports = {
    createTable,
    initLogic
}; 