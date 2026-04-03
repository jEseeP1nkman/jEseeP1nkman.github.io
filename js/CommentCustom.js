const CommentCustom = new MutationObserver(() => {
const Nickname = document.querySelector('label[for="wl-nick"]');
const mail = document.querySelector('label[for="wl-mail"]');
const link = document.querySelector('label[for="wl-link"]');
const power = document.querySelector('.wl-power');
const WlsortCustom = document.querySelectorAll('.wl-sort li');
const editWords = document.querySelector('.wl-text-number');
const wlbtnCustom = document.querySelector('.wl-btn');
const submitBtn = document.querySelector('.wl-btn.primary');



if (Nickname,mail,link,power,WlsortCustom.length >= 3,editWords,wlbtnCustom,submitBtn) {
    Nickname.innerText = "昵称：";
    mail.innerText = "邮箱：";
    link.innerText = "网站：";
    power.remove(); 
    WlsortCustom[0].innerText = "最新";
    WlsortCustom[1].innerText = "最旧";
    WlsortCustom[2].innerText = "最热";
    editWords.innerHTML = editWords.innerHTML.replace('Words', '字');
    wlbtnCustom.innerText="登录";
    submitBtn.innerText="爆论";



    CommentCustom.disconnect(); // 改完就停止监听
  };

});

CommentCustom.observe(document.body, {
  childList: true,
  subtree: true
}


);

// ```````````````````````````````````````````````````````````````````````````
