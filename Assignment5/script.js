// ============================================================
// SCRIPT.JS — Recombination Museum for CCS 2026
// Inspired by Bush's memex and Engelbart's augmented intelligence
// ============================================================

// --- State --------------------------------------------------
const STATE = {
  currentLens: 'chronology',
  currentRoom: null,
  currentTrail: null,
  currentView: 'map',       // 'map' | 'rooms' | 'lens'
  selectedReading: null,
  selectedWeek: null,
  detailMode: null,         // 'reading' | 'week' | 'trail'
  highlightedConcept: null,
  searchQuery: '',
  activeMode: null,         // 'contradiction' | 'ghosts' | null
  mapPositions: {},         // readingId -> {x,y}
};

// --- Helpers ------------------------------------------------

function getAllReadings() {
  return WEEKS.flatMap(w => w.readings.map(r => ({ ...r, week: w })));
}

function getReadingById(id) {
  return getAllReadings().find(r => r.id === id);
}

function getWeekById(id) {
  return WEEKS.find(w => w.id === id);
}

function getLensGroups(lensId) {
  const lens = LENSES[lensId];
  if (!lens) return [];
  return lens.groups.map(group => {
    const readings = [];
    // Collect readings from specified IDs or from weeks
    if (group.readingIds) {
      group.readingIds.forEach(rid => {
        const r = getReadingById(rid);
        if (r) readings.push(r);
      });
    } else if (group.weeks) {
      group.weeks.forEach(wid => {
        const w = getWeekById(wid);
        if (w) w.readings.forEach(r => readings.push({ ...r, week: w }));
      });
    }
    return { ...group, readings };
  });
}

// Compute spatial positions for the constellation map
function computeMapPositions(containerW, containerH) {
  const positions = {};
  const padding = 80;
  const W = containerW - padding * 2;
  const H = containerH - padding * 2;

  // Arrange weeks in a rough arc across the canvas
  const weekCount = WEEKS.length;
  WEEKS.forEach((week, wi) => {
    const weekX = padding + (W / (weekCount - 1)) * wi;
    const weekBaseY = padding + H * 0.3 + (wi % 2 === 0 ? 0 : H * 0.08);

    week.readings.forEach((reading, ri) => {
      const count = week.readings.length;
      const spread = Math.min(60, 130 / count);
      const offsetX = (ri - (count - 1) / 2) * spread;
      const offsetY = ri % 2 === 0
        ? -20 - ri * 12
        : 20 + ri * 10;

      positions[reading.id] = {
        x: weekX + offsetX,
        y: weekBaseY + offsetY,
        weekX,
        weekY: weekBaseY
      };
    });
  });
  return positions;
}

// --- Toast notification -------------------------------------
function showToast(msg, duration = 2000) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), duration);
}

