const burgerMenu = document.getElementById("hamburger-menu");
const overlayNav = document.getElementById("menu-container");
const navLinks = overlayNav.querySelectorAll("a");

// Accessibility: ARIA attributes
burgerMenu.setAttribute("aria-label", "Open main menu");
burgerMenu.setAttribute("aria-expanded", "false");
burgerMenu.setAttribute("aria-controls", "menu-container");
overlayNav.setAttribute("role", "menu");
overlayNav.setAttribute("aria-hidden", "true");

function openMenu() {
  burgerMenu.classList.add("close");
  overlayNav.classList.add("overlay");
  burgerMenu.setAttribute("aria-expanded", "true");
  overlayNav.setAttribute("aria-hidden", "false");
  // Focus first link for accessibility
  if (navLinks.length) navLinks[0].focus();
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  burgerMenu.classList.remove("close");
  overlayNav.classList.remove("overlay");
  burgerMenu.setAttribute("aria-expanded", "false");
  overlayNav.setAttribute("aria-hidden", "true");
  burgerMenu.focus();
  document.body.style.overflow = "";
}

// Toggle menu on burger click
burgerMenu.addEventListener("click", function () {
  if (overlayNav.classList.contains("overlay")) {
    closeMenu();
  } else {
    openMenu();
  }
});

// ESC key closes menu
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && overlayNav.classList.contains("overlay")) {
    closeMenu();
  }
  // Focus trap: tab/shift+tab stays in menu when open
  if (overlayNav.classList.contains("overlay")) {
    const focusable = Array.from(
      overlayNav.querySelectorAll("a, button, [tabindex]:not([tabindex='-1'])"),
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
});

// Click outside overlay closes menu
document.addEventListener("mousedown", function (e) {
  if (
    overlayNav.classList.contains("overlay") &&
    !overlayNav.contains(e.target) &&
    !burgerMenu.contains(e.target)
  ) {
    closeMenu();
  }
});

// Accessibility: close menu when a nav link is clicked (for single page apps or smooth UX)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});
