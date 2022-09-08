if (!!navigator.serviceWorker) {
    navigator.serviceWorker.register('/cw.js?t=' + new Date().getTime()).then(async (registration) => {
        if (localStorage.getItem('cw_installed') !== 'true') {
            try{
                btf.snackbarShow('正在安装cw,安装完成后将会刷新');
            }catch(e){
                //打印错误信息
                console.error(e);
            }
            const conf = () => {
                console.log('[CW] 安装成功,配置中...');
                fetch('/cw-cgi/api?type=config')
                    .then(res => res.text())
                    .then(text => {
                        if (text === 'ok') {
                            console.log('[CW] 安装成功,配置成功,开始重载页面...');
                            localStorage.setItem('cw_installed', 'true');
                            //如果你不希望重载页面，请移除下面七行
                            //重载标识 - 开始
                            fetch(window.location.href).then(res => res.text()).then(text => {
                                document.open()
                                document.write(text);
                                document.close();
                            });
                            //重载标识 - 结束
                        } else {
                            console.warn('[CW] 安装成功，配置失败，休眠200ms...');
                            setTimeout(() => {
                                conf()
                            }, 200);
                        }
                    }).catch(err => {
                        console.log('[CW] 安装成功,配置错误,退出...');
                    });
            }
            setTimeout(() => {
                conf()
            }, 50);
        }
    }).catch(err => {
        console.error('[CW] 安装失败,错误信息: ' + err.message);
    });
} else { console.error('[CW] 安装失败,错误信息: 浏览器不支持service worker'); }
