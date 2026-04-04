// 1. 初始化状态：由于原脚本末尾会自动运行一次美元主题，我们将初始状态设为 'dollar'
window.currentTheme = 'dollar';

function toggleFalloutBG() {
    // 获取所有相关 DOM 元素
    const dollarCanvas = document.getElementById("ILoveUSDollar");
    const vaultCanvas = document.getElementById("vaultTerminal");
    const falloutSidebar = document.getElementById("wasteland-sidebar-container");
    const falloutStyle = document.getElementById("custom-nav-style");

    if (window.currentTheme === 'dollar') {
        // --- 切换到：辐射 (Fallout) 主题 ---
        window.currentTheme = 'fallout';

        // 彻底隐藏并清空美元主题
        if (dollarCanvas) {
            const ctx = dollarCanvas.getContext("2d");
            ctx.clearRect(0, 0, dollarCanvas.width, dollarCanvas.height); // 清除画布像素 [cite: 10]
            dollarCanvas.style.setProperty('display', 'none', 'important'); // 强制隐藏 [cite: 18]
            dollarCanvas.style.zIndex = "-10"; // 将层级降到最低
        }

        // 运行辐射主题初始化
        if (typeof FuncFalloutBG === 'function') {
            FuncFalloutBG();
        }

        // 确保辐射主题元素处于顶层并显示
        if (vaultCanvas) {
            vaultCanvas.style.setProperty('display', 'block', 'important'); // [cite: 47]
            vaultCanvas.style.zIndex = "-1"; // 提升层级
        }
        if (falloutSidebar) {
            falloutSidebar.style.setProperty('display', 'flex', 'important'); // [cite: 58]
        }

        console.log("主题已切换至：辐射废土");

    } else {
        // --- 切换回：美元 (USDollar) 主题 ---
        window.currentTheme = 'dollar';

        // 隐藏辐射主题
        if (vaultCanvas) {
            vaultCanvas.style.setProperty('display', 'none', 'important');
            vaultCanvas.style.zIndex = "-10";
        }
        if (falloutSidebar) {
            falloutSidebar.style.setProperty('display', 'none', 'important');
        }
        
        // 移除辐射主题的 CSS 污染 [cite: 85]
        if (falloutStyle) {
            falloutStyle.textContent = ""; 
        }
        document.documentElement.style.removeProperty('--efu-main');
        document.documentElement.style.removeProperty('--efu-theme');

        // 重新激活美元主题
        if (typeof funcILoveUSDollar === 'function') {
            funcILoveUSDollar();
        }
        if (dollarCanvas) {
            dollarCanvas.style.setProperty('display', 'block', 'important'); // [cite: 18]
            dollarCanvas.style.zIndex = "-1"; 
        }

        console.log("主题已切换至：美元背景");
    }
}