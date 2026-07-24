'use strict';

/* =========================================
   SCROLL & PAGE HISTORY
   Her sehife ucun scroll pozisiyasini saxla
   ========================================= */
var scrollPositions = {};

// Sehife tarixcesi - geri ucun
var pageHistory = [];
var currentPage = 'home';

/* =========================================
   CORE PAGE ROUTER
   ========================================= */
function showPage(pageId, saveScroll) {
  // Indiki sehifenin scroll pozisiyasini saxla
  if (saveScroll !== false) {
    scrollPositions[currentPage] = window.scrollY;
  }

  // Butun sehifeleri gizlet
  var pages = document.querySelectorAll('.page');
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove('active');
  }

  // Heden sehifeni goster
  var target = document.getElementById('page-' + pageId);
  if (!target) return;
  target.classList.add('active');

  // Nav linkleri yenile
  var links = document.querySelectorAll('.nav-link');
  for (var j = 0; j < links.length; j++) {
    links[j].classList.remove('active');
    if (links[j].getAttribute('data-page') === pageId) {
      links[j].classList.add('active');
    }
  }

  closeMobileNav();

  // Scroll pozisiyasini berpa et ve ya uste qal
  var savedScroll = scrollPositions[pageId];
  if (typeof savedScroll === 'number') {
    window.scrollTo(0, savedScroll);
  } else {
    window.scrollTo(0, 0);
  }

  currentPage = pageId;
}

/* =========================================
   ANA SEHIFEDEN NAVIGATION (scroll pozisiyasini saxlayir)
   ========================================= */
function navigateFromHome(targetPage) {
  // Indiki scroll pozisiyasini saxla
  scrollPositions['home'] = window.scrollY;
  // Tarixceye elave et
  pageHistory.push({ page: 'home', scroll: window.scrollY });
  // Heden sehifeye kec (scroll saxlama olmadan)
  _switchPage(targetPage, 0);
}

/* =========================================
   GERI DUYMELERI UCUN FUNKSIYA
   Heden sehifeden onceki sehifeye qayit
   ========================================= */
function goBackPage(fromPage) {
  var targetPage, targetScroll;

  // Tarixcede bir onceki sehifeye bax
  if (pageHistory.length > 0) {
    var prev = pageHistory.pop();
    targetPage = prev.page;
    targetScroll = prev.scroll;
  } else {
    // Tarixce yoxdursa, default olaraq ana sehife
    targetPage = 'home';
    targetScroll = scrollPositions['home'] || 0;
  }

  _switchPage(targetPage, targetScroll);
}

/* =========================================
   DAXILI SEHIFE KECID FUNKSIYASI
   ========================================= */
function _switchPage(pageId, scrollY) {
  var pages = document.querySelectorAll('.page');
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove('active');
  }

  var target = document.getElementById('page-' + pageId);
  if (!target) return;
  target.classList.add('active');

  var links = document.querySelectorAll('.nav-link');
  for (var j = 0; j < links.length; j++) {
    links[j].classList.remove('active');
    if (links[j].getAttribute('data-page') === pageId) {
      links[j].classList.add('active');
    }
  }

  closeMobileNav();
  currentPage = pageId;

  // Scroll pozisiyasini berpa et
  if (typeof scrollY === 'number') {
    window.scrollTo(0, scrollY);
  } else {
    window.scrollTo(0, 0);
  }
}

/* =========================================
   MOBILE NAV
   ========================================= */
function closeMobileNav() {
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');
  if (hamburger) hamburger.classList.remove('open');
  if (navLinks) navLinks.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function() {
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  document.addEventListener('click', function(e) {
    if (navLinks && navLinks.classList.contains('open')) {
      if (!e.target.closest('.navbar')) {
        closeMobileNav();
      }
    }
  });

  var header = document.getElementById('main-header');
  window.addEventListener('scroll', function() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }
  }, { passive: true });
});

/* =========================================
   NAV LINKLERINDEN KECID (tarixce ile)
   ========================================= */
