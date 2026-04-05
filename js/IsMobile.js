(function() {
    if(window.innerWidth > 900) return
    // --- 配置区域 ---
    const config = {
        title: "强烈提醒",
        message: "检测到您正在使用手机浏览，为了获得最佳体验请使用电脑访问我的博客",
        buttonText: "我知道了"
    };


    function initMobileModal() {
        // --- 2. 创建样式 ---
        const style = document.createElement('style');
        style.textContent = `
            /* 模糊背景遮罩 */
            #custom-modal-overlay {
                position: fixed;
                top: 0; left: 0;
                width: 100%; height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(8px); /* 核心：背景模糊 */
                -webkit-backdrop-filter: blur(8px);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            /* 弹窗主体 */
            #custom-modal-box {
                background: #fff;
                width: 80%;
                max-width: 300px;
                padding: 25px;
                border-radius: 15px;
                text-align: center;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                transform: scale(0.8);
                transition: transform 0.3s ease;
            }
            #custom-modal-box h2 { margin-top: 0; color: #333; font-size: 20px; }
            #custom-modal-box p { color: #666; line-height: 1.5; margin: 15px 0; }
            #custom-modal-btn {
                background: #007AFF;
                color: white;
                border: none;
                padding: 10px 25px;
                border-radius: 20px;
                font-size: 16px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);

        // --- 3. 创建 DOM 结构 ---
        const overlay = document.createElement('div');
        overlay.id = 'custom-modal-overlay';
        
        overlay.innerHTML = `
            <div id="custom-modal-box">
                <h2>${config.title}</h2>
                <p>${config.message}</p>
                <button id="custom-modal-btn">${config.buttonText}</button>
            </div>
        `;

        document.body.appendChild(overlay);

        // 进场动画
        setTimeout(() => {
            overlay.style.opacity = '1';
            document.getElementById('custom-modal-box').style.transform = 'scale(1)';
        }, 10);

        // --- 4. 关闭事件 ---
        document.getElementById('custom-modal-btn').onclick = function() {
            overlay.style.opacity = '0';
            document.getElementById('custom-modal-box').style.transform = 'scale(0.8)';
            setTimeout(() => overlay.remove(), 300);
        };
    }
    initMobileModal()
})();