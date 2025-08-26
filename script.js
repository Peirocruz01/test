document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const buttons = document.querySelector('.buttons');
  let currentInput = '';
  let operator = '';
  let firstOperand = '';

  buttons.addEventListener('click', (event) => {
    if (!event.target.matches('.button')) {
      return;
    }

    const { value } = event.target.dataset;

    if (value === 'C') {
      currentInput = '';
      operator = '';
      firstOperand = '';
      display.textContent = '';
      return;
    }

    if (value === '+' || value === '-' || value === '*' || value === '/') {
      if (currentInput === '') {
        return;
      }
      if (firstOperand !== '') {
          const result = calculate(firstOperand, operator, currentInput);
          display.textContent = result;
          firstOperand = result;
      } else {
        firstOperand = currentInput;
      }

      operator = value;
      currentInput = '';
      return;
    }

    if (value === '=') {
      if (currentInput === '' || firstOperand === '') {
        return;
      }
      const result = calculate(firstOperand, operator, currentInput);
      display.textContent = result;
      currentInput = result;
      operator = '';
      firstOperand = '';
      return;
    }

    currentInput += value;
    display.textContent = currentInput;
  });

  function calculate(a, op, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        if (b === 0) {
          return 'Error';
        }
        return a / b;
      default:
        return 'Error';
    }
  }
});
