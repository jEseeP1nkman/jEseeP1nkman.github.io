function FalloutBG(){


        // 1. 创建辐射沉浸式背景
    function initVaultGridSystem() {
      let vaultCanvas = document.getElementById("vaultTerminal");
      if (!vaultCanvas) {
        vaultCanvas = document.createElement("canvas");
        vaultCanvas.id = "vaultTerminal";
        document.body.prepend(vaultCanvas);
      }

      // 基础样式：明亮的绿黑底色，增加发光感
      Object.assign(vaultCanvas.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: "-2",
        backgroundColor: "#0a1a0a", // 稍微亮一点的底色
        display: "block"
      });

      vaultCanvas.width = window.innerWidth;
      vaultCanvas.height = window.innerHeight;
    }

    // 2. 核心：高亮格网与随机断电闪烁
    const vaultAnimationEngine = (function () {
      let frameId = null;
      let lastGlitch = 0;
      let isInterrupting = false;

      const VAULT_SET = {
        BLOCK_SIZE: 60,           // 调大格子尺寸
        LINE_COLOR: "rgba(0, 255, 60, 0.3)", // 较亮的绿线
        GLOW_COLOR: "rgba(0, 255, 60, 0.05)",  // 格子内部的发光
        GLITCH_CHANCE: 0.97,      // 闪烁触发概率
        INTERVAL: 2500            // 约 2-3 秒频率
      };

      return function () {
        const cvs = document.getElementById("vaultTerminal");
        if (!cvs) return;
        const ctx = cvs.getContext("2d");

        if (frameId) cancelAnimationFrame(frameId);

        function drawLargeGrid() {
          ctx.strokeStyle = VAULT_SET.LINE_COLOR;
          ctx.lineWidth = 2; // 线条加粗一点

          // 绘制大格子
          for (let x = 0; x <= cvs.width; x += VAULT_SET.BLOCK_SIZE) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, cvs.height);
            ctx.stroke();
          }
          for (let y = 0; y <= cvs.height; y += VAULT_SET.BLOCK_SIZE) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(cvs.width, y);
            ctx.stroke();
          }

          // 给格子填充淡淡的发光色
          ctx.fillStyle = VAULT_SET.GLOW_COLOR;
          ctx.fillRect(0, 0, cvs.width, cvs.height);
        }

        function animate(now) {
          if (document.documentElement.getAttribute("data-theme") === "dark") {
            ctx.clearRect(0, 0, cvs.width, cvs.height);

            // --- 闪烁逻辑翻转：平时亮，闪烁时“坏掉” ---
            if (!isInterrupting && now - lastGlitch > VAULT_SET.INTERVAL) {
              if (Math.random() > VAULT_SET.GLITCH_CHANCE) {
                isInterrupting = true;
                lastGlitch = now;
              }
            }

            if (isInterrupting) {
              // 模拟复古电视闪变：随机黑屏或画幅偏移
              if (Math.random() > 0.4) {
                // 这一帧不画网格（模拟黑屏）
              } else {
                ctx.save();
                ctx.translate((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20); // 剧烈抖动
                drawLargeGrid();
                ctx.restore();
              }

              // 快速结束闪烁
              if (Math.random() > 0.7) isInterrupting = false;
            } else {
              // 正常状态：绘制稳定明亮的网格
              drawLargeGrid();
            }

            // --- 覆盖一层永久的复古扫描线 ---
            ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
            for (let i = 0; i < cvs.height; i += 3) {
              ctx.fillRect(0, i, cvs.width, 1);
            }

            // --- CRT 屏幕边缘暗化 (Vignette) ---
            const v = ctx.createRadialGradient(
              cvs.width / 2, cvs.height / 2, cvs.width * 0.2,
              cvs.width / 2, cvs.height / 2, cvs.width * 0.9
            );
            v.addColorStop(0, "rgba(0,0,0,0)");
            v.addColorStop(1, "rgba(0,0,0,0.8)");
            ctx.fillStyle = v;
            ctx.fillRect(0, 0, cvs.width, cvs.height);

          } else {
            ctx.clearRect(0, 0, cvs.width, cvs.height);
          }

          frameId = requestAnimationFrame(animate);
        }

        animate(0);
      };
    })();

    // 3. 执行启动
    function launchVaultBackground() {
      const canvas = document.getElementById("vaultTerminal");
      if (canvas) {
        canvas.style.display = "block";
        vaultAnimationEngine();
      }
    }

    // 自动初始化
    initVaultGridSystem();
    launchVaultBackground();

    // 响应式处理
    window.addEventListener('resize', () => {
      const canvas = document.getElementById("vaultTerminal");
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    });

    // PJAX 支持
    document.addEventListener('pjax:end', () => {
      initVaultGridSystem();
      launchVaultBackground();
    });
}
// ···········``````·······················`````··········```·············```········

