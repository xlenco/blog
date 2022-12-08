'use strict';
const { filter } = hexo.extend;

const js = hexo.extend.helper.get('js').bind(hexo);
hexo.extend.injector.register('head_begin', () => {return js('/js/clientworker.js');});
hexo.extend.injector.register('head_begin', () => {return js('https://npm.elemecdn.com/jquery@3.2.1/dist/jquery.min.js');});
