// =============================================================
// Oyun Dükkanı - kartları oyunlar.js listesinden çizer.
// Burayı değiştirmene gerek yok; yeni oyun için oyunlar.js'i düzenle.
// =============================================================

(function () {
  const KOK = 'https://enesozkayaa.github.io/';
  const vitrin = document.getElementById('vitrin');
  const filtreler = document.getElementById('filtreler');

  const FILTRELER = [
    { id: 'hepsi', ad: '✨ Hepsi', uyar: () => true },
    { id: 'bot', ad: '🤖 Botla oynanır', uyar: o => o.etiketler.some(e => e.includes('Bot')) },
    { id: 'sesli', ad: '🎤 Sesli', uyar: o => o.etiketler.some(e => e.includes('Sesli')) },
    { id: 'kart', ad: '🃏 Kart & zar', uyar: o => o.tur === 'kart' },
    { id: 'parti', ad: '🎉 Parti', uyar: o => o.tur === 'parti' },
    { id: 'kelime', ad: '🔤 Kelime', uyar: o => o.tur === 'kelime' },
    { id: 'strateji', ad: '🧠 Strateji', uyar: o => o.tur === 'strateji' },
    { id: 'aksiyon', ad: '⚡ Aksiyon', uyar: o => o.tur === 'aksiyon' },
  ];

  const el = (etiket, sinif, yazi) => {
    const d = document.createElement(etiket);
    if (sinif) d.className = sinif;
    if (yazi != null) d.textContent = yazi;
    return d;
  };

  // Oyun yeni sekmede açılsın, dükkan sekmesi açık kalsın
  const yeniSekme = a => { a.target = '_blank'; a.rel = 'noopener'; return a; };

  function kartYap(o) {
    const adres = KOK + o.repo + '/';
    const kart = el('article', 'kart');
    kart.style.setProperty('--renk', o.renk || '#333');

    // Kapak: oyunun kendi ikonu; yüklenemezse renkli zemin + emoji
    const kapak = el('a', 'kapak');
    kapak.href = adres;
    yeniSekme(kapak);
    kapak.setAttribute('aria-label', o.ad + ' oyununu aç');
    const yedek = el('span', 'yedek', o.emoji || '🎮');
    const resim = new Image();
    resim.alt = '';
    resim.loading = 'lazy';
    // ikonSurum: oyunun simgesi değişince oyunlar.js'te 1 artır, tarayıcı eskisini göstermesin
    resim.src = adres + 'ikonlar/ikon-512.png' + (o.ikonSurum ? '?v=' + o.ikonSurum : '');
    resim.onerror = () => resim.remove();
    kapak.append(yedek, resim);

    const govde = el('div', 'govde');
    govde.append(el('h2', null, o.ad), el('p', 'aciklama', o.aciklama));
    const rozetler = el('div', 'rozetler');
    o.etiketler.forEach(e => rozetler.append(el('span', 'rozet', e)));
    govde.append(rozetler);

    const oyna = el('a', 'oyna', '▶ Oyna');
    oyna.href = adres;
    yeniSekme(oyna);
    govde.append(oyna);

    kart.append(kapak, govde);
    return kart;
  }

  function goster(filtreId) {
    const f = FILTRELER.find(x => x.id === filtreId) || FILTRELER[0];
    vitrin.replaceChildren(...OYUNLAR.filter(f.uyar).map(kartYap));
    filtreler.querySelectorAll('button').forEach(b => b.classList.toggle('secili', b.dataset.id === f.id));
    try { localStorage.setItem('dukkanFiltre', f.id); } catch (e) { /* önemli değil */ }
  }

  FILTRELER.forEach(f => {
    if (f.id !== 'hepsi' && !OYUNLAR.some(f.uyar)) return; // boş filtreyi gösterme
    const b = el('button', null, f.ad);
    b.dataset.id = f.id;
    b.onclick = () => goster(f.id);
    filtreler.append(b);
  });

  let ilk = 'hepsi';
  try { ilk = localStorage.getItem('dukkanFiltre') || 'hepsi'; } catch (e) { /* önemli değil */ }
  goster(ilk);
})();
