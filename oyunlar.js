// =============================================================
// Oyun Dükkanı - OYUN LİSTESİ
// Yeni oyun eklemek için SADECE bu listeye bir satır blok ekle.
//   repo     : GitHub'daki depo adı (adres: enesozkayaa.github.io/<repo>/)
//   ad       : Kartta görünen isim
//   aciklama : Kısa Türkçe açıklama
//   etiketler: Küçük rozetler (ör. '🤖 Bot var', '🌐 Online', '🎤 Sesli')
//   tur      : Filtre için tür ('kart', 'parti', 'strateji', 'aksiyon', 'kelime')
//   renk     : İkon yüklenemezse kapakta kullanılacak renk
//   emoji    : İkon yüklenemezse kapakta görünecek emoji
//   ikonSurum: (isteğe bağlı) oyunun simgesi değişince 1 artır, dükkan yenisini göstersin
// İkon otomatik olarak <repo>/ikonlar/ikon-512.png adresinden alınır.
// Sonra sw.js'teki ONBELLEK numarasını 1 artır, commit + push yap.
// =============================================================

const OYUNLAR = [
  {
    repo: 'sahte-haydut', ad: 'Sahte Haydut', tur: 'parti', renk: '#3b2414', emoji: '🤠',
    aciklama: 'Vahşi Batı kasabasında kalabalığa karış. Haydutlar kasabalı gibi gezip gizlice soygun yapar, şerifler gerçek oyuncuları bulup vurur.',
    etiketler: ['🌐 Sadece online 2–10', '🎤 Sesli + 📻 telsiz', '🕵️ Gizli rol', '🧊 3D'],
  },
  {
    repo: 'kule-savaslari', ad: 'Kule Savaşları', tur: 'aksiyon', renk: '#1b2a44', emoji: '🏗️',
    aciklama: 'Fizikli kule dikme yarışı. Parçaları vinçle indir, kuleni devirmeden yükselt, rakiplerine buz ve rüzgâr gönder.',
    etiketler: ['🤖 Bot var', '🌐 Online 2–4', '🎤 Sesli', '🧊 3D'],
  },
  {
    repo: 'dur-be-patlama', ad: 'Dur Be Patlama!', tur: 'parti', renk: '#1a0f0a', emoji: '💣', ikonSurum: 2,
    aciklama: 'Kulaktan kulağa bomba çözme. Sondaki oyuncu bombayı görür, diğerleri kılavuzu okur. Herkes sadece yanındakini duyar!',
    etiketler: ['🌐 Sadece online 2–4', '🎤 Sesli', '🧊 3D'],
  },
  {
    repo: 'robo-turnuva', ad: 'Robo Turnuva', tur: 'aksiyon', renk: '#04030c', emoji: '🤖',
    aciklama: 'Uzayda robot mini oyunları: Görünmez Lazer, Karanlık Ev, Mayın Koridoru ve daha fazlası. Genel puan tablosu.',
    etiketler: ['🤖 Bot var', '🌐 Online', '🎮 10 mini oyun', '🧊 3D'],
  },
  {
    repo: 'yalancinin-mumu', ad: 'Yalancının Mumu', tur: 'kart', renk: '#2a170c', emoji: '🕯️',
    aciklama: 'Kovboy salonunda blöf kartları. Kartını kapalı at, yalan söyleyeni yakala. Yakalanan tabancayla şansını dener.',
    etiketler: ['🤖 Bot var', '🌐 Online 2–4', '🎤 Sesli', '🧊 3D'],
  },
  {
    repo: 'yalanci-zar', ad: 'Yalancı Zar', tur: 'kart', renk: '#2a170c', emoji: '🎲',
    aciklama: 'Kupanın altındaki zarlarla blöf. "En az X tane Y" de, ya artır ya "Yalancı!" diye bağır. Kaybeden zehirli kadehten içer.',
    etiketler: ['🤖 Bot var', '🌐 Online 2–4', '🎤 Sesli', '🧊 3D'],
  },
  {
    repo: 'olumlu-yatzy', ad: 'Ölümlü Yatzy', tur: 'kart', renk: '#2a170c', emoji: '🎲',
    aciklama: 'Salonda herkes aynı anda zar atar, Yatzy kâğıdını doldurur. En yüksek puanı alan tabancayı kime doğrultacağını seçer.',
    etiketler: ['🤖 Bot var', '🌐 Online 2–4', '🎤 Sesli', '🧊 3D'],
  },
  {
    repo: 'papaz-kimde', ad: 'Papaz Kimde', tur: 'kart', renk: '#2a170c', emoji: '🃏',
    aciklama: 'Klasik papaz kaçırma. Yanındakinden kart çek, çiftleri at. Papaz elinde kalan ceza puanı alır.',
    etiketler: ['🤖 Bot var', '🌐 Online 2–4', '🎤 Sesli', '🧊 3D'],
  },
  {
    repo: 'kaptirik', ad: 'Kaptirik', tur: 'kart', renk: '#0f3d2a', emoji: '🀄',
    aciklama: '51 Okey. Perlerini diz, 51 ile aç, işle ve bitir. Tek başına ya da eşli oynanır.',
    etiketler: ['🤖 Bot var', '🌐 Online 4 kişi', '🎤 Sesli', '🧊 3D'],
  },
  {
    repo: 'kod-adi-cizim', ad: 'Kod Adı Çizim', tur: 'kelime', renk: '#2a170c', emoji: '✏️',
    aciklama: 'Kırmızı ve mavi takım. Kaptan ipucunu çizerek ya da yazarak verir, takım doğru kelimeleri bulur. Ölümcül kelimeye dikkat!',
    etiketler: ['🌐 Sadece online (en az 4)', '🎤 Sesli', '👥 Takımlı'],
  },
  {
    repo: 'resim-avi', ad: 'Resim Avı', tur: 'parti', renk: '#1d1436', emoji: '🖼️',
    aciklama: 'Anlatıcı bir resim için bir söz söyler, herkes kendi kartından benzerini koyar. Doğru resmi bul, başkalarını kandır.',
    etiketler: ['🌐 Sadece online 3–8', '🎤 Sesli'],
  },
  {
    repo: 'ters-ses', ad: 'Ters Ses', tur: 'parti', renk: '#1a1033', emoji: '🔄',
    aciklama: 'Ünlünün adı tersten çalınır. Duyduğunu taklit et, kendi sesini tersten dinle ve kim olduğunu tahmin et.',
    etiketler: ['🌐 Sadece online 2–8', '🎙️ Mikrofonla'],
  },
  {
    repo: 'hain-tayfa', ad: 'Hain Tayfa', tur: 'strateji', renk: '#0b2a3a', emoji: '🏴‍☠️',
    aciklama: 'Korsanlar hazineye yol kazar, ama aralarında gizli hainler var. Yolu tamamla ya da gizlice boz.',
    etiketler: ['🌐 Online 2–6', '📱 Tek telefonda', '🕵️ Gizli rol', '🧊 3D'],
  },
  {
    repo: 'lanetli-vazolar', ad: 'Lanetli Vazolar', tur: 'strateji', renk: '#050307', emoji: '🏺',
    aciklama: '30 vazo, gizli yılanlar, tek çekiç. Yılanlarını sakla, rakibinin vazolarını kır. Korku dolu bir mahzen.',
    etiketler: ['🌐 Online 2–4', '📱 Tek telefonda', '🧊 3D'],
  },
  {
    repo: 'harf-avcilari', ad: 'Harf Avcıları', tur: 'kelime', renk: '#1e2235', emoji: '🔤',
    aciklama: 'Zar at, tahtada ilerle, harf topla ve kelime kur. Sözlükte olmayan kelimeye masa karar verir.',
    etiketler: ['🌐 Online 2–6', '📱 Tek telefonda', '🧊 3D'],
  },
];
