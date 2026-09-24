/* ==========================================================================
   PORTFOLIO ENGINE & INTERACTIVE LOGIC (js/main.js)
   Renders all dynamic sections from portfolioData (js/data.js):
   - Hero, Profile & Contact for Afra Fadhma Dinata (NRP: 2058261004)
   - Education Credentials (ITS & SMAN 2 Pasuruan)
   - Organizations & Leadership Timeline
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

// Builds technical media frames with engineering HUD labels, scanner sweep, and zoom inspection trigger
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
  const contactRows = [
    {
      key: 'WHATSAPP',
      sub: 'Direct Message & Fast Communication',
      val: ct.whatsapp,
      href: ct.whatsappUrl,
      action: 'CHAT NOW',
      color: '#25D366',
      icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29z"/></svg>`
    },
    {
      key: 'GITHUB',
      sub: 'Open-Source Repositories & Engineering Labs',
      val: 'github.com/Afra4509',
      href: ct.github,
      action: 'EXPLORE REPOS',
      color: '#e6edf3',
      icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>`
    },
    {
      key: 'LINKEDIN',
      sub: 'Professional Career Network & Connections',
      val: 'Afra Fadhma Dinata',
      href: ct.linkedin,
      action: 'CONNECT',
      color: '#0a66c2',
      icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`
    },
    {
      key: 'MAIN PORTFOLIO',
      sub: 'Software Engineering, Web Apps & Main Hub',
      val: 'aefera.me',
      href: ct.portfolio,
      action: 'VISIT HUB',
      color: '#ff5a1f',
      icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`
    },
    {
      key: 'INSTAGRAM',
      sub: 'Creative Log, Event Photography & Updates',
      val: '@afrafdhma',
      href: ct.instagram,
      action: 'FOLLOW',
      color: '#E1306C',
      icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`
    }
  ];
  $('contactList').innerHTML = contactRows.map(r => `
    <a class="contact-card reveal" href="${r.href}" target="_blank" rel="noopener" style="--brand-color: ${r.color};">
      <div class="cc-left">
        <div class="cc-icon-box" aria-hidden="true">${r.icon}</div>
        <div class="cc-info">
          <div class="cc-val">${r.val}</div>
          <div class="cc-meta">
            <span class="cc-k">${r.key}</span>
            <span class="cc-sep">&bull;</span>
            <span class="cc-sub">${r.sub}</span>
          </div>
        </div>
      </div>
      <div class="cc-right">
        <span class="cc-action">${r.action}</span>
        <span class="cc-arrow">&nearr;</span>
      </div>
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
   03 — ORGANIZATIONS & LEADERSHIP TIMELINE
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
    </div>
  `;
}

/* --------------------------------------------------------------------------
   08 — TECHNICAL SKILLS (SPEC SHEET)
   Renders balanced technical domains with authentic SVG logos
   -------------------------------------------------------------------------- */
