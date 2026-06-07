if (document.querySelector('.works-gallery-grid')) {
  new Swiper('.works-gallery-grid', {
    slidesPerView: 1.2,
    spaceBetween: 16,
    centeredSlides: true,
    touchEventsTarget: 'wrapper',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        enabled: false,
      }
    }
  });
}

if (document.querySelector('.tech-equipment-grid')) {
  new Swiper('.tech-equipment-grid', {
    slidesPerView: 1.2,
    spaceBetween: 16,
    centeredSlides: true,
    touchEventsTarget: 'wrapper',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        enabled: false,
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // インタビューQ&Aアコーディオン
  document.querySelectorAll('.interview-qa-block__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const block = trigger.closest('.interview-qa-block');
      const isOpen = block.classList.contains('is-open');
      block.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  const menuBtn = document.querySelector('.header-menu-btn');
  const closeBtn = document.querySelector('.drawer-close-btn');
  const drawer = document.querySelector('.drawer');
  const overlay = document.querySelector('.drawer-overlay');

  const openDrawer = () => {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'メニューを閉じる');
    drawer.setAttribute('aria-hidden', 'false');
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'メニューを開く');
    drawer.setAttribute('aria-hidden', 'true');
  };

  menuBtn.addEventListener('click', () => {
    drawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
  });
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
});


