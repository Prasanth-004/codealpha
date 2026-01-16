// Calculator state
let display = document.getElementById('display');
let previousOperand = document.getElementById('previousOperand');
let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

// Initialize keyboard support
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', handleKeyboard);
});

/**
 * Append number to display
 */
function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        // Prevent multiple leading zeros
        if (currentInput === '0' && num === '0') {
            return;
        }
        // Replace leading zero with new number
        if (currentInput === '0' && num !== '.') {
            currentInput = num;
        } else {
            currentInput += num;
        }
    }
    updateDisplay();
}

/**
 * Append decimal point
 */
function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

/**
 * Append operator
 */
function appendOperator(op) {
    if (currentInput === '' && previousInput === '') {
        return;
    }

    // If there's already an operator, calculate first
    if (operator !== null && currentInput !== '') {
        calculateResult();
    }

    operator = op;
    previousInput = currentInput;
    shouldResetDisplay = true;
    updateDisplay();
}

/**
 * Calculate the result
 */
function calculateResult() {
    if (operator === null || currentInput === '' || previousInput === '') {
        return;
    }

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    // Format the result
    currentInput = formatNumber(result);
    operator = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

/**
 * Clear the display
 */
function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

/**
 * Backspace - remove last character
 */
function backspace() {
    if (shouldResetDisplay) {
        return;
    }

    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

/**
 * Toggle sign (positive/negative)
 */
function toggleSign() {
    if (currentInput === '0') {
        return;
    }
    
    if (currentInput.startsWith('-')) {
        currentInput = currentInput.slice(1);
    } else {
        currentInput = '-' + currentInput;
    }
    updateDisplay();
}

/**
 * Append percentage
 */
function appendPercent() {
    if (currentInput === '' || currentInput === '0') {
        return;
    }

    const value = parseFloat(currentInput);
    const percentage = value / 100;
    currentInput = formatNumber(percentage);
    updateDisplay();
}

/**
 * Format number for display (handle decimals and large numbers)
 */
function formatNumber(num) {
    // Handle very small numbers
    if (Math.abs(num) < 0.0001 && num !== 0) {
        return num.toExponential(6);
    }

    // Limit decimal places for display
    const stringNum = num.toString();
    if (stringNum.includes('.')) {
        const parts = stringNum.split('.');
        const decimalPart = parts[1];
        if (decimalPart.length > 10) {
            return parseFloat(num.toFixed(10)).toString();
        }
    }

    return stringNum;
}

/**
 * Update display
 */
function updateDisplay() {
    display.value = currentInput;
    
    // Update previous operand display
    if (operator !== null && previousInput !== '') {
        previousOperand.textContent = `${previousInput} ${operator}`;
    } else {
        previousOperand.textContent = '';
    }
}

/**
 * Handle keyboard input
 */
function handleKeyboard(event) {
    const key = event.key;

    // Number keys
    if (key >= '0' && key <= '9') {
        event.preventDefault();
        appendNumber(key);
    }
    // Operators
    else if (key === '+') {
        event.preventDefault();
        appendOperator('+');
    }
    else if (key === '-') {
        event.preventDefault();
        appendOperator('-');
    }
    else if (key === '*') {
        event.preventDefault();
        appendOperator('*');
    }
    else if (key === '/') {
        event.preventDefault();
        appendOperator('/');
    }
    else if (key === '%') {
        event.preventDefault();
        appendPercent();
    }
    // Decimal point
    else if (key === '.') {
        event.preventDefault();
        appendDecimal();
    }
    // Enter or equals for result
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculateResult();
    }
    // Backspace
    else if (key === 'Backspace') {
        event.preventDefault();
        backspace();
    }
    // Escape for clear
    else if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    }
    // Clear (C key)
    else if (key.toLowerCase() === 'c') {
        event.preventDefault();
        clearDisplay();
    }
}

// Initialize display on page load
window.addEventListener('load', function() {
    updateDisplay();
});
