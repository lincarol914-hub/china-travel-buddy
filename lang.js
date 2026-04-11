/**
 * ============================================================
 * China Travel Buddy — Client-Side Translation System (lang.js)
 * ============================================================
 *
 * Drop-in multilingual support for all pages. Usage:
 *   <script src="lang.js"></script>   (before </body>)
 *
 * Supported languages:
 *   en (default), ja, ko, es, fr, vi, pt
 *
 * Features:
 *   - Auto-injects a language dropdown into the nav bar
 *   - Translates elements with data-i18n attributes
 *   - Auto-translates common nav, footer, and button text
 *   - Persists choice in localStorage
 *   - Mobile floating language button (below 768px)
 * ============================================================
 */

(function () {
  'use strict';

  // ─── LANGUAGE METADATA ───────────────────────────────────
  var LANGUAGES = [
    { code: 'en', label: 'English',    native: 'English'    },
    { code: 'ja', label: 'Japanese',   native: '日本語'      },
    { code: 'ko', label: 'Korean',     native: '한국어'      },
    { code: 'es', label: 'Spanish',    native: 'Español'    },
    { code: 'fr', label: 'French',     native: 'Français'   },
    { code: 'vi', label: 'Vietnamese', native: 'Tiếng Việt' },
    { code: 'pt', label: 'Portuguese', native: 'Português'  }
  ];

  // ─── TRANSLATION DICTIONARIES ────────────────────────────
  // English values serve as both the default text and the
  // dictionary keys used for auto-matching existing elements.

  var TRANSLATIONS = {

    // ── Navigation ──
    'nav.home': {
      en: 'Home',
      ja: 'ホーム',
      ko: '홈',
      es: 'Inicio',
      fr: 'Accueil',
      vi: 'Trang chủ',
      pt: 'Início'
    },
    'nav.services': {
      en: 'Services',
      ja: 'サービス',
      ko: '서비스',
      es: 'Servicios',
      fr: 'Services',
      vi: 'Dịch vụ',
      pt: 'Serviços'
    },
    'nav.guides': {
      en: 'Guides',
      ja: 'ガイド',
      ko: '가이드',
      es: 'Guías',
      fr: 'Guides',
      vi: 'Hướng dẫn',
      pt: 'Guias'
    },
    'nav.contact': {
      en: 'Contact Us',
      ja: 'お問い合わせ',
      ko: '문의하기',
      es: 'Contáctenos',
      fr: 'Contactez-nous',
      vi: 'Liên hệ',
      pt: 'Fale Conosco'
    },
    'nav.cta': {
      en: 'Get Your Plan',
      ja: 'プランを取得',
      ko: '플랜 받기',
      es: 'Obtén Tu Plan',
      fr: 'Obtenez Votre Plan',
      vi: 'Nhận Kế Hoạch',
      pt: 'Obtenha Seu Plano'
    },
    'nav.china_ready': {
      en: 'China Ready — £19.90',
      ja: 'China Ready — £19.90',
      ko: 'China Ready — £19.90',
      es: 'China Ready — £19.90',
      fr: 'China Ready — £19.90',
      vi: 'China Ready — £19.90',
      pt: 'China Ready — £19.90'
    },
    'nav.tailored_trip': {
      en: 'Tailored Trip — £99',
      ja: 'テーラーメイド旅行 — £99',
      ko: '맞춤 여행 — £99',
      es: 'Viaje a Medida — £99',
      fr: 'Voyage Sur Mesure — £99',
      vi: 'Chuyến Đi Tùy Chỉnh — £99',
      pt: 'Viagem Personalizada — £99'
    },
    'nav.signature_vip': {
      en: 'Signature / VIP — £199',
      ja: 'シグネチャー / VIP — £199',
      ko: '시그니처 / VIP — £199',
      es: 'Signature / VIP — £199',
      fr: 'Signature / VIP — £199',
      vi: 'Signature / VIP — £199',
      pt: 'Signature / VIP — £199'
    },
    'nav.compare': {
      en: 'Compare Packages',
      ja: 'パッケージ比較',
      ko: '패키지 비교',
      es: 'Comparar Paquetes',
      fr: 'Comparer les Forfaits',
      vi: 'So Sánh Gói',
      pt: 'Comparar Pacotes'
    },
    'nav.destinations': {
      en: 'Destinations',
      ja: '目的地',
      ko: '여행지',
      es: 'Destinos',
      fr: 'Destinations',
      vi: 'Điểm Đến',
      pt: 'Destinos'
    },
    'nav.daily_phrases': {
      en: 'Daily Phrases',
      ja: '日常フレーズ',
      ko: '일상 표현',
      es: 'Frases Diarias',
      fr: 'Phrases Quotidiennes',
      vi: 'Cụm Từ Hàng Ngày',
      pt: 'Frases Diárias'
    },
    'nav.food': {
      en: 'Food',
      ja: 'グルメ',
      ko: '음식',
      es: 'Comida',
      fr: 'Cuisine',
      vi: 'Ẩm Thực',
      pt: 'Comida'
    },
    'nav.visa_tips': {
      en: 'Visa Tips',
      ja: 'ビザ情報',
      ko: '비자 팁',
      es: 'Consejos de Visa',
      fr: 'Conseils Visa',
      vi: 'Mẹo Visa',
      pt: 'Dicas de Visto'
    },

    // ── Footer ──
    'footer.services': {
      en: 'Services',
      ja: 'サービス',
      ko: '서비스',
      es: 'Servicios',
      fr: 'Services',
      vi: 'Dịch vụ',
      pt: 'Serviços'
    },
    'footer.guides': {
      en: 'Guides',
      ja: 'ガイド',
      ko: '가이드',
      es: 'Guías',
      fr: 'Guides',
      vi: 'Hướng dẫn',
      pt: 'Guias'
    },
    'footer.contact': {
      en: 'Contact',
      ja: 'お問い合わせ',
      ko: '연락처',
      es: 'Contacto',
      fr: 'Contact',
      vi: 'Liên hệ',
      pt: 'Contato'
    },
    'footer.tagline': {
      en: 'Helping international travellers explore China with confidence.',
      ja: '海外旅行者が安心して中国を旅できるようサポートします。',
      ko: '해외 여행자들이 자신감을 가지고 중국을 탐험할 수 있도록 돕습니다.',
      es: 'Ayudando a viajeros internacionales a explorar China con confianza.',
      fr: 'Aider les voyageurs internationaux à explorer la Chine en toute confiance.',
      vi: 'Giúp du khách quốc tế khám phá Trung Quốc một cách tự tin.',
      pt: 'Ajudando viajantes internacionais a explorar a China com confiança.'
    },
    'footer.copyright': {
      en: '© 2025 China Travel Buddy. All rights reserved.',
      ja: '© 2025 China Travel Buddy. All rights reserved.',
      ko: '© 2025 China Travel Buddy. All rights reserved.',
      es: '© 2025 China Travel Buddy. Todos los derechos reservados.',
      fr: '© 2025 China Travel Buddy. Tous droits réservés.',
      vi: '© 2025 China Travel Buddy. Bảo lưu mọi quyền.',
      pt: '© 2025 China Travel Buddy. Todos os direitos reservados.'
    },

    // ── Common buttons / CTAs ──
    'btn.get_plan': {
      en: 'Get Your Plan',
      ja: 'プランを取得',
      ko: '플랜 받기',
      es: 'Obtén Tu Plan',
      fr: 'Obtenez Votre Plan',
      vi: 'Nhận Kế Hoạch',
      pt: 'Obtenha Seu Plano'
    },
    'btn.buy_now': {
      en: 'Buy Now',
      ja: '今すぐ購入',
      ko: '지금 구매',
      es: 'Comprar Ahora',
      fr: 'Acheter Maintenant',
      vi: 'Mua Ngay',
      pt: 'Comprar Agora'
    },
    'btn.send_message': {
      en: 'Send Message',
      ja: 'メッセージを送信',
      ko: '메시지 보내기',
      es: 'Enviar Mensaje',
      fr: 'Envoyer le Message',
      vi: 'Gửi Tin Nhắn',
      pt: 'Enviar Mensagem'
    },
    'btn.get_to_know': {
      en: 'Get to Know',
      ja: '詳しく見る',
      ko: '자세히 알아보기',
      es: 'Conocer Más',
      fr: 'En Savoir Plus',
      vi: 'Tìm Hiểu',
      pt: 'Conheça'
    },
    'btn.plan_trip': {
      en: 'Plan a Trip to',
      ja: '旅行を計画する：',
      ko: '여행 계획하기:',
      es: 'Planificar un Viaje a',
      fr: 'Planifier un Voyage à',
      vi: 'Lên Kế Hoạch Đến',
      pt: 'Planeje uma Viagem para'
    },

    // ── Common section labels ──
    'label.travel_guides': {
      en: 'Travel Guides',
      ja: '旅行ガイド',
      ko: '여행 가이드',
      es: 'Guías de Viaje',
      fr: 'Guides de Voyage',
      vi: 'Cẩm Nang Du Lịch',
      pt: 'Guias de Viagem'
    },
    'label.city_guide': {
      en: 'City Guide',
      ja: '都市ガイド',
      ko: '도시 가이드',
      es: 'Guía de la Ciudad',
      fr: 'Guide de la Ville',
      vi: 'Hướng Dẫn Thành Phố',
      pt: 'Guia da Cidade'
    },
    'label.service': {
      en: 'Service',
      ja: 'サービス',
      ko: '서비스',
      es: 'Servicio',
      fr: 'Service',
      vi: 'Dịch Vụ',
      pt: 'Serviço'
    },
    'label.faq': {
      en: 'FAQ',
      ja: 'よくある質問',
      ko: '자주 묻는 질문',
      es: 'Preguntas Frecuentes',
      fr: 'FAQ',
      vi: 'Câu Hỏi Thường Gặp',
      pt: 'Perguntas Frequentes'
    },
    'label.common_questions': {
      en: 'Common Questions',
      ja: 'よくある質問',
      ko: '자주 묻는 질문',
      es: 'Preguntas Frecuentes',
      fr: 'Questions Fréquentes',
      vi: 'Câu Hỏi Thường Gặp',
      pt: 'Perguntas Frequentes'
    },
    'label.get_in_touch': {
      en: 'Get In Touch',
      ja: 'お問い合わせ',
      ko: '연락하기',
      es: 'Contáctenos',
      fr: 'Contactez-nous',
      vi: 'Liên Hệ',
      pt: 'Entre em Contato'
    },
    'label.get_started': {
      en: 'Get Started Today',
      ja: '今すぐ始めましょう',
      ko: '지금 시작하세요',
      es: 'Comience Hoy',
      fr: 'Commencez Aujourd\'hui',
      vi: 'Bắt Đầu Ngay',
      pt: 'Comece Hoje'
    },
    'label.ready_explore': {
      en: 'Ready to Explore China?',
      ja: '中国を探検する準備はできましたか？',
      ko: '중국을 탐험할 준비가 되셨나요?',
      es: '¿Listo para Explorar China?',
      fr: 'Prêt à Explorer la Chine ?',
      vi: 'Sẵn Sàng Khám Phá Trung Quốc?',
      pt: 'Pronto para Explorar a China?'
    },
    'label.ready_explore_desc': {
      en: 'Let us build a personalised itinerary around the destinations that excite you most.',
      ja: 'あなたが最も行きたい目的地に合わせた、オーダーメイドの旅程をお作りします。',
      ko: '가장 설레는 여행지를 중심으로 맞춤 일정을 만들어 드립니다.',
      es: 'Permítanos crear un itinerario personalizado en torno a los destinos que más le entusiasman.',
      fr: 'Laissez-nous créer un itinéraire personnalisé autour des destinations qui vous passionnent le plus.',
      vi: 'Hãy để chúng tôi xây dựng lịch trình cá nhân hóa xoay quanh những điểm đến bạn yêu thích nhất.',
      pt: 'Deixe-nos criar um itinerário personalizado em torno dos destinos que mais te empolgam.'
    }
  };

  // ─── BUILD REVERSE LOOKUP ────────────────────────────────
  // Maps English text -> translation key for auto-matching.
  var EN_TO_KEY = {};
  Object.keys(TRANSLATIONS).forEach(function (key) {
    EN_TO_KEY[TRANSLATIONS[key].en] = key;
  });

  // ─── HELPER: get translation ─────────────────────────────
  function t(key, lang) {
    var entry = TRANSLATIONS[key];
    if (!entry) return null;
    return entry[lang] || entry.en;
  }

  // ─── INJECT STYLES ───────────────────────────────────────
  function injectStyles() {
    var style = document.createElement('style');
    style.id = 'lang-switcher-styles';
    style.textContent = [
      /* Desktop language dropdown — matches existing nav-dropdown pattern */
      '.lang-dropdown { position: relative; }',
      '.lang-dropdown > a { cursor: pointer; display: flex; align-items: center; gap: 4px; }',
      '.lang-dropdown > a::after { content: " ▾"; font-size: 10px; opacity: 0.6; }',

      '.lang-dropdown-menu {',
      '  display: none;',
      '  position: absolute;',
      '  top: calc(100% + 8px);',
      '  right: 0;',
      '  background: white;',
      '  border: 1px solid #e8e0d8;',
      '  border-radius: 10px;',
      '  min-width: 170px;',
      '  box-shadow: 0 12px 40px rgba(0,0,0,0.12);',
      '  overflow: hidden;',
      '  z-index: 200;',
      '}',

      '.lang-dropdown:hover .lang-dropdown-menu { display: block; }',

      '.lang-dropdown-menu a {',
      '  display: block;',
      '  padding: 11px 18px;',
      '  font-size: 13.5px;',
      '  color: #1a1a1a;',
      '  text-decoration: none;',
      '  border-radius: 0;',
      '  transition: background 0.15s;',
      '  cursor: pointer;',
      '}',
      '.lang-dropdown-menu a:hover { background: #f8f4f0; color: #6B2D2D; }',
      '.lang-dropdown-menu a.lang-active {',
      '  background: #f8f4f0;',
      '  color: #6B2D2D;',
      '  font-weight: 600;',
      '}',

      /* Mobile floating language button */
      '.lang-fab {',
      '  display: none;',
      '  position: fixed;',
      '  bottom: 24px;',
      '  right: 24px;',
      '  z-index: 9999;',
      '  width: 50px;',
      '  height: 50px;',
      '  border-radius: 50%;',
      '  background: #6B2D2D;',
      '  color: white;',
      '  border: none;',
      '  font-size: 20px;',
      '  cursor: pointer;',
      '  box-shadow: 0 4px 20px rgba(107,45,45,0.4);',
      '  transition: background 0.2s, transform 0.15s;',
      '  align-items: center;',
      '  justify-content: center;',
      '}',
      '.lang-fab:hover { background: #4e1f1f; transform: translateY(-2px); }',

      '.lang-fab-menu {',
      '  display: none;',
      '  position: fixed;',
      '  bottom: 84px;',
      '  right: 24px;',
      '  z-index: 9999;',
      '  background: white;',
      '  border: 1px solid #e8e0d8;',
      '  border-radius: 12px;',
      '  min-width: 170px;',
      '  box-shadow: 0 12px 40px rgba(0,0,0,0.15);',
      '  overflow: hidden;',
      '}',
      '.lang-fab-menu.open { display: block; }',

      '.lang-fab-menu a {',
      '  display: block;',
      '  padding: 12px 18px;',
      '  font-size: 14px;',
      '  color: #1a1a1a;',
      '  text-decoration: none;',
      '  transition: background 0.15s;',
      '  cursor: pointer;',
      '  font-family: "Questrial", sans-serif;',
      '}',
      '.lang-fab-menu a:hover { background: #f8f4f0; color: #6B2D2D; }',
      '.lang-fab-menu a.lang-active {',
      '  background: #f8f4f0;',
      '  color: #6B2D2D;',
      '  font-weight: 600;',
      '}',

      /* Show mobile button only below 768px */
      '@media (max-width: 768px) {',
      '  .lang-fab { display: flex; }',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  // ─── INJECT DESKTOP LANGUAGE DROPDOWN INTO NAV ───────────
  function injectDesktopDropdown() {
    var navLinks = document.querySelector('.nav-links');
    if (!navLinks) return null;

    var items = navLinks.querySelectorAll(':scope > li');
    if (items.length === 0) return null;

    // The last <li> is the CTA button — insert before it
    var lastLi = items[items.length - 1];

    // Build the dropdown <li>
    var li = document.createElement('li');
    li.className = 'lang-dropdown';

    var trigger = document.createElement('a');
    trigger.id = 'lang-trigger';
    trigger.textContent = '\uD83C\uDF10 EN'; // 🌐 EN
    li.appendChild(trigger);

    var menu = document.createElement('div');
    menu.className = 'lang-dropdown-menu';
    menu.id = 'lang-desktop-menu';

    LANGUAGES.forEach(function (lang) {
      var a = document.createElement('a');
      a.textContent = lang.native;
      a.setAttribute('data-lang', lang.code);
      a.addEventListener('click', function (e) {
        e.preventDefault();
        setLanguage(lang.code);
      });
      menu.appendChild(a);
    });

    li.appendChild(menu);
    navLinks.insertBefore(li, lastLi);

    return trigger;
  }

  // ─── INJECT MOBILE FLOATING BUTTON ───────────────────────
  function injectMobileFab() {
    // Floating action button
    var fab = document.createElement('button');
    fab.className = 'lang-fab';
    fab.id = 'lang-fab';
    fab.textContent = '\uD83C\uDF10'; // 🌐
    fab.setAttribute('aria-label', 'Change language');

    // Dropdown menu for mobile
    var menu = document.createElement('div');
    menu.className = 'lang-fab-menu';
    menu.id = 'lang-mobile-menu';

    LANGUAGES.forEach(function (lang) {
      var a = document.createElement('a');
      a.textContent = lang.native;
      a.setAttribute('data-lang', lang.code);
      a.addEventListener('click', function (e) {
        e.preventDefault();
        setLanguage(lang.code);
        menu.classList.remove('open');
      });
      menu.appendChild(a);
    });

    // Toggle menu on fab click
    fab.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.classList.toggle('open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && e.target !== fab) {
        menu.classList.remove('open');
      }
    });

    document.body.appendChild(fab);
    document.body.appendChild(menu);
  }

  // ─── STORE ORIGINAL ENGLISH TEXT ─────────────────────────
  // We store originals once so we can always fall back.
  var originalTexts = new Map();

  function storeOriginal(el) {
    if (!originalTexts.has(el)) {
      originalTexts.set(el, el.textContent.trim());
    }
  }

  // ─── TRANSLATE data-i18n ELEMENTS ────────────────────────
  function translateDataI18n(lang) {
    var els = document.querySelectorAll('[data-i18n]');
    els.forEach(function (el) {
      storeOriginal(el);
      var key = el.getAttribute('data-i18n');
      var translated = t(key, lang);
      if (translated) {
        el.textContent = translated;
      }
    });
  }

  // ─── AUTO-TRANSLATE NAV / FOOTER / BUTTONS ───────────────
  // Matches existing text content against English dictionary
  // values and replaces with the target language.

  function autoTranslateByText(lang) {
    // Collect all text nodes we want to auto-translate.
    // Target: nav links, footer headings, footer text, buttons.
    var selectors = [
      // Nav links (top-level and dropdown items)
      '.nav-links > li > a',
      '.nav-links .dropdown-menu a',
      // Footer headings and links
      '.footer-links h4',
      '.footer-brand p',
      '.footer-bottom span',
      // Buttons / CTAs found throughout pages
      '.btn-primary',
      '.btn-outline',
      '.btn-submit',
      '.nav-cta',
      // Section labels and headings (common across pages)
      '.section-label',
      '.hero-label',
      '.hero-eyebrow'
    ];

    var candidates = document.querySelectorAll(selectors.join(', '));

    candidates.forEach(function (el) {
      storeOriginal(el);
      var original = originalTexts.get(el) || el.textContent.trim();
      var key = EN_TO_KEY[original];

      if (key) {
        var translated = t(key, lang);
        if (translated) {
          el.textContent = translated;
        }
      } else {
        // Check for partial/prefix matches (e.g. "Plan a Trip to Beijing")
        Object.keys(EN_TO_KEY).forEach(function (enText) {
          if (original.indexOf(enText) === 0 && original !== enText) {
            // Prefix match — translate the prefix, keep the suffix
            var suffix = original.slice(enText.length);
            var translatedPrefix = t(EN_TO_KEY[enText], lang);
            if (translatedPrefix) {
              el.textContent = translatedPrefix + suffix;
            }
          }
        });
      }
    });
  }

  // ─── UPDATE DROPDOWN UI STATE ────────────────────────────
  function updateDropdownUI(lang) {
    var langObj = LANGUAGES.find(function (l) { return l.code === lang; });
    if (!langObj) return;

    // Update desktop trigger text
    var trigger = document.getElementById('lang-trigger');
    if (trigger) {
      trigger.textContent = '\uD83C\uDF10 ' + lang.toUpperCase(); // 🌐 XX
    }

    // Highlight active item in desktop menu
    var desktopMenu = document.getElementById('lang-desktop-menu');
    if (desktopMenu) {
      desktopMenu.querySelectorAll('a').forEach(function (a) {
        a.classList.toggle('lang-active', a.getAttribute('data-lang') === lang);
      });
    }

    // Highlight active item in mobile menu
    var mobileMenu = document.getElementById('lang-mobile-menu');
    if (mobileMenu) {
      mobileMenu.querySelectorAll('a').forEach(function (a) {
        a.classList.toggle('lang-active', a.getAttribute('data-lang') === lang);
      });
    }
  }

  // ─── SET LANGUAGE (main entry point) ─────────────────────
  function setLanguage(lang) {
    // Validate
    var valid = LANGUAGES.some(function (l) { return l.code === lang; });
    if (!valid) lang = 'en';

    // Persist
    try {
      localStorage.setItem('ctb-lang', lang);
    } catch (e) {
      // localStorage may be unavailable (private browsing, etc.)
    }

    // Set html lang attribute
    document.documentElement.lang = lang;

    // Translate data-i18n elements
    translateDataI18n(lang);

    // Auto-translate nav, footer, buttons by text matching
    autoTranslateByText(lang);

    // Update the dropdown UI
    updateDropdownUI(lang);
  }

  // ─── GET SAVED LANGUAGE ──────────────────────────────────
  function getSavedLanguage() {
    try {
      return localStorage.getItem('ctb-lang') || 'en';
    } catch (e) {
      return 'en';
    }
  }

  // ─── INITIALISE ──────────────────────────────────────────
  function init() {
    // Inject CSS for the language switcher
    injectStyles();

    // Inject the desktop dropdown into nav
    injectDesktopDropdown();

    // Inject mobile floating button
    injectMobileFab();

    // Apply saved language (or default to English)
    var saved = getSavedLanguage();
    setLanguage(saved);
  }

  // ─── BOOT ────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already ready (script loaded with defer or at bottom)
    init();
  }

})();
