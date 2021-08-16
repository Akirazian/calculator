const display = document.querySelector(".display");
const operationDisplay = document.querySelector(".operation-display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearAllButton = document.getElementById("clear-all");
const deleteButton = document.getElementById("delete");
const equalsButton = document.getElementById("equals");

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
  display.innerText = "";
  firstNumber = 0;
  currentOperation = "";
}

function updateDisplay(event) {
  // let operators = ["+", "−", "×", "÷"];
  // let operatorCheck = operators.some(operator => operationDisplay.innerText.includes(operator));
  if (operatorCheck === true) {
    display.innerText = event.target.innerText;
    operatorCheck = false;
    return;
  }
  display.innerText += event.target.innerText;
}

let firstNumber = 0
let currentOperation = "";
let operatorCheck = false;

function callOperator(event) {
  firstNumber = +display.innerText;
  currentOperation = event.target.innerText;
  operatorCheck = true;
  operationDisplay.innerText = firstNumber + currentOperation;
  console.log(firstNumber)
}

function backspace() {
  display.innerText = display.innerText.slice(0, -1);
}

function equals() {
  let secondNumber = +display.innerText;
  let answer = operate(firstNumber, secondNumber, currentOperation);
  operationDisplay.innerText = firstNumber + currentOperation + secondNumber;
  display.innerText = answer;
}

numbers.forEach(button => button.addEventListener("click", updateDisplay));
operators.forEach(button => button.addEventListener("click", callOperator));
clearAllButton.addEventListener("click", clearAll);
deleteButton.addEventListener("click", backspace);
equalsButton.addEventListener("click", equals);
