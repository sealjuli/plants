console.log("Оценка: 125 баллов");
console.log(
  "При нажатии на кнопки:Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50"
);
console.log(
  "Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50"
);
console.log("В разделе contacts реализован select с выбором городов +25");

function myFunction() {
  var menu = document.getElementById("menu");
  if (menu.className === "menu") {
    menu.className += " active";
  } else {
    menu.className = "menu";
  }
}

function myFunction_close() {
  var menu = document.getElementById("menu");
  if (menu.className !== "menu") {
    menu.className = "menu";
  }
}

function serviceButtonGardensFunction() {
  let activeButtons = document.querySelectorAll(".active-button");
  let gardensButton = document.querySelector(".gardens");
  if (
    activeButtons.length < 2 ||
    gardensButton.classList.contains("active-button")
  ) {
    gardensButton.classList.toggle("active-button");
  }
}

function serviceButtonLawnFunction() {
  let activeButtons = document.querySelectorAll(".active-button");
  let lawnButton = document.querySelector(".lawn");
  if (
    activeButtons.length < 2 ||
    lawnButton.classList.contains("active-button")
  ) {
    lawnButton.classList.toggle("active-button");
  }
}

function serviceButtonPlantingFunction() {
  let activeButtons = document.querySelectorAll(".active-button");
  let plantingButton = document.querySelector(".planting");
  if (
    activeButtons.length < 2 ||
    plantingButton.classList.contains("active-button")
  ) {
    plantingButton.classList.toggle("active-button");
  }
}

document.addEventListener("click", (e) => {
  const burger_logo = document.getElementById("icon");
  if (!e.composedPath().includes(burger_logo)) {
    const menu = document.getElementById("menu");
    const withinBoundaries = e.composedPath().includes(menu);

    if (!withinBoundaries) {
      myFunction_close();
    }
  }

  let serviceButtons = document.querySelectorAll(".service-button:not(.price)");
  let gardensElements = document.querySelectorAll(".gardens_element");
  let plantingElements = document.querySelectorAll(".planting_element");
  let lawnElements = document.querySelectorAll(".lawn_element");
  let allElements = [...gardensElements, ...plantingElements, ...lawnElements];

  if (document.querySelectorAll(".active-button").length > 0) {
    // для всех сделать блюр
    allElements.forEach((element) => {
      element.classList.add("blur");
    });

    // в зависимости от того, какая кнопка активна, отключать блюр
    serviceButtons.forEach((element) => {
      if (element.classList.contains("gardens")) {
        if (element.classList.contains("active-button")) {
          gardensElements.forEach((gardens_elem) => {
            gardens_elem.classList.remove("blur");
          });
        }
      }

      if (element.classList.contains("lawn")) {
        if (element.classList.contains("active-button")) {
          lawnElements.forEach((lawn_elem) => {
            lawn_elem.classList.remove("blur");
          });
        }
      }

      if (element.classList.contains("planting")) {
        if (element.classList.contains("active-button")) {
          plantingElements.forEach((planting_elem) => {
            planting_elem.classList.remove("blur");
          });
        }
      }
    });
  } else {
    // для всех выключить блюр
    allElements.forEach((element) => {
      if (element.classList.contains("blur")) {
        element.classList.remove("blur");
      }
    });
  }
});

let summaryElements = document.querySelectorAll(".summary-div");
let detailsElements = document.querySelectorAll(".details-element");
let cardContainer = document.querySelector(".card");

cardContainer.style.display = "none";

const detailsClick = (event) => {
  let openDetails = document.querySelectorAll(".open-details");
  let curr_element;

  if (event.target.classList.contains("summary-div")) {
    curr_element = event.target;
  } else if (event.target.classList.contains("summary-btn")) {
    curr_element = event.target.parentNode;
  }

  if (openDetails.length === 0) {
    curr_element.classList.toggle("open-details");
  } else {
    if (openDetails[0] === curr_element) {
      curr_element.classList.toggle("open-details");
    } else {
      detailsElements.forEach((element) => {
        element.removeAttribute("open");
      });
      summaryElements.forEach((element) => {
        element.classList.remove("open-details");
      });
      curr_element.classList.toggle("open-details");
    }
  }
};

