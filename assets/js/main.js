
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

// Certificate
function tampilkanSemuaCertificate() {
  $.getJSON('data/certificate.json', function(data) {
    let certificate = data.certificate;
    let content = '';
    $.each(certificate, function(i, data) {
        content += '<div class="col-lg-6 col-md-6 certificate-item"><div class="certificate-wrap"><img src="' + data.foto + '" class="img-fluid" alt=""><div class="certificate-info"><h4>' + data.keterangan + '</h4><p>' + data.nama + '</p><div class="certificate-links"><a href="' + data.foto + '" data-gallery="certificateGallery" class="certificate-lightbox" title="' + data.nama + '"><i class="bx bx-plus"></i></a></div></div></div></div>';
    });
    $('#certificate-container').html(content);
    GLightbox({ selector: '.certificate-lightbox' });
  });
}

tampilkanSemuaCertificate();

$('.data-filter-certificate').on('click', function() {

  $('.data-filter-certificate').removeClass('filter-active');
  $(this).addClass('filter-active');

  let kategori = $(this).html();

  if (kategori == 'All') {
    tampilkanSemuaCertificate();
    return;
  }
  
  $.getJSON('data/certificate.json', function(data) {
    let certificate = data.certificate;
    let content = '';

    $.each(certificate, function (i, data) {
      if (data.kategori == kategori) {
        content += '<div class="col-lg-6 col-md-6 certificate-item"><div class="certificate-wrap"><img src="' + data.foto + '" class="img-fluid" alt=""><div class="certificate-info"><h4>' + data.keterangan + '</h4><p>' + data.nama + '</p><div class="certificate-links"><a href="' + data.foto + '" data-gallery="certificateGallery" class="certificate-lightbox" title="' + data.nama + '"><i class="bx bx-plus"></i></a></div></div></div></div>';
      }
    });

    $('#certificate-container').html(content);
    GLightbox({ selector: '.certificate-lightbox' });
  });

});

// PORTFOLIO
function tampilkanSemuaPortfolio() {
  $.getJSON('data/data.json', function(data) {
    let portfolio = data.portfolio;
    let content = '';

    $.each(portfolio, function(i, data) {
        content += '<div class="col-lg-4 col-md-6 portfolio-item"><div class="portfolio-wrap"><img src="' + data.foto + '" class="img-fluid" alt="' + data.nama + '"><div class="portfolio-info"><h4>' + data.kategori + '</h4><p>' + data.nama + '</p><div class="portfolio-links"><a href="' + data.foto + '" data-gallery="portfolioGallery" class="portfolio-lightbox" title="' + data.nama + '"><i class="bx bx-plus"></i></a><a href="portfolio-details.html?id=' + data.id + '" data-gallery="portfolioDetailsGallery" data-glightbox="type: external" class="portfolio-details-lightbox" title="Portfolio Details"><i class="bx bx-link"></i></a></div></div></div></div>';
    });

    $('#portfolio-container').html(content);

    GLightbox({ selector: '.portfolio-lightbox' });
    GLightbox({ selector: '.portfolio-details-lightbox', width: '90%', height: '90vh' });
  });
}

tampilkanSemuaPortfolio();


$('.data-filter').on('click', function() {

  $('.data-filter').removeClass('filter-active');
  $(this).addClass('filter-active');

  let kategori = $(this).html();

  if (kategori == 'All') {
    tampilkanSemuaPortfolio();
    return;
  }
  
  $.getJSON('data/data.json', function(data) {
    let portfolio = data.portfolio;
    let content = '';

    $.each(portfolio, function (i, data) {
      if (data.kategori == kategori) {
        content += '<div class="col-lg-4 col-md-6 portfolio-item"><div class="portfolio-wrap"><img src="' + data.foto + '" class="img-fluid" alt="' + data.nama + '"><div class="portfolio-info"><h4>' + data.kategori + '</h4><p>' + data.nama + '</p><div class="portfolio-links"><a href="' + data.foto + '" data-gallery="portfolioGallery" class="portfolio-lightbox" title="' + data.nama + '"><i class="bx bx-plus"></i></a><a href="portfolio-details.html?id=' + data.id + '" data-gallery="portfolioDetailsGallery" data-glightbox="type: external" class="portfolio-details-lightbox" title="Portfolio Details"><i class="bx bx-link"></i></a></div></div></div></div>';
      }
    });

    $('#portfolio-container').html(content);
    GLightbox({ selector: '.portfolio-lightbox' });
    GLightbox({ selector: '.portfolio-details-lightbox', width: '90%', height: '90vh' });
  });

});

// DETAIL

(function() {
  "use strict";

  // Fungsi untuk menampilkan detail portfolio berdasarkan ID
  function tampilkanDetailPortfolio() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    console.log("ID dari URL:", id); // Debug log

    if (id) {
      $.getJSON('data/data.json', function(data) {
        console.log("Data JSON diterima:", data); // Debug log

        let portfolio = data.portfolio;
        let selectedPortfolio = portfolio.find(item => item.id == id);

        console.log("Data portfolio yang dipilih:", selectedPortfolio); // Debug log

        if (selectedPortfolio) {
          $('#portfolio-detail').html(`
            <div class="col-lg-7">
            <h3 class="portfolio-title">Detail Project ${selectedPortfolio.nama}</h3>

            <div class="portfolio-details-slider swiper">
              <div class="swiper-wrapper align-items-center">

                <div class="swiper-slide">
                  <img src="${selectedPortfolio.foto}" alt="">
                </div>

                <div class="swiper-slide">
                  <img src="${selectedPortfolio.foto_detail_1}" alt="">
                </div>

                <div class="swiper-slide">
                  <img src="${selectedPortfolio.foto_detail_2}" alt="">
                </div>

              </div>
              <div class="swiper-pagination"></div>
            </div>

          </div>

          <div class="col-lg-5 portfolio-info">
            <h3>Project information</h3>
            <ul>
              <li><strong>Nama</strong>: ${selectedPortfolio.nama}</li>
              <li><strong>Category</strong>: ${selectedPortfolio.kategori}</li>
              <li><strong>Tools</strong>: ${selectedPortfolio.tools}</li>
              <li><strong>Client</strong>: ${selectedPortfolio.client}</li>
              <li><strong>Project date</strong>: ${selectedPortfolio.date_project}</li>
              <li><strong>Project URL</strong>: <a href="${selectedPortfolio.url_project}" target="_blank">${selectedPortfolio.url_project}</a></li>
            </ul>

            <p>
              ${selectedPortfolio.keterangan}
            </p>
          </div>
          `);

            new Swiper('.portfolio-details-slider', {
              speed: 500,
              loop: true,
              autoplay: {
                delay: 5000,
                disableOnInteraction: false
              },
              pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
              }
            });

        } else {
          console.error("ID tidak ditemukan dalam data portfolio");
        }
      }).fail(function(jqxhr, textStatus, error) {
        const err = textStatus + ", " + error;
        console.error("Gagal mengambil data dari data.json: " + err);
      });
    } else {
      console.error("ID tidak ada dalam URL");
    }
    
  }

  // Panggil fungsi ini saat dokumen siap jika pada halaman detail
  if (window.location.pathname.includes('portfolio-details.html')) {
    $(document).ready(tampilkanDetailPortfolio);
  }

})();
