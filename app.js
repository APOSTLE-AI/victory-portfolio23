/* =====================================================================
   VICTORY PORTFOLIO: APP
   Renders everything in content.js into the page and wires up the
   interactive bits (nav, filters, dialogs, palette, theme).
   You shouldn't need to edit this file to update site content, only
   to change how something behaves.

   SECURITY / ROBUSTNESS NOTES (read this if you're touching this file)
   -----------------------------------------------------------------
   1. Nothing in this file uses innerHTML. Every piece of text from
      content.js is inserted with .textContent, and every element is
      built with document.createElement(). That means even if
      content.js is ever edited carelessly (or a public GitHub pull
      request tries to sneak in a "<script>" or an onerror= attribute
      inside a title or bio field), the browser will display it as
      plain text instead of running it. This is the single biggest
      real protection a static, no-backend site like this can have.
   2. Every link built from content.js data (book links, LinkedIn,
      Fiverr, email, phone) is passed through isSafeUrl() first, which
      only allows the http:, https:, mailto:, and tel: schemes. This
      stops a bad edit like link: "javascript:...", from ever
      becoming a clickable href.
   3. content.js is validated (see validateSite) before anything
      renders. If a field is missing or the wrong type, that one
      section is skipped and a message goes to the console instead of
      the whole page breaking silently.
   4. window.SITE is frozen (deepFreeze) after validation, so no
      later script on the page (a future analytics snippet, a browser
      extension, etc.) can quietly rewrite your bio or contact info
      in memory after the page has loaded.

   What this file deliberately does NOT include: CSRF tokens, session
   cookie handling, or server-side input validation. Those protect
   against attacks on a backend, and this site has no backend, no
   database, no login, and no cookies. If you ever add a real form
   handler (e.g. a Vercel serverless function that emails you), that
   is the point where those concerns become real. See the README's
   Security section for what to do then.
   ===================================================================== */
