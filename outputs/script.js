const navLinks = document.querySelector(".nav-links");
const mobileToggle = document.querySelector(".mobile-toggle");

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

document.querySelectorAll("a[href]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      link.hasAttribute("download") ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const nextUrl = new URL(href, window.location.href);
    const sameLocation =
      nextUrl.pathname === window.location.pathname &&
      nextUrl.hash === window.location.hash;

    if (nextUrl.origin !== window.location.origin || sameLocation) {
      return;
    }

    event.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(() => {
      window.location.href = nextUrl.href;
    }, 160);
  });
});

const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll("[data-category]");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    cards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.hidden = filter !== "all" && !categories.includes(filter);
    });
  });
});

const profileImage = document.querySelector("[data-profile-image]");
const profileFallback = document.querySelector("[data-profile-fallback]");

if (profileImage && profileFallback) {
  profileImage.addEventListener("load", () => {
    profileFallback.hidden = true;
  });
  profileImage.addEventListener("error", () => {
    profileImage.remove();
    profileFallback.hidden = false;
  });
}
