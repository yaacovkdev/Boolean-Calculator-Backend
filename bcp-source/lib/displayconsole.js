/*
Outputs Matrix to Console
*/

function displayVariableMatrix(M){

    var output_string = "";
    for(var I = 0; I < M.length; I++){
        if(M[I][0].includes("()"))
            output_string += "Results";
        else
            output_string += (M[I][0] + ' ');
    }

    for(var i = 1; i < M[0].length; i++)
    {
        output_string +=('\n');
        for(var j = 0; j < M.length; j++){
            if(M[j][i])
                output_string +=('1');
            else
                output_string +=('0');
            output_string += (stringSpaces(M[j][0].length));
        }
    }
    return output_string;
}

function stringSpaces(n){
    var str = "";
    for(var i = 0; i < n; i++){
        str += ' ';
    }
    return str;
}

module.exports = {
    displayVariableMatrix
};
