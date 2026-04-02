function BirthdayBlog (){
    let fwAnimationId; 
    let flowerAnimationId;

    // 1. 全局背景烟花函数
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
            // 修正：只写一次
            fwAnimationId = requestAnimationFrame(animate);
        }
        animate();
    }

    // 2. 掉落礼物与触发大惊喜函数
    function BirthdayFlower() {
        function startBirthdaySurprise(imageUrl) {
            let canvas = document.getElementById('fallCanvas'); // 统一 ID 命名
            if (!canvas) {
                canvas = document.createElement('canvas');
                canvas.id = 'fallCanvas';
                canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999;';
                document.body.appendChild(canvas);
            }
            const ctx = canvas.getContext('2d');

            function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
            window.addEventListener('resize', resize);
            resize();

            const img = new Image();
            img.src = imageUrl;
            let imgLoaded = false;
            img.onload = () => { imgLoaded = true; };

            let isSurpriseTriggered = false;
            const imgSize = 150;
            let gift = {
                x: Math.random() * (window.innerWidth - imgSize),
                y: -imgSize,
                speedY: 1.5, amplitude: 60, frequency: 0.02, time: 0, initialX: 0
            };
            gift.initialX = gift.x;
            let fireworks = [];

            // 点击检测
            const handleMouseDown = (e) => {
                if (isSurpriseTriggered) return;
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                if (mouseX >= gift.x && mouseX <= gift.x + imgSize &&
                    mouseY >= gift.y && mouseY <= gift.y + imgSize) {
                    triggerSurprise(mouseX, mouseY);
                }
            };
            window.addEventListener('mousedown', handleMouseDown);

            function triggerSurprise(targetX, targetY) {
                isSurpriseTriggered = true;
                for (let i = 0; i < 150; i++) fireworks.push(new Particle(targetX, targetY));

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

                // 5秒后自动清理
                setTimeout(() => {
                    div.style.opacity = '0';
                    setTimeout(() => {
                        // 1. 移除 DOM 元素
                        if (div.parentNode) document.body.removeChild(div);

                        const fwCanvas = document.getElementById('fireworksCanvas');
                        if (fwCanvas) document.body.removeChild(fwCanvas);

                        const flCanvas = document.getElementById('fallCanvas');
                        if (flCanvas) document.body.removeChild(flCanvas);

                        // 2. 停止动画
                        window.cancelAnimationFrame(fwAnimationId);
                        window.cancelAnimationFrame(flowerAnimationId);
                        window.removeEventListener('mousedown', handleMouseDown);

                        console.log("清理完毕");
                    }, 1000);
                }, 5000);
            }

            class Particle {
                constructor(x, y) {
                    this.x = x; this.y = y;
                    this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
                    this.alpha = 1;
                    this.velocity = { x: (Math.random() - 0.5) * 12, y: (Math.random() - 0.5) * 12 };
                }
                update() { this.x += this.velocity.x; this.y += this.velocity.y; this.velocity.y += 0.1; this.alpha -= 0.01; }
                draw() { ctx.globalAlpha = this.alpha; ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, 3, 0, Math.PI * 2); ctx.fill(); }
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (!isSurpriseTriggered) {
                    if (imgLoaded) {
                        gift.time += gift.frequency; gift.y += gift.speedY;
                        gift.x = gift.initialX + Math.sin(gift.time) * gift.amplitude;
                        ctx.drawImage(img, gift.x, gift.y, imgSize, imgSize);
                        if (gift.y > canvas.height) { gift.y = -imgSize; gift.initialX = Math.random() * (canvas.width - imgSize); }
                    }
                } else {
                    fireworks.forEach((p, i) => {
                        p.update(); p.draw();
                        if (p.alpha <= 0) fireworks.splice(i, 1);
                    });
                }
                flowerAnimationId = requestAnimationFrame(animate);
            }
            animate();
        }
        startBirthdaySurprise("/img/BirthdayFlower.png");
    }

    // 启动
    BirthdayFireworks();
    BirthdayFlower();


}

function runEveryYearOnBirthday(month, day) {
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-11
    const currentDate = now.getDate();   // 1-31

    // 这里的 month 传入正常月份数字，代码里减 1
    if (currentMonth === (month - 1) && currentDate === day) {
        BirthdayBlog ()
    }
}

// 调用：每年 5 月 20 日运行
runEveryYearOnBirthday(8, 27);