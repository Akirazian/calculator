const display = document.querySelector(".display");
const operationDisplay = document.querySelector(".operation-display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearAllButton = document.getElementById("clear-all");
const deleteButton = document.getElementById("delete");
const equalsButton = document.getElementById("equals");
const decimalButton = document.getElementById("decimal-point");

function add(a, b) {
  return a + b;
};

function subtract(a, b) {
	return a - b;
};

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(num1, num2, operator) {
  switch(operator) {
    case "+":
      return add(num1, num2);
    case "−":
      return subtract(num1, num2);
    case "×":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
  }
}

function clearAll() {
  operationDisplay.innerText = "";
  firstNumber = 0;
  display.innerText = "0";
  operatorCheck = true;
}

function updateDisplay(event) {
  if (operatorCheck === true) { 
    if (event.target.innerText === "0") return;
    display.innerText = event.target.innerText;
    operatorCheck = false;
    return;
  } 

  if (display.innerText.includes(".") && event.target.innerText === ".") return;
  display.innerText += event.target.innerText;
  
}

let firstNumber = 0
let currentOperation = "";
let operatorCheck = true;

function callOperator(event) {
  firstNumber = +display.innerText;
  currentOperation = event.target.innerText;
  operatorCheck = true;
  operationDisplay.innerText = ` ${firstNumber} ${currentOperation}`;
}

function clearCurrent() {
  display.innerText = "0";
  operatorCheck = true;
}

function equals() {
  let secondNumber = +display.innerText;
  let answer = operate(firstNumber, secondNumber, currentOperation);
  operationDisplay.innerText = `${firstNumber} ${currentOperation} ${secondNumber} =`;
  display.innerText = Math.round(answer * 100) / 100;
  operatorCheck = true;
}

numbers.forEach(button => button.addEventListener("click", updateDisplay));
operators.forEach(button => button.addEventListener("click", callOperator));
clearAllButton.addEventListener("click", clearAll);
deleteButton.addEventListener("click", clearCurrent);
equalsButton.addEventListener("click", equals);
