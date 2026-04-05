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
closeBtn.innerHTML = "";

  closeBtn.onclick = function () {
    overlay.style.opacity = "0";
    box.style.transform = "scale(0.8)";
    setTimeout(() => {
      overlay.remove();
    }, 300);
  };
// ````````````````````````````````````````````````````````````````````````````````````````````
// === 内容区域（你改这里）===
const content = document.createElement("div");

content.innerHTML = `
  <h2 id="rainbow-title" style="margin-top:0"></h2>
  <h3>1. 右键可以开关背景特效</h3>
  <h3>2. 右键可以开关欣赏模式（只保留背景）</h3>
  <h3>3. 右键可以开关手机，或者按下键盘"H"键也可以关闭</h3>
  <h3>4. 右键可以开关性能表盘</h3>
  <h3>5. 辐射主题下右侧的小人可以被拖动！</h3>
  <h3>6. 辐射主题下可以点击背景格子画画</h3>
  <h3>（开启欣赏模式效果更加！）</h3>
`;




// ````````````````````````````````````````````````````````````````````````````````````````````

  // === 组装 ===
  box.appendChild(content);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

// ````````````````````````````````````````````````````````````````````````````````````````````

// === 高级标题特效 ===
const title = content.querySelector("#rainbow-title");
const text = "食用提示：";

title.innerHTML = "";

// === 注入动画样式（只一次）===
if (!document.getElementById("rainbow-anim-style")) {
  const style = document.createElement("style");
  style.id = "rainbow-anim-style";

  style.innerHTML = `
    .rainbow-char {
      display: inline-block;
      font-weight: bold;
      animation: bounce 1s infinite ease-in-out;
    }

    @keyframes bounce {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }

    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      pointer-events: none;
      animation: particleMove 0.6s linear forwards;
    }

    @keyframes particleMove {
      to {
        transform: translate(var(--x), var(--y));
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// === 创建文字 ===
text.split("").forEach((char, i) => {
  const span = document.createElement("span");
  span.className = "rainbow-char";
  span.innerText = char;

  span.style.animationDelay = `${i * 0.1}s`;

  title.appendChild(span);
});

// === 彩虹流动（核心）===
let hue = 0;
setInterval(() => {
  const chars = title.querySelectorAll(".rainbow-char");
  chars.forEach((el, i) => {
    const h = (hue + i * 20) % 360;
    const color = `hsl(${h}, 90%, 65%)`;

    el.style.color = color;
    el.style.textShadow = `0 0 8px ${color}`;
  });
  hue += 2;
}, 50);

// === 粒子爆散（鼠标触碰）===
title.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 3; i++) {
    const p = document.createElement("div");
    p.className = "particle";

    const rect = title.getBoundingClientRect();

    p.style.left = e.clientX - rect.left + "px";
    p.style.top = e.clientY - rect.top + "px";

    const angle = Math.random() * 2 * Math.PI;
    const dist = Math.random() * 30;

    p.style.setProperty("--x", Math.cos(angle) * dist + "px");
    p.style.setProperty("--y", Math.sin(angle) * dist + "px");

    p.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;

    title.appendChild(p);

    setTimeout(() => p.remove(), 600);
  }
});

// ````````````````````````````````````````````````````````````````````````````````````````````

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