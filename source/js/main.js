document.addEventListener('DOMContentLoaded', function () {
  let blogNameWidth, menusWidth, searchWidth, $nav
  let mobileSidebarOpen = false

  const adjustMenu = (init) => {
    if (init) {
      blogNameWidth = document.getElementById('site-name').offsetWidth
      const $menusEle = document.querySelectorAll('#menus .menus_item')
      menusWidth = 0
      $menusEle.length && $menusEle.forEach(i => { menusWidth += i.offsetWidth })
      const $searchEle = document.querySelector('#search-button')
      searchWidth = $searchEle ? $searchEle.offsetWidth : 0
      $nav = document.getElementById('nav')
    }

    let hideMenuIndex = ''
    if (window.innerWidth < 768) hideMenuIndex = true
    else hideMenuIndex = blogNameWidth + menusWidth + searchWidth > $nav.offsetWidth - 120

    if (hideMenuIndex) {
      $nav.classList.add('hide-menu')
    } else {
      $nav.classList.remove('hide-menu')
    }
  }

  // 初始化header
  const initAdjust = () => {
    adjustMenu(true)
    $nav.classList.add('show')
  }

  // sidebar menus
  const sidebarFn = {
    open: () => {
      btf.sidebarPaddingR()
      document.body.style.overflow = 'hidden'
      btf.animateIn(document.getElementById('menu-mask'), 'to_show 0.5s')
      document.getElementById('sidebar-menus').classList.add('open')
      mobileSidebarOpen = true
    },
    close: () => {
      const $body = document.body
      $body.style.overflow = ''
      $body.style.paddingRight = ''
      btf.animateOut(document.getElementById('menu-mask'), 'to_hide 0.5s')
      document.getElementById('sidebar-menus').classList.remove('open')
      mobileSidebarOpen = false
    }
  }

  /**
   * 首頁top_img底下的箭頭
   */
  const scrollDownInIndex = () => {
    const $scrollDownEle = document.getElementById('scroll-down')
    $scrollDownEle && $scrollDownEle.addEventListener('click', function () {
      btf.scrollToDest(document.getElementById('content-inner').offsetTop, 300)
    })
  }

  /**
   * 代碼
   * 只適用於Hexo默認的代碼渲染
   */
  const addHighlightTool = function () {
    const highLight = GLOBAL_CONFIG.highlight
    if (!highLight) return

    const isHighlightCopy = highLight.highlightCopy
    const isHighlightLang = highLight.highlightLang
    const isHighlightShrink = GLOBAL_CONFIG_SITE.isHighlightShrink
    const highlightHeightLimit = highLight.highlightHeightLimit
    const isShowTool = isHighlightCopy || isHighlightLang || isHighlightShrink !== undefined
    const $figureHighlight = highLight.plugin === 'highlighjs' ? document.querySelectorAll('figure.highlight') : document.querySelectorAll('pre[class*="language-"]')

    if (!((isShowTool || highlightHeightLimit) && $figureHighlight.length)) return

    const isPrismjs = highLight.plugin === 'prismjs'

    let highlightShrinkEle = ''
    let highlightCopyEle = ''
    const highlightShrinkClass = isHighlightShrink === true ? 'closed' : ''

    if (isHighlightShrink !== undefined) {
      highlightShrinkEle = `<i class="fas fa-angle-down expand ${highlightShrinkClass}"></i>`
    }

    if (isHighlightCopy) {
      highlightCopyEle = '<div class="copy-notice"></div><i class="fas fa-paste copy-button"></i>'
    }

    const copy = (text, ctx) => {
      if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        document.execCommand('copy')
        if (GLOBAL_CONFIG.Snackbar !== undefined) {
          btf.snackbarShow(GLOBAL_CONFIG.copy.success)
        } else {
          const prevEle = ctx.previousElementSibling
          prevEle.innerText = GLOBAL_CONFIG.copy.success
          prevEle.style.opacity = 1
          setTimeout(() => { prevEle.style.opacity = 0 }, 700)
        }
      } else {
        if (GLOBAL_CONFIG.Snackbar !== undefined) {
          btf.snackbarShow(GLOBAL_CONFIG.copy.noSupport)
        } else {
          ctx.previousElementSibling.innerText = GLOBAL_CONFIG.copy.noSupport
        }
      }
    }

    // click events
    const highlightCopyFn = (ele) => {
      const $buttonParent = ele.parentNode
      $buttonParent.classList.add('copy-true')
      const selection = window.getSelection()
      const range = document.createRange()
      if (isPrismjs) range.selectNodeContents($buttonParent.querySelectorAll('pre code')[0])
      else range.selectNodeContents($buttonParent.querySelectorAll('table .code pre')[0])
      selection.removeAllRanges()
      selection.addRange(range)
      const text = selection.toString()
      copy(text, ele.lastChild)
      selection.removeAllRanges()
      $buttonParent.classList.remove('copy-true')
    }

    const highlightShrinkFn = (ele) => {
      const $nextEle = [...ele.parentNode.children].slice(1)
      ele.firstChild.classList.toggle('closed')
      if (btf.isHidden($nextEle[$nextEle.length - 1])) {
        $nextEle.forEach(e => { e.style.display = 'block' })
      } else {
        $nextEle.forEach(e => { e.style.display = 'none' })
      }
    }

    const highlightToolsFn = function (e) {
      const $target = e.target.classList
      if ($target.contains('expand')) highlightShrinkFn(this)
      else if ($target.contains('copy-button')) highlightCopyFn(this)
    }

    const expandCode = function () {
      this.classList.toggle('expand-done')
    }

    function createEle (lang, item, service) {
      const fragment = document.createDocumentFragment()

      if (isShowTool) {
        const hlTools = document.createElement('div')
        hlTools.className = `highlight-tools ${highlightShrinkClass}`
        hlTools.innerHTML = highlightShrinkEle + lang + highlightCopyEle
        hlTools.addEventListener('click', highlightToolsFn)
        fragment.appendChild(hlTools)
      }

      if (highlightHeightLimit && item.offsetHeight > highlightHeightLimit + 30) {
        const ele = document.createElement('div')
        ele.className = 'code-expand-btn'
        ele.innerHTML = '<i class="fas fa-angle-double-down"></i>'
        ele.addEventListener('click', expandCode)
        fragment.appendChild(ele)
      }

      if (service === 'hl') {
        item.insertBefore(fragment, item.firstChild)
      } else {
        item.parentNode.insertBefore(fragment, item)
      }
    }

    if (isHighlightLang) {
      if (isPrismjs) {
        $figureHighlight.forEach(function (item) {
          const langName = item.getAttribute('data-language') ? item.getAttribute('data-language') : 'Code'
          const highlightLangEle = `<div class="code-lang">${langName}</div>`
          btf.wrap(item, 'figure', { class: 'highlight' })
          createEle(highlightLangEle, item)
        })
      } else {
        $figureHighlight.forEach(function (item) {
          let langName = item.getAttribute('class').split(' ')[1]
          if (langName === 'plain' || langName === undefined) langName = 'Code'
          const highlightLangEle = `<div class="code-lang">${langName}</div>`
          createEle(highlightLangEle, item, 'hl')
        })
      }
    } else {
      if (isPrismjs) {
        $figureHighlight.forEach(function (item) {
          btf.wrap(item, 'figure', { class: 'highlight' })
          createEle('', item)
        })
      } else {
        $figureHighlight.forEach(function (item) {
          createEle('', item, 'hl')
        })
      }
    }
  }

  /**
   * PhotoFigcaption
   */
  function addPhotoFigcaption () {
    document.querySelectorAll('#article-container img').forEach(function (item) {
      const parentEle = item.parentNode
      const altValue = item.title || item.alt
      if (altValue && !parentEle.parentNode.classList.contains('justified-gallery')) {
        const ele = document.createElement('div')
        ele.className = 'img-alt is-center'
        ele.textContent = altValue
        parentEle.insertBefore(ele, item.nextSibling)
      }
    })
  }

  /**
   * Lightbox
   */
  const runLightbox = () => {
    btf.loadLightbox(document.querySelectorAll('#article-container img:not(.no-lightbox)'))
  }

  /**
   * justified-gallery 圖庫排版
   */
  const runJustifiedGallery = function (ele) {
    ele.forEach(item => {
      const $imgList = item.querySelectorAll('img')

      $imgList.forEach(i => {
        const dataLazySrc = i.getAttribute('data-lazy-src')
        if (dataLazySrc) i.src = dataLazySrc
        btf.wrap(i, 'div', { class: 'fj-gallery-item' })
      })
    })

    if (window.fjGallery) {
      setTimeout(() => { btf.initJustifiedGallery(ele) }, 100)
      return
    }

    const newEle = document.createElement('link')
    newEle.rel = 'stylesheet'
    newEle.href = GLOBAL_CONFIG.source.justifiedGallery.css
    document.body.appendChild(newEle)
    getScript(`${GLOBAL_CONFIG.source.justifiedGallery.js}`).then(() => { btf.initJustifiedGallery(ele) })
  }

  /**
   * 滾動處理
   */
  const scrollFn = function () {
    const $rightside = document.getElementById('rightside')
    const innerHeight = window.innerHeight + 56

    // 當滾動條小于 56 的時候
    if (document.body.scrollHeight <= innerHeight) {
      $rightside.style.cssText = 'opacity: 1; transform: translateX(-58px)'
      return
    }

    // find the scroll direction
    function scrollDirection (currentTop) {
      const result = currentTop > initTop // true is down & false is up
      initTop = currentTop
      return result
    }

    let initTop = 0
    let isChatShow = true
    const $header = document.getElementById('page-header')
    const isChatBtnHide = typeof chatBtnHide === 'function'
    const isChatBtnShow = typeof chatBtnShow === 'function'

    window.scrollCollect = () => {
      return btf.throttle(function (e) {
        const currentTop = window.scrollY || document.documentElement.scrollTop
        const isDown = scrollDirection(currentTop)
        if (currentTop > 56) {
          if (isDown) {
            if ($header.classList.contains('nav-visible')) $header.classList.remove('nav-visible')
            if (isChatBtnShow && isChatShow === true) {
              chatBtnHide()
              isChatShow = false
            }
          } else {
            if (!$header.classList.contains('nav-visible')) $header.classList.add('nav-visible')
            if (isChatBtnHide && isChatShow === false) {
              chatBtnShow()
              isChatShow = true
            }
          }
          $header.classList.add('nav-fixed')
          if (window.getComputedStyle($rightside).getPropertyValue('opacity') === '0') {
            $rightside.style.cssText = 'opacity: 0.8; transform: translateX(-58px)'
          }
        } else {
          if (currentTop === 0) {
            $header.classList.remove('nav-fixed', 'nav-visible')
          }
          $rightside.style.cssText = "opacity: ''; transform: ''"
        }

        if (document.body.scrollHeight <= innerHeight) {
          $rightside.style.cssText = 'opacity: 0.8; transform: translateX(-58px)'
        }
      }, 200)()
    }

    window.addEventListener('scroll', scrollCollect)
  }

  /**
  * toc,anchor
  */
  const scrollFnToDo = function () {
    const isToc = GLOBAL_CONFIG_SITE.isToc
    const isAnchor = GLOBAL_CONFIG.isAnchor
    const $article = document.getElementById('article-container')

    if (!($article && (isToc || isAnchor))) return

    let $tocLink, $cardToc, scrollPercent, autoScrollToc, isExpand

    if (isToc) {
      const $cardTocLayout = document.getElementById('card-toc')
      $cardToc = $cardTocLayout.getElementsByClassName('toc-content')[0]
      $tocLink = $cardToc.querySelectorAll('.toc-link')
      const $tocPercentage = $cardTocLayout.querySelector('.toc-percentage')
      isExpand = $cardToc.classList.contains('is-expand')

      scrollPercent = currentTop => {
        const docHeight = $article.clientHeight
        const winHeight = document.documentElement.clientHeight
        const headerHeight = $article.offsetTop
        const contentMath = (docHeight > winHeight) ? (docHeight - winHeight) : (document.documentElement.scrollHeight - winHeight)
        const scrollPercent = (currentTop - headerHeight) / (contentMath)
        const scrollPercentRounded = Math.round(scrollPercent * 100)
        const percentage = (scrollPercentRounded > 100) ? 100 : (scrollPercentRounded <= 0) ? 0 : scrollPercentRounded
        $tocPercentage.textContent = percentage
      }

      window.mobileToc = {
        open: () => {
          $cardTocLayout.style.cssText = 'animation: toc-open .3s; opacity: 1; right: 55px'
        },

        close: () => {
          $cardTocLayout.style.animation = 'toc-close .2s'
          setTimeout(() => {
            $cardTocLayout.style.cssText = "opacity:''; animation: ''; right: ''"
          }, 100)
        }
      }

      // toc元素點擊
      $cardToc.addEventListener('click', e => {
        e.preventDefault()
        const target = e.target.classList
        if (target.contains('toc-content')) return
        const $target = target.contains('toc-link')
          ? e.target
          : e.target.parentElement
        btf.scrollToDest(btf.getEleTop(document.getElementById(decodeURI($target.getAttribute('href')).replace('#', ''))), 300)
        if (window.innerWidth < 900) {
          window.mobileToc.close()
        }
      })

      autoScrollToc = item => {
        const activePosition = item.getBoundingClientRect().top
        const sidebarScrollTop = $cardToc.scrollTop
        if (activePosition > (document.documentElement.clientHeight - 100)) {
          $cardToc.scrollTop = sidebarScrollTop + 150
        }
        if (activePosition < 100) {
          $cardToc.scrollTop = sidebarScrollTop - 150
        }
      }
    }

    // find head position & add active class
    const list = $article.querySelectorAll('h1,h2,h3,h4,h5,h6')
    let detectItem = ''
    const findHeadPosition = function (top) {
      if (top === 0) {
        return false
      }

      let currentId = ''
      let currentIndex = ''

      list.forEach(function (ele, index) {
        if (top > btf.getEleTop(ele) - 80) {
          const id = ele.id
          currentId = id ? '#' + encodeURI(id) : ''
          currentIndex = index
        }
      })

      if (detectItem === currentIndex) return

      if (isAnchor) btf.updateAnchor(currentId)

      detectItem = currentIndex

      if (isToc) {
        $cardToc.querySelectorAll('.active').forEach(i => { i.classList.remove('active') })

        if (currentId === '') {
          return
        }

        const currentActive = $tocLink[currentIndex]
        currentActive.classList.add('active')

        setTimeout(() => {
          autoScrollToc(currentActive)
        }, 0)

        if (isExpand) return
        let parent = currentActive.parentNode

        for (; !parent.matches('.toc'); parent = parent.parentNode) {
          if (parent.matches('li')) parent.classList.add('active')
        }
      }
    }

    // main of scroll
    window.tocScrollFn = function () {
      return btf.throttle(function () {
        const currentTop = window.scrollY || document.documentElement.scrollTop
        isToc && scrollPercent(currentTop)
        findHeadPosition(currentTop)
      }, 100)()
    }
    window.addEventListener('scroll', tocScrollFn)
  }

  /**
   * Rightside
   */
  const rightSideFn = {
    switchReadMode: () => { // read-mode
      const $body = document.body
      $body.classList.add('read-mode')
      const newEle = document.createElement('button')
      newEle.type = 'button'
      newEle.className = 'fas fa-sign-out-alt exit-readmode'
      $body.appendChild(newEle)

      function clickFn () {
        $body.classList.remove('read-mode')
        newEle.remove()
        newEle.removeEventListener('click', clickFn)
      }

      newEle.addEventListener('click', clickFn)
    },
    switchDarkMode: () => { // Switch Between Light And Dark Mode
      const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
      if (nowMode === 'light') {
        activateDarkMode()
        saveToLocal.set('theme', 'dark', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
      } else {
        activateLightMode()
        saveToLocal.set('theme', 'light', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
      }
      // handle some cases
      typeof utterancesTheme === 'function' && utterancesTheme()
      typeof changeGiscusTheme === 'function' && changeGiscusTheme()
      typeof FB === 'object' && window.loadFBComment()
      window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
      typeof runMermaid === 'function' && window.runMermaid()
    },
    showOrHideBtn: (e) => { // rightside 點擊設置 按鈕 展開
      const rightsideHideClassList = document.getElementById('rightside-config-hide').classList
      rightsideHideClassList.toggle('show')
      if (e.classList.contains('show')) {
        rightsideHideClassList.add('status')
        setTimeout(() => {
          rightsideHideClassList.remove('status')
        }, 300)
      }
      e.classList.toggle('show')
    },
    scrollToTop: () => { // Back to top
      btf.scrollToDest(0, 500)
    },
    hideAsideBtn: () => { // Hide aside
      const $htmlDom = document.documentElement.classList
      $htmlDom.contains('hide-aside')
        ? saveToLocal.set('aside-status', 'show', 2)
        : saveToLocal.set('aside-status', 'hide', 2)
      $htmlDom.toggle('hide-aside')
    },

    runMobileToc: () => {
      if (window.getComputedStyle(document.getElementById('card-toc')).getPropertyValue('opacity') === '0') window.mobileToc.open()
      else window.mobileToc.close()
    }
  }

  document.getElementById('rightside').addEventListener('click', function (e) {
    const $target = e.target.id ? e.target : e.target.parentNode
    switch ($target.id) {
      case 'go-up':
        rightSideFn.scrollToTop()
        break
      case 'rightside_config':
        rightSideFn.showOrHideBtn($target)
        break
      case 'mobile-toc-button':
        rightSideFn.runMobileToc()
        break
      case 'readmode':
        rightSideFn.switchReadMode()
        break
      case 'darkmode':
        rightSideFn.switchDarkMode()
        break
      case 'hide-aside-btn':
        rightSideFn.hideAsideBtn()
        break
      default:
        break
    }
  })

  /**
   * menu
   * 側邊欄sub-menu 展開/收縮
   */
  const clickFnOfSubMenu = () => {
    document.querySelectorAll('#sidebar-menus .site-page.group').forEach(function (item) {
      item.addEventListener('click', function () {
        this.classList.toggle('hide')
      })
    })
  }

  /**
   * 複製時加上版權信息
   */
  const addCopyright = () => {
    const copyright = GLOBAL_CONFIG.copyright
    document.body.oncopy = (e) => {
      e.preventDefault()
      let textFont; const copyFont = window.getSelection(0).toString()
      if (copyFont.length > copyright.limitCount) {
        textFont = copyFont + '\n' + '\n' + '\n' +
        copyright.languages.author + '\n' +
        copyright.languages.link + window.location.href + '\n' +
        copyright.languages.source + '\n' +
        copyright.languages.info
      } else {
        textFont = copyFont
      }
      if (e.clipboardData) {
        return e.clipboardData.setData('text', textFont)
      } else {
        return window.clipboardData.setData('text', textFont)
      }
    }
  }

  /**
   * 網頁運行時間
   */
  const addRuntime = () => {
    const $runtimeCount = document.getElementById('runtimeshow')
    if ($runtimeCount) {
      const publishDate = $runtimeCount.getAttribute('data-publishDate')
      $runtimeCount.innerText = btf.diffDate(publishDate) + ' ' + GLOBAL_CONFIG.runtime
    }
  }

  /**
   * 最後一次更新時間
   */
  const addLastPushDate = () => {
    const $lastPushDateItem = document.getElementById('last-push-date')
    if ($lastPushDateItem) {
      const lastPushDate = $lastPushDateItem.getAttribute('data-lastPushDate')
      $lastPushDateItem.innerText = btf.diffDate(lastPushDate, true)
    }
  }

  /**
   * table overflow
   */
  const addTableWrap = () => {
    const $table = document.querySelectorAll('#article-container :not(.highlight) > table, #article-container > table')
    if ($table.length) {
      $table.forEach(item => {
        btf.wrap(item, 'div', { class: 'table-wrap' })
      })
    }
  }

  /**
   * tag-hide
   */
  const clickFnOfTagHide = function () {
    const $hideInline = document.querySelectorAll('#article-container .hide-button')
    if ($hideInline.length) {
      $hideInline.forEach(function (item) {
        item.addEventListener('click', function (e) {
          const $this = this
          $this.classList.add('open')
          const $fjGallery = $this.nextElementSibling.querySelectorAll('.fj-gallery')
          $fjGallery.length && btf.initJustifiedGallery($fjGallery)
        })
      })
    }
  }

  const tabsFn = {
    clickFnOfTabs: function () {
      document.querySelectorAll('#article-container .tab > button').forEach(function (item) {
        item.addEventListener('click', function (e) {
          const $this = this
          const $tabItem = $this.parentNode

          if (!$tabItem.classList.contains('active')) {
            const $tabContent = $tabItem.parentNode.nextElementSibling
            const $siblings = btf.siblings($tabItem, '.active')[0]
            $siblings && $siblings.classList.remove('active')
            $tabItem.classList.add('active')
            const tabId = $this.getAttribute('data-href').replace('#', '')
            const childList = [...$tabContent.children]
            childList.forEach(item => {
              if (item.id === tabId) item.classList.add('active')
              else item.classList.remove('active')
            })
            const $isTabJustifiedGallery = $tabContent.querySelectorAll(`#${tabId} .fj-gallery`)
            if ($isTabJustifiedGallery.length > 0) {
              btf.initJustifiedGallery($isTabJustifiedGallery)
            }
          }
        })
      })
    },
    backToTop: () => {
      document.querySelectorAll('#article-container .tabs .tab-to-top').forEach(function (item) {
        item.addEventListener('click', function () {
          btf.scrollToDest(btf.getEleTop(btf.getParents(this, '.tabs')), 300)
        })
      })
    }
  }

  const toggleCardCategory = function () {
    const $cardCategory = document.querySelectorAll('#aside-cat-list .card-category-list-item.parent i')
    if ($cardCategory.length) {
      $cardCategory.forEach(function (item) {
        item.addEventListener('click', function (e) {
          e.preventDefault()
          const $this = this
          $this.classList.toggle('expand')
          const $parentEle = $this.parentNode.nextElementSibling
          if (btf.isHidden($parentEle)) {
            $parentEle.style.display = 'block'
          } else {
            $parentEle.style.display = 'none'
          }
        })
      })
    }
  }

  const switchComments = function () {
    let switchDone = false
    const $switchBtn = document.querySelector('#comment-switch > .switch-btn')
    $switchBtn && $switchBtn.addEventListener('click', function () {
      this.classList.toggle('move')
      document.querySelectorAll('#post-comment > .comment-wrap > div').forEach(function (item) {
        if (btf.isHidden(item)) {
          item.style.cssText = 'display: block;animation: tabshow .5s'
        } else {
          item.style.cssText = "display: none;animation: ''"
        }
      })

      if (!switchDone && typeof loadOtherComment === 'function') {
        switchDone = true
        loadOtherComment()
      }
    })
  }

  const addPostOutdateNotice = function () {
    const data = GLOBAL_CONFIG.noticeOutdate
    const diffDay = btf.diffDate(GLOBAL_CONFIG_SITE.postUpdate)
    if (diffDay >= data.limitDay) {
      const ele = document.createElement('div')
      ele.className = 'post-outdate-notice'
      ele.textContent = data.messagePrev + ' ' + diffDay + ' ' + data.messageNext
      const $targetEle = document.getElementById('article-container')
      if (data.position === 'top') {
        $targetEle.insertBefore(ele, $targetEle.firstChild)
      } else {
        $targetEle.appendChild(ele)
      }
    }
  }

  const lazyloadImg = () => {
    window.lazyLoadInstance = new LazyLoad({
      elements_selector: 'img',
      threshold: 0,
      data_src: 'lazy-src'
    })
  }

  const relativeDate = function (selector) {
    selector.forEach(item => {
      const $this = item
      const timeVal = $this.getAttribute('datetime')
      $this.innerText = btf.diffDate(timeVal, true)
      $this.style.display = 'inline'
    })
  }

  const unRefreshFn = function () {
    window.addEventListener('resize', () => {
      adjustMenu(false)
      btf.isHidden(document.getElementById('toggle-menu')) && mobileSidebarOpen && sidebarFn.close()
    })

    document.getElementById('menu-mask').addEventListener('click', e => { sidebarFn.close() })

    clickFnOfSubMenu()
    GLOBAL_CONFIG.islazyload && lazyloadImg()
    GLOBAL_CONFIG.copyright !== undefined && addCopyright()
  }

  window.refreshFn = function () {
    initAdjust()

    if (GLOBAL_CONFIG_SITE.isPost) {
      GLOBAL_CONFIG.noticeOutdate !== undefined && addPostOutdateNotice()
      GLOBAL_CONFIG.relativeDate.post && relativeDate(document.querySelectorAll('#post-meta time'))
    } else {
      GLOBAL_CONFIG.relativeDate.homepage && relativeDate(document.querySelectorAll('#recent-posts time'))
      GLOBAL_CONFIG.runtime && addRuntime()
      addLastPushDate()
      toggleCardCategory()
    }

    scrollFnToDo()
    GLOBAL_CONFIG_SITE.isHome && scrollDownInIndex()
    addHighlightTool()
    GLOBAL_CONFIG.isPhotoFigcaption && addPhotoFigcaption()
    scrollFn()

    const $jgEle = document.querySelectorAll('#article-container .fj-gallery')
    $jgEle.length && runJustifiedGallery($jgEle)

    runLightbox()
    addTableWrap()
    clickFnOfTagHide()
    tabsFn.clickFnOfTabs()
    tabsFn.backToTop()
    switchComments()
    document.getElementById('toggle-menu').addEventListener('click', () => { sidebarFn.open() })
  }

  refreshFn()
  unRefreshFn()
})

// Load Awesome
!function(w,C,S){"use strict";!function o(a,r,s){function l(n,e){if(!r[n]){if(!a[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(i)return i(n,!0);e=new Error("Cannot find module '"+n+"'");throw e.code="MODULE_NOT_FOUND",e}t=r[n]={exports:{}};a[n][0].call(t.exports,function(e){var t=a[n][1][e];return l(t||e)},t,t.exports,o,a,r,s)}return r[n].exports}for(var i="function"==typeof require&&require,e=0;e<s.length;e++)l(s[e]);return l}({1:[function(e,t,n){function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var c,d,a,f,p=e("./modules/handle-dom"),m=e("./modules/utils"),y=e("./modules/handle-swal-dom"),v=e("./modules/handle-click"),h=o(e("./modules/handle-key")),b=o(e("./modules/default-params")),g=o(e("./modules/set-params"));n.default=a=f=function(){var t=arguments[0];function e(e){return(t[e]===S?b.default:t)[e]}if(p.addClass(C.body,"stop-scrolling"),y.resetInput(),t===S)return m.logStr("SweetAlert expects at least 1 attribute!"),!1;var n=m.extend({},b.default);switch(typeof t){case"string":n.title=t,n.text=arguments[1]||"",n.type=arguments[2]||"";break;case"object":if(t.title===S)return m.logStr('Missing "title" argument!'),!1;for(var o in n.title=t.title,b.default)n[o]=e(o);n.confirmButtonText=n.showCancelButton?"Confirm":b.default.confirmButtonText,n.confirmButtonText=e("confirmButtonText"),n.doneFunction=arguments[1]||null;break;default:return m.logStr('Unexpected type of argument! Expected "string" or "object", got '+typeof t),!1}g.default(n),y.fixVerticalPosition(),y.openModal(arguments[1]);for(var a=y.getModal(),r=a.querySelectorAll("button"),s=["onclick","onmouseover","onmouseout","onmousedown","onmouseup","onfocus"],l=function(e){return v.handleButton(e,n,a)},i=0;i<r.length;i++)for(var u=0;u<s.length;u++)r[i][s[u]]=l;y.getOverlay().onclick=l,c=w.onkeydown;w.onkeydown=function(e){return h.default(e,n,a)},w.onfocus=function(){setTimeout(function(){d!==S&&(d.focus(),d=S)},0)},f.enableButtons()},a.setDefaults=f.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");m.extend(b.default,e)},a.close=f.close=function(){var t=y.getModal(),e=(p.fadeOut(y.getOverlay(),5),p.fadeOut(t,5),p.removeClass(t,"showSweetAlert"),p.addClass(t,"hideSweetAlert"),p.removeClass(t,"visible"),t.querySelector(".sa-icon.sa-success")),e=(p.removeClass(e,"animate"),p.removeClass(e.querySelector(".sa-tip"),"animateSuccessTip"),p.removeClass(e.querySelector(".sa-long"),"animateSuccessLong"),t.querySelector(".sa-icon.sa-error")),e=(p.removeClass(e,"animateErrorIcon"),p.removeClass(e.querySelector(".sa-x-mark"),"animateXMark"),t.querySelector(".sa-icon.sa-warning"));return p.removeClass(e,"pulseWarning"),p.removeClass(e.querySelector(".sa-body"),"pulseWarningIns"),p.removeClass(e.querySelector(".sa-dot"),"pulseWarningIns"),setTimeout(function(){var e=t.getAttribute("data-custom-class");p.removeClass(t,e)},300),p.removeClass(C.body,"stop-scrolling"),w.onkeydown=c,w.previousActiveElement&&w.previousActiveElement.focus(),d=S,clearTimeout(t.timeout),!0},a.showInputError=f.showInputError=function(e){var t=y.getModal(),n=t.querySelector(".sa-input-error"),n=(p.addClass(n,"show"),t.querySelector(".sa-error-container"));p.addClass(n,"show"),n.querySelector("p").innerHTML=e,setTimeout(function(){a.enableButtons()},1),t.querySelector("input").focus()},a.resetInputError=f.resetInputError=function(e){if(e&&13===e.keyCode)return!1;var e=y.getModal(),t=e.querySelector(".sa-input-error"),t=(p.removeClass(t,"show"),e.querySelector(".sa-error-container"));p.removeClass(t,"show")},a.disableButtons=f.disableButtons=function(e){var t=y.getModal(),n=t.querySelector("button.confirm"),t=t.querySelector("button.cancel");n.disabled=!0,t.disabled=!0},a.enableButtons=f.enableButtons=function(e){var t=y.getModal(),n=t.querySelector("button.confirm"),t=t.querySelector("button.cancel");n.disabled=!1,t.disabled=!1},void 0!==w?w.sweetAlert=w.swal=a:m.logStr("SweetAlert is a frontend module!"),t.exports=n.default},{"./modules/default-params":2,"./modules/handle-click":3,"./modules/handle-dom":4,"./modules/handle-key":5,"./modules/handle-swal-dom":6,"./modules/set-params":8,"./modules/utils":9}],2:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});n.default={title:"",text:"",type:null,allowOutsideClick:!1,showConfirmButton:!0,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#8CD4F5",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null,customClass:"",html:!1,animation:!0,allowEscapeKey:!0,inputType:"text",inputPlaceholder:"",inputValue:"",showLoaderOnConfirm:!1},t.exports=n.default},{}],3:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});function m(e,t){var n=!0;h.hasClass(e,"show-input")&&(n=(n=e.querySelector("input").value)||""),t.doneFunction(n),t.closeOnConfirm&&sweetAlert.close(),t.showLoaderOnConfirm&&sweetAlert.disableButtons()}function y(e,t){var n=String(t.doneFunction).replace(/\s/g,"");"function("===n.substring(0,9)&&")"!==n.substring(9,10)&&t.doneFunction(!1),t.closeOnCancel&&sweetAlert.close()}var v=e("./utils"),h=(e("./handle-swal-dom"),e("./handle-dom"));n.default={handleButton:function(e,t,n){var o,a,r,e=e||w.event,s=e.target||e.srcElement,l=-1!==s.className.indexOf("confirm"),i=-1!==s.className.indexOf("sweet-overlay"),u=h.hasClass(n,"visible"),c=t.doneFunction&&"true"===n.getAttribute("data-has-done-function");function d(e){l&&t.confirmButtonColor&&(s.style.backgroundColor=e)}switch(l&&t.confirmButtonColor&&(o=t.confirmButtonColor,a=v.colorLuminance(o,-.04),r=v.colorLuminance(o,-.14)),e.type){case"mouseover":d(a);break;case"mouseout":d(o);break;case"mousedown":d(r);break;case"mouseup":d(a);break;case"focus":var f=n.querySelector("button.confirm"),p=n.querySelector("button.cancel");l?p.style.boxShadow="none":f.style.boxShadow="none";break;case"click":p=n===s,f=h.isDescendant(n,s);if(!p&&!f&&u&&!t.allowOutsideClick)break;l&&c&&u?m(n,t):c&&u||i?y(0,t):h.isDescendant(n,s)&&"BUTTON"===s.tagName&&sweetAlert.close()}},handleConfirm:m,handleCancel:y},t.exports=n.default},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],4:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});function o(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")}function a(e){e.style.opacity="",e.style.display="block"}function r(e){e.style.opacity="",e.style.display="none"}n.hasClass=o,n.addClass=function(e,t){o(e,t)||(e.className+=" "+t)},n.removeClass=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(o(e,t)){for(;0<=n.indexOf(" "+t+" ");)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},n.escapeHtml=function(e){var t=C.createElement("div");return t.appendChild(C.createTextNode(e)),t.innerHTML},n._show=a,n.show=function(e){if(e&&!e.length)return a(e);for(var t=0;t<e.length;++t)a(e[t])},n._hide=r,n.hide=function(e){if(e&&!e.length)return r(e);for(var t=0;t<e.length;++t)r(e[t])},n.isDescendant=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},n.getTopMargin=function(e){e.style.left="-9999px",e.style.display="block";var t=e.clientHeight,n="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(e).getPropertyValue("padding-top"),10):parseInt(e.currentStyle.padding);return e.style.left="",e.style.display="none","-"+parseInt((t+n)/2)+"px"},n.fadeIn=function(e,t){var n,o,a;function r(){return a.apply(this,arguments)}+e.style.opacity<1&&(t=t||16,e.style.opacity=0,e.style.display="block",n=+new Date,a=function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(o,t)},r.toString=function(){return a.toString()},(o=r)()),e.style.display="block"},n.fadeOut=function(e,t){t=t||16,e.style.opacity=1;var n,o=+new Date,a=(n=function(){e.style.opacity=+e.style.opacity-(new Date-o)/100,o=+new Date,0<+e.style.opacity?setTimeout(a,t):e.style.display="none"},r.toString=function(){return n.toString()},r);function r(){return n.apply(this,arguments)}a()},n.fireClick=function(e){var t;"function"==typeof MouseEvent?(t=new MouseEvent("click",{view:w,bubbles:!1,cancelable:!0}),e.dispatchEvent(t)):C.createEvent?((t=C.createEvent("MouseEvents")).initEvent("click",!1,!1),e.dispatchEvent(t)):C.createEventObject?e.fireEvent("onclick"):"function"==typeof e.onclick&&e.onclick()},n.stopEventPropagation=function(e){"function"==typeof e.stopPropagation?(e.stopPropagation(),e.preventDefault()):w.event&&w.event.hasOwnProperty("cancelBubble")&&(w.event.cancelBubble=!0)}},{}],5:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var c=e("./handle-dom"),d=e("./handle-swal-dom");n.default=function(e,t,n){var e=e||w.event,o=e.keyCode||e.which,a=n.querySelector("button.confirm"),r=n.querySelector("button.cancel"),s=n.querySelectorAll("button[tabindex]");if(-1!==[9,13,32,27].indexOf(o)){for(var l=e.target||e.srcElement,i=-1,u=0;u<s.length;u++)if(l===s[u]){i=u;break}9===o?(l=-1===i?a:i===s.length-1?s[0]:s[i+1],c.stopEventPropagation(e),l.focus(),t.confirmButtonColor&&d.setFocusStyle(l,t.confirmButtonColor)):13===o?"INPUT"===l.tagName&&(l=a).focus():27===o&&!0===t.allowEscapeKey&&c.fireClick(l=r,e)}},t.exports=n.default},{"./handle-dom":4,"./handle-swal-dom":6}],6:[function(e,t,n){function o(e){return e&&e.__esModule?e:{default:e}}function a(){var e=C.createElement("div");for(e.innerHTML=u.default;e.firstChild;)C.body.appendChild(e.firstChild)}Object.defineProperty(n,"__esModule",{value:!0});var r,s=e("./utils"),l=e("./handle-dom"),i=o(e("./default-params")),u=o(e("./injected-html")),c=(r=function(){var e=C.querySelector(".sweet-alert");return e||(a(),e=c()),e},d.toString=function(){return r.toString()},d);function d(){return r.apply(this,arguments)}function f(){var e=c();if(e)return e.querySelector("input")}function p(){return C.querySelector(".sweet-overlay")}function m(e){if(e&&13===e.keyCode)return!1;var t=(e=c()).querySelector(".sa-input-error"),t=(l.removeClass(t,"show"),e.querySelector(".sa-error-container"));l.removeClass(t,"show")}n.sweetAlertInitialize=a,n.getModal=c,n.getOverlay=p,n.getInput=f,n.setFocusStyle=function(e,t){t=s.hexToRgb(t);e.style.boxShadow="0 0 2px rgba("+t+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"},n.openModal=function(e){var t=c();l.fadeIn(p(),10),l.show(t),l.addClass(t,"showSweetAlert"),l.removeClass(t,"hideSweetAlert"),w.previousActiveElement=C.activeElement;t.querySelector("button.confirm").focus(),setTimeout(function(){l.addClass(t,"visible")},500);var n,o=t.getAttribute("data-timer");"null"!==o&&""!==o&&(n=e,t.timeout=setTimeout(function(){(n?"true"===t.getAttribute("data-has-done-function"):null)?n(null):sweetAlert.close()},o))},n.resetInput=function(){var e=c(),t=f();l.removeClass(e,"show-input"),t.value=i.default.inputValue,t.setAttribute("type",i.default.inputType),t.setAttribute("placeholder",i.default.inputPlaceholder),m()},n.resetInputError=m,n.fixVerticalPosition=function(){c().style.marginTop=l.getTopMargin(c())}},{"./default-params":2,"./handle-dom":4,"./injected-html":7,"./utils":9}],7:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});n.default='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>',t.exports=n.default},{}],8:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var u=e("./utils"),c=e("./handle-swal-dom"),d=e("./handle-dom"),f=["error","warning","info","success","input","prompt"];n.default=function(a){var e,t,r=c.getModal(),n=r.querySelector("h2"),o=r.querySelector("p"),s=r.querySelector("button.cancel"),l=r.querySelector("button.confirm");if(n.innerHTML=a.html?a.title:d.escapeHtml(a.title).split("\n").join("<br>"),o.innerHTML=a.html?a.text:d.escapeHtml(a.text||"").split("\n").join("<br>"),a.text&&d.show(o),a.customClass?(d.addClass(r,a.customClass),r.setAttribute("data-custom-class",a.customClass)):(n=r.getAttribute("data-custom-class"),d.removeClass(r,n),r.setAttribute("data-custom-class","")),d.hide(r.querySelectorAll(".sa-icon")),a.type&&!u.isIE8()){var o=function(){for(var e=!1,t=0;t<f.length;t++)if(a.type===f[t]){e=!0;break}if(!e)return logStr("Unknown alert type: "+a.type),{v:!1};var n=S,o=(-1!==["success","error","warning","info"].indexOf(a.type)&&(n=r.querySelector(".sa-icon.sa-"+a.type),d.show(n)),c.getInput());switch(a.type){case"success":d.addClass(n,"animate"),d.addClass(n.querySelector(".sa-tip"),"animateSuccessTip"),d.addClass(n.querySelector(".sa-long"),"animateSuccessLong");break;case"error":d.addClass(n,"animateErrorIcon"),d.addClass(n.querySelector(".sa-x-mark"),"animateXMark");break;case"warning":d.addClass(n,"pulseWarning"),d.addClass(n.querySelector(".sa-body"),"pulseWarningIns"),d.addClass(n.querySelector(".sa-dot"),"pulseWarningIns");break;case"input":case"prompt":o.setAttribute("type",a.inputType),o.value=a.inputValue,o.setAttribute("placeholder",a.inputPlaceholder),d.addClass(r,"show-input"),setTimeout(function(){o.focus(),o.addEventListener("keyup",swal.resetInputError)},400)}}();if("object"==typeof o)return o.v}a.imageUrl&&((n=r.querySelector(".sa-icon.sa-custom")).style.backgroundImage="url("+a.imageUrl+")",d.show(n),e=o=80,a.imageSize&&(i=(t=a.imageSize.toString().split("x"))[0],t=t[1],i&&t?(o=i,e=t):logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+a.imageSize)),n.setAttribute("style",n.getAttribute("style")+"width:"+o+"px; height:"+e+"px")),r.setAttribute("data-has-cancel-button",a.showCancelButton),a.showCancelButton?s.style.display="inline-block":d.hide(s),r.setAttribute("data-has-confirm-button",a.showConfirmButton),a.showConfirmButton?l.style.display="inline-block":d.hide(l),a.cancelButtonText&&(s.innerHTML=d.escapeHtml(a.cancelButtonText)),a.confirmButtonText&&(l.innerHTML=d.escapeHtml(a.confirmButtonText)),a.confirmButtonColor&&(l.style.backgroundColor=a.confirmButtonColor,l.style.borderLeftColor=a.confirmLoadingButtonColor,l.style.borderRightColor=a.confirmLoadingButtonColor,c.setFocusStyle(l,a.confirmButtonColor)),r.setAttribute("data-allow-outside-click",a.allowOutsideClick);var i=!!a.doneFunction;r.setAttribute("data-has-done-function",i),a.animation?"string"==typeof a.animation?r.setAttribute("data-animation",a.animation):r.setAttribute("data-animation","pop"):r.setAttribute("data-animation","none"),r.setAttribute("data-timer",a.timer)},t.exports=n.default},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],9:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});n.extend=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},n.hexToRgb=function(e){e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return e?parseInt(e[1],16)+", "+parseInt(e[2],16)+", "+parseInt(e[3],16):null},n.isIE8=function(){return w.attachEvent&&!w.addEventListener},n.logStr=function(e){w.console&&w.console.log("SweetAlert: "+e)},n.colorLuminance=function(e,t){(e=String(e).replace(/[^0-9a-f]/gi,"")).length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;for(var n,o="#",a=0;a<3;a++)n=parseInt(e.substr(2*a,2),16),o+=("00"+(n=Math.round(Math.min(Math.max(0,n+n*t),255)).toString(16))).substr(n.length);return o}},{}]},{},[1]),"function"==typeof define&&define.amd?define(function(){return sweetAlert}):"undefined"!=typeof module&&module.exports&&(module.exports=sweetAlert)}(window,document);
// Load Awesome 配置
function welcome(){
    let welcome_text = '欢迎光顾 Xlencoの小窝~'
    if(document.referrer!==''){
        let referrer=document.referrer.split("/")[2];
        welcome_text="欢迎你，来自"+referrer.toUpperCase()+"的用户！";
        if(referrer.toUpperCase()==document.domain.toUpperCase())return;
    }
    swal({
        title: " 欢迎！",
        text: welcome_text+'\n',
        imageUrl: "/img/head.webp",
        timer: 3000,
        showConfirmButton: false
    });
}
$(document).ready(()=>{
    welcome()
})