// Nav linklerini tutub tarixcede saxla
document.addEventListener('DOMContentLoaded', function() {
  var navLinkEls = document.querySelectorAll('.nav-link');
  for (var i = 0; i < navLinkEls.length; i++) {
    (function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var targetPage = link.getAttribute('data-page');
        if (targetPage && targetPage !== currentPage) {
          // Indiki scroll pozisiyasini saxla
          scrollPositions[currentPage] = window.scrollY;
          // Tarixceye elave et
          pageHistory.push({ page: currentPage, scroll: window.scrollY });
          // Sehifeye kec (scroll 0-dan basla)
          _switchPage(targetPage, 0);
        }
      });
    })(navLinkEls[i]);
  }
});

/* =========================================
   TRAINING DATA
   ========================================= */
var trainingData = {
  'trinajor-kisi': {
    icon: 'fas fa-dumbbell',
    tag: 'Fitnes',
    title: 'Trinajor (Kişi)',
    desc: 'Kişilər üçün xüsusi hazırlanmış güc məşq proqramı. Peşəkar məşqçilərimizin rəhbərliyi altında əzələ kütləsi artırmaq, güclənmək, formada qalmaq və sağlıqlı həyat sürməyə başlamaq üçün ideal imkan. Müasir avadanlıqlarımız və fərdi yanaşmamızla hədəflərinizə çatacaqsınız.',
    prices: [
      { label: 'Aylıq', amount: 'Müraciət Et' },
      { label: '3 Aylıq', amount: 'Müraciət Et' },
      { label: '6 Aylıq', amount: 'Müraciət Et' },
      { label: 'İllik', amount: 'Müraciət Et' }
    ],
    features: [
      'Fərdi məşq planı',
      'Peşəkar məşqçi dəstəyi',
      'Müasir trinajorlar',
      'Pulsuz ilkin qiymətləndirmə',
      'Qidalanma məsləhəti',
      'İstənilən vaxt məşq'
    ]
  },
  'trinajor-qadin': {
    icon: 'fas fa-heart',
    tag: 'Fitnes',
    title: 'Trinajor (Qadın)',
    desc: 'Qadınlar üçün nəzərdə tutulmuş xüsusi fitnes proqramı. Arıqlamaq, elastiklik qazanmaq, sağlam qalmaq və özünüzə olan inamı artırmaq üçün uyğun bir mühit. Rahat, təhlükəsiz və motivasiyalı məşq mühiti ilə hədəflərinizə çatın.',
    prices: [
      { label: 'Aylıq', amount: 'Müraciət Et' },
      { label: '3 Aylıq', amount: 'Müraciət Et' },
      { label: '6 Aylıq', amount: 'Müraciət Et' },
      { label: 'İllik', amount: 'Müraciət Et' }
    ],
    features: [
      'Qadına xüsusi proqram',
      'Peşəkar məşqçi dəstəyi',
      'Rahatlıq mühiti',
      'Bədən kompozisiya analizi',
      'Qidalanma məsləhəti',
      'Çevik cədvəl'
    ]
  },
  'kikboksinq': {
    icon: 'fas fa-fist-raised',
    tag: 'Döyüş Sənəti',
    title: 'Kikboksinq',
    desc: 'Boks və karatenin birləşməsindən yaranan dinamik döyüş sənəti. Kikboksinq həm özünümüdafiə bacarıqları, həm güc və çeviklik, həm də möhtəşəm bir kondisiya məşqi üçün ideal seçimdir. Uşaqlardan böyüklərə qədər hər yaş qrupu üçün uyğundur.',
    prices: [
      { label: 'Aylıq', amount: 'Müraciət Et' },
      { label: '3 Aylıq', amount: 'Müraciət Et' },
      { label: '6 Aylıq', amount: 'Müraciət Et' },
      { label: 'İllik', amount: 'Müraciət Et' }
    ],
    features: [
      'Texnika məşqi',
      'Döyüş hazırlığı',
      'Kondisiya inkişafı',
      'Müsabiqəyə hazırlıq',
      'Özünümüdafiə bacarıqları',
      'Uşaq qrupları mövcuddur'
    ]
  },
  'taekvondo': {
    icon: 'fas fa-shoe-prints',
    tag: 'Döyüş Sənəti',
    title: 'Taekvondo',
    desc: 'Koreya mənşəli döyüş sənəti olan Taekvondo – ayaq zərbələrinin ustalığı, intizam, özünəinam ilə tanınır. Olimpik idman növü kimi dünyada geniş yayılmış Taekvondo, hər yaşdan insanlar üçün fiziki və mənəvi inkişaf imkanı verir.',
    prices: [
      { label: 'Aylıq', amount: 'Müraciət Et' },
      { label: '3 Aylıq', amount: 'Müraciət Et' },
      { label: '6 Aylıq', amount: 'Müraciət Et' },
      { label: 'İllik', amount: 'Müraciət Et' }
    ],
    features: [
      'Olimpik qaydalara uyğun',
      'Forma (dobok) daxil',
      'Bant sistemi',
      'Yarışlara hazırlıq',
      'İntizam və özünüidarə',
      'Uşaq və yetkin qrupları'
    ]
  },
  'mma': {
    icon: 'fas fa-fire',
    tag: 'Döyüş Sənəti',
    title: 'MMA (Mixed Martial Arts)',
    desc: 'Mixed Martial Arts – bütün döyüş sənətlərinin birləşməsi. Boks, güləş, jiu-jitsu, muay thai elementlərini özündə birləşdirən MMA ən tam döyüş sistemidir. Güclü, sürətli, çevik olmaq istəyənlər üçün peşəkar MMA proqramımız sizi bütün cəhətdən hazırlayır.',
    prices: [
      { label: 'Aylıq', amount: 'Müraciət Et' },
      { label: '3 Aylıq', amount: 'Müraciət Et' },
      { label: '6 Aylıq', amount: 'Müraciət Et' },
      { label: 'İllik', amount: 'Müraciət Et' }
    ],
    features: [
      'Grappling texnikaları',
      'Zərbə texnikaları',
      'Kondisiya məşqi',
      'Sparring seansları',
      'Video analiz',
      'Yarış hazırlığı'
    ]
  }
};

