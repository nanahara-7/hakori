document.addEventListener("DOMContentLoaded", () => {
  // 既存: IntersectionObserver フェード
  const fadeEls = document.querySelectorAll("[data-fade]");
  if (fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    fadeEls.forEach((el) => observer.observe(el));
  }

  gsap.registerPlugin(ScrollTrigger);

  // =====================
  // index.html
  // =====================
  if (document.querySelector(".hero")) {
    // 1. 背景：ケン・バーンズ効果
    gsap.fromTo(".hero-bg", { scale: 1 }, { scale: 1.06, duration: 10, ease: "none" });

    // 2. テキスト：フェードイン＋スライドアップ（順番に登場）
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .from(".hero-label", { opacity: 0, y: 30, duration: 0.8 }, 0.4)
      .from(".hero-heading", { opacity: 0, y: 50, duration: 0.9 }, 0.7)
      .from(".hero-text", { opacity: 0, y: 30, duration: 0.8 }, 1.1)
      .from(".hero-btns", { opacity: 0, y: 20, duration: 0.7 }, 1.4)
      .from(".hero-stats", { opacity: 0, y: 20, duration: 0.7 }, 1.6);

    // 3. 数字：カウントアップ
    document.querySelectorAll(".hero-stat__num").forEach((el) => {
      const target = parseInt(el.textContent, 10);
      const proxy = { val: 0 };
      gsap.to(proxy, {
        val: target,
        duration: 2,
        delay: 1.8,
        ease: "power2.out",
        onUpdate() {
          el.textContent = Math.round(proxy.val);
        },
      });
    });

    // 4. SCROLL：バウンスループ
    gsap.to(".hero-scroll", {
      y: 8,
      duration: 0.9,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // 5. 背景：パララックス
    gsap.to(".vision-bg", {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: ".vision",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // 6. ビジョン：テキスト
    const visionTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".vision-inner",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });
    visionTl
      .from(".vision-label", { opacity: 0, y: 30, duration: 0.8 })
      .from(".vision-heading", { opacity: 0, y: 50, duration: 0.9 }, "-=0.4")
      .from(".vision-text", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4");

    // 7. テクノロジー：ヘッダー
    const techTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".tech-header",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });
    techTl
      .from(".tech-label", { opacity: 0, y: 30, duration: 0.8 })
      .from(".tech-heading", { opacity: 0, y: 50, duration: 0.9 }, "-=0.4")
      .from(".tech-text", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4");

    // 8. テクノロジー：カード
    gsap.from(".tech-card", {
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".tech-cards",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // 9. 数字：ヘッダー
    const numbersTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".numbers-inner",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });
    numbersTl.from(".numbers-label", { opacity: 0, y: 30, duration: 0.8 }).from(".numbers-heading", { opacity: 0, y: 40, duration: 0.9 }, "-=0.4");

    // 10. 数字：統計stagger
    gsap.from(".numbers-stat", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".numbers-stats",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // 11. 数字：カウントアップ
    document.querySelectorAll(".numbers-stat__num").forEach((el) => {
      const raw = el.textContent.trim();
      const target = parseFloat(raw);
      const decimals = raw.includes(".") ? (raw.split(".")[1]?.length ?? 0) : 0;
      const proxy = { val: 0 };
      gsap.to(proxy, {
        val: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".numbers-stats",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        onUpdate() {
          el.textContent = decimals > 0 ? proxy.val.toFixed(decimals) : Math.round(proxy.val);
        },
      });
    });

    // 12. 実績：ヘッダー
    const worksTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".works-inner",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });
    worksTl
      .from(".works-label", { opacity: 0, y: 25, duration: 0.6 })
      .from(".works-heading", { opacity: 0, y: 25, duration: 0.7 }, "-=0.1")
      .from(".works-text", { opacity: 0, y: 25, duration: 0.6 }, "-=0.3");

    // 13. 実績：カード
    gsap.from(".works-card", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".works-cards",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // 実績：ボタン
    gsap.from(".works-btn", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".works-btn",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // 14. 採用：テキスト左から
    gsap.from(".recruit-content", {
      opacity: 0,
      x: -60,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".recruit-inner",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    // 15. 採用：画像右から
    gsap.from(".recruit-img", {
      opacity: 0,
      x: 60,
      scale: 0.95,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".recruit-inner",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    // 16. ニュース：ヘッダー
    const newsTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".news-header",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });
    newsTl
      .from(".news-label", { opacity: 0, y: 30, duration: 0.8 })
      .from(".news-heading", { opacity: 0, y: 40, duration: 0.9 }, "-=0.4")
      .from(".news-text", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4");

    // 17. ニュース：一覧
    gsap.from(".news-item", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".news-list",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // 18. ニュース：ボタン
    gsap.from(".news-btn", {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".news-btn",
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  }

  // =====================
  // about.html
  // =====================
  if (document.querySelector(".about-hero")) {
    // 19. ページヒーロー：順番にフェードイン
    const aboutHeroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    aboutHeroTl
      .from(".about-hero-breadcrumb", { opacity: 0, y: 20, duration: 0.6 }, 0.3)
      .from(".about-hero-label", { opacity: 0, y: 20, duration: 0.6 }, 0.6)
      .from(".about-hero-heading", { opacity: 0, y: 50, duration: 0.9 }, 0.9)
      .from(".about-hero-text", { opacity: 0, y: 30, duration: 0.8 }, 1.2);

    // 20. フィロソフィー：テキスト
    const philosophyTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-philosophy-inner",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });
    philosophyTl
      .from(".about-philosophy-label", { opacity: 0, y: 30, duration: 0.7 })
      .from(".about-philosophy-heading", { opacity: 0, y: 50, duration: 0.9 }, "-=0.4")
      .from(".about-philosophy-text", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4");

    // 21. 歩み：タイムライン項目をstaggerで登場
    gsap.from(".about-history-item", {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".about-history-timeline",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // 22. 会社概要：ヘッダー
    const companyTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-company-inner",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });
    companyTl.from(".about-company-inner .about-section-label", { opacity: 0, y: 20, duration: 0.7 }).from(".about-company-heading", { opacity: 0, y: 40, duration: 0.8 }, "-=0.4");

    // 23. 会社概要：テーブル行をstaggerで登場
    gsap.from(".about-company-row", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".about-company-table",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }

  // =====================
  // works.html
  // =====================
  if (document.querySelector(".works-hero")) {
    // 28. ページヒーロー：順番にフェードイン
    const worksHeroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    worksHeroTl
      .from(".works-hero-breadcrumb", { opacity: 0, y: 20, duration: 0.6 }, 0.3)
      .from(".works-hero-label", { opacity: 0, y: 20, duration: 0.6 }, 0.6)
      .from(".works-hero-heading", { opacity: 0, y: 50, duration: 0.9 }, 0.9)
      .from(".works-hero-subheading", { opacity: 0, y: 30, duration: 0.8 }, 1.2);

    // 29. フィルターボタン：staggerで登場
    gsap.from(".works-gallery-filter-btn", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: ".works-gallery-filter",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }

  // =====================
  // technology.html
  // =====================
  if (document.querySelector(".tech-hero")) {
    // 24. ページヒーロー：順番にフェードイン
    const techHeroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    techHeroTl
      .from(".tech-hero-breadcrumb", { opacity: 0, y: 20, duration: 0.6 }, 0.3)
      .from(".tech-hero-label", { opacity: 0, y: 20, duration: 0.6 }, 0.6)
      .from(".tech-hero-heading", { opacity: 0, y: 50, duration: 0.9 }, 0.9)
      .from(".tech-hero-subheading", { opacity: 0, y: 30, duration: 0.8 }, 1.2);

    // 25. 事業領域：ヘッダー
    const businessTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".tech-business-header",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });
    businessTl
      .from(".tech-business-header .about-section-label", { opacity: 0, y: 20, duration: 0.7 })
      .from(".tech-business-heading", { opacity: 0, y: 40, duration: 0.9 }, "-=0.4")
      .from(".tech-business-desc", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4");

    // 26. 事業領域：カード
    gsap.from(".tech-business-card", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".tech-business-grid",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // 27. 主要設備：ヘッダー
    const equipmentTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".tech-equipment-header",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });
    equipmentTl
      .from(".tech-equipment-header .about-section-label", { opacity: 0, y: 20, duration: 0.7 })
      .from(".tech-equipment-heading", { opacity: 0, y: 40, duration: 0.9 }, "-=0.4")
      .from(".tech-equipment-desc", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4");
  }

  // RECRUIT
  // 28. 採用情報topアニメーション
  if (document.querySelector(".recruit-hero")) {
    const recruitHeroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    recruitHeroTl
      .from(".recruit-hero-join", { opacity: 0, y: 20, duration: 0.6 }, 0.3)
      .from(".recruit-hero-breadcrumb", { opacity: 0, y: 20, duration: 0.6 }, 0.3)
      .from(".recruit-hero-label", { opacity: 0, y: 20, duration: 0.6 }, 0.6)
      .from(".recruit-hero-heading", { opacity: 0, y: 50, duration: 0.9 }, 0.8)
      .from(".recruit-hero-subheading", { opacity: 0, y: 30, duration: 0.8 }, 1.1);

    // 29. イントロ：1行目（テキスト左から・画像右から）
    gsap.from(".recruit-intro-row:not(.recruit-intro-row--reverse) .recruit-intro-text", {
      opacity: 0,
      x: -60,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".recruit-intro-row:not(.recruit-intro-row--reverse)",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
    gsap.from(".recruit-intro-row:not(.recruit-intro-row--reverse) .recruit-intro-img", {
      opacity: 0,
      x: 60,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".recruit-intro-row:not(.recruit-intro-row--reverse)",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    // 30. イントロ：2行目（画像左から・テキスト右から）
    gsap.from(".recruit-intro-row--reverse .recruit-intro-img", {
      opacity: 0,
      x: -60,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".recruit-intro-row--reverse",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
    gsap.from(".recruit-intro-row--reverse .recruit-intro-desc", {
      opacity: 0,
      x: 60,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".recruit-intro-row--reverse",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    // 31. 数字セクション：カードstagger
    gsap.from(".recruit-numbers-card", {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".recruit-numbers-grid",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // 32. タイムライン：項目stagger
    gsap.from(".recruit-timeline-item", {
      opacity: 0,
      x: -40,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".recruit-timeline-list",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // 33. 福利厚生：カードstagger
    gsap.from(".recruit-benefits-card", {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: ".recruit-benefits-grid",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // 34. 社員インタビュー：カードstagger
    gsap.from(".recruit-interview-card", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".recruit-interview-grid",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // 35. 募集要項：ヘッダー
    const requirementsTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".recruit-requirements-header",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });
    requirementsTl
      .from(".recruit-requirements-label",  { opacity: 0, y: 20, duration: 0.6 })
      .from(".recruit-requirements-heading", { opacity: 0, y: 40, duration: 0.8 }, "-=0.4")
      .from(".recruit-requirements-desc",    { opacity: 0, y: 20, duration: 0.7 }, "-=0.4");

    // 36. 募集要項：タブボタン
    gsap.from(".recruit-requirements-tab", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".recruit-requirements-tabs",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // 37. 募集要項：テーブル行
    gsap.from(".recruit-requirements-row", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: ".recruit-requirements-table",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // 38. CTA：ラベル・見出し・説明文（左右から交互に）
    const ctaTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".recruit-cta-inner",
        start: "top 75%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });
    ctaTl
      .from(".recruit-cta-label",   { opacity: 0, x: -40, duration: 0.7 })
      .from(".recruit-cta-heading", { opacity: 0, x:  40, duration: 0.9 }, "-=0.4")
      .from(".recruit-cta-desc",    { opacity: 0, x: -40, duration: 0.7 }, "-=0.4");

    // 39. CTA：ボタン（左右から）
    gsap.from(".recruit-cta-btn--primary", {
      opacity: 0,
      x: -60,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".recruit-cta-btns",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
    gsap.from(".recruit-cta-btn--secondary", {
      opacity: 0,
      x: 60,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".recruit-cta-btns",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }

  // =====================
  // news.html
  // =====================
  if (document.querySelector(".news-hero")) {
    const newsHeroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    newsHeroTl
      .from(".news-hero-breadcrumb", { opacity: 0, y: 20, duration: 0.6 }, 0.3)
      .from(".news-hero-label",      { opacity: 0, y: 20, duration: 0.6 }, 0.6)
      .from(".news-hero-heading",    { opacity: 0, y: 50, duration: 0.9 }, 0.9)
      .from(".news-hero-desc",       { opacity: 0, y: 30, duration: 0.8 }, 1.2);
  }

  // =====================
  // contact.html
  // =====================
  if (document.querySelector(".contact-hero")) {
    const contactHeroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    contactHeroTl
      .from(".contact-hero-breadcrumb", { opacity: 0, y: 20, duration: 0.6 }, 0.3)
      .from(".contact-hero-label",      { opacity: 0, y: 20, duration: 0.6 }, 0.6)
      .from(".contact-hero-heading",    { opacity: 0, y: 50, duration: 0.9 }, 0.9)
      .from(".contact-hero-desc",       { opacity: 0, y: 30, duration: 0.8 }, 1.2);
  }
});
