# Boolean Calculator Full Stack Web App

## Introduction

After some time of learning Web development I decided to put my forgotten project as a full stack monolithic application. I want to make it run on an Express server where the server hosts both front-end and back-end on one port. The reason for monolithic is because the Boolean Calculator functionality itself is the most important part of the program, and the client has very miniscule codebase, which could be developed later. Testing the Rest API with the Client has exposed my project to untested bugs, and time has exposed me to the older version of myself.

## Project Setup

1. Make sure you have node v22+ and npm installed

2. Open the terminal in the project root:

   npm install
   npm start

3. Connect to React App

## Usage:

Boolean Calculator (Console) v. 1.1

This calculator is able to find all solutions for boolean equation in the problem, listing the result of all possible values for combination of variables.

INSTRUCTIONS:
In the input field, type the problem you wish to solve. 

The NOT operators are (!, NOT, ~, ', ¬)
The AND operators are (*, AND, ^, .)
The OR operators are (+, OR, V, v)
The XOR (EXCLUSIVE OR) operators are (@, XOR, EXCLSOR)

If you want to use operator characters as variables you must write them inside curly brackets '{', '}'.

example problem: (p AND q) OR (q AND NOT {v})

Note: The software neglects spaces for operators, meaning that if you type in 'v' or 'V' inside a variable name, it will try to use that 
char in the input string as an operator, often resulting in error.

The software is written in javascript and must be started with running BooleanCalculator.js file. 
In Node.js you can start the program with "node BooleanCalculator.js"

Yaacov Kochatkov
