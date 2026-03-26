(function(){
  // 开关函数
  window.toggleMini_phone_blog = function(){
    const container = document.getElementById("mini-blog-container");
    if (!container) return;
    container.style.display = (container.style.display === "none") ? "block" : "none";
  }

  // 可选：绑定快捷键 H
  document.addEventListener("keydown", (e) => {
    if (e.key === "h" || e.key === "H") {
      window.toggleMini_phone_blog();
    }
  });
})();
(function(){

function initMiniBlog(){

  // 防止重复创建
  if(document.getElementById("mini-blog-out-container")) return;

  /* ===== 样式 ===== */
  const style = document.createElement("style");
  style.innerHTML = `
  #mini-blog-container{
    position: fixed;
    right: 40px;
    top: 100px;
    width: 420px;
    height: 860px;
    background: #1E1E1F;
    border-radius: 20px;

    overflow: hidden;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    overflow:hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
  }
  .dynamic-island{
    position:absolute;
    top:12px;
    left:36%;
    transform:translateX(-50%);
    width:100px;
    height:28px;
    background:#000;
    border-radius:20px;
    z-index:20;
    display:flex;
    align-items:center;
    justify-content:center;
    animation:islandBreath 10s ease-in-out infinite;
  }
  .island-core{
    width:100%;
    height:100%;
    background:#000;
    border-radius:20px;
    display:flex;
    align-items:center;
    justify-content:center;
    animation:islandBreath 10s ease-in-out infinite;
    color:#000;
    font-size:100px;  /* 字体缩小 */
    cursor:pointer;
  }
  @keyframes islandBreath{
    0%{transform:scale(1);}
    50%{transform:scale(1.06);}
    100%{transform:scale(1);}
  }
  #mini-blog-title{
    font-weight: bold;
  }

  #mini-blog-close:hover{
    opacity:1;
  }

  #mini-blog-content{
    flex:1;
    overflow-y:auto;
    padding:20px;
    color:#E1E1E5;
    font-size:15px;
    line-height:1.6;
  }

  .mini-post{
    margin-bottom:20px;
    padding-bottom:15px;
    border-bottom:1px solid rgba(255,255,255,0.08);
    cursor:pointer;
  }

  .mini-post-title{
    font-size:20px;
    color:#E1E1E5;
    margin-bottom:5px;
  }

  .mini-post:hover{
    opacity:0.8;
  }

  .mini-article{
    display:none;
  }

  .mini-back{
    margin-bottom:10px;
    cursor:pointer;
    color:#111;
  }
  #mini-header-img{
    width:64px;
    height:50px;
    object-fit:cover;
    border-radius:8px;
    margin-bottom:6px;
  }
  `;


  document.head.appendChild(style);

  /* ===== HTML ===== */
  const container = document.createElement("div");
  container.id = "mini-blog-container";

  container.innerHTML = `
    <div id="mini-blog-header">
      <img src="/img/touxiang.ico" id="mini-header-img">
      <div id="mini-blog-title">Mini Blog</div>
    </div>
    <div id="mini-blog-content"></div>
  `;

  document.body.appendChild(container);

  const content = document.getElementById("mini-blog-content");

  /* ===== 模拟文章数据（你以后可以改成接口） ===== */
  const posts = [
    {
      title: "欢迎来到小博客",
      content: "这是一个嵌套在你大博客里的小世界。"
    },
    {
      title: "第二篇文章",
      content: "你可以把这里当成一个隐藏空间，比如日记、实验UI。"
    },
    {
      title: "第三篇",
      content: "后面我可以帮你接入 Hexo API 或 markdown。"
    }
  ];

  /* ===== 渲染列表 ===== */
  function renderList(){
    
    container.id="mini-blog-container"
    content.innerHTML = "";
    posts.forEach((post,i)=>{
      const el = document.createElement("div");
      
      el.className = "mini-post";
      el.innerHTML = `
        <div class="dynamic-island"></div>
        <div class="mini-post-title">${post.title}</div>
        <div>${post.content.slice(0,30)}...</div>
      `;
      el.onclick = ()=> openArticle(i);
      content.appendChild(el);
    });
  }

  /* ===== 打开文章 ===== */
  function openArticle(index){
    const post = posts[index];
    content.innerHTML = `
      <div class="dynamic-island"></div>
      <div class="mini-back">← 返回</div>
      
      <h3>${post.title}</h3>
      <p>${post.content}</p>
    `;
    document.querySelector(".mini-back").onclick = renderList;
  }


  renderList();
}

/* ===== 兼容 Hexo ===== */
document.addEventListener("DOMContentLoaded", initMiniBlog);
document.addEventListener("pjax:complete", initMiniBlog);

})();