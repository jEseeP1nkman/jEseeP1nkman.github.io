let cleanMode = false;

function toggleCleanMode() {
  cleanMode = !cleanMode;

  document.querySelectorAll("body *").forEach(el => {

    // ✅ 白名单（本体）
    if (
      el.id === "universe" ||
      el.id === "clean-toggle" ||
      el.id === "rightMenu"
    ) return;

    // ✅ 如果在 rightMenu 里面 → 跳过
    if (el.closest("#rightMenu")) return;

    el.style.display = cleanMode ? "none" : "";
  });
}