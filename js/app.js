/* Shared shell logic. Everything here is a client-side mock — there is no
   real authentication or database behind this. */

const ICONS = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>`,
  tickets: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z"/></svg>`,
  reports: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19V9M11 19V4M18 19v-7"/></svg>`,
  admin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.54 1.7 1.7 0 0 0-1.87.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .33-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.54-1 1.7 1.7 0 0 0-.33-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.33H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.33 1.87V9c.14.41.42.76.79 1H21a2 2 0 1 1 0 4h-.09c-.41.14-.76.42-1 .79Z"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/></svg>`,
};

function currentUser(){
  const key = localStorage.getItem("mock_role");
  if(!key || !MOCK_USERS[key]) return null;
  return MOCK_USERS[key];
}

function requireAuth(){
  const u = currentUser();
  if(!u){ window.location.href = "index.html"; }
  return u;
}

function logout(){
  localStorage.removeItem("mock_role");
  window.location.href = "index.html";
}

function renderShell(activePage){
  const u = requireAuth();
  if(!u) return null;

  const nav = [
    { key:"dashboard", label:"ภาพรวม (Dashboard)", href:"dashboard.html", icon:ICONS.dashboard, roles:["admin","supervisor","agent"] },
    { key:"tickets",   label:"เคส & แชท", href:"tickets.html", icon:ICONS.tickets, roles:["admin","supervisor","agent"] },
    { key:"reports",   label:"รายงาน & Analytics", href:"reports.html", icon:ICONS.reports, roles:["admin","supervisor"] },
    { key:"admin",     label:"ตั้งค่าระบบ", href:"admin.html", icon:ICONS.admin, roles:["admin","supervisor"] },
  ];

  const sidebar = document.getElementById("sidebar-slot");
  if(sidebar){
    sidebar.innerHTML = `
      <div class="sidebar-brand"><span class="dot"></span> 8Baht Support Console</div>
      <div class="sidebar-nav">
        <div class="sidebar-section">เมนูหลัก</div>
        ${nav.filter(n=>n.roles.includes(u.role)).map(n=>`
          <a class="nav-item ${n.key===activePage?'active':''}" href="${n.href}">${n.icon}<span>${n.label}</span></a>
        `).join("")}
      </div>
      <div class="sidebar-foot">Concept mockup · ไม่เชื่อมต่อฐานข้อมูลจริง</div>
    `;
  }

  const topbar = document.getElementById("topbar-slot");
  if(topbar){
    topbar.innerHTML = `
      <div class="topbar-left" id="topbar-context"></div>
      <div class="topbar-right">
        <a href="new-ticket.html" class="btn btn-primary btn-sm">+ แจ้งเคสภายใน</a>
        <div class="icon-btn" title="การแจ้งเตือน">${ICONS.bell}<span class="notif-dot"></span></div>
        <div class="icon-btn" title="ออกจากระบบ" onclick="logout()">${ICONS.logout}</div>
        <div class="user-chip">
          <div class="avatar">${u.initials}</div>
          <div class="user-chip-meta">
            <div class="name">${u.name}</div>
            <div class="role">${u.roleLabel} · ${u.team}</div>
          </div>
        </div>
      </div>
    `;
  }
  return u;
}

function setTopbarContext(html){
  const el = document.getElementById("topbar-context");
  if(el) el.innerHTML = html;
}

/* ---- status vocabulary: new / in_progress / pending / cancel / closed ---- */
const STATUS_META = {
  new:         { cls:"badge-new",      label:"ใหม่" },
  in_progress: { cls:"badge-progress", label:"กำลังดำเนินการ" },
  pending:     { cls:"badge-pending",  label:"รอดำเนินการ" },
  cancel:      { cls:"badge-cancel",   label:"ยกเลิก" },
  closed:      { cls:"badge-closed",   label:"ปิดเคส" },
};

function statusBadge(status){
  const s = STATUS_META[status] || STATUS_META.new;
  return `<span class="badge ${s.cls}"><span class="badge-dot"></span>${s.label}</span>`;
}

