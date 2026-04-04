/**
 * BlogSettings - 触发博客中心卡牌功能
 * 包含：动态卡牌生成、8:2比例控制、悬停放大、背景虚化/变暗、自定义回调
 */
function BlogSettings() {

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -- --- --- --- --- --- --- --- --- 



// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- -- --- --- --- --- --- --- --- --- 

    // --- 1. 自定义配置区 (你可以在这里修改卡片的内容和点击后的动作) ---
    const cards = [
        {
            title: "开关网站背景",
            img: "/img/toggleILoveUSDollar.gif",
            callback: () => {
                disableILoveUSDollar();
            }
        },
        {
            title: "开关欣赏模式",
            img: "/img/toggleCleanMode.gif",
            callback: () => {
                toggleCleanMode();
            }
        },

        {
            title: "开关性能表盘",
            img: "/img/toggleFPS.gif",
            callback: () => {
                toggleFPS();
            }
        },
        {
            title: "触发辐射版主题",
            img: "/img/Fallout4Tutorial.gif",
            callback: () => {
                FuncFalloutBG();
            }
        },




        
    ];

    // --- 2. 样式注入 (确保只注入一次) ---
    if (!document.getElementById('blog-settings-style')) {
        const style = document.createElement('style');
        style.id = 'blog-settings-style';
        style.innerHTML = `
            .bs-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0, 0, 0, 0.6); /* 背景变暗 */
                backdrop-filter: blur(8px);    /* 背景模糊 */
                display: flex; justify-content: center; align-items: center;
                z-index: 9999; opacity: 0; transition: opacity 0.3s ease;
            }
            .bs-container {
                display: flex; gap: 30px; flex-wrap: wrap; justify-content: center;
                padding: 20px; transform: translateY(20px); transition: transform 0.3s ease;
            }
            .bs-card {
                width: 220px; height: 300px; background: #1B1C20; border-radius: 15px;
                overflow: hidden; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3); display: flex; flex-direction: column;
            }
            .bs-card:hover {
                transform: scale(1.08); /* 鼠标悬停放大 */
                box-shadow: 0 15px 45px rgba(0,0,0,0.5);
            }
            .bs-card-img {
                width: 100%; height: 80%; /* 图片占80% */
                object-fit: cover; pointer-events: none;
            }
            .bs-card-text {
                width: 100%; height: 20%; /* 文字占20% */
                display: flex; align-items: center; justify-content: center;
                background: #1B1C20; font-size: 16px; color: #F6C453; font-weight: 600;
            }
        `;
        document.head.appendChild(style);
    }

    // --- 3. 构建 DOM 结构 ---
    const overlay = document.createElement('div');
    overlay.className = 'bs-overlay';
    
    const container = document.createElement('div');
    container.className = 'bs-container';

    cards.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bs-card';
        card.innerHTML = `
            <img src="${item.img}" class="bs-card-img" alt="${item.title}">
            <div class="bs-card-text">${item.title}</div>
        `;
        
        // 点击卡片触发自定义函数并关闭面板
        card.onclick = (e) => {
            e.stopPropagation();
            item.callback();
            closeSettings();
        };
        
        container.appendChild(card);
    });

    overlay.appendChild(container);
    document.body.appendChild(overlay);

    // --- 4. 交互逻辑 ---
    // 渐显效果
    setTimeout(() => {
        overlay.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 10);

    // 点击背景关闭
    const closeSettings = () => {
        overlay.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }, 300);
    };

    overlay.onclick = closeSettings;
}