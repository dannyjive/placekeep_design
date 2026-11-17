const btn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");
btn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    btn.setAttribute("aria-expanded", false);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    nav.classList.remove("open");
    btn.setAttribute("aria-expanded", false);
    btn.focus();
  }
});

/* Tabs on desktop, accordion on mobile (Approach page) */
/* Approach page: expandable sections (grid on desktop, stacked on mobile) */
document.querySelectorAll(".tabs").forEach((group) => {
  const tabs = [...group.querySelectorAll(".tab")];

  const setOpen = (tab, open) => {
    tab.setAttribute("aria-expanded", open);
    document.getElementById(tab.getAttribute("aria-controls")).hidden = !open;
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const wasOpen = tab.getAttribute("aria-expanded") === "true";
      tabs.forEach((t) => setOpen(t, false)); // one open at a time
      setOpen(tab, !wasOpen);                 // click an open one to close it
    });
  });
});

/* Contact page: independent accordions + form submit */
document.querySelectorAll(".acc-btn").forEach((b) =>
  b.addEventListener("click", () => {
    const open = b.getAttribute("aria-expanded") === "true";
    b.setAttribute("aria-expanded", !open);
    document.getElementById(b.getAttribute("aria-controls")).hidden = open;
  }),
);
document.querySelectorAll(".acc-body form").forEach((form) =>
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = form.querySelector(".status");
    const btn = form.querySelector(".submit");
    btn.disabled = true;
    status.textContent = "Sending…";
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      form.reset();
      status.textContent =
        "Thanks, your message was sent. We\u2019ll be in touch soon.";
    } catch {
      status.textContent =
        "Something went wrong and your message wasn\u2019t sent. Please try again or email hello@placekeep.com.";
    }
    btn.disabled = false;
  }),
);
