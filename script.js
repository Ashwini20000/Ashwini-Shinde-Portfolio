// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-link, .nav-cta").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Highlight the navigation link for the visible section
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach((section) => sectionObserver.observe(section));

// Fade elements into view as the visitor scrolls
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Contact form: prepare an email in the visitor's email app.
// Change the address below to your real email address before publishing.
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const portfolioEmail = "ashwini@example.com";

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = "Please fill in all fields.";
    return;
  }

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  formMessage.textContent = "Opening your email app to send the message...";
  window.location.href = `mailto:${portfolioEmail}?subject=${subject}&body=${body}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
