(() => {
  const DATA = window.PROJECT_DATA;
  const STORAGE_DONE = "int504_hub_pbi_done";
  const STORAGE_THEME = "int504_hub_theme";

  const VIEW_TITLES = {
    overview: "ภาพรวมโปรเจกต์ & ทีม",
    project: "รายละเอียดโค้ดจริงในโปรเจกต์ (int504-2026-project-group-44)",
    diagrams: "Excalidraw Diagrams (7 แผนภาพ)",
    lessons: "บทเรียน 7 บท (Sprint 1–3)",
    pbis: "Backlog PBI 1–12 & Checklist",
    api: "API Contracts & Database Schema",
    playground: "Interactive Lab & Simulators",
    quiz: "แบบทดสอบทบทวน INT504 (12 ข้อ)",
    resources: "คลังคลิปสอน & คำสั่งลัด",
  };

  const state = {
    view: "overview",
    activeLesson: DATA.lessons[0].id,
    fileLayer: "all",
    fileQuery: "",
    pbiSprint: "all",
    pbiOwner: "all",
    pbiQuery: "",
    apiSprint: "all",
    apiQuery: "",
    donePbis: loadDoneSet(),
    quizAnswers: {},
    theme: localStorage.getItem(STORAGE_THEME) || "light",
  };

  const contentEl = document.getElementById("content");
  const topbarTitleEl = document.getElementById("topbar-title");
  const sidebarEl = document.getElementById("sidebar");
  const backdropEl = document.getElementById("backdrop");
  const menuBtn = document.getElementById("menu-btn");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIconEl = document.getElementById("theme-icon");
  const themeLabelEl = document.getElementById("theme-label");
  const progressTextEl = document.getElementById("progress-text");
  const progressFillEl = document.getElementById("progress-fill");
  const navPbiBadgeEl = document.getElementById("nav-pbi-badge");

  const diagramModal = document.getElementById("diagram-modal");
  const diagramModalTitle = document.getElementById("diagram-modal-title");
  const diagramModalImg = document.getElementById("diagram-modal-img");
  const diagramModalExcalidraw = document.getElementById("diagram-modal-excalidraw");
  const diagramModalSvg = document.getElementById("diagram-modal-svg");
  const diagramModalClose = document.getElementById("diagram-modal-close");

  function loadDoneSet() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_DONE) || "[]");
      return new Set(Array.isArray(parsed) ? parsed : []);
    } catch {
      return new Set();
    }
  }

  function saveDoneSet() {
    localStorage.setItem(STORAGE_DONE, JSON.stringify([...state.donePbis]));
    updateProgressUI();
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function diagramSvgPath(id) {
    return `./diagrams/${id}-${state.theme === "dark" ? "dark" : "light"}.svg`;
  }

  function diagramScenePath(id) {
    return `./diagrams/${id}.excalidraw`;
  }

  function applyTheme(theme) {
    state.theme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", state.theme);
    localStorage.setItem(STORAGE_THEME, state.theme);
    themeIconEl.textContent = state.theme === "dark" ? "☀️" : "🌙";
    themeLabelEl.textContent = state.theme === "dark" ? "โหมดสว่าง" : "โหมดมืด";

    // Swap any visible Excalidraw diagram images immediately
    document.querySelectorAll("img[data-diagram-id]").forEach((img) => {
      img.src = diagramSvgPath(img.dataset.diagramId);
    });
    if (diagramModal.open && diagramModalImg.dataset.diagramId) {
      const id = diagramModalImg.dataset.diagramId;
      diagramModalImg.src = diagramSvgPath(id);
      diagramModalSvg.href = diagramSvgPath(id);
    }
  }

  function updateProgressUI() {
    const done = state.donePbis.size;
    const total = DATA.pbis.length;
    const pct = Math.round((done / total) * 100);
    progressTextEl.textContent = `${done} / ${total}`;
    progressFillEl.style.width = `${pct}%`;
    navPbiBadgeEl.textContent = `${done}/${total}`;
  }

  function closeMobileMenu() {
    sidebarEl.classList.remove("open");
    backdropEl.classList.remove("show");
  }

  function openDiagramLightbox(diagram) {
    const svgPath = diagramSvgPath(diagram.id);
    diagramModalTitle.textContent = diagram.title;
    diagramModalImg.dataset.diagramId = diagram.id;
    diagramModalImg.src = svgPath;
    diagramModalExcalidraw.href = diagramScenePath(diagram.id);
    diagramModalExcalidraw.download = `${diagram.id}.excalidraw`;
    diagramModalSvg.href = svgPath;
    diagramModalSvg.download = `${diagram.id}-${state.theme}.svg`;
    diagramModal.showModal();
  }

  function renderCodeBlock(label, code) {
    return `
      <div class="code-wrap">
        <div class="code-head">
          <span class="mono">${escapeHtml(label)}</span>
          <button type="button" class="copy-btn" data-copy="${escapeHtml(code)}">คัดลอก</button>
        </div>
        <pre><code>${escapeHtml(code)}</code></pre>
      </div>
    `;
  }

  function renderDiagramCard(diagram) {
    const svgPath = diagramSvgPath(diagram.id);
    const scenePath = diagramScenePath(diagram.id);
    return `
      <article class="diagram-card">
        <div class="diagram-head">
          <div>
            <div class="diagram-title">${escapeHtml(diagram.title)}</div>
            <div class="diagram-desc">${escapeHtml(diagram.desc)}</div>
          </div>
          <div class="diagram-actions">
            <span class="badge badge-indigo">${escapeHtml(diagram.sprint)}</span>
            <button type="button" class="btn btn-sm" data-zoom-diagram="${escapeHtml(diagram.id)}">ขยายเต็มจอ</button>
            <a class="btn btn-sm" href="${escapeHtml(scenePath)}" download="${escapeHtml(diagram.id)}.excalidraw">.excalidraw</a>
          </div>
        </div>
        <div class="diagram-stage" data-zoom-diagram="${escapeHtml(diagram.id)}" title="คลิกเพื่อขยาย">
          <img data-diagram-id="${escapeHtml(diagram.id)}" src="${escapeHtml(svgPath)}" alt="${escapeHtml(diagram.title)}" loading="lazy">
        </div>
      </article>
    `;
  }

  function sprintBadge(sprint) {
    if (sprint === 1) return `<span class="badge badge-sky">Sprint 1</span>`;
    if (sprint === 2) return `<span class="badge badge-indigo">Sprint 2</span>`;
    return `<span class="badge badge-amber">Sprint 3</span>`;
  }

  function ownerBadge(name) {
    const cls = name === "Alan" ? "badge-indigo" : name === "Beam" ? "badge-emerald" : "badge-amber";
    return `<span class="badge ${cls}">${escapeHtml(name)}</span>`;
  }

  /* ==================== VIEW 1: OVERVIEW ==================== */
  function renderOverview() {
    const { meta, timeline, teamRoles } = DATA;
    const archDiagram = DATA.diagrams[0];
    return `
      <section class="hero">
        <div class="hero-eyebrow">🎓 ${escapeHtml(meta.course)} · ${escapeHtml(meta.semester)}</div>
        <h1>${escapeHtml(meta.project)}</h1>
        <p>ศูนย์รวมความรู้ โครงสร้างระบบ แผนภาพ Excalidraw, API Contracts, ฐานข้อมูล, Interactive Simulators และแบบทดสอบ ครบตั้งแต่ Sprint 1 ถึง Sprint 3 (PBI 1–12)</p>
        <div class="hero-pills">
          ${meta.stack.map((s) => `<span class="hero-pill">${escapeHtml(s)}</span>`).join("")}
        </div>
      </section>

      <section class="grid-4">
        <div class="stat-card">
          <div class="stat-label">Product Backlog</div>
          <div class="stat-value">12 PBIs</div>
          <div class="stat-sub">Sprint 1 (2) · Sprint 2 (5) · Sprint 3 (5)</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">ข้อมูลตั้งต้นใน DB</div>
          <div class="stat-value">51 / 97</div>
          <div class="stat-sub">51 วิชา · 92→97 Schedules · 1,181 Sessions</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Deployment</div>
          <div class="stat-value">4 Containers</div>
          <div class="stat-sub">Proxy · Frontend · Backend · MySQL</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Team Code / Path</div>
          <div class="stat-value mono" style="font-size:1.15rem">${escapeHtml(meta.teamCode)}</div>
          <div class="stat-sub mono">${escapeHtml(meta.publicPathNote)}</div>
        </div>
      </section>

      <section class="section-block">
        ${renderDiagramCard(archDiagram)}
      </section>

      <section class="grid-2 section-block">
        <div class="card">
          <h3 class="card-title">📅 กำหนดการวิชาและ Snapshot</h3>
          <div class="timeline">
            ${timeline
              .map(
                (t) => `
              <div class="timeline-item">
                <div class="timeline-date">${escapeHtml(t.date)} · ${escapeHtml(t.sprint)}</div>
                <div class="timeline-text">${escapeHtml(t.text)}</div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        <div class="card">
          <h3 class="card-title">⚡ กฎสำคัญที่ต้องจำให้แม่น</h3>
          <div class="callout callout-warn">
            <strong>TEAM-CODE vs TEAM-PATH:</strong> Public URL และ Nginx ใช้ <code class="inline-code">TEAM-PATH</code> ส่วน <code class="inline-code">/api/v1/health</code>, Keycloak <code class="inline-code">clientId</code> และ JWT <code class="inline-code">azp</code> ใช้ <code class="inline-code">TEAM-CODE</code>
          </div>
          <div class="callout">
            <strong>Frontend Source vs Bundle:</strong> แก้ไฟล์ใน <code class="inline-code">frontend/scripts/</code> แล้วรัน <code class="inline-code">npm run build:js</code> ห้ามแก้ <code class="inline-code">frontend/my-schedule.js</code> ด้วยมือ
          </div>
          <div class="callout callout-ok">
            <strong>Definition of Done:</strong> Gate และทุก Test Case ของ PBI (รวม PBI เก่า Sprint 1–2) ต้องผ่านบนระบบที่ Deploy จริงผ่าน Run Now / Snapshot
          </div>
          <div style="margin-top:1rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn btn-primary" data-jump-view="project" type="button">ดูรายละเอียดโค้ดจริงในโปรเจกต์ →</button>
            <button class="btn" data-jump-view="diagrams" type="button">ดู Excalidraw ทั้ง 7 ภาพ</button>
            <button class="btn" data-jump-view="playground" type="button">ลองเล่น Interactive Lab</button>
          </div>
        </div>
      </section>

      <section class="card section-block">
        <h3 class="card-title">👥 การแบ่งงานทีม 3 คน (Sprint 1 – Sprint 3)</h3>
        <div class="grid-3">
          ${teamRoles
            .map(
              (m) => `
            <div class="card" style="box-shadow:none; background:var(--bg-subtle);">
              <div style="margin-bottom:0.65rem;">${ownerBadge(m.name)}</div>
              <p style="font-size:0.83rem; margin:0.4rem 0;"><strong>Sprint 1:</strong> ${escapeHtml(m.sprint1)}</p>
              <p style="font-size:0.83rem; margin:0.4rem 0;"><strong>Sprint 2:</strong> ${escapeHtml(m.sprint2)}</p>
              <p style="font-size:0.83rem; margin:0.4rem 0 0;"><strong>Sprint 3:</strong> ${escapeHtml(m.sprint3)}</p>
            </div>
          `,
            )
            .join("")}
        </div>
      </section>
    `;
  }

  /* ==================== VIEW 1.5: PROJECT INFO (REAL CODEBASE) ==================== */
  function fileStatusBadge(status) {
    if (status === "existing") return `<span class="badge badge-emerald">มีใน Repo แล้ว</span>`;
    if (status === "sprint3-edit") return `<span class="badge badge-amber">มีแล้ว · แก้เพิ่ม S3</span>`;
    return `<span class="badge badge-rose">สร้างใหม่ S3</span>`;
  }

  function renderProjectInfo() {
    const info = DATA.projectInfo;
    const fileMapDiagram = DATA.diagrams.find((d) => d.id === "07-project-file-map");
    const q = state.fileQuery.trim().toLowerCase();
    const filteredFiles = info.files.filter((f) => {
      if (state.fileLayer !== "all" && f.layer !== state.fileLayer) return false;
      if (q && !`${f.path} ${f.owner} ${f.exports} ${f.desc}`.toLowerCase().includes(q)) return false;
      return true;
    });

    const layerLabels = [
      ["all", `ทั้งหมด (${info.files.length})`],
      ["backend", "Backend"],
      ["frontend", "Frontend"],
      ["prisma", "Prisma/DB"],
      ["infra", "Docker/Nginx"],
      ["sprint3", "สร้างใหม่ Sprint 3"],
    ];

    return `
      <section class="grid-4">
        <div class="stat-card">
          <div class="stat-label">Repository</div>
          <div class="stat-value mono" style="font-size:1rem;">${escapeHtml(info.repoName)}</div>
          <div class="stat-sub">Compose project: <code class="inline-code">${escapeHtml(info.composeName)}</code></div>
        </div>
        <div class="stat-card">
          <div class="stat-label">HEAD ล่าสุดบน main</div>
          <div class="stat-value mono" style="font-size:1.15rem;">5e30ae0</div>
          <div class="stat-sub">Sprint 1–2 ครบ · แยกโมดูล frontend/scripts/ แล้ว</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Prisma Migrations</div>
          <div class="stat-value">4 ไฟล์</div>
          <div class="stat-sub">5 Models · 51 Courses · 92 Schedules</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Keycloak Client</div>
          <div class="stat-value mono" style="font-size:1.1rem;">${escapeHtml(info.keycloak.clientId)}</div>
          <div class="stat-sub">realm: ${escapeHtml(info.keycloak.realm)} · ${escapeHtml(info.keycloak.pkce)}</div>
        </div>
      </section>

      <section class="section-block">
        ${renderDiagramCard(fileMapDiagram)}
      </section>

      <section class="card section-block">
        <h3 class="card-title">📁 แผนที่ไฟล์จริงใน Repo & จุดที่ต้องแก้/เพิ่มใน Sprint 3</h3>
        <div class="filter-bar" style="margin-top:0.75rem;">
          <div class="chip-group">
            ${layerLabels
              .map(
                ([key, label]) =>
                  `<button type="button" class="chip ${state.fileLayer === key ? "active" : ""}" data-file-layer="${key}">${escapeHtml(label)}</button>`,
              )
              .join("")}
          </div>
          <input type="search" id="file-search" class="input search-input" placeholder="ค้นหาชื่อไฟล์, ฟังก์ชัน หรือชื่อเจ้าของงาน..." value="${escapeHtml(state.fileQuery)}">
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ไฟล์</th>
                <th>สถานะ</th>
                <th>ผู้ดูแล</th>
                <th>Exports / Functions</th>
                <th>หน้าที่และสิ่งที่ต้องทำต่อใน Sprint 3</th>
              </tr>
            </thead>
            <tbody>
              ${filteredFiles
                .map(
                  (f) => `
                <tr>
                  <td class="mono" style="font-weight:700; font-size:0.8rem; white-space:nowrap;">${escapeHtml(f.path)}</td>
                  <td>${fileStatusBadge(f.status)}</td>
                  <td style="white-space:nowrap;">${escapeHtml(f.owner)}</td>
                  <td class="mono" style="font-size:0.76rem; color:var(--accent-text);">${escapeHtml(f.exports)}</td>
                  <td style="font-size:0.83rem; color:var(--text-secondary);">${escapeHtml(f.desc)}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>

      <section class="grid-2 section-block">
        <div class="card">
          <h3 class="card-title">🐳 Docker Compose (compose.yaml — 4 Containers)</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Service</th><th>Image / Build</th><th>Ports & Healthcheck</th><th>หน้าที่</th></tr></thead>
              <tbody>
                ${info.containers
                  .map(
                    (c) => `
                  <tr>
                    <td class="mono" style="font-weight:700;">${escapeHtml(c.name)}</td>
                    <td class="mono" style="font-size:0.78rem;">${escapeHtml(c.image)}</td>
                    <td style="font-size:0.78rem;"><div class="mono">${escapeHtml(c.ports)}</div><div style="color:var(--text-muted);">${escapeHtml(c.health)}</div></td>
                    <td style="font-size:0.82rem; color:var(--text-secondary);">${escapeHtml(c.role)}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <h3 class="card-title">🔀 Nginx Reverse Proxy (nginx/default.conf.template)</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Location Match</th><th>Proxy / Redirect</th><th>หมายเหตุ</th></tr></thead>
              <tbody>
                ${info.nginxRoutes
                  .map(
                    (r) => `
                  <tr>
                    <td class="mono" style="font-size:0.76rem; font-weight:600;">${escapeHtml(r.match)}</td>
                    <td class="mono" style="font-size:0.76rem; color:var(--accent-text);">${escapeHtml(r.target)}</td>
                    <td style="font-size:0.81rem; color:var(--text-secondary);">${escapeHtml(r.note)}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="grid-2 section-block">
        <div class="card">
          <h3 class="card-title">📦 Dependencies ใน package.json</h3>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Package</th><th>Version</th><th>หน้าที่ในโปรเจกต์</th></tr></thead>
              <tbody>
                ${info.packages
                  .map(
                    (p) => `
                  <tr>
                    <td class="mono" style="font-weight:700;">${escapeHtml(p.name)}</td>
                    <td class="mono" style="font-size:0.8rem;">${escapeHtml(p.version)}</td>
                    <td style="font-size:0.82rem; color:var(--text-secondary);">${escapeHtml(p.role)}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <h3 class="card-title">🧬 ประวัติ Prisma Migrations (prisma/migrations/)</h3>
          <div class="timeline">
            ${info.migrations
              .map(
                (m) => `
              <div class="timeline-item">
                <div class="timeline-date mono">${escapeHtml(m.id)} · Sprint ${m.sprint}</div>
                <div class="timeline-text">${escapeHtml(m.desc)}</div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="card section-block">
        <h3 class="card-title">⚙️ NPM Scripts จริงใน package.json</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Script</th><th>คำสั่งจริง</th><th>หน้าที่</th></tr></thead>
            <tbody>
              ${info.scripts
                .map(
                  (s) => `
                <tr>
                  <td class="mono" style="font-weight:700; white-space:nowrap;">${escapeHtml(s.name)}</td>
                  <td class="mono" style="font-size:0.77rem;">${escapeHtml(s.cmd)}</td>
                  <td style="font-size:0.82rem; color:var(--text-secondary);">${escapeHtml(s.desc)}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  /* ==================== VIEW 2: DIAGRAMS ==================== */
  function renderDiagrams() {
    return `
      <section class="card" style="margin-bottom:1.25rem;">
        <h3 class="card-title">✏️ แผนภาพสถาปัตยกรรมและโฟลว์ทั้งหมด (เรนเดอร์ด้วย @excalidraw/cli)</h3>
        <p style="margin:0; font-size:0.9rem; color:var(--text-secondary);">
          ทุกแผนภาพสร้างจาก <code class="inline-code">@excalidraw/cli</code> พร้อมรองรับโหมดสว่าง/โหมดมืดอัตโนมัติ คลิกที่รูปเพื่อขยายเต็มจอ หรือดาวน์โหลดไฟล์ <code class="inline-code">.excalidraw</code> ไปเปิดแก้ไขต่อใน Excalidraw ได้เลยครับ
        </p>
      </section>
      ${DATA.diagrams.map(renderDiagramCard).join("")}
    `;
  }

  /* ==================== VIEW 3: LESSONS ==================== */
  function renderLessons() {
    const active = DATA.lessons.find((l) => l.id === state.activeLesson) || DATA.lessons[0];
    const relatedDiagrams = DATA.diagrams.filter((d) => d.lessonId === active.id);
    const activeIdx = DATA.lessons.findIndex((l) => l.id === active.id);
    const prevLesson = DATA.lessons[activeIdx - 1];
    const nextLesson = DATA.lessons[activeIdx + 1];

    const blocksHtml = active.blocks
      .map((b) => {
        if (b.type === "text") {
          return `<h4 style="margin:1.2rem 0 0.4rem; font-size:1rem;">${escapeHtml(b.heading)}</h4><p style="margin:0 0 0.75rem; color:var(--text-secondary); font-size:0.92rem;">${escapeHtml(b.body)}</p>`;
        }
        if (b.type === "callout") {
          const cls = b.tone === "warn" ? "callout callout-warn" : b.tone === "ok" ? "callout callout-ok" : "callout";
          return `<div class="${cls}"><strong>${escapeHtml(b.title)}:</strong> ${escapeHtml(b.body)}</div>`;
        }
        if (b.type === "code") {
          return renderCodeBlock(b.label, b.code);
        }
        if (b.type === "flow") {
          return `
            <div class="arch-flow">
              ${b.steps
                .map(
                  (s, i) => `
                <div class="arch-box">${escapeHtml(s.title)}<small>${escapeHtml(s.sub)}</small></div>
                ${i < b.steps.length - 1 ? `<span class="arch-arrow">→</span>` : ""}
              `,
                )
                .join("")}
            </div>
          `;
        }
        if (b.type === "table") {
          return `
            <div class="table-wrap" style="margin:0.85rem 0;">
              <table>
                <thead><tr>${b.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead>
                <tbody>
                  ${b.rows.map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join("")}</tr>`).join("")}
                </tbody>
              </table>
            </div>
          `;
        }
        return "";
      })
      .join("");

    return `
      <div class="lesson-layout">
        <aside class="lesson-nav" aria-label="Lesson list">
          ${DATA.lessons
            .map(
              (l) => `
            <button type="button" class="lesson-tab ${l.id === active.id ? "active" : ""}" data-lesson-id="${escapeHtml(l.id)}">
              <span class="lesson-tab-num">${escapeHtml(l.num)}</span>
              <span class="lesson-tab-title">${escapeHtml(l.title)}</span>
            </button>
          `,
            )
            .join("")}
        </aside>

        <div>
          <article class="card">
            <span class="badge badge-indigo">${escapeHtml(active.num)}</span>
            <h2 style="margin:0.5rem 0 0.25rem;">${escapeHtml(active.title)}</h2>
            <p style="margin:0 0 1rem; color:var(--text-muted); font-size:0.9rem;">${escapeHtml(active.subtitle)}</p>
            ${blocksHtml}
            <div style="display:flex; justify-content:space-between; gap:0.75rem; margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--border);">
              ${prevLesson ? `<button type="button" class="btn" data-lesson-id="${escapeHtml(prevLesson.id)}">← ${escapeHtml(prevLesson.num)}</button>` : "<span></span>"}
              ${nextLesson ? `<button type="button" class="btn btn-primary" data-lesson-id="${escapeHtml(nextLesson.id)}">${escapeHtml(nextLesson.num)}: ${escapeHtml(nextLesson.title)} →</button>` : `<button type="button" class="btn btn-primary" data-jump-view="quiz">ไปทำแบบทดสอบ 12 ข้อ →</button>`}
            </div>
          </article>

          ${
            relatedDiagrams.length
              ? `<div class="section-block">${relatedDiagrams.map(renderDiagramCard).join("")}</div>`
              : ""
          }
        </div>
      </div>
    `;
  }

  /* ==================== VIEW 4: PBI EXPLORER ==================== */
  function renderPbis() {
    const q = state.pbiQuery.trim().toLowerCase();
    const filtered = DATA.pbis.filter((p) => {
      if (state.pbiSprint !== "all" && String(p.sprint) !== state.pbiSprint) return false;
      if (state.pbiOwner !== "all" && !p.owners.includes(state.pbiOwner)) return false;
      if (q) {
        const hay = `${p.id} ${p.name} ${p.title} ${p.summary} ${p.details.join(" ")} ${p.traps.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    return `
      <div class="filter-bar">
        <div class="chip-group" role="group" aria-label="Filter Sprint">
          ${["all", "1", "2", "3"]
            .map(
              (s) =>
                `<button type="button" class="chip ${state.pbiSprint === s ? "active" : ""}" data-pbi-sprint="${s}">${s === "all" ? "ทุก Sprint" : `Sprint ${s}`}</button>`,
            )
            .join("")}
        </div>
        <div class="chip-group" role="group" aria-label="Filter Owner">
          ${["all", "Alan", "Beam", "Dragon"]
            .map(
              (o) =>
                `<button type="button" class="chip ${state.pbiOwner === o ? "active" : ""}" data-pbi-owner="${o}">${o === "all" ? "ทุกคน" : o}</button>`,
            )
            .join("")}
        </div>
        <input type="search" id="pbi-search" class="input search-input" placeholder="ค้นหา PBI, endpoint หรือเงื่อนไข..." value="${escapeHtml(state.pbiQuery)}">
      </div>

      ${
        filtered.length === 0
          ? `<div class="card" style="text-align:center; color:var(--text-muted);">ไม่พบ PBI ที่ตรงกับเงื่อนไข</div>`
          : filtered
              .map((p) => {
                const isDone = state.donePbis.has(p.id);
                return `
                  <article class="pbi-card ${isDone ? "done" : ""}" data-pbi-card="${escapeHtml(p.id)}">
                    <div class="pbi-header" data-toggle-pbi="${escapeHtml(p.id)}">
                      <input type="checkbox" class="pbi-check" data-check-pbi="${escapeHtml(p.id)}" ${isDone ? "checked" : ""} aria-label="Mark ${escapeHtml(p.id)} done">
                      <div class="pbi-title-wrap">
                        <div class="pbi-name">${escapeHtml(p.id)} · ${escapeHtml(p.name)} — ${escapeHtml(p.title)}</div>
                        <div class="pbi-summary">${escapeHtml(p.summary)}</div>
                      </div>
                      <div style="display:flex; gap:0.35rem; flex-wrap:wrap; align-items:center;">
                        ${sprintBadge(p.sprint)}
                        ${p.owners.map(ownerBadge).join("")}
                      </div>
                    </div>
                    <div class="pbi-body">
                      <div style="margin-bottom:0.7rem;"><span class="badge badge-neutral mono">Tests: ${escapeHtml(p.tests)}</span></div>
                      <strong>รายละเอียดหลัก:</strong>
                      <ul class="pbi-list">${p.details.map((d) => `<li>${escapeHtml(d)}</li>`).join("")}</ul>
                      <div class="callout callout-warn" style="margin-bottom:0;">
                        <strong>จุดที่ Tests ตรวจเป็นพิเศษ / ข้อควรระวัง:</strong>
                        <ul class="pbi-list" style="margin-bottom:0;">${p.traps.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
                      </div>
                    </div>
                  </article>
                `;
              })
              .join("")
      }
    `;
  }

  /* ==================== VIEW 5: API & DB ==================== */
  function renderApi() {
    const q = state.apiQuery.trim().toLowerCase();
    const filtered = DATA.apis.filter((a) => {
      if (state.apiSprint !== "all" && String(a.sprint) !== state.apiSprint) return false;
      if (q && !`${a.method} ${a.path} ${a.desc} ${a.owner}`.toLowerCase().includes(q)) return false;
      return true;
    });

    const erd = DATA.diagrams.find((d) => d.id === "03-database-erd");

    return `
      <div class="filter-bar">
        <div class="chip-group">
          ${["all", "1", "2", "3"]
            .map(
              (s) =>
                `<button type="button" class="chip ${state.apiSprint === s ? "active" : ""}" data-api-sprint="${s}">${s === "all" ? "ทุก Sprint" : `Sprint ${s}`}</button>`,
            )
            .join("")}
        </div>
        <input type="search" id="api-search" class="input search-input" placeholder="ค้นหา endpoint (เช่น selections, sessions, health)..." value="${escapeHtml(state.apiQuery)}">
      </div>

      ${filtered
        .map(
          (a) => `
        <article class="card" style="margin-bottom:0.9rem;">
          <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:0.5rem;">
            <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
              <span class="method method-${escapeHtml(a.method)}">${escapeHtml(a.method)}</span>
              <code class="mono" style="font-weight:700; font-size:0.9rem;">${escapeHtml(a.path)}</code>
            </div>
            <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
              ${sprintBadge(a.sprint)}
              <span class="badge ${a.auth === "Public" ? "badge-emerald" : "badge-rose"}">${escapeHtml(a.auth)}</span>
              <span class="badge badge-neutral">${escapeHtml(a.owner)}</span>
            </div>
          </div>
          <p style="margin:0.55rem 0; font-size:0.88rem; color:var(--text-secondary);">${escapeHtml(a.desc)}</p>
          <div style="display:flex; gap:0.35rem; flex-wrap:wrap; margin-bottom:0.5rem;">
            ${a.statuses.map((st) => `<span class="badge badge-neutral mono">${escapeHtml(st)}</span>`).join("")}
          </div>
          ${renderCodeBlock("Sample Payload / Response", a.sample)}
        </article>
      `,
        )
        .join("")}

      <section class="section-block">
        ${renderDiagramCard(erd)}
      </section>

      <section class="card section-block">
        <h3 class="card-title">🗄️ ตารางฐานข้อมูล MySQL / Prisma (Sprint 1–3)</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Table</th><th>Sprint</th><th>Rows</th><th>Keys / Constraints</th><th>Columns หลัก</th></tr>
            </thead>
            <tbody>
              ${DATA.dbTables
                .map(
                  (t) => `
                <tr>
                  <td class="mono" style="font-weight:700;">${escapeHtml(t.name)}</td>
                  <td>${sprintBadge(t.sprint)}</td>
                  <td>${escapeHtml(t.rows)}</td>
                  <td class="mono" style="font-size:0.78rem;">${escapeHtml(t.keys)}</td>
                  <td style="font-size:0.82rem; color:var(--text-secondary);">${escapeHtml(t.cols)}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  /* ==================== VIEW 6: PLAYGROUND ==================== */
  function renderPlayground() {
    return `
      <section class="card">
        <h3 class="card-title">🪪 Lab 1: Student ID Decoder Simulator (PBI 4)</h3>
        <p style="margin:0 0 0.75rem; font-size:0.88rem; color:var(--text-secondary);">
          จำลองการทำงานของ <code class="inline-code">GET /api/v1/students/{id}</code> โดยเทียบกับ <code class="inline-code">academic_settings</code> (ปี 2569, programCode <code class="inline-code">504504</code>) และ <code class="inline-code">student_group_ranges</code>
        </p>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.75rem;">
          <input id="sim-student-id" class="input mono" style="width:220px;" value="68504504010" maxlength="11" placeholder="รหัสนักศึกษา 11 หลัก">
          <button type="button" class="btn btn-sm" data-preset-id="68504504010">68504504010 (Y2 A)</button>
          <button type="button" class="btn btn-sm" data-preset-id="67504504066">67504504066 (Y3 B)</button>
          <button type="button" class="btn btn-sm" data-preset-id="69130500010">69130500010 (ผิดโปรแกรม)</button>
          <button type="button" class="btn btn-sm" data-preset-id="68504504136">68504504136 (เกินช่วง)</button>
        </div>
        <div id="sim-student-result" class="result-box"></div>
      </section>

      <section class="card">
        <h3 class="card-title">⚔️ Lab 2: Schedule Clash Checker Simulator (PBI 11)</h3>
        <p style="margin:0 0 0.5rem; font-size:0.88rem; color:var(--text-secondary);">
          ทดลองเปลี่ยนวัน, เวลา และช่วงสัปดาห์ของวิชา A และ B เพื่อดูเงื่อนไข 3 ข้อของ <code class="inline-code">409 schedule-clash</code>
        </p>
        <div class="grid-2">
          <div style="padding:0.9rem; border:1px solid var(--border); border-radius:10px;">
            <strong>วิชาที่มีอยู่แล้ว (Existing: A)</strong>
            <div class="sim-grid">
              <div class="field">
                <label for="clash-a-day">Day</label>
                <select id="clash-a-day" class="select">
                  ${["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"].map((d) => `<option value="${d}">${d}</option>`).join("")}
                </select>
              </div>
              <div class="field"><label for="clash-a-start">Start</label><input id="clash-a-start" class="input mono" type="time" value="09:30"></div>
              <div class="field"><label for="clash-a-end">End</label><input id="clash-a-end" class="input mono" type="time" value="12:30"></div>
              <div class="field"><label for="clash-a-ws">Start Week</label><input id="clash-a-ws" class="input" type="number" min="1" max="15" value="1"></div>
              <div class="field"><label for="clash-a-we">End Week</label><input id="clash-a-we" class="input" type="number" min="1" max="15" value="15"></div>
            </div>
          </div>

          <div style="padding:0.9rem; border:1px solid var(--border); border-radius:10px;">
            <strong>วิชาที่กำลังจะเลือก (Candidate: B)</strong>
            <div class="sim-grid">
              <div class="field">
                <label for="clash-b-day">Day</label>
                <select id="clash-b-day" class="select">
                  ${["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"].map((d) => `<option value="${d}">${d}</option>`).join("")}
                </select>
              </div>
              <div class="field"><label for="clash-b-start">Start</label><input id="clash-b-start" class="input mono" type="time" value="12:30"></div>
              <div class="field"><label for="clash-b-end">End</label><input id="clash-b-end" class="input mono" type="time" value="15:30"></div>
              <div class="field"><label for="clash-b-ws">Start Week</label><input id="clash-b-ws" class="input" type="number" min="1" max="15" value="1"></div>
              <div class="field"><label for="clash-b-we">End Week</label><input id="clash-b-we" class="input" type="number" min="1" max="15" value="15"></div>
            </div>
          </div>
        </div>
        <div id="sim-clash-result" class="result-box"></div>
      </section>

      <section class="card">
        <h3 class="card-title">🧩 Lab 3: Fixed vs Option Rule Tester (PBI 4)</h3>
        <div class="sim-grid">
          <div class="field">
            <label for="fix-type">Course Type</label>
            <select id="fix-type" class="select">
              <option value="CORE">CORE</option>
              <option value="ELECTIVE">ELECTIVE</option>
            </select>
          </div>
          <div class="field">
            <label for="fix-group">studentGroup</label>
            <select id="fix-group" class="select">
              <option value="null">null (ไม่มีกลุ่ม)</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
          <div class="field">
            <label for="fix-sections">Distinct Sections ของวิชานี้</label>
            <select id="fix-sections" class="select">
              <option value="1">1 section</option>
              <option value="2">2+ sections</option>
            </select>
          </div>
        </div>
        <div id="sim-fixed-result" class="result-box"></div>
      </section>
    `;
  }

  function wirePlayground() {
    // Lab 1
    const idInput = document.getElementById("sim-student-id");
    const idOut = document.getElementById("sim-student-result");
    function updateStudentSim() {
      const id = idInput.value.trim();
      if (!/^\d{11}$/.test(id)) {
        idOut.innerHTML = `<span class="badge badge-rose">400 / 404</span> รูปแบบรหัสต้องเป็นตัวเลข 11 หลัก (เช่น <code class="inline-code">68504504010</code>)`;
        return;
      }
      const entryYear = Number(id.slice(0, 2));
      const programCode = id.slice(2, 8);
      const studentNo = Number(id.slice(8, 11));
      const yearLevel = 69 - entryYear + 1;
      const range = DATA.studentRanges.find(
        (r) => r.entryYear === entryYear && r.fromNo <= studentNo && r.toNo >= studentNo,
      );

      let statusHtml = "";
      if (programCode !== "504504") {
        statusHtml = `<span class="badge badge-rose">HTTP 404 Not Found</span> programCode <strong>${escapeHtml(programCode)}</strong> ไม่ตรงกับ <code class="inline-code">504504</code> (BSc.IT)`;
      } else if (yearLevel < 1 || yearLevel > 4) {
        statusHtml = `<span class="badge badge-rose">HTTP 404 Not Found</span> ชั้นปีที่คำนวณได้คือ <strong>${yearLevel}</strong> (อยู่นอกช่วง 1–4)`;
      } else if (!range) {
        statusHtml = `<span class="badge badge-rose">HTTP 404 Not Found</span> เลขลำดับ <strong>${String(studentNo).padStart(3, "0")}</strong> อยู่นอกช่วง <code class="inline-code">student_group_ranges</code> ของปีเข้า ${entryYear}`;
      } else {
        statusHtml = `<span class="badge badge-emerald">HTTP 200 OK</span> แสดงบนหน้าเว็บ: <strong>Year ${yearLevel} · Group ${range.studentGroup}</strong>
          <pre style="margin-top:0.6rem; border-radius:8px;">${escapeHtml(JSON.stringify({ studentId: id, yearLevel, studentGroup: range.studentGroup }, null, 2))}</pre>`;
      }

      idOut.innerHTML = `
        <div style="margin-bottom:0.5rem;">
          แกะรหัส: <code class="inline-code">entryYear=${entryYear}</code> ·
          <code class="inline-code">programCode="${programCode}"</code> ·
          <code class="inline-code">no=${studentNo}</code> ·
          <code class="inline-code">yearLevel = 69 - ${entryYear} + 1 = ${yearLevel}</code>
        </div>
        ${statusHtml}
      `;
    }
    idInput.addEventListener("input", updateStudentSim);
    document.querySelectorAll("[data-preset-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        idInput.value = btn.dataset.presetId;
        updateStudentSim();
      });
    });
    updateStudentSim();

    // Lab 2
    const clashIds = [
      "clash-a-day", "clash-a-start", "clash-a-end", "clash-a-ws", "clash-a-we",
      "clash-b-day", "clash-b-start", "clash-b-end", "clash-b-ws", "clash-b-we",
    ];
    const clashOut = document.getElementById("sim-clash-result");
    function updateClashSim() {
      const aDay = document.getElementById("clash-a-day").value;
      const aStart = document.getElementById("clash-a-start").value;
      const aEnd = document.getElementById("clash-a-end").value;
      const aWs = Number(document.getElementById("clash-a-ws").value);
      const aWe = Number(document.getElementById("clash-a-we").value);

      const bDay = document.getElementById("clash-b-day").value;
      const bStart = document.getElementById("clash-b-start").value;
      const bEnd = document.getElementById("clash-b-end").value;
      const bWs = Number(document.getElementById("clash-b-ws").value);
      const bWe = Number(document.getElementById("clash-b-we").value);

      const sameDay = aDay === bDay;
      const timeOverlap = aStart < bEnd && bStart < aEnd;
      const weekOverlap = aWs <= bWe && bWs <= aWe;
      const isClash = sameDay && timeOverlap && weekOverlap;

      clashOut.innerHTML = `
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.65rem;">
          <span class="badge ${sameDay ? "badge-amber" : "badge-neutral"}">1. วันตรงกัน: ${sameDay ? "ใช่" : "ไม่"}</span>
          <span class="badge ${timeOverlap ? "badge-amber" : "badge-neutral"}">2. เวลาทับกัน (startA &lt; endB &amp;&amp; startB &lt; endA): ${timeOverlap ? "ใช่" : "ไม่"}</span>
          <span class="badge ${weekOverlap ? "badge-amber" : "badge-neutral"}">3. สัปดาห์ทับกัน (wsA &lt;= weB &amp;&amp; wsB &lt;= weA): ${weekOverlap ? "ใช่" : "ไม่"}</span>
        </div>
        ${
          isClash
            ? `<span class="badge badge-rose">HTTP 409 schedule-clash</span> เวลาชนกัน! ยังไม่บันทึกลง DB และ Frontend ต้องเปิด <strong>askClash()</strong> dialog เพื่อให้ผู้ใช้กด Select/Change anyway (<code class="inline-code">acceptClash: true</code>)`
            : `<span class="badge badge-emerald">ไม่ชนกัน (201 / 200 OK)</span> สามารถบันทึก selection ลงฐานข้อมูลได้ทันที`
        }
      `;
    }
    clashIds.forEach((id) => document.getElementById(id).addEventListener("input", updateClashSim));
    updateClashSim();

    // Lab 3
    const fixOut = document.getElementById("sim-fixed-result");
    function updateFixedSim() {
      const type = document.getElementById("fix-type").value;
      const grp = document.getElementById("fix-group").value;
      const sec = Number(document.getElementById("fix-sections").value);
      const isFixed = type === "CORE" && (grp !== "null" || sec === 1);
      fixOut.innerHTML = isFixed
        ? `<span class="badge badge-indigo">fixed: true</span> อยู่ตาราง <strong>My Schedule</strong> อัตโนมัติ (ห้ามมีปุ่ม Remove / Change และไม่สามารถ POST เลือกซ้ำได้)`
        : `<span class="badge badge-emerald">fixed: false (Option)</span> อยู่ตาราง <strong>Courses to Choose</strong> จนกว่านักศึกษาจะกด Select (เลือกแล้วจะมีปุ่ม Remove${sec > 1 ? " และปุ่ม Change" : " แต่ไม่มีปุ่ม Change เพราะมี section เดียว"})`;
    }
    ["fix-type", "fix-group", "fix-sections"].forEach((id) =>
      document.getElementById(id).addEventListener("change", updateFixedSim),
    );
    updateFixedSim();
  }

  /* ==================== VIEW 7: QUIZ ==================== */
  function renderQuiz() {
    const answeredCount = Object.keys(state.quizAnswers).length;
    const correctCount = DATA.quiz.reduce(
      (acc, q, idx) => (state.quizAnswers[idx] === q.answer ? acc + 1 : acc),
      0,
    );

    return `
      <section class="card" style="margin-bottom:1.15rem; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:0.75rem;">
        <div>
          <h3 class="card-title" style="margin-bottom:0.2rem;">🎯 แบบทดสอบทบทวนจุดที่มักตกใน Test Cases</h3>
          <div style="font-size:0.86rem; color:var(--text-secondary);">ตอบแล้ว <strong>${answeredCount}/${DATA.quiz.length}</strong> ข้อ · คะแนนปัจจุบัน <strong>${correctCount}/${DATA.quiz.length}</strong></div>
        </div>
        <button type="button" class="btn" id="quiz-reset">เริ่มทำใหม่ทั้งหมด</button>
      </section>

      ${DATA.quiz
        .map((item, idx) => {
          const picked = state.quizAnswers[idx];
          const answered = picked !== undefined;
          return `
            <article class="card" style="margin-bottom:0.95rem;">
              <div style="font-weight:700; font-size:0.95rem;">ข้อที่ ${idx + 1}. ${escapeHtml(item.q)}</div>
              <div>
                ${item.options
                  .map((opt, optIdx) => {
                    let cls = "quiz-option";
                    if (answered) {
                      if (optIdx === item.answer) cls += " correct";
                      else if (optIdx === picked) cls += " wrong";
                    }
                    return `
                      <button type="button" class="${cls}" data-quiz-q="${idx}" data-quiz-opt="${optIdx}" ${answered ? "disabled" : ""}>
                        <strong class="mono">${String.fromCharCode(65 + optIdx)}.</strong>
                        <span>${escapeHtml(opt)}</span>
                      </button>
                    `;
                  })
                  .join("")}
              </div>
              ${
                answered
                  ? `<div class="callout ${picked === item.answer ? "callout-ok" : "callout-warn"}" style="margin-top:0.8rem; margin-bottom:0;">
                      <strong>${picked === item.answer ? "✅ ถูกต้อง!" : "❌ ยังไม่ถูก:"}</strong> ${escapeHtml(item.explain)}
                    </div>`
                  : ""
              }
            </article>
          `;
        })
        .join("")}
    `;
  }

  /* ==================== VIEW 8: RESOURCES ==================== */
  function renderResources() {
    const { videos, commands } = DATA.resources;
    return `
      <section class="card">
        <h3 class="card-title">🎬 คลังคลิปสอนตาม Tech Stack ของโปรเจกต์</h3>
        <div class="grid-2">
          ${videos
            .map(
              (group) => `
            <div style="border:1px solid var(--border); border-radius:12px; padding:1rem; background:var(--bg-subtle);">
              <strong style="font-size:0.92rem;">${escapeHtml(group.category)}</strong>
              <ul class="pbi-list" style="margin-top:0.55rem; margin-bottom:0;">
                ${group.items
                  .map(
                    (v) => `
                  <li style="margin-bottom:0.55rem;">
                    <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(v.query)}" target="_blank" rel="noopener noreferrer" style="font-weight:600;">${escapeHtml(v.title)} ↗</a>
                    <div style="font-size:0.8rem; color:var(--text-secondary);">${escapeHtml(v.desc)}</div>
                  </li>
                `,
                  )
                  .join("")}
              </ul>
            </div>
          `,
            )
            .join("")}
        </div>
      </section>

      <section class="card section-block">
        <h3 class="card-title">⌨️ Cheat Sheet คำสั่งที่ใช้บ่อยในโปรเจกต์</h3>
        ${commands.map((c) => renderCodeBlock(c.label, c.cmd)).join("")}
      </section>
    `;
  }

  /* ==================== ROUTER & EVENTS ==================== */
  function render() {
    topbarTitleEl.textContent = VIEW_TITLES[state.view] || "INT504 Study Hub";

    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === state.view);
    });

    if (state.view === "overview") contentEl.innerHTML = renderOverview();
    else if (state.view === "project") contentEl.innerHTML = renderProjectInfo();
    else if (state.view === "diagrams") contentEl.innerHTML = renderDiagrams();
    else if (state.view === "lessons") contentEl.innerHTML = renderLessons();
    else if (state.view === "pbis") contentEl.innerHTML = renderPbis();
    else if (state.view === "api") contentEl.innerHTML = renderApi();
    else if (state.view === "playground") {
      contentEl.innerHTML = renderPlayground();
      wirePlayground();
    } else if (state.view === "quiz") contentEl.innerHTML = renderQuiz();
    else if (state.view === "resources") contentEl.innerHTML = renderResources();

    const fileSearch = document.getElementById("file-search");
    if (fileSearch) {
      fileSearch.addEventListener("input", (e) => {
        state.fileQuery = e.target.value;
        render();
        const fresh = document.getElementById("file-search");
        if (fresh) {
          fresh.focus();
          fresh.setSelectionRange(fresh.value.length, fresh.value.length);
        }
      });
    }

    const pbiSearch = document.getElementById("pbi-search");
    if (pbiSearch) {
      pbiSearch.addEventListener("input", (e) => {
        state.pbiQuery = e.target.value;
        render();
        const fresh = document.getElementById("pbi-search");
        if (fresh) {
          fresh.focus();
          fresh.setSelectionRange(fresh.value.length, fresh.value.length);
        }
      });
    }

    const apiSearch = document.getElementById("api-search");
    if (apiSearch) {
      apiSearch.addEventListener("input", (e) => {
        state.apiQuery = e.target.value;
        render();
        const fresh = document.getElementById("api-search");
        if (fresh) {
          fresh.focus();
          fresh.setSelectionRange(fresh.value.length, fresh.value.length);
        }
      });
    }

    const quizReset = document.getElementById("quiz-reset");
    if (quizReset) {
      quizReset.addEventListener("click", () => {
        state.quizAnswers = {};
        render();
      });
    }
  }

  // Event delegation on content area
  contentEl.addEventListener("click", async (e) => {
    const copyBtn = e.target.closest("[data-copy]");
    if (copyBtn) {
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.copy);
        const orig = copyBtn.textContent;
        copyBtn.textContent = "คัดลอกแล้ว ✓";
        setTimeout(() => (copyBtn.textContent = orig), 1400);
      } catch {
        copyBtn.textContent = "คัดลอกไม่สำเร็จ";
      }
      return;
    }

    const zoomTrigger = e.target.closest("[data-zoom-diagram]");
    if (zoomTrigger) {
      const diag = DATA.diagrams.find((d) => d.id === zoomTrigger.dataset.zoomDiagram);
      if (diag) openDiagramLightbox(diag);
      return;
    }

    const jumpBtn = e.target.closest("[data-jump-view]");
    if (jumpBtn) {
      state.view = jumpBtn.dataset.jumpView;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const lessonBtn = e.target.closest("[data-lesson-id]");
    if (lessonBtn) {
      state.activeLesson = lessonBtn.dataset.lessonId;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const fileLayerBtn = e.target.closest("[data-file-layer]");
    if (fileLayerBtn) {
      state.fileLayer = fileLayerBtn.dataset.fileLayer;
      render();
      return;
    }

    const pbiSprintBtn = e.target.closest("[data-pbi-sprint]");
    if (pbiSprintBtn) {
      state.pbiSprint = pbiSprintBtn.dataset.pbiSprint;
      render();
      return;
    }

    const pbiOwnerBtn = e.target.closest("[data-pbi-owner]");
    if (pbiOwnerBtn) {
      state.pbiOwner = pbiOwnerBtn.dataset.pbiOwner;
      render();
      return;
    }

    const apiSprintBtn = e.target.closest("[data-api-sprint]");
    if (apiSprintBtn) {
      state.apiSprint = apiSprintBtn.dataset.apiSprint;
      render();
      return;
    }

    const pbiCheck = e.target.closest("[data-check-pbi]");
    if (pbiCheck) {
      const id = pbiCheck.dataset.checkPbi;
      if (pbiCheck.checked) state.donePbis.add(id);
      else state.donePbis.delete(id);
      saveDoneSet();
      const card = pbiCheck.closest(".pbi-card");
      if (card) card.classList.toggle("done", pbiCheck.checked);
      return;
    }

    const pbiHeader = e.target.closest("[data-toggle-pbi]");
    if (pbiHeader) {
      const card = pbiHeader.closest(".pbi-card");
      if (card) card.classList.toggle("open");
      return;
    }

    const quizBtn = e.target.closest("[data-quiz-q]");
    if (quizBtn) {
      const qIdx = Number(quizBtn.dataset.quizQ);
      const optIdx = Number(quizBtn.dataset.quizOpt);
      state.quizAnswers[qIdx] = optIdx;
      render();
    }
  });

  // Sidebar navigation
  document.getElementById("nav-list").addEventListener("click", (e) => {
    const btn = e.target.closest(".nav-btn");
    if (!btn) return;
    state.view = btn.dataset.view;
    closeMobileMenu();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  menuBtn.addEventListener("click", () => {
    sidebarEl.classList.toggle("open");
    backdropEl.classList.toggle("show");
  });
  backdropEl.addEventListener("click", closeMobileMenu);

  themeToggleBtn.addEventListener("click", () => {
    applyTheme(state.theme === "dark" ? "light" : "dark");
  });

  diagramModalClose.addEventListener("click", () => diagramModal.close());
  diagramModal.addEventListener("click", (e) => {
    if (e.target === diagramModal) diagramModal.close();
  });

  applyTheme(state.theme);
  updateProgressUI();
  render();
})();
