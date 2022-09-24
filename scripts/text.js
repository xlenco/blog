/ *随机文章 /

hexo.extend.generator.register('text', function (locals) {
  const config = hexo.config.text || {}
  const posts = []
  for (const post of locals.posts.data) {
    if (post.random !== false) posts.push(post.path)
  }
  return {
    path: config.path || 'text/index.html',
    function(){
        fetch("https://fcircle.xlenco.eu.org/randomfriend").then(res => res.json()).then(res => {
            randomfriend_a = document.getElementById("randomfriend_a")
            randomfriend_a.harf = res["link"]
  }
})
