AOS.init();

document.cookie = "name=value; SameSite=Lax";
document.cookie = "name=value; SameSite=Strict";

document.addEventListener("DOMContentLoaded", function () {
  // navbar 스크롤 시 투명하게
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  }

  function highlightNavLink() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", function () {
    updateNavbar();
    highlightNavLink();
  });

  // 초기 로드 시 실행
  updateNavbar();
  highlightNavLink();

  // progressbar-skill
  const progressBars = document.querySelectorAll(".progress-bar");
  progressBars.forEach((bar) => {
    const target = bar.getAttribute("data-bs-target");
    setTimeout(() => {
      bar.style.width = target + "%";
    }, 500);
  });

  // 검색 기능
  const searchInput = document.getElementById("searchInput");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();

    portfolioItems.forEach((item) => {
      const title = item.querySelector("h4").textContent.toLowerCase();
      if (title.includes(searchTerm)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });

  // 분류 기능
  // getAttribute : 특정 요소 내에서 특정한 속성값을 가져오는 메소드(함수)
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");
      portfolioItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // navbar underline 적용안됨..ㅜ
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  //스크롤스파이 > 특정 구역으로 이동, 혹은 해당 구역임을 추적하는 기능
  let navbarlinks = document.querySelectorAll(".navbar a");

  function navbarScrollspy() {
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = document.querySelector(navbarlink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navbar a.active")
          .forEach((link) => link.classList.remove("active"));
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navbarScrollspy);
  document.addEventListener("scroll", navbarScrollspy);

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  // Scroll top button
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  // 타임라인
  function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function animateTimeline() {
    let items = document.querySelectorAll(".timeline-item");
    items.forEach(function (item) {
      if (isElementInViewport(item)) {
        item.classList.add("visible");
      }
    });
  }
  window.addEventListener("load", animateTimeline);
  window.addEventListener("scroll", animateTimeline);
});
