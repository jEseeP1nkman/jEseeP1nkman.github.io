
function toggleFPS() {
    let ContainerFPSBoard = document.getElementById("FPSBoard");
    // ❗第一次点击 → 创建
    if (!ContainerFPSBoard) {
        createUltraMonitor();   // ⚠️ 直接创建！不要绕 ShowInitFPSBoard
        return; // 👉 这里必须 return
    }

    // ❗之后点击 → 切换显示
    const isHidden = ContainerFPSBoard.style.display === "none";

    ContainerFPSBoard.style.display = isHidden ? "block" : "none";
    
}