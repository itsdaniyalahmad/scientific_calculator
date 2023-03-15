// Variables
const inputField = document.querySelector("#inputField");
const outputField = document.querySelector("#outputField");
const historyLogs = document.querySelector("#history-logs");
const varName = document.querySelector("#variableName");
const varValue = document.querySelector("#variableValue");
let toggleKeyInput = true;
const operators = ["+", "-", "*", "/"];
const constants = ["p", "e", "s", "c", "t", "c", "d", "q"];
const POWER = "POWER(",
  FACTORIAL = "FACTORIAL";
const storageName = "historylogs";
const storageVar = "variablelogs";
let data = {
  operation: [],
  formula: [],
};
let historyStore = [];
let variableStore = [];

//Local Storage Initialize
if (localStorage.getItem(storageName) === null) {
  localStorage.setItem(storageName, JSON.stringify([]));
}
if (localStorage.getItem(storageVar) === null) {
  localStorage.setItem(storageVar, JSON.stringify([]));
}

updateHistory();

//Buttons Array
let calculatorButtons = [
  {
    name: "pi",
    formula: "Math.PI",
    type: "number",
  },
  {
    name: "e",
    formula: "Math.E",
    type: "number",
  },
  {
    name: "(",
    formula: "(",
    type: "number",
  },
  {
    name: ")",
    formula: ")",
    type: "number",
  },
  {
    name: "sin",
    formula: "trigo(Math.sin,",
    type: "trigo_function",
  },
  {
    name: "cos",
    formula: "trigo(Math.cos,",
    type: "trigo_function",
  },
  {
    name: "tan",
    formula: "trigo(Math.tan,",
    type: "trigo_function",
  },
  {
    name: "^",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "+",
    formula: "+",
    type: "operator",
  },
  {
    name: "-",
    formula: "-",
    type: "operator",
  },
  {
    name: "*",
    formula: "*",
    type: "operator",
  },
  {
    name: "/",
    formula: "/",
    type: "operator",
  },
  {
    name: "7",
    formula: 7,
    type: "number",
  },
  {
    name: "8",
    formula: 8,
    type: "number",
  },
  {
    name: "9",
    formula: 9,
    type: "number",
  },
  {
    name: "4",
    formula: 4,
    type: "number",
  },
  {
    name: "5",
    formula: 5,
    type: "number",
  },
  {
    name: "6",
    formula: 6,
    type: "number",
  },
  {
    name: "1",
    formula: 1,
    type: "number",
  },
  {
    name: "2",
    formula: 2,
    type: "number",
  },
  {
    name: "3",
    formula: 3,
    type: "number",
  },
  {
    name: ".",
    formula: ".",
    type: "number",
  },
  {
    name: "0",
    formula: 0,
    type: "number",
  },
  {
    name: "sqrt",
    formula: "Math.sqrt",
    type: "math_function",
  },
  {
    name: "C",
    formula: false,
    type: "key",
  },
  {
    name: "D",
    formula: false,
    type: "key",
  },
  {
    name: "=",
    formula: "=",
    type: "calculate",
  },
  {
    name: "H",
    formula: false,
    type: "key",
  },
];

//Keyboard input
document.addEventListener("keydown", (event) => {
  let getVariableStorage = JSON.parse(localStorage.getItem(storageVar));
  console.log("Hello", getVariableStorage[0].varName);
  if (toggleKeyInput) {
    if (event.key !== "Enter") {
      calculatorButtons.forEach((btn) => {
        for (let i = 0; i < getVariableStorage.length; i++) {
          if (getVariableStorage[i].varName === event.key) {
            console.log("Done");
            data.operation.push(getVariableStorage[i].varValue);
            data.formula.push();
            console.log(data.operation);
            updateOutputOperation(data.operation.join(""));
          }
        }
        if (
          event.key === btn.name ||
          (btn.name === "D" && event.key === "Backspace") ||
          (btn.name === "C" && event.key === "Escape") ||
          (btn.name === "H" && event.key === "h") ||
          (btn.name === "pi" && event.key === "p") ||
          (btn.name === "sin" && event.key === "s") ||
          (btn.name === "cos" && event.key === "c") ||
          (btn.name === "tan" && event.key === "t") ||
          (btn.name === "sqrt" && event.key === "q")
        ) {
          calculator(btn);
        }
      });
    } else {
      Calculate();
    }
  }
});

