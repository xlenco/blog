// gulp-tester
var gulp = require('gulp');
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
// 压缩 public 目录内 html
gulp.task("minify-html", () => {
  return gulp
    .src("./public/**/*.html")
    .pipe(htmlclean())
    .pipe(
      htmlmin({
        removeComments: true, //清除 HTML 註释
        collapseWhitespace: true, //压缩 HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除 <script> 的 type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除 <style> 和 <link> 的 type="text/css"
        minifyJS: true, //压缩页面 JS
        minifyCSS: true, //压缩页面 CSS
        minifyURLs: true,
      })
    )
    .pipe(gulp.dest("./public"));
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
gulp.task('default', gulp.parallel(
  'compress','minify-css','minify-html','mini-font'
))
