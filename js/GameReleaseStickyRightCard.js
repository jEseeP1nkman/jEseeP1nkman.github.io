(function () {

  // ✅ 在这里配置你的游戏
  const games = [
    {
      name: "GTA VI",
      date: "2026-11-19 00:00:00",
      img: "/img/GTA6StickyRightCard.jpg"
    },
    {
      name: "Pragmata",
      date: "2026-04-17 11:59:00",
      img:"/img/PRAGMATAGameCard.jpg"
    },
    {
      name: "jEseeP1nkman's Blog",
      date: "2024-08-20 10:00:00",
      img: "/img/ICT.gif"
    }
  ];

  function init() {
    const container = document.querySelector(".sticky_layout");
    if (!container) return;
    if (document.getElementById("game-card")) return;

    const box = document.createElement("div");
    box.id = "game-card";

    box.innerHTML = `
      <div class="card-track"></div>
    `;

    container.prepend(box);

    const track = box.querySelector(".card-track");

    // 生成卡片
    games.forEach((g, i) => {
      const item = document.createElement("div");
      item.className = "card-item";

      item.innerHTML = `
        <div class="bg" style="background-image:url('${g.img}')"></div>
        <div class="overlay"></div>
        <div class="inner">
          <div class="logo">${g.name}</div>
          <div class="sub">距离发售还有</div>
          <div class="time" id="time-${i}"></div>
        </div>
      `;

      track.appendChild(item);
    });

    // 倒计时
    function update() {
      games.forEach((g, i) => {
        const el = document.getElementById(`time-${i}`);
        if (!el) return;

        const diff = new Date(g.date) - new Date();

        if (diff <= 0) {
          el.innerHTML = "已发售 🎉";
          return;
        }

        const d = Math.floor(diff / (1000*60*60*24));
        const h = Math.floor(diff / (1000*60*60)) % 24;
        const m = Math.floor(diff / (1000*60)) % 60;
        const s = Math.floor(diff / 1000) % 60;

        el.innerHTML = `${d}天 ${h}时 ${m}分 ${s}秒`;
      });
    }

    update();
    setInterval(update, 1000);

    // 🔄 自动切换
    let index = 0;
    setInterval(() => {
      index = (index + 1) % games.length;
      track.style.transform = `translateX(-${index * 100}%)`;
    }, 3000);
  }

  // 样式
  if (!document.getElementById("game-style")) {
    const style = document.createElement("style");
    style.id = "game-style";

    style.innerHTML = `
      #game-card{
        overflow:hidden;
        border-radius:12px;
        margin-bottom:12px;
      }

      .card-track{
        display:flex;
        width:100%;
        transition:transform .8s cubic-bezier(.77,0,.18,1);
      }

      .card-item{
        min-width:100%;
        position:relative;
        overflow:hidden;
        border-radius:12px;
        backdrop-filter:blur(16px);
        background:rgba(255,255,255,0.05);
        border:1px solid rgba(255,255,255,0.1);
      }

      .bg{
        position:absolute;
        inset:0;
        background-size:cover;
        background-position:center;
        filter:brightness(.7) saturate(1.2);
        transform:scale(1.05);
        transition:transform 3s ease;
      }

      /* 切换时轻微放大（高级感） */
      .card-item.active .bg{
        transform:scale(1.15);
      }

      .overlay{
        position:absolute;
        inset:0;
        background:linear-gradient(
          135deg,
          rgba(255,0,150,0.35),
          rgba(255,120,0,0.25)
        );
        mix-blend-mode:screen;
      }

      .inner{
        position:relative;
        z-index:2;
        padding:16px;
        text-align:center;
        color:#fff;
      }

      .logo{
        font-size:24px;
        font-weight:bold;
        letter-spacing:2px;
        color:#ffd6ff;
        -webkit-text-stroke:1px rgba(255,255,255,0.2);
        text-shadow:
          0 0 12px rgba(255,100,200,0.9),
          0 0 25px rgba(255,100,200,0.6);
      }

.sub{
  margin-top:6px;
  font-size:20px;

  /* ✅ 和 LOGO / 时间统一颜色 */
  color:#ffd6ff;

  /* 轻一点的发光（不要太强） */
  text-shadow:0 0 8px rgba(255,100,200,0.6);

  /* 稍微降低一点存在感（更高级） */
  opacity:0.85;
}

      .time{
        margin-top:10px;
        font-size:18px;
        font-weight:bold;
        font-family:monospace;
        color:#ffd6ff;
        text-shadow:0 0 12px rgba(255,100,200,0.9);
      }
    `;

    document.head.appendChild(style);
  }

  function run(){ setTimeout(init,200); }

  document.addEventListener("DOMContentLoaded", run);
  document.addEventListener("pjax:complete", run);
  document.addEventListener("pjax:success", run);
  window.addEventListener("load", run);

})();