(() => {
  const revealTargets = document.querySelectorAll(
    ".section-inner > .eyebrow, .section-inner > h2, .section-inner > .lede, .metric-row, .split, .insight-list, .compare, .phases, .data-table, .target-list, .fineprint"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(".reveal, .bar-row").forEach((el) => observer.observe(el));

  const amount = document.querySelector(".hero-amount");
  if (!amount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const target = Number(amount.dataset.count || "0");
  const duration = 1400;
  const start = performance.now();

  const format = (n) =>
    "$" +
    Math.round(n).toLocaleString("en-US", {
      maximumFractionDigits: 0,
    });

  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    amount.textContent = format(target * eased);
    if (t < 1) requestAnimationFrame(tick);
    else amount.textContent = "$7,991,361";
  };

  requestAnimationFrame(tick);
})();
