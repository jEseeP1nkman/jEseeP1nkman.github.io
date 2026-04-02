// 控制台画图
function doro() {
    // 页面加载完成后执行
    window.addEventListener('load', function() {
        // 字符画字符串（用\n实现换行，避免解析冲突）
        const meteorArt = 
            '⠀⠀⠀⠀⢀⠴⣲⣯⣉⣽⣿⡛⠻⣶⠖⢒⢶⣦⣄⠀⠀⠀⠀⠀\n' +
            '⠀⠀⢀⡴⢁⡜⠉⠋⠉⠹⠉⠱⡄⠙⢦⣼⣾⣿⣿⣧⠀⠀⠀⠀\n' +
            '⠀⢀⡞⢀⡞⢀⡄⠀⠀⢀⢸⠀⠹⡀⠈⣟⠿⣿⣿⣿⣟⣉⡇⠀⠀\n' +
            '⣴⣫⠀⢸⢠⣾⡇⢠⠀⢸⢰⢆⠀⡇⠀⢹⣿⣿⣿⣿⣌⡇⠀⠀\n' +
            '⠀⠀⢀⡼⢻⠛⢿⡾⠦⣿⣿⣿⣷⡇⠀⢸⠁⣯⣿⠛⡹⠛⣦⠀\n' +
            '⠀⢰⢨⠀⠈⢓⢺⢁⣀⠀⢿⢀⣼⠃⠀⣸⣠⠃⣇⡴⠁⠀⢸⡇\n' +
            '⠀⠘⣎⢓⢤⣄⣀⣉⡉⣁⣀⣠⣿⡆⢠⠟⠁⠀⠘⠁⠀⠀⢸⡇\n' +
            '⠀⠀⠈⢺⡿⠇⡀⠉⠉⠉⠉⢉⣼⡡⠋⠀⠀⢀⣴⠀⠀⣠⠟⠀\n' +
            '⠀⠀⠀⠀⢷⡀⢻⡶⣤⣤⠀⠀⠀⠀⣀⣤⡴⠛⡇⠀⠀⡏⠀⠀\n' +
            '⠀⠀⠀⠀⠈⠳⠼⠃⠀⠈⢧⡀⠀⠀⡇⠀⠀⠀⠻⣄⣀⡟⠀⠀\n' +
            '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠶⠾⠁⠀⠀⠀⠀⠈⠉⠀⠀⠀';
        
        console.log(
            '%c' + meteorArt,
            'color: #F7AFC7; font-family: monospace; font-size: 12px; line-height: 1.2;'
        );
    });
};

// 删除傻逼f12跳东西

(function () {

const blockedClasses = [
  "snackbar-container",
  "snackbar-pos",
  "top-center"
];

// 删除元素
function removeSnackbar(node){
  if(node.nodeType !== 1) return;

  blockedClasses.forEach(cls=>{
    if(node.classList?.contains(cls)){
      node.remove();
    }
  });

  node.querySelectorAll?.(
    blockedClasses.map(c=>"."+c).join(",")
  ).forEach(el=>el.remove());
}

// DOM监听（代替setInterval）
const observer = new MutationObserver(mutations=>{
  mutations.forEach(m=>{
    m.addedNodes.forEach(node=>{
      removeSnackbar(node);
    });
  });
});

observer.observe(document.documentElement,{
  childList:true,
  subtree:true
});

// 页面初始化清理一次
document.addEventListener("DOMContentLoaded",()=>{
  blockedClasses.forEach(cls=>{
    document.querySelectorAll("."+cls).forEach(el=>el.remove());
  });
});

// 删除CSS
document.querySelectorAll("style").forEach(style=>{
  if(style.innerHTML.includes("snackbar")){
    style.remove();
  }
});

})();

const warn = console.warn;
console.warn = function(msg){
  if(typeof msg === "string" && msg.includes("Swiper Loop Warning")) return;
  warn.apply(console, arguments);
};

// 一键禁用（post-copyright + headerlink）
(function () {

  // ✅ 1. 先用 CSS 防闪现
  const style = document.createElement('style');
  style.innerHTML = `
    .post-copyright,
    .headerlink {
      display: none !important;
    }
  `;
  document.head.appendChild(style);

  // ✅ 2. 强制删除函数
  function kill() {
    document.querySelectorAll('.post-copyright, .headerlink')
      .forEach(el => el.remove());
  }

  // 初始执行
  kill();

  // ✅ 3. 监听 DOM（防止被主题重新插入）
  const observer = new MutationObserver(kill);

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
// ------------------------------------------------------------------------------------------------------------
(function () {

  function fixNav() {
    const nav = document.getElementById("nav");
    if (!nav) return;

    // 背景透明
    nav.style.setProperty("background", "transparent", "important");
    nav.style.setProperty("background-color", "transparent", "important");

    // 防止某些主题加模糊
    nav.style.setProperty("backdrop-filter", "none", "important");
    nav.style.setProperty("-webkit-backdrop-filter", "none", "important");
  }

  // === 注入样式（只执行一次）===
  if (!document.getElementById("fix-nav-style")) {
    const style = document.createElement("style");
    style.id = "fix-nav-style";

    style.innerHTML = `
      #nav, #nav:focus, #nav:active {
        outline: none !important;
        box-shadow: none !important;
        background: transparent !important;
      }
    `;

    document.head.appendChild(style);
  }

  // 首次执行
  fixNav();

  // 防止 PJAX / 局部刷新失效
  document.addEventListener("pjax:complete", fixNav);

})();
// ------------------------------------------------------------------------------------------------------------
document.documentElement.style.setProperty("--efu-secondbg", "#1B1C20");

(function () {

  function injectStyle() {
    if (document.getElementById("fix-nav-link-color")) return;

    const style = document.createElement("style");
    style.id = "fix-nav-link-color";

    style.innerHTML = `
      /* 非顶部图时 */
      #page-header.not-top-img #nav a {
        color: #FFC848 !important;
      }

      /* 全局 nav */
      #nav a {
        color: #FFC848 !important;
      }
    `;

    document.head.appendChild(style);
  }

  // 初始执行
  injectStyle();

  // PJAX 兼容
  document.addEventListener("pjax:complete", injectStyle);

})();
// ------------------------------------------------------------------------------------------------------------
(function () {

  function injectStyle() {
    if (document.getElementById("fix-totopbtn-bg")) return;

    const style = document.createElement("style");
    style.id = "fix-totopbtn-bg";

    style.innerHTML = `
      #page-header #nav #nav-right .nav-button a.totopbtn {
        background: #000000 !important;
      }
    `;

    document.head.appendChild(style);
  }

  // 初始执行
  injectStyle();

  // PJAX 兼容
  document.addEventListener("pjax:complete", injectStyle);

})();
// ------------------------------------------------------------------------------------------------------------
(function injectSelectionStyle() {
    const style = document.createElement('style');
    style.id = 'dynamic-selection-style';
    style.textContent = `
        /* 针对 Chrome, Edge, Safari, Opera */
        ::selection {
            background: #a78bfa !important; /* 梦幻紫色，你可以换成 #f472b6 桃粉 */
            color: #ffffff !important;
        }
        /* 针对 Firefox */
        ::-moz-selection {
            background: #a78bfa !important;
            color: #ffffff !important;
        }

        
    `;
    document.head.appendChild(style);
})();

// ------------------------------------------------------------------------------------------------------------
console.clear();
doro() 

// ------------------------------------------------------------------------------------------------------------

document.getElementById("menu-darkmode")?.remove();
document.getElementById("menu-translate")?.remove();
document.getElementById("universe")?.remove();


// ------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------
