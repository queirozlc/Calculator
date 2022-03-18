// Auxiliar DOM Functions
const c = (element) => document.querySelector(element);
const cs = (element) => document.querySelectorAll(element);

// DOM

const numberButtons = cs('[data-number]'),
  operationButtons = cs('[data-operator]'),
  equalButton = c('[data-equal]'),
  deleteButton = c('[data-delete]'),
  allClearButton = c('[data-all-clear]'),
  previousOperandTextElement = c('[data-previous-operand]'),
  currentOperandTextElement = c('[data-current-operand]');

// Managing Calculator

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString(),
      integerDigits = parseFloat(stringNumber.split('.')[0]),
      decimalDigits = stringNumber.split('.')[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let result;
    const _previousOperand = parseFloat(this.previousOperand),
      _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case '+':
        result = _previousOperand + _currentOperand;
        break;

      case '-':
        result = _previousOperand - _currentOperand;
        break;
      case '×':
        result = _previousOperand * _currentOperand;
        break;
      case '÷':
        result = _previousOperand / _currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = '';
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;

    if (this.previousOperand != '') {
      this.calculate();
    }
    this.operation = operation;

    this.previousOperand = `${this.currentOperand}`;
    this.currentOperand = '';
  }

  appendNumber(number) {
    if (this.currentOperand.includes('.') && number === '.') return;

    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  updateDiplay() {
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      `${this.currentOperand || '0'}`
    );

    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )}  ${this.operation || ''}`;
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// Making Controller Events

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDiplay();
});

for (const numberButton of numberButtons) {
  numberButton.addEventListener('click', () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDiplay();
  });
}

for (const operationBtn of operationButtons) {
  operationBtn.addEventListener('click', () => {
    calculator.chooseOperation(operationBtn.innerText);
    calculator.updateDiplay();
  });
}

equalButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateDiplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDiplay();
});
