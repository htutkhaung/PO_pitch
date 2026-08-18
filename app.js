// MSG TECH - Autonomous Hospitality & Real Asset Intelligence
// Interactive Engine, Scrollytelling Canvas Scrubber, and Presentation Controller

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundTelemetry();
  initScrubberCanvas();
  initModeSwitcher();
  initDiscoveryCalculator();
  initCommandCenter();
  initIoTSimulator();
  initNotionAISimulator();
  initPresentationTimer();
  initDatabaseExplorer();
  initTangTangSimulator();
  initForecastingSimulator();
  initGeoSeasonalityFilter();
});

// 1. Background Telemetry Particle Network
function initBackgroundTelemetry() {
  const canvas = document.getElementById('bg-telemetry-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const particleCount = Math.min(width > 768 ? 50 : 25, 60);
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? 'rgba(56, 189, 248, 0.4)' : 'rgba(16, 185, 129, 0.3)'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

// 2. Scrollytelling Split Canvas Scrubber Engine
function initScrubberCanvas() {
  const canvas = document.getElementById('scrubber-canvas');
  const section = document.querySelector('.scrubber-hero-section');
  const fill = document.getElementById('scrubber-fill');
  const frameText = document.getElementById('scrubber-frame-idx');
  const narrativeOverlay = document.getElementById('scrubber-narrative');
  if (!canvas || !section) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    const parent = canvas.parentElement;
    width = canvas.width = parent.clientWidth;
    height = canvas.height = parent.clientHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const narratives = [
    {
      progress: 0.0,
      title: "Isolated Island Operations",
      desc: "5 disconnected legacy systems (OperaCloud, MC Inventory, SunSystems, FoodStory, TigerSoft) operating in fragmented silos across Koh Samui.",
      badge: "LEGACY STATE",
      tagColor: "var(--rose-primary)",
      extra: "Manual paper slips, Excel night audits, 15-day delayed P&L visibility."
    },
    {
      progress: 0.33,
      title: "Real-Time Telemetry & Event Mesh",
      desc: "Deploying high-speed event brokers and IoT telemetry sub-meters across resorts, dining outlets, and island land parcels.",
      badge: "INGESTION MESH",
      tagColor: "var(--cyan-primary)",
      extra: "MQTT stream protocols, sub-second WebSocket updates, automated price-drift alerts."
    },
    {
      progress: 0.66,
      title: "Atomic Data Lake & 3-Way Reconciliation",
      desc: "Sub-second transaction reconciliation matching POS terminals, night audits, and SunSystems ledgers automatically.",
      badge: "SECURITY & ACID",
      tagColor: "var(--emerald-primary)",
      extra: "36 PostgreSQL tables, 52 RLS policies, 22 atomic database RPC functions."
    },
    {
      progress: 0.95,
      title: "Autonomous Enterprise Command Center",
      desc: "Single-screen real-time intelligence for the Chairman, CEO, MD, and CFO with automated departmental task routing.",
      badge: "UNIFIED FUTURE",
      tagColor: "var(--amber-primary)",
      extra: "18%–25% utility reduction, live RevPAR tracking, 0-day financial close."
    }
  ];

  let currentProgress = 0;

  function onScroll() {
    const rect = section.getBoundingClientRect();
    const totalScroll = section.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    let progress = Math.max(0, Math.min(1, scrolled / totalScroll));
    currentProgress = progress;

    if (fill) fill.style.width = `${(progress * 100).toFixed(1)}%`;
    if (frameText) {
      const frameNum = Math.floor(progress * 120) + 1;
      frameText.textContent = `FRAME ${frameNum.toString().padStart(3, '0')} / 120`;
    }

    // Update narrative card based on progress
    let matched = narratives[0];
    for (let item of narratives) {
      if (progress >= item.progress) matched = item;
    }

    if (narrativeOverlay) {
      narrativeOverlay.innerHTML = `
        <span class="section-tag" style="border-color: ${matched.tagColor}; color: ${matched.tagColor};">${matched.badge}</span>
        <h2 style="font-family: var(--font-heading); font-size: 28px; color: #fff; margin: 10px 0 12px 0; line-height: 1.25;">
          ${matched.title}
        </h2>
        <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6; margin-bottom: 14px;">
          ${matched.desc}
        </p>
        <div style="background: rgba(15, 23, 42, 0.6); padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border-subtle); font-size: 12px; color: #cbd5e1;">
          <i class="fa-solid fa-microchip" style="color: ${matched.tagColor}; margin-right: 6px;"></i>
          <strong>Key Mechanism:</strong> ${matched.extra}
        </div>
      `;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Render animated architectural frames on canvas synced to scroll progress
  function renderScrubber() {
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const p = currentProgress; // 0 to 1

    // Scale calculation based on canvas size
    const baseScale = Math.min(width, height) / 500;

    // Draw central hub node expanding with progress
    const radius = (45 + p * 35) * baseScale;
    const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius * 2);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0.0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 2, 0, Math.PI * 2);
    ctx.fill();

    // Central Core
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = p > 0.4 ? '#38bdf8' : '#64748b';
    ctx.stroke();

    // Draw Core Title
    ctx.fillStyle = '#f8fafc';
    ctx.font = `700 ${Math.max(10, Math.floor(13 * baseScale))}px 'Space Grotesk'`;
    ctx.textAlign = 'center';
    ctx.fillText('MSG COMMAND HUB', centerX, centerY - 4);
    ctx.fillStyle = p > 0.4 ? '#38bdf8' : '#94a3b8';
    ctx.font = `600 ${Math.max(8, Math.floor(9.5 * baseScale))}px 'Space Grotesk'`;
    ctx.fillText(p > 0.5 ? 'REALTIME CORE' : 'FRAGMENTED SILOS', centerX, centerY + 12);

    // Orbiting Satellite Nodes (Systems)
    const baseDist = 140 * baseScale;
    const nodes = [
      { name: 'OperaCloud PMS', sub: 'Front / RSVN', angle: 0 + p * Math.PI * 0.6, dist: baseDist, color: '#38bdf8' },
      { name: 'Micros / FoodStory', sub: 'Resorts & Dining', angle: 1.25 + p * Math.PI * 0.6, dist: baseDist * 1.05, color: '#10b981' },
      { name: 'MC Materials', sub: 'Stores & Stock', angle: 2.5 + p * Math.PI * 0.6, dist: baseDist, color: '#f59e0b' },
      { name: 'Infor SunSystems', sub: 'Finance & Ledger', angle: 3.75 + p * Math.PI * 0.6, dist: baseDist * 1.08, color: '#818cf8' },
      { name: 'TigerSoft HR', sub: 'Biometrics & OT', angle: 5.0 + p * Math.PI * 0.6, dist: baseDist, color: '#f43f5e' }
    ];

    nodes.forEach(node => {
      const nx = centerX + Math.cos(node.angle) * node.dist;
      const ny = centerY + Math.sin(node.angle) * node.dist;

      // Connecting pipeline
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = p > 0.35 ? `rgba(56, 189, 248, ${0.15 + p * 0.45})` : 'rgba(239, 68, 68, 0.25)';
      ctx.setLineDash(p > 0.6 ? [] : [4, 4]);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);

      // Traveling data packet
      if (p > 0.25) {
        const packetProgress = (Date.now() * 0.0015 + node.angle) % 1;
        const px = centerX + (nx - centerX) * packetProgress;
        const py = centerY + (ny - centerY) * packetProgress;
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Satellite node box
      const nodeR = 26 * baseScale;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
      ctx.beginPath();
      ctx.arc(nx, ny, nodeR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = node.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.max(8, Math.floor(9 * baseScale))}px 'Space Grotesk'`;
      ctx.fillText(node.name.split(' ')[0], nx, ny - 2);
      ctx.fillStyle = 'rgba(203, 213, 225, 0.8)';
      ctx.font = `${Math.max(7, Math.floor(7.5 * baseScale))}px 'Plus Jakarta Sans'`;
      ctx.fillText(node.sub, nx, ny + 9);
    });

    requestAnimationFrame(renderScrubber);
  }
  renderScrubber();
}

// 3. Dual Mode Switcher (Scrollytelling vs 30-Slide Deck)
function initModeSwitcher() {
  const scrollyBtn = document.getElementById('btn-mode-scrolly');
  const deckBtn = document.getElementById('btn-mode-deck');
  const scrollyView = document.getElementById('scrollytelling-mode-view');
  const deckView = document.getElementById('presentation-deck-mode');

  if (!scrollyBtn || !deckBtn) return;

  scrollyBtn.addEventListener('click', () => {
    scrollyBtn.classList.add('active');
    deckBtn.classList.remove('active');
    scrollyView.style.display = 'block';
    deckView.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  deckBtn.addEventListener('click', () => {
    deckBtn.classList.add('active');
    scrollyBtn.classList.remove('active');
    scrollyView.style.display = 'none';
    deckView.style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 4. Discovery Pricing & Market Valuation Calculator
function initDiscoveryCalculator() {
  const hoursSlider = document.getElementById('calc-hours-slider');
  const tierSelect = document.getElementById('calc-tier-select');
  const feeDisplay = document.getElementById('calc-total-fee');
  const packageDisplay = document.getElementById('calc-package-desc');

  if (!hoursSlider || !tierSelect || !feeDisplay) return;

  function update() {
    const hours = parseInt(hoursSlider.value);
    const tier = tierSelect.value;
    document.getElementById('calc-hours-val').textContent = `${hours} Hours`;

    let rate = 8000;
    if (tier === 'big4') {
      rate = 16000;
    } else if (tier === 'boutique') {
      rate = 10000;
    } else {
      rate = 8000;
    }

    const total = hours * rate;
    feeDisplay.textContent = `฿${total.toLocaleString()} THB (~$${Math.round(total / 36).toLocaleString()} USD)`;
    if (packageDisplay) {
      packageDisplay.textContent = `Includes: ${hours}-hr architecture discovery workshop + cross-system data audit + executive transformation blueprint.`;
    }
  }

  hoursSlider.addEventListener('input', update);
  tierSelect.addEventListener('change', update);
  update();
}

// 5. Command Center Interactive Simulator
function initCommandCenter() {
  const tabs = document.querySelectorAll('.command-tab-btn');
  const body = document.getElementById('command-hub-dynamic-content');
  if (!tabs.length || !body) return;

  const data = {
    overview: `
      <div class="kpi-row">
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Group Consolidated Revenue</span><span class="kpi-val emerald">฿1,428,500</span><span style="font-size:10px; color:#10b981;">▲ +14.2% vs target</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Average RevPAR</span><span class="kpi-val cyan">฿5,120</span><span style="font-size:10px; color:#38bdf8;">Occupancy 91.8%</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Group F&B Cost Margin</span><span class="kpi-val amber">27.6%</span><span style="font-size:10px; color:#f59e0b;">Target: < 28.5%</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">IoT Utility Savings</span><span class="kpi-val emerald">฿184,200</span><span style="font-size:10px; color:#10b981;">-21.4% kWh/Water</span></div>
      </div>
      <div class="grid-2">
        <div class="glass-card" style="padding:18px;">
          <h4 style="font-size:13px; color:#38bdf8; font-family:var(--font-heading); margin-bottom:10px;">PROPERTIES & OUTLETS REAL-TIME STREAM</h4>
          <table class="styled-table">
            <tr><th>Asset Unit</th><th>Occupancy / Covers</th><th>Today Rev</th><th>Status</th></tr>
            <tr><td>Muang Samui Spa Resort</td><td>92.5% (53/57 Rms)</td><td>฿684,200</td><td><span class="pod-badge">Optimal</span></td></tr>
            <tr><td>Royal Muang Samui Villas</td><td>90.8% (71/79 Rms)</td><td>฿542,100</td><td><span class="pod-badge">Optimal</span></td></tr>
            <tr><td>Babou & Tang Tang Outlets</td><td>248 Covers Served</td><td>฿128,400</td><td><span class="pod-badge">Live Sync</span></td></tr>
            <tr><td>Nanyuan Dining & Others</td><td>114 Covers</td><td>฿73,800</td><td><span class="pod-badge">Live Sync</span></td></tr>
          </table>
        </div>
        <div class="glass-card" style="padding:18px;">
          <h4 style="font-size:13px; color:#10b981; font-family:var(--font-heading); margin-bottom:10px;">AUTOMATED ACTION & RISK TRIGGERS</h4>
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="background:rgba(239, 68, 68, 0.1); border:1px solid rgba(239, 68, 68, 0.3); padding:10px; border-radius:8px;">
              <strong style="color:#f87171; font-size:12px;"><i class="fa-solid fa-triangle-exclamation"></i> Energy Anomaly Flagged:</strong>
              <p style="font-size:11px; color:#cbd5e1;">Villa 204 AC running 18°C with balcony door open > 25 mins. Auto-throttled to 24°C.</p>
            </div>
            <div style="background:rgba(56, 189, 248, 0.1); border:1px solid rgba(56, 189, 248, 0.3); padding:10px; border-radius:8px;">
              <strong style="color:#38bdf8; font-size:12px;"><i class="fa-solid fa-check-double"></i> 3-Way Audit Balanced:</strong>
              <p style="font-size:11px; color:#cbd5e1;">Night audit trial balance matched SunSystems general ledger with 0.00 THB variance.</p>
            </div>
          </div>
        </div>
      </div>
    `,
    sales: `
      <div class="kpi-row">
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Direct Web Booking Share</span><span class="kpi-val emerald">48.2%</span><span style="font-size:10px; color:#10b981;">▲ +12.4% vs 2025</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">OTA Commission Savings</span><span class="kpi-val cyan">฿3,840,000</span><span style="font-size:10px; color:#38bdf8;">Saved YTD</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Blended Marketing ROAS</span><span class="kpi-val emerald">8.4x</span><span style="font-size:10px; color:#10b981;">Google & Xiaohongshu</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Average Lead Time</span><span class="kpi-val amber">44 Days</span><span style="font-size:10px; color:#cbd5e1;">Europe Long-Haul</span></div>
      </div>
      <table class="styled-table">
        <tr><th>Marketing Channel</th><th>Monthly Ad Spend</th><th>Attributed Bookings</th><th>Revenue Generated</th><th>Channel ROAS</th></tr>
        <tr><td>Google Hotel Ads & Direct PPC</td><td>฿240,000</td><td>142 Bookings</td><td>฿2,112,000</td><td><strong style="color:#10b981;">8.8x ROAS</strong></td></tr>
        <tr><td>Xiaohongshu & Ctrip Live (China)</td><td>฿150,000</td><td>98 Bookings</td><td>฿1,410,000</td><td><strong style="color:#10b981;">9.4x ROAS</strong></td></tr>
        <tr><td>Meta (Instagram / Reels Luxury)</td><td>฿110,000</td><td>64 Bookings</td><td>฿792,000</td><td><strong style="color:#10b981;">7.2x ROAS</strong></td></tr>
        <tr><td>LINE Official & Guest Club (Direct)</td><td>฿35,000</td><td>118 Bookings</td><td>฿885,000</td><td><strong style="color:#10b981;">25.2x ROAS</strong></td></tr>
      </table>
    `,
    fnb: `
      <div class="kpi-row">
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Total F&B Outlets Revenue</span><span class="kpi-val emerald">฿384,500</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Live Food Cost %</span><span class="kpi-val cyan">28.1%</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Average Table Turn Time</span><span class="kpi-val amber">42 Mins</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Unreconciled POS Bills</span><span class="kpi-val emerald">0 (Auto-Sync)</span></div>
      </div>
      <table class="styled-table">
        <tr><th>Outlet Name</th><th>POS Source Engine</th><th>Today Sales</th><th>Recipe Margin</th><th>Action</th></tr>
        <tr><td>Spice Zone Beachfront</td><td>Micros RES 3700</td><td>฿112,400</td><td>72.4% (Healthy)</td><td><button class="btn-action-sm">Audit Recipe</button></td></tr>
        <tr><td>Babou Restaurant</td><td>FoodStory Webhook</td><td>฿84,200</td><td>68.9% (Healthy)</td><td><button class="btn-action-sm">View Feed</button></td></tr>
        <tr><td>Tang Tang Mala Tang</td><td>Custom POS / KDS</td><td>฿44,200</td><td>74.2% (High Yield)</td><td><button class="btn-action-sm">KDS Screen</button></td></tr>
        <tr><td>Samui Seafood Grill</td><td>Micros RES 3700</td><td>฿96,100</td><td>69.5% (Healthy)</td><td><button class="btn-action-sm">Audit Recipe</button></td></tr>
      </table>
    `,
    finance: `
      <div class="kpi-row">
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Daily Ledger Posting</span><span class="kpi-val emerald">100% Synced</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Opera ↔ SunSystems Variance</span><span class="kpi-val cyan">฿0.00</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Pending PR/PO Approvals</span><span class="kpi-val amber">4 In Review</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">P&L Close Velocity</span><span class="kpi-val emerald">Real-time (0 Days Lag)</span></div>
      </div>
      <div class="glass-card" style="padding:18px;">
        <h4 style="font-size:13px; color:#38bdf8; font-family:var(--font-heading); margin-bottom:10px;">AUTOMATED 3-WAY FINANCIAL RECONCILIATION ENGINE</h4>
        <p style="font-size:12px; color:#cbd5e1; margin-bottom:14px;">Cross-verifying POS terminal batches, Opera Night Audit Room Folios, and Infor SunSystems Journal entries in real time.</p>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px;">
          <div style="background:#0f172a; padding:12px; border-radius:8px; border:1px solid rgba(56,189,248,0.3); text-align:center;">
            <strong style="color:#38bdf8; font-size:12px;">1. POS Terminal Batch</strong><br><span style="font-size:15px; font-weight:700;">฿384,500.00</span>
          </div>
          <div style="background:#0f172a; padding:12px; border-radius:8px; border:1px solid rgba(16,185,129,0.3); text-align:center;">
            <strong style="color:#10b981; font-size:12px;">2. Opera Night Audit</strong><br><span style="font-size:15px; font-weight:700;">฿1,428,500.00</span>
          </div>
          <div style="background:#0f172a; padding:12px; border-radius:8px; border:1px solid rgba(129,140,248,0.3); text-align:center;">
            <strong style="color:#818cf8; font-size:12px;">3. SunSystems Ledger</strong><br><span style="font-size:15px; font-weight:700;">MATCHED (0.00 Diff)</span>
          </div>
        </div>
      </div>
    `,
    hr: `
      <div class="kpi-row">
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Total Active Headcount</span><span class="kpi-val cyan">284 Staff</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Monthly Overtime Reduction</span><span class="kpi-val emerald">-24.2%</span><span style="font-size:10px; color:#10b981;">Saved ฿84k/mo</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">TigerSoft Sync Latency</span><span class="kpi-val emerald">Real-time</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Shift Roster Coverage</span><span class="kpi-val emerald">99.4%</span></div>
      </div>
      <table class="styled-table">
        <tr><th>Department</th><th>Active Staff</th><th>Overtime Trend</th><th>Pace Alignment</th><th>Status</th></tr>
        <tr><td>Housekeeping & Laundry</td><td>68 Staff</td><td style="color:#10b981;">-32.5% OT</td><td>Aligned to Flight Arrivals</td><td><span class="pod-badge">Optimized</span></td></tr>
        <tr><td>Food & Beverage Service</td><td>84 Staff</td><td style="color:#10b981;">-18.4% OT</td><td>Table Turn Dynamic Shifts</td><td><span class="pod-badge">Optimized</span></td></tr>
        <tr><td>Front Desk & Concierge</td><td>36 Staff</td><td style="color:#10b981;">-14.2% OT</td><td>Check-in Surge Stagger</td><td><span class="pod-badge">Optimized</span></td></tr>
        <tr><td>Engineering & Grounds</td><td>42 Staff</td><td style="color:#10b981;">-20.1% OT</td><td>Preventative Maintenance SLAs</td><td><span class="pod-badge">Optimized</span></td></tr>
      </table>
    `,
    land: `
      <div class="kpi-row">
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Total Registered Parcels</span><span class="kpi-val cyan">14 Plots</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Total Prime Land Area</span><span class="kpi-val emerald">186.4 Rai</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Active Commercial Leases</span><span class="kpi-val amber">6 Contracts</span></div>
        <div class="kpi-box"><span style="font-size:11px; color:#94a3b8;">Upcoming Renewal Alerts</span><span class="kpi-val emerald">1 in 90 Days</span></div>
      </div>
      <table class="styled-table">
        <tr><th>Parcel Location</th><th>Zoning / Deed #</th><th>Area</th><th>Current Usage</th><th>Status</th></tr>
        <tr><td>Chaweng Beachfront Prime</td><td>Nor Sor 3 Kor #4402</td><td>34.2 Rai</td><td>Muang Samui Spa Resort</td><td><span class="pod-badge">Active</span></td></tr>
        <tr><td>Choeng Mon Hillside & Bay</td><td>Chanote #10948</td><td>52.8 Rai</td><td>Royal Muang Samui Villas</td><td><span class="pod-badge">Active</span></td></tr>
        <tr><td>Chaweng Ring Road Commercial</td><td>Chanote #8831</td><td>12.5 Rai</td><td>Dining & Retail Leases</td><td><span class="pod-badge">Leased</span></td></tr>
        <tr><td>Bophut Future Villa Expansion</td><td>Chanote #14209</td><td>48.0 Rai</td><td>Land Bank / Valuation Model</td><td><span class="pod-badge">Development Bank</span></td></tr>
      </table>
    `
  };

  function render(tabKey) {
    body.innerHTML = data[tabKey] || data.overview;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      render(tab.getAttribute('data-tab'));
    });
  });

  render('overview');
}

// Global AI Agent Query Function for Managing Director Console
window.runAiAgentQuery = function(type) {
  const out = document.getElementById('ai-agent-console-output');
  if (!out) return;

  out.innerHTML = `<span style="color:#38bdf8;"><i class="fa-solid fa-spinner fa-spin"></i> Dispatching Autonomous AI Agent across PostgreSQL 15+ Cluster (Tables: orders, reservations, marketing_attrib, staff_shifts)...</span>`;

  setTimeout(() => {
    if (type === 'mmm') {
      out.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:6px; color:#f8fafc;">
          <div style="color:#10b981; font-weight:700;"><i class="fa-solid fa-check"></i> AGENT 03: Marketing Mix Attribution Completed (8.4x Blended ROAS)</div>
          <div>• <strong>Google Hotel Ads & Brand Search:</strong> ฿240,000 ad spend generated ฿2,112,000 direct revenue (8.8x ROAS, CAC: ฿840).</div>
          <div>• <strong>Xiaohongshu & Ctrip Luxury Live:</strong> ฿150,000 spend generated ฿1,410,000 revenue (9.4x ROAS, CAC: ฿780).</div>
          <div>• <strong>OTA Share:</strong> 18.5% Commission load. <em>Recommendation: Re-route ฿80,000 from generic OTAs to direct Google Ads to save ฿380,000 THB in commissions this quarter.</em></div>
        </div>
      `;
    } else if (type === 'rate_hike') {
      out.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:6px; color:#f8fafc;">
          <div style="color:#10b981; font-weight:700;"><i class="fa-solid fa-check"></i> AGENT 01: Dynamic Rate Elasticity Simulation (+15% ADR Hike for Songkran)</div>
          <div>• <strong>Current Base ADR:</strong> ฿7,800 THB | <strong>Proposed Dynamic ADR:</strong> ฿8,970 THB</div>
          <div>• <strong>Projected Occupancy Impact:</strong> 94.2% &rarr; 91.8% (-2.4% volume drop, but +12.6% total net revenue lift).</div>
          <div>• <strong>Incremental GOPPAR:</strong> <span style="color:#10b981; font-weight:700;">+฿2,140,000 THB Net Profit</span> across 7-day festive holiday. <em>Execution status: Approved for automated staging.</em></div>
        </div>
      `;
    } else if (type === 'overtime') {
      out.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:6px; color:#f8fafc;">
          <div style="color:#10b981; font-weight:700;"><i class="fa-solid fa-check"></i> AGENT 04: Housekeeping Overtime & Flight Arrival Roster Audit</div>
          <div>• <strong>Root Cause Identified:</strong> 64% of OT hours occurred on Fridays & Sundays due to 5 delayed Bangkok Airways flights arriving post 18:00.</div>
          <div>• <strong>Automated Remediation:</strong> Shifted 4 HK morning cleaners to a flexible 14:00–22:00 staggered evening roster.</div>
          <div>• <strong>Estimated Overtime Cost Reduction:</strong> <span style="color:#10b981; font-weight:700;">-฿84,000 THB / Month (-24.2% OT expenses)</span>.</div>
        </div>
      `;
    } else if (type === 'babou_cost') {
      out.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:6px; color:#f8fafc;">
          <div style="color:#10b981; font-weight:700;"><i class="fa-solid fa-check"></i> AGENT 04: Babou F&B Recipe & MC Store Margin Audit</div>
          <div>• <strong>Variance Detected:</strong> Fresh seafood cost increased from 28.2% to 32.8% due to supplier price adjustments on King Prawns and Sea Bass (+16% market index).</div>
          <div>• <strong>Recipe Adjustment:</strong> Auto-recalculated menu gross profit margins on FoodStory POS; recommended adjusting signature platter pricing +40 THB or switching to pre-contracted local fishers.</div>
          <div>• <strong>Margin Recovery:</strong> Restores target food cost to 28.0% (<span style="color:#10b981; font-weight:700;">+฿62,000 THB / Month margin defense</span>).</div>
        </div>
      `;
    }
  }, 600);
};

// 6. IoT Telemetry Simulator
function initIoTSimulator() {
  const slider = document.getElementById('iot-villas-slider');
  const countText = document.getElementById('iot-villas-count');
  const savingText = document.getElementById('iot-saving-display');
  const doorToggle = document.getElementById('iot-door-sim');
  const alertBox = document.getElementById('iot-live-alert');

  if (!slider || !countText || !savingText) return;

  function update() {
    const villas = parseInt(slider.value);
    countText.textContent = `${villas} Villas Connected`;
    const monthlySaving = villas * 1850;
    const annualSaving = monthlySaving * 12;
    savingText.textContent = `฿${annualSaving.toLocaleString()} THB / Year (~$${Math.round(annualSaving / 36).toLocaleString()} USD)`;
  }

  slider.addEventListener('input', update);
  update();

  if (doorToggle && alertBox) {
    doorToggle.addEventListener('change', () => {
      if (doorToggle.checked) {
        alertBox.innerHTML = `
          <div style="background:rgba(239,68,68,0.15); border:1px solid #ef4444; padding:10px; border-radius:8px; display:flex; align-items:center; gap:8px;">
            <i class="fa-solid fa-bell" style="color:#ef4444; font-size:18px;"></i>
            <div>
              <strong style="color:#f87171; font-size:12px;">ALERT: Balcony Door Open > 5 Mins (Villa 104)</strong>
              <p style="font-size:11px; color:#cbd5e1;">AC auto-throttled from 19°C to Eco 25°C. Power draw decreased from 3.8 kW to 1.1 kW.</p>
            </div>
          </div>
        `;
      } else {
        alertBox.innerHTML = `
          <div style="background:rgba(16,185,129,0.15); border:1px solid #10b981; padding:10px; border-radius:8px; display:flex; align-items:center; gap:8px;">
            <i class="fa-solid fa-circle-check" style="color:#10b981; font-size:18px;"></i>
            <div>
              <strong style="color:#10b981; font-size:12px;">SYSTEM NORMAL: All Villa Telemetry Nominal</strong>
              <p style="font-size:11px; color:#cbd5e1;">10 Sub-meter gateways streaming live MQTT packets every 5 seconds.</p>
            </div>
          </div>
        `;
      }
    });
  }
}

// 7. Bilingual Notion AI Assistant Simulator
function initNotionAISimulator() {
  const queryInput = document.getElementById('notion-query-input');
  const sendBtn = document.getElementById('notion-send-btn');
  const responseBox = document.getElementById('notion-response-box');

  if (!queryInput || !sendBtn || !responseBox) return;

  const responses = {
    "night audit": {
      th: "ขั้นตอน SOP Night Audit: 1. ตรวจสอบรอบบิล Micros POS และ FoodStory 2. รัน OperaCloud End-of-Day 3. กระทบยอด 3-Way Match เข้า Infor SunSystems อัตโนมัติ",
      en: "Night Audit SOP: 1. Verify POS batches across Micros & FoodStory. 2. Execute OperaCloud End-of-Day run. 3. Automatically balance 3-Way Match into Infor SunSystems ledger."
    },
    "emergency po": {
      th: "ขั้นตอนการขอซื้อฉุกเฉิน (Emergency PR/PO): เปิดระบบ MSG Mobile > เลือกประเภทเร่งด่วน > แจ้งเตือน HOD อนุมัติผ่าน LINE/App ภายใน 15 นาที",
      en: "Emergency PR/PO Workflow: Open MSG Mobile Hub > Flag as Urgent > Auto-routes to HOD and Cost Controller for 1-click mobile approval in < 15 mins."
    },
    "default": {
      th: "Notion AI ค้นพบข้อมูลในคู่มือปฏิบัติการ (SOP): ระบบจะดึงข้อมูลตามคำค้นและเชื่อมโยงกับฐานข้อมูลพนักงานอย่างแม่นยำ",
      en: "Notion AI indexed procedure found: The system matches your natural language query with approved departmental SOPs."
    }
  };

  sendBtn.addEventListener('click', () => {
    const q = queryInput.value.toLowerCase().trim();
    if (!q) return;

    responseBox.innerHTML = `<span style="color:#38bdf8;"><i class="fa-solid fa-spinner fa-spin"></i> Querying Bilingual Notion AI Knowledge Base...</span>`;

    setTimeout(() => {
      let match = responses.default;
      if (q.includes('audit') || q.includes('night') || q.includes('ปิดวัน')) match = responses['night audit'];
      else if (q.includes('po') || q.includes('pr') || q.includes('ซื้อ')) match = responses['emergency po'];

      responseBox.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:8px;">
          <div style="background:rgba(16,185,129,0.1); border-left:3px solid #10b981; padding:8px 12px; border-radius:4px;">
            <strong style="color:#10b981; font-size:11px;">[THAI RESPONSE]</strong>
            <p style="font-size:12px; color:#cbd5e1; margin-top:2px;">${match.th}</p>
          </div>
          <div style="background:rgba(56,189,248,0.1); border-left:3px solid #38bdf8; padding:8px 12px; border-radius:4px;">
            <strong style="color:#38bdf8; font-size:11px;">[ENGLISH RESPONSE]</strong>
            <p style="font-size:12px; color:#cbd5e1; margin-top:2px;">${match.en}</p>
          </div>
        </div>
      `;
    }, 600);
  });
}

// 8. Presentation Timer
function initPresentationTimer() {
  const timerText = document.getElementById('presentation-timer-display');
  if (!timerText) return;

  let seconds = 30 * 60; // 30 minutes
  setInterval(() => {
    if (seconds > 0) seconds--;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerText.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, 1000);
}

// 9. Database Explorer (36 Tables & 52 RLS Policies)
function initDatabaseExplorer() {
  const filterInput = document.getElementById('db-filter-input');
  const tableContainer = document.getElementById('db-tables-list');
  if (!filterInput || !tableContainer) return;

  const modules = [
    { name: 'restaurants', module: 'Governance', desc: 'Multi-branch configuration, VAT inclusive/exclusive rates, tax IDs' },
    { name: 'restaurant_staff', module: 'Governance', desc: 'Staff roles, PINs, multi-tenant branch permissions' },
    { name: 'action_logs', module: 'Governance', desc: 'Immutable security audit trail of every employee operation' },
    { name: 'categories', module: 'Menu Engine', desc: 'Dynamic menu category trees with multi-language sorting' },
    { name: 'menu_items', module: 'Menu Engine', desc: 'Dishes, barcodes, scale tare weights, base pricing' },
    { name: 'modifier_groups', module: 'Menu Engine', desc: 'Add-ons, noodle types, spicy levels, broth choices' },
    { name: 'orders', module: 'Transactions', desc: 'Atomic order records, bill sequence, customer tracking' },
    { name: 'order_payments', module: 'Transactions', desc: 'PromptPay QR, Beam gateway, cash, split payments' },
    { name: 'inventory_stock', module: 'Supply Chain', desc: 'Real-time stock balance per branch in grams and units' },
    { name: 'product_ingredients', module: 'Supply Chain', desc: 'Recipe mappings for automated atomic inventory decrement' },
    { name: 'shifts', module: 'Financials', desc: 'Cash float tracking, drawer opening/closing, X/Z reports' },
    { name: 'accounting_ledgers', module: 'Financials', desc: 'Double-entry general ledger journal posting' },
    { name: 'tables', module: 'Dine-In', desc: 'Interactive floor plan layout and live seating state' },
    { name: 'members', module: 'Loyalty', desc: 'Customer phone lookup, milestone bowl count rewards' }
  ];

  function render(filter = '') {
    const filtered = modules.filter(m => m.name.includes(filter) || m.module.toLowerCase().includes(filter) || m.desc.toLowerCase().includes(filter));
    tableContainer.innerHTML = filtered.map(m => `
      <div style="background:rgba(15,23,42,0.8); border:1px solid var(--border-subtle); padding:10px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <code style="color:#38bdf8; font-weight:700; font-size:12px;">${m.name}</code>
          <p style="font-size:11px; color:#94a3b8; margin-top:2px;">${m.desc}</p>
        </div>
        <span class="pod-badge" style="font-size:9px;">${m.module}</span>
      </div>
    `).join('');
  }

  filterInput.addEventListener('input', (e) => render(e.target.value.toLowerCase().trim()));
  render();
}

// 10. Tang Tang 4-Systems Live Interactive Architecture Simulator
function initTangTangSimulator() {
  const btnKiosk1 = document.getElementById('btn-sim-kiosk1');
  const btnKiosk2 = document.getElementById('btn-sim-kiosk2');
  const btnBump = document.getElementById('btn-sim-bump');
  const btnAuto = document.getElementById('btn-sim-autostream');
  const autoLabel = document.getElementById('autostream-label');
  const ticker = document.getElementById('ticker-text');
  const latencyMetric = document.getElementById('sim-latency-metric');
  const kdsCounter = document.getElementById('kds-ticket-counter');
  const tvCounter = document.getElementById('tv-ready-counter');

  const nodeKiosk1 = document.getElementById('node-kiosk-1');
  const nodeKiosk2 = document.getElementById('node-kiosk-2');
  const nodeCloud = document.getElementById('node-cloud-core');
  const nodeKds = document.getElementById('node-kds');
  const nodeTv = document.getElementById('node-tv-queue');

  let cookingCount = 2;
  let readyCount = 1;
  let orderSeq = 108;
  let autoInterval = null;

  function playChime(freq = 880, type = 'sine', duration = 0.15) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch(e) {}
  }

  function triggerKioskOrder(kioskNum, item, weight = '') {
    const nodeKiosk = kioskNum === 1 ? nodeKiosk1 : nodeKiosk2;
    orderSeq++;
    const orderId = `A${orderSeq}`;
    cookingCount++;
    const lat = Math.floor(Math.random() * 12) + 20;

    if (nodeKiosk) nodeKiosk.classList.add('active-pulse');
    if (latencyMetric) latencyMetric.textContent = `${lat}ms`;

    playChime(659, 'triangle', 0.12);

    setTimeout(() => {
      if (nodeKiosk) nodeKiosk.classList.remove('active-pulse');
      if (nodeCloud) nodeCloud.classList.add('active-pulse');
      playChime(880, 'sine', 0.15);

      setTimeout(() => {
        if (nodeCloud) nodeCloud.classList.remove('active-pulse');
        if (nodeKds) nodeKds.classList.add('active-pulse');
        if (kdsCounter) kdsCounter.textContent = `${cookingCount} Cooking`;

        playChime(1046, 'sine', 0.2);

        if (ticker) {
          ticker.innerHTML = `<strong>[KIOSK ${kioskNum}]</strong> Order #${orderId} (${item} ${weight}) &rarr; <code>deduct_inventory_on_payment()</code> &rarr; <span style="color:#10b981;">Dispatched to React 19 KDS in ${lat}ms</span>.`;
        }

        setTimeout(() => {
          if (nodeKds) nodeKds.classList.remove('active-pulse');
        }, 600);
      }, 250);
    }, 200);
  }

  function triggerKitchenBump() {
    if (cookingCount > 0) cookingCount--;
    readyCount++;
    const readyOrderId = `A${orderSeq - 1 > 100 ? orderSeq - 1 : 105}`;
    const lat = Math.floor(Math.random() * 8) + 18;

    if (nodeKds) nodeKds.classList.add('active-pulse');

    setTimeout(() => {
      if (nodeKds) nodeKds.classList.remove('active-pulse');
      if (nodeCloud) nodeCloud.classList.add('active-pulse');

      setTimeout(() => {
        if (nodeCloud) nodeCloud.classList.remove('active-pulse');
        if (nodeTv) nodeTv.classList.add('active-pulse');
        if (kdsCounter) kdsCounter.textContent = `${cookingCount} Cooking`;
        if (tvCounter) tvCounter.textContent = `${readyCount} Ready`;

        playChime(1318, 'sine', 0.35);

        if (ticker) {
          ticker.innerHTML = `<strong>[KITCHEN KDS]</strong> Order #${readyOrderId} marked READY &rarr; <span style="color:#818cf8;">Next.js TV Board Web Speech Voice Broadcast (${lat}ms)</span>.`;
        }

        try {
          if ('speechSynthesis' in window) {
            const utter = new SpeechSynthesisUtterance(`Order ${readyOrderId} is ready for pickup`);
            utter.rate = 1.05;
            utter.volume = 0.6;
            window.speechSynthesis.speak(utter);
          }
        } catch(e) {}

        setTimeout(() => {
          if (nodeTv) nodeTv.classList.remove('active-pulse');
        }, 800);
      }, 200);
    }, 200);
  }

  if (btnKiosk1) {
    btnKiosk1.addEventListener('click', () => triggerKioskOrder(1, 'Signature Mala Tang', '620g'));
  }

  if (btnKiosk2) {
    btnKiosk2.addEventListener('click', () => triggerKioskOrder(2, 'Fried Egg Noodles', '+ Chrysanthemum Tea'));
  }

  if (btnBump) {
    btnBump.addEventListener('click', triggerKitchenBump);
  }

  if (btnAuto) {
    btnAuto.addEventListener('click', () => {
      if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
        btnAuto.classList.remove('running');
        if (autoLabel) autoLabel.textContent = 'Run Realtime Telemetry Demo';
        if (ticker) ticker.textContent = 'SYSTEM READY: Listening for WebSocket events on 36 PostgreSQL tables (Latency: 26ms)...';
      } else {
        btnAuto.classList.add('running');
        if (autoLabel) autoLabel.textContent = 'Stop Telemetry Demo';
        let step = 0;
        autoInterval = setInterval(() => {
          if (step % 3 === 0) triggerKioskOrder(1, 'Mala Tang Bowl', `${450 + Math.floor(Math.random() * 300)}g`);
          else if (step % 3 === 1) triggerKioskOrder(2, 'Braised Pork Rice', 'Combo Set');
          else triggerKitchenBump();
          step++;
        }, 2200);
      }
    });
  }
}

