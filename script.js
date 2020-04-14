const clickEvent = 'click';

const operatorList = ['multiply', 'add', 'subtract', 'divide'];
let restart;
let canEnterNumber;
let canEnterOperation;
let operand1;
let operator;
let canAddDecimal;

const initializeParams = () => {
	restart = false;
	canEnterNumber = true;
	canEnterOperation = false;
	operand1 = null;
	operator = null;
	canAddDecimal = true;
};

const getResult = (operand1, operand2, operator) => {
	switch (operator) {
		case 'multiply':
			return Number((operand1 * operand2).toFixed(3))
		case 'add':
			return Number((operand1 + operand2).toFixed(3))
		case 'subtract':
			return Number((operand1 - operand2).toFixed(3));
		case 'divide':
			return Number((operand1 / operand2).toFixed(3))
	}
};

const getSymbol = (operator) => {
	switch (operator) {
		case 'multiply':
			return String.fromCharCode(215);
		case 'add':
			return '+';
		case 'subtract':
			return '-';
		case 'divide':
			return String.fromCharCode(247);
	}
};

const calculate = (operation) => {
	if (canEnterOperation) {
		const result = document.getElementById('result-value');
		const resultString = document.getElementById('result-string');
		if (operand1) {
			const operand2 = Number(result.innerText);
			result.innerText = getResult(operand1, operand2, operator);
			operand1 = Number(result.innerText);
		} else {
			operand1 = Number(result.innerText);
			result.innerText = operand1;
		}
		resultString.innerText = resultString.innerText + getSymbol(operation);
		operator = operation;
		canEnterOperation = false;
		canEnterNumber = true;
		restart = true;
		canAddDecimal = true;
	}
};

const addButtonListeners = () => {
	const buttons = document.getElementsByClassName('number');
	for (const button of buttons) {
		button.addEventListener(clickEvent, () => {
			if (canEnterNumber) {
				if (!canAddDecimal && button.innerText === '.') {
					return;
				}
				const result = document.getElementById('result-value');
				const resultString = document.getElementById('result-string');
				let currentText = result.innerText;
				if (Number(result.innerText) === 0 && result.innerText.length <= 1) {
					currentText = '';
				}
				const finalText = `${currentText}${button.innerText}`;
				if (restart) {
					result.innerText = button.innerText;
				} else {
					result.innerText = finalText;
				}
				if (resultString.innerText === '0') {
					resultString.innerText = '';
				}
				if (button.innerText === '.') {
					canAddDecimal = false;
				}
				resultString.innerText = resultString.innerText + button.innerText;
				canEnterOperation = true;
				restart = false;
			}
		});
	}
};

const addMultiplicationListener = () => {
	const button = document.querySelector('.multiply');
	button.addEventListener(clickEvent, () => {
		calculate('multiply');
	});
};

const addAdditonListener = () => {
	const button = document.querySelector('.add');
	button.addEventListener(clickEvent, () => {
		calculate('add');
	});
};

const addSubtractionListener = () => {
	const button = document.querySelector('.subtract');
	button.addEventListener(clickEvent, () => {
		calculate('subtract');
	});
};

const addDivisionListener = () => {
	const button = document.querySelector('.divide');
	button.addEventListener(clickEvent, () => {
		calculate('divide');
	});
};

const addClearAllListener = () => {
	const button = document.querySelector('.clear-all');
	button.addEventListener(clickEvent, () => {
		const result = document.getElementById('result-value');
		const resultString = document.getElementById('result-string');
		result.innerText = '0';
		resultString.innerText = '0';
		initializeParams();
	});
};

const addBackListener = () => {
	const button = document.querySelector('.back');
	button.addEventListener(clickEvent, () => {
		const result = document.getElementById('result-value');
		const resultString = document.getElementById('result-string');
		if (result.innerText.length <= 1) {
			result.innerText = '0';
			resultString.innerText = '0';
			canEnterOperation = false;
		} else {
			const length = result.innerText.length;
			if (result.innerText[result.innerText.length - 1] === '.') {
				canAddDecimal = true;
			}
			result.innerText = result.innerText.substr(0, result.innerText.length - 1);
			resultString.innerText = result.innerText;
			operator = null;
			operand1 = null;
			canEnterOperation = true;
			canEnterNumber = true;
			restart = false;
		}
	});
};

const addEqualListener = () => {
	const button = document.querySelector('.equals');
	button.addEventListener(clickEvent, () => {
		if (canEnterOperation && operator) {
			const result = document.getElementById('result-value');
			const resultString = document.getElementById('result-string');
			const operand2 = Number(result.innerText);
			result.innerText = getResult(operand1, operand2, operator);
			resultString.innerText = result.innerText;
			operand1 = null;
			operator = null;
			canEnterOperation = true;
			canEnterNumber = false;
			restart = true;
		}
	});
};

initializeParams();
addButtonListeners();
addMultiplicationListener();
addBackListener();
addClearAllListener();
addAdditonListener();
addSubtractionListener();
addDivisionListener();
addEqualListener();