// --- Detail Panel -------------------------------------------
function openDetailReading(readingId) {
  const r = getReadingById(readingId);
  if (!r) return;
  STATE.selectedReading = readingId;
  STATE.detailMode = 'reading';

  const panel = document.getElementById('detail-panel');
  const content = document.getElementById('detail-content');
  panel.classList.remove('hidden');

  const typeLabel = { primary: 'Primary', secondary: 'Secondary', contemporary: 'Contemporary', fiction: 'Fiction' };
  const typeClass = { primary: 'type-primary', secondary: 'type-secondary', contemporary: 'type-contemporary', fiction: 'type-fiction' };

  content.innerHTML = `
    <div class="rc-week-tag">Week ${r.week.number} — ${r.week.title}</div>
    <div id="detail-title">${r.title}</div>
    <div id="detail-author">${r.author || ''}</div>
    <div id="detail-year-source">${r.year || ''}${r.source ? ' · ' + r.source : ''}</div>

    <div class="detail-section">
      <div class="detail-section-label">Why It Matters</div>
      <div class="detail-body">${r.description}</div>
    </div>

    <div class="detail-section">
      <div class="detail-section-label">Concepts</div>
      <div class="tag-list">
        ${(r.concepts || []).map(c => `<span class="tag concept" data-concept="${c}">${c}</span>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-label">Tensions</div>
      <div class="tag-list">
        ${(r.tensions || []).map(t => `<span class="tag tension">${t}</span>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-label">Institutions</div>
      <div class="tag-list">
        ${(r.institutions || []).map(i => `<span class="tag institution">${i}</span>`).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-label">Type</div>
      <span class="rc-type-badge ${typeClass[r.type] || ''}">${typeLabel[r.type] || r.type}</span>
    </div>

  `;

  // Bind concept tag clicks
  content.querySelectorAll('.tag.concept').forEach(tag => {
    tag.addEventListener('click', () => filterByConcept(tag.dataset.concept));
  });

  updateMapHighlights();
}

function openDetailWeek(weekId) {
  const w = getWeekById(weekId);
  if (!w) return;
  STATE.selectedWeek = weekId;
  STATE.detailMode = 'week';

  const panel = document.getElementById('detail-panel');
  const content = document.getElementById('detail-content');
  panel.classList.remove('hidden');

  content.innerHTML = `
    <div class="week-detail-title">Week ${w.number}: ${w.title}</div>
    <div class="week-detail-dates">${w.dates}</div>
    <div class="detail-section">
      <div class="detail-section-label">Overview</div>
      <div class="detail-body">${w.summary}</div>
    </div>
    <div class="detail-section">
      <div class="detail-section-label">Core Questions</div>
      ${w.questions.map(q => `<div class="week-question">${q}</div>`).join('')}
    </div>
    <div class="detail-section">
      <div class="detail-section-label">Readings (${w.readings.length})</div>
      <div class="tag-list" style="flex-direction:column; gap:6px">
        ${w.readings.map(r => `
          <div class="reading-card" style="width:100%" onclick="openDetailReading('${r.id}')">
            <div class="rc-title">${r.title}</div>
            <div class="rc-author">${r.author || ''}</div>
          </div>
        `).join('')}
      </div>
    </div>
    ${w.fieldTrip ? `<div class="detail-section"><div class="detail-section-label">Field Trip</div><div class="detail-body" style="color:var(--teal)">${w.fieldTrip}</div></div>` : ''}
  `;
}

function openDetailTrail(trailId) {
  const trail = TRAILS.find(t => t.id === trailId);
  if (!trail) return;
  STATE.currentTrail = trailId;
  STATE.detailMode = 'trail';

  const panel = document.getElementById('detail-panel');
  const content = document.getElementById('detail-content');
  panel.classList.remove('hidden');

  content.innerHTML = `
    <div class="rc-week-tag" style="color:var(--teal)">Associative Trail</div>
    <div id="detail-title">${trail.title}</div>
    <div class="detail-body" style="margin: 10px 0 14px; font-size:12px; color:var(--text-dim); font-style:italic">${trail.description}</div>
    <div class="detail-section">
      <div class="detail-section-label">Stops (${trail.stops.length})</div>
      ${trail.stops.map((stop, i) => {
        const r = getReadingById(stop.readingId);
        if (!r) return '';
        return `
          <div class="trail-stop" onclick="openDetailReading('${r.id}')">
            <div class="trail-stop-num">${String(i + 1).padStart(2, '0')}</div>
            <div class="trail-stop-info">
              <div class="trail-stop-title">${r.title}</div>
              <div class="rc-author" style="margin-bottom:4px">${r.author || ''} · Week ${r.week.number}</div>
              <div class="trail-stop-note">${stop.note}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  updateMapHighlights();
  renderTrailList(); // refresh sidebar active state
}

function closeDetail() {
  STATE.selectedReading = null;
  STATE.selectedWeek = null;
  STATE.detailMode = null;
  document.getElementById('detail-panel').classList.add('hidden');
  updateMapHighlights();
}

// --- Concept filter -----------------------------------------
function filterByConcept(concept) {
  STATE.highlightedConcept = STATE.highlightedConcept === concept ? null : concept;
  document.getElementById('search-bar').value = STATE.highlightedConcept || '';
  STATE.searchQuery = STATE.highlightedConcept || '';
  updateMapHighlights();
  if (STATE.currentView === 'lens') renderLensView();
  if (STATE.currentView === 'rooms') renderRoomsView();
  showToast(STATE.highlightedConcept ? `Showing: ${STATE.highlightedConcept}` : 'Filter cleared');
}

// --- Left panel tabs ----------------------------------------
function switchPanelTab(tabId) {
  document.querySelectorAll('.panel-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
  document.querySelectorAll('.panel-section').forEach(s => s.style.display = s.dataset.section === tabId ? '' : 'none');
}

// --- Lens switching -----------------------------------------
function switchLens(lensId) {
  STATE.currentLens = lensId;
  STATE.currentRoom = null;

  document.querySelectorAll('.lens-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lens === lensId);
  });

  if (STATE.currentView === 'lens') renderLensView();
  if (STATE.currentView === 'map') renderMapView();
  if (STATE.currentView === 'rooms') renderRoomsView();
}

// --- Room selection -----------------------------------------
function selectRoom(roomId) {
  STATE.currentRoom = STATE.currentRoom === roomId ? null : roomId;
  document.querySelectorAll('.room-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.room === STATE.currentRoom);
  });
  updateMapHighlights();
}

// --- Views --------------------------------------------------
function switchView(viewId) {
  STATE.currentView = viewId;
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === viewId + '-view'));
  document.querySelectorAll('[data-view]').forEach(b => b.classList.toggle('active', b.dataset.view === viewId));

  if (viewId === 'map') renderMapView();
  else if (viewId === 'lens') renderLensView();
  else if (viewId === 'rooms') renderRoomsView();
}

