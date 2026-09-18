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
})();
