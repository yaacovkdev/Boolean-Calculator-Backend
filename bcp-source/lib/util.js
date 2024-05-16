//2-tree
class Leaf {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

//clears all whitespaces
function clearWhiteSpaces(string){
    return string.replace(/\s/g, "");
}

function presentableFormat(input){
    for(var i = 0; i < input.length; i++)
    {
        if(input[i] == ' ' || input[i] == '_'){
            input = input.replaceAt(i,'_');
        }
        else if(!(input.charCodeAt(i) >= 97 && input.charCodeAt(i) <= 122) 
        && !(input.charCodeAt(i) >= 65 && input.charCodeAt(i) <= 90)){
            input = input.replaceAt(i,'');
            i--;
        }
    }
    input = trimExtraSpaces(input);
    return input;
}

function trimExtraSpaces(input){
    var newstr = "";
    var i = 0;
    while(input[i] == '_'){ i++;}
    
    for(i; i < input.length; i++){
        
        if(i == input.length-1 && input[i] == '_') continue;
        if(input[i] == '_' && input[i+1] == '_') continue;
        newstr += input[i];
    }
    return newstr;
}


function checkValidVariable(input){
    for(var i = 0; i< input.length; i++){
        if(!(input.charCodeAt(i) >= 97 && input.charCodeAt(i) <= 122) 
        && !(input.charCodeAt(i) >= 65 && input.charCodeAt(i) <= 90)){
            return false;
        }
    }
    return true;
}

function claerExtras(input){
    while((input[0] == '(' && input[input.length - 1] == ')') || (input[0] == '{' && input[input.length - 1] == '}')){
        input = input.substr(1, input.length-2);
    }

    return input;
}

module.exports = {
    Leaf,
    claerExtras,
    clearWhiteSpaces,
    presentableFormat,
    checkValidVariable
};

String.prototype.replaceAt = function(index, replacement) {
    if(replacement == ""){
        return this.substr(0, index) + this.substr(index+1);
    }
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

String.prototype.replaceAtSub = function(index_at, index_until, replacement) {
    if(index_until - index_at <= 1){
        return this.replaceAt(index_at, replacement);
    }
    if(replacement == ""){
        return this.substr(0, index_at) + this.substr(index_until);
    }
    return this.substr(0, index_at) + replacement + this.substr(index_until + replacement.length-1);
}

