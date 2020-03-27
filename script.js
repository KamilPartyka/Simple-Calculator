class Calculator {
	constructor(previousOperandElement, currnetOperandElement) {
		this.previousOperandElement = previousOperandElement;
		this.currnetOperandElement = currnetOperandElement;
		this.clear();
	}

	clear() {
		this.previousOperand = '';
		this.currnetOperand = '';
		this.operation = undefined;
	}

	delete() {
		this.currnetOperand = this.currnetOperand.toString().slice(0, -1);
	}

	chooseOperation(operation) {
		if (this.currnetOperand === '') {
			return;
		}
		if (this.previousOperand !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currnetOperand;
		this.currnetOperand = '';
	}

	appendNumber(number) {
		if (number === '.' && this.currnetOperand.includes('.')) {
			return;
		}
		this.currnetOperand = this.currnetOperand.toString() + number.toString();
	}

	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currnetOperand);
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
		this.currnetOperand = computation;
		this.operation = undefined;
		this.previousOperand = '';
	}

	updateDisplay() {
		this.currnetOperandElement.innerText = this.currnetOperand;
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
const currnetOperandElement = document.querySelector('.current-operand');

const calculator = new Calculator(
	previousOperandElement,
	currnetOperandElement
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
