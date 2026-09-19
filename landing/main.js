/* 익힘 랜딩 페이지 — 헤더 상태, 모바일 메뉴, 스크롤 등장, FAQ 아코디언 */
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var nav = document.getElementById('siteNav');
  var toggle = document.getElementById('navToggle');
  var mobileCta = document.getElementById('mobileCta');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 헤더 배경 + 모바일 하단 CTA 노출 ── */
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle('is-stuck', y > 40);
    if (mobileCta) mobileCta.classList.toggle('is-visible', y > window.innerHeight * 0.75);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ── 모바일 메뉴 ── */
  function closeNav() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '메뉴 열기');
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeNav();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ── 스크롤 등장 (같은 그룹은 순차적으로) ── */
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        /* 빠르게 스크롤해 지나친 요소도 노출 상태로 확정한다 */
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return;
        var el = entry.target;
        var siblings = el.parentElement ? Array.prototype.filter.call(el.parentElement.children, function (n) {
          return n.classList && n.classList.contains('reveal');
        }) : [];
        var index = siblings.indexOf(el);
        el.style.transitionDelay = (index > 0 ? Math.min(index, 5) * 90 : 0) + 'ms';
        el.classList.add('is-in');
        observer.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    items.forEach(function (el) { observer.observe(el); });

    /* 스크롤이 멈춘 뒤, 화면을 이미 지난 요소가 남아 있으면 보정한다 */
    var sweepTimer;
    window.addEventListener('scroll', function () {
      clearTimeout(sweepTimer);
      sweepTimer = setTimeout(function () {
        items.forEach(function (el) {
          if (el.classList.contains('is-in')) return;
          if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
            el.classList.add('is-in');
            observer.unobserve(el);
          }
        });
      }, 220);
    }, { passive: true });
  }

  /* ── 저서 표지: 이미지 파일이 없으면 자리표시 표지를 그대로 보여준다 ── */
  Array.prototype.forEach.call(document.querySelectorAll('.book-cover img'), function (img) {
    function hide() { img.style.display = 'none'; }
    img.addEventListener('error', hide);
    if (img.complete && img.naturalWidth === 0) hide();
  });

  /* ── FAQ: 한 번에 하나만 열기 ── */
  var faqItems = document.querySelectorAll('#faqList .faq-item');
  Array.prototype.forEach.call(faqItems, function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      Array.prototype.forEach.call(faqItems, function (other) {
        if (other !== item) other.open = false;
      });
    });
  });
})();
