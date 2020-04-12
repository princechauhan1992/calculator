const clickEvent = 'click';

const operatorList = [
    'multiply', 'add', 'subtract', 'divide'
]
let restart;
let canEnterNumber;
let canEnterOperation;
let operand1;
let operator;

const initializeParams = () => {
    restart = false;
    canEnterNumber = true;
    canEnterOperation = false;
    operand1 = null;
    operator = null;

}

const getResult = (operand1, operand2, operator) => {
    switch (operator) {
        case 'multiply': 
            return operand1*operand2;
        case 'add':
            return operand1+operand2;
        case 'subtract':
            return operand1-operand2;
        case 'divide':
            return Math.floor(operand1/operand2);
    }
}

const calculate = (operation) => {
    if (canEnterOperation) {
        const result = document.getElementById('result-value');
        if (operand1) {
            const operand2 = Number(result.innerText);
            result.innerText = getResult(operand1, operand2, operator);
            operand1 = Number(result.innerText);
        } else {
            operand1 = Number(result.innerText);
            result.innerText = 0;
        }
        operator = operation;
        canEnterOperation = false;
        canEnterNumber = true;
        restart = true;
    }
}

const addButtonListeners = () => { 
    const buttons = document.getElementsByClassName('number');
    for (const button of buttons) {
        button.addEventListener(clickEvent, () => {
            if (canEnterNumber) {
                const result = document.getElementById('result-value');
                const currentText = Number(result.innerText) ? result.innerText : '';
                const finalText = `${currentText}${button.innerText}`;
                if (restart) {
                    result.innerText = button.innerText;
                } else {
                    result.innerText = finalText;
                }
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
}

const addAdditonListener = () => {
    const button = document.querySelector('.add');
    button.addEventListener(clickEvent, () => {
        calculate('add');
    });
}

const addSubtractionListener = () => {
    const button = document.querySelector('.subtract');
    button.addEventListener(clickEvent, () => {
        calculate('subtract')
    });
}

const addDivisionListener = () => {
    const button = document.querySelector('.divide');
    button.addEventListener(clickEvent, () => {
        calculate('divide')
    });
}

const addClearAllListener = () => {
    const button = document.querySelector('.clear-all');
    button.addEventListener(clickEvent, () => {
        const result = document.getElementById('result-value');
        result.innerText = '0';
        initializeParams();
    });
}

const addBackListener = () => {
    const button = document.querySelector('.back');
    button.addEventListener(clickEvent, () => {
        const result = document.getElementById('result-value');
        if (result.innerText.length <= 1) {
            result.innerText = '0'
            canEnterOperation = false;
        } else {
            result.innerText = result.innerText.substr(0, result.innerText.length-1);
            operator = null;
            operand1 = null;
            canEnterOperation = true;
            canEnterNumber = true;
            restart = false;
        }
    });
}

const addEqualListener = () => {
    const button = document.querySelector('.equals');
    button.addEventListener(clickEvent, () => {
        if (canEnterOperation && operator) {
            const result = document.getElementById('result-value');
            const operand2 = Number(result.innerText);
            result.innerText = getResult(operand1, operand2, operator);
            operand1 = null;
            operator = null;
            canEnterOperation = true;
            canEnterNumber = false;
            restart = true;
        }
    });
}

initializeParams();
addButtonListeners();
addMultiplicationListener();
addBackListener();
addClearAllListener();
addAdditonListener();
addSubtractionListener();
addDivisionListener();
addEqualListener();

