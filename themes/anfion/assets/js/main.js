/**
 * Anfion Architecture Theme - Responsive Lightbox & Gallery Viewer
 * High-performance, zero-dependency vanilla JS lightbox
 */
(function() {
  'use strict';

  function initGalleries() {
    // Collect all galleries on the page
    const galleryContainers = document.querySelectorAll('[data-gallery]');
    if (!galleryContainers.length) return;

    // Check or create lightbox DOM
    let lightbox = document.getElementById('anfion-lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'anfion-lightbox';
      lightbox.className = 'fixed inset-0 z-50 hidden items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-all duration-300 opacity-0';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-label', 'Galería de fotos');

      lightbox.innerHTML = `
        <button id="anfion-lightbox-close" class="absolute top-4 right-4 z-50 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all focus:outline-none" aria-label="Cerrar (Esc)">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <button id="anfion-lightbox-prev" class="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all focus:outline-none" aria-label="Anterior (Flecha izquierda)">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>

        <button id="anfion-lightbox-next" class="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all focus:outline-none" aria-label="Siguiente (Flecha derecha)">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>

        <div class="max-w-6xl w-full max-h-[92vh] flex flex-col items-center justify-center select-none">
          <div class="relative w-full flex items-center justify-center overflow-hidden max-h-[72vh]">
            <img id="anfion-lightbox-img" src="" alt="" class="max-h-[72vh] max-w-full object-contain rounded-md shadow-2xl transition-transform duration-300 transform scale-95" />
          </div>
          <div class="mt-4 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between text-white/90 px-5 py-3 bg-stone-900/90 rounded-lg border border-stone-800 gap-3 backdrop-blur-md">
            <div class="text-left w-full">
              <div class="flex items-center gap-2 mb-1">
                <span id="anfion-lightbox-category" class="hidden text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-500/25 text-brand-300 border border-brand-500/30"></span>
                <h4 id="anfion-lightbox-title" class="font-serif font-bold text-base text-stone-100"></h4>
              </div>
              <p id="anfion-lightbox-caption" class="text-xs text-stone-300 leading-relaxed font-sans"></p>
            </div>
            <div id="anfion-lightbox-counter" class="text-xs font-mono tracking-widest text-brand-300 bg-stone-800/90 border border-stone-700 px-3 py-1 rounded-full shrink-0 self-end sm:self-center">
              0 / 0
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(lightbox);
    }

    const imgEl = document.getElementById('anfion-lightbox-img');
    const titleEl = document.getElementById('anfion-lightbox-title');
    const categoryEl = document.getElementById('anfion-lightbox-category');
    const captionEl = document.getElementById('anfion-lightbox-caption');
    const counterEl = document.getElementById('anfion-lightbox-counter');
    const closeBtn = document.getElementById('anfion-lightbox-close');
    const prevBtn = document.getElementById('anfion-lightbox-prev');
    const nextBtn = document.getElementById('anfion-lightbox-next');

    let currentItems = [];
    let currentIndex = 0;
    let isOpen = false;

    function openLightbox(items, index) {
      currentItems = items;
      currentIndex = index;
      isOpen = true;
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
      // trigger reflow
      void lightbox.offsetWidth;
      lightbox.classList.remove('opacity-0');
      document.body.style.overflow = 'hidden';
      renderCurrent();
    }

    function closeLightbox() {
      if (!isOpen) return;
      isOpen = false;
      lightbox.classList.add('opacity-0');
      setTimeout(() => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = '';
      }, 250);
    }

    function renderCurrent() {
      if (!currentItems.length) return;
      const item = currentItems[currentIndex];
      imgEl.style.opacity = '0.3';
      imgEl.src = item.src;
      imgEl.alt = item.title || 'Foto de proyecto Ánfion';
      imgEl.onload = () => {
        imgEl.style.opacity = '1';
        imgEl.classList.remove('scale-95');
        imgEl.classList.add('scale-100');
      };
      titleEl.textContent = item.title || '';
      if (item.category) {
        categoryEl.textContent = item.category;
        categoryEl.classList.remove('hidden');
      } else {
        categoryEl.classList.add('hidden');
      }
      captionEl.textContent = item.caption || '';
      counterEl.textContent = `${currentIndex + 1} / ${currentItems.length}`;

      if (currentItems.length <= 1) {
        prevBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
      } else {
        prevBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
      }
    }

    function showNext() {
      if (!currentItems.length) return;
      currentIndex = (currentIndex + 1) % currentItems.length;
      renderCurrent();
    }

    function showPrev() {
      if (!currentItems.length) return;
      currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
      renderCurrent();
    }

    // Attach listeners once
    closeBtn.onclick = closeLightbox;
    prevBtn.onclick = (e) => { e.stopPropagation(); showPrev(); };
    nextBtn.onclick = (e) => { e.stopPropagation(); showNext(); };

    lightbox.onclick = (e) => {
      if (e.target === lightbox || e.target.closest('#anfion-lightbox-close')) {
        closeLightbox();
      }
    };

    document.addEventListener('keydown', (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });

    // Wire each gallery container
    galleryContainers.forEach(container => {
      const items = [];
      const itemElements = container.querySelectorAll('[data-gallery-item]');
      itemElements.forEach((el, idx) => {
        const src = el.getAttribute('data-src') || el.getAttribute('href') || (el.querySelector('img') ? el.querySelector('img').src : '');
        const title = el.getAttribute('data-title') || (el.querySelector('img') ? el.querySelector('img').alt : '') || '';
        const caption = el.getAttribute('data-caption') || '';
        const category = el.getAttribute('data-category') || '';

        items.push({ src, title, caption, category });

        el.addEventListener('click', (e) => {
          e.preventDefault();
          openLightbox(items, idx);
        });
      });
    });
  }

  // Mobile menu toggle
  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!toggleBtn || !mobileMenu) return;

    toggleBtn.addEventListener('click', () => {
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !expanded);
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Project filter functionality
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('[data-filter-btn]');
    const projectCards = document.querySelectorAll('[data-filter-category]');
    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const rawFilter = btn.getAttribute('data-filter-btn') || '';
        const filter = rawFilter.toLowerCase().trim();
        let decodedFilter = filter;
        try { decodedFilter = decodeURIComponent(filter); } catch (e) {}

        filterButtons.forEach(b => {
          b.classList.remove('bg-brand-600', 'text-white', 'border-brand-600');
          b.classList.add('bg-stone-100', 'text-stone-700', 'border-stone-200');
        });
        btn.classList.remove('bg-stone-100', 'text-stone-700', 'border-stone-200');
        btn.classList.add('bg-brand-600', 'text-white', 'border-brand-600');

        projectCards.forEach(card => {
          const rawCategories = card.getAttribute('data-filter-category') || '';
          const categories = rawCategories.toLowerCase().split(/\s+/);
          let decodedCategories = rawCategories.toLowerCase();
          try { decodedCategories = decodeURIComponent(rawCategories.toLowerCase()); } catch (e) {}

          const match = filter === 'all' ||
            categories.includes(filter) ||
            rawCategories.includes(filter) ||
            decodedCategories.includes(decodedFilter);

          if (match) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initGalleries();
    initMobileMenu();
    initProjectFilters();
  });
})();
