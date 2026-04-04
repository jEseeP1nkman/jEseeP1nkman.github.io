function toggleFalloutBG() {
    const container = document.getElementById("vaultTerminal");
    if (!container) return;
    container.style.display = (container.style.display === "none") ? "block" : "none";
}
