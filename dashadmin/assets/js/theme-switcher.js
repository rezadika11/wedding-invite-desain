/* ==========================================================
   JanjiSuci — Theme Switcher Logic (AdminLTE2 + Velzon)
   Fixed gear kanan tengah → panel slide
   Simpan tema di localStorage, apply via CSS variables
   ========================================================== */
(function(){
  const themes = {
    royale: {
      name: 'Royale Emerald',
      colors: {
        '--dash-primary': '#032521',
        '--dash-primary-container': '#1b3b36',
        '--dash-primary-soft': '#c7eae2',
        '--dash-secondary': '#83523d',
        '--dash-gold': '#F5EBD7',
        '--dash-surface': '#FAF7F2'
      },
      sidebar: 'dark'
    },
    blush: {
      name: 'Blush Rose',
      colors: {
        '--dash-primary': '#4a1028',
        '--dash-primary-container': '#8b1e3f',
        '--dash-primary-soft': '#fde8ec',
        '--dash-secondary': '#c5a059',
        '--dash-gold': '#fff0f3',
        '--dash-surface': '#fdf2f5'
      },
      sidebar: 'dark'
    },
    sage: {
      name: 'Sage Heritage',
      colors: {
        '--dash-primary': '#243028',
        '--dash-primary-container': '#3a4a3f',
        '--dash-primary-soft': '#e6ece3',
        '--dash-secondary': '#8a9a8f',
        '--dash-gold': '#f5f1e8',
        '--dash-surface': '#f9f7f3'
      },
      sidebar: 'dark'
    },
    midnight: {
      name: 'Midnight Navy',
      colors: {
        '--dash-primary': '#0f1f3c',
        '--dash-primary-container': '#1a365d',
        '--dash-primary-soft': '#e2e8f0',
        '--dash-secondary': '#c5a059',
        '--dash-gold': '#f1f5f9',
        '--dash-surface': '#f8fafc'
      },
      sidebar: 'dark'
    },
    sunset: {
      name: 'Sunset Gold',
      colors: {
        '--dash-primary': '#3d1f00',
        '--dash-primary-container': '#7a3b00',
        '--dash-primary-soft': '#ffe4c7',
        '--dash-secondary': '#c5a059',
        '--dash-gold': '#fff8e6',
        '--dash-surface': '#fef9f0'
      },
      sidebar: 'dark'
    },
    lavender: {
      name: 'Lavender Dream',
      colors: {
        '--dash-primary': '#2e1065',
        '--dash-primary-container': '#4a2c6a',
        '--dash-primary-soft': '#ede9fe',
        '--dash-secondary': '#a78bfa',
        '--dash-gold': '#f3e8ff',
        '--dash-surface': '#faf5ff'
      },
      sidebar: 'dark'
    },
    peach: {
      name: 'Peach Coral',
      colors: {
        '--dash-primary': '#431407',
        '--dash-primary-container': '#9a3412',
        '--dash-primary-soft': '#ffedd5',
        '--dash-secondary': '#fb923c',
        '--dash-gold': '#fff7ed',
        '--dash-surface': '#fefce8'
      },
      sidebar: 'dark'
    },
    mocha: {
      name: 'Mocha Brown',
      colors: {
        '--dash-primary': '#1c1917',
        '--dash-primary-container': '#44403c',
        '--dash-primary-soft': '#e7e5e4',
        '--dash-secondary': '#a8a29e',
        '--dash-gold': '#f5f5f4',
        '--dash-surface': '#fafaf9'
      },
      sidebar: 'dark'
    },
    ocean: {
      name: 'Ocean Teal',
      colors: {
        '--dash-primary': '#042f2e',
        '--dash-primary-container': '#0f766e',
        '--dash-primary-soft': '#ccfbf1',
        '--dash-secondary': '#2dd4bf',
        '--dash-gold': '#f0fdfa',
        '--dash-surface': '#ecfdf5'
      },
      sidebar: 'dark'
    },
    burgundy: {
      name: 'Burgundy Velvet',
      colors: {
        '--dash-primary': '#450a0a',
        '--dash-primary-container': '#7f1d1d',
        '--dash-primary-soft': '#fee2e2',
        '--dash-secondary': '#f43f5e',
        '--dash-gold': '#fef2f2',
        '--dash-surface': '#fff1f2'
      },
      sidebar: 'dark'
    },
    mint: {
      name: 'Mint Fresh',
      colors: {
        '--dash-primary': '#022c22',
        '--dash-primary-container': '#064e3b',
        '--dash-primary-soft': '#d1fae5',
        '--dash-secondary': '#10b981',
        '--dash-gold': '#ecfdf5',
        '--dash-surface': '#f0fdf4'
      },
      sidebar: 'dark'
    },
    champagne: {
      name: 'Champagne Gold',
      colors: {
        '--dash-primary': '#451a03',
        '--dash-primary-container': '#78350f',
        '--dash-primary-soft': '#fef3c7',
        '--dash-secondary': '#d97706',
        '--dash-gold': '#fffbeb',
        '--dash-surface': '#fefce8'
      },
      sidebar: 'dark'
    },
    dusty: {
      name: 'Dusty Rose',
      colors: {
        '--dash-primary': '#4c0519',
        '--dash-primary-container': '#881337',
        '--dash-primary-soft': '#ffe4e6',
        '--dash-secondary': '#f43f5e',
        '--dash-gold': '#fff1f2',
        '--dash-surface': '#fef2f2'
      },
      sidebar: 'dark'
    },
    slate: {
      name: 'Slate Blue',
      colors: {
        '--dash-primary': '#020617',
        '--dash-primary-container': '#1e293b',
        '--dash-primary-soft': '#e2e8f0',
        '--dash-secondary': '#64748b',
        '--dash-gold': '#f1f5f9',
        '--dash-surface': '#f8fafc'
      },
      sidebar: 'dark'
    }
  };

  function applyTheme(key){
    const t = themes[key] || themes.royale;
    Object.entries(t.colors).forEach(([k,v])=>{
      document.documentElement.style.setProperty(k, v);
    });
    // Sidebar style
    const sidebar = document.getElementById('dashSidebar');
    if(sidebar){
      if(t.sidebar === 'light'){
        sidebar.style.background = '#fff';
        sidebar.style.color = 'var(--dash-text)';
      } else {
        sidebar.style.background = t.colors['--dash-primary-container'];
        sidebar.style.color = '';
      }
    }
    localStorage.setItem('js_themekey', key);
    document.querySelectorAll('.theme-swatch').forEach(el=>{
      el.classList.toggle('active', el.dataset.theme === key);
    });
    document.querySelectorAll('.theme-option[data-theme]').forEach(el=>{
      el.classList.toggle('active', el.dataset.theme === key);
    });
  }

  function createUI(){
    if(document.getElementById('themeFab')) return;
    // Fab
    const fab = document.createElement('button');
    fab.id = 'themeFab';
    fab.className = 'theme-fab';
    fab.setAttribute('aria-label','Pengaturan Tema');
    fab.innerHTML = '<i class="bi bi-gear-fill"></i>';
    document.body.appendChild(fab);

    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'themeOverlay';
    overlay.className = 'theme-overlay';
    document.body.appendChild(overlay);

    // Panel
    const panel = document.createElement('div');
    panel.id = 'themePanel';
    panel.className = 'theme-panel';
    panel.innerHTML = `
      <div class="theme-panel-head">
        <h3><i class="bi bi-palette"></i> Pengaturan Tema</h3>
        <button class="theme-panel-close" id="themeClose" aria-label="Tutup"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="theme-panel-body">
        <div class="theme-section">
          <h4><i class="bi bi-brush"></i> Pilihan Tema — 14 warna wedding luxury</h4>
          <div class="theme-swatches">
            <div class="theme-swatch active" data-theme="royale" title="Royale Emerald" style="background:linear-gradient(135deg,#1b3b36 50%,#F5EBD7 50%)"><span>Royale</span></div>
            <div class="theme-swatch" data-theme="blush" title="Blush Rose" style="background:linear-gradient(135deg,#8b1e3f 50%,#fff0f3 50%)"><span>Blush</span></div>
            <div class="theme-swatch" data-theme="sage" title="Sage Heritage" style="background:linear-gradient(135deg,#3a4a3f 50%,#f5f1e8 50%)"><span>Sage</span></div>
            <div class="theme-swatch" data-theme="midnight" title="Midnight Navy" style="background:linear-gradient(135deg,#1a365d 50%,#f1f5f9 50%)"><span>Navy</span></div>
            <div class="theme-swatch" data-theme="sunset" title="Sunset Gold" style="background:linear-gradient(135deg,#7a3b00 50%,#fff8e6 50%)"><span>Sunset</span></div>
            <div class="theme-swatch" data-theme="lavender" title="Lavender Dream" style="background:linear-gradient(135deg,#4a2c6a 50%,#f3e8ff 50%)"><span>Lavender</span></div>
            <div class="theme-swatch" data-theme="peach" title="Peach Coral" style="background:linear-gradient(135deg,#9a3412 50%,#fff7ed 50%)"><span>Peach</span></div>
            <div class="theme-swatch" data-theme="mocha" title="Mocha Brown" style="background:linear-gradient(135deg,#44403c 50%,#f5f5f4 50%)"><span>Mocha</span></div>
            <div class="theme-swatch" data-theme="ocean" title="Ocean Teal" style="background:linear-gradient(135deg,#0f766e 50%,#f0fdfa 50%)"><span>Ocean</span></div>
            <div class="theme-swatch" data-theme="burgundy" title="Burgundy Velvet" style="background:linear-gradient(135deg,#7f1d1d 50%,#fef2f2 50%)"><span>Burgundy</span></div>
            <div class="theme-swatch" data-theme="mint" title="Mint Fresh" style="background:linear-gradient(135deg,#064e3b 50%,#ecfdf5 50%)"><span>Mint</span></div>
            <div class="theme-swatch" data-theme="champagne" title="Champagne Gold" style="background:linear-gradient(135deg,#78350f 50%,#fffbeb 50%)"><span>Champagne</span></div>
            <div class="theme-swatch" data-theme="dusty" title="Dusty Rose" style="background:linear-gradient(135deg,#881337 50%,#fff1f2 50%)"><span>Dusty</span></div>
            <div class="theme-swatch" data-theme="slate" title="Slate Blue" style="background:linear-gradient(135deg,#1e293b 50%,#f1f5f9 50%)"><span>Slate</span></div>
          </div>
        </div>
        <div class="theme-section">
          <h4><i class="bi bi-layers"></i> Varian (14 tema)</h4>
          <div class="theme-options">
            <div class="theme-option active" data-theme="royale">
              <div class="label"><strong>Royale Emerald</strong><span>#1b3b36 + Gold #F5EBD7 — default mewah emerald</span></div>
              <div class="check"><i class="bi bi-check-lg"></i></div>
            </div>
            <div class="theme-option" data-theme="blush">
              <div class="label"><strong>Blush Rose</strong><span>#8b1e3f + Pink #fff0f3 — romantis pengantin</span></div>
              <div class="check"><i class="bi bi-check-lg"></i></div>
            </div>
            <div class="theme-option" data-theme="sage">
              <div class="label"><strong>Sage Heritage</strong><span>#3a4a3f + Cream #f5f1e8 — sage natural elegan</span></div>
              <div class="check"><i class="bi bi-check-lg"></i></div>
            </div>
            <div class="theme-option" data-theme="midnight">
              <div class="label"><strong>Midnight Navy</strong><span>#1a365d + Slate #f1f5f9 — navy luxurious</span></div>
              <div class="check"><i class="bi bi-check-lg"></i></div>
            </div>
            <div class="theme-option" data-theme="sunset">
              <div class="label"><strong>Sunset Gold</strong><span>#7a3b00 + Warm gold — sunset mewah</span></div>
              <div class="check"><i class="bi bi-check-lg"></i></div>
            </div>
            <div class="theme-option" data-theme="lavender">
              <div class="label"><strong>Lavender Dream</strong><span>#4a2c6a + Lilac #f3e8ff — lavender dreamy</span></div>
              <div class="check"><i class="bi bi-check-lg"></i></div>
            </div>
            <div class="theme-option" data-theme="peach">
              <div class="label"><strong>Peach Coral</strong><span>#9a3412 + Peach #fff7ed — coral ceria</span></div>
              <div class="check"><i class="bi bi-check-lg"></i></div>
            </div>
            <div class="theme-option" data-theme="mocha">
              <div class="label"><strong>Mocha Brown</strong><span>#44403c + Stone #f5f5f4 — mocha earthy</span></div>
              <div class="check"><i class="bi bi-check-lg"></i></div>
            </div>
            <div class="theme-option" data-theme="ocean">
              <div class="label"><strong>Ocean Teal</strong><span>#0f766e + Teal #f0fdfa — ocean fresh</span></div>
              <div class="check"><i class="bi bi-check-lg"></i></div>
            </div>
            <div class="theme-option" data-theme="burgundy">
              <div class="label"><strong>Burgundy Velvet</strong><span>#7f1d1d + Rose #fef2f2 — burgundy velvet</span></div>
              <div class="check"><i class="bi bi-check-lg"></i></div>
            </div>
            <div class="theme-option" data-theme="mint">
              <div class="label"><strong>Mint Fresh</strong><span>#064e3b + Mint #ecfdf5 — mint fresh</span></div>
              <div class="check"><i class="bi bi-check-lg"></i></div>
            </div>
            <div class="theme-option" data-theme="champagne">
              <div class="label"><strong>Champagne Gold</strong><span>#78350f + Champagne #fffbeb — champagne hangat</span></div>
              <div class="check"><i class="bi bi-check-lg"></i></div>
            </div>
            <div class="theme-option" data-theme="dusty">
              <div class="label"><strong>Dusty Rose</strong><span>#881337 + Rose #fff1f2 — dusty romantic</span></div>
              <div class="check"><i class="bi bi-check-lg"></i></div>
            </div>
            <div class="theme-option" data-theme="slate">
              <div class="label"><strong>Slate Blue</strong><span>#1e293b + Slate #f1f5f9 — slate modern</span></div>
              <div class="check"><i class="bi bi-check-lg"></i></div>
            </div>
          </div>
        </div>
        <div class="theme-section">
          <h4><i class="bi bi-sliders"></i> Layout</h4>
          <div class="theme-options">
            <label class="theme-option" style="cursor:pointer">
              <div class="label"><strong>Sidebar Collapsed</strong><span>Kecilkan sidebar (desktop)</span></div>
              <input type="checkbox" id="optCollapse" style="accent-color:var(--dash-primary-container)">
            </label>
            <label class="theme-option" style="cursor:pointer">
              <div class="label"><strong>Navbar Fixed</strong><span>Tetap di atas saat scroll (default: tidak fixed)</span></div>
              <input type="checkbox" id="optNavbar" style="accent-color:var(--dash-primary-container)">
            </label>
          </div>
        </div>
        <div class="theme-actions">
          <button class="dash-btn dash-btn-secondary" id="themeReset" style="flex:1"><i class="bi bi-arrow-counterclockwise"></i> Reset</button>
          <button class="dash-btn dash-btn-primary" id="themeClose2" style="flex:1"><i class="bi bi-check-lg"></i> Selesai</button>
        </div>
        <div style="margin-top:14px;padding:12px;background:var(--dash-surface);border:1px solid var(--dash-border);border-radius:10px;font-size:11px;color:var(--dash-muted);line-height:1.5">
          <i class="bi bi-info-circle" style="color:var(--dash-secondary)"></i> Warna wedding luxury — Royale/Blush/Sage/Navy. Disimpan di <code>localStorage</code>, ganti langsung tanpa reload.
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    // Events
    function open(){ panel.classList.add('open'); overlay.classList.add('show'); }
    function close(){ panel.classList.remove('open'); overlay.classList.remove('show'); }
    fab.addEventListener('click', open);
    overlay.addEventListener('click', close);
    panel.querySelector('#themeClose').addEventListener('click', close);
    panel.querySelector('#themeClose2').addEventListener('click', close);
    document.addEventListener('keydown', e=>{ if(e.key==='Escape') close(); });

    // Theme pick
    panel.querySelectorAll('[data-theme]').forEach(el=>{
      el.addEventListener('click', ()=>{
        const key = el.dataset.theme;
        applyTheme(key);
        // sync swatch/option active is handled in applyTheme
      });
    });
    // Layout options
    const optCollapse = panel.querySelector('#optCollapse');
    const optNavbar = panel.querySelector('#optNavbar');
    // Restore collapse state from dashadmin.js
    try{
      if(localStorage.getItem('dash_collapsed')==='1') optCollapse.checked = true;
    }catch(e){}
    optCollapse?.addEventListener('change', ()=>{
      document.body.classList.toggle('sidebar-collapsed', optCollapse.checked);
      try{ localStorage.setItem('dash_collapsed', optCollapse.checked?'1':'0'); }catch(e){}
    });
    // Navbar Fixed — default tidak fixed
    const navbar = document.querySelector('.dash-navbar');
    function applyNavbarFixed(isFixed){
      document.body.classList.toggle('navbar-fixed', isFixed);
      if(navbar){
        if(isFixed){
          navbar.style.position = 'fixed';
          navbar.style.top = '0';
          navbar.style.left = navbar.style.left || '';
          navbar.style.right = '0';
          document.querySelector('.dash-main')?.style.setProperty('margin-top', 'var(--dash-navbar-h)');
        } else {
          navbar.style.position = 'relative';
          navbar.style.top = '';
          navbar.style.left = '';
          navbar.style.right = '';
          document.querySelector('.dash-main')?.style.removeProperty('margin-top');
          // reset inline left/right yang mungkin dari dashadmin.css fixed
          const dashMain = document.querySelector('.dash-main');
          if(dashMain) dashMain.style.marginTop = '0';
        }
      }
      try{ localStorage.setItem('js_navbar_fixed', isFixed?'1':'0'); }catch(e){}
    }
    // restore
    const savedNavFixed = (function(){ try{ return localStorage.getItem('js_navbar_fixed')==='1'; }catch(e){ return false; }})();
    const optNavbarEl = panel.querySelector('#optNavbar');
    if(optNavbarEl) optNavbarEl.checked = savedNavFixed;
    applyNavbarFixed(savedNavFixed);
    optNavbarEl?.addEventListener('change', ()=> applyNavbarFixed(optNavbarEl.checked));
    // also handle initial dashadmin.css fixed override — force not fixed by default
    if(!savedNavFixed){
      // ensure not fixed on first load
      applyNavbarFixed(false);
    }

    panel.querySelector('#themeReset')?.addEventListener('click', ()=>{
      localStorage.removeItem('js_themekey');
      applyTheme('royale');
      optCollapse.checked = false;
      document.body.classList.remove('sidebar-collapsed');
      try{ localStorage.setItem('dash_collapsed','0'); }catch(e){}
      if(window.dashToast) dashToast('Tema direset ke Royale');
    });

    // Apply saved theme on load
    const saved = localStorage.getItem('js_themekey') || 'royale';
    applyTheme(saved);
    if(saved !== 'royale'){
      // ensure active states
      panel.querySelectorAll('.theme-swatch').forEach(el=> el.classList.toggle('active', el.dataset.theme===saved));
    }

    // Global Dark/Light — icon di navbar untuk seluruh efek (single init)
    function initGlobalDark(){
      const btn = document.getElementById('dashDarkToggle');
      if(!btn || btn.dataset.darkInit) return;
      btn.dataset.darkInit = '1';
      function applyDark(isDark){
        document.body.classList.toggle('dark-mode', isDark);
        btn.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars"></i>';
        btn.title = isDark ? 'Light mode' : 'Dark mode';
        btn.setAttribute('aria-label', isDark ? 'Light mode' : 'Dark mode');
        try{ localStorage.setItem('js_darkmode', isDark ? '1' : '0'); }catch(e){}
      }
      const savedDark = (function(){ try{ return localStorage.getItem('js_darkmode')==='1'; }catch(e){ return false; }})();
      applyDark(savedDark);
      btn.addEventListener('click', ()=>{
        const isDark = !document.body.classList.contains('dark-mode');
        applyDark(isDark);
        if(window.dashToast) dashToast(isDark ? 'Dark mode aktif — seluruh dashboard' : 'Light mode aktif', 'info');
      });
    }
    setTimeout(initGlobalDark, 30);
    document.addEventListener('DOMContentLoaded', initGlobalDark);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', createUI);
  } else {
    createUI();
  }
  // Fallback untuk 404/500 minimal (tanpa createUI, tetap butuh dark toggle)
  document.addEventListener('DOMContentLoaded', ()=>{
    const btn = document.getElementById('dashDarkToggle');
    if(btn && !btn.dataset.darkInit){
      const applyDark = (isDark)=>{
        document.body.classList.toggle('dark-mode', isDark);
        btn.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars"></i>';
        try{ localStorage.setItem('js_darkmode', isDark ? '1' : '0'); }catch(e){}
      };
      const saved = (function(){ try{ return localStorage.getItem('js_darkmode')==='1'; }catch(e){ return false; }})();
      applyDark(saved);
      btn.dataset.darkInit='1';
      btn.addEventListener('click', ()=>{
        const isDark = !document.body.classList.contains('dark-mode');
        applyDark(isDark);
        if(window.dashToast) dashToast(isDark ? 'Dark mode aktif' : 'Light mode aktif', 'info');
      });
    }
  });
})();
