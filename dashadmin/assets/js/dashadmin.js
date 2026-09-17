/* DashAdmin JS */
(function(){
  const body = document.body;
  const sidebar = document.getElementById('dashSidebar');
  const overlay = document.getElementById('dashOverlay');
  const toggleBtns = document.querySelectorAll('[data-toggle="sidebar"]');

  function toggleSidebar(){
    if(window.innerWidth < 992){
      sidebar?.classList.toggle('open');
      overlay?.classList.toggle('show');
    } else {
      body.classList.toggle('sidebar-collapsed');
      try{ localStorage.setItem('dash_collapsed', body.classList.contains('sidebar-collapsed') ? '1':'0'); }catch(e){}
    }
  }
  toggleBtns.forEach(b=> b.addEventListener('click', toggleSidebar));
  overlay?.addEventListener('click', ()=>{
    sidebar?.classList.remove('open');
    overlay?.classList.remove('show');
  });

  // Restore collapsed state
  try{
    if(localStorage.getItem('dash_collapsed')==='1' && window.innerWidth>=992) body.classList.add('sidebar-collapsed');
  }catch(e){}

  // Subnav toggle
  document.querySelectorAll('.dash-nav-item > a, .dash-nav-item > button').forEach(el=>{
    const parent = el.closest('.dash-nav-item');
    const sub = parent?.querySelector('.dash-subnav');
    if(sub){
      el.addEventListener('click', (e)=>{
        e.preventDefault();
        parent.classList.toggle('open');
      });
    }
  });

  // Scroll to top
  const topBtn = document.getElementById('dashScrollTop');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 300) topBtn?.classList.add('show');
    else topBtn?.classList.remove('show');
  });
  topBtn?.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

  // Sidebar profile dropdown (terbuka ke atas)
  const sideBtn = document.getElementById('sideUserBtn');
  const sideMenu = document.getElementById('sideUserMenu');
  sideBtn?.addEventListener('click', (e)=>{
    e.stopPropagation();
    const open = sideMenu.classList.toggle('show');
    sideBtn.classList.toggle('open', open);
    sideBtn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.dash-sidebar-footer')){
      sideMenu?.classList.remove('show');
      sideBtn?.classList.remove('open');
      sideBtn?.setAttribute('aria-expanded','false');
    }
  });

  // Demo: close sidebar on link click (mobile)
  document.querySelectorAll('.dash-sidebar a').forEach(a=>{
    a.addEventListener('click', ()=>{
      if(window.innerWidth < 992){
        sidebar?.classList.remove('open');
        overlay?.classList.remove('show');
      }
    });
  });

  // Simple toast demo
  window.dashToast = function(msg, type='success'){
    let c = document.getElementById('dashToastContainer');
    if(!c){
      c = document.createElement('div');
      c.id='dashToastContainer';
      c.style.cssText='position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999;display:grid;gap:8px;';
      document.body.appendChild(c);
    }
    const el = document.createElement('div');
    el.style.cssText='padding:12px 18px;border-radius:10px;background:#1b3b36;color:#fff;font-size:13px;font-weight:600;box-shadow:0 8px 24px rgba(0,0,0,0.18);display:flex;align-items:center;gap:8px;';
    el.innerHTML = (type==='success'?'<i class="bi bi-check-circle-fill" style="color:#abcec6"></i>':'<i class="bi bi-info-circle"></i>') + msg;
    c.appendChild(el);
    setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateY(8px)'; el.style.transition='all .3s'; setTimeout(()=>el.remove(),300); },2600);
  };

  // ---------- Navbar dropdowns (bell / chat / profile) ----------
  function closeAllDropdowns(except){
    document.querySelectorAll('.dash-dd-menu.show').forEach(m=>{
      if(m.id !== except) m.classList.remove('show');
    });
  }
  document.querySelectorAll('[data-dd]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      const target = document.getElementById(btn.dataset.dd);
      const wasOpen = target?.classList.contains('show');
      closeAllDropdowns();
      if(target && !wasOpen) target.classList.add('show');
    });
  });
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.dash-dd')) closeAllDropdowns();
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      closeAllDropdowns();
      closeDashModal();
    }
  });

  // ---------- Modal engine ----------
  window.openDashModal = function(id){
    const m = document.getElementById(id);
    if(m) m.classList.add('show');
  };
  window.closeDashModal = function(id){
    if(id){
      document.getElementById(id)?.classList.remove('show');
    } else {
      document.querySelectorAll('.dash-modal.show').forEach(m=>m.classList.remove('show'));
    }
  };
  document.querySelectorAll('.dash-modal').forEach(m=>{
    m.addEventListener('click', (e)=>{ if(e.target === m) m.classList.remove('show'); });
    m.querySelectorAll('[data-modal-close]').forEach(b=> b.addEventListener('click', ()=> m.classList.remove('show')));
  });

  // ---------- Global "Tambah Pesanan" modal (dibuat otomatis bila belum ada) ----------
  window.openOrderModal = function(){
    let m = document.getElementById('dashOrderModal');
    if(!m){
      m = document.createElement('div');
      m.className='dash-modal'; m.id='dashOrderModal';
      m.innerHTML = `
        <div class="dash-modal-box">
          <div class="dash-modal-header">
            <h4><i class="bi bi-bag-plus"></i> Tambah Pesanan Baru</h4>
            <button class="dash-modal-close" data-modal-close aria-label="Tutup"><i class="bi bi-x-lg"></i></button>
          </div>
          <div class="dash-modal-body">
            <div style="display:grid;gap:14px">
              <div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">Nama Mempelai Pria</label><input class="dash-input" id="ordPria" placeholder="cth: Arya Pratama"></div>
              <div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">Nama Mempelai Wanita</label><input class="dash-input" id="ordWanita" placeholder="cth: Nabila Putri"></div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">Paket</label>
                  <select class="dash-select" id="ordPaket"><option>Rp 0 — Silver Trial</option><option selected>Rp 99.000 — Gold</option><option>Rp 189.000 — Platinum</option></select></div>
                <div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">Tema</label>
                  <select class="dash-select" id="ordTema"><option>Nusantara Royale</option><option>Botanical Whispers</option><option>Minimalist Monogram</option><option>Golden Jasmine</option><option>Serenity White</option><option>Emerald Heritage</option></select></div>
              </div>
              <div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">Tanggal Acara</label><input class="dash-input" type="date" id="ordTanggal"></div>
            </div>
          </div>
          <div class="dash-modal-footer">
            <button class="dash-btn dash-btn-secondary" data-modal-close>Batal</button>
            <button class="dash-btn dash-btn-primary" id="ordSave"><i class="bi bi-check-lg"></i> Simpan Pesanan</button>
          </div>
        </div>`;
      document.body.appendChild(m);
      m.addEventListener('click', e=>{ if(e.target===m) m.classList.remove('show'); });
      m.querySelectorAll('[data-modal-close]').forEach(b=> b.addEventListener('click', ()=> m.classList.remove('show')));
      m.querySelector('#ordSave').addEventListener('click', ()=>{
        const pria = m.querySelector('#ordPria').value.trim();
        const wanita = m.querySelector('#ordWanita').value.trim();
        if(!pria || !wanita){ dashToast('Lengkapi nama mempelai dulu','info'); return; }
        m.classList.remove('show');
        dashToast(`Pesanan ${pria} & ${wanita} tersimpan`);
        m.querySelectorAll('input').forEach(i=> i.value='');
      });
    }
    m.classList.add('show');
  };

  // Demo chart simple canvas draw if exists
  document.querySelectorAll('canvas[data-chart]').forEach(canvas=>{
    const ctx = canvas.getContext('2d');
    const type = canvas.dataset.chart;
    const w = canvas.width = canvas.offsetWidth * 2;
    const h = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2,2);
    const cw = canvas.offsetWidth, ch = canvas.offsetHeight;
    ctx.clearRect(0,0,cw,ch);
    if(type==='line'){
      ctx.strokeStyle='#1b3b36';ctx.lineWidth=2;ctx.beginPath();
      const pts=[30,60,45,40,70,80,55,35,60,45];
      pts.forEach((v,i)=>{
        const x = (i/(pts.length-1))* (cw-40)+20;
        const y = ch-30 - (v/100)*(ch-60);
        if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      });
      ctx.stroke();
      // fill
      ctx.lineTo(cw-20, ch-30); ctx.lineTo(20,ch-30); ctx.closePath();
      ctx.fillStyle='rgba(27,59,54,0.08)';ctx.fill();
      // dots
      pts.forEach((v,i)=>{
        const x = (i/(pts.length-1))* (cw-40)+20;
        const y = ch-30 - (v/100)*(ch-60);
        ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fillStyle='#1b3b36';ctx.fill();
        ctx.beginPath();ctx.arc(x,y,6,0,Math.PI*2);ctx.strokeStyle='rgba(27,59,54,0.2)';ctx.stroke();
      });
    } else if(type==='bar'){
      const vals=[45,70,55,80,60,40,65];
      const barW = (cw-60)/vals.length - 10;
      vals.forEach((v,i)=>{
        const x = 30 + i*((cw-60)/vals.length);
        const hh = (v/100)*(ch-60);
        const y = ch-30 - hh;
        ctx.fillStyle = i===3?'#1b3b36':'#c7eae2';
        ctx.beginPath();ctx.roundRect(x, y, barW, hh, 6);ctx.fill();
      });
    } else if(type==='donut'){
      const vals=[35,25,20,20];const cols=['#1b3b36','#abcec6','#e9c176','#83523d'];
      let cur=-Math.PI/2; const cx=cw/2, cy=ch/2, r=Math.min(cw,ch)/2 -20, ir=r*0.6;
      vals.forEach((v,i)=>{
        const ang = (v/100)*Math.PI*2;
        ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,cur,cur+ang);ctx.closePath();ctx.fillStyle=cols[i];ctx.fill();cur+=ang;
      });
      ctx.beginPath();ctx.arc(cx,cy,ir,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();
      ctx.fillStyle='#032521';ctx.font='700 16px Inter';ctx.textAlign='center';ctx.fillText('75%',cx,cy+5);
    }
  });

})();
