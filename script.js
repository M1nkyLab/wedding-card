const supabaseUrl = 'https://dfmnjocvoiqdilcpjpvp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmbW5qb2N2b2lxZGlsY3BqcHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0Nzg4OTksImV4cCI6MjEwNjA1NDg5OX0.ESRMINUBmFz1ae2Pta2xfYxwk3JYkQxEUNfzNWpVLq0';
let supabaseClient = null;
try {
  if (window.supabase) {
    supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
  } else {
    console.warn("Supabase failed to load (possibly blocked by an adblocker or network).");
  }
} catch(e) {
  console.error("Supabase error:", e);
}

async function fetchSupabaseMessages() {
  if (!supabaseClient) return [];
  const { data, error } = await supabaseClient.from('rsvps').select('*').order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return data.map(r => ({
    name: r.name,
    attend: r.attend,
    guests: r.guests,
    message: r.message,
    photoData: r.photo_data,
    ts: new Date(r.created_at).getTime()
  }));
}
/* ==========================================================================
   Undangan Pernikahan Digital — Mohd Razi & Norfaiezah
   Interaksi: nama tetamu, musik, countdown, animasi scroll, galeri,
   RSVP, amplop digital, kelopak bunga jatuh.
   ========================================================================== */

"use strict";

/* --------------------------------------------------------------------------
   KONFIGURASI — silakan edit bagian ini
   -------------------------------------------------------------------------- */
const CONFIG = {
  // Nomor rekening & e-wallet (SAAT INI MASIH CONTOH — ganti dengan yang asli!)
  bankAccounts: [
    { brand: "Bank BCA",    type: "Transfer Bank",  number: "1234567890",    holder: "Dian Ayu Puspa Sari" },
    { brand: "Bank Mandiri", type: "Transfer Bank", number: "1230007890123", holder: "Iqbal Pradana" },
  ],
  ewallets: [
    { brand: "DANA",  type: "E-Wallet", number: "0812-xxxx-xxxx", holder: "Dian Ayu Puspa Sari" },
    { brand: "GoPay", type: "E-Wallet", number: "0812-xxxx-xxxx", holder: "Iqbal Pradana" },
  ],
  // Alamat pengiriman kado fisik
  giftAddress: {
    receiver: "Dian Ayu Puspa Sari",
    phone: "0812-xxxx-xxxx",
    address: "Jl. Contoh Alamat No. 10, Kel. Air Putih, Kec. Tuah Madani, Kota Pekanbaru, Riau 28127",
  },
  // OPSIONAL: URL Web App Google Apps Script untuk mencatat RSVP ke Google Sheets.
  // Biarkan kosong ("") untuk menyimpan ucapan hanya di perangkat tetamu (localStorage).
  // Panduan lengkap ada di README.md.
  rsvpWebAppUrl: "",

  // Lagu latar: Custom Youtube Link
  youtubeVideoId: "LE6-bNefqlc",

  // Tanggal & waktu akad (WIB) — dipakai countdown & kalender
  weddingDateISO: "2026-10-11T12:00:00+08:00",
};

/* --------------------------------------------------------------------------
   Utilitas
   -------------------------------------------------------------------------- */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const pad = (n) => String(n).padStart(2, "0");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2400);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback untuk browser lama / konteks non-HTTPS
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}

/* --------------------------------------------------------------------------
   1. Nama Tetetamu Jemputan (dinamis dari URL)
   Mendukung: https://site.com/?to=Joko  atau  https://site.com/Joko
   -------------------------------------------------------------------------- */
