(function () {

(function() {
  // 检查是否已经删除过
  const CARD_REMOVED_KEY = 'cardWidgetRemoved';

  function removeCardWidget() {
    const cardWidget = document.querySelector('.card-widget.card-navigation');
    if (cardWidget) {
      cardWidget.remove();
    //   console.log('card-widget.card-navigation 已删除');
      localStorage.setItem(CARD_REMOVED_KEY, 'true'); // 标记已删除
    }
  }

  // 页面加载时删除一次
  if (!localStorage.getItem(CARD_REMOVED_KEY)) {
    removeCardWidget();
  }

  // 使用 MutationObserver 监听动态生成
  const observer = new MutationObserver(() => {
    removeCardWidget();
  });

  observer.observe(document.body, {
    childList: true, // 子节点变化
    subtree: true    // 包括所有子树
  });

  // 如果以后想恢复显示，可以调用下面这个方法：
  // localStorage.removeItem(CARD_REMOVED_KEY);
})();

  function inject() {
    const container = document.querySelector(".sticky_layout");
    if (!container) return;

    // 防止重复插入
    if (document.getElementById("quick-nav-box")) return;

    const box = document.createElement("div");
    box.id = "quick-nav-box";
// ````````````````````````````````````````````````````````````````````````````````````````````````
    box.innerHTML = `
      <div class="qnav-header">
        <i class="fas fa-th-large"></i>
        <span>快捷导航</span>
      </div>

      <div class="qnav-grid">
        <div class="qnav-item" onclick="window.open('/2026/03/05/ICT/')">
          <i class="fas fa-file-image"></i>
          <span>压缩工具</span>
        </div>



        <div class="qnav-item" onclick="window.open('/2026/03/03/food/')">
          <i class="fas fa-utensils"></i>
          <span>吃什么</span>
        </div>

        <div class="qnav-item" onclick="window.open('/2025/02/16/Rename/')">
          <i class="fas fa-signature"></i>
          <span>重命名</span>
        </div>

        <div class="qnav-item" onclick="window.open('/2026/03/05/ToBase64/')">
          <i class="fas fa-camera"></i>
          <span>图片转Base64</span>
        </div>
      </div>
    `;
// ````````````````````````````````````````````````````````````````````````````````````````````````

    container.prepend(box);

    // 字体自适应
    initFitText();
  }

  // ✅ 字体适配
  function fitTextPerfect(el) {
    let max = 18;
    let min = 8;

    let size = max;
    el.style.fontSize = size + "px";

    while (
      (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight)
      && size > min
    ) {
      size--;
      el.style.fontSize = size + "px";
    }
  }

  function initFitText() {
    document.querySelectorAll(".qnav-item span").forEach(el => {
      fitTextPerfect(el);
    });
  }

  // ✅ 初始化
  window.addEventListener("load", inject);
  window.addEventListener("resize", initFitText);

  // ✅ 关键：适配 PJAX（不同主题都兼容）
  document.addEventListener("pjax:complete", inject);
  document.addEventListener("pjax:end", inject);

  // 插入样式（无毛玻璃版）
  if (!document.getElementById("quick-nav-style")) {
    const style = document.createElement("style");
    style.id = "quick-nav-style";

    style.innerHTML = `
      #quick-nav-box {
        position: relative;   /* 关键 */
        z-index: 9999;        /* 提高层级 */
        padding: 14px;
        border-radius: 16px;
        background: rgba(0, 0, 0, 0.55);
        border: 1px solid rgba(255, 200, 80, 0.4);
        box-shadow: 0 0 10px rgba(255, 200, 80, 0.15);
        color: #f6c453;
      }

      .qnav-header {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 12px;
        gap: 8px;
      }

      .qnav-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
      }

        .qnav-item {
          position: relative;
          height: 90px;
          border-radius: 16px;
        
          /* 🍬 果冻底色（半透明） */
          background: rgba(0, 0, 0, 0.55);
        
          /* 🍬 边框（软金色） */
          border: 1px solid rgba(255, 200, 80, 0.35);
        
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
        
          cursor: pointer;
          transition: all 0.25s ease;
        }

      .qnav-item i {
        font-size: 22px;
        color: #f6c453;
      }

      .qnav-item span {
        display: block;
        width: 80%;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #ddd;
        white-space: nowrap;
        overflow: hidden;
      }

      .qnav-item:hover {
        transform: translateY(-4px) scale(1.05);
        background: #000000;
        box-shadow: 0 0 12px rgba(255, 200, 80, 0.4);
      }
    `;

    document.head.appendChild(style);
  }

})();