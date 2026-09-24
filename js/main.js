/* ==========================================================================
   PORTFOLIO ENGINE & INTERACTIVE LOGIC (js/main.js)
   Renders all dynamic sections from portfolioData (js/data.js):
   - Hero, Profile & Contact for Afra Fadhma Dinata (NRP: 2058261004)
   - Education Credentials (ITS & SMAN 2 Pasuruan)
   - Organizations Motorsport Timeline
   - Selected Projects Flagships
   - IoT & Embedded Projects Catalog
   - PCB & Electronics Projects Catalog
   - Technical Skills Spec Sheet (7 Categories)
   - Achievements & Dev Log
   - Lightbox High-Resolution Telemetry Inspector
   ========================================================================== */

// Helper selector shortcuts
function $(id){ return document.getElementById(id); }
function setText(id, val){ const el = $(id); if(el) el.textContent = val; }
function pad2(n){ return String(n).padStart(2,'0'); }

// Safely encodes relative asset paths with spaces or special characters
function getAssetUrl(path){
  if(!path) return '';
  if(path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path;
  return encodeURI(path);
}

// Sanitizes and formats external URLs
function urlFor(v){
  if(!v || v.startsWith('[')) return '#';
  return v.startsWith('http') ? v : `https://${v}`;
}

// Builds technical media frames with motorsport HUD labels, scanner sweep, and zoom inspection trigger
function mediaFrame({ image, label, tag, hudTag, extraClass, zoomTitle }){
  const src = getAssetUrl(image);
  const zoomAttr = src ? `data-zoom-src="${src}" data-zoom-title="${zoomTitle || label}"` : '';
  return `
    <div class="media-frame tilt ${extraClass||''}" ${zoomAttr}>
      <img src="${src}" alt="${label}" loading="lazy" />
      <span class="mf-c1"></span><span class="mf-c2"></span>
      <span class="mf-overlay"></span>
      <span class="mf-scanline"></span>
      ${hudTag ? `<span class="mf-hud-top">${hudTag}</span>` : ''}
      <span class="mf-tag">${tag}</span>
      <div class="mf-zoom-hint"><span class="mf-zoom-badge">INSPECT [+]</span></div>
    </div>`;
}

/* --------------------------------------------------------------------------
   01 — FIXED FIELDS (Hero, Profile, Topbar, Contact, Footer)
   -------------------------------------------------------------------------- */
function renderFixedFields(){
  const p = portfolioData.profile;
  setText('topIdTag', p.name.toUpperCase());
  setText('topYear', p.year);
  setText('loaderName', p.name.toUpperCase());
  setText('heroName', p.name.toUpperCase());
  setText('heroField', p.field);
  setText('heroRole', p.role);
  setText('metaLocation', p.location.toUpperCase());
  setText('metaField', p.fieldShort);
  setText('metaStatus', p.status);
  setText('metaYear', p.year);
  document.title = `${p.name} — Engineering & Robotics Portfolio`;

  // Hero visual using real flagship hardware
  const heroMedia = $('heroMedia');
  if(heroMedia){
    heroMedia.innerHTML = mediaFrame({
      image: p.heroImage,
      label: p.heroTag,
      tag: p.heroTag,
      hudTag: p.heroHud || "HARDWARE TELEMETRY",
      zoomTitle: "HERO CORE HARDWARE"
    });
  }

  setText('profileIntro', p.intro);
  
  // Render exact 3 profile paragraphs
  const descEl = $('profileDesc');
  if(descEl){
    if(p.paragraphs && p.paragraphs.length){
      descEl.innerHTML = `
        <p class="p-lead">${p.paragraphs[0]}</p>
        <p>${p.paragraphs[1]}</p>
        <p>${p.paragraphs[2]}</p>
      `;
    } else {
      descEl.textContent = p.description;
    }
  }

  setText('profileInstitution', p.institution);
  setText('profileDepartment', p.department);
  setText('profileProgram', p.title);
  setText('profileNrp', p.nrp);
  setText('profileStatus2', p.status);
  setText('profileLocation', p.location);

  $('profileInterests').innerHTML = p.interests.map(i => `<li>${i}</li>`).join('');

  setText('educationIntro', portfolioData.sectionIntros.education);
  setText('orgsIntro', portfolioData.sectionIntros.organizations);
  setText('projectsIntro', portfolioData.sectionIntros.projects);
  setText('iotIntro', portfolioData.sectionIntros.iot);
  setText('pcbIntro', portfolioData.sectionIntros.pcb);
  setText('portalIntro', portfolioData.sectionIntros.portal);
  setText('achievementsIntro', portfolioData.sectionIntros.achievements);

  const c = portfolioData.currentBuild;
  $('logGrid').innerHTML = [
    ['CURRENTLY LEARNING', c.learning],
    ['CURRENT PROJECT', c.project],
    ['CURRENT INTEREST', c.interest],
    ['NEXT TARGET', c.next]
  ].map(([label, text]) => `
    <div class="log-cell">
      <div class="log-head"><span class="log-dot"></span><span class="log-label">${label}</span></div>
      <p class="log-text">${text}</p>
    </div>`).join('');

  const ct = portfolioData.contact;
  setText('footerCopy', `© ${p.year} ${p.name.toUpperCase()}`);
  const rows = [
    ['WHATSAPP', ct.whatsapp, ct.whatsappUrl],
    ['GITHUB', 'github.com/Afra4509', ct.github],
    ['LINKEDIN', 'Afra Fadhma Dinata', ct.linkedin],
    ['MAIN PORTFOLIO (SOFTWARE & WEB)', 'aefera.me', ct.portfolio],
    ['INSTAGRAM', '@afrafdhma', ct.instagram]
  ];
  $('contactList').innerHTML = rows.map(([k,v,href]) => `
    <a class="contact-row reveal" href="${href}" target="_blank" rel="noopener">
      <span>${v}<span class="cr-k" style="display:block;margin-top:4px;">${k}</span></span>
      <span class="cr-arrow">→</span>
    </a>`).join('');
}

/* --------------------------------------------------------------------------
   02 — EDUCATION
   -------------------------------------------------------------------------- */
function renderEducation(){
  const html = portfolioData.education.map(item => `
    <div class="edu-card reveal">
      <div class="edu-logo-frame">
        <img src="${getAssetUrl(item.image)}" alt="${item.institution} logo" loading="lazy" />
      </div>
      <div>
        <div class="edu-tag">${item.tag}</div>
        <h3 class="edu-inst">${item.institution}</h3>
        <div class="edu-degree">${item.degree} &bull; <span style="color:var(--paper);">${item.department}</span></div>
        <div class="edu-specs">
          <div><div class="ek">STATUS</div><div class="ev">${item.status}</div></div>
          <div><div class="ek">LOCATION</div><div class="ev">${item.location}</div></div>
          <div><div class="ek">PERIOD</div><div class="ev">${item.year}</div></div>
          <div><div class="ek">TELEMETRY</div><div class="ev">${item.hud}</div></div>
        </div>
        <p class="edu-desc">${item.description}</p>
      </div>
    </div>`).join('');
  $('educationList').innerHTML = html;
}

/* --------------------------------------------------------------------------
   03 — ORGANIZATIONS (MOTORSPORT PADDOCK TIMELINE)
   -------------------------------------------------------------------------- */
function renderOrganizations(){
  const html = portfolioData.organizations.map(org => {
    const markHtml = org.image
      ? `<div class="tl-mark"><img src="${getAssetUrl(org.image)}" alt="${org.name} emblem" loading="lazy" /></div>`
      : `<div class="tl-mark tl-mark-monogram">
           <span class="tmm-code">GO//SB</span>
           <span class="tmm-label">STUDY BUDDY</span>
         </div>`;

    const bulletsHtml = org.bullets && org.bullets.length
      ? `<ul class="tl-bullets">
          ${org.bullets.map(b => `<li><span class="tl-bullet-caret">&bull;</span><span>${b}</span></li>`).join('')}
        </ul>`
      : '';

    return `
    <div class="tl-item reveal">
      <div class="tl-top">
        <span class="tl-year">${org.year}</span>
        <h3 class="tl-org">${org.name}</h3>
      </div>
      <div class="tl-role">${org.position} &bull; <span style="color:var(--accent);">${org.tag}</span></div>
      <div class="tl-body">
        <div class="tl-desc">
          <p class="tl-lead">${org.description}</p>
          ${bulletsHtml}
        </div>
        ${markHtml}
      </div>
    </div>`;
  }).join('');
  $('orgsList').innerHTML = html;
}

/* --------------------------------------------------------------------------
   04 — SELECTED PROJECTS (HERO SPREADS)
   -------------------------------------------------------------------------- */
function renderSelectedProjects(){
  const selected = portfolioData.projects.filter(p => p.selected);
  const html = selected.map((proj, i) => {
    const n = pad2(i+1);
    const flip = i % 2 === 1 ? 'flip' : '';
    return `
    <article class="project-spread ${flip}">
      <span class="project-num" aria-hidden="true">${n}</span>
      <div class="p-media reveal">
        ${mediaFrame({
          image: proj.image,
          label: proj.name,
          tag: proj.code || `PROJECT ${n}`,
          hudTag: proj.hudTag,
          zoomTitle: `${proj.name} — SCHEMATIC / BOARD VIEW`
        })}
      </div>
      <div class="p-body reveal" style="--rd:.15s">
        <div class="p-eyebrow">
          <span class="p-eyebrow-left"><span class="dot"></span>PROJECT ${n} &bull; ${proj.category}</span>
          <span class="p-category-badge">${proj.type.toUpperCase()}</span>
        </div>
        <div class="p-art-dir">${proj.artDirection}</div>
        <h3 class="p-title">${proj.name}</h3>
        <p class="p-desc">${proj.description}</p>
        <div class="p-specs">
          <div><div class="sk">ROLE</div><div class="sv">${proj.role}</div></div>
          <div><div class="sk">TECHNOLOGY</div><div class="sv">${proj.tech}</div></div>
          <div><div class="sk">YEAR</div><div class="sv">${proj.year}</div></div>
          <div><div class="sk">STATUS</div><div class="sv">${proj.status}</div></div>
        </div>
        <div class="p-action">
          <button class="inspect-btn" onclick="openLightbox('${getAssetUrl(proj.image)}', '${proj.name}', '${proj.hudTag} // ${proj.category}')">
            INSPECT SPEC &bull; ZOOM &rarr;
          </button>
        </div>
      </div>
    </article>`;
  }).join('');
  $('projectsList').innerHTML = html;
}

/* --------------------------------------------------------------------------
   REUSABLE ENGINEERING CARD GENERATOR (FOR IOT & PCB CATALOGS)
   -------------------------------------------------------------------------- */
function createEngineeringCard(proj, index, prefix){
  const numLabel = `${prefix} // ${pad2(index+1)}`;
  return `
    <article class="eng-card reveal">
      <div class="eng-card-header">
        <span class="eng-card-num">${numLabel}</span>
        <span class="eng-card-cat">${proj.category}</span>
      </div>
      <div class="eng-card-media">
        ${mediaFrame({
          image: proj.image,
          label: proj.name,
          tag: numLabel,
          hudTag: proj.hudTag,
          zoomTitle: `${proj.name} — FULL RESOLUTION VIEW`
        })}
      </div>
      <div class="eng-card-body">
        <div class="eng-card-art">${proj.artDirection}</div>
        <h3 class="eng-card-title">${proj.name}</h3>
        <p class="eng-card-desc">${proj.description}</p>
        <div class="eng-card-specs">
          <div><div class="sk">ROLE</div><div class="sv">${proj.role}</div></div>
          <div><div class="sk">TECHNOLOGY</div><div class="sv">${proj.tech}</div></div>
          <div><div class="sk">YEAR</div><div class="sv">${proj.year}</div></div>
          <div><div class="sk">STATUS</div><div class="sv">${proj.status}</div></div>
        </div>
        <div class="eng-card-action">
          <button class="inspect-btn" onclick="openLightbox('${getAssetUrl(proj.image)}', '${proj.name}', '${proj.hudTag} // ${proj.category}')">
            INSPECT COMPONENT &rarr;
          </button>
        </div>
      </div>
    </article>`;
}

/* --------------------------------------------------------------------------
   05 — IOT PROJECTS CATALOG (ALL 7 IOT ASSETS)
   -------------------------------------------------------------------------- */
function renderIotProjects(){
  const iotProjects = portfolioData.projects.filter(p => p.type === 'iot');
  const html = iotProjects.map((proj, i) => createEngineeringCard(proj, i, 'IOT')).join('');
  $('iotList').innerHTML = html;
}

/* --------------------------------------------------------------------------
   06 — PCB PROJECTS CATALOG (ALL 5 PCB ASSETS)
   -------------------------------------------------------------------------- */
function renderPcbProjects(){
  const pcbProjects = portfolioData.projects.filter(p => p.type === 'pcb');
  const html = pcbProjects.map((proj, i) => createEngineeringCard(proj, i, 'PCB')).join('');
  $('pcbList').innerHTML = html;
}

/* --------------------------------------------------------------------------
   07 — MAIN WEBSITE & OTHER WORKS PORTAL (aefera.me)
   -------------------------------------------------------------------------- */
function renderMainPortal(){
  const portal = portfolioData.mainPortal;
  const el = $('mainPortalContent');
  if(!el || !portal) return;

  const thisPointsHtml = (portal.thisSite?.points || []).map(pt => `
    <li><span class="cb-dot">&bull;</span><span>${pt}</span></li>
  `).join('');

  const mainPointsHtml = (portal.mainSite?.points || []).map(pt => `
    <li><span class="cb-arrow">&nearr;</span><span>${pt}</span></li>
  `).join('');

  el.innerHTML = `
    <div class="portal-card reveal">
      <div class="portal-header-row">
        <div>
          <div class="portal-tag">${portal.tag}</div>
          <h3 class="portal-title">${portal.title}</h3>
          <p class="portal-lead">${portal.lead}</p>
          <p class="portal-desc">${portal.description}</p>
        </div>
        <div class="portal-domain-chip">
          <span class="pd-sub">${portal.badge}</span>
          <span class="pd-domain">${portal.domain}</span>
          <div class="portal-hud-status">
            <span class="hud-live-dot"></span>
            <span>${portal.hud}</span>
          </div>
        </div>
      </div>

      <div class="portal-compare-grid">
        <!-- Box 1: This Current Website (Hardware Archive) -->
        <div class="compare-box current-box">
          <div class="cb-header">
            <span class="cb-badge current-badge">${portal.thisSite?.badge || 'WEBSITE INI'}</span>
            <h4 class="cb-title">${portal.thisSite?.title || 'Hardware Portfolio'}</h4>
          </div>
          <p class="cb-desc">${portal.thisSite?.desc || ''}</p>
          <ul class="cb-list">
            ${thisPointsHtml}
          </ul>
          <div class="cb-foot">
            <span class="cb-foot-label">SCOPE:</span>
            <span class="cb-foot-val">HARDWARE &bull; FIRMWARE &bull; PCB &bull; ROBOTICS</span>
          </div>
        </div>

        <!-- Box 2: aefera.me (Main Site Hub) -->
        <div class="compare-box main-box">
          <div class="cb-header">
            <span class="cb-badge main-badge">${portal.mainSite?.badge || 'WEBSITE UTAMA'}</span>
            <h4 class="cb-title">${portal.mainSite?.title || 'aefera.me'}</h4>
          </div>
          <p class="cb-desc">${portal.mainSite?.desc || ''}</p>
          <ul class="cb-list main-list">
            ${mainPointsHtml}
          </ul>
          <div class="cb-action">
            <a href="${portal.url}" target="_blank" rel="noopener" class="portal-cta-btn">
              <span>${portal.buttonText}</span>
              <span class="cta-arrow">&nearr;</span>
            </a>
          </div>
        </div>
      </div>

      <div class="portal-footer-notice">
        <div class="pfn-left">
          <span class="rec-dot"></span>
          <span>ROUTING ARCHITECTURE: Sub-portfolio ini didedikasikan untuk rekayasa perangkat keras; seluruh karya perangkat lunak berpusat di <strong>aefera.me</strong>.</span>
        </div>
        <a href="${portal.url}" target="_blank" rel="noopener" class="pfn-link">${portal.url} &nearr;</a>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   07 — TECHNICAL SKILLS (SPEC SHEET)
   Renders all 7 technical domains
   -------------------------------------------------------------------------- */
function renderSkills(){
  const cats = Object.entries(portfolioData.skills);
  const html = cats.map(([cat, list]) => `
    <div class="spec-col reveal">
      <div class="sc-head">${cat}</div>
      <ul>${list.map(s => `<li>${s}</li>`).join('')}</ul>
    </div>`).join('');
  $('skillsSheet').innerHTML = html;
}

/* --------------------------------------------------------------------------
   08 — ACHIEVEMENTS
   -------------------------------------------------------------------------- */
function renderAchievements(){
  const html = portfolioData.achievements.map(a => `
    <div class="stat-tile reveal">
      <div class="st-year">${a.year}</div>
      <div class="st-title">${a.title}</div>
      <div class="st-meta">
        <div class="st-event">${a.event}</div>
        <div class="st-result">${a.result}</div>
      </div>
    </div>`).join('');
  $('achievementsGrid').innerHTML = html;
}

/* --------------------------------------------------------------------------
   NAVIGATION & OBSERVERS
   -------------------------------------------------------------------------- */
const SECTIONS = [
  { id: 'hero', label: 'COVER' },
  { id: 'profile', label: 'PROFILE' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'organizations', label: 'ORGANIZATIONS' },
  { id: 'projects', label: 'SELECTED' },
  { id: 'iot', label: 'IOT PROJECTS' },
  { id: 'pcb', label: 'PCB PROJECTS' },
  { id: 'portal', label: 'AEFERA.ME' },
  { id: 'skills', label: 'SPEC SHEET' },
  { id: 'achievements', label: 'TELEMETRY' },
  { id: 'contact', label: 'CONTACT' }
];

function renderSideNav(){
  $('sideNav').innerHTML = SECTIONS.map((s,i) => `
    <a href="#${s.id}" data-id="${s.id}">
      <span class="nav-label">${pad2(i)} — ${s.label}</span>
      <span class="nav-dot"></span>
    </a>`).join('');
}

function initSectionObserver(){
  const navLinks = document.querySelectorAll('.side-nav a');
  const counter = $('frameCounter');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const idx = SECTIONS.findIndex(s => s.id === entry.target.id);
        navLinks.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.side-nav a[data-id="${entry.target.id}"]`);
        if(link) link.classList.add('active');
        if(counter && idx >= 0) counter.textContent = pad2(idx);
      }
    });
  }, { threshold: 0.35 });
  SECTIONS.forEach(s => { const el = $(s.id); if(el) obs.observe(el); });
}

