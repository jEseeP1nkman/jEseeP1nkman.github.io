// 控制台画图
(function() {
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
})();

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