function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  let name = params.get("to") || params.get("nama") || params.get("tetamu") || "";

  if (!name) {
    // Ambil segmen pertama path, mis. /Joko -> "Joko" (diaktifkan lewat vercel.json)
    const seg = decodeURIComponent(window.location.pathname.replace(/\/+$/, "").split("/").pop() || "");
    const looksLikeName = /^[A-Za-z0-9 ._%-]{1,60}$/.test(seg) && !/\.(html?|css|js|svg|png|jpe?g|webp|ico|json|txt|xml)$/i.test(seg);
    if (seg && looksLikeName) name = seg;
  }

  if (!name) return "";
  return name
    .replace(/[+_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
}

function initGuestName() {
  const name = getGuestName();
  const el = $("#guest-name");
  if (el) el.textContent = name || "Tetetamu Jemputan";
  const input = $("#f-nama");
  if (input && name) input.value = name;
}

/* --------------------------------------------------------------------------
   2. Sampul: buka undangan
   -------------------------------------------------------------------------- */
function initCover() {
  const cover = $("#cover");
  const btn = $("#btn-open");
  if (!cover || !btn) return;

  btn.addEventListener("click", () => {
    document.body.classList.add("opened");
    cover.classList.add("leaving");
    window.setTimeout(() => cover.classList.add("gone"), 1100);
    playMusic();      // mulai lagu setelah gestur pengguna (dibolehkan browser)
    $("#beranda")?.scrollIntoView({ behavior: "auto" });
  });
}

/* --------------------------------------------------------------------------
   3. Musik latar (Native Audio)
   -------------------------------------------------------------------------- */
let wantMusic = false;
let userPaused = false;
let audioPlayer = null;

function initMusic() {
  audioPlayer = document.getElementById("bg-music");
  if (!audioPlayer) return;
  audioPlayer.volume = 0.8;

  const btn = $("#btn-music");
  
  audioPlayer.addEventListener("play", () => {
    btn?.classList.add("playing");
    btn?.setAttribute("aria-label", "Jeda musik latar");
  });

  audioPlayer.addEventListener("pause", () => {
    btn?.classList.remove("playing");
    btn?.setAttribute("aria-label", "Putar musik latar");
  });

  btn?.addEventListener("click", () => {
    if (!audioPlayer.paused) {
      userPaused = true;
      audioPlayer.pause();
    } else {
      userPaused = false;
      audioPlayer.play().catch(e => toast("Sila berinteraksi dengan halaman terlebih dahulu"));
    }
  });
}

function playMusic() {
  wantMusic = true;
  if (audioPlayer && !userPaused) {
    audioPlayer.play().catch(e => {
      // Auto-play prevented
    });
  }
}

/* --------------------------------------------------------------------------
   4. Countdown menuju hari H
   -------------------------------------------------------------------------- */
function initCountdown() {
  const target = new Date(CONFIG.weddingDateISO).getTime();
  const els = {
    d: $("#cd-days"), h: $("#cd-hours"), m: $("#cd-mins"), s: $("#cd-secs"),
  };
  const doneMsg = $("#countdown-done");

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      Object.values(els).forEach((el) => el && (el.textContent = "00"));
      if (doneMsg) doneMsg.hidden = false;
      return;
    }
    const sec = Math.floor(diff / 1000);
    els.d && (els.d.textContent = pad(Math.floor(sec / 86400)));
    els.h && (els.h.textContent = pad(Math.floor((sec % 86400) / 3600)));
    els.m && (els.m.textContent = pad(Math.floor((sec % 3600) / 60)));
    els.s && (els.s.textContent = pad(sec % 60));
    setTimeout(tick, 1000);
  }
  tick();
}

/* --------------------------------------------------------------------------
   5. Animasi muncul saat scroll (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initReveal() {
  const items = $$("[data-reveal]");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("revealed"));
    return;
  }
  items.forEach((el) => {
    const d = parseInt(el.dataset.delay || "0", 10);
    if (d) el.style.setProperty("--d", d + "ms");
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  items.forEach((el) => io.observe(el));
}

/* --------------------------------------------------------------------------
   6. Dock navigasi: tandai menu aktif sesuai section terlihat
   -------------------------------------------------------------------------- */
function initDock() {
  const links = $$(".dock-link");
  const sections = links
    .map((a) => $(a.getAttribute("href")))
    .filter(Boolean);
  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) =>
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id)
        );
      });
    },
    { rootMargin: "-42% 0px -52% 0px" }
  );
  sections.forEach((s) => io.observe(s));
}

/* --------------------------------------------------------------------------
   7. Galeri: lightbox sederhana
   -------------------------------------------------------------------------- */