function breachBadge(ticket){
  if(!ticket || !ticket.breach) return "";
  return `<span class="badge badge-breach"><span class="badge-dot"></span>เกิน SLA</span>`;
}

/* ---------------------------------------------------------------- modal */
function closeModal(){
  const el = document.getElementById("modalOverlay");
  if(el) el.remove();
}

/**
 * opts: { title, description, placeholder, confirmLabel, requireText, onConfirm(text) }
 */
function openReasonModal(opts){
  closeModal();
  const overlay = document.createElement("div");
  overlay.id = "modalOverlay";
  overlay.className = "modal-overlay";
  overlay.innerHTML = `
    <div class="modal-card">
      <h3>${opts.title}</h3>
      ${opts.description ? `<p class="small" style="margin-bottom:12px;">${opts.description}</p>` : ""}
      <textarea class="modal-textarea" id="modalTextarea" placeholder="${opts.placeholder || ''}"></textarea>
      <div class="modal-error" id="modalError" style="display:none;">กรุณากรอกข้อมูลก่อนยืนยัน</div>
      <div class="modal-actions">
        <button class="btn" onclick="closeModal()">ยกเลิก</button>
        <button class="btn btn-primary" id="modalConfirmBtn">${opts.confirmLabel || 'ยืนยัน'}</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener("click", (e) => { if(e.target === overlay) closeModal(); });

  document.getElementById("modalConfirmBtn").addEventListener("click", () => {
    const val = document.getElementById("modalTextarea").value.trim();
    if(opts.requireText !== false && !val){
      document.getElementById("modalError").style.display = "block";
      return;
    }
    closeModal();
    if(opts.onConfirm) opts.onConfirm(val);
  });
}

/** Simple yes/no confirmation modal, no text input required.
 * opts: { title, description, confirmLabel, danger, onConfirm } */
function openConfirmModal(opts){
  closeModal();
  const overlay = document.createElement("div");
  overlay.id = "modalOverlay";
  overlay.className = "modal-overlay";
  overlay.innerHTML = `
    <div class="modal-card">
      <h3>${opts.title}</h3>
      ${opts.description ? `<p class="small" style="margin-bottom:6px;">${opts.description}</p>` : ""}
      <div class="modal-actions">
        <button class="btn" onclick="closeModal()">ยกเลิก</button>
        <button class="btn ${opts.danger ? 'btn-danger' : 'btn-primary'}" id="modalConfirmBtn2">${opts.confirmLabel || 'ยืนยัน'}</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener("click", (e) => { if(e.target === overlay) closeModal(); });
  document.getElementById("modalConfirmBtn2").addEventListener("click", () => {
    closeModal();
    if(opts.onConfirm) opts.onConfirm();
  });
}

/** Multi-field form modal (add member / add product / etc).
 * opts: { title, description, fields:[{id,label,type:'text'|'email'|'select',options:[{value,label}],value,placeholder}],
 *         confirmLabel, note, onConfirm(values) } */
