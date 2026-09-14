// const menuToggle = document.querySelector(".menu-toggle");
// const nav = document.querySelector(".nav-links");

// menuToggle?.addEventListener("click", () => {
//   nav.classList.toggle("mobile-open");
// });

// document.querySelectorAll(".nav-links a").forEach(link => {
//   link.addEventListener("click", () => nav.classList.remove("mobile-open"));
// });

// const sections = document.querySelectorAll("main section[id]");
// const links = document.querySelectorAll(".nav-links a");

// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       links.forEach(link => link.classList.toggle(
//         "active", link.getAttribute("href") === `#${entry.target.id}`
//       ));
//     }
//   });
// }, { rootMargin: "-35% 0px -55% 0px" });

// sections.forEach(section => observer.observe(section));

// document.getElementById("newsletter")?.addEventListener("submit", event => {
//   event.preventDefault();
//   const input = event.currentTarget.querySelector("input");
//   alert(`Thanks! ${input.value} has been added to the CodX Studio newsletter.`);
//   input.value = "";
// });

// document.addEventListener("click", event => {
//   if (!nav || !menuToggle) return;
//   if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
//     nav.classList.remove("mobile-open");
//   }
// });

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

/* =========================================================
MOBILE NAVIGATION
========================================================= */

menuToggle?.addEventListener("click", () => {
const isOpen = nav.classList.toggle("mobile-open");

menuToggle.setAttribute("aria-expanded", String(isOpen));
menuToggle.setAttribute(
"aria-label",
isOpen ? "Close menu" : "Open menu"
);
});

document.querySelectorAll(".nav-links a").forEach(link => {
link.addEventListener("click", () => {
nav?.classList.remove("mobile-open");

```
menuToggle?.setAttribute("aria-expanded", "false");
menuToggle?.setAttribute("aria-label", "Open menu");
```

});
});

document.addEventListener("click", event => {
if (!nav || !menuToggle) return;

if (
!nav.contains(event.target) &&
!menuToggle.contains(event.target)
) {
nav.classList.remove("mobile-open");

```
menuToggle.setAttribute("aria-expanded", "false");
menuToggle.setAttribute("aria-label", "Open menu");
```

}
});

/* =========================================================
ACTIVE NAVIGATION ON SCROLL
========================================================= */

const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
entries => {
entries.forEach(entry => {
if (!entry.isIntersecting) return;

```
  links.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${entry.target.id}`
    );
  });
});
```

},
{
rootMargin: "-35% 0px -55% 0px"
}
);

sections.forEach(section => sectionObserver.observe(section));

/* =========================================================
SCROLL REVEAL ANIMATIONS
========================================================= */

const revealElements = document.querySelectorAll(
".section-heading, " +
".service-card, " +
".pricing-card, " +
".pricing-custom, " +
".tech-grid > div, " +
".process-grid article, " +
".about-card, " +
".blog-grid article, " +
".contact-card, " +
".stats"
);

revealElements.forEach((element, index) => {
element.classList.add("reveal");

/*

* Small stagger between elements in the same page.
* CSS will control the actual animation.
  */
  element.style.setProperty(
  "--reveal-delay",
  `${Math.min(index * 45, 350)}ms`
  );
  });

const revealObserver = new IntersectionObserver(
entries => {
entries.forEach(entry => {
if (!entry.isIntersecting) return;

```
  entry.target.classList.add("is-visible");

  /*
   * Stop observing after the first reveal.
   * This prevents the animation from replaying every time
   * the user scrolls past the element.
   */
  revealObserver.unobserve(entry.target);
});
```

},
{
threshold: 0.12,
rootMargin: "0px 0px -45px 0px"
}
);

revealElements.forEach(element => {
revealObserver.observe(element);
});

/* =========================================================
HERO ENTRANCE ANIMATION
========================================================= */

const heroCopy = document.querySelector(".hero-copy");

if (heroCopy) {
const heroElements = heroCopy.querySelectorAll(
".code-symbol, h1, > p, .hero-actions"
);

heroElements.forEach((element, index) => {
element.classList.add("hero-reveal");
element.style.setProperty(
"--hero-delay",
`${150 + index * 130}ms`
);
});

/*

* Trigger on the next frame so the browser can paint the
* initial state before starting the animation.
  */
  requestAnimationFrame(() => {
  heroElements.forEach(element => {
  element.classList.add("hero-visible");
  });
  });
  }

/* =========================================================
HERO ART MOUSE PARALLAX
========================================================= */

const hero = document.querySelector(".hero");
const heroArt = document.querySelector(".hero-art");

if (hero && heroArt && window.matchMedia("(pointer: fine)").matches) {
let animationFrame = null;

hero.addEventListener("mousemove", event => {
const rect = hero.getBoundingClientRect();

```
const x = (event.clientX - rect.left) / rect.width - 0.5;
const y = (event.clientY - rect.top) / rect.height - 0.5;

