function BirthdayBlog() {
    toggleILoveUSDollar();
    BirthdayBackground();
    let fwAnimationId;
    
    // 1. 全局背景烟花函数 (保持不变)
    function BirthdayFireworks() {
        let canvas = document.getElementById('fireworksCanvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'fireworksCanvas';
            canvas.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:9998;';
            document.body.appendChild(canvas);
        }

        const ctx = canvas.getContext('2d');
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function getRandomColor() { return `hsl(${Math.random() * 360}, 100%, 60%)`; }

        class Particle {
            constructor(x, y, color) {
                this.x = x; this.y = y; this.color = color; this.alpha = 1;
                this.velocity = { x: (Math.random() - 0.5) * 20, y: (Math.random() - 0.5) * 20 };
                this.gravity = 0.05; this.friction = 0.95;
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }
            update() {
                this.velocity.x *= this.friction; this.velocity.y *= this.friction;
                this.velocity.y += this.gravity; this.x += this.velocity.x; this.y += this.velocity.y;
                this.alpha -= 0.01;
            }
        }

        class Firework {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height;
                this.color = getRandomColor();
                this.velocity = { x: (Math.random() - 0.5) * 2, y: -(Math.random() * 5 + 10) };
                this.particles = [];
                this.isExploded = false;
            }
            draw() {
                if (!this.isExploded) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                }
                this.particles.forEach(p => p.draw());
            }
            update() {
                if (!this.isExploded) {
                    this.x += this.velocity.x; this.y += this.velocity.y;
                    if (this.velocity.y >= -2) this.explode();
                    this.velocity.y += 0.1;
                }
                this.particles.forEach((p, i) => {
                    p.update();
                    if (p.alpha <= 0) this.particles.splice(i, 1);
                });
            }
            explode() {
                this.isExploded = true;
                for (let i = 0; i < 150; i++) this.particles.push(new Particle(this.x, this.y, getRandomColor()));
            }
        }

        let fireworks = [];
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (Math.random() < 0.05) fireworks.push(new Firework());
            fireworks.forEach((f, i) => {
                f.draw(); f.update();
                if (f.isExploded && f.particles.length === 0) fireworks.splice(i, 1);
            });
            fwAnimationId = requestAnimationFrame(animate);
        }
        animate();
    }

    // 2. 修正后的：右上角固定图片（支持循环显示）
    function BirthdayFlower() {
        const imageUrl = "/img/BirthdaySurprise.gif";
        let isCoolingDown = false; // 状态锁
        
        const giftImg = document.createElement('img');
        giftImg.src = imageUrl;
        giftImg.id = "fixedBirthdayGift";
        giftImg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 120px;
            height: auto;
            cursor: pointer;
            z-index: 9999;
            filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
            transition: transform 0.3s ease, opacity 0.5s ease;
        `;
        
        giftImg.onmouseover = () => { if(!isCoolingDown) giftImg.style.transform = "scale(1.1) rotate(5deg)"; };
        giftImg.onmouseout = () => { if(!isCoolingDown) giftImg.style.transform = "scale(1) rotate(0deg)"; };
        
        document.body.appendChild(giftImg);

        giftImg.onclick = function(e) {
            if (isCoolingDown) return;
            
            isCoolingDown = true;
            triggerSurprise(e.clientX, e.clientY);
            giftImg.style.opacity = '0'; // 渐隐
            giftImg.style.pointerEvents = 'none'; // 动画期间禁点
        };

        function triggerSurprise(targetX, targetY) {
            const div = document.createElement('div');
            div.id = "birthdayText";
            div.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; z-index: 10000; pointer-events: none; opacity: 0; transition: opacity 1s; font-family: sans-serif;';

            div.innerHTML = `
                <style>
                    .white-rainbow-text {
                        font-size: 80px; font-weight: bold;
                        background: linear-gradient(to right, #fff 0%, #ff4757 25%, #2ed573 50%, #1e90ff 75%, #fff 100%);
                        background-size: 200% auto;
                        -webkit-background-clip: text; background-clip: text;
                        color: transparent; text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
                        animation: rainbowFlow 4s linear infinite;
                    }
                    @keyframes rainbowFlow { to { background-position: 200% center; } }
                    .custom-cake-image { width: 150px; height: auto; display: block; margin: 0 auto 15px auto; filter: drop-shadow(0 0 10px white); }
                </style>
                <img src="/img/BirthdayCake.png" alt="生日蛋糕" class="custom-cake-image">
                <h1 class="white-rainbow-text">生日快乐</h1>
            `;
            document.body.appendChild(div);
            setTimeout(() => div.style.opacity = '1', 100);

            // 5秒后清理惊喜效果，并恢复右上角图片
            setTimeout(() => {
                div.style.opacity = '0';
                setTimeout(() => {
                    if (div.parentNode) document.body.removeChild(div);
                    
                    // 核心修改：5秒后恢复图片显示
                    giftImg.style.opacity = '1';
                    giftImg.style.pointerEvents = 'auto';
                    giftImg.style.transform = "scale(1) rotate(0deg)";
                    isCoolingDown = false; // 解除状态锁
                    
                }, 1000);
            }, 5000);
        }
    }

// -----------------------------------------------------------------------------------
// 改网页头像
    function updateWebIcons(newPath) {
      // 定义需要寻找的 rel 类型
      const rels = ['bookmark', 'icon', 'apple-touch-icon'];
    
      rels.forEach(relType => {
        const link = document.querySelector(`link[rel="${relType}"]`);
        if (link) {
          link.href = newPath;
        } else {
          // 如果页面上原本没有这个标签，也可以选择动态创建一个
          const newLink = document.createElement('link');
          newLink.rel = relType;
          newLink.href = newPath;
          if (relType === 'apple-touch-icon') newLink.sizes = "180x180";
          document.head.appendChild(newLink);
        }
      });
    }

    // 调用示例
    updateWebIcons('/img/HappyBirthdayGoodJobStickerbyEmoji.gif');

// -----------------------------------------------------------------------------------



    // 启动
    BirthdayFireworks();
    BirthdayFlower();
}

function runEveryYearOnBirthday(month, day) {
    const now = new Date();
    const currentMonth = now.getMonth(); 
    const currentDate = now.getDate();   

    if (currentMonth === (month - 1) && currentDate === day) {
        BirthdayBlog();
    }
}

// 调用：8 月 27 日运行
runEveryYearOnBirthday(8, 27);