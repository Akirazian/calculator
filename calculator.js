const display = document.querySelector(".display");
const operationDisplay = document.querySelector(".operation-display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearAllButton = document.getElementById("clear-all");
const deleteButton = document.getElementById("delete");
const equalsButton = document.getElementById("equals");
const decimalButton = document.getElementById("decimal-point");
const plusMinusButton = document.getElementById("plus-minus");
const exponentNumber = document.getElementById("exponent");

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

function power (a, b) {
  return a ** b;
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
    case "^":
      return power(num1, num2);
  }
}

let firstNumber = 0
let currentOperation = "";
let writeOverCheck = true;

function numberPress(event) {
  if (event.type === "click") { 
    if (writeOverCheck === true) { 
      if (event.target.innerText === "0") return; //prevent multiple 0's 
      display.innerText = event.target.innerText;
      writeOverCheck = false;
      return;
    } 

    if (display.innerText.includes(".") && event.target.innerText === ".") return; //prevent more than one "."
    display.innerText += event.target.innerText;
  }

  if (event.type === "keydown") { 
    if (writeOverCheck === true) { 
      if (event.key === "0") return; //prevent multiple 0's 
      display.innerText = event.key;
      writeOverCheck = false;
      return;
    } 
    
    if (display.innerText.includes(".") && event.key === ".") return; //prevent more than one "."
    display.innerText += event.key;
  }
}

function clearAll() {
  operationDisplay.innerText = "";
  firstNumber = 0;
  currentOperation = "";
  display.innerText = "0";
  writeOverCheck = true;
}

function clearCurrent() {
  display.innerText = "0";
  writeOverCheck = true;
}

function operatorPress(event) {
    if (firstNumber != 0 && firstNumber != display.innerText) { //Allows strining together multiple operators
      firstNumber = getAnswer();
      display.innerText = firstNumber;
    };

  if (event.type === "click") {
    firstNumber = +display.innerText;
    currentOperation = event.target.innerText;
    if (event.target.id === "exponent" || event.target.tagName === "SUP") {
      currentOperation = "^"
    }
    writeOverCheck = true;
    operationDisplay.innerText = ` ${firstNumber} ${currentOperation}`;
  }

  if (event.type === "keydown") {
    firstNumber = +display.innerText;
    currentOperation = event.key;
    if (event.key === "-") currentOperation = "−";
    if (event.key === "*") currentOperation = "×";
    if (event.key === "/") currentOperation = "÷";
    writeOverCheck = true;
    operationDisplay.innerText = ` ${firstNumber} ${currentOperation}`;
  }
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
  if (currentOperation === "") return;
  let secondNumber = +display.innerText;
  operationDisplay.innerText = `${firstNumber} ${currentOperation} ${secondNumber} =`;
  display.innerText = getAnswer();
  writeOverCheck = true;
  firstNumber = "0";
  currentOperation = "";
}

function flipSign() {
  if (display.innerText > 0) {
    display.innerText = -Math.abs(display.innerText);
    return;
  };

  if (display.innerText < 0) {
    display.innerText = Math.abs(display.innerText);
    return;
  };
}

numbers.forEach(button => button.addEventListener("click", numberPress));
operators.forEach(button => button.addEventListener("click", operatorPress));
clearAllButton.addEventListener("click", clearAll);
deleteButton.addEventListener("click", clearCurrent);
equalsButton.addEventListener("click", equalsPress);
plusMinusButton.addEventListener("click", flipSign);
document.addEventListener("keydown", (event) => {
  if (+event.key >= 0 || event.key === ".") {
    numberPress(event);
  }
  let operators = ["+", "-", "*", "/", "^"];
  if (operators.indexOf(event.key) > -1) {
    operatorPress(event);
  }
  if (event.key === "Enter") equalsPress();
  if (event.key === "Backspace") display.innerText = display.innerText.slice(0, -1);
  if (event.key === "Delete") clearAll();
});
