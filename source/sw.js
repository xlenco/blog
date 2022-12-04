importScripts('https://jsd.onmicrosoft.cn/npm/workbox-sw/build/workbox-sw.js')
const configs = {
    'cdn': [
        {
            'rule': /^https\:\/\/((cdn|fastly|gcore|test1|quantil)\.jsdelivr\.net\/npm|jsd\.cxl2020mc\.top\/npm|unpkg\.com)/,
            'search': '_',
            'replace': [
                'https://jsd.cxl2020mc.top/npm',
                'https://vercel.jsd.cxl2020mc.top/npm',
                'https://jsdcxl2020mc.domain.qystu.cc/npm',
                'https://unpkg.cnortles.top',
                'https://cdn.cnortles.top/npm',
                'https://jsdelivr.pai233.top/npm',
                'https://cdn.jsdelivr.net/npm',
                'https://cdn3.tianli0.top/npm',
                'https://jsd.cky.codes/npm',
                'https://unpkg.com',
                '_',
            ],
        },
        {
            'rule': /^https\:\/\/((cdn|fastly|gcore|test1|quantil)\.jsdelivr\.net\/gh|jsd\.cxl2020mc\.top\/gh)/,
            'search': '_',
            'replace': [
                'https://jsd.cxl2020mc.top/gh',
                'https://vercel.jsd.cxl2020mc.top/gh',
                'https://jsdcxl2020mc.domain.qystu.cc/gh',
                'https://cdn.cnortles.top/gh',
                'https://jsdelivr.pai233.top/gh',
                'https://cdn.jsdelivr.net/gh',
                'https://cdn3.tianli0.top/gh',
                'https://jsd.cky.codes/gh',
                '_',
            ],
        },
    ],
}


