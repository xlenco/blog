/ *随机文章 /

hexo.extend.generator.register('text', function (locals) {
  const config = hexo.config.text || {}
  return {
    path: config.path || 'text/index.html',
    data: `<html><head><script>(    function(){        fetch("https://fcircle.xlenco.eu.org/randomfriend").then(res => res.json()).then(res => {            randomfriend_a = document.getElementById("randomfriend_a")            randomfriend_a.harf = res["link"]        })    })()`<html><head><script>
  }
})
