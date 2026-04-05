(function() {
    // 1. 异步加载翻译库
    if (!window.translate_script_loaded) {
        const script = document.createElement('script');
        script.src = 'https://cdn.staticfile.net/translate.js/3.2.1/translate.js';
        document.head.appendChild(script);
        window.translate_script_loaded = true;
        
        script.onload = function() {
            initTranslate();
        };
    } else {
        initTranslate();
    }

    function handleExtraElements(lang) {
        const navBox = document.getElementById('quick-nav-box');
        if (navBox) {
            navBox.style.setProperty('display', lang === 'english' ? 'none' : '', 'important');
        }
        const CONSTGameCard = document.getElementById('game-card');
        if (CONSTGameCard) {
            CONSTGameCard.style.setProperty('display', lang === 'english' ? 'none' : '', 'important');
        }
    }

    function injectTranslateBtn() {
        // 如果已经有了，就不重复插
        if (document.getElementById('translate-toggle')) return;

        // 【关键】检查你的 ID 是否正确，可以在控制台看有没有这行 log
        const menu = document.getElementById('nav-right');
        if (!menu) {
            console.log('未找到 id="nav-right" 元素，请检查你的主题 HTML 结构');
            return;
        }

        const btn = document.createElement('a');
        btn.id = 'translate-toggle';
        btn.href = 'javascript:void(0);';
        btn.style.cssText = 'margin-left:15px; cursor:pointer; font-weight:bold;';
        
        const currentLang = (window.translate && translate.language.getCurrent()) || 'chinese_simplified';
        btn.innerHTML = currentLang === 'english' ? '中文' : 'English'; 

        btn.onclick = function() {
            if (translate.language.getCurrent() === 'chinese_simplified') {
                translate.changeLanguage('english');
                this.innerHTML = '中文';
                handleExtraElements('english');
            } else {
                translate.changeLanguage('chinese_simplified');
                this.innerHTML = 'English';
                handleExtraElements('chinese_simplified');
            }
        };
        menu.appendChild(btn);
        console.log('翻译按钮已成功插入到 #nav-right');
    }

    function initTranslate() {
        translate.language.setLocal('chinese_simplified');
        translate.service.use('client.edge');
        // 强制初始为中文
        translate.language.setCurrent('chinese_simplified'); 
        
        injectTranslateBtn();
        handleExtraElements('chinese_simplified');
    }

    // 适配 PJAX：多监听几个可能的事件
    const pjaxEvents = ['pjax:complete', 'pjax:end', 'pjax:success', 'theme:pjax', 'DOMContentLoaded'];
    pjaxEvents.forEach(event => {
        document.addEventListener(event, function() {
            console.log('检测到页面跳转/加载事件:', event);
            // 给一点点延迟，确保 DOM 已经稳了
            setTimeout(injectTranslateBtn, 500);
            
            if (window.translate && translate.language.getCurrent() === 'english') {
                translate.execute();
                handleExtraElements('english');
            }
        });
    });



})();