function PipboyIMG() {
  function setupWastelandSidebar(imageSources = [], options = {}) {
    // 默认配置
    const config = {
      width: options.width || "150px",      // 默认宽度
      gap: options.gap || "15px",           // 图片之间的间距
      right: options.right || "20px",       // 距离右侧距离
      top: options.top || "100px"           // 距离顶部距离
    };

    // 1. 检查并创建容器
    let sidebarContainer = document.getElementById("wasteland-sidebar-container");
    if (!sidebarContainer) {
      sidebarContainer = document.createElement("div");
      sidebarContainer.id = "wasteland-sidebar-container";
      document.body.appendChild(sidebarContainer);
    }

    // 2. 设置容器样式
    Object.assign(sidebarContainer.style, {
      position: "fixed",
      right: config.right,
      top: config.top,
      width: config.width,
      display: "flex",
      flexDirection: "column",
      gap: config.gap,
      zIndex: "999",
      pointerEvents: "auto"
    });

    // 3. 清空容器并注入图片
    sidebarContainer.innerHTML = "";

    imageSources.forEach((src) => {
      const imgWrapper = document.createElement("div");
      const imgElement = document.createElement("img");

      imgElement.src = src;

      // 图片的基础样式 - 删除了 border, boxShadow 和 borderRadius
      Object.assign(imgElement.style, {
        width: "100%",
        height: "auto",
        display: "block",
        transition: "transform 0.3s ease, filter 0.3s ease",
        cursor: "pointer",
        filter: "grayscale(30%) contrast(110%)" // 保持废土感的滤镜
      });

      // 鼠标悬停交互
      imgElement.onmouseenter = () => {
        imgElement.style.transform = "scale(1.05)";
        imgElement.style.filter = "grayscale(0%) contrast(120%) brightness(1.2)";
      };
      imgElement.onmouseleave = () => {
        imgElement.style.transform = "scale(1)";
        imgElement.style.filter = "grayscale(30%) contrast(110%)";
      };

      imgWrapper.appendChild(imgElement);
      sidebarContainer.appendChild(imgWrapper);
    });
  }

  // 图片资源
  const myImages = [
    "/img/FalloutBG/FalloutBG2.gif",
    "/img/FalloutBG/FalloutBG3.gif",
    "/img/FalloutBG/FalloutBG4.gif",
    "/img/FalloutBG/FalloutBG5.gif",
    "/img/FalloutBG/FalloutBG6.gif",
    "/img/FalloutBG/FalloutBG7.gif",
    "/img/FalloutBG/FalloutBG8.gif",
    "/img/FalloutBG/FalloutBG9.gif",
    "/img/FalloutBG/FalloutBG10.gif",
  ]

  setupWastelandSidebar(myImages, {
    width: "120px",
    right: "30px",
    top: "10px",
    gap: "20px"
  });
}

