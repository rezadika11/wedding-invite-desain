/* ==========================================================
   JanjiSuci — Plugins & Addons Core JS
   Dipisah dari plugins.html — ala AdminKit + Velzon + AdminLTE3
   File: assets/js/plugins.js
   Dependensi: assets/data/plugins-data.js (window.PLUGINS_DATA)
               + CDN: sweetalert2, toastr, flatpickr, choices,
                 imask, quill, dropzone, nouislider, sortable,
                 glightbox, clipboard, apexcharts, fullcalendar, leaflet
   ========================================================== */

// ===== Helpers =====
function copyCode(text, btn) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      const o = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-check-lg"></i> Tersalin';
      setTimeout(() => (btn.innerHTML = o), 1600);
      dashToast('Kode disalin', 'info');
    });
  } else {
    prompt('Salin manual:', text);
  }
}

function scrollToPlugin(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.querySelectorAll('.plugin-tile').forEach((t) => t.classList.remove('active'));
  document.querySelector(`.plugin-tile[onclick*="${id}"]`)?.classList.add('active');
}

// Salin CDN bundle dari data terpisah
document.getElementById('btnCopyAllCdn')?.addEventListener('click', () => {
  const cdn =
    window.PLUGINS_DATA?.cdnBundle?.join('\n') ||
    [
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
      'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js',
    ].join('\n');
  copyCode(cdn, document.getElementById('btnCopyAllCdn'));
});

// ===== Filter & Search (ala AdminLTE) =====
(function () {
  const pills = document.querySelectorAll('.plugin-pill');
  const search = document.getElementById('pluginSearch');
  const tiles = document.querySelectorAll('.plugin-tile');
  const cards = document.querySelectorAll('.addon-card');
  let activeFilter = 'all';
  function apply() {
    const q = (search.value || '').toLowerCase().trim();
    tiles.forEach((t) => {
      const cat = t.dataset.cat || '';
      const name = (t.textContent || '').toLowerCase();
      const matchFilter = activeFilter === 'all' || cat === activeFilter;
      const matchSearch = !q || name.includes(q);
      t.style.display = matchFilter && matchSearch ? '' : 'none';
    });
    cards.forEach((c) => {
      const cat = c.dataset.cat || '';
      const text = (c.textContent || '').toLowerCase();
      const matchFilter = activeFilter === 'all' || cat === activeFilter;
      const matchSearch = !q || text.includes(q);
      c.style.display = matchFilter && matchSearch ? '' : 'none';
    });
  }
  pills.forEach((p) => {
    p.addEventListener('click', () => {
      pills.forEach((x) => x.classList.remove('active'));
      p.classList.add('active');
      activeFilter = p.dataset.filter;
      apply();
    });
  });
  search?.addEventListener('input', apply);
})();