// --- MAP VIEW -----------------------------------------------
function renderMapView() {
  const mapEl = document.getElementById('map-view');
  const canvas = document.getElementById('constellation-canvas');
  const nodesEl = document.getElementById('map-nodes');

  const W = mapEl.clientWidth;
  const H = mapEl.clientHeight;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  STATE.mapPositions = computeMapPositions(W, H);
  nodesEl.innerHTML = '';

  // Draw week cluster labels
  WEEKS.forEach(week => {
    // Average x from week's readings
    const xs = week.readings.map(r => STATE.mapPositions[r.id]?.x).filter(Boolean);
    if (!xs.length) return;
    const avgX = xs.reduce((a, b) => a + b, 0) / xs.length;
    const pos = STATE.mapPositions[week.readings[0]?.id];
    if (!pos) return;

    const label = document.createElement('div');
    label.className = 'week-cluster-label';
    label.textContent = `W${week.number}`;
    label.style.left = avgX + 'px';
    label.style.top = (pos.weekY + 30) + 'px';
    nodesEl.appendChild(label);
  });

  // Draw connections (edges) on canvas based on lens
  drawLensEdges(ctx);

  // Draw nodes
  const allR = getAllReadings();
  allR.forEach(r => {
    const pos = STATE.mapPositions[r.id];
    if (!pos) return;

    const isHighlighted = matchesSearch(r) || STATE.selectedReading === r.id;
    const isOnTrail = STATE.currentTrail && isOnCurrentTrail(r.id);
    const isInRoom = STATE.currentRoom && isInRoom_(r.id, STATE.currentRoom);

    const node = document.createElement('div');
    node.className = 'map-node' + (isHighlighted ? ' highlighted' : '') + (isOnTrail ? ' on-trail' : '') + (isInRoom ? ' in-room' : '');
    if (STATE.searchQuery && !isHighlighted) node.classList.add('dimmed');
    node.style.left = pos.x + 'px';
    node.style.top = (pos.y - 6) + 'px';  // -6 = half dot height so dot center aligns with canvas coords
    node.dataset.readingId = r.id;

    const dot = document.createElement('div');
    dot.className = 'node-dot';
    dot.style.borderColor = getRoomColor(r.week.room);

    const labelEl = document.createElement('div');
    labelEl.className = 'node-label';
    labelEl.textContent = r.author ? r.author.split(',')[0].split(' ').pop() : r.title.split(' ').slice(0, 2).join(' ');

    node.appendChild(dot);
    node.appendChild(labelEl);
    node.addEventListener('click', () => openDetailReading(r.id));
    node.addEventListener('mouseenter', () => showNodeTooltip(r, pos));
    node.addEventListener('mouseleave', hideNodeTooltip);

    nodesEl.appendChild(node);
  });

  renderMapLegend();
}