function initGallery() {
  const items = $$("#masonry .g-item img");
  const box = $("#lightbox");
  const img = $("#lb-img");
  const cap = $("#lb-cap");
  if (items.length === 0 || !box) return;

  let idx = 0;

  function show(i) {
    idx = (i + items.length) % items.length;
    const src = items[idx].currentSrc || items[idx].src;
    img.src = src;
    img.alt = items[idx].alt || "";
    cap.textContent = items[idx].alt || "";
    box.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function close() {
    box.classList.remove("open");
    document.body.style.overflow = "";
  }

  items.forEach((el, i) => {
    el.parentElement.addEventListener("click", () => show(i));
    el.parentElement.setAttribute("tabindex", "0");
    el.parentElement.setAttribute("role", "button");
    el.parentElement.setAttribute("aria-label", "Perbesar foto: " + (el.alt || "galeri"));
    el.parentElement.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(i); }
    });
  });

  $("#lb-close")?.addEventListener("click", close);
  $("#lb-prev")?.addEventListener("click", () => show(idx - 1));
  $("#lb-next")?.addEventListener("click", () => show(idx + 1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
}

/* --------------------------------------------------------------------------
   8. Amplop digital: render kartu dari CONFIG + tombol salin
   -------------------------------------------------------------------------- */
function giftCardHTML({ brand, type, number, holder }, icon) {
  return `
    <article class="gift-card card">
      <div class="gift-head">
        <span class="gift-brand"><span class="g-dot"></span>${escapeHTML(brand)}</span>
        <span class="gift-type">${escapeHTML(type)}</span>
      </div>
      <p class="gift-number">${escapeHTML(number)}</p>
      <p class="gift-holder">a.n. ${escapeHTML(holder)}</p>
      <button class="gift-copy" type="button" data-copy="${escapeHTML(number)}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15"/></svg>
        <span>Salin Nomor</span>
      </button>
    </article>`;
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

function initGift() {
  const wrap = $("#gift-cards");
  const addrWrap = $("#gift-address");
  if (wrap) {
    wrap.innerHTML = [...CONFIG.bankAccounts, ...CONFIG.ewallets]
      .map((acc) => giftCardHTML(acc))
      .join("");
  }
  if (addrWrap) {
    const a = CONFIG.giftAddress;
    addrWrap.innerHTML = `
      <article class="gift-card card gift-card--address">
        <div class="gift-head">
          <span class="gift-brand"><span class="g-dot"></span>Kirim Kado</span>
          <span class="gift-type">Alamat Fisik</span>
        </div>
        <p class="gift-number">${escapeHTML(a.address)}</p>
        <p class="gift-holder">Penerima: ${escapeHTML(a.receiver)} &middot; ${escapeHTML(a.phone)}</p>
        <button class="gift-copy" type="button" data-copy="${escapeHTML(a.address)}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15"/></svg>
          <span>Salin Alamat</span>
        </button>
      </article>`;
  }

  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    const ok = await copyText(btn.dataset.copy);
    toast(ok ? "Berjaya disalin ✓" : "Gagal menyalin, sila salin secara manual.");
  });
}

/* --------------------------------------------------------------------------
   9. RSVP & Ucapan (localStorage + opsional Google Apps Script)
   -------------------------------------------------------------------------- */
const STORE_KEY = "di-ucapan-v1";
const SEED_MESSAGES = [
  { name: "Keluarga Besar Pengantin Perempuan", attend: "Hadir", guests: "2", message: "Selamat menempuh alam perkahwinan, Mohd Razi & Norfaiezah! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.", ts: Date.now() - 3 * 86400000 },
  { name: "Sahabat Kecil Mohd Razi", attend: "Hadir", guests: "1", message: "Akhirnya tiba juga hari ini, Bro! Barakallahu lakuma wa baraka alaikuma. Sampai jumpa di hari bahagia!", ts: Date.now() - 2 * 86400000 },
  { name: "Alumni SMA Negeri", attend: "Masih Ragu", guests: "1", message: "Semoga lancar acaranya! Kami usahakan datang, doa terbaik untuk kalian berdua.", ts: Date.now() - 86400000 },
];

function loadMessages() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveMessages(list) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(list)); } catch { /* abaikan */ }
}

function badgeClass(attend) {
  if (attend === "Hadir") return "b-hadir";
  if (attend === "Berhalangan") return "b-berhalangan";
  return "b-ragu";
}

function formatDate(ts) {
  try {
    return new Date(ts).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  } catch { return ""; }
}

