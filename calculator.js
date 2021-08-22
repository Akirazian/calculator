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

let firstNumber = 0
let currentOperation = "";
let writeOverCheck = true;
let operatorCheck = false;

function numberPress(event) {
  if (writeOverCheck === true) { 
    if (event.target.innerText === "0") return; //prevent multiple 0's 
    display.innerText = event.target.innerText;
    writeOverCheck = false;
    return;
  } 

  if (display.innerText.includes(".") && event.target.innerText === ".") return; //prevent more than one "."
  display.innerText += event.target.innerText;
}

function clearAll() {
  operationDisplay.innerText = "";
  firstNumber = 0;
  currentOperation = "";
  display.innerText = "0";
  writeOverCheck = true;
  operatorCheck = false;
}

function clearCurrent() {
  display.innerText = "0";
  writeOverCheck = true;
}

function operatorPress(event) {
  if (firstNumber > 0) {
    firstNumber = getAnswer();
    display.innerText = firstNumber;
  }
  firstNumber = +display.innerText;
  currentOperation = event.target.innerText;
  writeOverCheck = true;
  operatorCheck = true;
  operationDisplay.innerText = ` ${firstNumber} ${currentOperation}`;
}

function clearCurrent() {
  display.innerText = "0";
  writeOverCheck = true;
}

function getAnswer() {
  let secondNumber = +display.innerText;
  let answer = operate(firstNumber, secondNumber, currentOperation);
  return Math.round(answer * 100) / 100;
}

function equalsPress() {
  let secondNumber = +display.innerText;
  operationDisplay.innerText = `${firstNumber} ${currentOperation} ${secondNumber} =`;
  display.innerText = getAnswer();
  writeOverCheck = true;
}

numbers.forEach(button => button.addEventListener("click", numberPress));
operators.forEach(button => button.addEventListener("click", operatorPress));
clearAllButton.addEventListener("click", clearAll);
deleteButton.addEventListener("click", clearCurrent);
equalsButton.addEventListener("click", equalsPress);
