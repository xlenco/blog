'use strict';
const { filter } = hexo.extend;

const js = hexo.extend.helper.get('js').bind(hexo);
hexo.extend.injector.register('head_begin', () => {return js('/js/clientworker.js');});