// 11. AI Yield Management & Market Demand Forecasting Simulator
function initForecastingSimulator() {
  const seasonSelect = document.getElementById('forecast-season-select');
  const marketSelect = document.getElementById('forecast-market-select');
  const pacingSlider = document.getElementById('forecast-pacing-slider');
  const pacingVal = document.getElementById('forecast-pacing-val');

  const occDisplay = document.getElementById('fc-occupancy-display');
  const adrDisplay = document.getElementById('fc-adr-display');
  const revDisplay = document.getElementById('fc-revenue-display');
  const revparDisplay = document.getElementById('fc-revpar-display');
  const actionText = document.getElementById('fc-action-text');

  if (!seasonSelect || !marketSelect || !pacingSlider) return;

  const marketProfiles = {
    europe: {
      name: 'European Long-Haul',
      baseAdr: 7200,
      leadDays: 75,
      fnbSpaMult: 1.35,
      action: 'High European forward demand detected. Restricting low-yield OTA allotments; reserving 40% beachfront pool villas for direct channel packages with inclusive airport transfers and Babou dining credits.'
    },
    china: {
      name: 'East Asia (China/HK/KR/TW)',
      baseAdr: 6800,
      leadDays: 18,
      fnbSpaMult: 1.28,
      action: 'Compressed 18-day Asian booking surge identified. Activating WeChat Pay & Alipay dynamic promotions across Tang Tang & Nanyuan; auto-stepping villa rates +16% for holiday dates.'
    },
    domestic: {
      name: 'Domestic Thailand & ASEAN',
      baseAdr: 5400,
      leadDays: 5,
      fnbSpaMult: 1.18,
      action: 'Short-lead domestic weekend pattern detected. Triggering targeted LINE Official & direct guest club perks; unlocking spa & beach club voucher packages to maximize non-room spend.'
    },
    mideast: {
      name: 'Middle East & Australia',
      baseAdr: 8800,
      leadDays: 45,
      fnbSpaMult: 1.45,
      action: 'High-net-worth multi-bedroom villa long-stay queries surging. Locking premium oceanfront inventory with bespoke private yacht excursions and in-villa private chef packages.'
    }
  };

  const seasonMultipliers = {
    peak: { adrMult: 1.35, occBase: 78 },
    high: { adrMult: 1.18, occBase: 65 },
    shoulder: { adrMult: 1.0, occBase: 52 },
    green: { adrMult: 0.85, occBase: 44 }
  };

  function update() {
    const season = seasonSelect.value;
    const market = marketSelect.value;
    const pacing = parseInt(pacingSlider.value);

    pacingVal.textContent = `${pacing}% Reserved (45 Days Out)`;

    const prof = marketProfiles[market] || marketProfiles.europe;
    const seas = seasonMultipliers[season] || seasonMultipliers.high;

    // Calculate final forecasted occupancy
    const finalOcc = Math.min(98.5, (pacing * 0.75) + (seas.occBase * 0.55)).toFixed(1);

    // Calculate dynamic ADR step
    let occStepMult = 1.0;
    if (finalOcc > 90) occStepMult = 1.28;
    else if (finalOcc > 80) occStepMult = 1.18;
    else if (finalOcc > 70) occStepMult = 1.08;

    const dynamicAdr = Math.round(prof.baseAdr * seas.adrMult * occStepMult);
    const totalRooms = 136; // Total rooms across both resorts (57 Spa + 79 Villas)
    const daysInMonth = 30;

    const monthlyRoomsRev = Math.round(totalRooms * daysInMonth * (finalOcc / 100) * dynamicAdr);
    const ancillarySpend = Math.round(monthlyRoomsRev * 0.28 * prof.fnbSpaMult);
    const totalMonthlyRev = monthlyRoomsRev + ancillarySpend;
    const revpar = Math.round(dynamicAdr * (finalOcc / 100));

    if (occDisplay) occDisplay.textContent = `${finalOcc}%`;
    if (adrDisplay) adrDisplay.textContent = `฿${dynamicAdr.toLocaleString()} THB`;
    if (revDisplay) revDisplay.textContent = `฿${totalMonthlyRev.toLocaleString()} THB`;
    if (revparDisplay) revparDisplay.textContent = `฿${revpar.toLocaleString()}`;
    if (actionText) actionText.textContent = prof.action;
  }

  seasonSelect.addEventListener('change', update);
  marketSelect.addEventListener('change', update);
  pacingSlider.addEventListener('input', update);
  update();
}


