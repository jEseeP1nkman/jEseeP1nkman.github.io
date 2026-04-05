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
  
  // --- 新增：记录鼠标位置 ---
  let mouseX = -1000;
  let mouseY = -1000;

// ✅ 记录被点击的格子
const activeCells = new Set();


  const VAULT_SET = {
    BLOCK_SIZE: 60,
    LINE_COLOR: "rgba(0, 255, 60, 0.3)",
    GLOW_COLOR: "rgba(0, 255, 60, 0.05)",
    HOVER_COLOR: "rgba(0, 255, 55, 0.4)", // 鼠标悬停时的亮绿色
    GLITCH_CHANCE: 0.97,
    INTERVAL: 2500
  };

  // 监听鼠标移动
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
window.addEventListener('click', (e) => {
  const col = Math.floor(e.clientX / VAULT_SET.BLOCK_SIZE);
  const row = Math.floor(e.clientY / VAULT_SET.BLOCK_SIZE);

  const key = `${col},${row}`;

  if (activeCells.has(key)) {
    activeCells.delete(key); // 再点一次取消
  } else {
    activeCells.add(key); // 点一次锁定
  }
});
  return function () {
    const cvs = document.getElementById("vaultTerminal");
    if (!cvs) return;
    const ctx = cvs.getContext("2d");

    if (frameId) cancelAnimationFrame(frameId);

    function drawLargeGrid() {
      // 1. 绘制格子背景和高亮效果
      // 计算鼠标所在的格子索引
      const hoverCol = Math.floor(mouseX / VAULT_SET.BLOCK_SIZE);
      const hoverRow = Math.floor(mouseY / VAULT_SET.BLOCK_SIZE);

      for (let x = 0; x < cvs.width; x += VAULT_SET.BLOCK_SIZE) {
        for (let y = 0; y < cvs.height; y += VAULT_SET.BLOCK_SIZE) {
          const currentCol = Math.floor(x / VAULT_SET.BLOCK_SIZE);
          const currentRow = Math.floor(y / VAULT_SET.BLOCK_SIZE);

const key = `${currentCol},${currentRow}`;

// ✅ 优先判断：是否被点击锁定
if (activeCells.has(key)) {
  ctx.fillStyle = "rgba(0, 255, 80, 0.6)"; // 更亮一点
  ctx.fillRect(x, y, VAULT_SET.BLOCK_SIZE, VAULT_SET.BLOCK_SIZE);

} else if (currentCol === hoverCol && currentRow === hoverRow) {
  ctx.fillStyle = VAULT_SET.HOVER_COLOR;
  ctx.fillRect(x, y, VAULT_SET.BLOCK_SIZE, VAULT_SET.BLOCK_SIZE);

} else {
  ctx.fillStyle = VAULT_SET.GLOW_COLOR;
  ctx.fillRect(x, y, VAULT_SET.BLOCK_SIZE, VAULT_SET.BLOCK_SIZE);
}
        }
      }

      // 2. 绘制网格线条
      ctx.strokeStyle = VAULT_SET.LINE_COLOR;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= cvs.width; x += VAULT_SET.BLOCK_SIZE) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, cvs.height);
      }
      for (let y = 0; y <= cvs.height; y += VAULT_SET.BLOCK_SIZE) {
        ctx.moveTo(0, y);
        ctx.lineTo(cvs.width, y);
      }
      ctx.stroke();
    }

    function animate(now) {
      if (document.documentElement.getAttribute("data-theme") === "dark") {
        ctx.clearRect(0, 0, cvs.width, cvs.height);

        // 闪烁逻辑
        if (!isInterrupting && now - lastGlitch > VAULT_SET.INTERVAL) {
          if (Math.random() > VAULT_SET.GLITCH_CHANCE) {
            isInterrupting = true;
            lastGlitch = now;
          }
        }

        if (isInterrupting) {
          if (Math.random() > 0.4) {
            // 模拟黑屏
          } else {
            ctx.save();
            ctx.translate((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15);
            drawLargeGrid();
            ctx.restore();
          }
          if (Math.random() > 0.7) isInterrupting = false;
        } else {
          drawLargeGrid();
        }

        // 扫描线
        ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
        for (let i = 0; i < cvs.height; i += 3) {
          ctx.fillRect(0, i, cvs.width, 1);
        }

        // 暗角
        const v = ctx.createRadialGradient(
          cvs.width / 2, cvs.height / 2, cvs.width * 0.2,
          cvs.width / 2, cvs.height / 2, cvs.width * 0.9
        );
        v.addColorStop(0, "rgba(0,0,0,0)");
        v.addColorStop(1, "rgba(0,0,0,0.7)");
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
    const config = {
      width: options.width || "150px",
      gap: options.gap || "15px",
      right: options.right || "20px",
      top: options.top || "100px"
    };

    let sidebarContainer = document.getElementById("wasteland-sidebar-container");
    if (!sidebarContainer) {
      sidebarContainer = document.createElement("div");
      sidebarContainer.id = "wasteland-sidebar-container";
      document.body.appendChild(sidebarContainer);
    }

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

    sidebarContainer.innerHTML = "";

    imageSources.forEach((src) => {
      const imgWrapper = document.createElement("div");
      const imgElement = document.createElement("img");

      imgElement.src = src;

      Object.assign(imgElement.style, {
        width: "100%",
        height: "auto",
        display: "block",
        transition: "transform 0.1s ease-out", // 稍微保留一点平滑感，但缩短时间
        cursor: "grab",
        filter: "grayscale(30%) contrast(110%)",
        userSelect: "none",
        touchAction: "none" // 禁用触摸屏默认行为
      });

      // --- 核心修复：拖拽逻辑 ---
      let isDragging = false;
      let startX, startY;
      let currentX = 0;
      let currentY = 0;

      // 1. 彻底禁用浏览器自带的图片拖动效果
      imgElement.ondragstart = () => false;

      imgElement.onmousedown = (e) => {
        isDragging = true;
        imgElement.style.cursor = "grabbing";
        imgElement.style.transition = "none"; // 拖动时必须实时，不能有延迟
        
        // 记录鼠标点击相对于图片当前位置的偏量
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;

        // 全局监听移动和抬起，防止鼠标滑出图片范围导致失效
        const onMouseMove = (moveEvent) => {
          if (!isDragging) return;
          
          currentX = moveEvent.clientX - startX;
          currentY = moveEvent.clientY - startY;

          // 使用 transform 性能最好，且不会干扰页面布局
          imgElement.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.05)`;
        };

        const onMouseUp = () => {
          isDragging = false;
          imgElement.style.cursor = "grab";
          imgElement.style.transition = "transform 0.3s ease"; // 恢复平滑
          
          // 移除全局监听
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      };

      // 悬停效果
      imgElement.onmouseenter = () => {
        if (!isDragging) {
          imgElement.style.filter = "grayscale(0%) contrast(120%) brightness(1.2)";
          imgElement.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.05)`;
        }
      };
      imgElement.onmouseleave = () => {
        if (!isDragging) {
          imgElement.style.filter = "grayscale(30%) contrast(110%)";
          imgElement.style.transform = `translate(${currentX}px, ${currentY}px) scale(1)`;
        }
      };

      imgWrapper.appendChild(imgElement);
      sidebarContainer.appendChild(imgWrapper);
    });
  }

  // ... 后面的图片列表和调用保持不变
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
  ];

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
    [style*="--efu-main"],[style*="--efu-lighttext"],[style*="--efu-theme"],[style*="--efu-fontcolor"],[style*="--efu-card-bg"] {
      --efu-lighttext: #00ff37 !important;
      --efu-theme: #065516 !important;
      --efu-fontcolor: #00ff37 !important;
      --efu-main: #065516 !important;
      --efu-card-bg: #071C0A !important;
      --efu-card-border: #00ff37 !important;
      --efu-secondbg: #071C0A !important;
      --waline-border-color: #00ff37 !important;
      --waline-bg-color: #071C0A !important;
      --waline-color: #00ff37 !important;
      --waline-info-color: #00ff37 !important;
      --waline-bg-color-light: #071C0A !important;
      --waline-dark-grey: #00ff37 !important;
      --waline-info-bg-color: #071C0A !important;
      --waline-white: #00ff37 !important;
      --efu-background: #071C0A !important;
      --efu-maskbgdeep: #071C0A !important;

    }
    .wl-btn.primary {
       background: #071C0A !important;
       border-color: #00ff37 !important;
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

    #swiper_container { 
      background:
        linear-gradient(120deg, #071C0A, #071C0A, #071C0A, #071C0A);
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
  document.documentElement.style.setProperty('--efu-main', '#071C0A', 'important');
}

// ---------------------------------------------------------

/**
 */


// 调用函数（你可以替换为你喜欢的瓶盖图片素材）




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
// ```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````

function FalloutBottleCaps(customImg = '/img/FalloutBottleCaps.png', onClickAction) {
  if(window.innerWidth < 900) return
    // 1. 注入动画和样式
    const style = document.createElement('style');
    style.innerHTML = `
        #fallout-cap-fixed {
            position: fixed;
            top: 25px;
            right: 10%;
            width: 80px;
            height: 80px;
            cursor: pointer;
            z-index: 9999;
            filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.5));
            user-select: none;
            -webkit-user-drag: none;
            transition: filter 0.2s;
        }

        #fallout-cap-fixed:active {
            filter: brightness(0.8) drop-shadow(1px 2px 3px rgba(0,0,0,0.5));
        }

        @keyframes cap-backflip {
            0% { transform: perspective(500px) rotateX(0deg) scale(1); }
            50% { transform: perspective(500px) rotateX(180deg) scale(1.3); }
            100% { transform: perspective(500px) rotateX(360deg) scale(1); }
        }

        .cap-flipping {
            animation: cap-backflip 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }
    `;
    document.head.appendChild(style);

    // 2. 创建图片元素
    const cap = document.createElement('img');
    cap.id = 'fallout-cap-fixed';
    cap.src = customImg;
    cap.alt = 'Bottle Cap';

    // 3. 悬停逻辑：触发后空翻
    cap.addEventListener('mouseenter', () => {
        if (!cap.classList.contains('cap-flipping')) {
            cap.classList.add('cap-flipping');
        }
    });

    cap.addEventListener('animationend', () => {
        cap.classList.remove('cap-flipping');
    });

    // 4. 点击逻辑：触发传入的自定义函数
    cap.addEventListener('click', () => {
        if (typeof onClickAction === 'function') {
            onClickAction(); // 执行你定义的函数
        }
    });

    // 5. 挂载到页面
    document.body.appendChild(cap);
}

FalloutBottleCaps('/img/FalloutBottleCaps.png', () => {
    toggleFalloutBG();
    
});

/* // 示例 2：点击后跳转到其他页面
FalloutBottleCaps('/img/FalloutBottleCaps.png', () => {
    window.location.href = 'https://your-blog.com/about';
});
*/

// 执行函数



// ``````````````````````````````````````````````````````````````````````````````



