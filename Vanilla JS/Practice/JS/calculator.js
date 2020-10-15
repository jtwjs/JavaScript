(() => {
  const calculator = document.querySelector(".calculator");
  const output = document.querySelector(".output");
  let number = "0";
  let number2;
  let isNumber;
  let operator;

  function setPlaceValue() {
    let result = "";
    if (/^\D/.test(number)) {
      const minusNumber = number.replace(/^\D/, "");
      const arrayNumber = minusNumber.split("");
      const reverseNumber = arrayNumber.reverse();

      for (let i = 0; i < reverseNumber.length; i++) {
        if (i % 3 === 0 && i !== 0) result += ",";
        result += reverseNumber[i];
      }

      result = "-" + result.split("").reverse().join("");
    } else {
      const arrayNumber = number.split("");
      const reverseNumber = arrayNumber.reverse();

      for (let i = 0; i < reverseNumber.length; i++) {
        if (i % 3 === 0 && i !== 0) result += ",";
        result += reverseNumber[i];
      }
      result = result.split("").reverse().join("");
    }

    console.log(result);
    return result;
  }

  function printNumber() {
    if (number.length > 3) {
      output.value = setPlaceValue();
    } else {
      output.value = number;
    }
  }

  function calculate(operator) {
    const value = Number(number2); // 앞숫자
    const value2 = Number(number); // 뒷숫자
    switch (operator) {
      case "+":
        number = value + value2;
        break;
      case "-":
        number = value - value2;
        break;
      case "*":
        number = value * value2;
        break;
      case "/":
        number = value / value2;
        break;
      default:
        break;
    }
    number = number + "";
    number2 = undefined;
    printNumber();
  }

  function clickHandler(e) {
    const target = e.target;

    if (!target.classList.contains("button")) return;

    if (target.classList.contains("cancle")) {
      number = "0";
      number2 = undefined;
      printNumber();
      return;
    }

    switch (target.dataset.type) {
      case "number": {
        if (number === "0") {
          number = target.dataset.calc;
        } else {
          number += target.dataset.calc;
        }

        isNumber = true;
        printNumber();
        break;
      }
      case "operator": {
        if (number2 && number && isNumber) {
          calculate(operator);
        }

        if (isNumber) {
          number2 = number;
          number = "0";
        }

        operator = target.dataset.calc;
        isNumber = false;
        break;
      }
      default:
        break;
    }
  }

  function mousedownHandler(e) {
    const target = e.target;
    if (!target.classList.contains("button")) return;
    target.style.opacity = "0.7";
  }

  function mouseupHandler(e) {
    const target = e.target;
    if (!target.classList.contains("button")) return;
    target.style.opacity = "1";
  }

  function init() {
    calculator.addEventListener("click", clickHandler);
    calculator.addEventListener("mousedown", mousedownHandler);
    calculator.addEventListener("mouseup", mouseupHandler);
  }
  init();
})();
