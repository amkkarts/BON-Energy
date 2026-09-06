(() => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = [...document.querySelectorAll(".main-nav a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const form = document.querySelector("#quote-form");
  const message = document.querySelector(".form-message");

  const closeMenu = () => {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav?.classList.toggle("open") ?? false;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!mainNav?.classList.contains("open")) return;
    if (!mainNav.contains(event.target) && !menuToggle?.contains(event.target)) closeMenu();
  });

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (message) {
      message.textContent = "Thank you. Your request has been captured in this demo form.";
    }
    form.reset();
  });

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });
})();