/* =========================================
   CAMPAIGN DATA
   ========================================= */
var campaignData = {
  'starter': {
    icon: 'fas fa-star',
    title: 'Başlanğıc Paketi',
    badge: 'Yeni',
    desc: 'Yeni başlayanlar üçün xüsusi hazırlanmış aylıq paket. İlk ay endirimli qiymətlə zala qoşulun! Peşəkar məşqçimiz sizin üçün fərdi məşq planı hazırlayacaq və ilk addımlarınızda sizi yönləndirəcək.',
    features: [
      '1 aylıq abunə',
      'Giriş məhdudiyyətsiz',
      'Pulsuz ilkin qiymətləndirmə',
      'Fərdi məşq planı',
      'Bütün avadanlıqlara giriş',
      'Məşqçi dəstəyi'
    ]
  },
  'family': {
    icon: 'fas fa-users',
    title: 'Ailə Paketi',
    badge: 'Populyar',
    desc: 'Ailənizlə birgə məşq edin, daha çox qazanın! 2 və daha çox şəxs üçün xüsusi endirim tətbiq edilir. Ailə olaraq sağlıqlı həyat sürmək üçün ideal seçim. Bütün məşq növlərini əhatə edir.',
    features: [
      '2+ şəxs üçün endirim',
      'Bütün məşq növləri daxil',
      'Fərdi məşq planları',
      'Çevik cədvəl seçimi',
      'Uşaq qrupları mövcuddur',
      'Ödəniş üstünlüyü'
    ]
  },
  'student': {
    icon: 'fas fa-graduation-cap',
    title: 'Tələbə Paketi',
    badge: 'Tələbə',
    desc: 'Tələbə şəhadətnaməsi ilə xüsusi endirimli qiymətlə keyfiyyətli məşq imkanı əldə edin. Tələbə cədvəlinə uyğun çevik məşq saatları ilə həm oxuyun, həm də sağlıqlı qalın.',
    features: [
      'Tələbə şəhadətnaməsi tələb olunur',
      'Xüsusi endirimli qiymət',
      'Çevik cədvəl seçimi',
      'Bütün imkanlara giriş',
      'Məşqçi dəstəyi',
      'Aylıq ödəniş imkanı'
    ]
  },
  'annual': {
    icon: 'fas fa-calendar-alt',
    title: 'İllik Paket',
    badge: 'Sərfəli',
    desc: 'Bütün il boyunca sınırsız giriş. İllik ödəniş ilə ən sərfəli seçim. Qeydiyyat haqqı pulsuz! Uzunmüddətli öhdəlik götürməklə ən yaxşı dəyəri əldə edin və sağlıqlı həyat tərzinizi davamlı edin.',
    features: [
      '12 aylıq tam abunə',
      'Qeydiyyat haqqı pulsuz',
      'Prioritet xidmət',
      'Bütün məşq növlərə giriş',
      'Fərdi illik proqram',
      'Xüsusi VIP münasibet'
    ]
  }
};

