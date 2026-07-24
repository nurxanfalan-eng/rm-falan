'use strict';

/* =========================================
   SCROLL & PAGE HISTORY
   ========================================= */
var scrollPositions = {};
var pageHistory = [];
var currentPage = 'home';

/* =========================================
   CORE PAGE ROUTER
   ========================================= */
function showPage(pageId, saveScroll) {
  if (saveScroll !== false) {
    scrollPositions[currentPage] = window.scrollY;
  }

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

  var savedScroll = scrollPositions[pageId];
  if (typeof savedScroll === 'number') {
    window.scrollTo(0, savedScroll);
  } else {
    window.scrollTo(0, 0);
  }

  currentPage = pageId;
}

/* =========================================
   ANA SEHIFEDEN NAVIGATION
   ========================================= */
function navigateFromHome(targetPage) {
  scrollPositions['home'] = window.scrollY;
  pageHistory.push({ page: 'home', scroll: window.scrollY });
  _switchPage(targetPage, 0);
}

/* =========================================
   GERI DUYMESI
   ========================================= */
function goBackPage(fromPage) {
  var targetPage, targetScroll;

  if (pageHistory.length > 0) {
    var prev = pageHistory.pop();
    targetPage = prev.page;
    targetScroll = prev.scroll;
  } else {
    targetPage = 'home';
    targetScroll = scrollPositions['home'] || 0;
  }

  _switchPage(targetPage, targetScroll);
}

/* =========================================
   DAXILI SEHIFE KECID
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
  }, { passive: true });

  // Optimized scroll with rAF to avoid jank
  var header = document.getElementById('main-header');
  var scrollTicking = false;
  window.addEventListener('scroll', function() {
    if (!scrollTicking) {
      window.requestAnimationFrame(function() {
        if (header) {
          header.classList.toggle('scrolled', window.scrollY > 10);
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // Preload gallery images for faster lightbox open
  var galleryImgs = document.querySelectorAll('#gallery-grid .gallery-item img');
  galleryImgs.forEach(function(img) {
    var preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = img.getAttribute('src');
    document.head.appendChild(preloadLink);
  });
});

/* =========================================
   NAV LINKLERI (tarixce ile)
   ========================================= */
document.addEventListener('DOMContentLoaded', function() {
  var navLinkEls = document.querySelectorAll('.nav-link');
  for (var i = 0; i < navLinkEls.length; i++) {
    (function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var targetPage = link.getAttribute('data-page');
        if (targetPage && targetPage !== currentPage) {
          scrollPositions[currentPage] = window.scrollY;
          pageHistory.push({ page: currentPage, scroll: window.scrollY });
          _switchPage(targetPage, 0);
        }
      });
    })(navLinkEls[i]);
  }
});

/* =========================================
   TRAINING DATA
   (Taekvondo ve MMA legv edilib)
   ========================================= */
