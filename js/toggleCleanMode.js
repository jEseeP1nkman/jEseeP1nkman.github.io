let cleanMode = false;

function toggleCleanMode() {
  cleanMode = !cleanMode;

  document.querySelectorAll("body *").forEach(el => {

    // ✅ 白名单（本体）
    if (
      el.id === "ILoveUSDollar" ||
      el.id === "proMenu" ||
      el.id === "iphone17-container" ||
      el.id === "vaultTerminal" ||
      el.id === "DeathStrandingBGElement"

      
    ) return;

    // ✅ 如果在 rightMenu 里面 → 跳过
    if (el.closest("#proMenu")) return;
    if (el.closest("#iphone17-container")) return;

    el.style.display = cleanMode ? "none" : "";
  });
}