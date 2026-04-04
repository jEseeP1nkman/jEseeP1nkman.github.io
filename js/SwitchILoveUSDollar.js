// 1. 全局开关状态
window.SwitchILoveUSDollar = 0; 

const FuncSwitchILoveUSDollar = (function () {
    let timer = null; // 用于存储动画帧 ID
    let canvas, ctx;

    // 核心绘制循环
    function loop() {
        // 【关键】检查开关：如果是 0，则清空并彻底停止
        if (window.SwitchILoveUSDollar === 0) {
            if (ctx && canvas) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.style.display = "none";
            }
            cancelAnimationFrame(timer); // 取消下一帧请求
            timer = null;                // 重置 timer 标记
            return;                      // 彻底退出循环
        }

        // --- 正常的绘制逻辑 ---
        canvas.style.display = "block";
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 这里放你原本的 items 绘制代码，例如：
        // items.forEach(item => { ... });

        timer = requestAnimationFrame(loop);
    }

    return function start() {
        canvas = document.getElementById("ILoveUSDollar");
        if (!canvas) return;
        ctx = canvas.getContext("2d");

        // 防止重复启动多个 loop
        if (!timer) {
            loop();
        }
    };
})();

// 2. 【核心】关闭主题的函数
function disableILoveUSDollar() {
    window.SwitchILoveUSDollar = 0; // 设置状态为关闭
    console.log("主题已指令关闭");
    // 注意：loop 函数会在下一帧检测到这个 0 并自动停止
}

// 3. 【核心】开启主题的函数 (供其他函数调用)
function enableILoveUSDollar() {
    window.SwitchILoveUSDollar = 1; // 设置状态为开启
    console.log("主题已指令开启");
    FuncSwitchILoveUSDollar();     // 启动动画循环
}