var trainingData = {
  'trinajor-kisi': {
    icon: 'fas fa-dumbbell',
    tag: 'Fitnes',
    title: 'Trinajor (Ki\u015fi)',
    desc: 'Ki\u015fil\u0259r \u00fc\u00e7\u00fcn x\u00fcsu\u015fi haz\u0131rlanm\u0131\u015f g\u00fc\u0441 m\u0259\u015fq proqram\u0131. Pe\u015f\u0259kar m\u0259\u015fq\u00e7il\u0259rimizin r\u0259hb\u0259rliyi alt\u0131nda \u0259z\u0259l\u0259 k\u00fctl\u0259si art\u0131rmaq, g\u00fcql\u0259nm\u0259k, formada qalmaq v\u0259 sa\u011fl\u0131ql\u0131 h\u0259yat s\u00fcrmey\u0259 ba\u015flamaq \u00fc\u00e7\u00fcn ideal imkan. M\u00fcasir avadanl\u0131qlar\u0131m\u0131z v\u0259 f\u0259rdi yan\u0131\u015fmam\u0131zla h\u0259d\u0259fl\u0259riniz\u0259 \u00e7atacaqs\u0131n\u0131z.',
    prices: [
      { label: 'Ayl\u0131q', amount: 'M\u00fcra\u010di\u0259t Et' },
      { label: '3 Ayl\u0131q', amount: 'M\u00fcra\u010di\u0259t Et' },
      { label: '6 Ayl\u0131q', amount: 'M\u00fcra\u010di\u0259t Et' },
      { label: '\u0130llik', amount: 'M\u00fcra\u010di\u0259t Et' }
    ],
    features: [
      'F\u0259rdi m\u0259\u015fq plan\u0131',
      'Pe\u015f\u0259kar m\u0259\u015fq\u00e7i d\u0259st\u0259yi',
      'M\u00fcasir trinajorlar',
      'Pulsuz ilkin qiym\u0259tl\u0259ndirm\u0259',
      'Qidalanma m\u0259sl\u0259h\u0259ti',
      'İst\u0259nil\u0259n vaxt m\u0259\u015fq'
    ]
  },
  'trinajor-qadin': {
    icon: 'fas fa-heart',
    tag: 'Fitnes',
    title: 'Trinajor (Qad\u0131n)',
    desc: 'Qad\u0131nlar \u00fc\u00e7\u00fcn n\u0259z\u0259rd\u0259 tutulmu\u015f x\u00fcsu\u015fi fitnes proqram\u0131. Ar\u0131qlamaq, elastiklik qazanmaq, sa\u011flam qalmaq v\u0259 \u00f6z\u00fcn\u00fcz\u0259 olan iman\u0131 art\u0131rmaq \u00fc\u00e7\u00fcn uygun bir m\u00fchit. Rahat, t\u0259hl\u00fck\u0259siz v\u0259 motivasiya\u01371 m\u0259\u015fq m\u00fchiti il\u0259 h\u0259d\u0259fl\u0259riniz\u0259 \u00e7at\u0131n.',
    prices: [
      { label: 'Ayl\u0131q', amount: 'M\u00fcra\u010di\u0259t Et' },
      { label: '3 Ayl\u0131q', amount: 'M\u00fcra\u010di\u0259t Et' },
      { label: '6 Ayl\u0131q', amount: 'M\u00fcra\u010di\u0259t Et' },
      { label: '\u0130llik', amount: 'M\u00fcra\u010di\u0259t Et' }
    ],
    features: [
      'Qad\u0131na x\u00fcsu\u015fi proqram',
      'Pe\u015f\u0259kar m\u0259\u015fq\u00e7i d\u0259st\u0259yi',
      'Rahatl\u0131q m\u00fchiti',
      'B\u0259d\u0259n kompozisiya analizi',
      'Qidalanma m\u0259sl\u0259h\u0259ti',
      '\u00c7evik c\u0259dv\u0259l'
    ]
  },
  'kikboksinq': {
    icon: 'fas fa-fist-raised',
    tag: 'D\u00f6y\u00fc\u015f S\u0259n\u0259ti',
    title: 'Kikboksinq',
    desc: 'Boks v\u0259 karatenin birle\u015fmesinden yaranan dinamik d\u00f6y\u00fc\u015f s\u0259n\u0259ti. Kikboksinq h\u0259m \u00f6z\u00fcnm\u00fcdafi\u0259 bacar\u0131qlar\u0131, h\u0259m g\u00fc\u0441 v\u0259 \u00e7eviklik, h\u0259m d\u0259 m\u00f6ht\u0259\u015f\u0259m bir kondisiya m\u0259\u015fqi \u00fc\u00e7\u00fcn ideal se\u00e7imdir. U\u015faqlardan b\u00f6y\u00fckl\u0259r\u0259 q\u0259d\u0259r h\u0259r ya\u015f qrupu \u00fc\u00e7\u00fcn uygundu\u0440.',
    prices: [
      { label: 'Ayl\u0131q', amount: 'M\u00fcra\u010di\u0259t Et' },
      { label: '3 Ayl\u0131q', amount: 'M\u00fcra\u010di\u0259t Et' },
      { label: '6 Ayl\u0131q', amount: 'M\u00fcra\u010di\u0259t Et' },
      { label: '\u0130llik', amount: 'M\u00fcra\u010di\u0259t Et' }
    ],
    features: [
      'Texnika m\u0259\u015fqi',
      'D\u00f6y\u00fc\u015f haz\u0131rl\u0131\u011f\u0131',
      'Kondisiya inkişaf\u0131',
      'M\u00fcsabiq\u0259y\u0259 haz\u0131rl\u0131q',
      '\u00d6z\u00fcnm\u00fcdafi\u0259 bacar\u0131qlar\u0131',
      'U\u015faq qruplar\u0131 m\u00f6vcuddur'
    ]
  }
};

/* =========================================
   CAMPAIGN DATA
   ========================================= */
