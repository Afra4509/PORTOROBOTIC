(function () {
  'use strict';

  const D = portfolioData;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const IMGS = typeof portfolioImages === 'undefined' ? {} : portfolioImages;
  let touchMode = !canHover;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const pad = (n, l = 2) => String(n).padStart(l, '0');
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ESC[c]);
  const asset = (p) => (!p ? '' : /^(https?:|data:)/.test(p) ? p : encodeURI(p));
  const projectIndex = (id) => D.projects.findIndex((p) => p.id === id);

  const svg = (w, body) => {
    let n = 0;
    const b = body.replace(/<(path|rect|circle|line|polyline|polygon|ellipse)\b/g, (m) => `${m} pathLength="1" style="--n:${n++}"`);
    return `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${b}</svg>`;
  };
  const ICONS = {
    code: svg(18, '<path d="M8.5 7.5L4 12l4.5 4.5"/><path d="M15.5 7.5L20 12l-4.5 4.5"/><path d="M13.5 5l-3 14"/>'),
    chip: svg(18, '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>'),
    chart: svg(18, '<path d="M3.5 20.5h17"/><path d="M6.5 16.5v-4"/><path d="M11 16.5V8"/><path d="M15.5 16.5v-6"/><path d="M20 16.5V4.5"/>'),
    wifi: svg(18, '<path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M5.5 12.5a9.5 9.5 0 0 1 13 0"/><path d="M8.7 16a5 5 0 0 1 6.6 0"/><circle cx="12" cy="19.2" r="1"/>'),
    desktop: svg(18, '<rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M2.5 8h19"/><circle cx="5.5" cy="6" r=".4"/><path d="M9 20.5h6"/><path d="M12 17v3.5"/>'),
    terminal: svg(18, '<rect x="2.5" y="4" width="19" height="16" rx="2"/><path d="M6.5 9.5l3 2.5-3 2.5"/><path d="M12 15.5h5"/>'),

    pcb: svg(18, '<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M7 3v4.5h4.5L14 10v4"/><circle cx="14" cy="15.8" r="1.6"/><path d="M21 13h-3l-1.5 1.5"/><circle cx="7.5" cy="16.5" r="1.6"/>'),
    power: svg(18, '<path d="M13.5 2.5L5 13.5h6.5L10.5 21.5 19 10.5h-6.5z"/>'),
    rf: svg(18, '<circle cx="12" cy="10" r="2"/><path d="M12 12v9.5"/><path d="M8.6 6.6a4.8 4.8 0 0 0 0 6.8"/><path d="M15.4 6.6a4.8 4.8 0 0 1 0 6.8"/><path d="M5.6 3.6a9 9 0 0 0 0 12.8"/><path d="M18.4 3.6a9 9 0 0 1 0 12.8"/>'),
    firmware: svg(18, '<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M10 10l-2 2 2 2"/><path d="M14 10l2 2-2 2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>'),
    cloud: svg(18, '<path d="M7 18.5a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 18 8.8a4.9 4.9 0 0 1-.5 9.7z"/><path d="M12 15.5v-5"/><path d="M9.8 12.5L12 10.3l2.2 2.2"/>'),
    network: svg(18, '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18.5" r="2.5"/><circle cx="19" cy="18.5" r="2.5"/><path d="M10.7 7.2L6.3 16.3"/><path d="M13.3 7.2l4.4 9.1"/><path d="M7.5 18.5h9"/>'),
    gauge: svg(18, '<path d="M3.5 17.5a8.5 8.5 0 1 1 17 0"/><path d="M12 17.5l4.2-5"/><circle cx="12" cy="17.5" r="1.3"/><path d="M6.5 13.5l1.2.7M12 7.5v1.4M17.5 13.5l-1.2.7"/>'),
    robot: svg(18, '<rect x="4.5" y="8" width="15" height="11" rx="3"/><path d="M12 8V4.5"/><circle cx="12" cy="3.5" r="1"/><circle cx="9.3" cy="13" r="1.1"/><circle cx="14.7" cy="13" r="1.1"/><path d="M2 12v3M22 12v3"/>'),

    whatsapp: svg(18, '<path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z"/><path d="M9 8.5c0 3.5 2.6 6.4 6 6.5l1-1.6-2-1-1 .9c-1-.4-2-1.4-2.4-2.4l.9-1-1-2z"/>'),
    github: svg(18, '<path d="M9 19c-4.5 1.4-4.5-2.3-6.3-2.8"/><path d="M15 21.5v-3.4a3 3 0 0 0-.8-2.3c2.8-.3 5.8-1.4 5.8-6.2a4.8 4.8 0 0 0-1.3-3.4 4.5 4.5 0 0 0-.1-3.4s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6.2 0C6.6 2.7 5.6 3 5.6 3a4.5 4.5 0 0 0-.1 3.4 4.8 4.8 0 0 0-1.3 3.4c0 4.8 3 5.9 5.8 6.2a3 3 0 0 0-.8 2.3v3.2"/>'),
    linkedin: svg(18, '<rect x="2.5" y="2.5" width="19" height="19" rx="3"/><path d="M7.5 10.5v6"/><circle cx="7.5" cy="7.3" r=".6"/><path d="M11.5 16.5v-6"/><path d="M11.5 13a2.5 2.5 0 0 1 5 0v3.5"/>'),
    instagram: svg(18, '<rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".5"/>'),
    globe: svg(18, '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19"/><path d="M12 2.5a14.5 14.5 0 0 1 0 19"/><path d="M12 2.5a14.5 14.5 0 0 0 0 19"/>'),
    arrow: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`
  };
  const btnArrow = (c, diag) => `<span class="btn-arrow${diag ? ' diag' : ''}" aria-hidden="true"><i>${c}</i><i>${c}</i></span>`;

  function getSkillIcon(group) {
    if (/bahasa|pemrograman|code/i.test(group)) return ICONS.code;
    if (/iot|hardware|elektronika/i.test(group)) return ICONS.chip;
    if (/data|visual/i.test(group)) return ICONS.chart;
    if (/jaringan|nirkabel|wireless|rf/i.test(group)) return ICONS.wifi;
    if (/aplikasi|desktop|web/i.test(group)) return ICONS.desktop;
    if (/sistem|tools|os/i.test(group)) return ICONS.terminal;
    return ICONS.chip;
  }

  const PROJECT_ICON = { PCB: 'pcb', Daya: 'power', RF: 'rf', Firmware: 'firmware', Cloud: 'cloud', Jaringan: 'network', Instrumentasi: 'gauge', Robotika: 'robot' };
  const getProjectIcon = (area) => ICONS[PROJECT_ICON[area]] || ICONS.chip;

  function getContactIcon(label) {
    if (/whatsapp|wa/i.test(label)) return ICONS.whatsapp;
    if (/github/i.test(label)) return ICONS.github;
    if (/linkedin/i.test(label)) return ICONS.linkedin;
    if (/instagram/i.test(label)) return ICONS.instagram;
    return ICONS.globe;
  }

  let engineReady = false;

  const ratioOf = (p) => { const m = IMGS[p]; return m ? clamp(m[0] / m[1], 0.6, 2.4).toFixed(4) : ''; };
  const arStyle = (p) => { const r = ratioOf(p); return r ? ` style="--ar:${r}"` : ''; };
  const midVariant = (v) => (v.find(([w]) => w >= 960) || v[v.length - 1])[1];

  function imgAttrs(p, sizes) {
    const m = IMGS[p];
    if (!m || !m[2].length) return `src="${esc(asset(p))}"${m ? ` width="${m[0]}" height="${m[1]}"` : ''}`;
    const set = m[2].map(([w, f]) => `${esc(asset(f))} ${w}w`).join(', ');
    return `src="${esc(asset(midVariant(m[2])))}" srcset="${set}" sizes="${sizes}" width="${m[0]}" height="${m[1]}" data-orig="${esc(asset(p))}"`;
  }

  function setImg(img, p, sizes) {
    const m = IMGS[p];
    delete img.dataset.fell;
    img.dataset.orig = asset(p);
    if (m && m[2].length) {
      img.sizes = sizes;
      img.srcset = m[2].map(([w, f]) => `${asset(f)} ${w}w`).join(', ');
      img.src = asset(midVariant(m[2]));
    } else {
      img.removeAttribute('srcset');
      img.src = asset(p);
    }
  }

  function imgFallback(e) {
    const img = e.target;
    if (!img || img.tagName !== 'IMG' || !img.dataset.orig || img.dataset.fell) return;
    if (img.currentSrc && decodeURI(img.currentSrc).endsWith(decodeURI(img.dataset.orig))) return;
    img.dataset.fell = '1';
    img.removeAttribute('srcset');
    img.src = img.dataset.orig;
  }

  function mediaHTML({ src, alt, fit, tag = 'div', attrs = '', cls = '', sizes = '100vw', priority = false }) {
    const fitStyle = fit ? ` style="object-fit:${fit}"` : '';
    if (/data-open/.test(attrs)) attrs += ' data-cursor="Lihat"';
    return `<${tag} class="media ${cls}" ${attrs}><span class="media-in"><img ${imgAttrs(src, sizes)} alt="${esc(alt)}" decoding="async"${priority ? ' fetchpriority="high"' : ''}${fitStyle} /></span></${tag}>`;
  }

  function setAR(img, host) {
    if (!img || !host) return;
    const apply = () => {
      if (!img.naturalWidth) return;
      host.style.setProperty('--ar', clamp(img.naturalWidth / img.naturalHeight, 0.6, 2.4).toFixed(4));
    };
    if (img.complete && img.naturalWidth) apply();
    img.addEventListener('load', apply);
  }

  function rollHTML(text) {
    let i = 0;
    return String(text).split(' ').map((w) =>
      `<span class="rw">${[...w].map((ch) => `<span class="rc"><span data-c="${esc(ch)}" style="--i:${i++}">${esc(ch)}</span></span>`).join('')}</span>`
    ).join(' ');
  }

  const GLYPHS = 'ABCDEFHKLMNPRSTUVXYZ0123456789/#<>_';
  function scramble(el, to) {
    if (!el) return;
    to = to == null ? (el.dataset.text || el.textContent) : String(to);
    el.dataset.text = to;
    if (reduce) { el.textContent = to; return; }
    cancelAnimationFrame(el._scr);
    const len = to.length, t0 = performance.now(), dur = Math.min(900, 280 + len * 32);
    const step = (now) => {
      const p = clamp((now - t0) / dur, 0, 1), n = Math.floor(easeOutExpo(p) * len);
      let out = to.slice(0, n);
      for (let i = n; i < len; i++) out += /\s|[,.]/.test(to[i]) ? to[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      el.textContent = out;
      if (p < 1) el._scr = requestAnimationFrame(step);
    };
    el._scr = requestAnimationFrame(step);
  }

  const SECTION_LINKS = [
    ['beranda', 'Beranda'], ['tentang', 'Tentang'], ['pengalaman', 'Pengalaman'], ['proyek', 'Proyek'],
    ['keahlian', 'Keahlian'], ['sertifikat', 'Sertifikat'], ['situs', 'Situs lain'], ['kontak', 'Kontak']
  ];
  const sectionNo = (id) => pad(SECTION_LINKS.findIndex(([s]) => s === id) + 1);

  function barcode(code) {
    let x = 0, bars = '';
    const add = (w, on) => { if (on) bars += `<rect x="${x}" y="0" width="${w}" height="24"/>`; x += w; };
    add(1, 1); add(1, 0); add(1, 1); add(2, 0);
    [...String(code)].forEach((ch) => {
      const d = parseInt(ch, 10) || 0;
      add(1 + (d % 3), 1); add(1 + ((d >> 1) % 2), 0); add(1 + ((d + 1) % 2), 1); add(2, 0);
    });
    add(1, 1); add(1, 0); add(1, 1);
    return `<svg viewBox="0 0 ${x} 24" preserveAspectRatio="none" fill="#EAF0E9">${bars}</svg>`;
  }

  function renderHero() {
    const p = D.profile;
    const name = $('#heroName');
    name.setAttribute('aria-label', p.name);
    let cc = 0;
    name.innerHTML = p.name.split(' ').map((w, i) =>
      `<span class="line" data-dir="${i % 2 ? 1 : -1}" aria-hidden="true"><span class="line-in">${[...w].map((ch) => `<span class="ch" style="--c:${cc++}">${esc(ch)}</span>`).join('')}</span></span>`
    ).join('');

    const proj = D.projects[projectIndex(p.heroProject)] || D.projects[0];
    $('#heroFigure').innerHTML = `<div class="hero-fig-in ar-host"${arStyle(p.heroImage)}><div class="hero-frame">` + mediaHTML({
      src: p.heroImage, alt: proj.name, fit: proj.fit, tag: 'button', sizes: '(max-width: 640px) 92vw, 40vw', priority: true,
      attrs: `type="button" data-open="project" data-index="${projectIndex(proj.id)}" aria-label="Lihat detail ${esc(proj.name)}"`
    }) + `</div><p class="hero-cap"><span><b>${esc(proj.id)}</b>&nbsp; ${esc(proj.name)}</span><span>${esc(proj.year)}</span></p></div>`;

    $('#heroRole').textContent = p.tagline;
    $('#heroMeta').innerHTML = [
      ['Lokasi', p.location, ''], ['Fokus', p.focus, ''], ['Status', p.status, 'live']
    ].map(([k, v, c]) => `<div class="${c}"><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('');
  }

  function renderAbout() {
    const p = D.profile;
    $('#statement').innerHTML = p.statement.split(' ').map((w) => `<span class="sw">${esc(w)}</span>`).join(' ');
    if (reduce) $('#statement').classList.add('static');

    const stats = [
      ['Proyek', D.projects.length],
      ['Desain PCB', D.projects.filter((x) => x.kind === 'pcb').length],
      ['Sertifikat', D.certificates.length],
      ['Medali emas', D.certificates.filter((c) => /emas/i.test(c.badge || '')).length]
    ];
    $('#stats').innerHTML = stats.map(([k, v], i) =>
      `<div class="stat" style="--d:${i * 0.08}s"><dt><span>${k}</span><b>${pad(i + 1)}</b></dt><dd data-count="${v}">${reduce ? pad(v) : '00'}</dd></div>`
    ).join('');

    $('#aboutParas').innerHTML = p.paragraphs.map((t, i) => `<p class="rise" style="--d:${i * 0.1}s">${esc(t)}</p>`).join('');

    const facts = [
      ['Institusi', p.institution], ['Departemen', p.department], ['Program', p.program],
      ['NRP', p.nrp], ['Status', p.status], ['Lokasi', p.location], ['Minat', p.interests.join(', ')]
    ];
    $('#facts').innerHTML = facts.map(([k, v], i) =>
      `<div class="row" style="--d:${i * 0.05}s"><dt>${k}</dt><dd>${esc(v)}</dd></div>`
    ).join('');

    const campus = (p.institution.match(/\(([^)]+)\)/) || [, p.institution])[1];
    const bars = barcode(p.nrp);
    $('#portrait').innerHTML = `
      <div class="badge-stage" id="badgeStage">
        <span class="badge-anchor" aria-hidden="true"></span>
        <div class="badge-swing" id="badgeSwing">
          <div class="lanyard" aria-hidden="true"><span>${'AFD · Hardware · Firmware · PCB · '.repeat(6)}</span></div>
          <div class="badge-clip" aria-hidden="true"></div>
          <figure class="badge" id="badge" data-cursor="Seret">
            <span class="badge-slot" aria-hidden="true"></span>
            <div class="badge-top" aria-hidden="true"><span><b>AFD</b> / ID-01</span><span>${esc(p.year)}</span></div>
            <div class="badge-photo">
              ${mediaHTML({ src: p.photo, alt: `Foto ${p.name}`, cls: 'badge-media', sizes: '340px' })}
              <span class="badge-scan" aria-hidden="true"></span>
            </div>
            <figcaption class="badge-body">
              <span class="badge-name">${esc(p.name)}</span>
              <span class="badge-role">${esc(p.focus)}</span>
              <dl class="badge-data">
                <div><dt>Kampus</dt><dd>${esc(campus)}, ${esc(p.location.split(',')[0])}</dd></div>
                <div><dt>Status</dt><dd>${esc(p.status)}</dd></div>
              </dl>
            </figcaption>
            <div class="badge-foot" aria-hidden="true">
              <span class="badge-chip"><svg viewBox="0 0 40 32" fill="none"><rect x=".75" y=".75" width="38.5" height="30.5" rx="5" fill="#D4AF5A" stroke="#B8923F" stroke-width="1.5"/><path d="M14 1v9H1M26 1v9h13M14 31v-9H1M26 31v-9h13M14 10h12v12H14z" stroke="#8C6B25" stroke-width="1.2"/></svg></span>
              <span class="badge-code">${bars}<b>${[...String(p.nrp)].map((d) => `<i>${esc(d)}</i>`).join('')}</b></span>
            </div>
          </figure>
        </div>
      </div>
      <p class="badge-hint" aria-hidden="true"><svg viewBox="0 0 30 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3L1 7l4 4M25 3l4 4-4 4M1 7h28"/></svg><span>${canHover ? 'Gerakkan kursor atau seret kartunya' : 'Geser kartunya ke samping'}</span></p>`;

    $('#eduList').innerHTML = D.education.map((e, i) => `
      <li class="row" style="--d:${i * 0.08}s">
        <div class="edu-row">
          <span class="logo-tile"><img src="${esc(asset(e.image))}" alt="Logo ${esc(e.institution)}" loading="eager" /></span>
          <div>
            <span class="edu-name">${esc(e.institution)}</span>
            <span class="edu-sub">${esc(e.degree)}. ${esc(e.detail)}</span>
          </div>
          <span class="edu-period" data-scramble>${esc(e.period)}</span>
        </div>
      </li>`).join('');
  }

  function renderOrgs() {
    $('#orgList').innerHTML = D.organizations.map((o, i) => `
      <li class="row org${i === 0 ? ' open' : ''}" style="--d:${i * 0.06}s">
        <button class="org-head" type="button" aria-expanded="${i === 0}" aria-controls="org-${i}">
          <span class="org-year" data-scramble>${esc(o.year)}</span>
          <span><span class="org-name">${esc(o.name)}</span><span class="org-role">${esc(o.position)}</span></span>
          <span class="org-plus" aria-hidden="true"></span>
        </button>
        <div class="org-panel" id="org-${i}" role="region">
          <div>
            <div class="org-inner">
              <span class="logo-tile"><img src="${esc(asset(o.image))}" alt="Logo ${esc(o.name)}" loading="eager" /></span>
              <div>
                <p class="org-desc">${esc(o.description)}</p>
                <ul class="org-bullets">${o.bullets.map((b, j) => `<li style="--b:${j}">${esc(b)}</li>`).join('')}</ul>
              </div>
            </div>
          </div>
        </div>
      </li>`).join('');
  }

  function renderProjects() {
    const featured = D.projects.filter((p) => p.featured);
    $('#featured').innerHTML = featured.map((p, i) => {
      const idx = projectIndex(p.id);
      return `
      <article class="spread${i % 2 ? ' flip' : ''}" style="--k:${i}">
        <div class="spread-media">
          <div class="board-wrap ar-host"${arStyle(p.image)}>
          <div class="board-dim" aria-hidden="true"><span data-scramble>${esc(p.id)}</span><i></i><span data-scramble>${esc(p.area)}, ${esc(p.year)}</span></div>
          <div class="board">
            ${mediaHTML({ src: p.image, alt: p.name, fit: p.fit, tag: 'button', sizes: '(max-width: 960px) 92vw, 62vw', attrs: `type="button" data-open="project" data-index="${idx}" aria-label="Lihat detail ${esc(p.name)}"` })}
            <i class="fid f1" aria-hidden="true"></i><i class="fid f2" aria-hidden="true"></i><i class="fid f3" aria-hidden="true"></i>
          </div>
          </div>
        </div>
        <div class="spread-body">
          <span class="spread-no" aria-hidden="true">${pad(i + 1)}</span>
          <h3 class="spread-title" data-split>${esc(p.name)}</h3>
          <p class="spread-sum rise">${esc(p.summary)}</p>
          <dl class="meta rise" style="--d:.08s">
            <div><dt>Peran</dt><dd>${esc(p.role)}</dd></div>
            <div><dt>Teknologi</dt><dd>${esc(p.tech)}</dd></div>
            <div><dt>Tahun</dt><dd>${esc(p.year)}, ${esc(p.status.toLowerCase())}</dd></div>
          </dl>
          <button class="btn rise" type="button" data-open="project" data-index="${idx}" style="--d:.14s">Lihat detail ${btnArrow('→')}</button>
        </div>
      </article>`;
    }).join('');

    const counts = { all: D.projects.length, pcb: D.projects.filter((p) => p.kind === 'pcb').length, iot: D.projects.filter((p) => p.kind === 'iot').length };
    $('#tabs').innerHTML = [['all', 'Semua'], ['pcb', 'PCB'], ['iot', 'IoT dan embedded']].map(([k, l]) =>
      `<button type="button" data-filter="${k}" aria-pressed="${k === 'all'}">${l}<sup>${pad(counts[k])}</sup></button>`
    ).join('') + '<span class="tab-ind" aria-hidden="true"></span>';

    renderIndex('all', false);
  }

  function renderIndex(filter, immediate) {
    const list = D.projects.filter((p) => filter === 'all' || p.kind === filter);
    const host = $('#indexList');
    host.innerHTML = list.map((p, i) => `
      <li class="row" style="--d:${immediate ? i * 0.04 : 0}s">
        <button class="row-btn" type="button" data-open="project" data-index="${projectIndex(p.id)}" data-id="${p.id}" aria-label="${esc(p.name)}, ${esc(p.area)}, ${esc(p.year)}">
          <span class="row-no">${pad(i + 1)}</span>
          <span class="row-left">
            <span class="row-thumb" aria-hidden="true"><img ${imgAttrs(p.image, '128px')} alt="" loading="lazy" decoding="async" /></span>
            <span class="ico" aria-hidden="true">${getProjectIcon(p.area)}</span>
            <span class="row-name" aria-hidden="true">${rollHTML(p.name)}</span>
          </span>
          <span class="row-area">${esc(p.area)}</span>
          <span class="row-year">${esc(p.year)}</span>
          <span class="row-arrow" aria-hidden="true">${ICONS.arrow}</span>
        </button>
      </li>`).join('');
    if (immediate) {
      requestAnimationFrame(() => requestAnimationFrame(() => $$('.row', host).forEach((r) => r.classList.add('in'))));
    } else if (engineReady) {
      observeReveals();
    }
  }

  function renderSkills() {
    $('#skillList').innerHTML = D.skills.map((s, i) => `
      <li class="row" style="--d:${i * 0.05}s">
        <div class="skill-row">
          <div class="skill-head">
            <span class="ico" aria-hidden="true">${getSkillIcon(s.group)}</span>
            <div>
              <h3 class="skill-title">${esc(s.group)}</h3>
              <span class="skill-count">${pad(s.items.length)} item</span>
            </div>
          </div>
          <div class="skill-tags">${s.items.map((it, j) => `<span class="skill-tag" style="--t:${j}">${esc(it)}</span>`).join('')}</div>
        </div>
      </li>`).join('');
  }

  function certHTML(c, i) {
    const meta = [c.badge, c.year].filter(Boolean).join(', ');
    return `
      <button class="cert rise" type="button" data-cursor="Buka" data-open="cert" data-index="${i}" aria-label="Lihat ${esc(c.title)}, ${esc(c.org)}">
        <span class="cert-frame" data-no="C${pad(i + 1)}">
          ${mediaHTML({ src: c.image, alt: `${c.title}, ${c.org}`, tag: 'span', cls: 'media--natural', sizes: '(max-width: 639px) 92vw, (max-width: 999px) 46vw, 30vw' })}
        </span>
        <span class="cert-cap">
          <span class="cert-title">${esc(c.title)}</span>
          <span class="cert-meta" data-scramble>${esc(meta)}</span>
          <span class="cert-org">${esc(c.org)}</span>
        </span>
      </button>`;
  }

  let certCols = 0;
  function buildCerts(force) {
    const w = window.innerWidth;
    const n = w >= 1000 ? 3 : w >= 640 ? 2 : 1;
    if (!force && n === certCols) return;
    certCols = n;
    const cols = Array.from({ length: n }, () => []);
    D.certificates.forEach((c, i) => cols[i % n].push(certHTML(c, i)));
    const speeds = n === 3 ? [0.04, -0.05, 0.08] : n === 2 ? [0.03, -0.04] : [0];
    const host = $('#certCols');
    host.style.setProperty('--cols', n);
    host.innerHTML = cols.map((items, ci) =>
      `<div class="cert-col"${n > 1 && !reduce && !touchMode ? ` data-speed="${speeds[ci]}" data-skew="1"` : ''}>${items.join('')}</div>`
    ).join('');
    if (engineReady) { collect(); observeReveals(); }
  }

  function renderPortal() {
    const p = D.portal;
    const list = (o) => `<div><h4>${esc(o.title)}</h4><ul class="rows">${o.points.map((t, i) =>
      `<li class="row" style="--d:${i * 0.06}s"><div class="portal-item"><b>${pad(i + 1)}</b><span>${esc(t)}</span></div></li>`).join('')}</ul></div>`;
    $('#portal').innerHTML = `
      <div class="portal-main">
        <h3 class="portal-title" data-split>${esc(p.title)}</h3>
        <p class="portal-lead rise">${esc(p.lead)}</p>
        <a class="btn rise" href="${esc(p.url)}" target="_blank" rel="noopener" style="--d:.1s">${esc(p.button)} ${btnArrow('↗', true)}</a>
      </div>
      <div class="portal-lists">${list(p.here)}${list(p.main)}</div>`;
  }

  function contactLinks() {
    const c = D.contact;
    return [{ label: 'WhatsApp', value: c.whatsapp, url: c.whatsappUrl }, ...c.links.filter((l) => !/whatsapp/i.test(l.label))];
  }

  function renderContact() {
    $('#contactList').innerHTML = contactLinks().map((l, i) => `
      <li class="row" style="--d:${i * 0.06}s">
        <a href="${esc(l.url)}" target="_blank" rel="noopener" aria-label="${esc(l.label)}: ${esc(l.value)}">
          <span class="c-lead">
            <span class="ico" aria-hidden="true">${getContactIcon(l.label)}</span>
            <span class="c-label">${esc(l.label)}</span>
          </span>
          <span class="c-value" aria-hidden="true">${rollHTML(l.value)}</span>
          <span class="c-out" aria-hidden="true">↗</span>
        </a>
      </li>`).join('');
    $('#footCopy').textContent = `© ${D.profile.year} ${D.profile.name}`;
    $('#kontak .container').insertAdjacentHTML('beforeend',
      `<div class="foot-sign" aria-hidden="true"><span id="footSign">${[...D.profile.name].map((ch) => (ch === ' ' ? ' ' : `<i>${esc(ch)}</i>`)).join('')}</span></div>`);
  }

  function renderMenu() {
    $('#menuList').innerHTML = SECTION_LINKS.map(([id, label], i) =>
      `<li><a href="#${id}" data-nav data-id="${id}"><span class="mi-no">${pad(i + 1)}</span><span class="mi"><span class="mi-in" style="--i:${i}">${label}</span></span></a></li>`
    ).join('');
    document.body.insertAdjacentHTML('beforeend', `<nav class="rail" aria-label="Bagian halaman">${SECTION_LINKS.map(([id, label], i) =>
      `<a href="#${id}" data-nav data-id="${id}" aria-label="${label}"><span>${pad(i + 1)} ${label}</span><i></i></a>`).join('')}</nav>`);
    $$('.menu-list a').forEach((a) => a.addEventListener('pointerenter', () => scramble($('.mi-no', a))));
  }

  function decorateHeads() {
    const right = {
      tentang: 'Profil',
      pengalaman: `${pad(D.organizations.length)} organisasi`,
      proyek: `${pad(D.projects.length)} proyek`,
      keahlian: `${pad(D.skills.length)} bidang, ${D.skills.reduce((n, g) => n + g.items.length, 0)} tools`,
      sertifikat: `${pad(D.certificates.length)} dokumen`,
      situs: 'aefera.me',
      kontak: `${pad(contactLinks().length)} kanal`
    };
    $$('.section').forEach((sec) => {
      const head = $('.section-head', sec);
      if (!head || !sec.id) return;
      head.insertAdjacentHTML('afterbegin',
        `<div class="sec-meta" aria-hidden="true"><span class="sec-no">${sectionNo(sec.id)}</span><span class="sec-trace"></span><span class="sec-ref">${esc(right[sec.id] || '')}</span></div>`);
    });
  }

  const SS = { on: canHover && !reduce, y: 0, target: 0, active: false, tween: null };
  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const locked = () => document.body.classList.contains('no-scroll') || document.body.classList.contains('is-loading');

  function ssSync() { SS.y = SS.target = window.scrollY; }

  function ssBy(d) {
    if (!SS.active) { ssSync(); SS.set = null; }
    SS.tween = null;
    SS.target = clamp(SS.target + d, 0, maxScroll());
    SS.active = true;
  }

  function scrollToY(y) {
    y = clamp(y, 0, maxScroll());
    if (!SS.on) { window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' }); return; }
    const from = window.scrollY;
    const dur = clamp(Math.abs(y - from) * 0.45, 650, 1500);
    SS.tween = { from, to: y, t0: performance.now(), dur };
    SS.target = y;
    SS.active = true;
  }

  function ssStep(now, dt) {
    if (!SS.active) return;
    if (SS.set != null && Math.abs(window.scrollY - SS.set) > 3) { SS.active = false; SS.tween = null; SS.set = null; ssSync(); return; }
    if (SS.tween) {
      const t = clamp((now - SS.tween.t0) / SS.tween.dur, 0, 1);
      SS.y = lerp(SS.tween.from, SS.tween.to, easeIO(t));
      if (t >= 1) { SS.active = false; SS.tween = null; }
    } else {
      const k = 1 - Math.pow(1 - 0.1, dt);
      SS.y += (SS.target - SS.y) * k;
      if (Math.abs(SS.target - SS.y) < 0.35) { SS.y = SS.target; SS.active = false; }
    }
    window.scrollTo(0, SS.y);
    SS.set = SS.active ? window.scrollY : null;
  }

  function initSmooth() {
    if (!SS.on) return;
    document.documentElement.classList.add('has-smooth');
    ssSync();
    window.addEventListener('wheel', (e) => {
      if (e.ctrlKey || locked()) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.target.closest && e.target.closest('.viewer, .menu')) return;
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 36 : e.deltaMode === 2 ? window.innerHeight : 1;
      ssBy(e.deltaY * unit);
    }, { passive: false });

    window.addEventListener('keydown', (e) => {
      if (locked() || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target;
      if (t && (t.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(t.tagName))) return;
      const vh = window.innerHeight;
      const map = { ArrowDown: 140, ArrowUp: -140, PageDown: vh * 0.85, PageUp: -vh * 0.85, ' ': e.shiftKey ? -vh * 0.85 : vh * 0.85 };
      if (e.key === 'Home') { e.preventDefault(); scrollToY(0); return; }
      if (e.key === 'End') { e.preventDefault(); scrollToY(maxScroll()); return; }
      if (e.key in map && !(e.key === ' ' && t && t.tagName === 'BUTTON')) { e.preventDefault(); ssBy(map[e.key]); }
    });

    window.addEventListener('scroll', () => { if (!SS.active) ssSync(); }, { passive: true });
  }

  const items = [];
  let vh = window.innerHeight, docH = 0, sy = window.scrollY, lastY = sy, vel = 0, velS = 0, lastNow = 0;
  const headerEl = $('#header'), metaTheme = $('meta[name="theme-color"]');
  let secBounds = [], hdH = 64, hdTheme = '', themeReady = false;
  let heroLines = [], heroFigure = null, heroGrid = null, heroTr = [], spreads = [], footSign = null;
  const stmt = { el: null, words: [], top: 0, h: 0, p: 0 };
  let badgeTick = null, cursorTick = null, panels = [], panelInset = 4;
  let mq = [], mqv = 0, mqDir = 1, mqVis = true, mx = 0, my = 0, fxTick = null, started = false;
  const visible = new Set();
  const progressEl = $('#progress');
  const stackMQ = window.matchMedia('(min-width: 961px) and (min-height: 700px)');
  const visIO = 'IntersectionObserver' in window
    ? new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target))), { rootMargin: '20% 0px' })
    : null;

  function pageTop(el) { let y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; }

  function collect() {
    items.length = 0;
    $$('[data-speed]').forEach((el) => items.push({
      el, type: 'speed', s: parseFloat(el.dataset.speed) || 0, r: parseFloat(el.dataset.rot) || 0,
      lag: el.classList.contains('part') ? 0.07 : 1, skew: !!el.dataset.skew, cur: 0, curR: 0, top: 0, h: 0
    }));
    $$('[data-img-parallax]').forEach((img) => {
      const frame = img.closest('.media');
      if (!frame) return;
      items.push({ el: img, type: 'img', s: parseFloat(img.dataset.imgParallax) || 0.12, frame, cur: 0 });
      if (visIO) visIO.observe(frame); else visible.add(frame);
    });
    heroLines = $$('.hero-name .line');
    heroFigure = $('#heroFigure');
    heroGrid = $('.hero-grid');
    heroTr = $$('.hero-bg .tr');
    spreads = $$('#featured .spread');
    footSign = $('#footSign');
    panels = reduce || touchMode ? [] : $$('section[data-bg="dark"]');
    panelInset = window.innerWidth < 640 ? 2.5 : 4;
    stmt.el = $('#statement');
    stmt.words = stmt.el ? $$('.sw', stmt.el) : [];
    measure();
  }

  function moveTabInd() {
    const ind = $('.tab-ind'), on = $('#tabs button[aria-pressed="true"]');
    if (!ind || !on) return;
    ind.style.width = `${on.offsetWidth}px`;
    ind.style.height = `${on.offsetHeight}px`;
    ind.style.transform = `translate3d(${on.offsetLeft}px,${on.offsetTop}px,0)`;
  }

  function measure() {
    moveTabInd();
    vh = window.innerHeight;
    docH = document.documentElement.scrollHeight;
    items.forEach((it) => { if (it.type === 'speed') { it.top = pageTop(it.el); it.h = it.el.offsetHeight; } });
    if (stmt.el) { stmt.top = pageTop(stmt.el); stmt.h = stmt.el.offsetHeight; }
    mq.forEach((m) => { m.w = m.el.firstElementChild.offsetWidth || 1; });
    secBounds = $$('#main > section').map((sec) => { const t = pageTop(sec); return [t, t + sec.offsetHeight, sec.dataset.bg === 'dark']; });
    hdH = headerEl ? headerEl.offsetHeight : 64;
    request();
  }

  function setThemeColor(th) {
    if (metaTheme) metaTheme.setAttribute('content', th === 'dark' ? '#0C2A21' : '#EEF0EA');
  }

  function headerTheme(y) {
    const probe = y + hdH * 0.5;
    let dark = false;
    for (const [t, b, d] of secBounds) { if (probe >= t && probe < b) { dark = d; break; } }
    const th = dark ? 'dark' : 'light';
    if (th === hdTheme) return;
    hdTheme = th;
    if (headerEl) headerEl.dataset.theme = th;
    if (themeReady && !document.body.classList.contains('menu-open')) setThemeColor(th);
  }

  function enterTouchMode() {
    if (touchMode) return;
    touchMode = true;
    document.documentElement.classList.add('touch');
    $$('[data-speed]').forEach((el) => { el.removeAttribute('data-speed'); el.removeAttribute('data-skew'); el.style.transform = ''; });
    [...heroLines, heroFigure, heroGrid, ...heroTr, footSign, ...spreads].forEach((el) => {
      if (!el) return;
      el.style.transform = ''; el.style.opacity = ''; el.style.removeProperty('--fade');
    });
    panels.forEach((sec) => { sec.style.clipPath = ''; sec._q = ''; });
    mq.forEach((m) => { m.el.style.transform = ''; });
    collect();
  }

  function update(dt) {
    const y = window.scrollY;
    vel = y - lastY; lastY = y; sy = y;
    velS += (vel - velS) * (1 - Math.pow(0.82, dt));
    if (progressEl) progressEl.style.transform = `scaleX(${clamp(y / Math.max(1, docH - vh), 0, 1).toFixed(4)})`;
    headerTheme(y);
    if (reduce) return;

    if (stmt.words.length) {
      const start = stmt.top - vh * 0.85, end = stmt.top + stmt.h - vh * 0.4;
      stmt.p += (clamp((y - start) / Math.max(1, end - start), 0, 1) - stmt.p) * (1 - Math.pow(0.8, dt));
      const n = stmt.words.length;
      for (let i = 0; i < n; i++) {
        const o = (0.14 + 0.86 * clamp((stmt.p * (n + 3) - i) / 3, 0, 1)).toFixed(3);
        if (stmt.words[i]._o !== o) { stmt.words[i]._o = o; stmt.words[i].style.opacity = o; }
      }
    }

    if (touchMode) return;

    const mid = y + vh / 2;
    for (const it of items) {
      if (it.type === 'speed') {
        if (it.top + it.h < y - vh || it.top > y + vh * 2) continue;
        const c = it.top + it.h / 2 - mid;
        const ty = -c * it.s, tr = c * it.r;
        const k = it.lag === 1 ? 1 : 1 - Math.pow(1 - it.lag, dt);
        it.cur += (ty - it.cur) * k;
        it.curR += (tr - it.curR) * k;
        const sk = it.skew ? ` skewY(${clamp(-velS * 0.035, -1.4, 1.4).toFixed(2)}deg)` : '';
        it.el.style.transform = `translate3d(0,${it.cur.toFixed(1)}px,0)${it.r ? ` rotate(${it.curR.toFixed(2)}deg)` : ''}${sk}`;
      } else if (visible.has(it.frame)) {
        const r = it.frame.getBoundingClientRect();
        const p = clamp((r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2), -1, 1);
        const ty = -p * it.s * r.height;
        if (Math.abs(ty - it.cur) > 0.05) { it.cur = ty; it.el.style.transform = `translate3d(0,${ty.toFixed(1)}px,0)`; }
      }
    }

    if (y < vh * 1.4) {
      heroLines.forEach((l) => { l.style.transform = `translate3d(${(y * 0.18 * l.dataset.dir).toFixed(1)}px,0,0)`; });
      if (heroFigure) heroFigure.style.transform = `translate3d(0,${(y * 0.2).toFixed(1)}px,0)`;
      if (heroGrid) {
        const q = clamp(y / (vh * 0.9), 0, 1);
        heroGrid.style.opacity = (1 - q * 0.75).toFixed(3);
        heroGrid.style.transform = `scale(${(1 - q * 0.05).toFixed(4)})`;
      }
      heroTr.forEach((g) => {
        const d = parseFloat(g.dataset.d);
        g.style.transform = `translate3d(${(-mx * d * 260).toFixed(1)}px,${(y * d * 1.3 - my * d * 160).toFixed(1)}px,0)`;
      });
    }

    const on = stackMQ.matches;
    spreads.forEach((s, i) => {
      const n = spreads[i + 1];
      if (!on || !n) { if (s.style.transform) { s.style.transform = ''; s.style.removeProperty('--fade'); } return; }
      const r = s.getBoundingClientRect(), nr = n.getBoundingClientRect();
      const p = clamp(1 - (nr.top - r.top) / Math.max(1, r.height), 0, 1);
      s.style.transform = `scale(${(1 - p * 0.06).toFixed(4)})`;
      s.style.setProperty('--fade', (1 - p * 0.7).toFixed(3));
    });

    for (const sec of panels) {
      const r = sec.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) continue;
      const pIn = clamp((vh - r.top) / (vh * 0.85), 0, 1), pOut = clamp(r.bottom / (vh * 0.85), 0, 1);
      const q = 1 - easeIO(Math.min(pIn, pOut));
      const key = q.toFixed(3);
      if (sec._q !== key) {
        sec._q = key;
        sec.style.clipPath = q < 0.001 ? '' : `inset(0 ${(q * panelInset).toFixed(2)}% round ${(q * 44).toFixed(1)}px)`;
      }
    }

    if (footSign) {
      const left = docH - vh - y;
      if (left < vh * 1.2) {
        const p = 1 - clamp(left / (vh * 1.1), 0, 1);
        footSign.style.transform = `translate3d(${((1 - easeIO(p)) * 32).toFixed(2)}%,0,0)`;
      }
    }
  }

  function mqTick(dt) {
    if (reduce || touchMode || !mq.length || !mqVis) return;
    if (Math.abs(velS) > 0.5) mqDir = velS > 0 ? 1 : -1;
    mqv += (Math.abs(velS) - mqv) * 0.08;
    const step = (0.6 + Math.min(mqv, 60) * 0.35) * mqDir * dt;
    mq.forEach((m, i) => {
      m.pos += step;
      const x = ((m.pos % m.w) + m.w) % m.w;
      m.el.style.transform = `translate3d(${(i ? x - m.w : -x).toFixed(1)}px,0,0)`;
    });
  }

  function frame(now) {
    const dt = lastNow ? clamp((now - lastNow) / 16.667, 0.25, 3) : 1;
    lastNow = now;
    ssStep(now, dt);
    update(dt);
    if (fxTick) fxTick(dt);
    if (badgeTick) badgeTick(dt);
    if (cursorTick) cursorTick(dt);
    if (bots.length) botTick(dt, now);
    mqTick(dt);
    requestAnimationFrame(frame);
  }
  function request() { if (!started) { started = true; requestAnimationFrame(frame); } }

  function buildHeroBg() {
    const host = $('#heroBg'); if (!host) return;
    let s = 7; const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    const G = 48;
    host.innerHTML = [[0.04, 6], [0.09, 5], [0.16, 4]].map(([d, n], li) => {
      let g = '';
      for (let k = 0; k < n; k++) {
        let x = Math.round(rnd() * 20) * G, y = Math.round(rnd() * 18) * G, p = `M${x} ${y}`;
        for (let t = 0, m = 5 + Math.floor(rnd() * 3); t < m; t++) {
          const L = (1 + Math.floor(rnd() * 4)) * G, q = Math.floor(rnd() * 4);
          if (q === 0) x += L; else if (q === 1) y += L; else if (q === 2) { x += L; y += L; } else { x += L; y -= L; }
          p += `L${x} ${y}`;
        }
        g += `<path pathLength="1" style="--dl:${(k * 0.25 + li * 0.15).toFixed(2)}s" d="${p}"/><circle cx="${x}" cy="${y}" r="${li === 2 ? 7 : 5}"/>`;
        if (li === 2 && k < 3) g += `<path class="pulse" pathLength="1000" style="animation-duration:${5 + k * 1.7}s" d="${p}"/>`;
      }
      return `<svg class="tr" data-d="${d}" style="--d:${d}" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${g}</svg>`;
    }).join('');
  }

  function buildMarquee() {
    const host = $('#marquee'); if (!host) return;
    const all = D.skills.flatMap((s) => s.items), half = Math.ceil(all.length / 2);
    const set = (a) => a.map((t) => `<span class="mq-i">${esc(t)}</span><i class="mq-sep"></i>`).join('');
    const row = (a, cls) => `<div class="mq-row ${cls}"><div class="mq-track">${`<div class="mq-set">${set(a)}</div>`.repeat(4)}</div></div>`;
    host.innerHTML = row(all.slice(0, half), '') + row(all.slice(half), 'mq-b');
    mq = $$('.mq-track', host).map((el, i) => ({ el, w: 1, pos: i ? 600 : 0 }));
    if ('IntersectionObserver' in window) new IntersectionObserver((es) => { mqVis = es[0].isIntersecting; }).observe(host);
  }

  const golds = D.certificates.filter((c) => /emas/i.test(c.badge || '')).length;
  const BOT_ROLE = { tentang: 'wave', pengalaman: 'camera', proyek: 'solder', keahlian: 'type', sertifikat: 'medal', situs: 'point', kontak: 'signal' };
  const BOT_DESC = { wave: 'melambai', camera: 'memotret', solder: 'menyolder PCB', type: 'mengetik di laptop', medal: 'mengangkat medali', point: 'menunjuk ke kanan', signal: 'mengirim sinyal' };
  const BOT_LINES = {
    wave: ['Halo! Aku AFD-bot.', 'Selamat datang di lab Afra.', 'Gulir pelan-pelan, ya.'],
    camera: ['Senyum... cekrek!', 'Dokumentasi dulu.', 'Fokus terkunci.'],
    solder: ['Lagi nyolder, awas panas.', 'Flux siap, timah siap.', 'Satu pad lagi.'],
    type: ['Kompilasi berhasil.', '0 error, 0 warning.', 'git push origin main'],
    medal: [`${golds} medali emas matematika!`, 'Juara, tapi tetap belajar.', 'Klik sertifikat untuk melihat.'],
    point: ['Proyek software ada di sana.', 'Mampir ke aefera.me', 'Klik tombolnya, ya.'],
    signal: ['Sinyal penuh. Hubungi saja!', 'Ping... pong!', 'Siap terima pesan.']
  };

  function botSVG(role) {
    const O = 'class="o"', L = 'class="l"', A = 'class="a"', AF = 'class="af"';
    let propR = '', propL = '', front = '', back = '', floor = '';
    if (role === 'wave') propR = `<path class="motion a" d="M121 122q5 6 0 12M128 118q8 10 0 20"/>`;
    if (role === 'camera') propR = `<rect ${O} x="94" y="126" width="30" height="20" rx="4"/><rect ${O} x="98" y="122" width="9" height="5" rx="1.5"/><circle ${O} cx="112" cy="136" r="6"/><circle ${AF} cx="112" cy="136" r="2.4"/><path class="flash a" d="M102 116v-7M95 119l-5-4M109 119l5-4"/>`;
    if (role === 'solder') {
      propR = `<path ${L} style="stroke-width:6" d="M108 132l6 13"/><path ${L} d="M114 145l7 15"/><circle ${AF} cx="121" cy="161" r="2"/><path class="smoke l" style="stroke-width:1.5;opacity:.5" d="M124 156q-4-5 0-10t0-10"/><g class="sparks"><circle ${AF} cx="121" cy="161" r="1.6"/><circle ${AF} cx="121" cy="161" r="1.2"/><circle ${AF} cx="121" cy="161" r="1.4"/></g>`;
      floor = `<rect x="124" y="150" width="32" height="10" rx="2" fill="#1B5C45" stroke="currentColor" stroke-width="2"/><circle ${AF} cx="131" cy="155" r="1.8"/><circle ${AF} cx="141" cy="155" r="1.8"/><circle ${AF} cx="150" cy="155" r="1.8"/>`;
    }
    if (role === 'type') {
      front = `<rect ${O} x="54" y="110" width="52" height="32" rx="3"/><circle ${AF} cx="80" cy="126" r="2.6"/><path ${O} d="M46 142h68l-6 7H52z"/>`;
      back = `<g class="code"><rect ${O} x="114" y="2" width="44" height="30" rx="4"/><path ${A} d="M121 12h18"/><path ${A} d="M121 18h28"/><path ${A} d="M121 24h12"/></g>`;
    }
    if (role === 'medal') {
      propR = `<path ${A} style="stroke-width:2.5" d="M103 132l5 11 5-11"/><circle cx="108" cy="151" r="9" fill="#D4AF5A" stroke="currentColor" stroke-width="2"/><path d="M108 146l1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z" fill="#0C2A21"/>`;
      back = `<g class="twinkle"><path ${A} d="M24 40v10M19 45h10"/><path ${A} d="M138 20v8M134 24h8"/><path ${A} d="M18 92v6M15 95h6"/></g>`;
    }
    if (role === 'point') back = `<path class="nudge a" style="stroke-width:2.5" d="M146 96h26m-7-7 7 7-7 7"/>`;
    if (role === 'signal') {
      propR = `<rect ${O} x="101" y="126" width="15" height="24" rx="3"/><rect ${AF} x="104" y="130" width="9" height="12" rx="1"/>`;
      back = `<g class="sig"><path ${A} d="M70 6a14 14 0 0 1 20 0"/><path ${A} d="M64 0a22 22 0 0 1 32 0"/><path ${A} d="M58 -6a30 30 0 0 1 44 0"/></g>`;
    }
    const arm = (side) => {
      const x = side === 'l' ? 52 : 108, prop = side === 'l' ? propL : propR;
      return `<g class="arm ${side}"><path ${L} style="stroke-width:4" d="M${x} 98v30"/><circle ${O} cx="${x}" cy="132" r="5"/>${prop ? `<g class="prop">${prop}</g>` : ''}</g>`;
    };
    return `<svg class="bot-svg" viewBox="0 0 160 180" fill="none" aria-hidden="true">
      <ellipse class="bot-shadow" cx="80" cy="171" rx="30" ry="4"/>
      ${floor}
      <g class="bot-rig">
        ${back}
        <path ${L} d="M80 30V17"/><circle class="bot-led" cx="80" cy="12" r="4.5"/>
        <g class="bot-head">
          <rect ${O} x="35" y="49" width="10" height="20" rx="3"/><rect ${O} x="115" y="49" width="10" height="20" rx="3"/>
          <rect ${O} x="44" y="30" width="72" height="54" rx="16"/>
          <rect class="bot-screen" x="53" y="39" width="54" height="36" rx="9"/>
          <g class="bot-eyes">
            <rect class="eye" x="63" y="49" width="9" height="13" rx="4.5"/>
            <rect class="eye" x="88" y="49" width="9" height="13" rx="4.5"/>
            <path class="happy" d="M62 58q5-7 10 0M87 58q5-7 10 0"/>
          </g>
          <path class="mouth" d="M76 68h8"/>
          <path class="smile" d="M73 66q7 6 14 0"/>
        </g>
        <rect ${O} x="72" y="83" width="16" height="9" rx="2"/>
        <rect ${O} x="50" y="91" width="60" height="48" rx="12"/>
        <rect ${A} x="67" y="103" width="26" height="18" rx="2"/>
        <path ${A} d="M71 103v-4M77 103v-4M83 103v-4M89 103v-4M71 121v4M77 121v4M83 121v4M89 121v4"/>
        <circle class="bot-led b2" cx="80" cy="112" r="2.4"/>
        <path ${L} d="M68 139v15M92 139v15"/>
        <rect ${O} x="58" y="154" width="18" height="8" rx="4"/><rect ${O} x="84" y="154" width="18" height="8" rx="4"/>
        ${arm('l')}${arm('r')}
        ${front}
      </g>
    </svg>`;
  }

  const bots = [];
  let ptrX = -1, ptrY = -1, hasPtr = false;

  function buildBots() {
    $$('.section').forEach((sec) => {
      const role = BOT_ROLE[sec.id], head = $('.section-head', sec);
      if (!role || !head) return;
      head.insertAdjacentHTML('beforeend',
        `<div class="bot" data-role="${role}" role="img" aria-label="Robot AFD-bot sedang ${BOT_DESC[role]}"><span class="bot-bubble" aria-hidden="true"></span>${botSVG(role)}</div>`);
    });
    $$('.bot').forEach((el) => {
      const b = {
        el, role: el.dataset.role, head: $('.bot-head', el), eyes: $('.bot-eyes', el), bubble: $('.bot-bubble', el),
        li: 0, ex: 0, ey: 0, hr: 0, vis: false, blinkAt: performance.now() + 1500 + Math.random() * 3000,
        wx: 0, wy: 0, wanderAt: 0, sayT: null, typeT: null
      };
      b.lines = BOT_LINES[b.role];
      bots.push(b);
      const happy = (on) => el.classList.toggle('happy', on);
      el.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { happy(true); say(b); } });
      el.addEventListener('pointerleave', () => happy(false));
      el.addEventListener('click', () => {
        happy(true); el.classList.remove('hop'); void el.offsetWidth; el.classList.add('hop'); say(b);
        setTimeout(() => happy(false), 1400);
      });
    });
    if (reduce) { bots.forEach((b) => b.el.classList.add('in')); return; }

    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const b = bots.find((x) => x.el === e.target); if (!b) return;
      b.vis = e.isIntersecting;
      if (b.vis && !b.el.classList.contains('in')) { b.el.classList.add('in'); setTimeout(() => say(b), 900); }
    }), { rootMargin: '0px 0px -12% 0px' });
    bots.forEach((b) => io.observe(b.el));

    window.addEventListener('pointermove', (e) => { ptrX = e.clientX; ptrY = e.clientY; hasPtr = e.pointerType === 'mouse'; }, { passive: true });
  }

  function say(b) {
    const text = b.lines[b.li % b.lines.length]; b.li++;
    clearTimeout(b.sayT); clearInterval(b.typeT);
    b.bubble.textContent = '';
    b.bubble.classList.add('on', 'typing');
    let i = 0;
    b.typeT = setInterval(() => {
      b.bubble.textContent = text.slice(0, ++i);
      if (i >= text.length) { clearInterval(b.typeT); b.bubble.classList.remove('typing'); }
    }, 26);
    b.sayT = setTimeout(() => b.bubble.classList.remove('on'), 1200 + text.length * 26 + 1600);
  }

  function botTick(dt, now) {
    if (reduce) return;
    for (const b of bots) {
      if (!b.vis) continue;
      let tx, ty;
      if (hasPtr) {
        const r = b.el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height * 0.3;
        tx = clamp((ptrX - cx) / 320, -1, 1); ty = clamp((ptrY - cy) / 260, -1, 1);
      } else {
        if (now > b.wanderAt) { b.wanderAt = now + 1800 + Math.random() * 2200; b.wx = Math.random() * 2 - 1; b.wy = Math.random() * 1.2 - 0.6; }
        tx = b.wx; ty = b.wy;
      }
      const k = 1 - Math.pow(0.86, dt);
      b.ex += (tx - b.ex) * k; b.ey += (ty - b.ey) * k;
      b.hr += (b.ex * 7 + (touchMode ? 0 : clamp(velS * 0.25, -8, 8)) - b.hr) * (1 - Math.pow(0.9, dt));
      const eyes = `translate(${(b.ex * 4.5).toFixed(1)}px,${(b.ey * 3.5).toFixed(1)}px)`, head = `rotate(${b.hr.toFixed(1)}deg)`;
      if (eyes !== b._e) { b._e = eyes; b.eyes.style.transform = eyes; }
      if (head !== b._h) { b._h = head; b.head.style.transform = head; }
      if (now > b.blinkAt) {
        b.el.classList.add('blink');
        setTimeout(() => b.el.classList.remove('blink'), 140);
        b.blinkAt = now + 2200 + Math.random() * 3800;
      }
    }
  }

  function initSparks() {
    if (reduce) return;
    window.addEventListener('pointerdown', (e) => {
      if (e.button > 0) return;
      const host = document.createElement('span');
      host.className = 'spark';
      host.style.left = `${e.clientX}px`;
      host.style.top = `${e.clientY}px`;
      const n = 8, off = Math.random() * 45;
      host.innerHTML = Array.from({ length: n }, (_, i) => `<i style="--r:${(off + i * (360 / n)).toFixed(1)}deg"></i>`).join('');
      document.body.appendChild(host);
      setTimeout(() => host.remove(), 700);
    }, { passive: true });
  }

  function initFx() {
    buildHeroBg(); buildMarquee(); buildBots(); initSparks();
    if (!reduce && !touchMode) $$('.section-head').forEach((el) => { el.dataset.speed = '0.04'; el.dataset.skew = '1'; });
    if (reduce || !canHover) return;

    const hero = $('#beranda');
    const chars = $$('.hero-name .ch').map((el) => ({ el, w: 700, t: 700, x: 0, y: 0 }));
    let px = -1e4, py = -1e4, hot = false, mxT = 0, myT = 0;
    hero.addEventListener('pointermove', (e) => {
      px = e.clientX; py = e.clientY; hot = true;
      mxT = px / innerWidth - 0.5; myT = py / innerHeight - 0.5;
      chars.forEach((c) => { const r = c.el.getBoundingClientRect(); c.x = r.left + r.width / 2; c.y = r.top + r.height / 2; });
    });
    hero.addEventListener('pointerleave', () => { hot = false; mxT = myT = 0; });

    fxTick = (dt) => {
      const k = 1 - Math.pow(0.94, dt);
      mx += (mxT - mx) * k; my += (myT - my) * k;
      for (const c of chars) {
        const d = Math.hypot(px - c.x, (py - c.y) * 0.6);
        c.t = hot ? 560 + 240 * Math.exp(-(d * d) / 42000) : 700;
        const nw = c.w + (c.t - c.w) * (1 - Math.pow(0.86, dt));
        if (Math.abs(nw - c.w) > 0.2) { c.w = nw; c.el.style.setProperty('--w', nw.toFixed(0)); }
      }
    };

    $$('.media[data-open]').forEach((m) => {
      m.addEventListener('pointermove', (e) => {
        const r = m.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        m.style.transform = `perspective(1200px) rotateY(${(x * 4).toFixed(2)}deg) rotateX(${(-y * 4).toFixed(2)}deg)`;
      });
      m.addEventListener('pointerleave', () => { m.style.transform = ''; });
    });

    $$('.cert').forEach((c) => {
      const f = $('.cert-frame', c);
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        f.style.transform = `perspective(900px) rotateY(${(x * 7).toFixed(2)}deg) rotateX(${(-y * 7).toFixed(2)}deg)`;
      });
      c.addEventListener('pointerleave', () => { f.style.transform = ''; });
    });

    $$('.btn').forEach((b) => {
      const origin = (e) => { const r = b.getBoundingClientRect(); b.style.setProperty('--x', `${e.clientX - r.left}px`); b.style.setProperty('--y', `${e.clientY - r.top}px`); };
      b.addEventListener('pointerenter', origin);
      b.addEventListener('pointerleave', origin);
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px,${((e.clientY - r.top - r.height / 2) * 0.32).toFixed(1)}px)`;
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  let revealIO = null;
  const seen = new WeakSet();

  function splitWords(el) {
    const txt = el.textContent.trim();
    el.setAttribute('aria-label', txt);
    let ci = 0;
    el.innerHTML = txt.split(/\s+/).map((w) => touchMode
      ? `<span class="w" aria-hidden="true"><span class="c" style="--ci:${(ci++) * 3}">${esc(w)}</span></span>`
      : `<span class="w" aria-hidden="true">${[...w].map((ch) => `<span class="c" style="--ci:${ci++}">${esc(ch)}</span>`).join('')}</span>`).join(' ');
    el.dataset.done = '1';
  }

  function countUp(dd) {
    const to = parseInt(dd.dataset.count, 10) || 0;
    if (reduce) { dd.textContent = pad(to); return; }
    const t0 = performance.now(), dur = 1500;
    (function tick(now) {
      const t = clamp((now - t0) / dur, 0, 1);
      dd.textContent = pad(Math.round(to * easeOutExpo(t)));
      if (t < 1) requestAnimationFrame(tick);
    })(t0);
  }

  function reveal(el) {
    el.classList.add('in');
    if (el.hasAttribute('data-scramble')) scramble(el);
    if (el.classList.contains('sec-meta')) setTimeout(() => $$('.sec-no, .sec-ref', el).forEach((s) => scramble(s)), 250);
    if (el.classList.contains('row')) $$('[data-scramble]', el).forEach((s) => scramble(s));
    if (el.classList.contains('media')) { const w = el.closest('.board-wrap'); if (w) $$('[data-scramble]', w).forEach((s) => scramble(s)); }
    if (el.classList.contains('row')) setTimeout(() => el.classList.add('drawn'), 3000);
    if (el.classList.contains('stat')) { const dd = $('dd', el); if (dd && !dd._done) { dd._done = true; setTimeout(() => countUp(dd), 200); } }
  }

  function observeReveals() {
    if (!revealIO) {
      revealIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const t = e.target;
          if (t._kids) { t._kids.forEach(reveal); t._kids = null; }
          if (seen.has(t)) reveal(t);
          revealIO.unobserve(t);
        });
      }, { threshold: 0.01, rootMargin: '0px 0px -6% 0px' });
    }
    $$('[data-split]:not([data-done])').forEach(splitWords);
    $$('[data-split], .media, .row, .rise, .part-in, .sec-meta, .stat').forEach((el) => {
      if (el.closest('.hero') || seen.has(el) || el.classList.contains('in')) return;
      seen.add(el);
      const target = el.classList.contains('media') ? el.parentElement : el;
      if (target !== el) { (target._kids = target._kids || []).push(el); }
      revealIO.observe(target);
    });
  }

  function initTheme() {
    const label = $('.hd-label'), text = $('#hdLabel'), no = $('#hdNo');
    const menuLinks = $$('#menuList a, .rail a');
    let current = '';
    const setLabel = (n, t) => { scramble(no, n); scramble(text, t); };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        document.body.dataset.bg = el.dataset.bg || 'light';
        if (el.id !== current) {
          current = el.id;
          document.body.classList.toggle('at-hero', current === 'beranda');
          setLabel(sectionNo(el.id), el.dataset.label || '');
          menuLinks.forEach((a) => a.setAttribute('aria-current', a.dataset.id === current ? 'true' : 'false'));
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });
    $$('section[data-bg]').forEach((el) => io.observe(el));
  }

  function initHeader() {
    const header = $('#header');
    let last = window.scrollY, run = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY, max = maxScroll();
      header.classList.toggle('scrolled', y > 8);
      request();
      if (document.body.classList.contains('menu-open') || y < 0 || y > max) { last = clamp(y, 0, max); run = 0; return; }
      const d = y - last; last = y;
      if (!d) return;
      run = Math.sign(d) === Math.sign(run) ? run + d : d;
      if (y < 160 || run < -36) header.classList.remove('is-hidden');
      else if (run > 36) header.classList.add('is-hidden');
    }, { passive: true });
  }

  const menu = $('#menu');
  const menuBtn = $('#menuBtn');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    document.body.classList.toggle('no-scroll', open);
    menu.classList.toggle('open', open);
    menu.inert = !open;
    menu.setAttribute('aria-hidden', String(!open));
    menuBtn.setAttribute('aria-expanded', String(open));
    $('#menuBtnText').textContent = open ? 'Tutup' : 'Menu';
    if (open) $('#header').classList.remove('is-hidden');
    if (themeReady) setThemeColor(open ? 'dark' : hdTheme);
  }

  function goTo(id) {
    const target = document.getElementById(id);
    if (!target) return;
    scrollToY(target.getBoundingClientRect().top + window.scrollY);
  }

  const viewer = $('#viewer');
  const vImg = $('#viewerImg');
  const vInfo = $('#viewerInfo');
  const V = { kind: 'project', list: D.projects, i: 0, opener: null };

  function renderViewer() {
    const it = V.list[V.i];
    const isProject = V.kind === 'project';
    vImg.classList.remove('ready');
    vImg.onload = vImg.onerror = () => vImg.classList.add('ready');
    setImg(vImg, it.image, '(max-width: 960px) 100vw, 62vw');
    vImg.alt = isProject ? it.name : `${it.title}, ${it.org}`;
    vImg.style.objectFit = (isProject && it.fit) || 'contain';
    if (vImg.complete && vImg.naturalWidth) vImg.classList.add('ready');

    vInfo.classList.remove('show');
    vInfo.innerHTML = isProject
      ? `<p class="v-kind">${esc(it.id)}, ${esc(it.area)}</p>
         <h2 class="v-title" id="viewerTitle">${esc(it.name)}</h2>
         <p class="v-text">${esc(it.description)}</p>
         <dl class="v-meta">
           <div><dt>Peran</dt><dd>${esc(it.role)}</dd></div>
           <div><dt>Teknologi</dt><dd>${esc(it.tech)}</dd></div>
           <div><dt>Tahun</dt><dd>${esc(it.year)}</dd></div>
           <div><dt>Status</dt><dd>${esc(it.status)}</dd></div>
           <div><dt>Tim</dt><dd>Individu</dd></div>
         </dl>`
      : `<p class="v-kind">${esc([it.badge, it.year].filter(Boolean).join(', '))}</p>
         <h2 class="v-title" id="viewerTitle">${esc(it.title)}</h2>
         <p class="v-text">${esc(it.org)}</p>
         ${it.pdf ? `<a class="v-link link" href="${esc(asset(it.pdf))}" target="_blank" rel="noopener">Buka PDF ↗</a>` : ''}`;
    void vInfo.offsetWidth;
    vInfo.classList.add('show');
    $('#viewerCount').textContent = `${pad(V.i + 1)} / ${pad(V.list.length)}`;
    vInfo.scrollTop = 0;
  }

  function openViewer(kind, index, opener) {
    V.kind = kind;
    V.list = kind === 'project' ? D.projects : D.certificates;
    V.i = clamp(index, 0, V.list.length - 1);
    V.opener = opener || document.activeElement;
    renderViewer();
    viewer.inert = false;
    viewer.setAttribute('aria-hidden', 'false');
    viewer.classList.add('open');
    document.body.classList.add('no-scroll');
    setTimeout(() => $('#viewerClose').focus({ preventScroll: true }), 60);
  }
  function closeViewer() {
    viewer.classList.remove('open');
    viewer.inert = true;
    viewer.setAttribute('aria-hidden', 'true');
    if (!document.body.classList.contains('menu-open')) document.body.classList.remove('no-scroll');
    if (V.opener && V.opener.focus) V.opener.focus({ preventScroll: true });
  }
  function stepViewer(d) {
    V.i = (V.i + d + V.list.length) % V.list.length;
    renderViewer();
  }

  function initPeek() {
    if (!canHover || reduce) return;
    const peek = $('#peek');
    const pimg = $('img', peek);
    const tag = $('#peekTag');
    setAR(pimg, peek);
    const host = $('#indexList');
    let x = 0, y = 0, cx = 0, cy = 0, rot = 0, on = false, raf = null, currentId = '', last = 0;

    function loop(now) {
      const dt = last ? clamp((now - last) / 16.667, 0.25, 3) : 1; last = now;
      const k = 1 - Math.pow(0.86, dt);
      const px = cx;
      cx += (x - cx) * k; cy += (y - cy) * k;
      rot += (clamp((cx - px) * 0.6, -9, 9) - rot) * (1 - Math.pow(0.8, dt));
      peek.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0) translate(-50%,-50%) rotate(${rot.toFixed(2)}deg)`;
      if (on || Math.abs(x - cx) > 0.5 || Math.abs(y - cy) > 0.5) raf = requestAnimationFrame(loop);
      else { raf = null; last = 0; }
    }

    host.addEventListener('mouseover', (e) => {
      const btn = e.target.closest('.row-btn');
      if (!btn) return;
      if (!on) { cx = x; cy = y; }
      on = true;
      if (btn.dataset.id !== currentId) {
        currentId = btn.dataset.id;
        const p = D.projects.find((q) => q.id === currentId);
        if (p) {
          const r = ratioOf(p.image);
          if (r) peek.style.setProperty('--ar', r);
          setImg(pimg, p.image, '360px');
          pimg.style.objectFit = p.fit || 'contain';
          tag.textContent = `${p.id}, ${p.area}`;
        }
      }
      peek.classList.add('on');
      if (!raf) raf = requestAnimationFrame(loop);
    });
    host.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; if (!raf && on) raf = requestAnimationFrame(loop); });
    host.addEventListener('mouseleave', () => { on = false; peek.classList.remove('on'); });
  }

  function initCursor() {
    if (!canHover || reduce) return;
    document.body.insertAdjacentHTML('beforeend',
      '<div class="cursor" id="cursor" aria-hidden="true"><span class="cursor-ring"><span class="cursor-shape"><span class="cursor-label"></span></span></span><span class="cursor-dot"><i></i></span><span class="cursor-xy"></span></div>');
    const root = $('#cursor'), ring = $('.cursor-ring', root), dot = $('.cursor-dot', root), label = $('.cursor-label', root), xy = $('.cursor-xy', root);
    document.documentElement.classList.add('has-cursor');
    let x = -200, y = -200, rx = -200, ry = -200, state = '', theme = '', on = false, sinceCheck = 0;
    const setState = (st) => { if (st !== state) { state = st; root.dataset.state = st; } };

    function evaluate(t) {
      if (!t || !t.closest) return;
      const th = t.closest('.viewer-side') ? 'light'
        : t.closest('.viewer, .menu, [data-bg="dark"]') ? 'dark' : 'light';
      if (th !== theme) { theme = th; root.dataset.theme = th; }
      const lab = t.closest('[data-cursor]');
      if (lab) { if (label.textContent !== lab.dataset.cursor) label.textContent = lab.dataset.cursor; setState('label'); return; }
      if (t.closest('[data-cursor-hide]')) { setState('hide'); return; }
      if (t.closest('a, button, [role="button"], .org-head, .skill-tag, .foot-sign i, .bot')) { setState('hot'); return; }
      setState(t.closest('.hero') ? 'hero' : '');
    }

    window.addEventListener('pointermove', (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      x = e.clientX; y = e.clientY;
      if (!on) { on = true; rx = x; ry = y; root.classList.add('on'); }
      evaluate(e.target);
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => { on = false; root.classList.remove('on'); });
    window.addEventListener('pointerdown', () => root.classList.add('down'));
    window.addEventListener('pointerup', () => root.classList.remove('down'));

    let hTop = 0;
    cursorTick = (dt) => {
      if (!on) return;
      if (vel !== 0 && (sinceCheck += dt) > 5) { sinceCheck = 0; evaluate(document.elementFromPoint(x, y)); }
      const k = 1 - Math.pow(0.8, dt);
      rx += (x - rx) * k; ry += (y - ry) * k;
      dot.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
      ring.style.transform = `translate3d(${rx.toFixed(1)}px,${ry.toFixed(1)}px,0)`;
      if (state === 'hero') {
        hTop = $('#beranda').getBoundingClientRect().top;
        xy.style.transform = `translate3d(${(rx + 24).toFixed(1)}px,${(ry + 18).toFixed(1)}px,0)`;
        xy.textContent = `X ${pad(Math.round(x), 4)}  Y ${pad(Math.max(0, Math.round(y - hTop)), 4)}`;
      }
    };
  }

  function initBadge() {
    const stage = $('#badgeStage'); if (!stage) return;
    const swing = $('#badgeSwing'), card = $('#badge'), img = $('.badge-photo img');
    if (reduce) { stage.classList.add('in'); return; }
    let th = 0, thv = 0, rx = 0, ry = 0, trx = 0, trY = 0, drag = null, active = false, last = '';

    new IntersectionObserver((es) => es.forEach((e) => {
      active = e.isIntersecting;
      if (active && !stage.classList.contains('in')) { stage.classList.add('in'); th = -16; thv = 0; }
    }), { rootMargin: '0px 0px -12% 0px' }).observe(stage);

    if (canHover) {
      stage.addEventListener('pointermove', (e) => {
        if (drag) return;
        const r = card.getBoundingClientRect();
        trx = -(clamp((e.clientY - r.top) / r.height, 0, 1) - 0.5) * 14;
        trY = (clamp((e.clientX - r.left) / r.width, 0, 1) - 0.5) * 20;
      });
      stage.addEventListener('pointerleave', () => { trx = trY = 0; });
    }

    card.addEventListener('pointerdown', (e) => {
      drag = { x: e.clientX, th };
      card.setPointerCapture(e.pointerId);
      card.classList.add('grab');
    });
    card.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const nt = clamp(drag.th + (e.clientX - drag.x) * 0.16, -42, 42);
      thv = (nt - th) * 0.7; th = nt;
    });
    const end = () => { if (drag) { drag = null; card.classList.remove('grab'); } };
    card.addEventListener('pointerup', end);
    card.addEventListener('pointercancel', end);
    card.addEventListener('lostpointercapture', end);

    badgeTick = (dt) => {
      if (!active && Math.abs(th) < 0.02 && Math.abs(thv) < 0.02) return;
      if (!drag) {
        thv += (-0.013 * th - 0.03 * thv - (touchMode ? 0 : clamp(velS, -60, 60) * 0.004)) * dt;
        th = clamp(th + thv * dt, -45, 45);
      }
      const k = 1 - Math.pow(0.88, dt);
      rx += (trx - rx) * k; ry += (trY - ry) * k;
      const key = `${th.toFixed(2)}|${rx.toFixed(2)}|${ry.toFixed(2)}`;
      if (key === last) return;
      last = key;
      swing.style.transform = `rotate(${th.toFixed(2)}deg)`;
      card.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${(ry - th * 0.35).toFixed(2)}deg)`;
      if (img) img.style.transform = `translate3d(${(-ry * 0.45).toFixed(1)}px,${(rx * 0.45).toFixed(1)}px,0)`;
    };
  }

  function initHint() {
    const hint = $('#indexHint'); if (!hint) return;
    const title = $('.hint-title-text', hint), sub = $('.hint-sub', hint);
    const swap = (t) => {
      const el = $('.hint-title', hint);
      el.classList.add('swap');
      setTimeout(() => { title.textContent = t; el.classList.remove('swap'); }, 250);
    };
    if (!canHover) {
      hint.classList.add('touch');
      title.textContent = 'Ketuk proyek untuk melihat detail';
      sub.textContent = 'Gambar, peran, teknologi, dan status setiap proyek ada di dalamnya.';
      return;
    }
    $('#indexList').addEventListener('mouseover', (e) => {
      if (hint.classList.contains('done') || !e.target.closest('.row-btn')) return;
      hint.classList.add('done');
      swap('Pratinjau aktif. Klik proyek untuk membuka detail');
      setTimeout(() => { sub.textContent = 'Pakai filter di kanan atas untuk memilah proyek PCB atau IoT.'; }, 250);
    });
  }

  function bindUI() {
    document.addEventListener('click', (e) => {
      const nav = e.target.closest('[data-nav]');
      if (nav) {
        const id = (nav.getAttribute('href') || '').replace('#', '');
        if (id) {
          e.preventDefault();
          if (menu.classList.contains('open')) setMenu(false);
          requestAnimationFrame(() => requestAnimationFrame(() => goTo(id)));
        }
        return;
      }

      const opener = e.target.closest('[data-open]');
      if (opener) { openViewer(opener.dataset.open, parseInt(opener.dataset.index, 10), opener); return; }

      const head = e.target.closest('.org-head');
      if (head) {
        const row = head.closest('.org');
        const open = !row.classList.contains('open');
        row.classList.toggle('open', open);
        head.setAttribute('aria-expanded', String(open));
        setTimeout(measure, 850);
        return;
      }

      const tab = e.target.closest('[data-filter]');
      if (tab) {
        $$('#tabs button').forEach((b) => b.setAttribute('aria-pressed', String(b === tab)));
        moveTabInd();
        renderIndex(tab.dataset.filter, true);
        setTimeout(measure, 100);
        return;
      }

      if (e.target.closest('[data-close]')) closeViewer();
    });

    menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
    $('#viewerClose').addEventListener('click', closeViewer);
    $('#viewerPrev').addEventListener('click', () => stepViewer(-1));
    $('#viewerNext').addEventListener('click', () => stepViewer(1));

    document.addEventListener('keydown', (e) => {
      if (viewer.classList.contains('open')) {
        if (e.key === 'Escape') closeViewer();
        else if (e.key === 'ArrowLeft') stepViewer(-1);
        else if (e.key === 'ArrowRight') stepViewer(1);
        else if (e.key === 'Tab') {
          const f = $$('button, a[href]', viewer).filter((el) => !el.disabled && el.offsetParent !== null);
          if (!f.length) return;
          const first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
        return;
      }
      if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
    });
  }

  function catmullRom(pts) {
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    const segs = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      const s = ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
      segs.push(s);
      d += s;
    }
    return { d, segs };
  }

  function runLoader(onReady) {
    const loader = $('#loader');
    let finished = false;

    function ready() {
      document.documentElement.classList.remove('is-loading');
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-ready');
      themeReady = true;
      setThemeColor(hdTheme || 'light');
      onReady();
    }
    function done() {
      if (finished) return;
      finished = true;
      if (loader) {
        const numEl = $('#loaderNum');
        if (numEl) numEl.textContent = '100';
        loader.classList.add('done');
        setTimeout(() => loader.remove(), 1300);
      }
      setTimeout(ready, loader ? 380 : 0);
    }

    if (!loader || reduce) { if (loader) loader.remove(); finished = true; ready(); return; }

    let quick = false;
    try { quick = sessionStorage.getItem('afd-visited') === '1'; sessionStorage.setItem('afd-visited', '1'); } catch (e) { }

    // Elemen HUD
    const numEl = $('#loaderNum');
    const stageEl = $('#ldStage');
    const tAlt = $('#tAlt'), tSpd = $('#tSpd'), tHdg = $('#tHdg'), tWp = $('#tWp');
    const drone = $('#drone'), shadow = $('#ldShadow'), payload = $('#payload');

    const STAGES = [[0, 'Memeriksa baterai'], [0.16, 'Kalibrasi IMU'], [0.34, 'Mengunci GPS'], [0.52, 'Mengantar paket PCB'], [0.78, 'Menuju titik akhir'], [0.995, 'Paket terkirim']];
    const dur = quick ? 1200 : 2600;
    const t0 = performance.now();
    let last = t0, stageI = -1;

    // Posisi drone: gerak dari kiri bawah ke kanan atas secara sinusoidal
    const startX = innerWidth * 0.1, startY = innerHeight * 0.7;
    const endX = innerWidth * 0.85, endY = innerHeight * 0.25;
    let droneX = startX, droneY = startY;
    let vx = 0, vy = 0, tilt = 0, th = 0, thv = 0, pvx = 0;

    // Aktifkan drone
    if (drone) drone.style.opacity = '1';

    // Coba gambar SVG route jika tersedia (optional - tidak crash jika gagal)
    try {
      const map = $('#ldMap'), route = $('#ldRoute'), trail = $('#ldDone'), padsG = $('#ldPads');
      if (map && route && trail && padsG) {
        const W = innerWidth, H = innerHeight;
        const portrait = W < H;
        const WP = portrait
          ? [[0.16,0.66],[0.5,0.56],[0.82,0.5],[0.5,0.4],[0.2,0.34],[0.72,0.24]]
          : [[0.1,0.68],[0.27,0.46],[0.43,0.62],[0.6,0.38],[0.76,0.56],[0.9,0.3]];
        const pts = WP.map(([x,y]) => [x*W, y*H]);
        map.setAttribute('viewBox', `0 0 ${W} ${H}`);
        let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
        for (let i = 0; i < pts.length - 1; i++) {
          const p0=pts[i-1]||pts[i], p1=pts[i], p2=pts[i+1], p3=pts[i+2]||p2;
          const c1=[p1[0]+(p2[0]-p0[0])/6, p1[1]+(p2[1]-p0[1])/6];
          const c2=[p2[0]-(p3[0]-p1[0])/6, p2[1]-(p3[1]-p1[1])/6];
          d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
        }
        route.setAttribute('d', d);
        trail.setAttribute('d', d);
        const L = route.getTotalLength();
        if (L > 0) {
          trail.style.strokeDasharray = `${L} ${L}`;
          trail.style.strokeDashoffset = `${L}`;
          padsG.innerHTML = pts.map((p,i) =>
            `<g class="pad" transform="translate(${p[0].toFixed(1)} ${p[1].toFixed(1)})"><circle class="ring" r="9"/><rect x="-7" y="-7" width="14" height="14" rx="2"/><circle r="2.4"/><text x="13" y="-12">TP${i+1}</text></g>`
          ).join('');
        }
      }
    } catch(_) {}

    function step(now) {
      if (finished) return;
      const dt = clamp((now - last) / 16.667, 0.25, 3); last = now;
      const t = clamp((now - t0) / dur, 0, 1);
      const e = easeIO(t);

      // Update counter %
      if (numEl) numEl.textContent = Math.round(e * 100);

      // Stage text
      let si = 0;
      STAGES.forEach(([at], i) => { if (e >= at) si = i; });
      if (si !== stageI && stageEl) {
        stageI = si;
        stageEl.classList.add('swap');
        setTimeout(() => { if(stageEl){stageEl.textContent = STAGES[si][1]; stageEl.classList.remove('swap');} }, 160);
      }

      // Drone physics - gerak sepanjang path virtual
      const tx = lerp(startX, endX, e) + Math.sin(now / 220) * 18;
      const ty = lerp(startY, endY, e) + Math.sin(now / 170) * 10;
      const kS = 0.08, cS = 0.34;
      vx += ((tx - droneX) * kS - vx * cS) * dt;
      vy += ((ty - droneY) * kS - vy * cS) * dt;
      droneX += vx * dt; droneY += vy * dt;
      const ax = (vx - pvx) / dt; pvx = vx;
      tilt += (clamp(vx * 1.7, -24, 24) - tilt) * (1 - Math.pow(0.82, dt));
      thv += (-0.05 * th - 0.07 * thv - ax * 2.4) * dt;
      th = clamp(th + thv * dt, -42, 42);

      if (drone) {
        drone.style.transform = `translate3d(${droneX.toFixed(1)}px,${droneY.toFixed(1)}px,0) translate(-50%,-50%) rotate(${tilt.toFixed(2)}deg)`;
      }
      if (payload) payload.setAttribute('transform', `rotate(${(th - tilt).toFixed(2)} 120 74)`);
      if (shadow) {
        const ground = innerHeight * 0.86, alt = clamp((ground - droneY) / innerHeight, 0, 1);
        shadow.style.opacity = (0.55 - alt * 0.45).toFixed(3);
        shadow.style.transform = `translate3d(${(droneX - 60).toFixed(1)}px,${ground.toFixed(1)}px,0) scale(${(1 - alt * 0.6).toFixed(3)},1)`;
      }

      // HUD
      const alt2 = clamp((innerHeight * 0.86 - droneY) / innerHeight, 0, 1);
      if (tAlt) tAlt.textContent = (alt2 * 120).toFixed(1).padStart(5, '0');
      if (tSpd) tSpd.textContent = Math.min(99.9, Math.hypot(vx, vy) * 0.9).toFixed(1).padStart(4, '0');
      if (tHdg) tHdg.textContent = `${pad(Math.round(((Math.atan2(vy, vx) * 180 / Math.PI) + 450) % 360), 3)}°`;
      if (tWp)  tWp.textContent  = `${Math.min(6, Math.floor(e * 7))}/6`;

      // Update trail jika SVG tersedia
      try {
        const trail = $('#ldDone'), route = $('#ldRoute');
        if (trail && route) {
          const L = route.getTotalLength();
          if (L > 0) {
            trail.style.strokeDashoffset = (L * (1 - e)).toFixed(1);
            const pads = $$('.pad', document);
            const fracs = pads.map((_, i) => i / Math.max(1, pads.length - 1));
            pads.forEach((el, i) => el.classList.toggle('on', e >= fracs[i] - 0.004));
          }
        }
      } catch(_) {}

      if (t >= 1) {
        // Animasi selesai - exit drone keluar layar lalu done()
        done();
        return;
      }
      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }
  function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

  function fitType() {
    const name = $('#heroName'), fig = $('#heroFigure'), figIn = $('#heroFigure .hero-fig-in');
    if (name) {
      name.style.removeProperty('--fit');
      const widest = Math.max(0, ...$$('.line', name).map((l) => { const c = l.querySelector('.ch:last-child'); return c ? c.offsetLeft + c.offsetWidth : 0; }));
      let room = name.clientWidth;
      if (fig && figIn && fig.offsetTop < name.offsetTop + name.offsetHeight) room = Math.min(room, fig.offsetLeft + figIn.offsetLeft - name.offsetLeft - 20);
      if (widest > room && room > 0) name.style.setProperty('--fit', (room / widest).toFixed(3));
    }
    const sign = $('#footSign');
    if (sign) {
      const box = sign.parentElement;
      box.style.removeProperty('--fit');
      const w = sign.offsetWidth, room = box.clientWidth;
      if (w > room && room > 0) box.style.setProperty('--fit', ((room * 0.99) / w).toFixed(3));
    }
  }

  function initVideo() {
    const v = $('.contact-video video'); if (!v) return;
    if (reduce || !('IntersectionObserver' in window)) return;
    new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { const pr = v.play(); if (pr && pr.catch) pr.catch(() => { }); } else v.pause();
    }), { rootMargin: '200px 0px' }).observe(v);
  }

  function init() {
    document.addEventListener('error', imgFallback, true);
    if (window.history && 'scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.classList.toggle('touch', touchMode);
    if (!touchMode) window.addEventListener('touchstart', enterTouchMode, { once: true, passive: true });

    renderHero();
    renderAbout();
    renderOrgs();
    renderProjects();
    renderSkills();
    buildCerts(true);
    renderPortal();
    renderContact();
    renderMenu();
    decorateHeads();
    $$('.ar-host').forEach((h) => setAR($('img', h), h));
    fitType();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { fitType(); measure(); });

    bindUI();
    initTheme();
    initHeader();
    initPeek();
    initCursor();
    initHint();
    initBadge();
    initFx();
    initSmooth();
    initVideo();

    engineReady = true;
    collect();
    sy = lastY = window.scrollY;
    request();

    let lastW = window.innerWidth;
    const remeasure = debounce(() => {
      const w = window.innerWidth;
      if (touchMode && w === lastW) { vh = window.innerHeight; return; }
      lastW = w; buildCerts(false); fitType(); measure();
    }, 150);
    window.addEventListener('resize', remeasure);
    window.addEventListener('load', () => { measure(); });
    document.addEventListener('load', (e) => { if (e.target && e.target.tagName === 'IMG') remeasure(); }, true);
    if ('ResizeObserver' in window) new ResizeObserver(debounce(measure, 120)).observe($('#main'));

    runLoader(() => {
      observeReveals();
      setTimeout(() => document.body.classList.add('intro-done'), 2600);
      setTimeout(() => $$('.hero-cap span, .hero-meta dt').forEach((el) => scramble(el)), 1100);
      setTimeout(() => {
        $$('.media:not(.in), .row:not(.in), .rise:not(.in), .part-in:not(.in), .sec-meta:not(.in), .stat:not(.in)').forEach((el) => {
          if (el.closest('.hero, .viewer, .menu')) return;
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) reveal(el);
        });
      }, 2500);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();