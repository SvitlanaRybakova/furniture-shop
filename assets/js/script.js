import { isMobile } from "./utils.js";

const menuBody = document.querySelector(".menu__body");
const iconMenu = document.querySelector(".icon-menu");
const menuArrow = document.querySelectorAll(".menu__arrow");
const subMenu = document.querySelector(".menu__sub-list");

// проверяет может ли браузер отобразить формат картинок webp и если да, то доавляет специальный класс
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

// открытие субменю при нажатии на кнопку на тачскрине
window.onload = function () {
  const documentActions = (e) => {
    const target = e.target;
  
    if (window.innerWidth < 768 && isMobile.any()) {
      if (target.classList.contains("menu__arrow")) {
        target.closest(".menu__item").classList.toggle("_hover");
      }
      // убираю субменю при нажатии на body
      // проверяю что нажала не на элементы субменю и есть ли вообще объекты с классом _hover, что бы было что убирать
      if (
        !target.closest(".menu__item") &&
        document.querySelectorAll(".menu__item._hover").length > 0
      ) {
        const openSubItems = document.querySelectorAll(".menu__item._hover");
        openSubItems.forEach((subItems) => {
          subItems.classList.remove("_hover");
        });
      }
    }
    // показываю поле поиска при нажатии на кнопку
    if (target.classList.contains("search-form__icon")) {
      document.querySelector(".search-form").classList.toggle("_active");
    } else if (
      !target.closest(".search-form") &&
      document.querySelectorAll(".search-form_active")
    ) {
      document.querySelector(".search-form").classList.remove("_active");
    }
    //
  };

  document.addEventListener("click", documentActions);

  // открываю = закрываю бургер меню
  iconMenu.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("icon-menu")) {
      menuBody.classList.toggle("_active");
      iconMenu.classList.toggle("icon-menu_active");
    }
  });
  // открываю-закрываю субменю
  if (target.classList.contains("menu__arrow")) {
    target.closest(".menu__item").classList.toggle("none");
  }
};
