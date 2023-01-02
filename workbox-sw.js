importScripts('https://jsd.onmicrosoft.cn/npm/workbox-sw/build/workbox-sw.js');


if (workbox) {
    console.log('workbox loaded success🎉');
} else {
    console.log('workbox loaded fail😬');
}

self.addEventListener('install', async () => {
    await self.skipWaiting()
})

self.addEventListener('activate', async () => {
    await self.clients.claim()
})

self.__WB_DISABLE_DEV_LOGS = true;

workbox.core.setCacheNameDetails({
    prefix: 'Xlencoの博客',
    suffix: '缓存',
    precache: '离线后备',
    runtime: '运行时',
    googleAnalytics: '谷歌分析'
});

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST, {
    ignoreUrlParametersMatching: [/.*/],
    directoryIndex: null,
});

workbox.precaching.cleanupOutdatedCaches();

const MIN = 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365;



// 导航预加载
workbox.navigationPreload.enable();

// 离线后备
const Offline = new workbox.routing.Route(({ request }) => {
    return request.mode === 'navigate';
}, new workbox.strategies.NetworkOnly({
    plugins: [
        new workbox.precaching.PrecacheFallbackPlugin({
            fallbackURL: '/offline/index.html'
        })
    ]
}));
workbox.routing.registerRoute(Offline);

// 图片/网页
workbox.routing.registerRoute(
    new RegExp('.*.(?:png|jpg|jpeg|svg|gif|webp|ico)'),
    new workbox.strategies.NetworkOnly()
);
// 字体
workbox.routing.registerRoute(
    new RegExp('.*.(?:ttf||woff|woff2)'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "其他字体",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 10,
                maxAgeSeconds: MONTH
            }),
        ]
    })
);
// 静态资源
workbox.routing.registerRoute(
    new RegExp('.*.(?:css|js)'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: '静态资源',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: WEEK
            }),
        ]
    })
);

// 离线谷歌分析
// workbox.googleAnalytics.initialize();

const configs = {
    'cdn': [
        {
            'rule': /^https\:\/\/((cdn|fastly|gcore|test1|quantil)\.jsdelivr\.net\/npm|unpkg\.com)/,
            'search': '_',
            'replace': [
                'https://jsd.cxl2020mc.top/npm',
                'https://vercel.jsd.cxl2020mc.top/npm',
                'https://jsdcxl2020mc.domain.qystu.cc/npm',
                'https://unpkg.cnortles.top',
                'https://cdn.cnortles.top/npm',
                'https://jsdelivr.pai233.top/npm',
                'https://cdn.jsdelivr.net/npm',
                'https://cdn2.tianli0.top/npm',
                'https://cdn3.tianli0.top/npm',
                // qycdn
                'https://cdn.chuqis.com/npm',
                'https://jsd.cky.codes/npm',
                'https://unpkg.com',
                '_',
            ],
        },
        {
            'rule': /^https\:\/\/((cdn|fastly|gcore|test1|quantil)\.jsdelivr\.net\/gh)/,
            'search': '_',
            'replace': [
                'https://jsd.cxl2020mc.top/gh',
                'https://vercel.jsd.cxl2020mc.top/gh',
                'https://jsdcxl2020mc.domain.qystu.cc/gh',
                'https://cdn.cnortles.top/gh',
                'https://jsdelivr.pai233.top/gh',
                'https://cdn.jsdelivr.net/gh',
                'https://cdn2.tianli0.top/gh',
                'https://cdn3.tianli0.top/gh',
                // qycdn
                'https://cdn.chuqis.com/gh',
                'https://jsd.cky.codes/gh',
                '_',
            ],
        },
    ],
}


importScripts('/js/sw-dev.js')