function openFormModal(opts){
  closeModal();
  const overlay = document.createElement("div");
  overlay.id = "modalOverlay";
  overlay.className = "modal-overlay";
  const fieldsHtml = opts.fields.map(f => {
    if(f.type === "select"){
      return `<div class="form-row"><label>${f.label}</label>
        <select id="ff_${f.id}">${f.options.map(o => `<option value="${o.value}" ${o.value===f.value?'selected':''}>${o.label}</option>`).join("")}</select>
      </div>`;
    }
    return `<div class="form-row"><label>${f.label}</label>
      <input id="ff_${f.id}" type="${f.type || 'text'}" value="${f.value || ''}" placeholder="${f.placeholder || ''}">
    </div>`;
  }).join("");

  overlay.innerHTML = `
    <div class="modal-card modal-card-lg">
      <h3>${opts.title}</h3>
      ${opts.description ? `<p class="small" style="margin-bottom:12px;">${opts.description}</p>` : ""}
      ${fieldsHtml}
      ${opts.note ? `<div class="modal-note">${opts.note}</div>` : ""}
      <div class="modal-actions">
        <button class="btn" onclick="closeModal()">ยกเลิก</button>
        <button class="btn btn-primary" id="modalFormConfirmBtn">${opts.confirmLabel || 'บันทึก'}</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener("click", (e) => { if(e.target === overlay) closeModal(); });

  document.getElementById("modalFormConfirmBtn").addEventListener("click", () => {
    const values = {};
    opts.fields.forEach(f => { values[f.id] = document.getElementById("ff_"+f.id).value.trim(); });
    closeModal();
    if(opts.onConfirm) opts.onConfirm(values);
  });
}

/* ---------------------------------------------------------- collapsible cards / side-blocks */
function toggleCardBody(headerEl){
  const body = headerEl.nextElementSibling;
  if(body) body.classList.toggle("collapsed");
  const chevron = headerEl.querySelector(".chevron");
  if(chevron) chevron.classList.toggle("collapsed");
}

function toggleSideBlock(headerEl){
  const block = headerEl.closest(".side-block");
  if(block) block.classList.toggle("collapsed");
  const chevron = headerEl.querySelector(".chevron");
  if(chevron) chevron.classList.toggle("collapsed");
}

/* ---------------------------------------------------------- shared year-over-year trend chart */
function renderTrendChart(containerId, rows){
  const el = document.getElementById(containerId);
  if(!el || !rows || !rows.length) return;
  const maxVal = Math.max(...rows.map(d => Math.max(d.thisYear, d.lastYear)), 1);
  const maxPx = 170;
  el.innerHTML = rows.map(d => {
    const hThis = Math.max(4, Math.round((d.thisYear / maxVal) * maxPx));
    const hLast = Math.max(4, Math.round((d.lastYear / maxVal) * maxPx));
    return `
      <div class="trend-group">
        <div class="trend-bars">
          <div class="trend-bar this-year" style="height:${hThis}px;" title="ปีนี้ (${d.m}): ${d.thisYear}"></div>
          <div class="trend-bar last-year" style="height:${hLast}px;" title="ปีก่อน (${d.m}): ${d.lastYear}"></div>
        </div>
        <div class="bar-label">${d.m}</div>
      </div>`;
  }).join("");
}

/** Wires a <select> of metric names to a trend chart container, using MOCK_TREND. */
function setupTrendSection(selectId, containerId, defaultMetric){
  const select = document.getElementById(selectId);
  if(!select) return;
  select.innerHTML = Object.keys(MOCK_TREND).map(k =>
    `<option value="${k}" ${k === defaultMetric ? "selected" : ""}>${k}</option>`
  ).join("");
  const render = () => renderTrendChart(containerId, MOCK_TREND[select.value]);
  select.addEventListener("change", render);
  render();
}

/* clicking a company/agent name elsewhere in the app jumps to the ticket list pre-filtered to it */
function filterTicketsByText(text, event){
  if(event) event.stopPropagation();
  window.location.href = "tickets.html?q=" + encodeURIComponent(text);
}
function initColumnResize(handleId, layoutEl, cssVar, minWidth, maxWidth, grow){
  const handle = document.getElementById(handleId);
  if(!handle) return;
  let dragging = false, startX = 0, startW = 0;

  handle.addEventListener("mousedown", (e) => {
    dragging = true;
    handle.classList.add("dragging");
    startX = e.clientX;
    startW = parseInt(getComputedStyle(layoutEl).getPropertyValue(cssVar)) || 300;
    document.body.style.userSelect = "none";
  });
  window.addEventListener("mousemove", (e) => {
    if(!dragging) return;
    const delta = grow === "right" ? (e.clientX - startX) : (startX - e.clientX);
    let next = startW + delta;
    next = Math.max(minWidth, Math.min(maxWidth, next));
    layoutEl.style.setProperty(cssVar, next + "px");
  });
  window.addEventListener("mouseup", () => {
    if(!dragging) return;
    dragging = false;
    handle.classList.remove("dragging");
    document.body.style.userSelect = "";
  });
}
