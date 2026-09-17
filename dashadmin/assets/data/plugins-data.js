/* ==========================================================
   JanjiSuci — Plugins & Addons Data
   Dipisah dari plugins.html — khusus data plugin
   File: assets/data/plugins-data.js
   Berisi: CDN bundle, calendar events, leaflet venues,
          chart series, pilihan tema, dsb.
   ========================================================== */
window.PLUGINS_DATA = {
  // CDN bundle yang dipakai Halaman Plugins (untuk tombol Salin CDN Bundle)
  cdnBundle: [
    'https://cdn.jsdelivr.net/npm/sweetalert2@11',
    'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.css',
    'https://cdn.jsdelivr.net/npm/choices.js@10.2.0/public/assets/styles/choices.min.css',
    'https://cdn.jsdelivr.net/npm/toastr@2.1.4/build/toastr.min.css',
    'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css',
    'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css',
    'https://cdn.jsdelivr.net/npm/dropzone@5.9.3/dist/min/dropzone.min.css',
    'https://cdn.jsdelivr.net/npm/nouislider@15.8.1/dist/nouislider.min.css',
    'https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/css/glightbox.min.css',
    'https://cdn.jsdelivr.net/npm/apexcharts@3.54.1',
    'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js'
  ],

  // FullCalendar — daftar acara akad & resepsi (ala AdminKit Calendar)
  calendarEvents: [
    { title: 'Akad Nikah — Arya & Nabila', start: '2025-10-24T08:00:00', end: '2025-10-24T10:00:00', color: '#1b3b36' },
    { title: 'Resepsi — Plataran Menteng', start: '2025-10-24T11:00:00', end: '2025-10-24T14:00:00', color: '#c5a059' },
    { title: 'Photo Session', start: '2025-10-24T15:00:00', end: '2025-10-24T16:30:00', color: '#83523d' },
    { title: 'Gladi Bersih', start: '2025-10-23T14:00:00', end: '2025-10-23T16:00:00', color: '#abcec6' },
    { title: 'RSVP Deadline', start: '2025-10-20', color: '#e8edf5', textColor: '#142238' }
  ],

  // Leaflet — venue peta (OpenStreetMap)
  leafletVenues: [
    {
      id: 'plataran',
      name: 'Ballroom Plataran Menteng',
      address: 'Jl. HOS. Cokroaminoto No.42, Menteng, Jakarta Pusat',
      lat: -6.1915,
      lng: 106.823,
      gmaps: 'https://maps.app.goo.gl/plataran-menteng'
    },
    {
      id: 'dharmawangsa',
      name: 'The Dharmawangsa Hotel',
      address: 'Jl. Brawijaya Raya No.26, Jakarta Selatan',
      lat: -6.2607,
      lng: 106.8004,
      gmaps: 'https://maps.app.goo.gl/dharmawangsa'
    }
  ],

  // Swiper — slides slider geser
  swiperSlides: [
    { title: 'Nusantara Royale', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80', color: '#1b3b36' },
    { title: 'Botanical Whispers', img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80', color: '#83523d' },
    { title: 'Golden Jasmine', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80', color: '#c5a059' },
    { title: 'Minimalist Cream', img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80', color: '#142238' }
  ],

  // Chart.js demo (duplikat Apex tapi vanilla)
  chartDemo: {
    labels: ['15 Agu','18 Agu','21 Agu','24 Agu','27 Agu','30 Agu','02 Sep'],
    pesanan: [12,19,15,22,18,26,24],
    preview: [20,25,22,30,28,35,32]
  },

  // Vector map markers
  vectorMarkers: [
    { coords: [ -6.2, 106.8 ], name: 'Jakarta — 449 undangan' },
    { coords: [ -6.9, 107.6 ], name: 'Bandung — 321 undangan' },
    { coords: [ -7.2, 112.7 ], name: 'Surabaya — 258 undangan' }
  ],

  // ApexCharts — kunjungan vs RSVP per hari (Sen-Min)
  apex: {
    days: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    seriesKunjungan: [320, 410, 380, 520, 610, 880, 760],
    seriesRsvp: [120, 180, 150, 240, 290, 410, 360],
    colors: ['#1b3b36', '#c5a059']
  },

  // noUiSlider — budget range amplop (Rp)
  budgetSlider: {
    start: [500000, 1500000],
    step: 50000,
    range: { min: 250000, max: 3000000 }
  },

  // Sortable — agenda acara default
  agenda: [
    { title: 'Akad Nikah', time: '08.00 — 10.00 WIB' },
    { title: 'Resepsi & Ramah Tamah', time: '11.00 — 14.00 WIB' },
    { title: 'Photo Session', time: '14.00 — 15.30 WIB' },
    { title: 'Panggung Hiburan', time: '19.00 — 21.00 WIB' }
  ],

  // Choices.js — opsi tema & tags (dipakai juga di HTML <select>)
  choicesTema: [
    'Nusantara Royale — Best Seller',
    'Botanical Whispers',
    'Golden Jasmine',
    "Syar'i Mawaddah",
    'Minimalist Cherish',
    'Emerald Heritage'
  ],
  choicesTags: ['Keluarga', 'Rekan Kerja', 'Sahabat', 'Tetangga', 'Alumni'],

  // Plugin katalog meta (untuk tabel & catalog)
  plugins: [
    { name: 'SweetAlert2', version: 'v11', category: 'Notifikasi', license: 'MIT', docs: 'https://sweetalert2.github.io/', usage: 'Konfirmasi hapus, toast publish' },
    { name: 'Toastr', version: 'v2.1', category: 'Notifikasi', license: 'MIT', docs: 'https://codeseven.github.io/toastr/', usage: 'Toast ringan selain SweetAlert' },
    { name: 'Flatpickr', version: 'v4.6', category: 'Form', license: 'MIT', docs: 'https://flatpickr.js.org/', usage: 'Picker tanggal akad & range resepsi' },
    { name: 'Choices.js', version: 'v10.2', category: 'Form', license: 'MIT', docs: 'https://choices-js.github.io/Choices/', usage: 'Pilih tema & tags (pengganti Select2, vanilla)' },
    { name: 'IMask', version: 'v7', category: 'Form', license: 'MIT', docs: 'https://imask.js.org/', usage: 'Mask WA, rupiah, kartu' },
    { name: 'Quill', version: 'v2', category: 'Editor', license: 'BSD-3', docs: 'https://quilljs.com/', usage: 'Cerita prewedding & catatan admin' },
    { name: 'Dropzone', version: 'v5.9', category: 'Upload', license: 'MIT', docs: 'https://docs.dropzone.dev/', usage: 'Galeri foto drag & drop' },
    { name: 'noUiSlider', version: 'v15', category: 'Slider', license: 'WTFPL', docs: 'https://refreshless.com/nouislider/', usage: 'Range budget amplop' },
    { name: 'SortableJS', version: 'v1.15', category: 'Interact', license: 'MIT', docs: 'https://github.com/SortableJS/Sortable', usage: 'Susun agenda akad & resepsi' },
    { name: 'GLightbox', version: 'v3.3', category: 'Media', license: 'MIT', docs: 'https://biati-digital.github.io/glightbox/', usage: 'Lightbox galeri prewedding' },
    { name: 'ClipboardJS', version: 'v2', category: 'Utility', license: 'MIT', docs: 'https://clipboardjs.com/', usage: 'Copy link undangan tamu' },
    { name: 'ApexCharts', version: 'v3.54', category: 'Charts', license: 'MIT', docs: 'https://apexcharts.com/', usage: 'Area chart kunjungan vs RSVP' },
    { name: 'FullCalendar', version: 'v6.1', category: 'Calendar', license: 'MIT', docs: 'https://fullcalendar.io/docs', usage: 'Kalender jadwal akad & resepsi' },
    { name: 'Leaflet', version: 'v1.9', category: 'Maps', license: 'BSD-2', docs: 'https://leafletjs.com/reference.html', usage: 'Peta venue OpenStreetMap' },
    { name: 'Swiper', version: 'v11', category: 'Slider', license: 'MIT', docs: 'https://swiperjs.com/get-started', usage: 'Slider geser galeri & katalog (carousel)' },
    { name: 'Chart.js', version: 'v4.4', category: 'Charts', license: 'MIT', docs: 'https://www.chartjs.org/docs/latest/', usage: 'Line & bar dashboard (alternatif Apex)' },
    { name: 'DataTables', version: 'v1.13', category: 'Table', license: 'MIT', docs: 'https://datatables.net/', usage: 'Tabel interaktif search & paginasi' },
    { name: 'jsVectorMap', version: 'v1.5', category: 'Maps', license: 'MIT', docs: 'https://jvm-docs.vercel.app/', usage: 'Peta vektor persebaran tamu' },
    { name: 'Pickr', version: 'v1.8', category: 'Picker', license: 'MIT', docs: 'https://github.com/Simonwep/pickr', usage: 'Color picker tema undangan' },
    { name: 'QRCode.js', version: 'v1.0', category: 'Utility', license: 'MIT', docs: 'https://github.com/davidshimjs/qrcodejs', usage: 'Generate QR link undangan' },
    { name: 'Plyr', version: 'v3.7', category: 'Media', license: 'MIT', docs: 'https://github.com/sampotts/plyr', usage: 'Audio player musik undangan' },
    { name: 'bs-stepper', version: 'v1.7', category: 'Wizard', license: 'MIT', docs: 'https://github.com/Johann-S/bs-stepper', usage: 'Wizard step pembuatan undangan' },
    { name: 'intl-tel-input', version: 'v18.2', category: 'Form', license: 'MIT', docs: 'https://github.com/jackocnr/intl-tel-input', usage: 'Input telepon internasional' },
    { name: 'Rater.js', version: 'v1.0', category: 'Rating', license: 'MIT', docs: 'https://github.com/fredolss/rater-js', usage: 'Star rating testimoni' },
    { name: 'Prism.js', version: 'v1.29', category: 'Code', license: 'MIT', docs: 'https://prismjs.com/', usage: 'Syntax highlight dokumentasi' }
  ]
};