function drawLensEdges(ctx) {
  const lens = LENSES[STATE.currentLens];
  if (!lens) return;

  ctx.lineWidth = 1.2;
  ctx.globalAlpha = 0.45;

  if (STATE.currentLens === 'chronology') {
    // Week-by-week sequential
    WEEKS.forEach((week, wi) => {
      if (wi === 0) return;
      const prevWeek = WEEKS[wi - 1];
      prevWeek.readings.forEach(pr => {
        week.readings.forEach(cr => {
          const p1 = STATE.mapPositions[pr.id];
          const p2 = STATE.mapPositions[cr.id];
          if (!p1 || !p2) return;
          ctx.strokeStyle = '#e8a628';
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });
      });
    });
  } else {
    // Draw edges between readings in the same group
    const groups = getLensGroups(STATE.currentLens);
    const colors = ['#e8a628', '#3ecfb2', '#7e6ef0', '#5ec87a', '#e05050'];
    groups.forEach((group, gi) => {
      ctx.strokeStyle = colors[gi % colors.length];
      const readings = group.readings;
      for (let i = 0; i < readings.length - 1; i++) {
        const p1 = STATE.mapPositions[readings[i].id];
        const p2 = STATE.mapPositions[readings[i + 1].id];
        if (!p1 || !p2) continue;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });
  }

  // Trail overlay
  if (STATE.currentTrail) {
    const trail = TRAILS.find(t => t.id === STATE.currentTrail);
    if (trail) {
      ctx.strokeStyle = '#3ecfb2';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.7;
      ctx.setLineDash([4, 4]);
      for (let i = 0; i < trail.stops.length - 1; i++) {
        const p1 = STATE.mapPositions[trail.stops[i].readingId];
        const p2 = STATE.mapPositions[trail.stops[i + 1].readingId];
        if (!p1 || !p2) continue;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }
  }

  ctx.globalAlpha = 1;
}

function updateMapHighlights() {
  if (STATE.currentView !== 'map') return;
  renderMapView();
}

// Build a legend that explains exactly what the lines mean for the current lens
function renderMapLegend() {
  const el = document.getElementById('map-legend');
  if (!el) return;

  const lens = LENSES[STATE.currentLens];
  const colors = ['#e8a628', '#3ecfb2', '#7e6ef0', '#5ec87a', '#e05050'];

  // Node key (always shown)
  let html = `<div><span style="color:var(--amber)">●</span> Highlighted / selected</div>
              <div><span style="color:var(--teal)">●</span> On active trail</div>`;

  // Line meaning — depends on lens
  if (STATE.currentLens === 'chronology') {
    html += `<div style="margin-top:5px; border-top:1px solid var(--border); padding-top:5px">
               <div style="color:var(--amber); margin-bottom:3px">── Lines = chronological order</div>
               <div style="color:var(--text-dim); font-size:9px">Each line connects a reading in one<br>week to every reading in the next,<br>showing the course's temporal arc.</div>
             </div>`;
  } else {
    const groups = getLensGroups(STATE.currentLens);
    html += `<div style="margin-top:5px; border-top:1px solid var(--border); padding-top:5px">
               <div style="color:var(--text-dim); margin-bottom:4px; font-size:9px; letter-spacing:0.08em; text-transform:uppercase">Lines = shared ${lens.name} group</div>`;
    groups.forEach((group, gi) => {
      html += `<div><span style="color:${colors[gi % colors.length]}">──</span> ${group.label}</div>`;
    });
    html += `<div style="color:var(--text-dim); font-size:9px; margin-top:3px">Readings connected by a line<br>belong to the same conceptual<br>group under this lens.</div></div>`;
  }

  // Trail overlay key
  if (STATE.currentTrail) {
    const trail = TRAILS.find(t => t.id === STATE.currentTrail);
    html += `<div style="margin-top:5px; border-top:1px solid var(--border); padding-top:5px">
               <div style="color:var(--teal)">╌╌ Trail: ${trail ? trail.title.split(' ').slice(0, 4).join(' ') + '…' : 'active trail'}</div>
               <div style="color:var(--text-dim); font-size:9px">Dashed teal line shows the<br>reading sequence of the trail.</div>
             </div>`;
  }

  el.innerHTML = html;
}

// Tooltip (simple inline, near the node)
let tooltipEl = null;
function showNodeTooltip(r, pos) {
  hideNodeTooltip();
  tooltipEl = document.createElement('div');
  tooltipEl.style.cssText = `
    position:absolute; z-index:20; pointer-events:none;
    background:#1c1c26; border:1px solid #3e3e58; border-radius:3px;
    padding:8px 10px; max-width:200px; font-size:11px; line-height:1.4;
    color:#d4d0c8; box-shadow:0 4px 12px rgba(0,0,0,0.6);
  `;
  tooltipEl.innerHTML = `<strong style="color:#f0ece0">${r.title}</strong><br>
    <span style="color:#7a7a8e;font-style:italic">${r.author || ''}</span><br>
    <span style="color:#7a7a8e">Week ${r.week.number}</span>`;
  const offset = pos.x > document.getElementById('map-view').clientWidth - 220 ? -215 : 15;
  tooltipEl.style.left = (pos.x + offset) + 'px';
  tooltipEl.style.top = (pos.y - 26) + 'px';  // pos.y is dot center; show tooltip above it
  document.getElementById('map-nodes').appendChild(tooltipEl);
}
function hideNodeTooltip() {
  if (tooltipEl) { tooltipEl.remove(); tooltipEl = null; }
}

// --- LENS VIEW ----------------------------------------------
function renderLensView() {
  const container = document.getElementById('lens-view');
  const lens = LENSES[STATE.currentLens];
  const groups = getLensGroups(STATE.currentLens);

  container.innerHTML = `
    <div class="lens-header">
      <div class="lens-title">${lens.icon} ${lens.name}</div>
      <div class="lens-desc">${lens.description}</div>
    </div>
    ${groups.map(group => {
      const filtered = STATE.searchQuery
        ? group.readings.filter(r => matchesSearch(r))
        : group.readings;
      if (filtered.length === 0 && STATE.searchQuery) return '';
      return `
        <div class="lens-group">
          <div class="lens-group-label">${group.label} <span style="color:var(--text-dim); font-weight:normal">(${filtered.length || group.readings.length} readings)</span></div>
          <div class="reading-cards-row">
            ${(STATE.searchQuery ? filtered : group.readings).map(r => renderReadingCard(r)).join('')}
          </div>
        </div>
      `;
    }).join('')}
  `;

  container.querySelectorAll('.reading-card').forEach(card => {
    card.addEventListener('click', () => openDetailReading(card.dataset.readingId));
  });
}

// --- ROOMS VIEW ---------------------------------------------
function renderRoomsView() {
  const container = document.getElementById('rooms-view');
  container.innerHTML = `
    <div style="margin-bottom:20px">
      <div style="font-size:18px; color:var(--amber2); margin-bottom:6px">Conceptual Rooms</div>
      <div style="font-size:13px; color:var(--text-dim)">Cross-week groupings by theme, not calendar. Each room draws readings from multiple weeks.</div>
    </div>
    <div class="rooms-grid">
      ${Object.values(ROOMS).map(room => {
        const weekReadings = room.weeks.flatMap(wid => {
          const w = getWeekById(wid);
          return w ? w.readings : [];
        });
        const readingCount = weekReadings.length;
        return `
          <div class="room-card" style="--room-color:${room.color}" data-room="${room.id}">
            <div class="room-card-icon">${room.icon}</div>
            <div class="room-card-name">${room.name}</div>
            <div class="room-card-desc">${room.description}</div>
            <div class="room-card-meta">${room.weeks.length} week${room.weeks.length > 1 ? 's' : ''} · ${readingCount} readings</div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  container.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('click', () => openRoomDetail(card.dataset.room));
  });
}

