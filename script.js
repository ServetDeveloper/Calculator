const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = 0;
let previousValue = null;
let operator = null;
let waitingForSecondValue = false;
updateDisplay();

console.log("burdayam");
function updateDisplay() {
  display.value = displayValue;
}

keys.addEventListener("click", (e) => {
  let element = e.target;
  let value = element.value;

  if (!element.matches("button")) return;

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(element.value);
      break;
    case ".":
      updateDecimal();
      break;
    case "clear":
      clear();
      break;
    default:
      updateInput(element.value);
      break;
  }

  updateDisplay();
});

function updateInput(num) {
  if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    displayValue === 0 ? (displayValue = num) : (displayValue += num);
  }
}

function handleOperator(nextOperator) {
  const nextValue = parseFloat(displayValue);

  if (previousValue === null) {
    previousValue = nextValue;
  } else {
    const result = calculate(previousValue, nextValue, operator);
    displayValue = parseFloat(result.toFixed(6));
    previousValue = result;
  }

  waitingForSecondValue = true;
  operator = nextOperator;
}

function calculate(previousValue, nextValue, operator) {
  if (operator === "+") {
    return previousValue + nextValue;
  } else if (operator === "-") {
    return previousValue - nextValue;
  } else if (operator === "*") {
    return previousValue * nextValue;
  } else if (operator === "/") {
    return previousValue / nextValue;
  }

  return nextValue;
}

function updateDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}

function clear() {
  displayValue = 0;
}
