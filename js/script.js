(() => {
  const emailjsConfig = {
    publicKey: "_hfJPN_qQQRVadmaj",
    serviceId: "service_ovx52m5",
    templateId: "template_zl0w7oo"
  };

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = [...document.querySelectorAll(".main-nav a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const form = document.querySelector("#quote-form");
  const message = document.querySelector(".form-message");
  const submitButton = form?.querySelector(".submit-btn");

  // --------------------------------------------------
  // EMAILJS INITIALIZATION
  // --------------------------------------------------

  if (window.emailjs) {
    window.emailjs.init({
      publicKey: emailjsConfig.publicKey
    });
  }

  // --------------------------------------------------
  // MOBILE NAVIGATION
  // --------------------------------------------------

  const closeMenu = () => {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav?.classList.toggle("open") ?? false;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!mainNav?.classList.contains("open")) return;

    if (
      !mainNav.contains(event.target) &&
      !menuToggle?.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // --------------------------------------------------
  // ACTIVE NAVIGATION ON SCROLL
  // --------------------------------------------------

  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  // --------------------------------------------------
  // EMAILJS - QUOTE / ENQUIRY FORM
  // --------------------------------------------------

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Check EmailJS configuration
    if (
      !window.emailjs ||
      Object.values(emailjsConfig).some((value) =>
        value.startsWith("YOUR_")
      )
    ) {
      if (message) {
        message.textContent =
          "The enquiry form is not configured yet. Please try again later.";
      }

      return;
    }

    const formData = new FormData(form);

    // --------------------------------------------------
    // GET CURRENT DATE & TIME
    // India Standard Time (IST)
    // --------------------------------------------------

    const enquiryTime = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date());

    // --------------------------------------------------
    // EMAILJS TEMPLATE PARAMETERS
    // --------------------------------------------------

    const templateParams = {
      name: formData.get("name")?.toString().trim() || "",
      company: formData.get("company")?.toString().trim() || "",
      phone: formData.get("phone")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      location: formData.get("location")?.toString().trim() || "",
      model: formData.get("model")?.toString().trim() || "",
      message: formData.get("application")?.toString().trim() || "",

      // Used by EmailJS as Reply-To
      reply_to: formData.get("email")?.toString().trim() || "",

      // Current enquiry date and time
      time: enquiryTime
    };

    // --------------------------------------------------
    // BUTTON STATE
    // --------------------------------------------------

    const submitText = submitButton?.querySelector(
      "span:first-child"
    );

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.setAttribute("aria-busy", "true");
    }

    if (submitText) {
      submitText.textContent = "Sending...";
    }

    // --------------------------------------------------
    // SEND EMAIL
    // --------------------------------------------------

    try {
      await window.emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams
      );

      if (message) {
        message.textContent =
          "Thank you. Your enquiry has been sent successfully.";
      }

      form.reset();

    } catch (error) {
      console.error(
        "EmailJS form submission failed:",
        error
      );

      if (message) {
        message.textContent =
          "We could not send your enquiry. Please try again or contact us directly.";
      }

    } finally {
      // --------------------------------------------------
      // RESTORE BUTTON
      // --------------------------------------------------

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.removeAttribute("aria-busy");
      }

      if (submitText) {
        submitText.textContent = "Submit Request";
      }
    }
  });

  // --------------------------------------------------
  // PREVENT EMPTY # LINKS FROM JUMPING TO TOP
  // --------------------------------------------------

  document
    .querySelectorAll('a[href="#"]')
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
      });
    });
})();