function initRevealObserver(){
  const els = document.querySelectorAll('.reveal');
  els.forEach((el, i) => {
    if(!el.style.getPropertyValue('--rd')) {
      el.style.setProperty('--rd', (Math.min(i % 4, 3) * 0.08) + 's');
    }
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' });
  els.forEach(el => io.observe(el));
}

function initParallax(reduceMotion){
  if(reduceMotion) return;
  const els = document.querySelectorAll('[data-parallax]');
  if(!els.length) return;
  let ticking = false;
  function update(){
    const scrollY = window.scrollY;
    els.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.08;
      el.style.transform = `translate3d(0, ${scrollY * speed * -1}px, 0)`;
    });
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if(!ticking){ requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
}

function initTilt(reduceMotion){
  if(reduceMotion) return;
  document.querySelectorAll('.media-frame.tilt').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x*4.5}deg) rotateX(${-y*4.5}deg)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* --------------------------------------------------------------------------
   LIGHTBOX INSPECTION ENGINE
   -------------------------------------------------------------------------- */
let allProjectImages = [];
let currentLightboxIdx = 0;

function initLightbox(){
  allProjectImages = portfolioData.projects.map(p => ({
    src: getAssetUrl(p.image),
    title: p.name,
    tag: `${p.code || ''} &bull; ${p.category} &bull; ${p.hudTag}`
  }));

  const lb = $('lightbox');
  const closeBtn = $('lightboxClose');
  const prevBtn = $('lightboxPrev');
  const nextBtn = $('lightboxNext');

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', prevLightbox);
  nextBtn.addEventListener('click', nextLightbox);

  lb.addEventListener('click', (e) => {
    if(e.target === lb || e.target.classList.contains('lightbox-content')){
      closeLightbox();
    }
  });

  window.addEventListener('keydown', (e) => {
    if(!lb.classList.contains('is-open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') prevLightbox();
    if(e.key === 'ArrowRight') nextLightbox();
  });

  // Delegate click on any media frame with data-zoom-src
  document.addEventListener('click', (e) => {
    const frame = e.target.closest('.media-frame[data-zoom-src]');
    if(frame){
      const src = frame.getAttribute('data-zoom-src');
      const title = frame.getAttribute('data-zoom-title') || 'COMPONENT INSPECTION';
      openLightbox(src, title, 'TELEMETRY HARDWARE INSPECT');
    }
  });
}

function openLightbox(src, title, tag){
  const lb = $('lightbox');
  const img = $('lightboxImg');
  const tEl = $('lightboxTitle');
  const tagEl = $('lightboxTag');

  const idx = allProjectImages.findIndex(item => item.src === src);
  if(idx >= 0) currentLightboxIdx = idx;

  img.src = src;
  tEl.textContent = title || 'COMPONENT INSPECTION';
  tagEl.innerHTML = tag || 'TELEMETRY HARDWARE INSPECTION';
  lb.classList.add('is-open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  const lb = $('lightbox');
  lb.classList.remove('is-open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateLightboxIndex(idx){
  if(!allProjectImages.length) return;
  currentLightboxIdx = (idx + allProjectImages.length) % allProjectImages.length;
  const item = allProjectImages[currentLightboxIdx];
  $('lightboxImg').src = item.src;
  $('lightboxTitle').textContent = item.title;
  $('lightboxTag').innerHTML = item.tag;
}

function prevLightbox(){ updateLightboxIndex(currentLightboxIdx - 1); }
function nextLightbox(){ updateLightboxIndex(currentLightboxIdx + 1); }

function initLoader(){
  window.addEventListener('load', () => {
    setTimeout(() => document.body.classList.add('loaded'), 500);
  });
  setTimeout(() => document.body.classList.add('loaded'), 1800);
}

/* --------------------------------------------------------------------------
   SYSTEM INITIALIZATION
   -------------------------------------------------------------------------- */
function init(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  renderSideNav();
  renderFixedFields();
  renderEducation();
  renderOrganizations();
  renderSelectedProjects();
  renderIotProjects();
  renderPcbProjects();
  renderMainPortal();
  renderSkills();
  renderAchievements();

  initSectionObserver();
  initRevealObserver();
  initParallax(reduceMotion);
  initTilt(reduceMotion);
  initLightbox();
  initLoader();
}

document.addEventListener('DOMContentLoaded', init);
