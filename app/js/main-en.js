const swiperClients = new Swiper(".swiper-clients", {
    spaceBetween: 45,
  
    navigation: {
      nextEl: ".swiper-button-next.clients",
      prevEl: ".swiper-button-prev.clients",
    },
  
    pagination: {
      el: ".swiper-pagination.clients",
      type: "fraction",
    },
  
    effect: "coverflow",
  
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      stretch: -30,
      depth: 75,
      modifier: 1,
      slideShadows: false,
    },
  });
  
  const swiperClientsMobile = new Swiper(".swiper-clients-mobile", {
    spaceBetween: 45,
  
    navigation: {
      nextEl: ".swiper-button-next.clients",
      prevEl: ".swiper-button-prev.clients",
    },
  
    pagination: {
      el: ".swiper-pagination.clients",
      type: "fraction",
    },
  });
  
  function blockScroll() {
    scrollY = window.pageYOffset;
    document.body.style.top = `-${window.pageYOffset}px`;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
  }
  function unblockScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollY);
  }
  
  const headerBurger = document.querySelector(".header__burger-img");
  const headerBurgerClose = document.querySelector(".header__burger-close");
  const headerBurgerMenu = document.querySelector(".header__menu");
  const headerMenuLinks = document.querySelectorAll(
    ".header__menu .header__item-link"
  );
  
  headerBurger.addEventListener("click", () => {
    headerBurgerMenu.classList.add("active");
    blockScroll();
  });
  headerBurgerClose.addEventListener("click", () => {
    headerBurgerMenu.classList.remove("active");
    unblockScroll();
  });
  for (let i of headerMenuLinks)
    i.addEventListener("click", () => {
      unblockScroll();
      headerBurgerMenu.classList.remove("active");
    });
  
  document.querySelectorAll('a[href^="#"').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
  
      let href = this.getAttribute("href").substring(1);
  
      const scrollTarget = document.getElementById(href);
  
      const elementPosition = scrollTarget.getBoundingClientRect().top;
  
      window.scrollBy({
        top: elementPosition,
        behavior: "smooth",
      });
    });
  });
  
  const swiperText = document.querySelectorAll(
    ".swiper__clients-descr .swiper__clients-text:first-of-type"
  );
  const swiperMore = document.querySelectorAll(".swiper__clients-more");
  const swiperTextMore = document.querySelectorAll(".swiper__clients-more f");

  
  for (let i = 0; i < swiperMore.length; i++) {
    swiperMore[i].addEventListener("click", () => {
      if (swiperTextMore[i].textContent == "disclose") {
        for(let j of swiperTextMore){
          j.textContent = "close";
          j.parentElement.classList.add("active");
        } 
        for(let k of swiperText) k.classList.add("active");
      } else {
        for(let j of swiperTextMore){
          j.textContent = "disclose";
          j.parentElement.classList.remove("active");
        } 
        for(let k of swiperText) k.classList.remove("active");
      }
    });
  }

  const goTopBtn = document.querySelector(".go-top");

window.addEventListener("scroll", trackScroll);

goTopBtn.addEventListener("click", goTop);

function trackScroll() {

  const scrolled = window.pageYOffset;

  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {

    goTopBtn.classList.add("go-top--show");
  } else {

    goTopBtn.classList.remove("go-top--show");
  }
}

function goTop() {

  if (window.pageYOffset > 0) {

    window.scrollBy(0, -50); 
    setTimeout(goTop, 0); 
  }
}