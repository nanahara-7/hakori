document.addEventListener('DOMContentLoaded', () => {
  // 既存: IntersectionObserver フェード
  const fadeEls = document.querySelectorAll('[data-fade]');
  if (fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  }

  // ヒーローセクションがなければスキップ
  if (!document.querySelector('.hero')) return;

  gsap.registerPlugin(ScrollTrigger);

  // =====================
  // ヒーロー
  // =====================

  // 1. 背景：ケン・バーンズ効果
  gsap.fromTo(
    '.hero-bg',
    { scale: 1 },
    { scale: 1.06, duration: 10, ease: 'none' }
  );

  // 2. テキスト：フェードイン＋スライドアップ（順番に登場）
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .from('.hero-label',  { opacity: 0, y: 30, duration: 0.8 }, 0.4)
    .from('.hero-heading', { opacity: 0, y: 50, duration: 0.9 }, 0.7)
    .from('.hero-text',    { opacity: 0, y: 30, duration: 0.8 }, 1.1)
    .from('.hero-btns',    { opacity: 0, y: 20, duration: 0.7 }, 1.4)
    .from('.hero-stats',   { opacity: 0, y: 20, duration: 0.7 }, 1.6);

  // 3. 数字：カウントアップ
  document.querySelectorAll('.hero-stat__num').forEach((el) => {
    const target = parseInt(el.textContent, 10);
    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: target,
      duration: 2,
      delay: 1.8,
      ease: 'power2.out',
      onUpdate() {
        el.textContent = Math.round(proxy.val);
      },
    });
  });

  // 4. SCROLL：バウンスループ
  gsap.to('.hero-scroll', {
    y: 8,
    duration: 0.9,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });

  // =====================
  // ビジョン
  // =====================

  // 5. 背景：パララックス（スクロール速度差で奥行き感）
  gsap.to('.vision-bg', {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.vision',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });

  // 6. テキスト：スクロールで順番にフェードイン
  const visionTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.vision-inner',
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
    defaults: { ease: 'power3.out' },
  });
  visionTl
    .from('.vision-label',   { opacity: 0, y: 30, duration: 0.8 })
    .from('.vision-heading',  { opacity: 0, y: 50, duration: 0.9 }, '-=0.4')
    .from('.vision-text',     { opacity: 0, y: 30, duration: 0.8 }, '-=0.4');

  // =====================
  // テクノロジー
  // =====================

  // 7. ヘッダー：フェードイン＋スライドアップ
  const techTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.tech-header',
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
    defaults: { ease: 'power3.out' },
  });
  techTl
    .from('.tech-label',   { opacity: 0, y: 30, duration: 0.8 })
    .from('.tech-heading',  { opacity: 0, y: 50, duration: 0.9 }, '-=0.4')
    .from('.tech-text',     { opacity: 0, y: 20, duration: 0.7 }, '-=0.4');

  // 8. カード：左から順番にスタガーで登場
  gsap.from('.tech-card', {
    opacity: 0,
    y: 50,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.tech-cards',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // =====================
  // 数字で見るハコリ
  // =====================

  // 9. ヘッダー：フェードイン＋スライドアップ
  const numbersTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.numbers-inner',
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
    defaults: { ease: 'power3.out' },
  });
  numbersTl
    .from('.numbers-label',   { opacity: 0, y: 30, duration: 0.8 })
    .from('.numbers-heading',  { opacity: 0, y: 40, duration: 0.9 }, '-=0.4');

  // 10. 統計4項目：スタガーで順番に登場
  gsap.from('.numbers-stat', {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: '.numbers-stats',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // 11. 数字カウントアップ（整数・小数を自動判定）
  document.querySelectorAll('.numbers-stat__num').forEach((el) => {
    const raw = el.textContent.trim();
    const target = parseFloat(raw);
    const decimals = raw.includes('.') ? (raw.split('.')[1]?.length ?? 0) : 0;
    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.numbers-stats',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate() {
        el.textContent = decimals > 0
          ? proxy.val.toFixed(decimals)
          : Math.round(proxy.val);
      },
    });
  });

  // =====================
  // 実績
  // =====================

  // 12. ヘッダー：遅れて順番にフェードイン
  const worksTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.works-inner',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    defaults: { ease: 'power3.out' },
  });
  worksTl
    .from('.works-label',   { opacity: 0, y: 25, duration: 0.6 })
    .from('.works-heading',  { opacity: 0, y: 25, duration: 0.7 }, '-=0.1')
    .from('.works-text',     { opacity: 0, y: 25, duration: 0.6 }, '-=0.3');

  // 13. カード：左から順番にスタガーで登場
  gsap.from('.works-card', {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.works-cards',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // ボタン：下から登場
  gsap.from('.works-btn', {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.works-btn',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // =====================
  // 採用
  // =====================

  // 14. テキスト：左からスライドイン
  gsap.from('.recruit-content', {
    opacity: 0,
    x: -60,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.recruit-inner',
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  });

  // 15. 画像：右からスライドイン＋スケール
  gsap.from('.recruit-img', {
    opacity: 0,
    x: 60,
    scale: 0.95,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.recruit-inner',
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  });

  // =====================
  // ニュース
  // =====================

  // 16. ヘッダー：フェードイン＋スライドアップ
  const newsTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.news-header',
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
    defaults: { ease: 'power3.out' },
  });
  newsTl
    .from('.news-label',   { opacity: 0, y: 30, duration: 0.8 })
    .from('.news-heading',  { opacity: 0, y: 40, duration: 0.9 }, '-=0.4')
    .from('.news-text',     { opacity: 0, y: 20, duration: 0.7 }, '-=0.4');

  // 17. ニュース一覧：上から順番にstaggerで登場
  gsap.from('.news-item', {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: '.news-list',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // 18. ボタン：フェードイン
  gsap.from('.news-btn', {
    opacity: 0,
    y: 20,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.news-btn',
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
});
