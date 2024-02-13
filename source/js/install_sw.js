if (navigator.serviceWorker) {
    // 注册Service Worker scope表示作用的页面的path
    // register函数返回Promise
    navigator.serviceWorker.register('/sw.js',{scope: '/'}) 
      .then(function (registration) {
        console.log(registration);
      })
      .catch(function (e) {
        console.error(e);
      })
  } else {
    console.log('Service Worker is not supported in this browser.')
  }
