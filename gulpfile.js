// gulp-tester
var gulp = require('gulp');
// PWA
var terser = require('workbox-build');
gulp.task("generate-service-worker", () => {
  return workbox.injectManifest({
    swSrc: "./sw-template.js",
    swDest: "./public/sw.js",
    globDirectory: "./public",
    globPatterns: [
      // 缓存所有以下类型的文件，极端不推荐
      // "**/*.{html,css,js,json,woff2,xml}"
      // 推荐只缓存404，主页和主要样式和脚本。
      "404.html",
      "index.html",
      "js/main.js",
      "css/index.css",
    ],
    modifyURLPrefix: {
      "": "./",
    },
  });
});
// 压缩js
var terser = require('gulp-terser');
gulp.task('compress', () =>
  gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
    .pipe(terser())
    .pipe(gulp.dest('./public'))
)
//压缩css
var cleanCSS = require('gulp-clean-css');
gulp.task('minify-css', () => {
    return gulp.src(['./public/**/*.css', './public/**/*.*.css'])
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./public'));
});
//压缩html
var htmlmin = require('gulp-html-minifier-terser');
var htmlclean = require('gulp-htmlclean')
gulp.task('minify-html', () => {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true, //清除html注释
            collapseWhitespace: true, //压缩html
            collapseBooleanAttributes: true,
            //省略布尔属性的值，例如：<input checked="true"/> ==> <input />
            removeEmptyAttributes: true,
            //删除所有空格作属性值，例如：<input id="" /> ==> <input />
            removeScriptTypeAttributes: true,
            //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,
            //删除<style>和<link>的 type="text/css"
            minifyJS: true, //压缩页面 JS
            minifyCSS: true, //压缩页面 CSS
            minifyURLs: true  //压缩页面URL
        }))
        .pipe(gulp.dest('./public'))
});
//压缩字体
var fontmin = require('gulp-fontmin');
function minifyFont(text, cb) {
  gulp
    .src('./public/fonts/*.ttf') //原字体所在目录
    .pipe(fontmin({
      text: text
    }))
    .pipe(gulp.dest('./public/fontsdest/')) //压缩后的输出目录
    .on('end', cb);
}

gulp.task('mini-font', (cb) => {
  var buffers = [];
  gulp
    .src(['./public/**/*.html']) //HTML文件所在目录请根据自身情况修改
    .on('data', function(file) {
      buffers.push(file.contents);
    })
    .on('end', function() {
      var text = Buffer.concat(buffers).toString('utf-8');
      minifyFont(text, cb);
    });
});
// 运行gulp命令时依次执行以下任务
gulp.task(
  "default",
  gulp.series("generate-service-worker", gulp.parallel("compress", "minify-css", "minify-html", "mini-font"))
);
