class Calculator {
	constructor(previousOperandElement, currentOperandElement) {
		this.previousOperandElement = previousOperandElement;
		this.currentOperandElement = currentOperandElement;
		this.canReset = false;
		this.clear();
	}

	clear() {
		this.previousOperand = '';
		this.currentOperand = '';
		this.operation = undefined;
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	chooseOperation(operation) {
		if (this.currentOperand === '') {
			return;
		}
		if (this.previousOperand !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) {
			return;
		}
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) {
			return;
		}
		switch (this.operation) {
			case '+':
				computation = prev + current;
				break;
			case '-':
				computation = prev - current;
				break;
			case '*':
				computation = prev * current;
				break;
			case '÷':
				computation = prev / current;
				break;
			default:
				return;
		}
		this.canReset = true;
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = '';
	}

	updateDisplay() {
		this.currentOperandElement.innerText = this.currentOperand;
		if (this.operation != null) {
			this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
		} else {
			this.previousOperandElement.innerText = '';
		}
	}
}

const allClearButton = document.querySelector('#allClear-button');
const deleteButton = document.querySelector('#delete-button');
const operationButton = document.querySelectorAll('#operation-button');
const numberButton = document.querySelectorAll('#number-button');
const equalButton = document.querySelector('#equal-button');
const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');

const calculator = new Calculator(
	previousOperandElement,
	currentOperandElement
);

allClearButton.addEventListener('click', () => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
	calculator.delete();
	calculator.updateDisplay();
});

equalButton.addEventListener('click', () => {
	calculator.compute();
	calculator.updateDisplay();
});

numberButton.forEach(button => {
	button.addEventListener('click', () => {
		if (
			calculator.previousOperand === '' &&
			calculator.currentOperand !== '' &&
			calculator.canReset
		) {
			calculator.currentOperand = '';
			calculator.canReset = false;
		}
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operationButton.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});