/* =========================================
   OPEN TRAINING PAGE
   ========================================= */
function openTrainingPage(id) {
  var data = trainingData[id];
  if (!data) return;

  // Indiki scroll pozisiyasini saxla
  scrollPositions[currentPage] = window.scrollY;
  // Tarixceye elave et
  pageHistory.push({ page: currentPage, scroll: window.scrollY });

  var selectedPlan = 'Aylıq';

  var priceTabsHTML = data.prices.map(function(p, idx) {
    return '<button class="price-tab' + (idx === 0 ? ' active' : '') + '" data-label="' + p.label + '" onclick="selectPriceTab(this, \'' + id + '\')">' + p.label + '</button>';
  }).join('');

  var featuresHTML = data.features.map(function(f) {
    return '<li><i class="fas fa-check-circle"></i> ' + f + '</li>';
  }).join('');

  var waMsg = encodeURIComponent(
    '\uD83E\uDD4A Salam, RM İdman Klubu!\n\n' +
    'Məşq növü: ' + data.title + '\n' +
    'Plan: ' + selectedPlan + '\n' +
    'Müraciət etmək istəyirəm.\n\n' +
    'Zəhmət olmasa əlaqə saxlayın.'
  );

  var html =
    '<div class="detail-page-card">' +
      '<div class="detail-header">' +
        '<div class="detail-header-icon"><i class="' + data.icon + '"></i></div>' +
        '<div>' +
          '<div class="detail-tag">' + data.tag + '</div>' +
          '<h2>' + data.title + '</h2>' +
        '</div>' +
      '</div>' +
      '<div class="detail-body">' +
        '<p class="detail-desc">' + data.desc + '</p>' +
        '<div class="detail-section-title"><i class="fas fa-user-tie"></i> Məşqçi</div>' +
        '<div class="detail-trainer">' +
          '<img src="images/coach.jpg" alt="Məşqçi" class="trainer-avatar" />' +
          '<div class="trainer-info">' +
            '<h4>RM İdman Klubu Məşqçisi</h4>' +
            '<p>Peşəkar idman məşqçisi. Media müsahibələrinin iştirakçısı. Tələbələrini çempionluğa aparan həvəsli məşqçi.</p>' +
          '</div>' +
        '</div>' +
        '<div class="detail-section-title"><i class="fas fa-list-check"></i> Nə daxildir?</div>' +
        '<ul class="detail-features-list">' + featuresHTML + '</ul>' +
        '<div class="detail-section-title"><i class="fas fa-tag"></i> Abunəlik Növü Seçin</div>' +
        '<div class="price-tabs" id="price-tabs-' + id + '">' + priceTabsHTML + '</div>' +
        '<div class="detail-section-title" style="margin-top:20px"><i class="fas fa-info-circle"></i> Qiymət Məlumatı</div>' +
        '<div class="detail-price-info">Dəqiq qiymət məlumatı üçün WhatsApp üzərindən əlaqə saxlayın.</div>' +
      '</div>' +
      '<div class="detail-cta">' +
        '<a href="https://wa.me/994559406018?text=' + waMsg + '" target="_blank" rel="noopener" class="btn btn-gold" id="wa-link-' + id + '"><i class="fab fa-whatsapp"></i> WhatsApp ilə Müraciət Et</a>' +
      '</div>' +
    '</div>';

  document.getElementById('training-detail-hero-title').textContent = data.title;
  document.getElementById('training-detail-content').innerHTML = html;

  _switchPage('training-detail', 0);
}

