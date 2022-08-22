---
abbrlink: 933a
categories:
- JavaScript
cover: https://ik.imagekit.io/nicexl/Wallpaper/0041b89232893f083a57f1_O-g_F8uUk.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1657163223097
date: '2022-07-28 14:33:58'
tags:
- 笔记
title: ClientWorker Course
updated: 2022-08-19 18:23:10
---### ClientWorker

### 地址

[ClientWorker](https://clientworker.js.org)

## 快速上手

### 引入 ClientWorker

在 `{blogroot}/themes/butterfly/source/` 新建 `cw.js`

```
importScripts('https://cdn.jsdelivr.net/npm/clientworker')
```

在 `{blogroot}/source/` 新建 `config.yaml`写入以下内容

```
name: ClientWorker 
catch_rules:
  - rule: _
    transform_rules:
      - search: \#.+
        searchin: url
        replace: ''
      - search: _ 
        action: fetch
        fetch:
          engine: fetch 
      - search: (^4|^5) 
        searchin: status 
        action: return
        return:
          body: The GateWay is down!This Page is provided by ClientWorker!
          status: 503
```

##### 然后在`{blogroot}/source/`新建`ClientWorker.js`并写入以下配置

```
<script>
if (!!navigator.serviceWorker) {
    navigator.serviceWorker.register('/cw.js?t=' + new Date().getTime()).then(async (registration) => {
        if (localStorage.getItem('cw_installed') !== 'true') {
            const conf = () => {
                console.log('[CW] Installing Success,Configuring...');
                fetch('/cw-cgi/api?type=config')
                    .then(res => res.text())
                    .then(text => {
                        if (text === 'ok') {
                            console.log('[CW] Installing Success,Configuring Success,Starting...');
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
                            console.warn('[CW] Installing Success,Configuring Failed,Sleeping 200ms...');
                            setTimeout(() => {
                                conf()
                            }, 200);
                        }
                    }).catch(err => {
                        console.log('[CW] Installing Success,Configuring Error,Exiting...');
                    });
            }
            setTimeout(() => {
                conf()
            }, 50);
        }
    }).catch(err => {
        console.error('[CW] Installing Failed,Error: ' + err.message);
    });
} else { console.error('[CW] Installing Failed,Error: Browser not support service worker'); }
</script>
```

#### 编辑 {blogroot}/_config.butterfly.yml文件

```
inject:
  head:
+    - <script src="/js/ClientWorker.js"></script>
```

#### 编辑_config.yml文件

```
skip_render:
+  - config.yaml
```