var campaignData = {
  'starter': {
    icon: 'fas fa-star',
    title: 'Ba\u015flanğıc Paketi',
    badge: 'Yeni',
    desc: 'Yeni ba\u015flayanlar \u00fc\u00e7\u00fcn x\u00fcsu\u015fi haz\u0131rlanm\u0131\u015f ayl\u0131q paket. \u0130lk ay endirimli qiym\u0259tl\u0259 zala qo\u015fulun! Pe\u015f\u0259kar m\u0259\u015fq\u00e7imiz sizin \u00fc\u00e7\u00fcn f\u0259rdi m\u0259\u015fq plan\u0131 haz\u0131rlayacaq v\u0259 ilk add\u0131mlar\u0131n\u0131zda sizi y\u00f6nl\u0259nd\u0259r\u0259c\u0259k.',
    features: [
      '1 ayl\u0131q abus\u0259',
      'Giri\u015f m\u0259hdudiyy\u0259tsiz',
      'Pulsuz ilkin qiym\u0259tl\u0259ndirm\u0259',
      'F\u0259rdi m\u0259\u015fq plan\u0131',
      'B\u00fct\u00fcn avadanl\u0131qlara giri\u015f',
      'M\u0259\u015fq\u00e7i d\u0259st\u0259yi'
    ]
  },
  'family': {
    icon: 'fas fa-users',
    title: 'Ail\u0259 Paketi',
    badge: 'Populyar',
    desc: 'Ail\u0259nizl\u0259 birg\u0259 m\u0259\u015fq edin, daha \u00e7ox qazanın! 2 v\u0259 daha \u00e7ox \u015f\u0259xs \u00fc\u00e7\u00fcn x\u00fcsu\u015fi endirim t\u0259tbiq edilir. Ail\u0259 olaraq sa\u011fl\u0131ql\u0131 h\u0259yat s\u00fcrmek \u00fc\u00e7\u00fcn ideal se\u00e7im. B\u00fct\u00fcn m\u0259\u015fq n\u00f6vl\u0259rini \u0259hat\u0259 edir.',
    features: [
      '2+ \u015f\u0259xs \u00fc\u00e7\u00fcn endirim',
      'B\u00fct\u00fcn m\u0259\u015fq n\u00f6vl\u0259ri daxil',
      'F\u0259rdi m\u0259\u015fq planlar\u0131',
      '\u00c7evik c\u0259dv\u0259l se\u00e7imi',
      'U\u015faq qruplar\u0131 m\u00f6vcuddur',
      '\u00d6d\u0259ni\u015f \u00fcst\u00fcnl\u00fcy\u00fc'
    ]
  },
  'student': {
    icon: 'fas fa-graduation-cap',
    title: 'T\u0259l\u0259b\u0259 Paketi',
    badge: 'T\u0259l\u0259b\u0259',
    desc: 'T\u0259l\u0259b\u0259 \u015f\u0259had\u0259tnam\u0259si il\u0259 x\u00fcsu\u015fi endirimli qiym\u0259tl\u0259 keyfiyy\u0259tli m\u0259\u015fq imkan\u0131 \u0259ld\u0259 edin. T\u0259l\u0259b\u0259 c\u0259dv\u0259lin\u0259 uygun \u00e7evik m\u0259\u015fq saatlar\u0131 il\u0259 h\u0259m oxuyun, h\u0259m d\u0259 sa\u011fl\u0131ql\u0131 qal\u0131n.',
    features: [
      'T\u0259l\u0259b\u0259 \u015f\u0259had\u0259tnam\u0259si t\u0259l\u0259b olunur',
      'X\u00fcsu\u015fi endirimli qiym\u0259t',
      '\u00c7evik c\u0259dv\u0259l se\u00e7imi',
      'B\u00fct\u00fcn imkanlara giri\u015f',
      'M\u0259\u015fq\u00e7i d\u0259st\u0259yi',
      'Ayl\u0131q \u00f6d\u0259ni\u015f imkan\u0131'
    ]
  },
  'annual': {
    icon: 'fas fa-calendar-alt',
    title: '\u0130llik Paket',
    badge: 'S\u0259rf\u0259li',
    desc: 'B\u00fct\u00fcn il boyunca s\u0131n\u0131rs\u0131z giri\u015f. \u0130llik \u00f6d\u0259ni\u015f il\u0259 \u0259n s\u0259rf\u0259li se\u00e7im. Qeydiyyat haqqı pulsuz! Uzunm\u00fcd\u0259\u0259tli \u00f6hd\u0259lik g\u00f6t\u00fcrmekl\u0259 \u0259n yax\u015f\u0131 d\u0259y\u0259ri \u0259ld\u0259 edin v\u0259 sa\u011fl\u0131ql\u0131 h\u0259yat t\u0259rzinizi davaml\u0131 edin.',
    features: [
      '12 ayl\u0131q tam abus\u0259',
      'Qeydiyyat haqqı pulsuz',
      'Prioritet xidm\u0259t',
      'B\u00fct\u00fcn m\u0259\u015fq n\u00f6vl\u0259r\u0259 giri\u015f',
      'F\u0259rdi illik proqram',
      'X\u00fcsu\u015fi VIP m\u00fcnasib\u0259t'
    ]
  }
};

