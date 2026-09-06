(function () {
  "use strict";

  const $ = (sel, scope) => (scope || document).querySelector(sel);
  const $$ = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  function initSmoothScroll() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const navEl = $("[data-nav]");
      const navOffset = navEl ? navEl.offsetHeight : 72;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - navOffset + 1,
        behavior: reduced ? "auto" : "smooth"
      });
      const navLinks = $("[data-nav] .nav-links");
      const toggle = $("[data-nav-toggle]");
      if (navLinks && navLinks.classList.contains("is-open")) {
        navLinks.classList.remove("is-open");
        $("[data-nav]").classList.remove("is-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function initNav() {
    const nav = $("[data-nav]");
    if (!nav) return;
    const onScroll = () => {
      nav.classList.toggle("is-solid", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = $("[data-nav-toggle]", nav);
    const links = $(".nav-links", nav);
    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const open = links.classList.toggle("is-open");
        nav.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  }

  function initReveals() {
    const targets = $$(".reveal");
    if (!targets.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    targets.forEach((t) => io.observe(t));

    setTimeout(() => {
      $$(".reveal:not(.is-visible)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  function initCountUp() {
    const nodes = $$("[data-count-to]");
    if (!nodes.length) return;
    const animate = (el) => {
      const target = parseFloat(el.getAttribute("data-count-to"));
      if (Number.isNaN(target)) return;
      const duration = reduced ? 0 : 1400;
      if (duration === 0) { el.textContent = target; return; }
      const start = performance.now();
      const from = 0;
      function tick(now) {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(from + (target - from) * eased);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    nodes.forEach((n) => io.observe(n));
  }

  function initHeroParallax() {
    const bg = $(".hero-bg");
    if (!bg || reduced) return;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        bg.style.transform = "scale(1.04) translateY(" + (y * 0.12) + "px)";
      }
    }, { passive: true });
  }

  function initReserveForm() {
    const form = $("[data-reserve-form]");
    if (!form) return;
    const note = $("[data-form-note]", form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const btn = $(".form-submit", form);
      if (btn) btn.setAttribute("disabled", "true");
      setTimeout(() => {
        form.reset();
        if (note) note.hidden = false;
        if (btn) btn.removeAttribute("disabled");
      }, 500);
    });
  }

  function boot() {
    safe(initSmoothScroll, "initSmoothScroll");
    safe(initNav, "initNav");
    safe(initReveals, "initReveals");
    safe(initCountUp, "initCountUp");
    safe(initHeroParallax, "initHeroParallax");
    safe(initReserveForm, "initReserveForm");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
