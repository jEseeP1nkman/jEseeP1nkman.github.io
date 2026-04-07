let isPureMode = false;
// ````````````````````````````````````````````````````````````````````````````````````````````````````````````


// ````````````````````````````````````````````````````````````````````````````````````````````````````````````


/**
 * 朋友圈数据解析函数（增强兼容版）
 */
async function parsePYQData() {
    try {
        console.log("正在获取 PYQ.md...");
        const response = await fetch('./PYQ.md?t=' + new Date().getTime()); // 加时间戳防止缓存
        if (!response.ok) throw new Error('网络请求失败，请确保文件在服务器根目录且名为 PYQ.md');
        
        const text = await response.text();
        console.log("文件读取成功，内容如下：", text);

        // --- 核心修复：更强大的分割逻辑 ---
        // 它会匹配开头、结尾或中间的 ---，且不强制要求前后必须有换行
        const rawPosts = text.split(/^-{3,}\s*$|\n-{3,}\s*\n|\n-{3,}\s*$/m).filter(p => p.trim());
        
        console.log("初步分割出的动态数量：", rawPosts.length);

        const parsedData = rawPosts.map((post, index) => {
            const lines = post.trim().split('\n');
            let data = { Touxiang: '', Name: '', Text: [], Images: [] };
            
            lines.forEach(line => {
                const l = line.trim();
                // 使用 indexOf 判断，兼容性最好
                if (l.indexOf('Touxiang:') === 0) {
                    data.Touxiang = l.substring(9).trim();
                } else if (l.indexOf('Name:') === 0) {
                    data.Name = l.substring(5).trim();
                } else if (l.indexOf('Images:') === 0) {
                    data.Images = l.substring(7).split(',').map(img => img.trim()).filter(i => i);
                } else if (l.indexOf('Text:') === 0) {
                    data.Text.push(l.substring(5).trim());
                } else if (l !== "" && !l.includes(':')) {
                    // 记录没有标签的正文内容（换行）
                    data.Text.push(l);
                }
            });
            
            data.Text = data.Text.join('\n');
            return data;
        }).reverse();

        console.log("最终解析出的数据：", parsedData);
        return parsedData;

    } catch (e) {
        console.error("【关键错误】无法解析朋友圈数据:", e);
        return [];
    }
}

/**
 * 朋友圈主显示函数
 */
