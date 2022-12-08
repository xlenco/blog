(async () => {//使用匿名函数确保body已载入
    /*
    QYBlogHelper_Set 存储在LocalStorage中,用于指示sw安装状态
    0 或不存在 未安装
    1 已打断
    2 已安装
    3 已激活,并且已缓存必要的文件(此处未写出,无需理会)
    */
    if ('serviceWorker' in navigator) { //如果支持sw
        if (Number(window.localStorage.getItem('CiraosBlogHelper_Set')) < 1) {
            setTimeout(async () => {
                console.log('检测到您的浏览器没有安装CiraosBlogHelper_Set，开始注册')
                window.stop()
                window.localStorage.setItem('CiraosBlogHelper_Set', 1)
                const replacehtml = await fetch('https://npm.elemecdn.com/chenyfan-blog@1.0.13/public/notice.html')
                document.body.innerHTML = await replacehtml.text()
                $('#info').innerText = '尝试安装CiraosBlogHelper...';
            }, 0);
        }
        const $ = document.querySelector.bind(document);//语法糖
        navigator.serviceWorker.register(`/cw.js?time=${new Date().getTime()}`)//随机数,强制更新
            .then(async () => {
                if (Number(window.localStorage.getItem('CiraosBlogHelper_Set')) < 2) {
                    setTimeout(() => {
                        $('#info').innerText = '安装成功,稍等片刻...';
                    }, 0);
                    setTimeout(() => {
                        window.localStorage.setItem('CiraosBlogHelper_Set', 2)
                        console.log('准备跳转')
                        window.location.reload()//刷新,以载入sw
                    }, 500)//安装后等待500ms使其激活
                }
            })
            .catch(err => console.error(`CiraosBlogHelper_Set:${err}`))
    } else {
        setTimeout(() => {
            $('#info').innerText = '很抱歉,我们已不再支持您的浏览器.';
        }, 0);
    }
})()
