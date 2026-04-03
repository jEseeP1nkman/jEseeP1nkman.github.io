function BirthdayBackground(){

  // 1. 创建背景 Canvas 的函数
  function createBirthdayBackground() {
      let canvas = document.getElementById("BirthdayBackground");
      if (!canvas) {
          canvas = document.createElement("canvas");
          canvas.id = "BirthdayBackground";
          document.body.prepend(canvas);
      }

      Object.assign(canvas.style, {
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: "-1",
          display: "block"
      });

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      return canvas;
  }

  // 2. 核心动画逻辑（改为单例模式或直接执行）
  const BirthdayAnimator = (function () {
      let timer = null;
      let items = [];
      let mouse = { x: null, y: null };
      const img = new Image();
      img.src = "/img/birthdayballoon.gif"; // 请确保路径正确

      const CONFIG = {
          COUNT: 175,
          WIDTH: 289,
          HEIGHT: 289
      };

      function Item(canvasW, canvasH) {
          this.reset = function (isInit) {
              this.x = Math.random() * canvasW;
              this.y = isInit ? Math.random() * canvasH : -CONFIG.HEIGHT;
              this.speedY = 0.5 + Math.random() * 1.5;
              this.speedX = (Math.random() - 0.5) * 1;
          };
          this.reset(true);
      }

      return function start() {
          if (window.innerWidth < 768) return;

          const canvas = document.getElementById("BirthdayBackground") || createBirthdayBackground();
          const ctx = canvas.getContext("2d");

          if (timer) cancelAnimationFrame(timer);

          items = Array.from({ length: CONFIG.COUNT }, () => new Item(canvas.width, canvas.height));

          if (!window._BirthdayEventsBound) {
              window.addEventListener("mousemove", (e) => {
                  mouse.x = e.clientX;
                  mouse.y = e.clientY;
              });
              window.addEventListener("mouseleave", () => {
                  mouse.x = null;
                  mouse.y = null;
              });
              window._BirthdayEventsBound = true;
          }

          function loop() {
              // 检查是否为暗色模式
              const isDark = document.documentElement.getAttribute("data-theme") === "dark";

              if (isDark) {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  items.forEach(item => {
                      // 鼠标吸附
                      if (mouse.x !== null) {
                          const dx = mouse.x - item.x;
                          const dy = mouse.y - item.y;
                          const dist = Math.sqrt(dx * dx + dy * dy);
                          if (dist < 140) {
                              item.x += dx * 0.02;
                              item.y += dy * 0.02;
                          }
                      }

                      item.y += item.speedY;
                      item.x += item.speedX;

                      if (item.y > canvas.height + CONFIG.HEIGHT) item.reset(false);
                      if (item.x < -CONFIG.WIDTH) item.x = canvas.width + CONFIG.WIDTH;
                      if (item.x > canvas.width + CONFIG.WIDTH) item.x = -CONFIG.WIDTH;

                      if (img.complete && img.naturalWidth !== 0) {
                          ctx.drawImage(img, item.x - CONFIG.WIDTH / 2, item.y - CONFIG.HEIGHT / 2, CONFIG.WIDTH, CONFIG.HEIGHT);
                      }
                  });
              } else {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
              }
              timer = requestAnimationFrame(loop);
          }
          loop();
      };
  })();

  // 3. 执行与初始化
  // 立即执行初始化
  createBirthdayBackground();
  BirthdayAnimator();

  // 适配 PJAX (常见于一些博客主题)
  document.addEventListener('pjax:end', () => {
      createBirthdayBackground();
      BirthdayAnimator();
  });

  // 窗口缩放适配
  window.addEventListener('resize', () => {
      const canvas = document.getElementById("BirthdayBackground");
      if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
      }
  });


}