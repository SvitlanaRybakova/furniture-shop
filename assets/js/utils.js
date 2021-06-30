export const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

export const checkDevice = () => {
  let ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ");

  const isIE = () => {
    ua = navigator.userAgent;
    const is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
  };
  if (isIE()) {
    document.querySelector("html").classList.add("ie");
  }
  if (isMobile.any()) {
    document.querySelector("html").classList.add("_touch");
  }
};

export const setSpollerAction = (e) => {
  const el = e.target;
  if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
    const spollerTitle = el.hasAttribute("data-spoller")
      ? el
      : el.closest("[data-spoller]");
    const spollersBlock = spollerTitle.closest("[data-spollers]");
    console.log("spollerTitle", spollerTitle);
    console.log("spollerBlock", spollersBlock);
  }
};

export const main_Swiper = () => {
    const mySwiper = new Swiper(".swiper-container", {
      // Optional parameters
      observer: true,
      observerParents: true,
      slidesPerView: 1,
      spaceBetween: 32,
      watchOverflow: true,
      speed: 800,
      autoplay: true,
      loop: true,
      loopAdditionalSlides: 5,
      preloadImages: false,
      parallax: true,
  
      // If we need pagination
      pagination: {
        el: ".controls-slider-main__dotts",
        clickable: true,
      },
  
      // Navigation arrows
      navigation: {
        nextEl: ".slider-arrow_next",
        prevEl: ".slider-arrow_prew",
      },
    });
  
};

export const rooms_Swiper = () => {
  const mySwiper = new Swiper(".slider-rooms__body", {
    // Optional parameters
    observer: true,
    observerParents: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    watchOverflow: true,
    speed: 800,
    autoplay: true,
    loop: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,

    // If we need pagination
    pagination: {
      el: ".slider-rooms__dotts",
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".slider-arrow_next",
      prevEl: ".slider-arrow_prew",
    },
  });

};