function getSkillSvg(name){
  const n = (name || '').toLowerCase();

  // Python
  if(n.includes('python')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#387EB8" d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3l.01 1.4h2.9v.4H6.2S4 4.8 4 8c0 3.2 1.9 3.1 1.9 3.1h1.1v-1.6s-.1-1.9 1.9-1.9h3.3s1.8.03 1.8-1.8V4s.2-2-2.1-2zm-1.7 1.1c.3 0 .6.3.6.6s-.3.6-.6.6-.6-.3-.6-.6.3-.6.6-.6z"/><path fill="#FFE052" d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3l-.01-1.4h-2.9v-.4h5.7s2.2.3 2.2-2.9c0-3.2-1.9-3.1-1.9-3.1h-1.1v1.6s.1 1.9-1.9 1.9H11.8s-1.8-.03-1.8 1.8v1.8s-.2 2 2.1 2zm1.7-1.1c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.3.6.6-.3.6-.6.6z"/></svg>`;
  }
  // C++
  if(n.includes('c++')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#00599C" d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2z"/><path fill="#fff" d="M9.8 14.8c-.8 0-1.5-.3-2-.8-.5-.5-.8-1.2-.8-2s.3-1.5.8-2c.5-.5 1.2-.8 2-.8.6 0 1.2.2 1.6.6l-.6.7c-.3-.3-.7-.5-1-.5-.5 0-.9.2-1.2.5-.3.4-.5.8-.5 1.5 0 .6.2 1.1.5 1.5.3.3.7.5 1.2.5.4 0 .8-.2 1.1-.5l.6.7c-.5.4-1 .6-1.7.6zm3.5-2.3h-1.4v-.8h1.4v-1.4h.8v1.4h1.4v.8h-1.4v1.4h-.8v-1.4zm4 0h-1.4v-.8h1.4v-1.4h.8v1.4h1.4v.8h-1.4v1.4h-.8v-1.4z"/></svg>`;
  }
  // JavaScript
  if(n.includes('javascript') || n === 'js') {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><rect width="24" height="24" rx="3" fill="#F7DF1E"/><path fill="#000" d="M12.5 17.5c0 1.3-.8 2-2 2-1.3 0-1.9-.8-2.3-1.5l1.3-.8c.2.4.5.8 1 .8.4 0 .7-.2.7-.6v-6.2h1.3v6.3zm6.6-.4c-.4.8-1.2 1.4-2.4 1.4-1.6 0-2.6-1.1-2.6-2.6 0-1.8 1.1-2.6 2.7-2.6.4 0 .8.1 1.1.2v-.4c0-.6-.4-1-1.2-1-.6 0-1.1.3-1.3.7l-1.1-.7c.5-.9 1.4-1.3 2.5-1.3 1.6 0 2.4.9 2.4 2.3v4zm-1.3-1.8c-.3-.1-.6-.2-1-.2-.8 0-1.3.4-1.3 1.2 0 .7.5 1.2 1.3 1.2.6 0 1-.3 1-.7v-1.5z"/></svg>`;
  }
  // HTML
  if(n.includes('html')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#E34F26" d="M3 2l1.6 18.5L12 23l7.4-2.5L21 2H3z"/><path fill="#EF652A" d="M12 3.8v17.4l6-2 1.3-15.4H12z"/><path fill="#EDEAEA" d="M12 8.4H7.5l.3 3.4h4.2V8.4zm0 6.6H7.9l.2 2 3.9 1.1v-3.1z"/><path fill="#fff" d="M12 8.4v3.4h4.1l-.4 4.3-3.7 1v3.2l6-2 .9-9.9H12z"/></svg>`;
  }
  // CSS
  if(n.includes('css')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#1572B6" d="M3 2l1.6 18.5L12 23l7.4-2.5L21 2H3z"/><path fill="#33A9DC" d="M12 3.8v17.4l6-2 1.3-15.4H12z"/><path fill="#EDEAEA" d="M12 8.4H7.5l.3 3.4h4.2V8.4zm0 6.6H7.9l.2 2 3.9 1.1v-3.1z"/><path fill="#fff" d="M12 8.4v3.4h4.1l-.4 4.3-3.7 1v3.2l6-2 .9-9.9H12z"/></svg>`;
  }
  // MATLAB
  if(n.includes('matlab')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#E16726" d="M3 17.5c2.5-3 5-1 7.5-6.5C12 7 13.5 3 15 3c1.2 0 1.8 7 3.5 10 1.2 2.2 3.5 3 4.5 3-1 2-4 3.5-7 2.5-2.5-.8-3.5-3-5.5-3-1.8 0-3 1.5-4.5 2-1 .3-2 0-3-1z"/></svg>`;
  }
  // ESP32 & STM32
  if(n.includes('esp32') || n.includes('stm32')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><rect x="4" y="4" width="16" height="16" rx="2" fill="#1c1a17" stroke="#FF5A1F" stroke-width="1.5"/><circle cx="7.5" cy="7.5" r="1" fill="#FF5A1F"/><path d="M4 8H1M4 12H1M4 16H1M20 8h3M20 12h3M20 16h3M8 4V1M12 4V1M16 4V1M8 20v3M12 20v3M16 20v3" stroke="#FF5A1F" stroke-width="1.3"/><rect x="8" y="8" width="8" height="8" rx="1" fill="#2d1c13" stroke="#ff7a3d" stroke-width="1"/></svg>`;
  }
  // Arduino
  if(n.includes('arduino')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#00979D" d="M7 7a5 5 0 0 0-5 5 5 5 0 0 0 5 5c2.3 0 4.2-1.5 4.8-3.6.2-.8.2-1.7 0-2.5A5.02 5.02 0 0 0 7 7zm10 0a5.02 5.02 0 0 0-4.8 3.9c-.2.8-.2 1.7 0 2.5A5.02 5.02 0 0 0 17 17a5 5 0 0 0 5-5 5 5 0 0 0-5-5zM5 11h4v2H5v-2zm11 0h1V9h2v2h1v2h-1v2h-2v-2h-1v-2z"/></svg>`;
  }
  // KiCad
  if(n.includes('kicad')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><rect width="24" height="24" rx="4" fill="#314CB0"/><path fill="#fff" d="M6 6h2.2v5.2L12 6h2.8l-4.5 5.8L15 18h-2.8l-3.2-5.4V18H6V6zm9.8 4.2c0-2.3 1.8-4.2 4.2-4.2s4.2 1.8 4.2 4.2-1.8 4.2-4.2 4.2-4.2-1.9-4.2-4.2zm6.2 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"/></svg>`;
  }
  // NRF24L01
  if(n.includes('nrf24')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="none" stroke="#FF5A1F" stroke-width="1.6" stroke-linecap="round" d="M12 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4.9-5a7 7 0 0 0 0 6m9.8-6a7 7 0 0 1 0 6M4.2 7.1a11 11 0 0 0 0 9.8m15.6-9.8a11 11 0 0 1 0 9.8M12 15v6"/></svg>`;
  }
  // MPU6050 / IMU
  if(n.includes('mpu6050') || n.includes('imu')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="9" fill="none" stroke="#29B6F6" stroke-width="1.5"/><path d="M12 3v18M3 12h18" stroke="#29B6F6" stroke-width="1.2" stroke-dasharray="2 2"/><circle cx="12" cy="12" r="3" fill="#0288D1"/><path d="M16 8l3-3m-3 0h3v3" stroke="#29B6F6" stroke-width="1.4" fill="none"/></svg>`;
  }
  // PIR & Ultrasonic
  if(n.includes('pir') || n.includes('ultrasonic')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="none" stroke="#66BB6A" stroke-width="1.5" d="M4 12a8 8 0 0 1 16 0M7 12a5 5 0 0 1 10 0M10 12a2 2 0 0 1 4 0"/><circle cx="12" cy="16" r="2" fill="#66BB6A"/><path d="M12 18v4" stroke="#66BB6A" stroke-width="1.5"/></svg>`;
  }
  // pH, TDS, Turbidity
  if(n.includes('ph') || n.includes('tds') || n.includes('turbidity')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#26C6DA" d="M12 2.7S6 9.5 6 14.5a6 6 0 0 0 12 0C18 9.5 12 2.7 12 2.7zm-2 13.8a3 3 0 0 1-2.8-3 .8.8 0 0 1 1.6 0 1.4 1.4 0 0 0 1.4 1.4.8.8 0 0 1 0 1.6z"/><path d="M10 8h4M9 11h6" stroke="#004D40" stroke-width="1.2"/></svg>`;
  }
  // OLED & Serial
  if(n.includes('oled') || n.includes('serial')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><rect x="3" y="4" width="18" height="13" rx="2" fill="#141311" stroke="#FFA726" stroke-width="1.5"/><path d="M6 8h7M6 11h10M6 14h5" stroke="#FFA726" stroke-width="1.2" stroke-linecap="round"/><path d="M9 19h6M12 17v4" stroke="#FFA726" stroke-width="1.3"/></svg>`;
  }
  // NumPy
  if(n.includes('numpy')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#4DABCF" d="M12 2L4 6.5v9L12 20l8-4.5v-9L12 2zm0 2.2l5.8 3.3L12 10.8 6.2 7.5 12 4.2zM5.5 8.7l5.7 3.3v6.5l-5.7-3.2V8.7zm7.3 9.8v-6.5l5.7-3.3v6.6l-5.7 3.2z"/></svg>`;
  }
  // Matplotlib
  if(n.includes('matplotlib')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#11557C" d="M3 3v18h18v-2H5V3H3z"/><path fill="none" stroke="#FF5A1F" stroke-width="1.8" stroke-linecap="round" d="M6 16l4-7 4 5 5-9"/><circle cx="10" cy="9" r="1.8" fill="#FFE052"/><circle cx="14" cy="14" r="1.8" fill="#FFE052"/><circle cx="19" cy="5" r="1.8" fill="#FFE052"/></svg>`;
  }
  // pyqtgraph
  if(n.includes('pyqtgraph')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><rect x="2" y="3" width="20" height="18" rx="2" fill="#0C1B23" stroke="#26A69A" stroke-width="1.4"/><path fill="none" stroke="#26A69A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M4 12h3l2-6 3 12 3-8 2 4h3"/></svg>`;
  }
  // Machine Learning
  if(n.includes('machine learning')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="5" cy="6" r="2.5" fill="#AB47BC"/><circle cx="5" cy="18" r="2.5" fill="#AB47BC"/><circle cx="12" cy="12" r="2.5" fill="#AB47BC"/><circle cx="19" cy="6" r="2.5" fill="#AB47BC"/><circle cx="19" cy="18" r="2.5" fill="#AB47BC"/><path d="M7 7l3.5 3.5m0 3L7 17M14 10.5L17 7m-3 6.5l3 3.5M7 6h10M7 18h10" stroke="#AB47BC" stroke-width="1.2" opacity=".6"/></svg>`;
  }
  // JSON Data Pipelines
  if(n.includes('json')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#FFA726" d="M8 4c-1.1 0-2 .9-2 2v2c0 1.1-.9 2-2 2 1.1 0 2 .9 2 2v2c0 1.1.9 2 2 2h1v-2H8v-3c0-1.1-.9-2-2-2 1.1 0 2-.9 2-2V6h1V4H8zm8 0c1.1 0 2 .9 2 2v2c0 1.1.9 2 2 2-1.1 0-2 .9-2 2v2c0 1.1-.9 2-2 2h-1v-2h1v-3c0-1.1.9-2 2-2-1.1 0-2-.9-2-2V6h-1V4h1z"/><circle cx="12" cy="12" r="1.5" fill="#FFA726"/></svg>`;
  }
  // WiFi Protocols
  if(n.includes('wifi')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#42A5F5" d="M12 18a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm0-6c3.2 0 6.2 1.3 8.3 3.4l-2.1 2.1a9 9 0 0 0-12.4 0L3.7 15.4A11.9 11.9 0 0 1 12 12zm0-6c5 0 9.7 2 13 5.4l-2.1 2.2a15.4 15.4 0 0 0-21.8 0L-1 11.4A18.4 18.4 0 0 1 12 6z"/></svg>`;
  }
  // RF Principles
  if(n.includes('rf') || n.includes('principles')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="none" stroke="#FF7043" stroke-width="1.8" stroke-linecap="round" d="M2 12c2.5-7 5-7 7.5 0s5 7 7.5 0 5-7 7.5 0"/><line x1="2" y1="12" x2="22" y2="12" stroke="#6f6a61" stroke-width="1" stroke-dasharray="2 2"/></svg>`;
  }
  // Wireless Interference
  if(n.includes('interference')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="9" fill="none" stroke="#EF5350" stroke-width="1.4"/><path d="M12 7l1.5 3.5 3.5 1-2.8 2.3.8 3.7-3-2-3 2 .8-3.7-2.8-2.3 3.5-1L12 7z" fill="#EF5350" opacity=".7"/><path d="M4 4l16 16" stroke="#EF5350" stroke-width="1.5"/></svg>`;
  }
  // Deauthentication
  if(n.includes('deauth')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#E57373" d="M18 8h-1V6c0-2.8-2.2-5-5-5S7 3.2 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.7 1.3-3 3-3s3 1.3 3 3v2H9V6zm3 10c-.8 0-1.5-.7-1.5-1.5S11.2 13 12 13s1.5.7 1.5 1.5S12.8 16 12 16z"/><line x1="3" y1="3" x2="21" y2="21" stroke="#FF1744" stroke-width="2"/></svg>`;
  }
  // Evil Twin
  if(n.includes('evil twin')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#D32F2F" d="M12 2L4 5v6.1c0 5 3.4 9.8 8 10.9 4.6-1.1 8-5.9 8-10.9V5l-8-3zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`;
  }
  // OS Modification
  if(n.includes('os modification')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#FFB74D" d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54A.48.48 0 0 0 14 2h-4a.48.48 0 0 0-.49.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.63 8.47a.49.49 0 0 0 .12.61l2.03 1.58c-.05.3-.07.63-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.26.41.49.41h4c.24 0 .44-.17.49-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`;
  }
  // System Installation
  if(n.includes('installation')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#81C784" d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-7 13l-4-4h2.5V9h3v4H16l-4 4zm6 2H6v-2h12v2z"/></svg>`;
  }
  // Shell CLI
  if(n.includes('cli') || n.includes('shell')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><rect x="2" y="3" width="20" height="18" rx="2" fill="#141311" stroke="#4CAF50" stroke-width="1.5"/><path d="M6 8l4 4-4 4M12 16h6" stroke="#4CAF50" stroke-width="1.8" stroke-linecap="round"/></svg>`;
  }
  // Tkinter
  if(n.includes('tkinter')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><rect x="3" y="3" width="18" height="18" rx="2" fill="#0E1726" stroke="#00B0FF" stroke-width="1.5"/><path d="M3 7h18M7 5.2h.01M9.5 5.2h.01M12 5.2h.01" stroke="#00B0FF" stroke-width="1.5"/><rect x="6" y="10" width="12" height="4" rx="1" fill="#00B0FF" opacity=".3"/></svg>`;
  }
  // PyQt5
  if(n.includes('pyqt')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><rect width="24" height="24" rx="3" fill="#41CD52"/><text x="3" y="17" fill="#fff" font-family="'Inter', sans-serif" font-weight="800" font-size="13">Qt5</text></svg>`;
  }
  // QR Code / Barcode
  if(n.includes('qr') || n.includes('barcode')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><rect x="3" y="3" width="7" height="7" fill="none" stroke="#ECE7DC" stroke-width="1.5"/><rect x="5" y="5" width="3" height="3" fill="#ECE7DC"/><rect x="14" y="3" width="7" height="7" fill="none" stroke="#ECE7DC" stroke-width="1.5"/><rect x="16" y="5" width="3" height="3" fill="#ECE7DC"/><rect x="3" y="14" width="7" height="7" fill="none" stroke="#ECE7DC" stroke-width="1.5"/><rect x="5" y="16" width="3" height="3" fill="#ECE7DC"/><path d="M14 14h3v3h-3zm4 0h3v3h-3zm-4 4h3v3h-3zm4 0h3v3h-3z" fill="#ECE7DC"/></svg>`;
  }
  // Git
  if(n.includes('git ') || n.includes('git version')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#F05032" d="M21.7 10.7l-8.4-8.4a2 2 0 0 0-2.8 0L8.6 4.2l3.4 3.4a2.4 2.4 0 0 1 3.1 3.1l3.3 3.3a2.4 2.4 0 1 1-1.4 1.4L15.3 12a2.4 2.4 0 0 1-2.3-1.6L9.6 7 2.3 14.3a2 2 0 0 0 0 2.8l8.4 8.4a2 2 0 0 0 2.8 0l8.2-8.2a2 2 0 0 0 0-2.8v-.2z"/></svg>`;
  }
  // GitHub
  if(n.includes('github')) {
    return `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#ECE7DC" fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`;
  }

  // Fallback icon
  return `<svg viewBox="0 0 24 24" width="18" height="18"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" fill="none" stroke="#FF5A1F" stroke-width="1.5"/><circle cx="12" cy="12" r="2.5" fill="#FF5A1F"/></svg>`;
}

function renderSkills(){
  const cats = Object.entries(portfolioData.skills);
  const html = cats.map(([cat, list], idx) => `
    <div class="spec-col reveal">
      <div class="sc-head">
        <div class="sc-head-title">DOMAIN // ${pad2(idx + 1)} &bull; ${cat}</div>
        <span class="sc-head-badge">${pad2(list.length)} SPECS</span>
      </div>
      <ul>
        ${list.map(s => `
          <li>
            <div class="skill-badge">
              <div class="sb-icon">${getSkillSvg(s)}</div>
              <span class="sb-name">${s}</span>
            </div>
          </li>
        `).join('')}
      </ul>
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
