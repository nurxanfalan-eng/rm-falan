'use strict';

/* =========================================
   PAGE ROUTER — No URL hash/query changes
   ========================================= */
var currentPage = 'home';

function showPage(pageId) {
  // Hide all pages
  var pages = document.querySelectorAll('.page');
  pages.forEach(function(p) {
    p.classList.remove('active');
  });

  // Show target page
  var target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    currentPage = pageId;
  }

  // Update nav active state
  var links = document.querySelectorAll('.nav-link');
  links.forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    }
  });

  // Close mobile nav
  closeMobileNav();

  // Scroll to top instantly
  window.scrollTo({ top: 0, behavior: 'instant' });
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

  // Close nav on outside click
  document.addEventListener('click', function(e) {
    if (navLinks && navLinks.classList.contains('open')) {
      if (!e.target.closest('.navbar')) {
        closeMobileNav();
      }
    }
  });

  // Navbar scroll effect
  var header = document.getElementById('main-header');
  window.addEventListener('scroll', function() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }
  }, { passive: true });
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
   OPEN TRAINING MODAL
   ========================================= */
function openTraining(id) {
  var data = trainingData[id];
  if (!data) return;

  var priceHTML = data.prices.map(function(p) {
    return '<div class="price-item"><span class="price-label">' + p.label + '</span><span class="price-amount">' + p.amount + '</span></div>';
  }).join('');

  var featuresHTML = data.features.map(function(f) {
    return '<li><i class="fas fa-check-circle"></i> ' + f + '</li>';
  }).join('');

  var waMsg = encodeURIComponent(
    '🥊 Salam, RM İdman Klubu!\n\n' +
    'Məşq növü: ' + data.title + '\n' +
    'Müraciət etmək istəyirəm.\n\n' +
    'Zəhmət olmasa əlaqə saxlayın.'
  );

  var html =
    '<div class="modal-header">' +
      '<div class="modal-header-icon"><i class="' + data.icon + '"></i></div>' +
      '<div>' +
        '<div class="modal-tag">' + data.tag + '</div>' +
        '<h2>' + data.title + '</h2>' +
      '</div>' +
    '</div>' +
    '<div class="modal-body">' +
      '<p class="modal-desc">' + data.desc + '</p>' +
      '<div class="modal-section-title"><i class="fas fa-user-tie" style="margin-right:8px"></i>Məşqçi</div>' +
      '<div class="modal-trainer">' +
        '<img src="images/coach.jpg" alt="Məşqçi" class="trainer-avatar" />' +
        '<div class="trainer-info">' +
          '<h4>RM İdman Klubu Məşqçisi</h4>' +
          '<p>Peşəkar idman məşqçisi. Media müsahibələrinin iştirakçısı. Tələbələrini çempionluğa aparan həvəsli məşqçi.</p>' +
        '</div>' +
      '</div>' +
      '<div class="modal-section-title"><i class="fas fa-list-check" style="margin-right:8px"></i>Nə daxildir?</div>' +
      '<ul class="modal-features-list">' + featuresHTML + '</ul>' +
      '<div class="modal-section-title"><i class="fas fa-tag" style="margin-right:8px"></i>Qiymətlər</div>' +
      '<div class="modal-price-grid">' + priceHTML + '</div>' +
    '</div>' +
    '<div class="modal-cta">' +
      '<a href="https://wa.me/994559406018?text=' + waMsg + '" target="_blank" rel="noopener" class="btn btn-gold"><i class="fab fa-whatsapp"></i> WhatsApp ilə Müraciət Et</a>' +
      '<button class="btn btn-outline" onclick="closeModal(\'training-modal\')">Bağla</button>' +
    '</div>';

  document.getElementById('training-modal-content').innerHTML = html;
  document.getElementById('training-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* =========================================
   OPEN CAMPAIGN MODAL
   ========================================= */
function openCampaign(id) {
  var data = campaignData[id];
  if (!data) return;

  var featuresHTML = data.features.map(function(f) {
    return '<li><i class="fas fa-check-circle"></i> ' + f + '</li>';
  }).join('');

  var waMsg = encodeURIComponent(
    '🎯 Salam, RM İdman Klubu!\n\n' +
    'Kampaniya: ' + data.title + '\n' +
    'Bu kampaniya haqqında məlumat almaq istəyirəm.\n\n' +
    'Zəhmət olmasa əlaqə saxlayın.'
  );

  var html =
    '<div class="modal-header">' +
      '<div class="modal-header-icon"><i class="' + data.icon + '"></i></div>' +
      '<div>' +
        '<div class="modal-tag">' + data.badge + '</div>' +
        '<h2>' + data.title + '</h2>' +
      '</div>' +
    '</div>' +
    '<div class="modal-body">' +
      '<p class="modal-desc">' + data.desc + '</p>' +
      '<div class="modal-section-title"><i class="fas fa-gift" style="margin-right:8px"></i>Paketə daxildir</div>' +
      '<ul class="modal-features-list">' + featuresHTML + '</ul>' +
      '<div class="modal-section-title"><i class="fas fa-info-circle" style="margin-right:8px"></i>Qiymət Məlumatı</div>' +
      '<div style="background:var(--dark3);border:1px solid rgba(212,175,55,0.2);border-radius:10px;padding:18px;color:var(--gray-light);font-size:0.9rem;line-height:1.7;">' +
        '<i class="fas fa-phone-alt" style="color:var(--gold);margin-right:8px"></i>' +
        'Dəqiq qiymət məlumatı üçün bizimlə əlaqə saxlayın. Fərdi təkliflər hazırlayırıq.' +
      '</div>' +
    '</div>' +
    '<div class="modal-cta">' +
      '<a href="https://wa.me/994559406018?text=' + waMsg + '" target="_blank" rel="noopener" class="btn btn-gold"><i class="fab fa-whatsapp"></i> WhatsApp ilə Müraciət Et</a>' +
      '<button class="btn btn-outline" onclick="closeModal(\'campaign-modal\')">Bağla</button>' +
    '</div>';

  document.getElementById('campaign-modal-content').innerHTML = html;
  document.getElementById('campaign-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* =========================================
   CLOSE MODAL
   ========================================= */
function closeModal(id) {
  var modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close modals with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal('training-modal');
    closeModal('campaign-modal');
    closeLightbox();
  }
});

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

/* =========================================
   PREVENT BACK/FORWARD URL CHANGES
   ========================================= */
// Override history methods to prevent any URL change
(function() {
  var noop = function() {};
  // Keep history methods but prevent any state that would change visible URL
  window.addEventListener('popstate', function(e) {
    e.preventDefault();
    e.stopPropagation();
  });
})();