// variableValue input field
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("variableValue").addEventListener("focus", () => {
    toggleKeyInput = false;
  });
});

// toggleKeyInput On
document.querySelector("body").addEventListener("pointerdown", () => {
  toggleKeyInput = true;
});

// initialize the Variable
let initializeVar = document.querySelector("#initializeVariable");
initializeVar.addEventListener("click", (e) => {
  if (
    (varName.value !== "" && varName.value.length === 1) ||
    varValue.value !== ""
  ) {
    let variableName = varName.value;

    for (let i = 0; i < constants.length; i++) {
      if (variableName !== constants[i]) {
        let variableInitialize = {
          varName: variableName,
          varValue: varValue.value,
        };
        variableStore.push(variableInitialize);
        localStorage.setItem(storageVar, JSON.stringify(variableStore));
        break;
      }
    }
  }
});

// Click on button
let buttons = document.querySelectorAll(".inputbtn");
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log(e.target);

    const btnPressed = e.target;

    calculatorButtons.forEach((btn) => {
      if (btn.name === btnPressed.innerHTML) {
        calculator(btn);
      }
    });
  });
});

//Calculator
function calculator(btn) {
  console.log(btn);
  if (btn.type === "operator") {
    data.operation.push(btn.name);
    data.formula.push(btn.formula);
  } else if (btn.type === "number") {
    data.operation.push(btn.name);
    data.formula.push(btn.formula);
  } else if (btn.type === "trigo_function") {
    data.operation.push(btn.name + "(");
    data.formula.push(btn.formula);
  } else if (btn.type === "math_function") {
    let name, formula;

    if (btn.name === "^") {
      name = "^(";
      formula = btn.formula;
      data.operation.push(name);
      data.formula.push(formula);
    } else {
      name = btn.name + "(";
      formula = btn.formula + "(";
      data.operation.push(name);
      data.formula.push(formula);
    }
  } else if (btn.type === "key") {
    if (btn.name === "C") {
      data.operation = [];
      data.formula = [];
      updateOutputResult("");
    }
    if (btn.name === "D") {
      data.operation.pop();
      data.formula.pop();
    }
  } else if (btn.type === "calculate") {
    Calculate();
  } else {
    document.querySelector("#outputField").value = "Wrong Input";
  }
  console.log(data.operation);
  console.log(data.formula);
  updateOutputOperation(data.operation.join(""));
}

//Perform Trignometric Operations
function trigo(callback, angle) {
  return callback(angle);
}

//Perform Calculation on the Expression
function Calculate() {
  let result;

  let formulaStr = data.formula.join("");
  try {
    result = eval(formulaStr);
  } catch (e) {
    console.log("Wrong Input");
    data.operation = [];
    data.formula = [];
    result = "Wrong Input";
  }
  let history = {
    input: inputField.value,
    operation: data.operation,
    formula: data.formula,
    result: result,
  };
  historyStore.push(history);
  localStorage.setItem(storageName, JSON.stringify(historyStore));
  console.log("Yolooo", localStorage.getItem(storageName.input));
  updateHistory();
  updateOutputResult(result);
}

//Update Output
function updateOutputOperation(operation) {
  inputField.value = operation;
}

function updateOutputResult(result) {
  console.log(typeof result);
  if (Number(result)) {
    outputField.value = result.toFixed(4);
  } else {
    outputField.value = result;
  }
}

//Update History
function updateHistory() {
  historyLogs.innerHTML = "";

  let logs = JSON.parse(localStorage.getItem(storageName));
  for (let i = logs.length - 1; i >= 0; i--) {
    console.log(logs[i].input);
    const div = document.createElement("div");
    div.className = "historyItem";

    let result = logs[i].result;
    let input = logs[i].input;
    console.log(result, input);

    div.innerHTML = `
        <div>Input: ${truncate(input, 28)}</div>
        <div>Output: ${truncate(result, 28)}</div>
        `;
    historyLogs.appendChild(div);

    div.addEventListener("pointerdown", () => {
      inputField.value = logs[i].input;
      data.operation = logs[i].operation;
      data.formula = logs[i].formula;
    });
  }
}

//Truncating the string to fit within the history section
function truncate(Value, Max) {
  Value = String(Value);
  console.log("Truncate");
  if (Value.length > Max) {
    return Value.substring(0, Max - 3) + "...";
  } else {
    return Value;
  }
}
