const calculator = document.querySelector('.container');
const myButtons = calculator.querySelector('.buttons');
const display = document.querySelector('.display');

function calculate (numb1, operator, numb2){
  let result = '';
  
  if (operator === 'add') {
    result = parseFloat(numb1) + parseFloat(numb2);
  } else if (operator === 'minus') {
    result = parseFloat(numb1) - parseFloat(numb2);
  } else if (operator === 'mult') {
    result = parseFloat(numb1) * parseFloat(numb2);
  } else if (operator === 'devide') {
    if(numb2 === 0) {
      return 'lmao';
    } else {
      result = parseFloat(numb1) / parseFloat(numb2);
    }
  }
  
  return result;
}

myButtons.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const button = e.target;
    const event = button.dataset.action;
    const keyContent = button.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    if (!event) {
      if (displayedNum === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKey = 'number';
    }
    else if (event === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.';
      } else if (previousKeyType === 'operator') {
        display.textContent =  keyContent;
      }
    }
    else if ( event === 'add' || event === 'minus' ||
      event === 'mult' || event === 'devide') {
      
      myButtons.classList.add('is-depressed');

    calculator.dataset.firstValue = displayedNum;
    calculator.dataset.secondValue =  calculator.dataset.previousKeyType; 
    calculator.dataset.operator = event;
    calculator.dataset.previousKeyType = 'operator';
  }
  else if (event === 'clear') {
    display.textContent = 0;
    calculator.dataset.previousKeyType = 'clear';
  }
  else if(event === 'sign') {
    display.textContent = displayedNum * (-1);
  }

  else if(event === 'rest') {
    display.textContent = displayedNum/100;
  }

  else if (event === 'equal') {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;

    if(operator === 'devide') {
      display.textContent = calculate(firstValue, operator, secondValue).toFixed(4);
    }
    else{
      display.textContent = calculate(firstValue, operator, secondValue);
    }

    calculator.dataset.previousKeyType = 'equal';
  }
}
})

