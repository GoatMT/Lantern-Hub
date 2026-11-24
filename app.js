const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const navTargets = navLinks
  .map((link) => document.querySelector(link.hash))
  .filter(Boolean);

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
