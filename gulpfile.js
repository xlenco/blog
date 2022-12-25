const gulp = require("gulp");
const workbox = require("workbox-build");

gulp.task('generate-service-worker', () => {
    return workbox.injectManifest({
        swSrc: './sw-template.js',
        swDest: './public/sw.js',
        globDirectory: './public',
        globPatterns: [
          // 缓存所有以下类型的文件，极端不推荐
          // "**/*.{html,css,js,json,woff2,xml}"
          // 推荐只缓存404，主页和主要样式和脚本。
          "404.html","index.html","js/main.js","css/index.css"
        ],
        modifyURLPrefix: {
            "": "./"
        }
    });
});
gulp.task("default", gulp.series("generate-service-worker"));
