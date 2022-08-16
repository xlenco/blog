if (!!navigator.serviceWorker) {
    if (localStorage.getItem('cw_installed') !== 'true') {window.stop();}
    navigator.serviceWorker.register('/cw.js?t=' + new Date().getTime()).then(async (registration) => {
        if (localStorage.getItem('cw_installed') !== 'true') {
                setInterval(() => {
                    fetch('/cw-cgi/api?type=config').then(res => res.text()).then(res => {
                        if(res === 'ok') {
                            localStorage.setItem('cw_installed', 'true');
                            console.log('[CW] 安装完成...');
                            location.reload()
                        }
                    }).catch(err => {
                        console.warn('[CW] 安装可能尚未完成，请稍后再试。')
                    })
                }, 200);
        }
    }).catch(err => {
        console.error('[CW] 安装失败,错误信息: ' + err.message);
    })
} else { console.error('[CW] 安装失败,错误信息: 浏览器不支持 service worker'); }
