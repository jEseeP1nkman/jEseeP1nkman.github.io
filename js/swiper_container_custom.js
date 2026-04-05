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

#swiper_container { 
  background:
    linear-gradient(120deg, #1B1C20, #1B1C20, #1B1C20, #1B1C20);


  background-size: 200% 200%;
  animation: goldFlow 18s ease-in-out infinite;
}

@keyframes goldFlow {
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



.ticket-notch {
  position:absolute;
  right:calc(22% - 10px);
  width:20px;
  height:20px;
  background: #1B1C20;
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