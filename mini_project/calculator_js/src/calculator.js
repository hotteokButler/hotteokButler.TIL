'use strict';

export default class Calculator {
  constructor() {
    this.userInput = document.querySelector('.calculator__form');
    this.userData = this.userInput.querySelector('.calculator__input');
    this.pads = document.querySelector('.calculator__pads');
    this.formula = undefined;
    this.userInput.addEventListener('submit', (event) => {
      event.preventDefault();
      this.calculateWithEval(this.formula);
    });

    this.pads.addEventListener('mousedown', (event) => {
      this.onPadStyle(event);
    });
    this.pads.addEventListener('mouseup', (event) => {
      this.offPadStyle(event);
    });
  }

  setSubmitCalculator(calculateWithEval) {
    this.calculateInputData = calculateWithEval;
  }

  calculateWithEval(formula) {
    if (!formula) {
      let userValue = this.userData.value;
      this.userData.value = eval(userValue);
    } else {
      this.userData.value = eval(formula);
    }
  }

  onPadStyle(event) {
    const target = event.target;
    if (target.classList.contains('calculator__number')) {
      target.classList.add('calculator__number--onClick');
    } else if (target.classList.contains('calculator__operator')) {
      target.classList.add('calculator__operator--onClick');
    }
  }
  offPadStyle(event) {
    const target = event.target;
    if (target.classList.contains('calculator__number--onClick')) {
      target.classList.remove('calculator__number--onClick');
    } else if (target.classList.contains('calculator__operator--onClick')) {
      target.classList.remove('calculator__operator--onClick');
    }
  }
}