if (animationFrame) {
  cancelAnimationFrame(animationFrame);
}

animationFrame = requestAnimationFrame(() => {
  heroArt.style.setProperty(
    "--mouse-x",
    `${x * 14}px`
  );

  heroArt.style.setProperty(
    "--mouse-y",
    `${y * 10}px`
  );
});
```

});

hero.addEventListener("mouseleave", () => {
if (animationFrame) {
cancelAnimationFrame(animationFrame);
}

```
heroArt.style.setProperty("--mouse-x", "0px");
heroArt.style.setProperty("--mouse-y", "0px");
```

});
}

/* =========================================================
BUTTON RIPPLE EFFECT
========================================================= */

document.querySelectorAll(".btn, .nav-cta").forEach(button => {
button.addEventListener("click", event => {
/*
* Do not create a ripple for modified clicks
* such as Cmd/Ctrl + click.
*/
if (
event.ctrlKey ||
event.metaKey ||
event.shiftKey ||
event.altKey
) {
return;
}

```
const rect = button.getBoundingClientRect();

const ripple = document.createElement("span");

ripple.className = "button-ripple";

ripple.style.left = `${event.clientX - rect.left}px`;
ripple.style.top = `${event.clientY - rect.top}px`;

button.appendChild(ripple);

ripple.addEventListener("animationend", () => {
  ripple.remove();
});
```

});
});

/* =========================================================
STAT COUNTER ANIMATION
========================================================= */

const statNumbers = document.querySelectorAll(".stats strong");

const animateCounter = element => {
const originalText = element.textContent.trim();

/*

* Supports values such as:
* 25+
* 15+
* 50K+
* 99%
  */
  const match = originalText.match(/^([\d,.]+)(.*)$/);

if (!match) return;

const numericPart = match[1];
const suffix = match[2];

const target = Number(
numericPart.replace(/,/g, "")
);

if (!Number.isFinite(target)) return;

const duration = 1200;
const startTime = performance.now();

const updateCounter = currentTime => {
const elapsed = currentTime - startTime;
const progress = Math.min(elapsed / duration, 1);

```
/*
 * Ease-out cubic.
 * Starts quickly and smoothly settles at the final value.
 */
const easedProgress =
  1 - Math.pow(1 - progress, 3);

const currentValue = Math.round(
  target * easedProgress
);

element.textContent =
  `${currentValue}${suffix}`;

if (progress < 1) {
  requestAnimationFrame(updateCounter);
} else {
  element.textContent =
    `${numericPart}${suffix}`;
}
```

};

requestAnimationFrame(updateCounter);
};

if (statNumbers.length) {
const statsObserver = new IntersectionObserver(
entries => {
entries.forEach(entry => {
if (!entry.isIntersecting) return;

```
    statNumbers.forEach(animateCounter);

    statsObserver.disconnect();
  });
},
{
  threshold: 0.35
}
```

);

const statsSection = document.querySelector(".stats");

if (statsSection) {
statsObserver.observe(statsSection);
}
}

/* =========================================================
PRICING CARD POINTER GLOW
========================================================= */

const pricingCards = document.querySelectorAll(
".pricing-card"
);

if (window.matchMedia("(pointer: fine)").matches) {
pricingCards.forEach(card => {
card.addEventListener("pointermove", event => {
const rect = card.getBoundingClientRect();

```
  const x =
    ((event.clientX - rect.left) / rect.width) * 100;

  const y =
    ((event.clientY - rect.top) / rect.height) * 100;

  card.style.setProperty(
    "--pointer-x",
    `${x}%`
  );

  card.style.setProperty(
    "--pointer-y",
    `${y}%`
  );
});

card.addEventListener("pointerleave", () => {
  card.style.setProperty(
    "--pointer-x",
    "50%"
  );

  card.style.setProperty(
    "--pointer-y",
    "50%"
  );
});
```

});
}

/* =========================================================
NEWSLETTER
========================================================= */

document
.getElementById("newsletter")
?.addEventListener("submit", event => {
event.preventDefault();

```
const input =
  event.currentTarget.querySelector("input");

if (!input) return;

const email = input.value.trim();

if (!email) return;

alert(
  `Thanks! ${email} has been added to the CodX Studio newsletter.`
);

input.value = "";
```

});

/* =========================================================
REDUCED MOTION SUPPORT
========================================================= */

const reducedMotion =
window.matchMedia("(prefers-reduced-motion: reduce)");

const handleReducedMotion = event => {
if (event.matches) {
document.documentElement.classList.add(
"reduce-motion"
);
} else {
document.documentElement.classList.remove(
"reduce-motion"
);
}
};

handleReducedMotion(reducedMotion);

if (typeof reducedMotion.addEventListener === "function") {
reducedMotion.addEventListener(
"change",
handleReducedMotion
);
}

