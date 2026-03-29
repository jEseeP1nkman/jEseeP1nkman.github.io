function Knowlege() {

  // 防止重复创建
  if (document.getElementById("custom-popup")) return;

  // === 创建遮罩层 ===
  const overlay = document.createElement("div");
  overlay.id = "custom-popup";

  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "99999",
    opacity: "0",
    transition: "opacity 0.3s"
  });

  // === 创建弹窗 ===
  const box = document.createElement("div");

Object.assign(box.style, {
  width: "400px",
  maxWidth: "90%",
  background: "linear-gradient(145deg, #000000, #000000)",
  borderRadius: "14px",
  padding: "22px",
  position: "relative",
  transform: "scale(0.8)",
  transition: "all 0.3s",
  fontFamily: "sans-serif",

  // ⭐ 黄金边框核心
  border: "0px solid transparent",
  backgroundClip: "padding-box",
  boxShadow: `
    0 0 0 2px rgba(255, 215, 0, 0.6),
    0 10px 30px rgb(0, 0, 0),
    inset 0 0 10px rgb(0, 0, 0)
  `
});


// === 关闭按钮 ===
const closeBtn = document.createElement("div");
closeBtn.innerHTML = "✖";

Object.assign(closeBtn.style, {
  position: "absolute",
  top: "8px",
  right: "12px",
  cursor: "pointer",
  fontSize: "22px", // ⭐ 变大
  color: "#ffd700", // 金色
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  transition: "all 0.25s ease",
  userSelect: "none"
});
// 鼠标移入：放大 + 旋转 + 发光
closeBtn.onmouseenter = () => {
  closeBtn.style.transform = "scale(1.3) rotate(90deg)";
  closeBtn.style.boxShadow = "0 0 10px rgba(255,215,0,0.8)";
};

// 鼠标移出：恢复
closeBtn.onmouseleave = () => {
  closeBtn.style.transform = "scale(1) rotate(0deg)";
  closeBtn.style.boxShadow = "none";
};

// 点击：按压感
closeBtn.onmousedown = () => {
  closeBtn.style.transform = "scale(0.9)";
};

closeBtn.onmouseup = () => {
  closeBtn.style.transform = "scale(1.3) rotate(90deg)";
};

  closeBtn.onclick = function () {
    overlay.style.opacity = "0";
    box.style.transform = "scale(0.8)";
    setTimeout(() => {
      overlay.remove();
    }, 300);
  };

  // === 内容区域（你改这里）===
  const content = document.createElement("div");
  content.innerHTML = `
    <h2 style="margin-top:0">食用提示：</h2>
    <p>1. 右键可以开关背景特效</p>
    <p>2. 右键可以开关欣赏模式（只保留背景）</p>
    <p>3. 右键可以开关手机，或者按下键盘"H"键也可以关闭</p>
  `;

  // === 组装 ===
  box.appendChild(closeBtn);
  box.appendChild(content);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

// === 底部关闭按钮 ===
const bottomBtn = document.createElement("div");
bottomBtn.innerText = "我知道了";

Object.assign(bottomBtn.style, {
  marginTop: "10px",
  padding: "10px 0",
  textAlign: "center",
  background: "linear-gradient(135deg, #ffd700, #ffae00)",
  color: "#000",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  letterSpacing: "1px",
  transition: "all 0.2s"
});

// hover 效果
bottomBtn.onmouseenter = () => {
  bottomBtn.style.transform = "scale(1.05)";
  bottomBtn.style.boxShadow = "0 0 10px rgba(255,215,0,0.8)";
};

bottomBtn.onmouseleave = () => {
  bottomBtn.style.transform = "scale(1)";
  bottomBtn.style.boxShadow = "none";
};

// 点击关闭（复用你的逻辑）
bottomBtn.onclick = closeBtn.onclick;

// 加进弹窗
box.appendChild(bottomBtn);
  
  // === 动画 ===
  setTimeout(() => {
    overlay.style.opacity = "1";
    box.style.transform = "scale(1)";
  }, 10);

};