function openRoomDetail(roomId) {
  const room = ROOMS[roomId];
  if (!room) return;
  STATE.currentRoom = roomId;
  STATE.detailMode = 'room';

  const panel = document.getElementById('detail-panel');
  const content = document.getElementById('detail-content');
  panel.classList.remove('hidden');

  const weekReadings = room.weeks.flatMap(wid => {
    const w = getWeekById(wid);
    return w ? w.readings.map(r => ({ ...r, week: w })) : [];
  });

  content.innerHTML = `
    <div style="color:${room.color}; font-size:22px; margin-bottom:8px">${room.icon}</div>
    <div id="detail-title">${room.name}</div>
    <div class="detail-body" style="margin:10px 0 14px; color:var(--text-dim); font-style:italic">${room.description}</div>
    <div class="detail-section">
      <div class="detail-section-label">Themes</div>
      <div class="tag-list">
        ${room.themes.map(t => `<span class="tag concept" data-concept="${t}">${t}</span>`).join('')}
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-label">Readings in this Room</div>
      ${weekReadings.map(r => `
        <div class="reading-card" style="width:100%; margin-bottom:6px" data-reading-id="${r.id}" onclick="openDetailReading('${r.id}')">
          <div class="rc-week-tag">Week ${r.week.number} — ${r.week.title}</div>
          <div class="rc-title">${r.title}</div>
          <div class="rc-author">${r.author || ''}</div>
        </div>
      `).join('')}
    </div>
  `;

  content.querySelectorAll('.tag.concept').forEach(tag => {
    tag.addEventListener('click', () => filterByConcept(tag.dataset.concept));
  });

  updateMapHighlights();
}

// --- Left panel content -------------------------------------
function renderLeftPanel() {
  renderLensPanel();
  renderRoomPanel();
  renderTrailList();
}