// ``````````````````````````````````````````````````````````````````````````````
function applyCustomWastelandNav() {
  // 修正后的 CSS 字符串，去掉了大括号外面的非法分号
  const css = `

    #page-header.not-top-img #nav a {
      color: #00ff37 !important;
    }
    /* 额外强制所有使用了该变量的元素变色 */
    [style*="--efu-main"],[style*="--efu-lighttext"],[style*="--efu-theme"],[style*="--efu-fontcolor"] {
      --efu-lighttext: #00ff37 !important;
      --efu-theme: #065516 !important;
      --efu-fontcolor: #00ff37 !important;
      --efu-main: #065516 !important;
    }
    #quick-nav-box {
        color: #00ff37 !important;
        border: 1px solid #00ff37;
    }
    .qnav-item {
        border: 1px solid #00ff37;
    }
    .qnav-item i{   
        color: #00ff37;
    }
    #swiperBox .blog-slider__content .blog-slider__title {
        color: #00ff37;
    }
    a {
        color: #00ff37;

    }
    #nav a {
        color: #00ff37 !important;
    }
    .post #post-info .post-title {
        color: #00ff37 !important;
    }
    #proMenu {
        background: #071C0A;
        border: 2px solid #00ff37;
        box-shadow: 0 0 10px #065516, 0 0 25px #065516, 0 10px 30px #065516;
    }
    .menu-item {
        color: #00ff37;
    }
    .menu-line {
        background: #00ff37;
    }
    .qnav-item span {
        color: #00ff37;
    }




    }
  `;
// ````````````````````````````````````````````````````````````````````````````````````````````````````````````````
    function forceToTopBtnColor() {
        const btn = document.querySelector('#page-header #nav #nav-right .nav-button a.totopbtn');
        if (btn) {
            // 直接修改 style 属性，并加 !important
            btn.style.setProperty('background', '#081E0A', 'important');
        }
    }

    // 立即执行 + 延迟执行（防止主题加载慢）
    forceToTopBtnColor();
    setTimeout(forceToTopBtnColor, 500);

    // PJAX 翻页后也要执行
    document.addEventListener('pjax:end', forceToTopBtnColor);



    
// ````````````````````````````````````````````````````````````````````````````````````````````````````````````````

    function applyGlobalOverride() {
      const css = `
        /* 匹配所有行内样式里包含 #ffffff 的 div，强制变绿 */
        div[style*="color: #ffffff"], 
        div[style*="color: rgb(255, 255, 255)"] {
          color: #00ff37  !important;
        //   text-shadow: 0 0 5px #00ff37 !important;
        }
      `;

      const styleElement = document.createElement('style');
      styleElement.textContent = css;
      document.head.appendChild(styleElement);
    }

    applyGlobalOverride();



// ````````````````````````````````````````````````````````````````````````````````````````````````````````````````


  // 1. 查找或创建 Style 标签
  let styleElement = document.getElementById("custom-nav-style");
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = "custom-nav-style";
    document.head.appendChild(styleElement);
  }
  
  // 2. 注入内容 (使用 textContent 现代浏览器兼容性更好)
  styleElement.textContent = css;

  // 3. 暴力方案：直接修改 HTML 根元素的 style 属性
  // 有些主题会动态覆盖 :root，所以我们直接改 style 属性
  document.documentElement.style.setProperty('--efu-main', '#00ff37', 'important');
}

// ---------------------------------------------------------
// 确保执行成功的逻辑
// ---------------------------------------------------------

// 情况 A: 立即执行


// 情况 B: 页面加载完成后执行

// ``````````````````````````````````````````````````````````````````````````````

function FuncFalloutBG() {
 // ```````````````````````````````````````````````````````
    toggleILoveUSDollar();

// ```````````````````````````````````````````````````````
    PipboyIMG();
    FalloutBG();
    applyCustomWastelandNav();
    if (document.readyState === 'complete') {
      applyCustomWastelandNav();
    } else {
      window.addEventListener('load', applyCustomWastelandNav);
    }

    // 情况 C: 如果是 PJAX 博客 (如 Butterfly, Solitude 等)
    document.addEventListener('pjax:end', applyCustomWastelandNav);

    // 情况 D: 终极监控（防止主题动态切换模式时重置颜色）
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          applyCustomWastelandNav();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
}

// ``````````````````````````````````````````````````````````````````````````````

function runEveryYearOnBirthday(month, day) {
    const now = new Date();
    const currentMonth = now.getMonth(); 
    const currentDate = now.getDate();   

    if (currentMonth === (month - 1) && currentDate === day) {
        FuncFalloutBG();
    }
}

runEveryYearOnBirthday(132, 123);
// ``````````````````````````````````````````````````````````````````````````````
