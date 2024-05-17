const util = require("./util.js");
const algebra = require("./algebra.js");

const NOT = ["NOT", "~", "'", "¬"];
const AND = ["AND", "^", "."];
const OR = ["OR", "V"];
const XOR = ["XOR", "EXCLSOR", "EXCLUSIVE OR"];

const BANNEDWORDS = ["error", "result"];

function convertToProperNotation(input){
    let curlybrace = false;
    for(let pos = 0; pos < input.length; pos++){
        if(!curlybrace && input[pos] == '{'){
            curlybrace = true;
            continue;
        } else if(curlybrace && input[pos] == '}'){
            curlybrace = false;
            continue;
        }
        else if(curlybrace){
            continue;
        }


        let AllNames = [];
        AllNames.push(NOT,AND,OR,XOR);

        let k;
        for(let i = 0; i < AllNames.length; i++){
            for(let j of AllNames[i]){
                k = 0;
                for(k; k < j.length; k++){
                    
                    if(j[k] != input[pos+k]){
                        k = 0;
                        break;
                    }
                }
                if(k != 0){
                    input = input.replaceAtSub(pos,pos+k, algebra.operator_priority[i]);
                    break;
                }

            }
            if(k != 0) break;
        }
    }
    
    if(curlybrace){
        
        //Cheap solution to the problem of having a display of proper errors
        return "^Error: Curly Braces Not Closed";
    }
    return input;
}

module.exports = {
    convertToProperNotation
};