/* =========================================
   OPEN TRAINING PAGE
   ========================================= */
function openTrainingPage(id) {
  var data = trainingData[id];
  if (!data) return;

  scrollPositions[currentPage] = window.scrollY;
  pageHistory.push({ page: currentPage, scroll: window.scrollY });

  var selectedPlan = data.prices[0].label;

  var priceTabsHTML = data.prices.map(function(p, idx) {
    return '<button class="price-tab' + (idx === 0 ? ' active' : '') + '" data-label="' + p.label + '" onclick="selectPriceTab(this, \'' + id + '\')">' + p.label + '</button>';
  }).join('');

  var featuresHTML = data.features.map(function(f) {
    return '<li><i class="fas fa-check-circle"></i> ' + f + '</li>';
  }).join('');

  var waMsg = encodeURIComponent(
    '\uD83E\uDD4A Salam, RM \u0130dman Klubu!\n\n' +
    'M\u0259\u015fq n\u00f6v\u00fc: ' + data.title + '\n' +
    'Plan: ' + selectedPlan + '\n' +
    'M\u00fcra\u010di\u0259t etm\u0259k ist\u0259yir\u0259m.\n\n' +
    'Z\u0259hm\u0259t olmasa \u0259laq\u0259 saxlay\u0131n.'
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
        '<div class="detail-section-title"><i class="fas fa-user-tie"></i> M\u0259\u015fq\u00e7i</div>' +
        '<div class="detail-trainer">' +
          '<img src="images/coach.jpg" alt="M\u0259\u015fq\u00e7i" class="trainer-avatar" />' +
          '<div class="trainer-info">' +
            '<h4>RM \u0130dman Klubu M\u0259\u015fq\u00e7isi</h4>' +
            '<p>Pe\u015f\u0259kar idman m\u0259\u015fq\u00e7isi. Media m\u00fcsabiqel\u0259rinin i\u015ftirak\u00e7\u0131s\u0131. T\u0259l\u0259b\u0259l\u0259rini \u00e7empionlu\u011fa aparan h\u0259v\u0259sli m\u0259\u015fq\u00e7i.</p>' +
          '</div>' +
        '</div>' +
        '<div class="detail-section-title"><i class="fas fa-list-check"></i> N\u0259 daxildir?</div>' +
        '<ul class="detail-features-list">' + featuresHTML + '</ul>' +
        '<div class="detail-section-title"><i class="fas fa-tag"></i> Abus\u0259lik N\u00f6v\u00fc Se\u00e7in</div>' +
        '<div class="price-tabs" id="price-tabs-' + id + '">' + priceTabsHTML + '</div>' +
        '<div class="detail-section-title" style="margin-top:20px"><i class="fas fa-info-circle"></i> Qiym\u0259t M\u0259lumat\u0131</div>' +
        '<div class="detail-price-info">D\u0259qiq qiym\u0259t m\u0259lumat\u0131 \u00fc\u00e7\u00fcn WhatsApp \u00fczs\u0259rind\u0259n \u0259laq\u0259 saxlay\u0131n.</div>' +
      '</div>' +
      '<div class="detail-cta">' +
        '<a href="https://wa.me/994555056722?text=' + waMsg + '" target="_blank" rel="noopener" class="btn btn-gold" id="wa-link-' + id + '"><i class="fab fa-whatsapp"></i> WhatsApp il\u0259 M\u00fcra\u010di\u0259t Et</a>' +
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
    '\uD83E\uDD4A Salam, RM \u0130dman Klubu!\n\n' +
    'M\u0259\u015fq n\u00f6v\u00fc: ' + data.title + '\n' +
    'Plan: ' + selectedLabel + '\n' +
    'M\u00fcra\u010di\u0259t etm\u0259k ist\u0259yir\u0259m.\n\n' +
    'Z\u0259hm\u0259t olmasa \u0259laq\u0259 saxlay\u0131n.'
  );

  var waLink = document.getElementById('wa-link-' + trainingId);
  if (waLink) {
    waLink.href = 'https://wa.me/994555056722?text=' + waMsg;
  }
}

