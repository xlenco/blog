module.exports = {
  write: {
    platform: 'yuque-pwd',
    "yuque-pwd": {
      username: process.env.YUQUE_USERNAME,
      password: process.env.YUQUE_PASSWORD,
      host: '',
      login: process.env.YUQUE_LOGIN,
      repo: process.env.YUQUE_REPO,
      linebreak: false
    }
  },
  deploy: {
    platform: "local",
    local: {
      outputDir: "./source/_posts/yuque/",
      filename: "title",
      format: "matter-markdown",
      catalog: true,
      formatExt: "",
      frontMatter: {
        enable: true,
        exclude: ['urlname','description'] // 文档属性排除 description,urlname 字段
      }
    }
  },
  image: {
    enable: false,
    platform: 'cos',
    cos: {
      secretId: process.env.COS_SECRET_ID,
      secretKey: process.env.COS_SECRET_KEY,
      bucket: process.env.COS_IMAGE_BUCKET,
      region: process.env.COS_IMAGE_REGION,
      host: process.env.COS_HOST,
      prefixKey: 'elog-docs-images',
      secretExt: '', // 可选
    }
  },
}