// ===== Inits =====
(function () {
  /* ===== SweetAlert2 ===== */
  document.getElementById('swalBasic')?.addEventListener('click', () => {
    Swal.fire({
      icon: 'success',
      title: 'Tersimpan!',
      text: 'Perubahan undangan berhasil disimpan.',
      confirmButtonColor: '#1b3b36',
      confirmButtonText: 'Mantap',
    });
  });
  document.getElementById('swalConfirm')?.addEventListener('click', () => {
    Swal.fire({
      title: 'Hapus pesanan?',
      text: 'Pesanan #1284 — Arya & Nabila akan dihapus permanen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a83854',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((r) => {
      if (r.isConfirmed) Swal.fire('Terhapus!', 'Pesanan telah dihapus.', 'success');
    });
  });
  document.getElementById('swalInput')?.addEventListener('click', () => {
    Swal.fire({
      title: 'Nama tamu',
      input: 'text',
      inputPlaceholder: 'Tulis nama tamu...',
      confirmButtonColor: '#1b3b36',
      showCancelButton: true,
      cancelButtonText: 'Batal',
    }).then((r) => {
      if (r.isConfirmed && r.value) dashToast(`Undangan untuk ${r.value} disiapkan`);
    });
  });
  document.getElementById('swalToast')?.addEventListener('click', () => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Undangan dipublish',
      showConfirmButton: false,
      timer: 2200,
      timerProgressBar: true,
    });
  });

  /* ===== Toastr (AdminKit style) — data dari plugins-data.js opsional ===== */
  if (window.toastr) {
    toastr.options = {
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-top-right',
      timeOut: 2500,
      extendedTimeOut: 800,
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut',
    };
    function applyToastrOpts() {
      toastr.options.positionClass = document.getElementById('toastrPos')?.value || 'toast-top-right';
      toastr.options.progressBar = document.getElementById('toastrProgress')?.checked ?? true;
      toastr.options.closeButton = document.getElementById('toastrClose')?.checked ?? true;
    }
    document.getElementById('toastrSuccess')?.addEventListener('click', () => {
      applyToastrOpts();
      toastr.success('RSVP 12 tamu berhasil disimpan', 'Berhasil');
    });
    document.getElementById('toastrInfo')?.addEventListener('click', () => {
      applyToastrOpts();
      toastr.info('Tema Nusantara Royale di-preview 42x hari ini', 'Info');
    });
    document.getElementById('toastrWarning')?.addEventListener('click', () => {
      applyToastrOpts();
      toastr.warning('Storage galeri tersisa 12 GB', 'Peringatan');
    });
    document.getElementById('toastrError')?.addEventListener('click', () => {
      applyToastrOpts();
      toastr.error('Pembayaran gagal diproses bank', 'Gagal');
    });
    document.getElementById('toastrClear')?.addEventListener('click', () => toastr.clear());
    document.getElementById('toastrPos')?.addEventListener('change', applyToastrOpts);
  }

  /* ===== Flatpickr (locale Indonesia) ===== */
  if (window.flatpickr) {
    flatpickr('#pickDate', {
      locale: 'id',
      dateFormat: 'd F Y',
      minDate: 'today',
      defaultDate: [new Date().fp_incr(30)],
    });
    flatpickr('#pickRange', { locale: 'id', mode: 'range', dateFormat: 'd F Y' });
    flatpickr('#pickTime', {
      locale: 'id',
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      defaultDate: '08:00',
    });
  }

  /* ===== Choices.js (ala AdminKit Select) ===== */
  if (window.Choices) {
    new Choices('#choiceTema', {
      searchEnabled: true,
      shouldSort: false,
      itemSelectText: '',
      allowHTML: true,
      placeholder: true,
      searchPlaceholderValue: 'Ketik untuk cari tema...',
    });
    new Choices('#choiceTags', {
      removeItemButton: true,
      placeholder: true,
      placeholderValue: 'Pilih tags tamu...',
      searchEnabled: true,
    });
  }

  /* ===== IMask ===== */
  if (window.IMask) {
    IMask(document.getElementById('maskPhone'), { mask: '0000-0000-0000' });
    IMask(document.getElementById('maskRupiah'), {
      mask: 'Rp 0',
      blocks: { 0: { mask: IMask.MaskedNumber, thousandsSeparator: '.', scale: 0 } },
    });
    IMask(document.getElementById('maskCard'), { mask: '0000 0000 0000 0000' });
  }

  /* ===== Quill ===== */
  if (window.Quill) {
    const quill = new Quill('#quillEditor', {
      theme: 'snow',
      placeholder: 'Tulis cerita cinta pasangan di sini...',
      modules: {
        toolbar: [
          [{ header: [2, 3, false] }],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
      },
    });
    quill.on('text-change', () => {});
  }

  /* ===== Dropzone ===== */
  if (window.Dropzone) {
    Dropzone.autoDiscover = false;
    new Dropzone('#weddingDropzone', {
      url: '#',
      maxFiles: 5,
      maxFilesize: 2,
      acceptedFiles: 'image/*',
      addRemoveLinks: true,
      parallelUploads: 2,
      dictDefaultMessage:
        '<i class="bi bi-cloud-arrow-up-fill"></i>Tarik &amp; lepas foto ke sini, atau <strong>klik untuk pilih file</strong>',
      dictRemoveFile: '<i class="bi bi-trash3"></i> hapus',
      dictMaxFilesExceeded: 'Maksimal 5 foto saja',
      dictFileTooBig: 'Ukuran maksimal 2MB',
    });
  }

  /* ===== noUiSlider — pakai data dari plugins-data.js ===== */
  if (window.noUiSlider) {
    const budget = document.getElementById('budgetSlider');
    const cfg = window.PLUGINS_DATA?.budgetSlider || {
      start: [500000, 1500000],
      step: 50000,
      range: { min: 250000, max: 3000000 },
    };
    noUiSlider.create(budget, {
      start: cfg.start,
      connect: true,
      step: cfg.step,
      range: cfg.range,
    });
    const fmt = (v) => 'Rp ' + Number(v).toLocaleString('id-ID');
    budget.noUiSlider.on('update', (vals) => {
      document.getElementById('budgetMin').textContent = fmt(vals[0]);
      document.getElementById('budgetMax').textContent = fmt(vals[1]);
    });
  }

  /* ===== SortableJS ===== */
  if (window.Sortable) {
    new Sortable(document.getElementById('agendaList'), {
      animation: 180,
      ghostClass: 'ghost',
      dragClass: 'dragging',
      handle: '.bi-grip-vertical',
      onEnd: () => dashToast('Urutan agenda diperbarui', 'info'),
    });
  }

  /* ===== GLightbox ===== */
  if (window.GLightbox) {
    GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
  }

  /* ===== ClipboardJS ===== */
  if (window.ClipboardJS) {
    new ClipboardJS('#btnCopy').on('success', (e) => {
      const btn = e.trigger;
      btn.innerHTML = '<i class="bi bi-check-lg"></i> Tersalin';
      setTimeout(() => (btn.innerHTML = '<i class="bi bi-clipboard"></i> Copy'), 1800);
      e.clearSelection();
    });
  }

  /* ===== FullCalendar — data dari plugins-data.js ===== */
  if (window.FullCalendar) {
    const calEl = document.getElementById('fullCalendar');
    const events = window.PLUGINS_DATA?.calendarEvents || [
      { title: 'Akad Nikah — Arya & Nabila', start: '2025-10-24T08:00:00', end: '2025-10-24T10:00:00', color: '#1b3b36' },
      { title: 'Resepsi — Plataran Menteng', start: '2025-10-24T11:00:00', end: '2025-10-24T14:00:00', color: '#c5a059' },
      { title: 'Photo Session', start: '2025-10-24T15:00:00', end: '2025-10-24T16:30:00', color: '#83523d' },
      { title: 'Gladi Bersih', start: '2025-10-23T14:00:00', end: '2025-10-23T16:00:00', color: '#abcec6' },
      { title: 'RSVP Deadline', start: '2025-10-20', color: '#e8edf5', textColor: '#142238' },
    ];
    const calendar = new FullCalendar.Calendar(calEl, {
      initialView: 'dayGridMonth',
      locale: 'id',
      headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,listWeek' },
      height: 'auto',
      editable: true,
      selectable: true,
      eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
      events: events,
      dateClick: (info) => {
        const title = prompt('Judul acara untuk ' + info.dateStr + ':');
        if (title) calendar.addEvent({ title, start: info.dateStr, color: '#1b3b36' });
      },
      eventClick: (info) => {
        if (confirm('Hapus acara "' + info.event.title + '"?')) info.event.remove();
      },
      eventDrop: () => dashToast('Jadwal diperbarui', 'info'),
      eventResize: () => dashToast('Durasi acara diperbarui', 'info'),
    });
    calendar.render();
    document.getElementById('calToday')?.addEventListener('click', () => calendar.today());
    document.getElementById('calAddEvent')?.addEventListener('click', () => {
      const title = prompt('Judul acara baru:');
      if (title) calendar.addEvent({ title, start: new Date().toISOString().slice(0, 10), color: '#c5a059' });
    });
    setTimeout(() => calendar.updateSize(), 400);
  }

  /* ===== Leaflet Maps — data dari plugins-data.js ===== */
  if (window.L) {
    const venues = window.PLUGINS_DATA?.leafletVenues || [
      { id: 'plataran', name: 'Ballroom Plataran Menteng', address: 'Jl. HOS. Cokroaminoto No.42', lat: -6.1915, lng: 106.823, gmaps: 'https://maps.app.goo.gl/plataran-menteng' },
      { id: 'dharmawangsa', name: 'The Dharmawangsa Hotel', address: 'Jl. Brawijaya Raya No.26, Jakarta Selatan', lat: -6.2607, lng: 106.8004, gmaps: 'https://maps.app.goo.gl/dharmawangsa' },
    ];
    const venueMap = L.map('venueMap').setView([venues[0].lat, venues[0].lng], 14);
    // Base layers: OSM + Google Maps (roadmap, satellite, hybrid) — canvas pakai Google layer
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap',
    });
    const googleRoadmap = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0','mt1','mt2','mt3'],
      attribution: '&copy; Google Maps'
    });
    const googleSatellite = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0','mt1','mt2','mt3'],
      attribution: '&copy; Google Maps'
    });
    const googleHybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0','mt1','mt2','mt3'],
      attribution: '&copy; Google Maps'
    });
    // Default: Google Roadmap (Velzon style canvas pakai Google)
    googleRoadmap.addTo(venueMap);
    L.control.layers(
      { 'OpenStreetMap': osm, 'Google Roadmap': googleRoadmap, 'Google Satellite': googleSatellite, 'Google Hybrid': googleHybrid },
      null,
      { position: 'topright', collapsed: true }
    ).addTo(venueMap);
    const iconRoyale = L.divIcon({
      html: '<div style="width:36px;height:36px;border-radius:50%;background:#1b3b36;border:3px solid #F5EBD7;display:grid;place-items:center;color:#F5EBD7;box-shadow:0 4px 12px rgba(0,0,0,.2)"><i class="bi bi-geo-alt-fill"></i></div>',
      className: '',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });
    const markers = venues.map((v) =>
      L.marker([v.lat, v.lng], { icon: iconRoyale })
        .addTo(venueMap)
        .bindPopup(`<b>${v.name}</b><br>${v.address}<br><a href="${v.gmaps}" target="_blank">Buka Google Maps</a>`)
    );
    const group = L.featureGroup(markers);
    venueMap.fitBounds(group.getBounds().pad(0.35));
    document.getElementById('mapVenue1')?.addEventListener('click', () => {
      venueMap.setView([venues[0].lat, venues[0].lng], 16);
      markers[0].openPopup();
    });
    document.getElementById('mapVenue2')?.addEventListener('click', () => {
      if (markers[1]) {
        venueMap.setView([venues[1].lat, venues[1].lng], 16);
        markers[1].openPopup();
      }
    });
    setTimeout(() => venueMap.invalidateSize(), 500);
  }

  /* ===== Swiper — Slider Geser ===== */
  if(window.Swiper){
    const swiperEl = document.querySelector('.mySwiper');
    if(swiperEl){
      const swiper = new Swiper('.mySwiper',{
        loop:true,
        autoplay:{delay:2500, disableOnInteraction:false},
        pagination:{el:'.swiper-pagination', clickable:true},
        navigation:{nextEl:'.swiper-button-next', prevEl:'.swiper-button-prev'},
        slidesPerView:1,
        spaceBetween:0
      });
      document.getElementById('swiperPrev')?.addEventListener('click',()=> swiper.slidePrev());
      document.getElementById('swiperNext')?.addEventListener('click',()=> swiper.slideNext());
      let paused=false;
      document.getElementById('swiperToggle')?.addEventListener('click', function(){
        if(paused){ swiper.autoplay.start(); this.innerHTML='<i class="bi bi-pause"></i> Pause'; }
        else { swiper.autoplay.stop(); this.innerHTML='<i class="bi bi-play"></i> Play'; }
        paused=!paused;
      });
    }
  }


  /* ===== Chart.js Demo (halaman Plugins) ===== */
  if(window.Chart){
    const demoLine = document.getElementById('demoChartjsLine');
    if(demoLine){
      const cfg = window.PLUGINS_DATA?.chartDemo || {labels:['15 Agu','18 Agu','21 Agu','24 Agu','27 Agu','30 Agu','02 Sep'], pesanan:[12,19,15,22,18,26,24], preview:[20,25,22,30,28,35,32]};
      new Chart(demoLine,{
        type:'line',
        data:{
          labels: cfg.labels,
          datasets:[
            {label:'Pesanan', data: cfg.pesanan, borderColor:'#1b3b36', backgroundColor:'rgba(27,59,54,0.08)', tension:0.4, fill:true, pointRadius:3},
            {label:'Preview', data: cfg.preview, borderColor:'#abcec6', backgroundColor:'rgba(171,206,198,0.15)', tension:0.4, fill:true, pointRadius:0}
          ]
        },
        options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{grid:{display:false}}, y:{beginAtZero:true, grid:{color:'#f3f6f9'}}}}
      });
    }
  }

  /* ===== DataTables — Royale (pagination & form sinkron tema) ===== */
  if(window.jQuery && window.jQuery.fn && window.jQuery.fn.DataTable){
    const dt = document.getElementById('demoDataTable');
    if(dt){
      // Generate 200 data biar pagination keliatan (garis & spacing premium)
      const tbody = dt.querySelector('tbody');
      if(tbody && tbody.querySelectorAll('tr').length < 20){
        tbody.innerHTML = '';
        const PRIA=['Arya','Dimas','Reza','Fajar','Galih','Bimo','Rangga','Satria','Yoga','Adit','Bagas','Candra','Dewa','Eka','Farhan','Gilang','Hendra','Ilham','Joko','Kevin','Lutfi','Mahesa','Nanda','Oscar','Panji','Rizky','Surya','Teguh','Umar','Vino','Wahyu','Yusuf','Zaki','Alif','Bintang','Danu','Erlangga','Fikri','Gading','Hafiz','Iqbal','Jefri','Krisna','Ludwig','Marvin','Naufal','Omar','Putra','Rio','Sultan'];
        const WANITA=['Nabila','Nadya','Syifa','Lestari','Rahmi','Citra','Amelia','Dewi','Salsabila','Kirana','Tari','Utami','Vania','Wulan','Zahra','Ayu','Bella','Cantika','Dinda','Elsa','Fitri','Gita','Hana','Indah','Jasmine','Karin','Laila','Maya','Nayla','Olivia','Putri','Qonita','Rani','Sabrina','Talita','Ulya','Vira','Winda','Yanti','Zenobia','Anisa','Bunga','Cindy','Dewi','Erika','Fara','Gina','Hesti','Intan','Jihaan'];
        const TEMA=[['Nusantara Royale','#1b3b36'],['Botanical Whispers','#abcec6'],['Golden Jasmine','#e9c176'],['Syar\'i Mawaddah','#83523d'],['Minimalist Cherish','#c7eae2'],['Emerald Heritage','#2D6A4F']];
        const KOTA=['Jakarta','Bandung','Surabaya','Yogyakarta','Semarang','Malang','Denpasar','Makassar','Medan','Bogor','Bekasi','Tangerang','Solo','Padang','Palembang','Balikpapan'];
        const STATUS=[['Lunas','success'],['Draft','warning'],['Pending','info'],['Selesai','secondary']];
        function rand(i){ const x=Math.sin(i*127.1+311.7)*43758.5453; return x-Math.floor(x); }
        for(let i=0;i<200;i++){
          const pName=PRIA[Math.floor(rand(i+1)*PRIA.length)];
          const wName=WANITA[Math.floor(rand(i+51)*WANITA.length)];
          const tema=TEMA[i%TEMA.length];
          const kota=KOTA[Math.floor(rand(i+101)*KOTA.length)];
          const tamu=50+Math.floor(rand(i+151)*450);
          const st=STATUS[i%STATUS.length];
          const tr=document.createElement('tr');
          tr.innerHTML=`<td><strong>${pName} & ${wName}</strong></td><td><span class="dash-badge" style="background:${tema[1]}20;color:${tema[1]==='#abcec6'?'#1b3b36':tema[1]==='#c7eae2'?'#1b3b36':tema[1]};border-color:${tema[1]}40">${tema[0]}</span></td><td>${kota}</td><td>${tamu}</td><td><span class="dash-badge ${st[1]}">${st[0]}</span></td>`;
          tbody.appendChild(tr);
        }
      }
      const table = window.jQuery(dt).DataTable({
        pageLength:10,
        lengthMenu:[10,25,50,100],
        language:{
          search:'Cari:',
          searchPlaceholder:' Cari pasangan / tema...',
          lengthMenu:'Tampilkan _MENU_ entri',
          info:'Menampilkan _START_–_END_ dari _TOTAL_ pasangan',
          infoEmpty:'Tidak ada data',
          infoFiltered:'(difilter dari _MAX_)',
          zeroRecords:'Tidak ada pasangan cocok',
          paginate:{previous:'‹', next:'›'},
          emptyTable:'Belum ada data pesanan'
        },
        dom:'<"row g-2 align-items-center"<"col-sm-6"l><"col-sm-6"f>>t<"row g-2 align-items-center"<"col-sm-6"i><"col-sm-6"p>>',
        drawCallback:function(){
          // sinkron warna & font setelah redraw
          const wrapper = this.api().table().container();
          wrapper.querySelectorAll('select').forEach(s=>{ s.style.minWidth='64px'; });
        }
      });
      // placeholder untuk search input biar mirip dash-input
      const filterInput = document.querySelector('#demoDataTable_filter input');
      if(filterInput){
        filterInput.setAttribute('placeholder','Cari pasangan / tema...');
        filterInput.setAttribute('aria-label','Cari');
      }
    }
  }

  /* ===== jsVectorMap ===== */
  if(window.jsVectorMap){
    const el = document.getElementById('demoVectorMap');
    if(el){
      const markers = (window.PLUGINS_DATA?.vectorMarkers || [{coords:[-6.2,106.8], name:'Jakarta'}]).map(m=>({coords:m.coords, name:m.name}));
      new jsVectorMap({
        selector:'#demoVectorMap',
        map:'world',
        markers: markers,
        markerStyle:{initial:{fill:'#405189', stroke:'#fff', strokeWidth:1}},
        regionStyle:{initial:{fill:'#e9ecec'}},
        backgroundColor:'transparent'
      });
    }
  }

  /* ===== Pickr ColorPicker ===== */
  if(window.Pickr){
    const pickrEl = document.getElementById('demoPickr');
    if(pickrEl){
      const pickr = Pickr.create({
        el:'#demoPickr',
        theme:'classic',
        default:'#1b3b36',
        swatches:['#1b3b36','#405189','#c5a059','#83523d','#0a3622','#e9ecec'],
        components:{preview:true, opacity:true, hue:true, interaction:{hex:true, rgba:true, hsla:true, input:true, clear:true, save:true}}
      });
      pickr.on('save',(color)=>{
        const hex = color ? color.toHEXA().toString() : '#1b3b36';
        const valEl = document.getElementById('pickrValue');
        const prevEl = document.getElementById('pickrPreview');
        if(valEl) valEl.textContent = hex;
        if(prevEl) prevEl.style.background = hex;
        pickr.hide();
      });
      pickr.on('change',(color)=>{
        const hex = color.toHEXA().toString();
        const prevEl = document.getElementById('pickrPreview');
        if(prevEl) prevEl.style.background = hex;
      });
    }
  }


  /* ===== Plyr ===== */
  if(window.Plyr){
    const el = document.getElementById('demoPlyr');
    if(el) new Plyr(el, {controls:['play','progress','current-time','mute','volume']});
  }

  /* ===== bs-stepper ===== */
  if(window.Stepper){
    const el = document.querySelector('#demoStepper');
    if(el) window.stepper = new Stepper(el, {linear:false, animation:true});
  }

  /* ===== intl-tel-input ===== */
  if(window.intlTelInput){
    const input = document.querySelector('#demoTel');
    if(input){
      const iti = window.intlTelInput(input, {
        initialCountry:'id',
        preferredCountries:['id','my','sg'],
        utilsScript:'assets/plugins/vendor/intl-tel-input/utils.js'
      });
      document.getElementById('telGet')?.addEventListener('click', ()=>{
        const valid = iti.isValidNumber();
        const num = iti.getNumber();
        const el = document.getElementById('telValid');
        if(el) el.textContent = valid ? '✓ Valid: '+num : '✗ Tidak valid';
        el.style.color = valid ? 'var(--dash-success)' : 'var(--dash-danger)';
      });
    }
  }

  /* ===== Rater.js ===== */
  if(window.raterJs){
    const el = document.getElementById('demoRater');
    const valEl = document.getElementById('raterValue');
    if(el){
      try{
        raterJs({
          element: el,
          rateCallback: function(rating, done){
            this.setRating(rating);
            if(valEl) valEl.textContent = rating.toFixed(1) + ' / 5';
            done();
          },
          starSize:28,
          step:0.5
        });
        // set initial 4.5
        const stars = el.querySelectorAll('.star');
      }catch(e){
        // fallback simple stars
        el.innerHTML = '<i class="bi bi-star-fill"></i>'.repeat(4) + '<i class="bi bi-star-half"></i>';
      }
    }
  } else if(document.getElementById('demoRater')){
    // Fallback if rater-js API different (some CDN uses global rater)
    const el = document.getElementById('demoRater');
    if(el && !el.hasChildNodes()){
      el.innerHTML = '<i class="bi bi-star-fill" style="color:#e9c176"></i>'.repeat(4) + '<i class="bi bi-star-half" style="color:#e9c176"></i>';
    }
  }

  /* ===== Prism.js ===== */
  if(window.Prism){
    Prism.highlightAll();
  }


  /* ===== QRCode ===== */
  if(window.QRCode){
    const qrEl = document.getElementById('demoQR');
    const qrInput = document.getElementById('qrInput');
    let qr;
    function genQR(text){
      if(!qrEl) return;
      qrEl.innerHTML='';
      qr = new QRCode(qrEl,{text: text || 'https://janjisuci.id/arya-nabila', width:160, height:160, colorDark:'#212529', colorLight:'#ffffff', correctLevel: QRCode.CorrectLevel.H});
    }
    genQR(qrInput?.value);
    document.getElementById('qrGen')?.addEventListener('click',()=> genQR(qrInput.value));
    document.getElementById('qrDownload')?.addEventListener('click',()=>{
      const canvas = qrEl.querySelector('canvas');
      const img = qrEl.querySelector('img');
      let url;
      if(canvas) url = canvas.toDataURL('image/png');
      else if(img) url = img.src;
      if(url){
        const a = document.createElement('a');
        a.href = url;
        a.download = 'janjisuci-qr.png';
        a.click();
      }
    });
  }


  /* ===== ApexCharts — data dari plugins-data.js ===== */
  if (window.ApexCharts) {
    const apex = window.PLUGINS_DATA?.apex || {
      days: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
      seriesKunjungan: [320, 410, 380, 520, 610, 880, 760],
      seriesRsvp: [120, 180, 150, 240, 290, 410, 360],
      colors: ['#1b3b36', '#c5a059'],
    };
    const options = {
      chart: { type: 'area', height: 300, fontFamily: 'Inter, sans-serif', toolbar: { show: false }, zoom: { enabled: false } },
      series: [
        { name: 'Kunjungan Tamu', data: apex.seriesKunjungan },
        { name: 'RSVP Masuk', data: apex.seriesRsvp },
      ],
      colors: apex.colors,
      stroke: { curve: 'smooth', width: 3 },
      fill: { type: 'gradient', gradient: { opacityFrom: 0.35, opacityTo: 0 } },
      dataLabels: { enabled: false },
      xaxis: { categories: apex.days, axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { labels: { formatter: (v) => (v >= 1000 ? v / 1000 + 'rb' : v) } },
      grid: { borderColor: '#eef0f2', strokeDashArray: 4 },
      legend: { position: 'top', horizontalAlign: 'right' },
      tooltip: { y: { formatter: (v) => v + ' kunjungan' } },
    };
    new ApexCharts(document.querySelector('#apexArea'), options).render();
  }
})();