/* =========================================
   OPEN CAMPAIGN PAGE
   ========================================= */
function openCampaignPage(id) {
  var data = campaignData[id];
  if (!data) return;

  scrollPositions[currentPage] = window.scrollY;
  pageHistory.push({ page: currentPage, scroll: window.scrollY });

  var featuresHTML = data.features.map(function(f) {
    return '<li><i class="fas fa-check-circle"></i> ' + f + '</li>';
  }).join('');

  var waMsg = encodeURIComponent(
    '\uD83C\uDFAF Salam, RM \u0130dman Klubu!\n\n' +
    'Kampaniya: ' + data.title + '\n' +
    'Bu kampaniya haqqında m\u0259lumat almaq ist\u0259yir\u0259m.\n\n' +
    'Z\u0259hm\u0259t olmasa \u0259laq\u0259 saxlay\u0131n.'
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
        '<div class="detail-section-title"><i class="fas fa-gift"></i> Paket\u0259 daxildir</div>' +
        '<ul class="detail-features-list">' + featuresHTML + '</ul>' +
        '<div class="detail-section-title"><i class="fas fa-info-circle"></i> Qiym\u0259t M\u0259lumat\u0131</div>' +
        '<div class="detail-price-info"><i class="fas fa-phone-alt" style="color:var(--mint);margin-right:8px"></i>D\u0259qiq qiym\u0259t m\u0259lumat\u0131 \u00fc\u00e7\u00fcn bizimle \u0259laq\u0259 saxlay\u0131n. F\u0259rdi t\u0259klifl\u0259r haz\u0131rlay\u0131r\u0131q.</div>' +
      '</div>' +
      '<div class="detail-cta">' +
        '<a href="https://wa.me/994555056722?text=' + waMsg + '" target="_blank" rel="noopener" class="btn btn-gold"><i class="fab fa-whatsapp"></i> WhatsApp il\u0259 M\u00fcra\u010di\u0259t Et</a>' +
      '</div>' +
    '</div>';

  document.getElementById('campaign-detail-hero-title').textContent = data.title;
  document.getElementById('campaign-detail-content').innerHTML = html;

  _switchPage('campaign-detail', 0);
}

/* =========================================
   LIGHTBOX (with navigation)
   ========================================= */
var lightboxImages = [];
var lightboxIndex = 0;

function buildLightboxImages() {
  lightboxImages = [];
  var items = document.querySelectorAll('#gallery-grid .gallery-item img');
  for (var i = 0; i < items.length; i++) {
    lightboxImages.push({ src: items[i].src, alt: items[i].alt });
  }
}

function openLightbox(index) {
  buildLightboxImages();
  if (!lightboxImages.length) return;
  lightboxIndex = index;
  _showLightboxImage();
  var lightbox = document.getElementById('lightbox');
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function _showLightboxImage() {
  var lbImg = document.getElementById('lightbox-img');
  var counter = document.getElementById('lightbox-counter');
  var item = lightboxImages[lightboxIndex];
  if (!item) return;
  lbImg.src = item.src;
  lbImg.alt = item.alt;
  if (counter) {
    counter.textContent = (lightboxIndex + 1) + ' / ' + lightboxImages.length;
  }
}

function lightboxNav(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  _showLightboxImage();
}

function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeLightbox(); }
  if (e.key === 'ArrowRight') { lightboxNav(1); }
  if (e.key === 'ArrowLeft') { lightboxNav(-1); }
});

// Lightbox: backdrop click to close (only on overlay, not nav buttons/img)
document.addEventListener('DOMContentLoaded', function() {
  var lb = document.getElementById('lightbox');
  if (lb) {
    lb.addEventListener('click', function(e) {
      if (e.target === lb) { closeLightbox(); }
    });
  }

  // Touch/swipe support for lightbox
  var touchStartX = 0;
  if (lb) {
    lb.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    lb.addEventListener('touchend', function(e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) { lightboxNav(dx < 0 ? 1 : -1); }
    }, { passive: true });
  }
});

/* =========================================
   PREVENT URL CHANGES / POPSTATE
   ========================================= */
window.addEventListener('popstate', function(e) {
  e.preventDefault();
  e.stopPropagation();
});