function renderLensPanel() {
  const container = document.querySelector('[data-section="lenses"]');
  if (!container) return;

  container.innerHTML = `
    <div class="section-label">Lens</div>
    ${Object.values(LENSES).map(lens => `
      <button class="lens-btn ${lens.id === STATE.currentLens ? 'active' : ''}" data-lens="${lens.id}">
        <span class="lens-icon">${lens.icon}</span>
        ${lens.name}
      </button>
    `).join('')}
    <div class="divider"></div>
    <div class="section-label">View</div>
    <button class="btn ${STATE.currentView === 'map' ? 'active' : ''}" data-view="map" style="width:100%;margin-bottom:4px;text-align:left">◯ Constellation Map</button>
    <button class="btn ${STATE.currentView === 'lens' ? 'active' : ''}" data-view="lens" style="width:100%;margin-bottom:4px;text-align:left">≡ Lens Groups</button>
    <button class="btn ${STATE.currentView === 'rooms' ? 'active' : ''}" data-view="rooms" style="width:100%;text-align:left">▦ Rooms</button>
  `;

  container.querySelectorAll('.lens-btn').forEach(btn => {
    btn.addEventListener('click', () => { switchLens(btn.dataset.lens); renderLeftPanel(); });
  });
  container.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => { switchView(btn.dataset.view); renderLeftPanel(); });
  });
}

function renderRoomPanel() {
  const container = document.querySelector('[data-section="rooms"]');
  if (!container) return;

  container.innerHTML = `
    <div class="section-label">Rooms</div>
    ${Object.values(ROOMS).map(room => `
      <button class="room-btn ${STATE.currentRoom === room.id ? 'active' : ''}" data-room="${room.id}" style="color:${room.color}">
        <span class="room-icon">${room.icon}</span>
        <span class="room-name" style="color:inherit">${room.name}</span>
      </button>
    `).join('')}
    <div class="divider"></div>
    <div class="section-label">Weeks</div>
    ${WEEKS.map(w => `
      <button class="room-btn" data-week="${w.id}" style="font-size:12px">
        <span class="room-icon" style="color:var(--text-dim); font-family:var(--font-mono); font-size:10px">W${w.number}</span>
        <span class="room-name" style="color:var(--text)">${w.title}</span>
      </button>
    `).join('')}
  `;

  container.querySelectorAll('[data-room]').forEach(btn => {
    btn.addEventListener('click', () => { selectRoom(btn.dataset.room); openRoomDetail(btn.dataset.room); renderRoomPanel(); });
  });
  container.querySelectorAll('[data-week]').forEach(btn => {
    btn.addEventListener('click', () => openDetailWeek(btn.dataset.week));
  });
}

function renderTrailList() {
  const container = document.querySelector('[data-section="trails"]');
  if (!container) return;

  container.innerHTML = `
    <div class="section-label">Associative Trails</div>
    ${TRAILS.map(t => `
      <div class="trail-item ${STATE.currentTrail === t.id ? 'active' : ''}" data-trail="${t.id}">
        <div class="trail-title">${t.title}</div>
        <div class="trail-meta">${t.stops.length} stops</div>
      </div>
    `).join('')}
  `;

  container.querySelectorAll('[data-trail]').forEach(item => {
    item.addEventListener('click', () => { openDetailTrail(item.dataset.trail); renderTrailList(); });
  });
}


// --- Search -------------------------------------------------
function handleSearch(query) {
  STATE.searchQuery = query.toLowerCase().trim();
  STATE.highlightedConcept = STATE.searchQuery || null;
  if (STATE.currentView === 'map') updateMapHighlights();
  else if (STATE.currentView === 'lens') renderLensView();
}

function matchesSearch(r) {
  if (!STATE.searchQuery) return true;
  const q = STATE.searchQuery;
  return (
    (r.title || '').toLowerCase().includes(q) ||
    (r.author || '').toLowerCase().includes(q) ||
    (r.description || '').toLowerCase().includes(q) ||
    (r.concepts || []).some(c => c.toLowerCase().includes(q)) ||
    (r.tensions || []).some(t => t.toLowerCase().includes(q)) ||
    (r.institutions || []).some(i => i.toLowerCase().includes(q)) ||
    (r.week?.title || '').toLowerCase().includes(q)
  );
}

// --- Helper predicates --------------------------------------
function isOnCurrentTrail(readingId) {
  if (!STATE.currentTrail) return false;
  const trail = TRAILS.find(t => t.id === STATE.currentTrail);
  return trail ? trail.stops.some(s => s.readingId === readingId) : false;
}

function isInRoom_(readingId, roomId) {
  const room = ROOMS[roomId];
  if (!room) return false;
  const r = getReadingById(readingId);
  if (!r) return false;
  return room.weeks.includes(r.week.id);
}

function getRoomColor(roomId) {
  return ROOMS[roomId]?.color || '#3e3e58';
}

