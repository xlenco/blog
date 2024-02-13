// sw.js
self.addEventListener('fetch', function(event) {
    // 检查请求的 URL 是否符合重定向规则
    if (event.request.url.includes('/blog.xlenco.top/post/')) {
      // 解析原始 URL，获取路径部分
      var url = new URL(event.request.url);
      var path = url.pathname;
  
      // 创建新的 URL，用于重定向
      var newUrl = 'https://blog.xlenco.top/p' + path.substring(path.lastIndexOf('/') + 1);
  
      // 返回一个新的响应，包含重定向到新 URL 的 HTTP 头部
      event.respondWith(
        fetch(newUrl).then(function(response) {
          // 如果请求成功，返回响应
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response;
        }).catch(function(error) {
          // 如果请求失败，返回错误页面或者默认的离线页面
          return caches.match('/offline.html');
        })
      );
      return;
    }
  
    // 如果 URL 不符合重定向规则，不做任何处理，让浏览器默认处理请求
  });