async function renderMessages() {
  const list = $("#ucapan-list");
  const count = $("#ucapan-count");
  if (!list) return;
  
  list.innerHTML = "<p style='text-align:center;'>Memuatkan ucapan...</p>";
  const all = await fetchSupabaseMessages();
  list.innerHTML = "";
  
  if(all.length === 0) {
     list.innerHTML = "<p style='text-align:center; color:#666;'>Belum ada ucapan. Jadilah yang pertama!</p>";
  }

  all.forEach((m) => {
    const item = document.createElement("div");
    item.className = "u-item";
    
    

    const avatar = document.createElement("span");
    avatar.className = "u-avatar";
    avatar.textContent = (m.name || "?").trim().charAt(0).toUpperCase();

    const body = document.createElement("div");
    body.className = "u-body";

    const head = document.createElement("div");
    head.className = "u-head";
    const name = document.createElement("span");
    name.className = "u-name";
    name.textContent = m.name || "Anonim";
    head.append(name);

    const time = document.createElement("div");
    time.className = "u-time";
    time.textContent = formatDate(m.ts) + (m.guests && m.guests !== "0" ? ` • ${m.guests} tetamu` : "");

    const msg = document.createElement("p");
    msg.className = "u-msg";
    msg.textContent = m.message || "";
    
        if (m.photoData) {
      const img = document.createElement("img");
      img.src = m.photoData;
      item.append(img);
    }
    body.append(head, time, msg);
    item.append(body);
    list.append(item);
  });

  if (count) count.textContent = `(${all.length})`;
}let finalPhotoStripBase64 = "";


function initRSVP() {
  renderMessages();
  
  const searchInput = document.getElementById("ucapan-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const items = document.querySelectorAll(".u-item");
      items.forEach(item => {
        const nameText = item.querySelector(".u-name")?.textContent.toLowerCase() || "";
        if (nameText.includes(term)) {
          item.style.display = "inline-block";
        } else {
          item.style.display = "none";
        }
      });
    });
  }
  const form = $("#rsvp-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nama = form.nama.value.trim();
    const pesan = form.pesan.value.trim();
    if (!nama) { toast("Sila isi nama anda terlebih dahulu."); form.nama.focus(); return; }
    const btnSubmit = document.getElementById("btn-submit");
    if(btnSubmit) { btnSubmit.disabled = true; btnSubmit.innerHTML = "Memuat naik..."; }

    const data = {
      name: nama.slice(0, 60),
      attend: "Hadir",
      guests: "1",
      message: pesan.slice(0, 500)
    };
    
    const { error } = await supabaseClient.from('rsvps').insert([{
        name: data.name,
        attend: data.attend,
        guests: data.guests,
        message: data.message
    }]);

    if(error) {
        toast("Ralat pangkalan data! Sila cuba lagi.");
        console.error(error);
    } else {
        await renderMessages();
    }
    form.reset();
    if(btnSubmit) { btnSubmit.disabled = false; btnSubmit.innerHTML = "Hantar Ucapan"; }
    const guest = getGuestName();
    if (guest) form.nama.value = guest;
    toast("Terima kasih atas doa & pengesahan anda");
  });
}


function initPetals() {
  if (prefersReducedMotion) return;
  const canvas = $("#petals");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const COLORS = [
    "rgba(192, 131, 135, 0.50)",
    "rgba(226, 189, 188, 0.55)",
    "rgba(233, 211, 163, 0.55)",
    "rgba(255, 250, 246, 0.40)",
  ];

  let W, H, petals = [], raf = null, running = true;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    const n = Math.min(26, Math.max(12, Math.floor(W / 55)));
    petals = Array.from({ length: n }, () => spawn(true));
  }

  function spawn(anywhere) {
    return {
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : -20,
      size: 5 + Math.random() * 7,
      speedY: 0.35 + Math.random() * 0.75,
      sway: 0.6 + Math.random() * 1.4,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      phase: Math.random() * Math.PI * 2,
    };
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.55, p.size * 0.75, p.size * 0.6, 0, p.size);
    ctx.bezierCurveTo(-p.size * 0.75, p.size * 0.6, -p.size * 0.9, -p.size * 0.55, 0, -p.size);
    ctx.fill();
    ctx.restore();
  }

  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    petals.forEach((p, i) => {
      p.phase += 0.012;
      p.y += p.speedY;
      p.x += Math.sin(p.phase) * p.sway * 0.4;
      p.angle += p.spin;
      if (p.y > H + 24) petals[i] = spawn(false);
      drawPetal(p);
    });
    raf = requestAnimationFrame(frame);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    } else if (!prefersReducedMotion) {
      running = true;
      raf = requestAnimationFrame(frame);
    }
  });

  window.addEventListener("resize", resize);
  resize();
  raf = requestAnimationFrame(frame);
}

/* --------------------------------------------------------------------------
   Inisialisasi
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initGuestName();
  initCover();
  initMusic();
  initCountdown();
  initReveal();
  initDock();
  initGallery();
  initGift();
  initRSVP();
  initPetals();
});





