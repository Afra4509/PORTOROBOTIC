/* ==========================================================================
   Portofolio: render konten dari data.js dan semua motion.
   Tanpa library. Bagian utama:
   1. Helper dan render
   2. Engine scroll (parallax dengan smoothing, progress, teks bertahap)
   3. Reveal, tema background, header, menu
   4. Viewer, preview hover, filter
   5. Pembuka dan init
   ========================================================================== */
(function () {
  'use strict';

  const D = portfolioData;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ------------------------------------------------------------------ */
  /* 1. Helper & Icons                                                  */
  /* ------------------------------------------------------------------ */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ESC[c]);
  const asset = (p) => (!p ? '' : /^(https?:|data:)/.test(p) ? p : encodeURI(p));
  const projectIndex = (id) => D.projects.findIndex((p) => p.id === id);

  const ICONS = {
    // Keahlian
    code: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    chip: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
    chart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    wifi: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
    desktop: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    terminal: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,

    // Proyek per-area
    pcb: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="3"/><path d="M7 2v4"/><path d="M17 2v4"/><path d="M2 12h5l2 3h6l2-3h5"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></svg>`,
    power: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    rf: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>`,
    firmware: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    cloud: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
    network: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    gauge: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 22v-4"/><path d="m19.07 19.07-2.83-2.83"/><path d="M22 12h-4"/><path d="m19.07 4.93-2.83 2.83"/></svg>`,
    robot: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>`,

    // Kontak
    whatsapp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
    github: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
    linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
    instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    globe: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
  };

  function getSkillIcon(group) {
    if (/bahasa|pemrograman|code/i.test(group)) return ICONS.code;
    if (/iot|hardware|elektronika/i.test(group)) return ICONS.chip;
    if (/data|visual/i.test(group)) return ICONS.chart;
    if (/jaringan|nirkabel|wireless|rf/i.test(group)) return ICONS.wifi;
    if (/aplikasi|desktop|web/i.test(group)) return ICONS.desktop;
    if (/sistem|tools|os/i.test(group)) return ICONS.terminal;
    return ICONS.chip;
  }

  function getProjectIcon(area) {
    switch (area) {
      case 'PCB': return ICONS.pcb;
      case 'Daya': return ICONS.power;
      case 'RF': return ICONS.rf;
      case 'Firmware': return ICONS.firmware;
      case 'Cloud': return ICONS.cloud;
      case 'Jaringan': return ICONS.network;
      case 'Instrumentasi': return ICONS.gauge;
      case 'Robotika': return ICONS.robot;
      default: return ICONS.chip;
    }
  }

  function getContactIcon(label) {
    if (/whatsapp|wa/i.test(label)) return ICONS.whatsapp;
    if (/github/i.test(label)) return ICONS.github;
    if (/linkedin/i.test(label)) return ICONS.linkedin;
    if (/instagram/i.test(label)) return ICONS.instagram;
    if (/situs|web|aefera/i.test(label)) return ICONS.globe;
    return ICONS.globe;
  }

  let engineReady = false;

  /* Bingkai gambar: .media (clip reveal) > .media-in (scale) > img (parallax) */
  function mediaHTML({ src, alt, fit, tag = 'div', attrs = '', cls = '', parallax = true, eager = false }) {
    const fitStyle = fit ? ` style="object-fit:${fit}"` : '';
    const px = parallax ? ' data-img-parallax="0.09"' : '';
    return `<${tag} class="media ${cls}" ${attrs}><span class="media-in"><img src="${esc(asset(src))}" alt="${esc(alt)}" decoding="async"${px}${fitStyle} /></span></${tag}>`;
  }

  /* ------------------------------------------------------------------ */
  /* Render                                                             */
  /* ------------------------------------------------------------------ */
  function renderHero() {
    const p = D.profile;
    const name = $('#heroName');
    name.setAttribute('aria-label', p.name);
    name.innerHTML = p.name.split(' ').map((w, i) =>
      `<span class="line" data-dir="${i % 2 ? 1 : -1}" aria-hidden="true"><span class="line-in" style="--i:${i}">${esc(w)}</span></span>`
    ).join('');

    const proj = D.projects[projectIndex(p.heroProject)] || D.projects[0];
    $('#heroFigure').innerHTML = mediaHTML({
      src: p.heroImage, alt: proj.name, fit: proj.fit, tag: 'button',
      attrs: `type="button" data-open="project" data-index="${projectIndex(proj.id)}" aria-label="Lihat detail ${esc(proj.name)}"`
    });

    $('#heroRole').textContent = p.tagline;
    $('#heroMeta').innerHTML = [
      ['Lokasi', p.location], ['Fokus', p.focus], ['Status', p.status]
    ].map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('');
  }

  function renderAbout() {
    const p = D.profile;
    $('#statement').innerHTML = p.statement.split(' ').map((w) => `<span class="sw">${esc(w)}</span>`).join(' ');
    if (reduce) $('#statement').classList.add('static');

    $('#aboutParas').innerHTML = p.paragraphs.map((t, i) => `<p class="rise" style="--d:${i * 0.1}s">${esc(t)}</p>`).join('');

    const facts = [
      ['Institusi', p.institution], ['Departemen', p.department], ['Program', p.program],
      ['NRP', p.nrp], ['Status', p.status], ['Lokasi', p.location],
      ['Minat', p.interests.join(', ')]
    ];
    $('#facts').innerHTML = facts.map(([k, v], i) =>
      `<div class="row" style="--d:${i * 0.05}s"><dt>${k}</dt><dd>${esc(v)}</dd></div>`
    ).join('');

    $('#portrait').innerHTML = `
      <div class="portrait-card">
        <span class="p-cross p-tl" aria-hidden="true">+</span>
        <span class="p-cross p-tr" aria-hidden="true">+</span>
        <span class="p-cross p-bl" aria-hidden="true">+</span>
        <span class="p-cross p-br" aria-hidden="true">+</span>
        <div class="portrait-media-wrap">
          ${mediaHTML({ src: p.photo, alt: `Foto ${p.name}`, cls: 'portrait-media' })}
          <div class="portrait-vignette" aria-hidden="true"></div>
          <span class="portrait-loc-chip" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
            Surabaya
          </span>
        </div>
      </div>`;

    $('#eduList').innerHTML = D.education.map((e, i) => `
      <li class="row" style="--d:${i * 0.08}s">
        <div class="edu-row">
          <span class="logo-tile"><img src="${esc(asset(e.image))}" alt="Logo ${esc(e.institution)}" loading="eager" /></span>
          <div>
            <span class="edu-name">${esc(e.institution)}</span>
            <span class="edu-sub">${esc(e.degree)}. ${esc(e.detail)}</span>
          </div>
          <span class="edu-period">${esc(e.period)}</span>
        </div>
      </li>`).join('');
  }

  function renderOrgs() {
    $('#orgList').innerHTML = D.organizations.map((o, i) => `
      <li class="row org${i === 0 ? ' open' : ''}" style="--d:${i * 0.06}s">
        <button class="org-head" type="button" aria-expanded="${i === 0}" aria-controls="org-${i}">
          <span class="org-year">${esc(o.year)}</span>
          <span><span class="org-name">${esc(o.name)}</span><span class="org-role">${esc(o.position)}</span></span>
          <span class="org-plus" aria-hidden="true"></span>
        </button>
        <div class="org-panel" id="org-${i}" role="region">
          <div>
            <div class="org-inner">
              <span class="logo-tile"><img src="${esc(asset(o.image))}" alt="Logo ${esc(o.name)}" loading="eager" /></span>
              <div>
                <p class="org-desc">${esc(o.description)}</p>
                <ul class="org-bullets">${o.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
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
      <article class="spread${i % 2 ? ' flip' : ''}">
        <div class="spread-media">
          ${mediaHTML({ src: p.image, alt: p.name, fit: p.fit, tag: 'button', attrs: `type="button" data-open="project" data-index="${idx}" aria-label="Lihat detail ${esc(p.name)}"` })}
        </div>
        <div class="spread-body">
          <h3 class="spread-title" data-split>${esc(p.name)}</h3>
          <p class="spread-sum rise">${esc(p.summary)}</p>
          <dl class="meta rise" style="--d:.08s">
            <div><dt>Peran</dt><dd>${esc(p.role)}</dd></div>
            <div><dt>Teknologi</dt><dd>${esc(p.tech)}</dd></div>
            <div><dt>Tahun</dt><dd>${esc(p.year)}, ${esc(p.status.toLowerCase())}</dd></div>
          </dl>
          <button class="btn rise" type="button" data-open="project" data-index="${idx}" style="--d:.14s">Lihat detail</button>
        </div>
      </article>`;
    }).join('');

    const counts = { all: D.projects.length, pcb: D.projects.filter((p) => p.kind === 'pcb').length, iot: D.projects.filter((p) => p.kind === 'iot').length };
    $('#tabs').innerHTML = [['all', 'Semua'], ['pcb', 'PCB'], ['iot', 'IoT dan embedded']].map(([k, l]) =>
      `<button type="button" data-filter="${k}" aria-pressed="${k === 'all'}">${l}<sup>${counts[k]}</sup></button>`
    ).join('');

    renderIndex('all', false);
  }

  function renderIndex(filter, immediate) {
    const list = D.projects.filter((p) => filter === 'all' || p.kind === filter);
    const host = $('#indexList');
    host.innerHTML = list.map((p, i) => {
      const icon = getProjectIcon(p.area);
      return `
      <li class="row" style="--d:${immediate ? i * 0.04 : 0}s">
        <button class="row-btn" type="button" data-open="project" data-index="${projectIndex(p.id)}" data-id="${p.id}">
          <span class="row-left">
            <span class="row-icon-tile" aria-hidden="true">${icon}</span>
            <span class="row-name">${esc(p.name)}</span>
          </span>
          <span class="row-area"><span class="area-badge">${esc(p.area)}</span></span>
          <span class="row-year">${esc(p.year)}</span>
          <span class="row-arrow" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </button>
      </li>`;
    }).join('');
    if (immediate) {
      requestAnimationFrame(() => $$('.row', host).forEach((r) => r.classList.add('in')));
    } else if (engineReady) {
      observeReveals();
    }
  }

  function renderSkills() {
    $('#skillList').innerHTML = D.skills.map((s, i) => {
      const icon = getSkillIcon(s.group);
      const tags = s.items.map(it => `<span class="skill-tag">${esc(it)}</span>`).join('');
      return `
      <li class="row" style="--d:${i * 0.05}s">
        <div class="skill-row">
          <div class="skill-head">
            <span class="skill-icon-tile" aria-hidden="true">${icon}</span>
            <h3 class="skill-title">${esc(s.group)}</h3>
          </div>
          <div class="skill-tags">${tags}</div>
        </div>
      </li>`;
    }).join('');
  }

  function certHTML(c, i) {
    const meta = [c.badge, c.year].filter(Boolean).join(', ');
    return `
      <button class="cert" type="button" data-open="cert" data-index="${i}" aria-label="Lihat ${esc(c.title)}, ${esc(c.org)}">
        ${mediaHTML({ src: c.image, alt: `${c.title}, ${c.org}`, tag: 'span', cls: 'media--natural', parallax: false })}
        <span class="cert-cap">
          <span class="cert-title">${esc(c.title)}</span>
          <span class="cert-org">${esc(c.org)}</span>
          <span class="cert-meta">${esc(meta)}</span>
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
    const speeds = n === 3 ? [0.05, -0.06, 0.1] : n === 2 ? [0.04, -0.05] : [0];
    const host = $('#certCols');
    host.style.setProperty('--cols', n);
    host.innerHTML = cols.map((items, ci) =>
      `<div class="cert-col"${n > 1 && !reduce ? ` data-speed="${speeds[ci]}"` : ''}>${items.join('')}</div>`
    ).join('');
    if (engineReady) { collect(); observeReveals(); }
  }

  function renderPortal() {
    const p = D.portal;
    const list = (o) => `<div><h4>${esc(o.title)}</h4><ul class="rows">${o.points.map((t, i) => `<li class="row" style="--d:${i * 0.06}s"><div style="padding:.7rem 0">${esc(t)}</div></li>`).join('')}</ul></div>`;
    $('#portal').innerHTML = `
      <div class="portal-main">
        <h3 class="portal-title" data-split>${esc(p.title)}</h3>
        <p class="portal-lead rise">${esc(p.lead)}</p>
        <a class="btn rise" href="${esc(p.url)}" target="_blank" rel="noopener" style="--d:.1s">${esc(p.button)} ↗</a>
      </div>
      <div class="portal-lists">${list(p.here)}${list(p.main)}</div>`;
  }

  function renderContact() {
    const c = D.contact;
    const allLinks = [
      { label: "WhatsApp", value: c.whatsapp, url: c.whatsappUrl },
      ...c.links.filter(l => !/whatsapp/i.test(l.label))
    ];

    $('#contactList').innerHTML = allLinks.map((l, i) => {
      const icon = getContactIcon(l.label);
      return `
      <li class="row" style="--d:${i * 0.06}s">
        <a href="${esc(l.url)}" target="_blank" rel="noopener">
          <span class="c-lead">
            <span class="c-icon" aria-hidden="true">${icon}</span>
            <span class="c-label">${esc(l.label)}</span>
          </span>
          <span class="c-value">${esc(l.value)}</span>
          <span class="c-out" aria-hidden="true">↗</span>
        </a>
      </li>`;
    }).join('');
    $('#footCopy').textContent = `© ${D.profile.year} ${D.profile.name}`;
  }

  const SECTION_LINKS = [
    ['beranda', 'Beranda'], ['tentang', 'Tentang'], ['pengalaman', 'Pengalaman'], ['proyek', 'Proyek'],
    ['keahlian', 'Keahlian'], ['sertifikat', 'Sertifikat'], ['situs', 'Situs lain'], ['kontak', 'Kontak']
  ];
  function renderMenu() {
    $('#menuList').innerHTML = SECTION_LINKS.map(([id, label], i) =>
      `<li><a href="#${id}" data-nav data-id="${id}"><span class="mi"><span class="mi-in" style="--i:${i}">${label}</span></span></a></li>`
    ).join('');
  }

  /* ------------------------------------------------------------------ */
  /* 2. Engine scroll                                                   */
  /* ------------------------------------------------------------------ */
  const items = [];
  let vh = window.innerHeight;
  let docH = 0;
  let sy = window.scrollY;
  let rafId = null;
  let heroLines = [];
  let heroFigure = null;
  let stmt = { el: null, words: [], top: 0, h: 0 };
  const progressEl = $('#progress');

  function pageTop(el) { let y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; }

  function collect() {
    items.length = 0;
    $$('[data-speed]').forEach((el) => items.push({ el, type: 'speed', s: parseFloat(el.dataset.speed) || 0, frame: el }));
    $$('[data-img-parallax]').forEach((img) => {
      const frame = img.closest('.media');
      if (frame) items.push({ el: img, type: 'img', s: parseFloat(img.dataset.imgParallax) || 0.09, frame });
    });
    heroLines = $$('.hero-name .line');
    heroFigure = $('#heroFigure');
    stmt.el = $('#statement');
    stmt.words = stmt.el ? $$('.sw', stmt.el) : [];
    measure();
  }

  function measure() {
    vh = window.innerHeight;
    docH = document.documentElement.scrollHeight;
    items.forEach((it) => { it.top = pageTop(it.frame); it.h = it.frame.offsetHeight; });
    if (stmt.el) { stmt.top = pageTop(stmt.el); stmt.h = stmt.el.offsetHeight; }
    request();
  }

  function update() {
    if (progressEl) progressEl.style.transform = `scaleX(${clamp(sy / Math.max(1, docH - vh), 0, 1).toFixed(4)})`;
    if (reduce) return;

    const mid = sy + vh / 2;
    for (const it of items) {
      if (it.top + it.h < sy - vh * 0.6 || it.top > sy + vh * 1.6) continue;
      const center = it.top + it.h / 2;
      let y;
      if (it.type === 'speed') {
        y = -(center - mid) * it.s;
      } else {
        const p = clamp((center - mid) / (vh / 2 + it.h / 2), -1, 1);
        y = -p * it.s * it.h;
      }
      it.el.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
    }

    if (sy < vh * 1.3) {
      heroLines.forEach((l) => { l.style.transform = `translate3d(${(sy * 0.16 * l.dataset.dir).toFixed(1)}px,0,0)`; });
      if (heroFigure) heroFigure.style.transform = `translate3d(0,${(sy * 0.17).toFixed(1)}px,0)`;
    }

    if (stmt.words.length) {
      const start = stmt.top - vh * 0.85;
      const end = stmt.top + stmt.h - vh * 0.45;
      const p = clamp((sy - start) / Math.max(1, end - start), 0, 1);
      const n = stmt.words.length;
      for (let i = 0; i < n; i++) {
        const v = clamp((p * (n + 2) - i) / 2, 0, 1);
        stmt.words[i].style.opacity = (0.16 + 0.84 * v).toFixed(3);
      }
    }
  }

  function frame() {
    rafId = null;
    const target = window.scrollY;
    sy += (target - sy) * (reduce ? 1 : 0.1);
    if (Math.abs(target - sy) < 0.05) sy = target;
    update();
    if (sy !== target) rafId = requestAnimationFrame(frame);
  }
  function request() { if (!rafId) rafId = requestAnimationFrame(frame); }

  /* ------------------------------------------------------------------ */
  /* 3. Reveal, tema, header, menu                                      */
  /* ------------------------------------------------------------------ */
  let revealIO = null;
  const seen = new WeakSet();

  function splitWords(el) {
    const txt = el.textContent.trim();
    el.setAttribute('aria-label', txt);
    el.innerHTML = txt.split(/\s+/).map((w, i) => `<span class="w" aria-hidden="true"><span class="wi" style="--i:${i}">${esc(w)}</span></span>`).join(' ');
    el.dataset.done = '1';
  }

  function observeReveals() {
    if (!revealIO) {
      revealIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
        });
      }, { threshold: 0.01, rootMargin: '0px 0px -2% 0px' });
    }
    $$('[data-split]:not([data-done])').forEach(splitWords);
    $$('[data-split], .media, .row, .rise').forEach((el) => {
      if (el.closest('.hero') || seen.has(el) || el.classList.contains('in')) return;
      seen.add(el);
      revealIO.observe(el);
    });
  }

  function initTheme() {
    const label = $('#hdLabel');
    const menuLinks = $$('#menuList a');
    let current = '';
    const setLabel = (t) => {
      if (label.textContent === t) return;
      label.classList.add('out');
      setTimeout(() => { label.textContent = t; label.classList.remove('out'); }, 220);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        document.body.dataset.bg = el.dataset.bg || 'light';
        if (el.id !== current) {
          current = el.id;
          setLabel(el.dataset.label || '');
          menuLinks.forEach((a) => a.setAttribute('aria-current', a.dataset.id === current ? 'true' : 'false'));
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });
    $$('[data-bg]').forEach((el) => { if (el.tagName === 'SECTION') io.observe(el); });
  }

  function initHeader() {
    const header = $('#header');
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (document.body.classList.contains('menu-open')) { lastY = y; return; }
      if (y > lastY + 6 && y > 140) header.classList.add('is-hidden');
      else if (y < lastY - 6 || y < 140) header.classList.remove('is-hidden');
      lastY = y;
      request();
      observeReveals();
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
  }

  function goTo(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }

  /* ------------------------------------------------------------------ */
  /* 4. Viewer, preview hover, filter                                   */
  /* ------------------------------------------------------------------ */
  const viewer = $('#viewer');
  const vImg = $('#viewerImg');
  const V = { kind: 'project', list: D.projects, i: 0, opener: null };

  function renderViewer() {
    const it = V.list[V.i];
    const isProject = V.kind === 'project';
    vImg.classList.remove('ready');
    vImg.onload = vImg.onerror = () => vImg.classList.add('ready');
    vImg.src = asset(it.image);
    vImg.alt = isProject ? it.name : `${it.title}, ${it.org}`;
    vImg.style.objectFit = (isProject && it.fit) || 'contain';
    if (vImg.complete && vImg.naturalWidth) vImg.classList.add('ready');

    $('#viewerInfo').innerHTML = isProject
      ? `<p class="v-kind">${esc(it.area)}</p>
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
    $('#viewerCount').textContent = `${V.i + 1} / ${V.list.length}`;
    $('#viewerInfo').scrollTop = 0;
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
    setTimeout(() => $('#viewerClose').focus(), 60);
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
    const host = $('#indexList');
    const hint = $('.index-hint');
    let x = 0, y = 0, cx = 0, cy = 0, rot = 0, on = false, raf = null, currentId = '';
    let hintHidden = false;

    function loop() {
      cx = lerp(cx, x, 0.14);
      cy = lerp(cy, y, 0.14);
      rot = lerp(rot, clamp((x - cx) * 0.05, -8, 8), 0.2);
      peek.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0) translate(-50%,-50%) rotate(${rot.toFixed(2)}deg)`;
      raf = on || Math.abs(x - cx) > 0.5 || Math.abs(y - cy) > 0.5 ? requestAnimationFrame(loop) : null;
    }

    host.addEventListener('mouseover', (e) => {
      const btn = e.target.closest('.row-btn');
      if (!btn) return;
      if (!on) { cx = x; cy = y; }
      on = true;
      if (btn.dataset.id !== currentId) {
        currentId = btn.dataset.id;
        const p = D.projects.find((q) => q.id === currentId);
        if (p) { pimg.src = asset(p.image); pimg.style.objectFit = p.fit || 'cover'; }
      }
      peek.classList.add('on');
      // Sembunyikan hint permanen setelah pertama kali hover
      if (hint && !hintHidden) {
        hintHidden = true;
        hint.style.transition = 'opacity 0.5s, transform 0.5s';
        hint.style.opacity = '0';
        hint.style.transform = 'translateY(-6px)';
        setTimeout(() => { if (hint) hint.style.display = 'none'; }, 500);
      }
      if (!raf) loop();
    });
    host.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; if (!raf && on) loop(); });
    host.addEventListener('mouseleave', () => { on = false; peek.classList.remove('on'); });
  }

  /* ------------------------------------------------------------------ */
  /* Event                                                              */
  /* ------------------------------------------------------------------ */
  function bindUI() {
    document.addEventListener('click', (e) => {
      const nav = e.target.closest('[data-nav]');
      if (nav) {
        const id = (nav.getAttribute('href') || '').replace('#', '');
        if (id) {
          e.preventDefault();
          const wasOpen = menu.classList.contains('open');
          if (wasOpen) setMenu(false);
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

  /* ------------------------------------------------------------------ */
  /* 5. Pembuka dan init                                                */
  /* ------------------------------------------------------------------ */
  function runLoader() {
    const loader = $('#loader');
    const num = $('#loaderNum');
    let finished = false;

    function ready() {
      document.documentElement.classList.remove('is-loading');
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-ready');
    }
    function done() {
      if (finished) return;
      finished = true;
      if (num) num.textContent = '100';
      if (loader) {
        loader.classList.add('done');
        setTimeout(() => loader.remove(), 1200);
      }
      setTimeout(ready, loader ? 350 : 0);
    }

    if (!loader || reduce) { if (loader) loader.remove(); finished = true; ready(); return; }

    const t0 = performance.now();
    const dur = 1100;
    (function step(now) {
      if (finished) return;
      const t = clamp((now - t0) / dur, 0, 1);
      num.textContent = Math.round((1 - Math.pow(1 - t, 3)) * 100);
      if (t < 1) requestAnimationFrame(step); else done();
    })(t0);
    setTimeout(done, 4000);
  }

  function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

  function init() {
    if (window.history && 'scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

    renderHero();
    renderAbout();
    renderOrgs();
    renderProjects();
    renderSkills();
    buildCerts(true);
    renderPortal();
    renderContact();
    renderMenu();

    bindUI();
    initTheme();
    initHeader();
    initPeek();

    engineReady = true;
    collect();
    observeReveals();
    sy = window.scrollY;
    request();

    const remeasure = debounce(() => { buildCerts(false); measure(); }, 150);
    window.addEventListener('resize', remeasure);
    window.addEventListener('load', () => { measure(); observeReveals(); });
    document.addEventListener('load', (e) => { if (e.target && e.target.tagName === 'IMG') remeasure(); }, true);
    if ('ResizeObserver' in window) new ResizeObserver(debounce(measure, 120)).observe($('#main'));

    // Safety fallback: force-reveal semua elemen yang belum tampil setelah 2.5 detik
    // (mencegah gambar terjebak tersembunyi jika IntersectionObserver terlambat)
    setTimeout(() => {
      $$('.media:not(.in), .row:not(.in), .rise:not(.in)').forEach((el) => {
        if (!el.closest('.hero') && !el.closest('.viewer') && !el.closest('.menu')) {
          el.classList.add('in');
        }
      });
    }, 2500);

    runLoader();
  }

  document.addEventListener('DOMContentLoaded', init);
})();