// --- Rendering helper for cards -----------------------------
function renderReadingCard(r) {
  const typeClass = { primary: 'type-primary', secondary: 'type-secondary', contemporary: 'type-contemporary', fiction: 'type-fiction' };
  const highlighted = STATE.selectedReading === r.id;
  const onTrail = STATE.currentTrail && isOnCurrentTrail(r.id);
  const dimmed = STATE.searchQuery && !matchesSearch(r);
  return `
    <div class="reading-card ${highlighted ? 'highlighted' : ''} ${onTrail ? 'on-trail' : ''} ${dimmed ? 'dimmed' : ''}"
         data-reading-id="${r.id}">
      <div class="rc-week-tag">Week ${r.week.number}</div>
      <div class="rc-title">${r.title}</div>
      <div class="rc-author">${r.author || ''}</div>
      <span class="rc-type-badge ${typeClass[r.type] || ''}">${r.type || ''}</span>
    </div>
  `;
}

// --- Special Modes ------------------------------------------
function openContradictionMode() {
  STATE.activeMode = 'contradiction';
  const overlay = document.getElementById('mode-overlay');
  overlay.classList.add('visible');

  // Curated pairs of readings in tension
  const pairs = [
    {
      a: 'r5a', aNotes: "Turing: intelligence is performance—if a machine can imitate, it is intelligent.",
      b: 'r6d', bNotes: "Brynjolfsson: imitating humans is the wrong goal. Augmentation creates more value than replacement.",
      axis: "Imitation vs. Augmentation"
    },
    {
      a: 'r2a', aNotes: "Leibniz: all reasoning can be reduced to calculation—a universal characteristic.",
      b: 'r2d', bNotes: "Clarke: when computation achieves its goal of total enumeration, the universe ends.",
      axis: "Total Formalization vs. Its Consequences"
    },
    {
      a: 'r4a', aNotes: "Quetelet: social regularities reveal natural laws—the individual is subject to statistical fate.",
      b: 'r9d', bNotes: "Russell: AI must remain uncertain about human values and defer to them, not optimize fixed objectives.",
      axis: "Social Law vs. Human Agency"
    },
    {
      a: 'r9a', aNotes: "Kurzweil: the Singularity brings radical abundance, immortality, and cosmic expansion.",
      b: 'r9c', bNotes: "Ord: even a small probability of misaligned superintelligence demands urgent attention—the stakes are everything.",
      axis: "Utopia vs. Existential Risk"
    },
    {
      a: 'r6a', aNotes: "Bush: the memex is a personal knowledge device—associative trails built by one scholar.",
      b: 'r7c', bNotes: "Turner: the WELL shows that networked communities reshaped personal knowledge into collective ideology.",
      axis: "Individual Augmentation vs. Network Effects"
    },
    {
      a: 'r3c', aNotes: "Gier: human computers are workers—computation is labor, subject to division and management.",
      b: 'r8f', bNotes: "Kozlowski & Evans: AI can simulate human subjects—but at the cost of replacing human agency with statistical approximation.",
      axis: "Computation as Labor vs. Labor as Simulation"
    }
  ];

  const box = document.createElement('div');
  box.className = 'overlay-box';
  box.innerHTML = `
    <div class="overlay-title">⚡ Contradiction Mode</div>
    <div class="overlay-subtitle">Readings placed in productive tension</div>
    ${pairs.map(pair => {
      const ra = getReadingById(pair.a);
      const rb = getReadingById(pair.b);
      if (!ra || !rb) return '';
      return `
        <div style="margin-bottom:8px; font-family:var(--font-mono); font-size:10px; color:var(--amber); letter-spacing:0.1em; text-transform:uppercase">${pair.axis}</div>
        <div class="contradiction-pair">
          <div class="contradiction-side" data-reading="${pair.a}">
            <div class="contradiction-title">${ra.title}</div>
            <div class="rc-author">${ra.author || ''} · Week ${ra.week.number}</div>
            <div class="contradiction-note">${pair.aNotes}</div>
          </div>
          <div class="contradiction-vs">vs</div>
          <div class="contradiction-side" data-reading="${pair.b}">
            <div class="contradiction-title">${rb.title}</div>
            <div class="rc-author">${rb.author || ''} · Week ${rb.week.number}</div>
            <div class="contradiction-note">${pair.bNotes}</div>
          </div>
        </div>
      `;
    }).join('')}
    <button class="btn" onclick="closeOverlay()">Close</button>
  `;

  box.querySelectorAll('[data-reading]').forEach(el => {
    el.addEventListener('click', () => { closeOverlay(); openDetailReading(el.dataset.reading); });
  });

  overlay.innerHTML = '';
  overlay.appendChild(box);
}

