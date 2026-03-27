(function () {

  /* ✅ 样式只注入一次 */
  if (!document.getElementById("fix-swiper-style")) {
    const style = document.createElement("style");
    style.id = "fix-swiper-style";

    style.innerHTML = `
#swiperBox {
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
}

#swiper_container {
  position: relative !important;
  height: 13rem !important;
  overflow: hidden !important;
  border: none !important;
  outline: none !important;
  box-sizing: border-box !important;

  transform-style: preserve-3d;
  transition: transform 0.2s ease;
}

/* 🌈 镭射 */
#swiper_container { 
  background: 
    radial-gradient(circle at 20% 30%, rgba(255,0,150,0.6), transparent 40%),
    radial-gradient(circle at 80% 20%, rgba(0,255,255,0.6), transparent 40%),
    radial-gradient(circle at 70% 80%, rgba(120,0,255,0.6), transparent 40%),
    radial-gradient(circle at 30% 70%, rgba(0,255,150,0.6), transparent 40%),
    linear-gradient(120deg,#ff9de6,#9aa5ff,#7df9ff,#c77dff);

  background-size: 200% 200%;
  animation: holoFlow 12s ease-in-out infinite;
}

@keyframes holoFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 光扫 */
.light-sweep {
  position:absolute;
  inset:0;
  z-index:9;
  pointer-events:none;
}

.light-sweep::before {
  content:"";
  position:absolute;
  width:200%;
  height:200%;
  top:-50%;
  left:-50%;

  background: linear-gradient(
    120deg,
    transparent 30%,
    rgba(255,255,255,0.15) 45%,
    rgba(255,255,255,0.35) 50%,
    transparent 70%
  );

  transform: translateX(var(--light-x,-120%)) rotate(15deg);
  transition: transform 0.4s ease;
}

/* ✂️ 票根 */
.ticket-dashed-line {
  position:absolute;
  top:0;
  bottom:0;
  right:22%;
  width:2px;

  background-image: linear-gradient(to bottom, rgba(255,255,255,0.7) 50%, transparent 50%);
  background-size:2px 15px;
  z-index:7;
}

.swiper-ticket-mask {
  position:absolute;
  right:-8px;
  top:0;
  width:20px;
  height:100%;
  background: radial-gradient(circle at 0 10px, transparent 8px, #17161C 9px) repeat-y;
  background-size:20px 20px;
  z-index:6;
}

.ticket-notch {
  position:absolute;
  right:calc(22% - 10px);
  width:20px;
  height:20px;
  background:#000;
  border-radius:50%;
  z-index:8;
}

.notch-top { top:-10px; }
.notch-bottom { bottom:-10px; }

#category-bar { display:none !important; }
    `;

    document.head.appendChild(style);
  }

  /* 🚀 初始化 */
  const initSwiper = () => {
    const container = document.querySelector("#swiper_container");
    if (!container) return;

    /* ✅ 每次都确保装饰存在 */
    if (!container.querySelector(".light-sweep")) {
      container.insertAdjacentHTML("beforeend", `<div class="light-sweep"></div>`);
    }

    if (!container.querySelector(".ticket-dashed-line")) {
      container.insertAdjacentHTML("beforeend", `
        <div class="swiper-ticket-mask"></div>
        <div class="ticket-dashed-line"></div>
        <div class="ticket-notch notch-top"></div>
        <div class="ticket-notch notch-bottom"></div>
      `);
    }

    /* ✅ 防止事件重复绑定 */
    if (!container.dataset.binded) {
      container.dataset.binded = "true";

      container.addEventListener("mousemove", e => {
        const rect = container.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        /* 光扫 */
        container.style.setProperty("--light-x", (x * 200 - 100) + "%");

        /* 3D */
        const rotateX = (y - 0.5) * -8;
        const rotateY = (x - 0.5) * 10;

        container.style.transform = `
          perspective(800px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
        `;
      });

      container.addEventListener("mouseleave", () => {
        container.style.setProperty("--light-x", "-120%");
        container.style.transform = `
          perspective(800px)
          rotateX(0deg)
          rotateY(0deg)
        `;
      });
    }

    /* ✅ Swiper 单独判断 */
    if (!container.swiper) {
      new Swiper("#swiper_container", {
        direction: "vertical",
        loop: true,
        autoplay: { delay: 2000, disableOnInteraction: false },
        effect: 'fade',
        fadeEffect: { crossFade: true },
        observer: true,
        observeParents: true
      });
    }
  };

  /* 🚀 生命周期 */
  window.addEventListener("load", initSwiper);

  document.addEventListener("pjax:complete", () => {
    setTimeout(initSwiper, 50); // ✅ 等DOM稳定
  });

  initSwiper();

})();