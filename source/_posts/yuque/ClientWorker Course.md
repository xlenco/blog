---
abbrlink: 933a
categories:
  - 笔记

cover: https://xlenco.onmicrosoft.cn/Wallpaper/F8uUk.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1670765271228
date: "2022-07-28 14:33:58"
tags:
  - JavaScript

title: ClientWorker Course
updated: 2022-09-19 18:23:10
---

{% hideToggle 更新日志%}
{% timeline blue%}

<!-- timeline 2022-9-19  -->

新增 cw 安装方法，yml 语法

<!-- endtimeline -->

{% endtimeline %}
{% endhideToggle %}

### ClientWorker

### 地址

{% link ClientWorker, https://clientworker.js.org,https://nsso.eu.org/img/d28b3ba4-df07-4d22-9bfb-8591ea937c22.png %}

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

## 注册 cw

在{blogroot}/\_config.butterfly.yml 文件中写入以下内容

```
inject:
  head:
    - |
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
                                    console.log(''[CW] Installing Success,Configuring Error,Exiting...');
                                });
                        }
                        setTimeout(() => {
                            conf()
                        }, 50);
                    }
                }).catch(err => {
                    console.error('[CW] Installing Failed,Error: ' + err.message);
                });
            } else { console.error('[CW] Installing Failed,Error: Browser not support service worker');}
        </script>
```

{% note danger simple %}注意缩径尤为重要{% endnote %}

{% hideToggle 老方法%}

##### 在`{blogroot}/source/`新建`ClientWorker.js`并写入以下配置

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

#### 编辑 {blogroot}/\_config.butterfly.yml 文件

```
inject:
  head:
+    - <script src="/js/ClientWorker.js"></script>
```

{% endhideToggle %}

#### 编辑\_config.yml 文件

```
skip_render:
+  - config.yaml
```
