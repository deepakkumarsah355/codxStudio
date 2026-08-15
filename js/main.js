const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  nav.classList.toggle("mobile-open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("mobile-open"));
});

const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.toggle(
        "active", link.getAttribute("href") === `#${entry.target.id}`
      ));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => observer.observe(section));

document.getElementById("newsletter")?.addEventListener("submit", event => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  alert(`Thanks! ${input.value} has been added to the CodX Studio newsletter.`);
  input.value = "";
});

document.addEventListener("click", event => {
  if (!nav || !menuToggle) return;
  if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
    nav.classList.remove("mobile-open");
  }
});
