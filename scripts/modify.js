'use strict';
const { filter } = hexo.extend;

const js = hexo.extend.helper.get('js').bind(hexo);
hexo.extend.injector.register('head_begin', () => {return js('/js/clientworker.js');});
const css = hexo.extend.helper.get('css').bind(hexo);
hexo.extend.injector.register('head_begin', () => {return css('/css/_custom/custom.css');});
