(function () {

  function initProMenu() {
    // ===== 1. 样式 =====
    if (!document.getElementById("pro-menu-style")) {
      const style = document.createElement("style");
      style.id = "pro-menu-style";

      style.innerHTML = `
      
        #proMenu {
          position: fixed;
          z-index: 999999;
          min-width: 220px;
          background: rgba(28,28,26,0.95);
          border: 2px solid #F6C453;
          border-radius: 14px;
          backdrop-filter: blur(12px);
          box-shadow:
            0 0 10px rgba(246,196,83,0.6),
            0 0 25px rgba(246,196,83,0.3),
            0 10px 30px rgba(0,0,0,0.6);
          padding: 8px 0;
          display: none;
          animation: menuShow 0.18s ease;
        }

        @keyframes menuShow {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .menu-item {
          position: relative;
          padding: 10px 16px;
          color: #F6C453;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.25s;
        }

        .menu-item:hover {
          background: rgba(246,196,83,0.1);
          padding-left: 22px;
        }

        .menu-icon {
          display: inline-flex;   
          align-items: center; 
          gap: 20px;
          width: auto;
          opacity: 0.9;
          font-size: 20px; 
        }

        .menu-line {
          height: 1px;
          background: #F6C453;
          margin: 6px 0;
        }

        .submenu {
          position: absolute;
          top: 0;
          left: 100%;
          min-width: 180px;
          background: rgba(28,28,26,0.95);
          border: 2px solid #F6C453;
          border-radius: 12px;
          backdrop-filter: blur(10px);
          box-shadow: 0 0 15px rgba(246,196,83,0.4);
          display: none;
          padding: 6px 0;
          animation: fadeIn 0.15s ease;
        }

        .menu-item:hover > .submenu {
          display: block;
        }

        .menu-row {
          display: flex;
          justify-content: space-around;
          padding: 6px 4px;
        }

        .menu-row .menu-item {
          flex: 1;
          justify-content: center;
          padding: 10px 0;
          border-radius: 10px;
        }

        .menu-row .menu-item:hover {
          background: rgba(246,196,83,0.15);
          padding-left: 0;
        }

        @keyframes fadeIn {
          from {opacity:0; transform:translateX(10px);}
          to {opacity:1; transform:translateX(0);}
        }
      `;

      document.head.appendChild(style);
    }

    // ===== 2. HTML =====
    if (!document.getElementById("proMenu")) {
      const menu = document.createElement("div");
      menu.id = "proMenu";

      menu.innerHTML = `
        <div class="menu-row">
          <div class="menu-item" onclick="location.reload()">
            <span class="menu-icon"><i class="fas fa-rotate-right"></i></span>
          </div>
          <div class="menu-item" onclick="window.scrollTo({top:0,behavior:'smooth'})"><i class="fas fa-arrow-up"></i></div>
          <div class="menu-item" onclick="window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})"><i class="fas fa-arrow-down "></i></div>

          <div class="menu-item">
            <span class="menu-icon"><i class="fas fa-link "></i></span>
            <div class="submenu">
              <div class="menu-item" onclick="navigator.clipboard.writeText(location.href)"><i class="fas fa-copy "></i> 复制本网址</div>
              <div class="menu-item" onclick="window.open(location.href)"><i class="fas fa-arrow-up-right-from-square "></i> 新窗口打开</div>
            </div>
          </div>
        </div>

        <div class="menu-line"></div>

        <div class="menu-item" onclick="toggleIphone()">
          <div class="menu-icon"><i class="fas fa-power-off"></i> 开关手机屏幕</div>
        </div>

        <div class="menu-item" onclick="toggleILoveUSDollar()">
          <div class="menu-icon"><i class="fas fa-palette"></i> 开关网站背景</div>
        </div>

        <div class="menu-item" onclick="toggleCleanMode()">
          <div class="menu-icon"><i class="fas fa-eye"></i> 开关欣赏模式</div>
        </div>

        <div class="menu-item" onclick="toggleFPS()">
          <div class="menu-icon"><i class="fas fa-gauge-high"></i> 开关性能表盘</div>
        </div>

        
      `;

      document.body.appendChild(menu);
    }

    const menu = document.getElementById("proMenu");

    // ===== 3. 右键 =====
    if (!menu._contextmenuInit) {
      document.addEventListener("contextmenu", function (e) {
        e.preventDefault();

        menu.style.display = "block";

        let x = e.clientX;
        let y = e.clientY;

        const w = menu.offsetWidth;
        const h = menu.offsetHeight;

        if (x + w > window.innerWidth) x -= w;
        if (y + h > window.innerHeight) y -= h;

        menu.style.left = x + "px";
        menu.style.top = y + "px";
      });

      // ===== 4. 点击关闭 =====
      document.addEventListener("click", () => {
        menu.style.display = "none";
      });

      menu._contextmenuInit = true; // 标记已经初始化
    }
  }

  // 首次页面加载初始化
  initProMenu();

  // ===== 5. PJAX 兼容 =====
  document.addEventListener('pjax:end', function() {
    initProMenu(); // 每次 PJAX 加载完重新初始化
  });

})();