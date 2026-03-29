function toggleUniverse() {
  const canvas = document.getElementById("universe");

  if (!canvas) return;

  // 当前是否隐藏
  const isHidden = canvas.style.display === "none";

  canvas.style.display = isHidden ? "block" : "none";
}