(() => {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const indicator = document.getElementById("slideIndicator");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const printBtn = document.getElementById("printBtn");
  let index = 0;

  const sync = () => {
    indicator.textContent = `${index + 1} / ${slides.length}`;
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= slides.length - 1;
  };

  const go = (i) => {
    index = Math.max(0, Math.min(slides.length - 1, i));
    slides[index].scrollIntoView({ behavior: "smooth", block: "start" });
    sync();
  };

  prevBtn.addEventListener("click", () => go(index - 1));
  nextBtn.addEventListener("click", () => go(index + 1));
  printBtn.addEventListener("click", () => window.print());

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "Home") {
      go(0);
    } else if (e.key === "End") {
      go(slides.length - 1);
    } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "p") {
      // native print dialog still works; keep default
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      index = slides.indexOf(visible.target);
      sync();
    },
    { threshold: 0.55 }
  );

  slides.forEach((s) => observer.observe(s));
  sync();
})();
