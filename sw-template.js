/*
 * @Description: sw
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2022-02-22 11:23:58
 * @LastEditTime: 2022-03-08 12:24:30
 * @LastEditors: 安知鱼
 */


importScripts(`https://jsd.cdn.zzko.cn/npm/workbox-sw/build/workbox-sw.js`);

workbox.core.setCacheNameDetails({
  prefix: "Xlenco",
});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

// 注册成功后要立即缓存的资源列表
// 具体缓存列表在gulpfile.js中配置，见下文
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST, {
  directoryIndex: null,
});

// 清空过期缓存
workbox.precaching.cleanupOutdatedCaches();


workbox.googleAnalytics.initialize();