// 12. Geo-Targeted Seasonality Filter Engine
function initGeoSeasonalityFilter() {
  const filterSelect = document.getElementById('geo-season-filter');
  const table = document.getElementById('geo-market-table');
  if (!filterSelect || !table) return;

  const tbody = table.querySelector('tbody');
  if (!tbody) return;

  const seasonDatasets = {
    all: {
      title: "Full Year Consolidated (12 Months)",
      badgeColor: "#38bdf8",
      totalRev: "฿248.5M YTD",
      avgStay: "7.16 Nights",
      avgAdr: "฿8,340",
      aiRecommendation: "<strong>AI Seasonality Strategy:</strong> Core European long-stay baseline (31.5%) provides strong base occupancy; deploy Xiaohongshu & Douyin digital campaigns 45 days prior to Chinese Golden Weeks to capture high-margin direct villas.",
      rows: [
        { market: "🇬🇧 UK & Western Europe", rev: "฿78.4M", share: "31.5%", stay: "11.4 Nights", adr: "฿8,850", flight: "Daily 14 USM", badge: "pod-badge" },
        { market: "🇨🇳 China & East Asia", rev: "฿64.2M", share: "25.8%", stay: "5.8 Nights", adr: "฿7,400", flight: "Direct HKG/CN", badge: "pod-badge" },
        { market: "🇹🇭 Domestic Thailand", rev: "฿48.6M", share: "19.6%", stay: "2.8 Nights", adr: "฿5,200", flight: "Weekend Spikes", badge: "pod-badge" },
        { market: "🇦🇪 Middle East & GCC", rev: "฿32.8M", share: "13.2%", stay: "8.2 Nights", adr: "฿12,400", flight: "Qatar/Emirates", badge: "pod-badge" },
        { market: "🇦🇺 Australia & Others", rev: "฿24.5M", share: "9.9%", stay: "7.6 Nights", adr: "฿7,900", flight: "SQ Transit", badge: "pod-badge" }
      ]
    },
    high: {
      title: "High & Peak Season (Nov – Feb / Jul – Aug)",
      badgeColor: "#10b981",
      totalRev: "฿152.8M (5 Months)",
      avgStay: "8.08 Nights",
      avgAdr: "฿10,580",
      aiRecommendation: "<strong>AI High-Season Strategy:</strong> Flight load factors into Samui Airport exceed 94%. AI enforces strict ADR rate-stepping (+18% to +25%) and minimum 3-night stay restrictions to maximize RevPAG and Gross Operating Profit.",
      rows: [
        { market: "🇬🇧 UK & Western Europe", rev: "฿56.2M", share: "36.8%", stay: "13.2 Nights", adr: "฿11,200", flight: "Peak Flight Load (96%)", badge: "pod-badge" },
        { market: "🇨🇳 China & East Asia", rev: "฿39.8M", share: "26.1%", stay: "6.4 Nights", adr: "฿9,800", flight: "CNY Charter Surge", badge: "pod-badge" },
        { market: "🇦🇪 Middle East & GCC", rev: "฿24.6M", share: "16.1%", stay: "9.5 Nights", adr: "฿15,600", flight: "Luxury Pool Villas", badge: "pod-badge" },
        { market: "🇹🇭 Domestic Thailand", rev: "฿18.4M", share: "12.1%", stay: "2.5 Nights", adr: "฿6,800", flight: "Festive Holidays", badge: "pod-badge" },
        { market: "🇦🇺 Australia & Others", rev: "฿13.8M", share: "8.9%", stay: "8.8 Nights", adr: "฿9,500", flight: "Winter Escape", badge: "pod-badge" }
      ]
    },
    green: {
      title: "Green & Shoulder Season (Mar – Jun / Sep – Oct)",
      badgeColor: "#f59e0b",
      totalRev: "฿95.7M (7 Months)",
      avgStay: "6.24 Nights",
      avgAdr: "฿6,520",
      aiRecommendation: "<strong>AI Green-Season Strategy:</strong> Domestic Thailand market surges to 31.6% share. AI dynamically bundles dining vouchers (Babou & Tang Tang) and spa credits into direct packages on LINE Official to sustain 72%+ base occupancy.",
      rows: [
        { market: "🇹🇭 Domestic Thailand", rev: "฿30.2M", share: "31.6%", stay: "3.1 Nights", adr: "฿4,600", flight: "Songkran & Weekends", badge: "pod-badge" },
        { market: "🇨🇳 China & East Asia", rev: "฿24.4M", share: "25.5%", stay: "5.2 Nights", adr: "฿5,800", flight: "Group FIT Packages", badge: "pod-badge" },
        { market: "🇬🇧 UK & Western Europe", rev: "฿22.2M", share: "23.2%", stay: "9.6 Nights", adr: "฿6,900", flight: "Long-Stay Retirees", badge: "pod-badge" },
        { market: "🇦🇺 Australia & Others", rev: "฿10.7M", share: "11.2%", stay: "6.8 Nights", adr: "฿6,400", flight: "Direct Perth/Sydney", badge: "pod-badge" },
        { market: "🇦🇪 Middle East & GCC", rev: "฿8.2M", share: "8.5%", stay: "6.5 Nights", adr: "฿8,900", flight: "Post-Ramadan FIT", badge: "pod-badge" }
      ]
    }
  };

  function renderSeasonData(seasonKey) {
    const data = seasonDatasets[seasonKey] || seasonDatasets.all;

    // Smooth opacity transition
    tbody.style.opacity = '0';
    tbody.style.transition = 'opacity 0.25s ease';

    setTimeout(() => {
      tbody.innerHTML = data.rows.map(r => `
        <tr style="transition: background 0.2s ease;">
          <td><strong>${r.market}</strong></td>
          <td style="color: #f8fafc; font-weight: 700;">${r.rev}</td>
          <td><span style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;">${r.share}</span></td>
          <td>${r.stay}</td>
          <td style="color: #10b981; font-weight: 600;">${r.adr}</td>
          <td><span class="${r.badge}">${r.flight}</span></td>
        </tr>
      `).join('');

      tbody.style.opacity = '1';

      // Update strategic guidance alert if element exists
      const aiAlertBox = document.getElementById('geo-ai-strategy-alert');
      if (aiAlertBox) {
        aiAlertBox.innerHTML = data.aiRecommendation;
        aiAlertBox.style.borderLeftColor = data.badgeColor;
      }
    }, 150);
  }

  filterSelect.addEventListener('change', (e) => {
    renderSeasonData(e.target.value);
  });

  // Initial render with current selected value
  renderSeasonData(filterSelect.value || 'all');
}