function selectPriceTab(btn, trainingId) {
  var tabs = btn.closest('.price-tabs').querySelectorAll('.price-tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }
  btn.classList.add('active');

  var selectedLabel = btn.getAttribute('data-label');
  var data = trainingData[trainingId];
  if (!data) return;

  var waMsg = encodeURIComponent(
    '\uD83E\uDD4A Salam, RM İdman Klubu!\n\n' +
    'Məşq növü: ' + data.title + '\n' +
    'Plan: ' + selectedLabel + '\n' +
    'Müraciət etmək istəyirəm.\n\n' +
    'Zəhmət olmasa əlaqə saxlayın.'
  );

  var waLink = document.getElementById('wa-link-' + trainingId);
  if (waLink) {
    waLink.href = 'https://wa.me/994559406018?text=' + waMsg;
  }
}

/* =========================================
   OPEN CAMPAIGN PAGE
   ========================================= */
function openCampaignPage(id) {
  var data = campaignData[id];
  if (!data) return;

  // Indiki scroll pozisiyasini saxla
  scrollPositions[currentPage] = window.scrollY;
  // Tarixceye elave et
  pageHistory.push({ page: currentPage, scroll: window.scrollY });

  var featuresHTML = data.features.map(function(f) {
    return '<li><i class="fas fa-check-circle"></i> ' + f + '</li>';
  }).join('');

  var waMsg = encodeURIComponent(
    '\uD83C\uDFAF Salam, RM İdman Klubu!\n\n' +
    'Kampaniya: ' + data.title + '\n' +
    'Bu kampaniya haqqında məlumat almaq istəyirəm.\n\n' +
    'Zəhmət olmasa əlaqə saxlayın.'
  );

  var html =
    '<div class="detail-page-card">' +
      '<div class="detail-header">' +
        '<div class="detail-header-icon"><i class="' + data.icon + '"></i></div>' +
        '<div>' +
          '<div class="detail-tag">' + data.badge + '</div>' +
          '<h2>' + data.title + '</h2>' +
        '</div>' +
      '</div>' +
      '<div class="detail-body">' +
        '<p class="detail-desc">' + data.desc + '</p>' +
        '<div class="detail-section-title"><i class="fas fa-gift"></i> Paketə daxildir</div>' +
        '<ul class="detail-features-list">' + featuresHTML + '</ul>' +
        '<div class="detail-section-title"><i class="fas fa-info-circle"></i> Qiymət Məlumatı</div>' +
        '<div class="detail-price-info"><i class="fas fa-phone-alt" style="color:var(--gold);margin-right:8px"></i>Dəqiq qiymət məlumatı üçün bizimlə əlaqə saxlayın. Fərdi təkliflər hazırlayırıq.</div>' +
      '</div>' +
      '<div class="detail-cta">' +
        '<a href="https://wa.me/994559406018?text=' + waMsg + '" target="_blank" rel="noopener" class="btn btn-gold"><i class="fab fa-whatsapp"></i> WhatsApp ilə Müraciət Et</a>' +
      '</div>' +
    '</div>';

  document.getElementById('campaign-detail-hero-title').textContent = data.title;
  document.getElementById('campaign-detail-content').innerHTML = html;

  _switchPage('campaign-detail', 0);
}

/* =========================================
   LIGHTBOX
   ========================================= */
function openLightbox(el) {
  var img = el.querySelector('img');
  if (!img) return;
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

/* =========================================
   PREVENT URL CHANGES / POPSTATE
   ========================================= */
window.addEventListener('popstate', function(e) {
  e.preventDefault();
  e.stopPropagation();
});
