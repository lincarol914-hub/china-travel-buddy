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
    'label.travel_guides': { en: 'Travel Guides', ja: '旅行ガイド', ko: '여행 가이드', es: 'Guías de Viaje', fr: 'Guides de Voyage', vi: 'Cẩm Nang Du Lịch', pt: 'Guias de Viagem' },
    'label.city_guide': { en: 'City Guide', ja: '都市ガイド', ko: '도시 가이드', es: 'Guía de la Ciudad', fr: 'Guide de la Ville', vi: 'Hướng Dẫn Thành Phố', pt: 'Guia da Cidade' },
    'label.food_guide': { en: 'Food Guide', ja: 'グルメガイド', ko: '음식 가이드', es: 'Guía Gastronómica', fr: 'Guide Culinaire', vi: 'Hướng Dẫn Ẩm Thực', pt: 'Guia Gastronômico' },
    'label.service': { en: 'Service', ja: 'サービス', ko: '서비스', es: 'Servicio', fr: 'Service', vi: 'Dịch Vụ', pt: 'Serviço' },
    'label.service_01': { en: 'Service 01', ja: 'サービス 01', ko: '서비스 01', es: 'Servicio 01', fr: 'Service 01', vi: 'Dịch Vụ 01', pt: 'Serviço 01' },
    'label.service_02': { en: 'Service 02', ja: 'サービス 02', ko: '서비스 02', es: 'Servicio 02', fr: 'Service 02', vi: 'Dịch Vụ 02', pt: 'Serviço 02' },
    'label.service_03': { en: 'Service 03', ja: 'サービス 03', ko: '서비스 03', es: 'Servicio 03', fr: 'Service 03', vi: 'Dịch Vụ 03', pt: 'Serviço 03' },
    'label.faq': { en: 'FAQ', ja: 'よくある質問', ko: '자주 묻는 질문', es: 'Preguntas Frecuentes', fr: 'FAQ', vi: 'Câu Hỏi Thường Gặp', pt: 'Perguntas Frequentes' },
    'label.common_questions': { en: 'Common Questions', ja: 'よくある質問', ko: '자주 묻는 질문', es: 'Preguntas Frecuentes', fr: 'Questions Fréquentes', vi: 'Câu Hỏi Thường Gặp', pt: 'Perguntas Frequentes' },
    'label.get_in_touch': { en: 'Get In Touch', ja: 'お問い合わせ', ko: '연락하기', es: 'Contáctenos', fr: 'Contactez-nous', vi: 'Liên Hệ', pt: 'Entre em Contato' },
    'label.get_started': { en: 'Get Started Today', ja: '今すぐ始めましょう', ko: '지금 시작하세요', es: 'Comience Hoy', fr: 'Commencez Aujourd\'hui', vi: 'Bắt Đầu Ngay', pt: 'Comece Hoje' },
    'label.about_service': { en: 'About This Service', ja: 'このサービスについて', ko: '서비스 소개', es: 'Sobre Este Servicio', fr: 'À Propos de Ce Service', vi: 'Về Dịch Vụ Này', pt: 'Sobre Este Serviço' },
    'label.whats_included': { en: "What's Included", ja: '含まれるもの', ko: '포함 사항', es: 'Qué Incluye', fr: 'Ce Qui Est Inclus', vi: 'Bao Gồm', pt: 'O Que Está Incluído' },
    'label.overview_history': { en: 'Overview & History', ja: '概要と歴史', ko: '개요 및 역사', es: 'Resumen e Historia', fr: 'Aperçu et Histoire', vi: 'Tổng Quan & Lịch Sử', pt: 'Visão Geral e História' },
    'label.weather_scenery': { en: 'Weather & Scenery', ja: '天気と景色', ko: '날씨와 풍경', es: 'Clima y Paisaje', fr: 'Météo et Paysage', vi: 'Thời Tiết & Cảnh Quan', pt: 'Clima e Paisagem' },
    'label.food_cuisine': { en: 'Food & Cuisine', ja: 'グルメ', ko: '음식과 요리', es: 'Gastronomía', fr: 'Gastronomie', vi: 'Ẩm Thực', pt: 'Gastronomia' },
    'label.things_to_do': { en: 'Things to Do', ja: '楽しめること', ko: '즐길 거리', es: 'Qué Hacer', fr: 'Activités', vi: 'Hoạt Động', pt: 'O Que Fazer' },
    'label.ready_explore': { en: 'Ready to Explore China?', ja: '中国を探検する準備はできましたか？', ko: '중국을 탐험할 준비가 되셨나요?', es: '¿Listo para Explorar China?', fr: 'Prêt à Explorer la Chine ?', vi: 'Sẵn Sàng Khám Phá Trung Quốc?', pt: 'Pronto para Explorar a China?' },
    'label.ready_explore_desc': { en: 'Let us build a personalised itinerary around the destinations that excite you most.', ja: 'あなたが最も行きたい目的地に合わせた、オーダーメイドの旅程をお作りします。', ko: '가장 설레는 여행지를 중심으로 맞춤 일정을 만들어 드립니다.', es: 'Permítanos crear un itinerario personalizado en torno a los destinos que más le entusiasman.', fr: 'Laissez-nous créer un itinéraire personnalisé autour des destinations qui vous passionnent le plus.', vi: 'Hãy để chúng tôi xây dựng lịch trình cá nhân hóa xoay quanh những điểm đến bạn yêu thích nhất.', pt: 'Deixe-nos criar um itinerário personalizado em torno dos destinos que mais te empolgam.' },

    // ── Index page ──
    'index.hero_eyebrow': { en: 'Independent China Travel Support', ja: '個人中国旅行サポート', ko: '독립 중국 여행 지원', es: 'Apoyo para Viajes Independientes a China', fr: 'Accompagnement Voyage Indépendant en Chine', vi: 'Hỗ Trợ Du Lịch Trung Quốc Độc Lập', pt: 'Suporte para Viagem Independente à China' },
    'index.hero_sub': { en: 'From pre-trip setup to tailored planning and on-trip support', ja: '渡航前の準備からオーダーメイドプランニング、旅行中のサポートまで', ko: '출발 전 준비부터 맞춤 계획, 여행 중 지원까지', es: 'Desde la preparación previa hasta la planificación personalizada y el apoyo durante el viaje', fr: 'De la préparation au voyage à la planification sur mesure et l\'assistance pendant le voyage', vi: 'Từ chuẩn bị trước chuyến đi đến lập kế hoạch và hỗ trợ trong chuyến đi', pt: 'Da preparação pré-viagem ao planejamento personalizado e suporte durante a viagem' },
    'index.why_title': { en: 'Why China Travel Buddy?', ja: 'なぜChina Travel Buddy？', ko: '왜 China Travel Buddy인가요?', es: '¿Por Qué China Travel Buddy?', fr: 'Pourquoi China Travel Buddy ?', vi: 'Tại Sao Chọn China Travel Buddy?', pt: 'Por Que o China Travel Buddy?' },
    'index.choose_support': { en: 'Choose Your Support Level', ja: 'サポートレベルを選ぶ', ko: '지원 레벨 선택', es: 'Elija Su Nivel de Soporte', fr: 'Choisissez Votre Niveau de Support', vi: 'Chọn Mức Hỗ Trợ', pt: 'Escolha Seu Nível de Suporte' },
    'index.explore_guides': { en: 'Discover What Awaits You', ja: 'あなたを待つものを発見', ko: '무엇이 기다리고 있는지 알아보세요', es: 'Descubra Lo Que Le Espera', fr: 'Découvrez Ce Qui Vous Attend', vi: 'Khám Phá Những Gì Đang Chờ Bạn', pt: 'Descubra O Que Espera Por Você' },
    'index.faq': { en: 'Frequently Asked Questions', ja: 'よくある質問', ko: '자주 묻는 질문', es: 'Preguntas Frecuentes', fr: 'Questions Fréquentes', vi: 'Câu Hỏi Thường Gặp', pt: 'Perguntas Frequentes' },
    'index.lets_talk': { en: "Let's Start A Conversation", ja: '会話を始めましょう', ko: '대화를 시작합시다', es: 'Iniciemos una Conversación', fr: 'Commençons une Conversation', vi: 'Hãy Bắt Đầu Cuộc Trò Chuyện', pt: 'Vamos Iniciar uma Conversa' },

    // ── Destinations page ──
    'dest.title': { en: "Explore China's Top Destinations", ja: '中国の人気観光地を探索', ko: '중국 인기 여행지 탐험', es: 'Explore los Mejores Destinos de China', fr: 'Explorez les Meilleures Destinations de Chine', vi: 'Khám Phá Các Điểm Đến Hàng Đầu Trung Quốc', pt: 'Explore os Melhores Destinos da China' },
    'dest.subtitle': { en: 'Discover the cities, landscapes, and cultures that make China unforgettable.', ja: '中国を忘れられないものにする都市、風景、文化を発見。', ko: '중국을 잊을 수 없게 만드는 도시, 풍경, 문화를 발견하세요.', es: 'Descubra las ciudades, paisajes y culturas que hacen de China un lugar inolvidable.', fr: 'Découvrez les villes, paysages et cultures qui rendent la Chine inoubliable.', vi: 'Khám phá các thành phố, cảnh quan và văn hóa làm nên Trung Quốc khó quên.', pt: 'Descubra as cidades, paisagens e culturas que tornam a China inesquecível.' },
    'dest.south': { en: 'South of China', ja: '中国南部', ko: '중국 남부', es: 'Sur de China', fr: 'Sud de la Chine', vi: 'Miền Nam Trung Quốc', pt: 'Sul da China' },
    'dest.north': { en: 'North of China', ja: '中国北部', ko: '중국 북부', es: 'Norte de China', fr: 'Nord de la Chine', vi: 'Miền Bắc Trung Quốc', pt: 'Norte da China' },
    'dest.middle': { en: 'Middle of China', ja: '中国中部', ko: '중국 중부', es: 'Centro de China', fr: 'Centre de la Chine', vi: 'Miền Trung Trung Quốc', pt: 'Centro da China' },

    // ── Daily Phrases page ──
    'phrases.title': { en: 'Daily Chinese Phrases', ja: '日常中国語フレーズ', ko: '일상 중국어 표현', es: 'Frases Chinas Diarias', fr: 'Phrases Chinoises Quotidiennes', vi: 'Cụm Từ Tiếng Trung Hàng Ngày', pt: 'Frases Chinesas Diárias' },
    'phrases.subtitle': { en: 'Simple, practical phrases to help you communicate confidently while travelling in China.', ja: '中国旅行中に自信を持ってコミュニケーションできる実用的なフレーズ。', ko: '중국 여행 중 자신감 있게 소통할 수 있는 간단하고 실용적인 표현.', es: 'Frases simples y prácticas para comunicarse con confianza mientras viaja por China.', fr: 'Des phrases simples et pratiques pour communiquer avec confiance en Chine.', vi: 'Những cụm từ đơn giản giúp bạn giao tiếp tự tin khi du lịch Trung Quốc.', pt: 'Frases simples e práticas para se comunicar com confiança ao viajar pela China.' },
    'phrases.protip': { en: 'Pro Tip: Show, Don\'t Say', ja: 'プロのコツ：言うより見せよう', ko: '꿀팁: 말하지 말고 보여주세요', es: 'Consejo: Muestra, No Digas', fr: 'Astuce : Montrez, Ne Dites Pas', vi: 'Mẹo: Cho Xem, Đừng Nói', pt: 'Dica: Mostre, Não Fale' },
    'phrases.eating': { en: 'Eating Out', ja: '外食', ko: '외식', es: 'Comer Fuera', fr: 'Manger au Restaurant', vi: 'Ăn Ngoài', pt: 'Comer Fora' },
    'phrases.transport': { en: 'Transportation', ja: '交通', ko: '교통', es: 'Transporte', fr: 'Transport', vi: 'Giao Thông', pt: 'Transporte' },
    'phrases.shopping': { en: 'Shopping', ja: 'ショッピング', ko: '쇼핑', es: 'Compras', fr: 'Shopping', vi: 'Mua Sắm', pt: 'Compras' },
    'phrases.help': { en: 'Asking for Help', ja: '助けを求める', ko: '도움 요청', es: 'Pedir Ayuda', fr: 'Demander de l\'Aide', vi: 'Xin Giúp Đỡ', pt: 'Pedir Ajuda' },

    // ── Food page ──
    'food.title': { en: 'Iconic Chinese Foods', ja: '中国の名物料理', ko: '중국 대표 음식', es: 'Comidas Chinas Icónicas', fr: 'Plats Chinois Emblématiques', vi: 'Ẩm Thực Trung Quốc Tiêu Biểu', pt: 'Comidas Chinesas Icônicas' },
    'food.eating': { en: 'Eating in China', ja: '中国での食事', ko: '중국에서의 식사', es: 'Comer en China', fr: 'Manger en Chine', vi: 'Ăn Uống Ở Trung Quốc', pt: 'Comer na China' },

    // ── Visa Tips page ──
    'visa.title': { en: 'China Visa Tips', ja: '中国ビザのヒント', ko: '중국 비자 팁', es: 'Consejos para Visa China', fr: 'Conseils Visa Chine', vi: 'Mẹo Visa Trung Quốc', pt: 'Dicas de Visto para China' },
    'visa.subtitle': { en: 'Everything you need to know about getting your visa sorted before travelling to China.', ja: '中国渡航前にビザを取得するために知っておくべきすべてのこと。', ko: '중국 여행 전 비자 준비에 필요한 모든 정보.', es: 'Todo lo que necesita saber para obtener su visa antes de viajar a China.', fr: 'Tout ce que vous devez savoir pour obtenir votre visa avant de voyager en Chine.', vi: 'Mọi thứ bạn cần biết để hoàn tất visa trước khi du lịch Trung Quốc.', pt: 'Tudo o que você precisa saber para obter seu visto antes de viajar para a China.' },
    'visa.need_help': { en: 'Need Help with Your Visa?', ja: 'ビザのサポートが必要ですか？', ko: '비자 도움이 필요하신가요?', es: '¿Necesita Ayuda con Su Visa?', fr: 'Besoin d\'Aide pour Votre Visa ?', vi: 'Cần Hỗ Trợ Visa?', pt: 'Precisa de Ajuda com Seu Visto?' },

    // ── Contact page ──
    'contact.title': { en: "Let's Talk About Your China Trip", ja: 'あなたの中国旅行について話しましょう', ko: '중국 여행에 대해 이야기합시다', es: 'Hablemos de Su Viaje a China', fr: 'Parlons de Votre Voyage en Chine', vi: 'Hãy Nói Về Chuyến Đi Trung Quốc Của Bạn', pt: 'Vamos Falar Sobre Sua Viagem à China' },

    // ── Service pages ──
    'svc.what_you_get': { en: 'What You Get', ja: '含まれるサービス', ko: '포함 사항', es: 'Qué Incluye', fr: 'Ce Que Vous Obtenez', vi: 'Bạn Nhận Được Gì', pt: 'O Que Você Recebe' },
    'svc.ready_started': { en: 'Ready to Get Started?', ja: '始める準備はできましたか？', ko: '시작할 준비가 되셨나요?', es: '¿Listo para Comenzar?', fr: 'Prêt à Commencer ?', vi: 'Sẵn Sàng Bắt Đầu?', pt: 'Pronto para Começar?' },
    'svc.everything_depart': { en: 'Everything You Need Before You Depart', ja: '出発前に必要なすべて', ko: '출발 전 필요한 모든 것', es: 'Todo Lo Que Necesita Antes de Partir', fr: 'Tout Ce Dont Vous Avez Besoin Avant de Partir', vi: 'Mọi Thứ Bạn Cần Trước Khi Khởi Hành', pt: 'Tudo Que Você Precisa Antes de Partir' },

    // ── Compare page ──
    'compare.title': { en: 'Choose Your Plan', ja: 'プランを選ぶ', ko: '플랜 선택', es: 'Elija Su Plan', fr: 'Choisissez Votre Forfait', vi: 'Chọn Gói Của Bạn', pt: 'Escolha Seu Plano' },
    'compare.full': { en: 'Full Feature Comparison', ja: '機能比較一覧', ko: '전체 기능 비교', es: 'Comparación Completa', fr: 'Comparaison Complète', vi: 'So Sánh Đầy Đủ', pt: 'Comparação Completa' },

    // ── City guide pages ──
    'city.sh_sub': { en: 'Where tradition meets the future', ja: '伝統と未来が出会う場所', ko: '전통과 미래가 만나는 곳', es: 'Donde la tradición se encuentra con el futuro', fr: 'Où la tradition rencontre le futur', vi: 'Nơi truyền thống gặp gỡ tương lai', pt: 'Onde a tradição encontra o futuro' },
    'city.bj_sub': { en: 'The heart of Chinese civilisation', ja: '中華文明の中心地', ko: '중국 문명의 중심', es: 'El corazón de la civilización china', fr: 'Le cœur de la civilisation chinoise', vi: 'Trái tim của nền văn minh Trung Hoa', pt: 'O coração da civilização chinesa' },
    'city.cq_sub': { en: "China's mountain city of fire and flavour", ja: '火と味の山城', ko: '불과 맛의 산악 도시', es: 'La ciudad montañosa de fuego y sabor', fr: 'La ville de montagne de feu et de saveurs', vi: 'Thành phố núi của lửa và hương vị', pt: 'A cidade montanhosa de fogo e sabor da China' },
    'city.gateway': { en: "China's Gateway to the World", ja: '中国の世界への玄関口', ko: '세계로 통하는 중국의 관문', es: 'La Puerta de China al Mundo', fr: 'La Porte de la Chine vers le Monde', vi: 'Cửa Ngõ Trung Quốc Ra Thế Giới', pt: 'O Portal da China para o Mundo' },
    'city.imperial': { en: 'An Imperial Capital for Over 800 Years', ja: '800年以上の帝都', ko: '800년 이상의 제국의 수도', es: 'Una Capital Imperial por Más de 800 Años', fr: 'Une Capitale Impériale depuis Plus de 800 Ans', vi: 'Kinh Đô Đế Quốc Hơn 800 Năm', pt: 'Uma Capital Imperial por Mais de 800 Anos' },
    'city.mountain': { en: 'The Mountain City', ja: '山の都', ko: '산의 도시', es: 'La Ciudad de la Montaña', fr: 'La Ville de la Montagne', vi: 'Thành Phố Trên Núi', pt: 'A Cidade da Montanha' },
    'city.when_visit': { en: 'When to Visit & What to See', ja: 'ベストシーズンと見どころ', ko: '방문 시기와 볼거리', es: 'Cuándo Visitar y Qué Ver', fr: 'Quand Visiter et Que Voir', vi: 'Khi Nào Đến & Xem Gì', pt: 'Quando Visitar e O Que Ver' },
    'city.taste_sh': { en: 'A Taste of Shanghai', ja: '上海の味', ko: '상하이의 맛', es: 'Un Sabor de Shanghái', fr: 'Une Saveur de Shanghai', vi: 'Hương Vị Thượng Hải', pt: 'Um Sabor de Xangai' },
    'city.cultural': { en: 'Cultural Activities & Experiences', ja: '文化活動と体験', ko: '문화 활동 및 체험', es: 'Actividades Culturales y Experiencias', fr: 'Activités Culturelles et Expériences', vi: 'Hoạt Động Văn Hóa & Trải Nghiệm', pt: 'Atividades Culturais e Experiências' },
    'city.ready_sh': { en: 'Ready to Explore Shanghai?', ja: '上海を探検する準備はできましたか？', ko: '상하이를 탐험할 준비가 되셨나요?', es: '¿Listo para Explorar Shanghái?', fr: 'Prêt à Explorer Shanghai ?', vi: 'Sẵn Sàng Khám Phá Thượng Hải?', pt: 'Pronto para Explorar Xangai?' },
    'city.ready_bj': { en: 'Ready to Explore Beijing?', ja: '北京を探検する準備はできましたか？', ko: '베이징을 탐험할 준비가 되셨나요?', es: '¿Listo para Explorar Pekín?', fr: 'Prêt à Explorer Pékin ?', vi: 'Sẵn Sàng Khám Phá Bắc Kinh?', pt: 'Pronto para Explorar Pequim?' },
    'city.ready_cq': { en: 'Ready to Explore Chongqing?', ja: '重慶を探検する準備はできましたか？', ko: '충칭을 탐험할 준비가 되셨나요?', es: '¿Listo para Explorar Chongqing?', fr: 'Prêt à Explorer Chongqing ?', vi: 'Sẵn Sàng Khám Phá Trùng Khánh?', pt: 'Pronto para Explorar Chongqing?' },

    // ── Form labels ──
    'form.first_name': { en: 'First Name *', ja: '名前 *', ko: '이름 *', es: 'Nombre *', fr: 'Prénom *', vi: 'Tên *', pt: 'Nome *' },
    'form.last_name': { en: 'Last Name', ja: '苗字', ko: '성', es: 'Apellido', fr: 'Nom', vi: 'Họ', pt: 'Sobrenome' },
    'form.email': { en: 'Email *', ja: 'メール *', ko: '이메일 *', es: 'Correo *', fr: 'Email *', vi: 'Email *', pt: 'Email *' },
    'form.message': { en: 'Message', ja: 'メッセージ', ko: '메시지', es: 'Mensaje', fr: 'Message', vi: 'Tin Nhắn', pt: 'Mensagem' }
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
      '.btn-primary', '.btn-outline', '.btn-submit', '.btn-white',
      '.nav-cta',
      // Section labels and hero content
      '.section-label', '.hero-label', '.hero-eyebrow',
      '.hero-content h1', '.hero-content p', '.hero-sub',
      // CTA sections
      '.cta-band h2', '.cta-band p',
      '.cta-card h2', '.cta-card p',
      '.cta-section h2', '.cta-section p',
      // Section headings
      '.section h2', '.section-header h2', '.section-header p',
      '.container .section-label', '.container h2',
      // City cards on destinations page
      '.city-info h2', '.city-tag', '.city-info p',
      // FAQ
      '.faq-section h2',
      // Contact form
      '.contact-inner h2', '.contact-inner > p',
      '.form-group label',
      // City guide pages
      '.content-card-body h2', '.content-card-body .section-label',
      '.activity-card h3',
      // Tip boxes
      '.tip-box h3',
      // Phrase categories
      '.category-header h2',
      // Visa cards
      '.visa-card-header h3',
      // Service pages
      '.included-item h4'
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
