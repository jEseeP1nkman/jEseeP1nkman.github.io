(function () {
  if (document.getElementById("fix-swiper-style")) return;

  const style = document.createElement("style");
  style.id = "fix-swiper-style";

  style.innerHTML = `
  #swiperBox {
    border: none !important;
    outline: none !important;
  }

  /* 🎟 主容器：彩票卡片 */
  #swiper_container {
    position: relative !important;
    width: 100% !important;
    height: 13rem !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    border-radius: 18px !important;
    overflow: hidden !important;
    
    background: linear-gradient(
      120deg,
      #6a5cff, #00d4ff, #00ff87, #ffe600, #ff7a00, #ff3cac
    ) !important;
    background-size: 300% 300% !important;
    animation: rainbowMove 8s linear infinite;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.1) !important;
  }

  @keyframes rainbowMove {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  /* ✨ 镭射反光层 */
  #swiper_container::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      115deg,
      transparent 20%,
      rgba(255,255,255,0.3) 40%,
      transparent 60%
    );
    mix-blend-mode: overlay;
    animation: shineMove 4s linear infinite;
    z-index: 5;
  }

  @keyframes shineMove {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  /* ✂️ 右侧“彩票裁剪孔” */
  #swiper_container::before {
    content: "";
    position: absolute;
    right: -8px;
    top: 0;
    width: 20px;
    height: 100%;
    background: radial-gradient(circle at 0 10px, transparent 8px, #000 9px) repeat-y;
    background-size: 20px 20px;
    -webkit-mask: radial-gradient(circle at left, transparent 8px, black 9px);
    mask: radial-gradient(circle at left, transparent 8px, black 9px);
    opacity: 0.9;
  }

  /* 🎫 票根虚线 (撕裂线) */
  .ticket-dashed-line {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 22%; /* 对应红框位置 */
    width: 2px;
    background-image: linear-gradient(to bottom, rgba(255,255,255,0.7) 50%, transparent 50%);
    background-size: 2px 15px; /* 虚线比例 */
    background-repeat: repeat-y;
    z-index: 4;
    pointer-events: none;
  }

  /* 🌑 上下缺口小圆点 */
  .ticket-notch {
    position: absolute;
    right: calc(22% - 10px);
    width: 20px;
    height: 20px;
    background: #000; /* 建议设为页面背景色 */
    border-radius: 50%;
    z-index: 6;
  }
  .notch-top { top: -10px; }
  .notch-bottom { bottom: -10px; }

  #swiper_container .swiper-slide {
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease;
  }

  div#swiper_container .blog-slider__pagination .swiper-pagination-bullet {
    opacity: 1;
    background: #111;
  }

  #category-bar {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    pointer-events: none !important;
}

  `;

  document.head.appendChild(style);

  // 强化注入逻辑：使用 Observer 监控 DOM 变化，防止刷新消失
  const injectNotchesAndLine = () => {
    const container = document.querySelector("#swiper_container");
    if (container) {
      // 检查并添加虚线
      if (!container.querySelector(".ticket-dashed-line")) {
        const line = document.createElement("div");
        line.className = "ticket-dashed-line";
        container.appendChild(line);
      }
      // 检查并添加上下缺口
      if (!container.querySelector(".ticket-notch")) {
        const top = document.createElement("div");
        top.className = "ticket-notch notch-top";
        const bottom = document.createElement("div");
        bottom.className = "ticket-notch notch-bottom";
        container.appendChild(top);
        container.appendChild(bottom);
      }
    }
  };

  // 监控页面变化，只要 container 变动就重新检查注入
  const observer = new MutationObserver(injectNotchesAndLine);
  observer.observe(document.body, { childList: true, subtree: true });

  // 初始执行
  injectNotchesAndLine();

})();

const el = document.querySelector(".swiperBox");
if (el) el.style.display = "none";