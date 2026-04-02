function toggleIphone() {
    const container = document.getElementById("iphone17-container");
    if (!container) return;
    container.style.display = (container.style.display === "none") ? "block" : "none";
    console.log('ssss')
}

// 可选：绑定快捷键 H
document.addEventListener("keydown", (e) => {
    if (e.key === "h" || e.key === "H") {
        toggleIphone();
    }
});