function openGhostsMode() {
  STATE.activeMode = 'ghosts';
  const overlay = document.getElementById('mode-overlay');
  overlay.classList.add('visible');

  const ghosts = [
    { name: 'Calculation', icon: '⚙', desc: 'The drive to mechanize arithmetic—from abacus to neural net.', weeks: ['w1', 'w2', 'w3', 'w4'] },
    { name: 'Classification', icon: '◈', desc: 'The will to sort, measure, and normalize humans and phenomena.', weeks: ['w4', 'w5', 'w8'] },
    { name: 'Creation', icon: '✦', desc: 'Can machines generate? The machine authorship problem, ancient and modern.', weeks: ['w2', 'w5'] },
    { name: 'Communication', icon: '◎', desc: 'The computer as medium—from ARPANET to social media to LLMs.', weeks: ['w6', 'w7'] },
    { name: 'Modeling', icon: '⬟', desc: 'The drive to simulate phenomena—digital doubles of reality.', weeks: ['w2', 'w4', 'w8'] },
    { name: 'Control', icon: '◬', desc: 'Can we control what we create? Alignment and the control problem.', weeks: ['w5', 'w9'] },
    { name: 'Risk', icon: '⚡', desc: 'Computation as threat—existential, social, epistemic.', weeks: ['w4', 'w9'] },
  ];

  const box = document.createElement('div');
  box.className = 'overlay-box';
  box.innerHTML = `
    <div class="overlay-title">👻 Ghosts of Computation</div>
    <div class="overlay-subtitle">Recurring themes haunting the course</div>
    ${ghosts.map(g => `
      <div class="ghost-row">
        <div class="ghost-icon">${g.icon}</div>
        <div style="flex:1">
          <div class="ghost-name">${g.name}</div>
          <div style="font-size:12px; color:var(--text-dim); margin-bottom:6px">${g.desc}</div>
          <div class="ghost-weeks">
            ${g.weeks.map(wid => {
              const w = getWeekById(wid);
              return w ? `<span class="ghost-week-tag" data-week="${wid}">W${w.number}: ${w.title}</span>` : '';
            }).join('')}
          </div>
        </div>
      </div>
    `).join('')}
    <div style="margin-top:16px"><button class="btn" onclick="closeOverlay()">Close</button></div>
  `;

  box.querySelectorAll('[data-week]').forEach(tag => {
    tag.addEventListener('click', () => { closeOverlay(); openDetailWeek(tag.dataset.week); });
  });

  overlay.innerHTML = '';
  overlay.appendChild(box);
}

function closeOverlay() {
  STATE.activeMode = null;
  document.getElementById('mode-overlay').classList.remove('visible');
}

// --- Shuffle ------------------------------------------------
function shuffleSyllabus() {
  const lensKeys = Object.keys(LENSES);
  const random = lensKeys[Math.floor(Math.random() * lensKeys.length)];
  switchLens(random);
  switchView('lens');
  renderLeftPanel();
  // Animate
  document.getElementById('lens-view').classList.add('shuffle-anim');
  setTimeout(() => document.getElementById('lens-view').classList.remove('shuffle-anim'), 400);
  showToast(`Shuffled → ${LENSES[random].name}`);
}

// --- Resize handler -----------------------------------------
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (STATE.currentView === 'map') renderMapView();
  }, 100);
});

// --- Init ---------------------------------------------------
function init() {
  // Left panel tabs
  document.querySelectorAll('.panel-tab').forEach(tab => {
    tab.addEventListener('click', () => switchPanelTab(tab.dataset.tab));
  });

  // Search
  document.getElementById('search-bar').addEventListener('input', e => handleSearch(e.target.value));

  // Header buttons
  document.getElementById('btn-shuffle').addEventListener('click', shuffleSyllabus);
  document.getElementById('btn-contradiction').addEventListener('click', openContradictionMode);
  document.getElementById('btn-ghosts').addEventListener('click', openGhostsMode);

  // Detail close
  document.getElementById('detail-close').addEventListener('click', closeDetail);

  // Overlay close on background click
  document.getElementById('mode-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('mode-overlay')) closeOverlay();
  });

  // Initial render
  renderLeftPanel();
  switchView('map');
  switchPanelTab('lenses');
}

document.addEventListener('DOMContentLoaded', init);
