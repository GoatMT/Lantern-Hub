const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const navTargets = navLinks
  .map((link) => document.querySelector(link.hash))
  .filter(Boolean);
const revealTargets = [...document.querySelectorAll("[data-reveal]")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window && revealTargets.length) {
  revealTargets.forEach((target, index) => {
    target.style.setProperty("--reveal-delay", `${(index % 3) * 90}ms`);
  });
  document.documentElement.classList.add("has-motion");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

if ("IntersectionObserver" in window && navTargets.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const currentEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
    if (!currentEntry) return;

    for (const link of navLinks) {
      if (link.hash === `#${currentEntry.target.id}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }, { rootMargin: "-25% 0px -65% 0px" });

  navTargets.forEach((target) => sectionObserver.observe(target));
}