async function PYQ() {
    const screen = document.getElementById('iphoneScreen');
    if (!screen) return;
    
    // 1. 注入滚动条样式 (保持之前的细长样式)
    if (!document.getElementById('pyq-scrollbar-style')) {
        const style = document.createElement('style');
        style.id = 'pyq-scrollbar-style';
        style.innerHTML = `
            #iphoneScreen::-webkit-scrollbar { width: 4px; }
            #iphoneScreen::-webkit-scrollbar-track { background: transparent; }
            #iphoneScreen::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 10px; }
            #iphoneScreen { scrollbar-width: none; scrollbar-color: rgba(255, 255, 255, 0.2) transparent; cursor: grab; }
            #iphoneScreen:active { cursor: grabbing; }
        `;
        document.head.appendChild(style);
    }

    if (!isPureMode) {
        const posts = await parsePYQData();

        // 状态切换
        screen.style.backgroundColor = '#1E1E1F';
        screen.style.overflowY = 'auto';
        screen.style.overflowX = 'hidden';
        screen.style.position = 'relative';

        // 2. 核心逻辑：添加鼠标拖拽滑动
        let isDown = false;
        let startY;
        let scrollTop;

        const startDragging = (e) => {
            isDown = true;
            screen.classList.add('active');
            // 记录点击时的初始位置
            startY = e.pageY - screen.offsetTop;
            scrollTop = screen.scrollTop;
        };

        const stopDragging = () => {
            isDown = false;
        };

        const moveDragging = (e) => {
            if (!isDown) return;
            e.preventDefault(); // 阻止默认的文本选择
            const y = e.pageY - screen.offsetTop;
            const walk = (y - startY) * 1.5; // 1.5 是滚动速度系数
            screen.scrollTop = scrollTop - walk;
        };

        // 绑定事件
        screen.addEventListener('mousedown', startDragging);
        screen.addEventListener('mouseleave', stopDragging);
        screen.addEventListener('mouseup', stopDragging);
        screen.addEventListener('mousemove', moveDragging);

        // 将解绑函数存入 dataset，方便以后关闭模式时移除监听器
        screen._removeDragEvents = () => {
            screen.removeEventListener('mousedown', startDragging);
            screen.removeEventListener('mouseleave', stopDragging);
            screen.removeEventListener('mouseup', stopDragging);
            screen.removeEventListener('mousemove', moveDragging);
        };

        // 3. 渲染逻辑 (保持不变)
        Array.from(screen.children).forEach(child => {
            if (!child.classList.contains('dynamic-island')) {
                child.dataset.originalDisplay = window.getComputedStyle(child).display;
                child.style.display = 'none';
            }
        });

        const scrollContainer = document.createElement('div');
        scrollContainer.id = 'pyq-content-layer';
        scrollContainer.style.cssText = `width: 100%; padding-top: 10px; padding-bottom: 30px; box-sizing: border-box; min-height: 101%; pointer-events: none;`; 
        // pointer-events: none 是关键，防止图片拖拽干扰滚动

        if (posts.length === 0) {
            scrollContainer.innerHTML = `<div style="color:#666; text-align:center; margin-top:50px;">暂无朋友圈动态</div>`;
        }

        posts.forEach(post => {
            const postItem = document.createElement('div');
            postItem.style.cssText = `display: flex; padding: 15px 20px; align-items: flex-start; pointer-events: auto;`; // 内部元素恢复点击
            postItem.innerHTML = `
                <img src="${post.Touxiang}" style="width: 45px; height: 45px; border-radius: 6px; margin-right: 12px; flex-shrink: 0; object-fit: cover;">
                <div style="flex: 1; border-bottom: 0.5px solid #333; padding-bottom: 20px;">
                    <div style="color: #576b95; font-weight: 600; font-size: 15px; margin-bottom: 5px;">${post.Name}</div>
                    <div style="font-size: 15px; line-height: 1.5; color: #ffffff; margin-bottom: 12px; white-space: pre-wrap;">${post.Text}</div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; max-width: 250px;">
                        ${post.Images.map(img => `<img src="${img}" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 2px;">`).join('')}
                    </div>
                </div>
            `;
            scrollContainer.appendChild(postItem);
        });

        screen.appendChild(scrollContainer);
        isPureMode = true;


    } else {
        // --- 恢复原始模式 ---
        screen.style.backgroundColor = '';
        screen.style.overflowY = '';
        if (screen._removeDragEvents) screen._removeDragEvents(); // 移除拖拽监听
        
        const contentLayer = document.getElementById('pyq-content-layer');
        if (contentLayer) contentLayer.remove();

        Array.from(screen.children).forEach(child => {
            if (!child.classList.contains('dynamic-island')) {
                child.style.display = child.dataset.originalDisplay || 'block';
            }
        });
        isPureMode = false;
    }
    
}
// ·······································································································
function PYQOpen(customImg = '/img/CaseyCap.png', onClickAction) {
    if(window.innerWidth < 900) return;
    // 1. 注入样式（注意 ID 改为了 fallout-cap-left，位置向左偏移）\
   
    const style = document.createElement('style');
    style.innerHTML = `
        #PYQOpenCSS {
            position: fixed;
            top: 25px;
            /* 原来是 20%, 新组件需要加上宽度(80px)和间距(比如 20px) */
            right: 14%; 
            width: 80px;
            height: 80px;
            cursor: pointer;
            z-index: 9999;
            filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.5));
            user-select: none;
            -webkit-user-drag: none;
            transition: filter 0.2s;
        }

        #PYQOpenCSS:active {
            filter: brightness(0.8) drop-shadow(1px 2px 3px rgba(0,0,0,0.5));
        }

        /* 复用原有的动画逻辑，如果不冲突可以不重写 @keyframes */
        .PYQOpenCSS-flipping-left {
            animation: cap-backflip 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }
    `;
    document.head.appendChild(style);

    // 2. 创建图片元素
    const cap = document.createElement('img');
    cap.id = 'PYQOpenCSS';
    cap.src = customImg;

    // 3. 悬停逻辑
    cap.addEventListener('mouseenter', () => {
        if (!cap.classList.contains('PYQOpenCSS-flipping-left')) {
            cap.classList.add('PYQOpenCSS-flipping-left');
        }
    });

    cap.addEventListener('animationend', () => {
        cap.classList.remove('PYQOpenCSS-flipping-left');
    });

    // 4. 点击逻辑
    cap.addEventListener('click', () => {
        
        if (typeof onClickAction === 'function') {
            onClickAction();
        }
        PYQ();
    });

    // 5. 挂载
    document.body.appendChild(cap);

    
}

// 调用示例：


// ·······································································································

// ·······································································································

PYQOpen();