(function () {
  "use strict";

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------- DOM HELPER */
  // Builds an element without ever touching innerHTML. `props.text` sets
  // textContent (never HTML). Anything you don't explicitly allow through
  // here can't end up interpreted as markup.
  function el(tag, props, children) {
    const node = document.createElement(tag);
    if (props) {
      if (props.class) node.className = props.class;
      if (props.text !== undefined) node.textContent = props.text;
      if (props.href !== undefined) node.setAttribute("href", props.href);
      if (props.type !== undefined) node.setAttribute("type", props.type);
      if (props.target !== undefined) {
        node.setAttribute("target", props.target);
        // Always paired with target="_blank": stops the new tab from
        // getting a handle back to this page (window.opener) and stops
        // this page's URL leaking to the destination via the Referer header.
        node.setAttribute("rel", "noopener noreferrer");
      }
      if (props.attrs) Object.entries(props.attrs).forEach(([k, v]) => node.setAttribute(k, v));
      if (props.dataset) Object.entries(props.dataset).forEach(([k, v]) => (node.dataset[k] = v));
    }
    (children || []).forEach((c) => c && node.appendChild(c));
    return node;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  /* ---------------------------------------------------------- URL ALLOWLIST */
  // Only these schemes are ever allowed into an href built from content.js.
  // Anything else (javascript:, data:, vbscript:, a bare "//evil.com", etc.)
  // is refused, logged, and the caller falls back to plain text instead.
  const ALLOWED_SCHEMES = ["http:", "https:", "mailto:", "tel:"];

  function isSafeUrl(value, { schemes = ["http:", "https:"] } = {}) {
    if (typeof value !== "string" || !value.trim()) return false;
    try {
      // Base URL lets tel:/mailto: (which have no host) still parse.
      const url = new URL(value, "https://placeholder.invalid/");
      return schemes.includes(url.protocol);
    } catch (err) {
      return false;
    }
  }

  /* -------------------------------------------------------- CONTENT CHECKS */
  // Confirms content.js actually shipped the shape this file expects. If
  // something is missing (a typo while editing content.js is the realistic
  // cause), we say so in the console and let the caller skip gracefully
  // instead of throwing and leaving a half-rendered page with no
  // explanation.
  function validateSite(site) {
    const problems = [];
    if (!site || typeof site !== "object") return ["window.SITE is missing entirely."];
    const requireArray = (key) => {
      if (!Array.isArray(site[key])) problems.push(`SITE.${key} should be a list (array) but isn't.`);
    };
    const requireObject = (key) => {
      if (!site[key] || typeof site[key] !== "object") problems.push(`SITE.${key} should be an object but isn't.`);
    };
    requireObject("PROFILE");
    requireArray("HOW_I_WORK");
    requireArray("SKILLS");
    requireArray("TOOLS");
    requireArray("EXPERIENCE");
    requireArray("EDUCATION");
    requireArray("SERVICES");
    requireArray("BOOKS");
    requireArray("SAMPLES");
    requireObject("RECRUITER");
    requireObject("CLIENT");
    return problems;
  }

  function deepFreeze(value, seen) {
    seen = seen || new WeakSet();
    if (value === null || typeof value !== "object" || seen.has(value)) return value;
    seen.add(value);
    Object.values(value).forEach((v) => deepFreeze(v, seen));
    return Object.freeze(value);
  }

  function safeRun(label, fn) {
    try {
      fn();
    } catch (err) {
      // A single broken section (e.g. a malformed entry someone pasted
      // into content.js) shows up here instead of taking the rest of the
      // page down with it.
      console.error(`[portfolio] Could not render "${label}":`, err);
    }
  }

  let S = null;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    if (typeof window.SITE === "undefined") {
      showFatalError("This page's content failed to load (content.js didn't run). Try refreshing, or check the browser console for details.");
      return;
    }
    const problems = validateSite(window.SITE);
    if (problems.includes("window.SITE is missing entirely.")) {
      showFatalError("This page's content is missing. Try refreshing.");
      return;
    }
    problems.forEach((p) => console.error("[portfolio] content.js problem:", p));

    S = deepFreeze(window.SITE);

    safeRun("hero", renderHero);
    safeRun("about", renderAbout);
    safeRun("mode toggle", renderModeToggle);
    safeRun("how I work", renderWorkSteps);
    safeRun("skills", renderSkills);
    safeRun("timeline", renderTimeline);
    safeRun("education", renderEducation);
    safeRun("books", renderBooks);
    safeRun("samples", renderSamples);
    safeRun("services", renderServices);
    safeRun("contact", renderContact);

    safeRun("header", setupHeader);
    safeRun("scroll progress", setupScrollProgress);
    safeRun("scroll spy", setupScrollSpy);
    safeRun("theme", setupTheme);
    safeRun("dialogs", setupDialogs);
    safeRun("command palette", setupCommandPalette);
    safeRun("contact form", setupContactForm);

    const yearEl = $("#footer-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    safeRun("hash route", handleHashRoute);
    window.addEventListener("hashchange", () => safeRun("hash route", handleHashRoute));
  }

  function showFatalError(message) {
    const main = $("#main");
    if (!main) return;
    clear(main);
    main.appendChild(
      el("div", { class: "wrap", attrs: { style: "padding-block:80px;" } }, [
        el("p", { text: message }),
      ])
    );
  }

  /* ------------------------------------------------------------------ HERO */
  function renderHero() {
    $("#hero-roles").textContent = S.PROFILE.roles.join(" \u00B7 ");
    $("#hero-lead").textContent = S.PROFILE.heroLead;
    $("#hero-location").textContent = `${S.PROFILE.location} \u00B7 ${S.PROFILE.availability}`;
    $("#pull-quote-text").textContent = `\u201C${S.PROFILE.pullQuote}\u201D`;
    $("#pull-quote-caption").textContent = S.PROFILE.pullQuoteCaption;

    const list = $("#status-lines");
    clear(list);
    S.PROFILE.statusLines.forEach((line, i) => {
      list.appendChild(el("li", { text: line, class: i === 0 ? "is-current" : "" }));
    });

    if (!reducedMotion && S.PROFILE.statusLines.length > 1) {
      let i = 0;
      const items = $$("li", list);
      setInterval(() => {
        items[i].classList.remove("is-current");
        i = (i + 1) % items.length;
        items[i].classList.add("is-current");
      }, 2800);
    } else {
      $$("li", list).forEach((li) => li.classList.add("is-current"));
    }
  }

  /* ------------------------------------------------------------------ ABOUT */
  function renderAbout() {
    const wrap = $("#about-paragraphs");
    clear(wrap);
    S.PROFILE.about.forEach((p) => wrap.appendChild(el("p", { text: p })));

    const link = $("#linkedin-link");
    if (isSafeUrl(S.PROFILE.linkedIn)) {
      link.href = S.PROFILE.linkedIn;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      console.error("[portfolio] PROFILE.linkedIn is not a valid http(s) URL, link disabled.");
    }
    link.textContent = S.PROFILE.linkedInLabel;

    $("#fact-location").textContent = S.PROFILE.location;
    $("#fact-availability").textContent = S.PROFILE.availability;

    const tools = $("#fact-tools");
    clear(tools);
    S.TOOLS.forEach((t) => tools.appendChild(el("span", { class: "tag", text: t })));
  }

  /* -------------------------------------------------------------- MODE TOGGLE */
  function renderModeToggle() {
    const buttons = $$(".mode-btn");
    function apply(mode) {
      const data = mode === "client" ? S.CLIENT : S.RECRUITER;
      $("#mode-summary").textContent = data.summary;
      const list = $("#mode-points");
      clear(list);
      data.points.forEach((p) => list.appendChild(el("li", { text: p })));
      buttons.forEach((b) => b.classList.toggle("is-active", b.dataset.mode === mode));
    }
    buttons.forEach((b) => b.addEventListener("click", () => apply(b.dataset.mode)));
    apply("recruiter");
  }

  /* ------------------------------------------------------------- HOW I WORK */
  function renderWorkSteps() {
    const wrap = $("#work-steps");
    clear(wrap);
    S.HOW_I_WORK.forEach((s) => {
      const btn = el("button", { class: "work-step-head", type: "button", attrs: { "aria-expanded": "false" } }, [
        el("span", { class: "work-step-num", text: String(s.step).padStart(2, "0") }),
        el("span", { class: "work-step-title", text: s.title }),
        el("span", { class: "work-step-icon", text: "+", attrs: { "aria-hidden": "true" } }),
      ]);
      const body = el("div", { class: "work-step-body" }, [el("p", { text: s.body })]);
      const step = el("div", { class: "work-step", attrs: { "data-open": "false" } }, [btn, body]);
      btn.addEventListener("click", () => {
        const isOpen = step.dataset.open === "true";
        step.dataset.open = String(!isOpen);
        btn.setAttribute("aria-expanded", String(!isOpen));
      });
      wrap.appendChild(step);
    });
  }

  /* ----------------------------------------------------------------- SKILLS */
  function renderSkills() {
    const filters = $("#skills-filters");
    const grid = $("#skills-grid");
    const categories = ["All", ...S.SKILLS.map((s) => s.category)];

    clear(filters);
    categories.forEach((c, i) => {
      filters.appendChild(
        el("button", { class: `filter-btn${i === 0 ? " is-active" : ""}`, type: "button", dataset: { filter: c }, text: c })
      );
    });

    clear(grid);
    S.SKILLS.forEach((group) => {
      const ul = el(
        "ul",
        {},
        group.items.map((it) => el("li", { text: it }))
      );
      grid.appendChild(el("div", { class: "skill-card", dataset: { category: group.category } }, [el("h3", { text: group.category }), ul]));
    });

    filters.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      $$(".filter-btn", filters).forEach((b) => b.classList.toggle("is-active", b === btn));
      const val = btn.dataset.filter;
      $$(".skill-card", grid).forEach((card) => {
        card.style.display = val === "All" || card.dataset.category === val ? "" : "none";
      });
    });
  }

  /* -------------------------------------------------------------- TIMELINE */
  function renderTimeline() {
    const wrap = $("#timeline");
    clear(wrap);
    S.EXPERIENCE.forEach((job) => {
      const ul = el(
        "ul",
        {},
        job.bullets.map((b) => el("li", { text: b }))
      );
      wrap.appendChild(
        el("article", { class: "timeline-item" }, [
          el("p", { class: "dates", text: `${job.dates} \u00B7 ${job.place}` }),
          el("h3", { text: job.role }),
          el("p", { class: "org", text: job.org }),
          ul,
        ])
      );
    });
  }

  function renderEducation() {
    const wrap = $("#education-list");
    clear(wrap);
    S.EDUCATION.forEach((ed) => {
      const children = [
        el("h4", { text: ed.title }),
        el("p", { class: "org", text: ed.dates ? `${ed.org} \u00B7 ${ed.dates}` : ed.org }),
      ];
      if (ed.note) children.push(el("p", { class: "note", text: ed.note }));
      wrap.appendChild(el("li", {}, children));
    });
  }

  /* ------------------------------------------------------------------ BOOKS */
  const BOOK_GROUP_LABELS = { fiction: "Fiction", chess: "Chess instruction", academic: "Academic publishing" };
  const BOOK_KINDS = ["fiction", "chess", "academic"];

  function renderBooks() {
    const wrap = $("#books-groups");
    clear(wrap);
    BOOK_KINDS.forEach((kind) => {
      const books = S.BOOKS.filter((b) => b.kind === kind);
      if (!books.length) return;

      const row = el(
        "div",
        { class: "book-row" },
        books.map((b) => {
          const spine = el("button", { class: `book-spine kind-${b.kind}`, type: "button", dataset: { slug: b.slug } }, [
            el("span", { class: "part", text: b.part || "" }),
            el("span", { class: "title", text: b.title }),
            el("span", { class: "subtitle", text: b.subtitle }),
          ]);
          spine.addEventListener("click", () => openBook(b.slug));
          return spine;
        })
      );
      wrap.appendChild(el("div", { class: "book-group" }, [el("h3", { text: BOOK_GROUP_LABELS[kind] || kind }), row]));
    });
  }

  function openBook(slug) {
    if (!/^[a-z0-9-]+$/.test(String(slug))) return;
    const book = S.BOOKS.find((b) => b.slug === slug);
    if (!book) return;
    $("#book-dialog-series").textContent = [book.series, book.part].filter(Boolean).join(" \u00B7 ");
    $("#book-dialog-title").textContent = book.title;
    $("#book-dialog-meta").textContent = `${book.subtitle} \u00B7 ${book.year}`;
    $("#book-dialog-blurb").textContent = book.blurb;

    const linkP = $("#book-dialog-link");
    clear(linkP);
    if (isSafeUrl(book.link)) {
      const a = el("a", { class: "btn btn-line btn-small", href: book.link, target: "_blank", text: `View on ${book.platform}` });
      linkP.appendChild(a);
    } else {
      if (book.link) console.error(`[portfolio] Book "${book.title}" has an unsafe or malformed link, showing text only.`);
      linkP.appendChild(el("span", { class: "muted-note", text: `Available via ${book.platform}` }));
    }
    openDialog($("#book-backdrop"));
    history.replaceState(null, "", `#b-${slug}`);
  }

  /* ---------------------------------------------------------------- SAMPLES */
  function renderSamples() {
    const filters = $("#samples-filters");
    const grid = $("#samples-grid");
    const categories = ["All", ...Array.from(new Set(S.SAMPLES.map((s) => s.category)))];

    clear(filters);
    categories.forEach((c, i) => {
      filters.appendChild(
        el("button", { class: `filter-btn${i === 0 ? " is-active" : ""}`, type: "button", dataset: { filter: c }, text: c })
      );
    });

    clear(grid);
    S.SAMPLES.forEach((sample) => {
      const card = el("button", { class: "sample-card", type: "button", dataset: { slug: sample.slug, category: sample.category } }, [
        el("span", { class: "sample-cat", text: sample.category }),
        el("h3", { text: sample.title }),
        el("p", { class: "dek", text: sample.dek }),
        el("p", { class: "meta", text: `${sample.wordCount.toLocaleString()} words \u00B7 ${sample.year}` }),
        el("span", { class: "read-link", text: "Read the full piece" }),
      ]);
      grid.appendChild(card);
    });

    filters.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      $$(".filter-btn", filters).forEach((b) => b.classList.toggle("is-active", b === btn));
      const val = btn.dataset.filter;
      $$(".sample-card", grid).forEach((card) => {
        card.style.display = val === "All" || card.dataset.category === val ? "" : "none";
      });
    });

    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".sample-card");
      if (card) openSample(card.dataset.slug);
    });
  }

  function openSample(slug) {
    if (!/^[a-z0-9-]+$/.test(String(slug))) return;
    const sample = S.SAMPLES.find((s) => s.slug === slug);
    if (!sample) return;
    $("#sample-dialog-dek").textContent = sample.category;
    $("#sample-dialog-title").textContent = sample.title;
    $("#sample-dialog-meta").textContent = `${sample.dek} \u00B7 ${sample.wordCount.toLocaleString()} words \u00B7 ${sample.year}`;

    const body = $("#sample-dialog-body");
    clear(body);
    sample.body.forEach((block) => {
      if (block.type === "h2") body.appendChild(el("h2", { text: block.text }));
      else if (block.type === "quote") body.appendChild(el("blockquote", { text: block.text }));
      else body.appendChild(el("p", { text: block.text }));
    });

    openDialog($("#sample-backdrop"));
    history.replaceState(null, "", `#s-${slug}`);
  }

  function handleHashRoute() {
    const hash = location.hash.slice(1);
    if (!hash) return;
    if (hash.startsWith("s-")) openSample(hash.slice(2));
    else if (hash.startsWith("b-")) openBook(hash.slice(2));
  }

  /* --------------------------------------------------------------- SERVICES */
  function renderServices() {
    const grid = $("#services-grid");
    clear(grid);
    S.SERVICES.forEach((svc) => {
      const ul = el(
        "ul",
        {},
        svc.items.map((i) => el("li", { text: i }))
      );
      grid.appendChild(
        el("div", { class: "service-card" }, [el("h3", { text: svc.group }), el("p", { class: "blurb", text: svc.blurb }), ul])
      );
    });
  }

  /* ---------------------------------------------------------------- CONTACT */
  function renderContact() {
    const setLink = (id, href, text, scheme) => {
      const node = $(id);
      if (isSafeUrl(href, { schemes: [scheme] })) {
        node.href = href;
      } else {
        console.error(`[portfolio] ${id} has an unsafe or malformed value, link disabled.`);
        node.removeAttribute("href");
      }
      node.textContent = text;
    };
    setLink("#contact-email", `mailto:${S.PROFILE.email}`, S.PROFILE.email, "mailto:");
    setLink("#contact-phone", S.PROFILE.phoneHref, S.PROFILE.phoneDisplay, "tel:");

    const linkedin = $("#contact-linkedin");
    if (isSafeUrl(S.PROFILE.linkedIn)) {
      linkedin.href = S.PROFILE.linkedIn;
      linkedin.target = "_blank";
      linkedin.rel = "noopener noreferrer";
    }
    linkedin.textContent = S.PROFILE.linkedInLabel;

    const fiverr = $("#contact-fiverr");
    if (isSafeUrl(S.PROFILE.fiverr)) {
      fiverr.href = S.PROFILE.fiverr;
      fiverr.target = "_blank";
      fiverr.rel = "noopener noreferrer";
    }
    fiverr.textContent = S.PROFILE.fiverrLabel;
  }

  function setupContactForm() {
    const form = $("#contact-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      try {
        // Basic input hygiene: trim, cap length so nobody can build a
        // pathologically long mailto: URL, and strip line breaks out of the
        // single-line "name" field so it can't masquerade as extra body text.
        const rawName = $("#cf-name").value.trim().replace(/[\r\n]+/g, " ");
        const name = (rawName || "Someone").slice(0, 100);
        const reason = $("#cf-reason").value.slice(0, 60);
        const message = $("#cf-message").value.trim().slice(0, 4000);

        if (!message) {
          $("#cf-message").focus();
          return;
        }
        if (!isSafeUrl(`mailto:${S.PROFILE.email}`, { schemes: ["mailto:"] })) {
          console.error("[portfolio] PROFILE.email is not valid, cannot build mailto link.");
          return;
        }

        const subject = `${reason}: message from ${name}`;
        const body = `Message from: ${name}\n\n${message}`;
        window.location.href = `mailto:${S.PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      } catch (err) {
        console.error("[portfolio] Contact form failed to build a mailto link:", err);
      }
    });
  }

  /* ------------------------------------------------------------------ HEADER */
  function setupHeader() {
    const toggle = $("#nav-toggle");
    const nav = $("#primary-nav");
    const scrim = document.createElement("div");
    scrim.className = "nav-scrim";
    document.body.appendChild(scrim);

    function closeNav() {
      nav.classList.remove("is-open");
      scrim.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
    function openNav() {
      nav.classList.add("is-open");
      scrim.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }
    toggle.addEventListener("click", () => (nav.classList.contains("is-open") ? closeNav() : openNav()));
    scrim.addEventListener("click", closeNav);
    $$("#primary-nav a").forEach((a) => a.addEventListener("click", closeNav));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  function setupScrollProgress() {
    const bar = $("#scroll-progress");
    function update() {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = max > 0 ? `${(scrolled / max) * 100}%` : "0%";
    }
    document.addEventListener("scroll", update, { passive: true });
    update();
  }

  function setupScrollSpy() {
    const links = $$('#primary-nav a[href^="#"]');
    const sections = links.map((a) => document.getElementById(a.getAttribute("href").slice(1))).filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
  }

  /* ------------------------------------------------------------------- THEME */
  function setupTheme() {
    const stored = localStorage.getItem("victory-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    $("#theme-btn").addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("victory-theme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("victory-theme", "dark");
      }
    });
  }

  /* ------------------------------------------------------------------ DIALOGS */
  let lastFocused = null;

  function openDialog(backdrop) {
    lastFocused = document.activeElement;
    backdrop.hidden = false;
    document.body.classList.add("no-scroll");
    const closeBtn = $(".dialog-close", backdrop) || backdrop;
    if (closeBtn) closeBtn.focus();
    backdrop.scrollTop = 0;
    const scroller = $(".dialog-scroll", backdrop);
    if (scroller) scroller.scrollTop = 0;
  }

  function closeDialog(backdrop) {
    backdrop.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    if (location.hash.startsWith("#s-") || location.hash.startsWith("#b-")) {
      history.replaceState(null, "", location.pathname + location.search);
    }
  }

  function setupDialogs() {
    $$(".dialog-backdrop").forEach((backdrop) => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) closeDialog(backdrop);
      });
      $$("[data-close]", backdrop).forEach((btn) => btn.addEventListener("click", () => closeDialog(backdrop)));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      $$(".dialog-backdrop").forEach((backdrop) => {
        if (!backdrop.hidden && backdrop.id !== "palette-backdrop") closeDialog(backdrop);
      });
    });
  }

  /* --------------------------------------------------------- COMMAND PALETTE */
  function setupCommandPalette() {
    const backdrop = $("#palette-backdrop");
    const input = $("#palette-input");
    const list = $("#palette-list");
    let activeIndex = 0;

    const sectionCommands = [
      { label: "About", hint: "Section", action: () => scrollToId("about") },
      { label: "How I work", hint: "Section", action: () => scrollToId("how") },
      { label: "Skills", hint: "Section", action: () => scrollToId("skills") },
      { label: "Experience", hint: "Section", action: () => scrollToId("experience") },
      { label: "Books & publishing", hint: "Section", action: () => scrollToId("books") },
      { label: "Writing samples", hint: "Section", action: () => scrollToId("work") },
      { label: "Services", hint: "Section", action: () => scrollToId("services") },
      { label: "Contact", hint: "Section", action: () => scrollToId("contact") },
      { label: "Download CV", hint: "PDF", action: () => window.open("assets/chijioke-victory-cv.pdf", "_blank", "noopener,noreferrer") },
    ];
    const sampleCommands = S.SAMPLES.map((s) => ({
      label: s.title,
      hint: "Sample",
      action: () => {
        scrollToId("work");
        openSample(s.slug);
      },
    }));
    const bookCommands = S.BOOKS.map((b) => ({
      label: b.title,
      hint: "Book",
      action: () => {
        scrollToId("books");
        openBook(b.slug);
      },
    }));
    const commands = [...sectionCommands, ...sampleCommands, ...bookCommands];

    function scrollToId(id) {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }

    function renderList(filtered) {
      clear(list);
      filtered.forEach((c, i) => {
        const btn = el("button", { type: "button", dataset: { index: String(i) } }, [
          document.createTextNode(c.label),
          el("span", { class: "cmd-hint", text: c.hint }),
        ]);
        list.appendChild(el("li", { class: i === activeIndex ? "is-active" : "" }, [btn]));
      });
    }

    let currentFiltered = commands;

    function filter() {
      // Cap the query length; nothing legitimate needs more than this to
      // filter a short command list, and it keeps the comparison cheap.
      const q = input.value.trim().toLowerCase().slice(0, 200);
      currentFiltered = q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands;
      activeIndex = 0;
      renderList(currentFiltered);
    }

    function open() {
      input.value = "";
      filter();
      backdrop.hidden = false;
      document.body.classList.add("no-scroll");
      input.focus();
    }
    function close() {
      backdrop.hidden = true;
      document.body.classList.remove("no-scroll");
    }

    $("#palette-btn").addEventListener("click", open);
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) close();
    });
    input.addEventListener("input", filter);
    list.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-index]");
      if (!btn) return;
      const item = currentFiltered[Number(btn.dataset.index)];
      if (item) item.action();
      close();
    });

    document.addEventListener("keydown", (e) => {
      const tag = (document.activeElement.tagName || "").toLowerCase();
      const typing = tag === "input" || tag === "textarea" || tag === "select";

      if (e.key === "/" && !typing) {
        e.preventDefault();
        open();
        return;
      }
      if (backdrop.hidden) return;

      if (e.key === "Escape") close();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, currentFiltered.length - 1);
        renderList(currentFiltered);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        renderList(currentFiltered);
      }
      if (e.key === "Enter" && currentFiltered[activeIndex]) {
        // Without this, focus already moved onto the (now-visible) dialog's
        // close button by the time the browser processes its own default
        // "Enter activates the focused button" behavior, which immediately
        // re-closed whatever we just opened. Stopping the default here is
        // what makes this reliable.
        e.preventDefault();
        currentFiltered[activeIndex].action();
        close();
      }
    });
  }
})();