summaryElements.forEach((element) => {
  element.addEventListener("click", detailsClick);
});

let city = document.querySelector(".city-summary");
let btnGrey = document.querySelector(".summary-btn_grey");
let cityDetails = document.querySelector(".city-details");

const cityDetailsClick = (event) => {
  let curr_element;

  if (event.target.parentNode.classList.contains("city-summary")) {
    curr_element = event.target.parentNode.parentNode;
  } else if (event.target.classList.contains("drop_btn")) {
    curr_element = event.target.parentNode.parentNode.parentNode;
  } else if (event.target.classList.contains("city-summary")) {
    curr_element = event.target.parentNode;
  } else if (event.target.classList.contains("city")) {
    curr_element = event.target.parentNode.parentNode.parentNode;
  }

  if (curr_element != undefined) {
    if (!curr_element.open) {
      cardContainer.style.display = "none";
    } else {
      let city_name = document.querySelector(".city").textContent;
      if (city_name !== "City") {
        cardContainer.style.display = "block";
      }
    }
  }
};

cityDetails.addEventListener("click", cityDetailsClick);

// курсор зашёл на элемент
city.onmouseenter = function () {
  btnGrey.classList.remove("summary-btn_grey");
  btnGrey.classList.add("drop_btn");
  this.classList.add("city-details-open");
};

// курсор ушёл с элемента
city.onmouseleave = function () {
  let cityName = document.querySelector(".city").textContent;
  if (!cityDetails.open) {
    btnGrey.classList.remove("drop_btn");
    btnGrey.classList.add("summary-btn_grey");
    if (cityName === "City") {
      this.classList.remove("city-details-open");
    }
  }
};

let selections = document.querySelectorAll(".selection");

const selectionClick = (event) => {
  let city_name = document.querySelector(".city");
  city_name.innerHTML = event.target.textContent;
  cityDetails.removeAttribute("open");

  let cardCityValue = document.querySelector(".city-value");
  let cardPhoneValue = document.querySelector(".phone-value");
  let cardAddressValue = document.querySelector(".address-value");
  let callElement = document.querySelector(".call-a");

  if (event.target.textContent != undefined) {
    cardCityValue.textContent = event.target.textContent;

    if (event.target.textContent === "Canandaigua, NY") {
      cardPhoneValue.textContent = "+1 585 393 0001";
      cardAddressValue.textContent = "151 Charlotte Street";
      callElement.href = "tel:" + cardPhoneValue.textContent;
    } else if (event.target.textContent === "New York City") {
      cardPhoneValue.textContent = "+1 212 456 0002";
      cardAddressValue.textContent = "9 East 91st Street";
      callElement.href = "tel:" + cardPhoneValue.textContent;
    } else if (event.target.textContent === "Yonkers, NY") {
      cardPhoneValue.textContent = "+1 914 678 0003";
      cardAddressValue.textContent = "511 Warburton Ave";
      callElement.href = "tel:" + cardPhoneValue.textContent;
    } else if (event.target.textContent === "Sherrill, NY") {
      cardPhoneValue.textContent = "+1 315 908 0004";
      cardAddressValue.textContent = "14 WEST Noyes BLVD";
      callElement.href = "tel:" + cardPhoneValue.textContent;
    }

    let contactUs = document.querySelector(".contact-h2");
    contactUs.style.marginBottom = "63px";

    city_name.style.fontSize = "16px";

    cardContainer.style.display = "block";
    console.log(callElement.href);
  }
};

selections.forEach((element) => {
  element.addEventListener("click", selectionClick);
});
