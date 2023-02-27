const btnForm = document.querySelector(".form__btn");
const formNew = document.forms[0];

function addErrorText(selectedElement) {
  const errorSpan = document.querySelector("." + selectedElement + "Error");
  const inputData = document.querySelector(".input" + selectedElement);

  inputData.classList.add("erroInput");
  errorSpan.classList.add("errorText");
  errorSpan.style.display = "Block";
}
function removeErrorText(selectedElement) {
  const errorSpan = document.querySelector("." + selectedElement + "Error");
  const inputData = document.querySelector(".input" + selectedElement);

  inputData.classList.remove("erroInput");
  errorSpan.style.display = "None";
}

function disableFormBtn() {
  const btnForm = document.querySelector(".form__btn");
  btnForm.classList.add("form__btn--disable");
}

function activeFormBtn() {
  const btnForm = document.querySelector(".form__btn");

  btnForm.classList.remove("form__btn--disable");
}

function updateSpanValue(elementToChange, newValue) {
  elementToChange.innerText = newValue;
}

handleInput = {
  cardholder(newValue, selectedElement, elementToChange) {
    const validName = /^[^0-9]*[ ][^0-9]*$/.test(newValue);
    updateSpanValue(elementToChange, newValue);
    if (!validName) {
      addErrorText(selectedElement);
      disableFormBtn();
    } else {
      activeFormBtn();
      removeErrorText(selectedElement);
    }
  },
  cardNumber(newValue, selectedElement, elementToChange, newValuenoSpace) {
    updateSpanValue(elementToChange, newValue);
    const onlyNumbers = /^[0-9]+$/.test(newValuenoSpace);
    if (!onlyNumbers || newValuenoSpace.length < 16) {
      addErrorText(selectedElement);
      disableFormBtn();
    } else {
      removeErrorText(selectedElement);
      activeFormBtn();
    }
    if (newValuenoSpace.length <= 16) {
      const inputCardNumber = document.querySelector(
        ".input" + selectedElement
      );
      elementToChange.innerText = inputCardNumber.value;
      let result = " ";
      for (let i = 0; i < newValuenoSpace.length; i += 4) {
        result += newValuenoSpace.substring(i, i + 4) + " ";
        inputCardNumber.value = result.trim();
      }
    }
  },
  expDateMonth(newValue, selectedElement, elementToChange) {
    updateSpanValue(elementToChange, newValue);
    const yearErrorDisplayStatus =
      document.querySelector(".expDateYearError").style.display;
    const onlyNumbers = /\d+/.test(newValue);
    const errorSpan = document.querySelector(".expDateMonthError");

    if (newValue > 12 || !onlyNumbers) {
      addErrorText(selectedElement);
      disableFormBtn();
      if (yearErrorDisplayStatus === "block") {
        errorSpan.style.bottom = "-13px";
      }
    } else {
      removeErrorText(selectedElement);
      activeFormBtn();
      errorSpan.style.bottom = "-3px";
    }
  },
  expDateYear(newValue, selectedElement, elementToChange) {
    updateSpanValue(elementToChange, newValue);
    const monthErrorDisplayStatus =
      document.querySelector(".expDateMonthError").style.display;
    const onlyNumbers = /\d+/.test(newValue);
    const errorSpan = document.querySelector(".expDateYearError");
    const currentDate = new Date().getFullYear().toString().slice(-2);
    if (newValue < currentDate || !onlyNumbers) {
      addErrorText(selectedElement);
      disableFormBtn();
      if (monthErrorDisplayStatus === "block") {
        errorSpan.style.bottom = "-13px";
      }
    } else {
      removeErrorText(selectedElement);
      activeFormBtn();
      errorSpan.style.bottom = "-3px";
    }
  },
  cvc(newValue, selectedElement, elementToChange) {
    updateSpanValue(elementToChange, newValue);
    const onlyNumbers = /\d+/.test(newValue);
    if (!onlyNumbers) {
      addErrorText(selectedElement);
      disableFormBtn();
    } else {
      removeErrorText(selectedElement);
      activeFormBtn();
    }
  },
};

function handleChange(event) {
  const selectedElement = event.target.name;
  const elementToChange = document.querySelector("." + selectedElement);
  const newValue = document.querySelector(".input" + selectedElement).value;
  const newValuenoSpace = newValue.replaceAll(" ", "");
  handleInput[selectedElement](
    newValue,
    selectedElement,
    elementToChange,
    newValuenoSpace
  );
}

formNew.addEventListener("keyup", handleChange);

function handleSubmit(event) {
  const form = document.querySelector("form");
  const creditCardObtained = document.querySelector(".cardObtained");
  form.style.display = "none";
  creditCardObtained.style.display = "flex";
}

btnForm.addEventListener("click", handleSubmit);
