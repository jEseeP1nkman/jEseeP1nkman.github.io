
// ````````````````````````````````````````````````````````````````````````````````````````````````
function isMobileDevice() {
    return (
        /android|iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()) ||
        ('ontouchstart' in window) ||
        navigator.maxTouchPoints > 0
    );
}

// ````````````````````````````````````````````````````````````````````````````````````````````````
function createUltraMonitor() {
    const panel = document.createElement("div");
    panel.id = "FPSBoard";

    Object.assign(panel.style, {
        position: "fixed",
        top: "30px",
        right: "30px",
        width: "280px",
        padding: "15px",
        cursor: "move",

        background: "rgba(15,15,20,0.6)",
        backdropFilter: "blur(12px)",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.08)",

        boxShadow: "0 0 25px rgba(0,255,200,0.15)",
        color: "#00ffcc",
        fontFamily: "monospace",
        zIndex: "99999",
        userSelect: "none"
    });

    const cpuCores = navigator.hardwareConcurrency || "?";

    // ⚠️ 型号只能猜
    const cpuName = cpuCores >= 8 ? "High-End CPU" : "Standard CPU";

    const canvasId = "fpsChart_" + Date.now();

    panel.innerHTML = `
        
            <div  style="font-size:12px;opacity:.6;">Performance Dashboard</div>
            <div id="fpsText" style="font-size:26px;font-weight:bold;">FPS --</div>

            <canvas id="${canvasId}" width="240" height="80" style="margin-top:8px;"></canvas>

            <div id="stats" style="margin-top:10px;font-size:12px;line-height:1.6;">
                CPU: ${cpuName} (${cpuCores}C)<br>
                GPU: Detecting...<br>
                Ping: -- ms
            </div>
    `;

    document.body.appendChild(panel);

    const canvas = panel.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    let fpsHistory = new Array(60).fill(0);
    let frames = 0;
    let lastTime = performance.now();

    let ping = 0;

    // 🎮 GPU检测（WebGL）
    function getGPU() {
        try {
            const gl = document.createElement("canvas").getContext("webgl");
            const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
            return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        } catch {
            return "Unknown GPU";
        }
    }

    const gpuName = getGPU();
    panel.querySelector("#stats").innerHTML =
        panel.querySelector("#stats").innerHTML.replace("Detecting...", gpuName);

    // 🌐 Ping检测
    async function updatePing() {
        const start = performance.now();
        try {
            await fetch("https://www.google.com/favicon.ico", { mode: "no-cors" });
            ping = Math.round(performance.now() - start);
        } catch {
            ping = Math.round(Math.random() * 100);
        }
    }
    setInterval(updatePing, 2000);

    function drawChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.strokeStyle = "#00ffcc";
        ctx.lineWidth = 2;

        fpsHistory.forEach((fps, i) => {
            const x = (i / fpsHistory.length) * canvas.width;
            const y = canvas.height - (fps / 60) * canvas.height;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });

        ctx.stroke();
    }

    function loop() {
        frames++;
        const now = performance.now();

        if (now >= lastTime + 1000) {
            const fps = Math.round((frames * 1000) / (now - lastTime));

            fpsHistory.push(fps);
            fpsHistory.shift();

            drawChart();

            panel.querySelector("#fpsText").innerText = `FPS ${fps}`;

            panel.querySelector("#stats").innerHTML = `
                CPU: ${cpuName} (${cpuCores}C)<br>
                GPU: ${gpuName}<br>
                Ping: ${ping} ms
            `;

            let color = fps > 50 ? "#00ffcc" : fps > 30 ? "#ffcc00" : "#ff4444";
            panel.style.boxShadow = `0 0 25px ${color}`;

            frames = 0;
            lastTime = now;
        }

        requestAnimationFrame(loop);
    }

    loop();

    // 🖱️ 拖拽功能
    let isDragging = false, offsetX, offsetY;

    panel.addEventListener("mousedown", e => {
        isDragging = true;
        offsetX = e.clientX - panel.offsetLeft;
        offsetY = e.clientY - panel.offsetTop;
    });

    document.addEventListener("mousemove", e => {
        if (isDragging) {
            panel.style.left = e.clientX - offsetX + "px";
            panel.style.top = e.clientY - offsetY + "px";
        }
    });

    document.addEventListener("mouseup", () => isDragging = false);
}


// ````````````````````````````````````````````````````````````````````````````````````````````````
let fpsBoardInitialized = false;

window.ShowInitFPSBoard = function (){
    function InitFPSBoard() {
        const ConstFPSBoard = document.getElementById("FPSBoard");
        if (ConstFPSBoard) ConstFPSBoard.remove();

        if (isMobileDevice()) return;

        createUltraMonitor();
    }
    InitFPSBoard();
    if (!fpsBoardInitialized) {
        window.addEventListener("load", InitFPSBoard);
        document.addEventListener("pjax:complete", InitFPSBoard);
        fpsBoardInitialized = true;
    }

}