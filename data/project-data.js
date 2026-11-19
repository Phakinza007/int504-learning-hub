window.PROJECT_DATA = {
  meta: {
    course: "INT504 Integrated Project",
    project: "IT-Bangmod Class Schedule Viewing System (itb-csv)",
    semester: "ภาคเรียนที่ 1/2569 (Academic Year 2569)",
    teamGroup: "Group 44",
    teamCode: "ip26-zen",
    publicPathNote: "/intproj26/<TEAM-PATH>/",
    stack: [
      "HTML5 & Vanilla JS",
      "Tailwind CSS",
      "Node.js + Express 5",
      "Prisma ORM + MySQL 8",
      "Keycloak (OIDC / PKCE)",
      "Nginx + Docker Compose",
    ],
  },

  diagrams: [
    {
      id: "01-system-architecture",
      sprint: "Sprint 1–3",
      title: "1. System Architecture — 4 Containers, Nginx & Keycloak",
      desc: "ภาพรวมการเชื่อมต่อตั้งแต่ Browser → Nginx Reverse Proxy (/intproj26/<TEAM-PATH>/) → Frontend / Backend / MySQL และ Keycloak",
      lessonId: "lesson-1",
    },
    {
      id: "02-backend-pipeline",
      sprint: "Sprint 3 (PBI 9–11)",
      title: "2. Backend 4-Layer & Error Priority Pipeline (401→403→400→404→409)",
      desc: "ลำดับการทำงานของ Middleware, Routes, Controllers, Services และลำดับ Error Code แบบ application/problem+json",
      lessonId: "lesson-5",
    },
    {
      id: "03-database-erd",
      sprint: "Sprint 1–3",
      title: "3. Database Schema & Relationships (ERD)",
      desc: "ความสัมพันธ์ระหว่าง courses (51), courses_schedule (92→97), selections, lecturers (26), schedule_lecturer (70), calendar และ sessions (1,181)",
      lessonId: "lesson-2",
    },
    {
      id: "04-auth-pkce-flow",
      sprint: "Sprint 2–3 (PBI 3 & 10)",
      title: "4. Keycloak PKCE S256 & JWKS Bearer Token Flow",
      desc: "ขั้นตอนการ Sign In, ต่ออายุ token (updateToken), ส่ง Authorization: Bearer และตรวจ JWKS + role/self ฝั่ง Backend",
      lessonId: "lesson-6",
    },
    {
      id: "05-fixed-vs-option",
      sprint: "Sprint 2 (PBI 4)",
      title: "5. กฎแยกวิชา Fixed vs Option และการแบ่ง 2 ตาราง",
      desc: "วิธีคำนวณ fixed ก่อนกรอง studentGroup และแยกแถวลงตาราง My Schedule กับ Courses to Choose",
      lessonId: "lesson-4",
    },
    {
      id: "06-selection-clash-flow",
      sprint: "Sprint 2–3 (PBI 5–7 & 11)",
      title: "6. Select / Change Section & Schedule Clash Flow",
      desc: "โฟลว์เต็มของ POST/PUT selections, กฎ updatedAt, การตรวจเวลาชน 3 เงื่อนไข และ askClash() Dialog พร้อม acceptClash: true",
      lessonId: "lesson-6",
    },
    {
      id: "07-project-file-map",
      sprint: "Codebase จริง (Group 44)",
      title: "7. แผนผังไฟล์และโมดูลจริงใน int504-2026-project-group-44",
      desc: "แสดงความเชื่อมโยงระหว่างไฟล์จริงทั้งหมดใน frontend/scripts/, backend/ (routes→controllers→services→utils) และ prisma/",
      lessonId: "lesson-1",
    },
    {
      id: "08-frontend-architecture",
      sprint: "System Architecture · Frontend",
      title: "8. Frontend Architecture — Build Pipeline, Guest Flow & My Schedule Modules",
      desc: "เจาะลึกโครงสร้างใน frontend/: Tailwind build, esbuild bundle, หน้า Guest (app.js) และโมดูล 7 ไฟล์ใน frontend/scripts/",
      lessonId: "lesson-3",
    },
    {
      id: "09-backend-architecture",
      sprint: "System Architecture · Backend",
      title: "9. Backend Architecture — Server, Routes, Controllers, Services & Utils",
      desc: "เจาะลึกโครงสร้างใน backend/: server.js → app.js → routes/ → controllers/ → services/ → utils/schedule.js",
      lessonId: "lesson-1",
    },
    {
      id: "10-database-architecture",
      sprint: "System Architecture · Database",
      title: "10. Database & Prisma Architecture — Schema, 4 Migrations, Seed & MySQL 8.4",
      desc: "เจาะลึกโครงสร้างใน prisma/: schema.prisma (5 models), migrations/ (4 SQL), seed.js ($transaction upsert) และ MySQL utf8mb4",
      lessonId: "lesson-2",
    },
    {
      id: "11-beam-sprint3-guide",
      sprint: "Beam · Sprint 3 Roadmap",
      title: "11. Beam's Sprint 3 Roadmap — PBI 9 → PBI 11 → PBI 12 API",
      desc: "แผนการลงมือทำทีละขั้นสำหรับ Beam: เริ่มจาก Validation (PBI 9) → Clash Detection & Dialog (PBI 11) → Weekly Sessions API (PBI 12)",
      lessonId: "lesson-5",
    },
  ],

  beamGuide: {
    summary: "คู่มือลงมือทำทีละขั้นสำหรับ Beam ใน Sprint 3 (PBI 9, PBI 11 และ PBI 12 API) อ้างอิงจากโครงสร้างโค้ดจริงใน int504-2026-project-group-44 — ติ๊กเช็กแต่ละขั้นเพื่อติดตามความคืบหน้าของตัวเองได้เลยครับ",
    diagramId: "11-beam-sprint3-guide",
    syncPoints: [
      { with: "Dragon", topic: "problem.js & Auth Order", detail: "ส่ง backend/utils/problem.js ให้ Dragon ใช้กับ 401/403 และตกลงลำดับใน app.js ให้ auth middleware ทำงานก่อน validate-request เสมอ" },
      { with: "Dragon", topic: "PBI 12 Sessions Schema", detail: "รอ Dragon รวม migration ของ academic_weeks, holidays, exam_periods, sessions (1,181 แถว) และ semester start/end date ก่อนเชื่อม query จริงใน session.service.js" },
      { with: "Alan", topic: "Shared Files & Payload", detail: "นัดลำดับก่อนแก้ frontend/my-schedule.html (Beam เพิ่มเฉพาะ clash dialog) และ backend/routes/lecturer.routes.js (Beam เพิ่ม /:username/sessions) + ตกลงฟิลด์ JSON ของ sessions ให้ Alan ทำ timetable.js" },
    ],
    stages: [
      {
        stageId: "stage-1",
        badge: "Stage 1 · ทำได้เลยทันที",
        title: "PBI 9 — Request Validation & application/problem+json",
        tests: "TC-PBI9-1 ถึง TC-PBI9-10",
        steps: [
          {
            id: "beam-1",
            action: "สร้างไฟล์ใหม่",
            file: "backend/utils/problem.js",
            title: "สร้าง helper กลางสำหรับตอบ Error แบบ application/problem+json",
            detail: "ทุก error ช่วง 400–499 ต้องตั้ง header Content-Type: application/problem+json และคืน { type, title, status, ...extra } เพื่อใช้ร่วมกันทั้ง PBI 9, PBI 10 (Dragon), PBI 11 และ PBI 12",
            code: `function sendProblem(res, { status, type, title, detail, ...extra }) {
  return res
    .status(status)
    .type("application/problem+json")
    .json({
      type,
      title,
      status,
      ...(detail !== undefined ? { detail } : {}),
      ...extra,
    });
}

module.exports = { sendProblem };`,
          },
          {
            id: "beam-2",
            action: "สร้างไฟล์ใหม่",
            file: "backend/middleware/validate-request.js",
            title: "เขียน Validation Middleware ตรวจ path / query / body และเก็บทุก field ที่ผิด",
            detail: "กฎที่ต้องตรวจให้ครบ: yearLevel (int 1–4), studentGroup ('A'|'B'), studentId (11 หลัก /^\\d{11}$/), courseId (int 1..2147483647), section (int 1..99), acceptClash (boolean ถ้าส่งมา), body ต้องเป็น JSON object (ไม่ใช่ array/null/primitive), ค่า query ซ้ำ (Express คืนเป็น Array) — ห้ามหยุดแค่ error แรก ต้อง push ทุก field ที่ผิดลง errors[] ก่อนส่ง 400!",
            code: `const { sendProblem } = require("../utils/problem");

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function validatePostSelection(req, res, next) {
  const errors = [];
  if (!/^\\d{11}$/.test(req.params.studentId ?? "")) {
    errors.push({ field: "studentId", message: "studentId must be 11 digits" });
  }
  if (!isPlainObject(req.body)) {
    return sendProblem(res, {
      status: 400, type: "validation-error", title: "Validation Error",
      errors: [{ field: "body", message: "Request body must be a JSON object" }],
    });
  }
  const { courseId, section, acceptClash } = req.body;
  if (!Number.isInteger(courseId) || courseId < 1 || courseId > 2147483647) {
    errors.push({ field: "courseId", message: "courseId must be an integer between 1 and 2147483647" });
  }
  if (!Number.isInteger(section) || section < 1 || section > 99) {
    errors.push({ field: "section", message: "section must be an integer between 1 and 99" });
  }
  if (acceptClash !== undefined && typeof acceptClash !== "boolean") {
    errors.push({ field: "acceptClash", message: "acceptClash must be a boolean" });
  }
  if (errors.length > 0) {
    return sendProblem(res, { status: 400, type: "validation-error", title: "Validation Error", errors });
  }
  return next();
}`,
          },
          {
            id: "beam-3",
            action: "แก้ไขไฟล์เดิม",
            file: "backend/controllers/*.js + backend/app.js",
            title: "ปรับ Error เดิมให้เป็น problem+json และดัก invalid JSON syntax (400)",
            detail: "เปลี่ยน response.sendStatus(404/409) ใน student/selection/schedule controllers มาใช้ sendProblem(), เพิ่ม error handler ดัก SyntaxError จาก express.json() ให้ตอบ 400 problem+json และเช็กลำดับ: 401 → 403 → 400 → 404 (PUT เช็ก selection-not-found ก่อน section-not-found) → 409 (POST เช็ก already-selected ก่อน schedule-clash)",
            code: `// ใน backend/app.js (ก่อน error handler 500)
app.use((error, _req, res, next) => {
  if (error?.type === "entity.parse.failed" || error instanceof SyntaxError) {
    return sendProblem(res, {
      status: 400,
      type: "validation-error",
      title: "Invalid JSON",
      errors: [{ field: "body", message: "Malformed JSON payload" }],
    });
  }
  return next(error);
});`,
          },
          {
            id: "beam-4",
            action: "แก้ไขไฟล์เดิม",
            file: "frontend/app.js",
            title: "ล้าง ?yearLevel= ที่ผิดใน URL ของหน้า Home โดยไม่ Reload",
            detail: "ถ้าผู้ใช้เปิด /?yearLevel=9 หรือ ?yearLevel=abc หรือมี yearLevel ซ้ำ ให้ fallback เป็น 'all' แล้วเรียก history.replaceState() ลบ query parameter ที่ผิดออกโดยไม่ reload หน้า และไม่ส่งค่าผิดไป API",
            code: `function getInitialYearLevel() {
  const params = new URLSearchParams(window.location.search);
  const allValues = params.getAll("yearLevel");
  const valid = allValues.length === 1 && ["1", "2", "3", "4"].includes(allValues[0]);
  if (!valid && allValues.length > 0) {
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete("yearLevel");
    history.replaceState({}, "", cleanUrl);
    return "all";
  }
  return valid ? allValues[0] : "all";
}`,
          },
        ],
      },
      {
        stageId: "stage-2",
        badge: "Stage 2 · ทำต่อจาก Stage 1 ได้เลย",
        title: "PBI 11 — Schedule Clash Detection (Backend + Frontend)",
        tests: "TC-PBI11-1 ถึง TC-PBI11-14",
        steps: [
          {
            id: "beam-5",
            action: "สร้างไฟล์ใหม่",
            file: "backend/services/clash.service.js",
            title: "เขียนฟังก์ชันตรวจเวลาชนกัน 3 เงื่อนไข + เรียงรายการ clashes[]",
            detail: "ดึงตาราง fixed ของกลุ่มนักศึกษา + แถวของวิชาที่นักศึกษาเลือกอยู่แล้ว (ตอน PUT ให้ตัด courseId ที่กำลังจะเปลี่ยนออกก่อน เพื่อไม่ให้ชนกับ section เดิมของตัวเอง!) แล้วเทียบกับทุกแถวของ candidate section (1 section มีหลายวันได้)",
            code: `const { normalizeTime, compareSchedules } = require("../utils/schedule");

function rowsClash(a, b) {
  if (String(a.dayOfWeek).toUpperCase() !== String(b.dayOfWeek).toUpperCase()) return false;
  const startA = normalizeTime(a.startTime);
  const endA = normalizeTime(a.endTime);
  const startB = normalizeTime(b.startTime);
  const endB = normalizeTime(b.endTime);
  // เวลาต่อกันพอดี (12:30 vs 12:30) ไม่ถือว่าชน!
  if (!(startA < endB && startB < endA)) return false;
  // ช่วงสัปดาห์ทับกันอย่างน้อย 1 สัปดาห์
  return a.startWeek <= b.endWeek && b.startWeek <= a.endWeek;
}

function findClashes(candidateRows, occupiedRows) {
  const matched = new Map();
  for (const cand of candidateRows) {
    for (const occ of occupiedRows) {
      if (rowsClash(cand, occ)) {
        matched.set(occ.id, occ);
      }
    }
  }
  return [...matched.values()].sort(compareSchedules);
}`,
          },
          {
            id: "beam-6",
            action: "แก้ไขไฟล์เดิม",
            file: "backend/services/selection.service.js & controller.js",
            title: "ต่อ Clash Check เข้า POST และ PUT พร้อมรองรับ acceptClash: true",
            detail: "เช็กกฎสำคัญ 3 ข้อ: (1) POST ต้องเช็ก already-selected (409) ก่อน schedule-clash (409), (2) PUT ถ้าส่ง section เดิมต้องตอบ 200 ทันทีโดยไม่ตรวจ clash และไม่เปลี่ยน updatedAt, (3) ถ้าพบ clash และ acceptClash !== true ให้ตอบ 409 type: 'schedule-clash' พร้อม clashes[] โดยยังไม่บันทึกลง DB",
            code: `// ใน createSelection / changeSelection:
if (!acceptClash) {
  const clashes = findClashes(candidateRows, occupiedRows);
  if (clashes.length > 0) {
    return { status: "CLASH", clashes };
  }
}
// ใน selection.controller.js:
if (result?.status === "CLASH") {
  return sendProblem(response, {
    status: 409,
    type: "schedule-clash",
    title: "Schedule Clash",
    clashes: result.clashes,
  });
}`,
          },
          {
            id: "beam-7",
            action: "แก้ไขไฟล์ร่วม (นัด Alan)",
            file: "frontend/my-schedule.html & frontend/scripts/dialogs.js",
            title: "เพิ่ม Clash <dialog> และฟังก์ชัน askClash(clashes, actionLabel)",
            detail: "แสดงข้อความ 'This section overlaps:' พร้อมรายการวิชาที่ชน และปุ่ม 'Select anyway' (ตอน POST) หรือ 'Change anyway' (ตอน PUT) คู่กับปุ่ม Cancel โดยกด Esc ต้องเท่ากับ Cancel (คืน false)",
            code: `// frontend/scripts/dialogs.js
function askClash(clashes, confirmLabel) {
  clashList.replaceChildren();
  for (const c of clashes) {
    const li = document.createElement("li");
    li.textContent = \`\${c.course.code} \${c.course.title} (Section \${c.section}) — \${dayAndTime(c)}\`;
    clashList.appendChild(li);
  }
  clashConfirmBtn.textContent = confirmLabel; // "Select anyway" หรือ "Change anyway"
  clashDialog.returnValue = "cancel";
  clashDialog.showModal();
  return new Promise((resolve) => {
    clashDialog.addEventListener("close", () => resolve(clashDialog.returnValue === "confirm"), { once: true });
  });
}`,
          },
          {
            id: "beam-8",
            action: "แก้ไขไฟล์เดิม + Build",
            file: "frontend/scripts/selections.js → npm run build:js",
            title: "แยก 409 already-selected vs schedule-clash และส่งซ้ำพร้อม acceptClash: true",
            detail: "เมื่อได้ status 409 ให้อ่าน problem = await response.json() แล้วเช็ก problem.type: ถ้าเป็น 'schedule-clash' ให้เรียก askClash(); ถ้าผู้ใช้กดยืนยันให้ยิง POST/PUT เดิมซ้ำพร้อม { ..., acceptClash: true } ถ้ากด Cancel/Esc ห้ามยิง request เพิ่มและห้ามเปลี่ยนตาราง — เสร็จแล้วรัน npm run build:js เสมอ!",
            code: `if (response.status === 409) {
  const problem = await response.json().catch(() => ({}));
  if (problem.type === "schedule-clash") {
    const proceed = await askClash(problem.clashes ?? [], "Select anyway");
    if (!proceed) return; // Cancel/Esc -> ไม่ทำอะไรต่อ
    const retry = await apiRequest(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: schedule.course.id, section: schedule.section, acceptClash: true }),
    });
    if (retry.status === 201) {
      state.selections.push(await retry.json());
      onChange();
      return;
    }
  } else {
    await showMessage("This course is already in your schedule.");
    state.selections = await getJson(url);
    onChange();
  }
}`,
          },
        ],
      },
      {
        stageId: "stage-3",
        badge: "Stage 3 · ทำหลังรับ Schema จาก Dragon & Alan",
        title: "PBI 12 API — Semester & Weekly Sessions",
        tests: "TC-PBI12-1 ถึง TC-PBI12-7",
        steps: [
          {
            id: "beam-9",
            action: "สร้างไฟล์ใหม่",
            file: "backend/routes/semester.routes.js",
            title: "เปิด Public Endpoint GET /api/v1/semester",
            detail: "ไม่ต้องใช้ Bearer token — อ่าน academic_settings (id=1) แล้วคืน { academicYear, semester, startDate, endDate } ในรูปแบบ yyyy-mm-dd",
            code: `// GET /api/v1/semester (Public)
router.get("/", async (_req, res, next) => {
  try {
    const s = await prisma.academicSettings.findUnique({ where: { id: 1 } });
    res.status(200).json({
      academicYear: s.currentAcademicYear,
      semester: s.currentSemester,
      startDate: formatDate(s.semesterStartDate),
      endDate: formatDate(s.semesterEndDate),
    });
  } catch (err) { next(err); }
});`,
          },
          {
            id: "beam-10",
            action: "สร้างไฟล์ใหม่",
            file: "backend/services/session.service.js & controller.js",
            title: "คำนวณสัปดาห์จันทร์–อาทิตย์, ตรวจวันที่จริง yyyy-mm-dd และดึง Sessions + Holidays",
            detail: "จุดระวัง: (1) ต้องเช็กว่า date เป็นวันที่ที่มีอยู่จริง (เช่น 2026-02-30 ต้องตอบ 400 validation-error), (2) คำนวณ weekStart (วันจันทร์) ถึง weekEnd (วันอาทิตย์), (3) วันนอกภาคเรียนต้องรับได้โดยคืน label: null และ sessions: [], (4) นักศึกษาได้ sessions ของ fixed + selected, อาจารย์ได้เฉพาะที่ตนสอน, (5) เรียงผลตาม date → startTime → id",
            code: `function parseStrictDate(str) {
  if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(str ?? "")) return null;
  const [y, m, d] = str.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  // ป้องกัน JS auto-rollover เช่น 2026-02-30 -> 2026-03-02
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return null;
  return dt;
}

function getMondayToSunday(utcDate) {
  const day = utcDate.getUTCDay(); // 0=Sun, 1=Mon..6=Sat
  const diffToMon = day === 0 ? -6 : 1 - day;
  const monday = new Date(utcDate);
  monday.setUTCDate(utcDate.getUTCDate() + diffToMon);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  return { weekStart: monday, weekEnd: sunday };
}`,
          },
          {
            id: "beam-11",
            action: "แก้ไขไฟล์ร่วม (นัด Alan + Dragon)",
            file: "backend/routes/student.routes.js & lecturer.routes.js & app.js",
            title: "ผูก Routes ของ /sessions และรันทดสอบครบ PBI 1–12",
            detail: "เพิ่ม GET /api/v1/students/:studentId/sessions และ GET /api/v1/lecturers/:username/sessions ใต้ auth guard ของ Dragon, ส่งตัวอย่าง JSON ให้ Alan ใช้ทำ timetable.js แล้วรัน npm test + npm run build:js + ตรวจบน VM ผ่าน Run Now ก่อน Trial 23 พ.ย. 18:00 น.",
            code: `# เช็กงานทั้งหมดของ Beam ก่อนเปิด PR
npm test
npm run build:js
npm run build:css`,
          },
        ],
      },
    ],
  },

  systemArchitecture: {
    frontend: {
      badge: "Frontend Layer",
      title: "🎨 Frontend Architecture (frontend/)",
      subtitle: "HTML5 + Vanilla JavaScript + Tailwind CSS v4 + Keycloak PKCE + esbuild Bundle",
      diagramId: "08-frontend-architecture",
      tree: `frontend/
├── index.html               # หน้า Guest (PBI 1–2): 9 คอลัมน์, ปุ่ม All/Year 1–4, error-dialog
├── app.js                   # Logic หน้า Guest: fetch ./api/v1/schedules ครั้งเดียว, cache allSchedules, pushState
├── my-schedule.html         # หน้าส่วนตัว (PBI 3–7): 2 ตาราง (my-schedule, course-options) + 4 native <dialog>
├── my-schedule.js           # [AUTO-GENERATED] ไฟล์ bundle จาก esbuild (ห้ามแก้ด้วยมือ!)
├── input.css                # Tailwind v4 entry (@import "tailwindcss";)
├── output.css               # [AUTO-GENERATED] ไฟล์ CSS minify จาก npm run build:css
├── nginx.conf               # Config nginx ของ frontend container (เสิร์ฟไฟล์ static ที่ port 80)
├── Dockerfile               # Build CSS + JS bundle แล้วคัดลอกเข้า nginx container
└── scripts/                 # Source code แยกโมดูลของหน้า My Schedule
    ├── my-schedule.js       # Entry point + state กลาง { studentId, schedules, selections }
    ├── auth.js              # Keycloak client (realm: itb-csv, clientId: ip26-zen, PKCE S256) + isLecturer()
    ├── profile.js           # เรียก GET /api/v1/students/:id (คืน null เฉพาะ 404)
    ├── api.js               # Wrapper กลาง apiRequest() และ getJson() (จุดเพิ่ม Bearer token ใน Sprint 3)
    ├── course-tables.js     # renderTables(): แยก My Schedule vs Courses to Choose และสร้างปุ่ม Action
    ├── selections.js        # handleSelect / handleRemove / handleChange + selectionPending lock
    ├── dialogs.js           # showError, showMessage, askRemove, askChange (Promise-based <dialog>)
    └── vendor/              # ไฟล์สำรอง keycloak-js vendor`,
      highlights: [
        {
          file: "frontend/app.js",
          role: "Guest Schedule (PBI 1–2)",
          explain: "เก็บข้อมูลไว้ในตัวแปร allSchedules แค่ครั้งเดียวตอนโหลดหน้า เมื่อกดปุ่ม All / Year 1–4 จะกรองจาก array ใน memory แล้วเรียก renderSchedules() สร้าง <tr> พร้อม data-testid ครบ 9 ช่อง (code, title, type, section, group, day, time, weeks, remarks) โดยไม่ยิง API ซ้ำ",
          code: `let allSchedules = [];

function renderSchedules(schedules) {
  const tbody = document.getElementById("schedule-body");
  tbody.replaceChildren();
  if (schedules.length === 0) { emptyMessage.classList.remove("hidden"); return; }

  schedules.forEach((schedule) => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-testid", "schedule-row");
    // ดึงข้อมูลจาก nested object: schedule.course.code, schedule.course.title, ...
    // group & remarks: schedule.studentGroup ?? ""
  });
}`,
        },
        {
          file: "frontend/scripts/my-schedule.js + auth.js + profile.js",
          role: "Entry Point & Data Loading (PBI 3–4)",
          explain: "เมื่อเปิด my-schedule.html โค้ดจะรัน signIn() ผ่าน Keycloak PKCE S256 → แสดงชื่อและปุ่ม Sign Out → เช็ก isLecturer(token) → ถ้าเป็นนักศึกษาเรียก getStudentProfile(studentId) (404 แสดง not-student) → แล้วใช้ Promise.all([getJson(schedulesUrl), getJson(selectionsUrl)]) โหลด 2 อย่างพร้อมกันครั้งเดียว",
          code: `const state = { studentId: "", schedules: [], selections: [] };

async function loadMySchedule() {
  const token = await signIn(); // keycloak.init({ onLoad: "login-required", pkceMethod: "S256" })
  if (isLecturer(token)) { /* แสดง lecturer-message */ return; }

  state.studentId = token.preferred_username;
  const profile = await getStudentProfile(state.studentId); // 404 -> null
  if (!profile) { /* แสดง not-student */ return; }

  const [schedules, selections] = await Promise.all([
    getJson(\`./api/v1/year-levels/\${profile.yearLevel}/schedules?studentGroup=\${profile.studentGroup}\`),
    getJson(\`./api/v1/students/\${encodeURIComponent(state.studentId)}/selections\`),
  ]);
  state.schedules = schedules;
  state.selections = selections;
  renderCurrentTables();
}`,
        },
        {
          file: "frontend/scripts/course-tables.js + selections.js + dialogs.js",
          role: "2-Table Split, Mutations & Native Dialogs (PBI 5–7)",
          explain: "course-tables.js สร้าง Map(courseId → section) เพื่อแบ่ง mySchedules (fixed หรือเลือกไว้) กับ options (!fixed และยังไม่เลือก) พร้อมคำนวณ changeable (มี >1 section) ส่วน selections.js ใช้ตัวแปร selectionPending กันกดปุ่มซ้ำ และใช้ dialogs.js (native <dialog> + Promise) ถามยืนยัน Remove/Change",
          code: `// course-tables.js — แยก 2 ตารางจาก state โดยไม่ refetch schedules
const selectedSections = new Map(selections.map((s) => [s.courseId, s.section]));
const mySchedules = schedules.filter((s) => s.fixed || selectedSections.get(s.course.id) === s.section);
const options = schedules.filter((s) => !s.fixed && !selectedSections.has(s.course.id));

// selections.js — หลัง POST 201 / DELETE 204 / PUT 200 อัปเดต state.selections ใน memory แล้ว render ใหม่ทันที
if (response.status === 201) {
  state.selections.push(await response.json());
  onChange(); // ไม่ reload หน้า และไม่ fetch schedules ใหม่!
}`,
        },
      ],
    },

    backend: {
      badge: "Backend Layer",
      title: "⚙️ Backend Architecture (backend/)",
      subtitle: "Node.js + Express 5 + Prisma Client — แยก 4 ชั้นชัดเจน (Routes → Controllers → Services → Utils)",
      diagramId: "09-backend-architecture",
      tree: `backend/
├── server.js                      # Entry point: เช็ก DATABASE_URL, สร้าง PrismaClient, listen port 3000 + graceful shutdown
├── app.js                         # createApp({ prisma, teamCode }): express.json(), /health, mount routes, static ../frontend, error 500
├── app.test.js                    # ชุดทดสอบอัตโนมัติ (รันด้วย npm test / node --test)
├── Dockerfile                     # Build Node image พร้อม Prisma CLI + generate client สำหรับรัน migrate/seed ใน container
├── README.md                      # คู่มือ API contract และการรัน local
├── routes/                        # ชั้นที่ 1: กำหนด HTTP Method + URL Path
│   ├── schedule.routes.js         # GET /api/v1/schedules และ GET /api/v1/year-levels/:yearLevel/schedules
│   ├── student.routes.js          # GET /api/v1/students/:studentId
│   └── selection.routes.js        # GET / POST / DELETE /students/:id/selections และ PUT / DELETE /:courseId
├── controllers/                   # ชั้นที่ 2: แกะ req.params / req.query / req.body และตอบ HTTP Status + JSON
│   ├── schedule.controller.js     # ตรวจ yearLevel, กรอง studentGroup, แปลง DTO (public vs year-level)
│   ├── student.controller.js      # เรียก findStudentProfile() → 200 หรือ 404
│   └── selection.controller.js    # เรียก CRUD selections → 200 / 201 / 204 / 404 / 409
├── services/                      # ชั้นที่ 3: Business Logic + คุยฐานข้อมูลผ่าน Prisma
│   ├── schedule.service.js        # findSchedules(prisma, yearLevel) พร้อม include: { course: true }
│   ├── student.service.js         # findStudentProfile(): ตรวจรหัส 11 หลัก, academicSettings, studentGroupRange
│   └── selection.service.js       # findSelections, createSelection (จับ P2002), reset, remove, changeSelection
└── utils/                         # ชั้นที่ 4: Pure Functions (Sort, Time Format, Fixed Calculation)
    └── schedule.js                # DAY_ORDER Map, compareSchedules, normalizeTime, toPublicSchedule, isFixed`,
      highlights: [
        {
          file: "backend/server.js → backend/app.js",
          role: "Dependency Injection Pattern (ทำให้ง่ายต่อการ Test)",
          explain: "server.js สร้าง PrismaClient จริงแล้วส่งเข้าไปใน createApp({ prisma }) ของ app.js เหตุผลที่ออกแบบแบบนี้เพราะตอนรัน npm test (app.test.js) สามารถส่ง mock prisma เข้า createApp() ได้ทันทีโดยไม่ต้องต่อ MySQL จริง!",
          code: `// backend/app.js — Dependency Injection
function createApp({ prisma, teamCode = process.env.TEAM_CODE, logger = console }) {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json());

  app.get("/api/v1/health", (_req, res) => res.status(200).json({ status: "ok", team: teamCode }));
  app.use("/api/v1/schedules", createScheduleRouter(prisma));
  app.use("/api/v1/year-levels", createGetYearLevelSchedulesRouter(prisma));
  app.use("/api/v1/students", createStudentRouter(prisma));
  app.use("/api/v1/students", createSelectionRouter(prisma));
  return app;
}`,
        },
        {
          file: "backend/services/student.service.js & selection.service.js",
          role: "Profile Decoding & Selection Business Logic",
          explain: "student.service.js ตรวจรหัส 11 หลักด้วย regex /^\\d{11}$/, ดึง academicSettings(id=1) มาเช็ก programCode, คำนวณ yearLevel = currentAcademicYear % 100 - entryYear + 1 แล้วเช็กช่วง fromNo..toNo ส่วน selection.service.js เช็กว่าวิชาไม่ใช่ fixed ก่อน insert และจับ Prisma error P2002 (composite PK ซ้ำ) เป็น 'ALREADY_SELECTED' (409)",
          code: `// backend/services/selection.service.js
try {
  return await prisma.selection.create({ data: { studentId, courseId, section } });
} catch (error) {
  if (error.code === "P2002") return "ALREADY_SELECTED"; // composite PK (studentId, courseId) ชน
  throw error;
}

// changeSelection — ส่ง section เดิมคืนทันทีไม่ยิง UPDATE เพื่อคง updatedAt เดิม
if (current.section === section) return current;`,
        },
        {
          file: "backend/utils/schedule.js",
          role: "6-Level Sort, TIME(0) Normalization & Fixed Rule",
          explain: "ไฟล์นี้เก็บ logic กลางทั้งหมด: DAY_ORDER Map แปลง MONDAY=1..SUNDAY=7, normalizeTime() ดึง getUTCHours/getUTCMinutes จาก MySQL TIME(0) เป็น 'HH:MM', toPublicSchedule() สร้าง nested object course: { id, code, title, type, yearLevel } โดยไม่ใส่ room และ isFixed() คำนวณจาก countSectionsByCourse() ก่อนกรองกลุ่ม",
          code: `function isFixed(schedule, sectionsByCourse) {
  if (schedule.course.type !== "CORE") return false;      // ELECTIVE -> option
  if (schedule.studentGroup !== null) return true;        // CORE มีกลุ่ม A/B -> fixed
  return sectionsByCourse.get(schedule.course.id).size === 1; // CORE ไม่มีกลุ่ม 1 sec -> fixed
}`,
        },
      ],
    },

    database: {
      badge: "Database Layer",
      title: "🗄️ Database & Prisma Architecture (prisma/ + MySQL 8.4)",
      subtitle: "MySQL 8.4 (utf8mb4_unicode_ci) + Prisma 6.19 ORM — 5 Models, 4 SQL Migrations & Idempotent Seed",
      diagramId: "10-database-architecture",
      tree: `prisma/
├── schema.prisma                                   # นิยาม 3 Enums + 5 Models (camelCase <-> snake_case)
├── seed.js                                         # สคริปต์ seed ใน $transaction (upsert ตาม ID รันซ้ำได้)
├── seed-data.json                                  # ข้อมูลตั้งต้น 51 courses + 92 schedules + settings + ranges
├── README.md                                       # คู่มือ Database handoff และคำสั่ง Prisma
└── migrations/                                     # ประวัติ SQL migrations (ห้ามแก้ไฟล์เดิมที่รันไปแล้ว)
    ├── migration_lock.toml                         # ล็อก provider = "mysql"
    ├── 20261107134000_init/migration.sql           # Sprint 1: ตาราง courses, courses_schedule
    ├── 20261107220000_attribute_checks/            # Sprint 1: MySQL CHECK constraints
    ├── 20261114000000_sprint2_profile_and_selections/ # Sprint 2: academic_settings, ranges, selections
    └── 20261115000000_selection_update_timestamp/  # Sprint 2: updated_at DB timestamp behavior`,
      highlights: [
        {
          file: "prisma/schema.prisma",
          role: "Schema Mapping & Constraints",
          explain: "กำหนด 3 enums (CourseType, DayOfWeek, StudentGroup) และ 5 models โดยใช้ @map/@map() เพื่อเชื่อมโค้ด JS (camelCase) กับตาราง MySQL (snake_case), ใช้ @@unique([code, title]) บน courses เพื่อกันรหัสซ้ำแต่หัวข้อต่าง (INT403/INT521/INT540) และใช้ @@id([studentId, courseId]) บน selections",
          code: `model Course {
  id         Int              @id @default(autoincrement())
  code       String           @db.Char(6)
  title      String           @db.VarChar(100)
  type       CourseType
  yearLevel  Int              @map("year_level")
  schedules  CourseSchedule[]
  selections Selection[]

  @@unique([code, title])
  @@map("courses")
}`,
        },
        {
          file: "prisma/seed.js & prisma/seed-data.json",
          role: "Idempotent Transaction Seeding",
          explain: "ตรวจจำนวนแถวก่อน seed (51 courses / 92 schedules) แล้วรันทั้งหมดใน prisma.$transaction(..., { timeout: 30000 }) โดยใช้ upsert ตาม original ID ทำให้รัน npm run prisma:seed กี่ครั้งก็ได้ข้อมูลเดิมไม่ซ้ำ และแปลงเวลา '09:30' ด้วย new Date('1970-01-01T09:30:00.000Z') ให้ตรงกับคอลัมน์ MySQL TIME(0)",
          code: `function mysqlTime(value) {
  return new Date(\`1970-01-01T\${value}:00.000Z\`);
}

await prisma.$transaction(async (tx) => {
  await tx.academicSettings.upsert({ where: { id: 1 }, create: ..., update: ... });
  for (const course of courses) {
    await tx.course.upsert({ where: { id: course.id }, create: course, update: course });
  }
  for (const schedule of schedules) {
    await tx.courseSchedule.upsert({
      where: { id: schedule.id },
      create: { ...schedule, startTime: mysqlTime(schedule.startTime), endTime: mysqlTime(schedule.endTime) },
      update: { ...schedule, startTime: mysqlTime(schedule.startTime), endTime: mysqlTime(schedule.endTime) },
    });
  }
}, { timeout: 30000 });`,
        },
        {
          file: "compose.yaml (database service)",
          role: "MySQL 8.4 Container & Persistent Volume",
          explain: "รัน image mysql:8.4 พร้อม flag --character-set-server=utf8mb4 และ --collation-server=utf8mb4_unicode_ci เพื่อไม่ให้อักขระพิเศษ/ภาษาไทยใน remarks เสีย ผูกข้อมูลกับ named volume ชื่อ mysql-data (จึงห้ามใช้ docker compose down -v บน VM) และมี healthcheck SELECT 1 ให้ backend รอจน DB พร้อมก่อนเปิด",
          code: `database:
  image: mysql:8.4
  command: ["--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]
  volumes:
    - mysql-data:/var/lib/mysql
  healthcheck:
    test: ["CMD-SHELL", "mysql --protocol=TCP -h 127.0.0.1 -u\\"$$MYSQL_USER\\" -p\\"$$MYSQL_PASSWORD\\" \\"$$MYSQL_DATABASE\\" -e 'SELECT 1'"]`,
        },
      ],
    },
  },

  projectInfo: {
    repoName: "int504-2026-project-group-44",
    composeName: "ip26-zen",
    headCommit: "5e30ae0 (main) — refactor: split frontend schedule logic into modules",
    keycloak: {
      url: "https://bscit.sit.kmutt.ac.th/intproj26/keycloak/",
      realm: "itb-csv",
      clientId: "ip26-zen",
      pkce: "S256 (onLoad: login-required)",
    },
    packages: [
      { name: "express", version: "^5.1.0", kind: "dependency", role: "Backend HTTP server & REST API routing" },
      { name: "@prisma/client", version: "^6.19.0", kind: "dependency", role: "ORM runtime query client สำหรับ MySQL" },
      { name: "prisma", version: "6.19.3", kind: "dependency", role: "CLI สำหรับ generate, migrate deploy และ seed" },
      { name: "keycloak-js", version: "^26.2.5", kind: "dependency", role: "OIDC / PKCE S256 client ฝั่ง Frontend (bundle ด้วย esbuild)" },
      { name: "tailwindcss / @tailwindcss/cli", version: "4.3.5", kind: "devDependency", role: "คอมไพล์ frontend/input.css → frontend/output.css" },
      { name: "esbuild", version: "^0.28.2", kind: "devDependency", role: "Bundle frontend/scripts/my-schedule.js → frontend/my-schedule.js (IIFE)" },
    ],
    scripts: [
      { name: "npm start", cmd: "node --env-file-if-exists=.env backend/server.js", desc: "เปิด Backend API (:3000) และเสิร์ฟ ../frontend สำหรับ dev บนเครื่อง" },
      { name: "npm run dev", cmd: "node --watch --env-file-if-exists=.env backend/server.js", desc: "รัน Backend พร้อม auto-reload เมื่อแก้ไฟล์" },
      { name: "npm test", cmd: "node --test backend/app.test.js", desc: "รัน unit/integration tests ด้วย Node built-in test runner" },
      { name: "npm run build:css", cmd: "tailwindcss -i ./frontend/input.css -o ./frontend/output.css --minify", desc: "สร้างไฟล์ CSS ที่ minify แล้วจาก Tailwind v4" },
      { name: "npm run build:js", cmd: "esbuild frontend/scripts/my-schedule.js --bundle --format=iife --outfile=frontend/my-schedule.js", desc: "รวมโมดูลใน frontend/scripts/* + keycloak-js เป็นไฟล์เดียว" },
      { name: "npm run prisma:generate", cmd: "prisma generate", desc: "สร้าง Prisma Client จาก prisma/schema.prisma" },
      { name: "npm run prisma:migrate", cmd: "prisma migrate deploy", desc: "รัน SQL migrations ทั้งหมดลง MySQL" },
      { name: "npm run prisma:seed", cmd: "node --env-file-if-exists=.env prisma/seed.js", desc: "Upsert ข้อมูลตั้งต้น (51 courses, 92 schedules, 1 settings, 8 ranges)" },
    ],
    containers: [
      { name: "proxy", image: "nginx:stable-alpine", ports: "80, 443", health: "wget http://127.0.0.1/healthz", role: "HTTPS TLS + Reverse proxy แยก /api/ ไป backend:3000 และ / ไป frontend:80 ใต้ /intproj26/${TEAM_PATH}/" },
      { name: "frontend", image: "build: frontend/Dockerfile", ports: "80 (internal)", health: "wget http://127.0.0.1/index.html", role: "เสิร์ฟ static HTML, output.css, app.js และ bundle my-schedule.js" },
      { name: "backend", image: "build: backend/Dockerfile", ports: "3000 (internal)", health: "fetch http://127.0.0.1:3000/api/v1/health", role: "Express 5 + Prisma Client คุยกับ MySQL และตอบ /api/v1/*" },
      { name: "database", image: "mysql:8.4", ports: "3306 (internal)", health: "mysql -e 'SELECT 1'", role: "MySQL utf8mb4_unicode_ci พร้อม persistent volume ชื่อ mysql-data" },
    ],
    nginxRoutes: [
      { match: "HTTP :80  /healthz", target: "200 'ok'", note: "Healthcheck ภายในของ proxy container" },
      { match: "HTTP :80  /", target: "308 → https://$host$request_uri", note: "บังคับ redirect HTTP ทั้งหมดเป็น HTTPS" },
      { match: "HTTPS :443  = /intproj26/${TEAM_PATH}", target: "308 → /intproj26/${TEAM_PATH}/", note: "เติม trailing slash เพื่อรักษา relative path ./api/v1/" },
      { match: "HTTPS :443  /intproj26/${TEAM_PATH}/api/", target: "proxy_pass http://backend:3000/api/", note: "ตัด prefix TEAM_PATH ออกแล้วส่งต่อให้ Express" },
      { match: "HTTPS :443  /intproj26/${TEAM_PATH}/", target: "proxy_pass http://frontend:80/", note: "ส่งต่อไฟล์หน้าเว็บทั้งหมดให้ frontend container (path อื่นตอบ 404)" },
    ],
    migrations: [
      { id: "20261107134000_init", sprint: 1, desc: "สร้างตาราง courses และ courses_schedule พร้อม enum CourseType, DayOfWeek, StudentGroup" },
      { id: "20261107220000_attribute_checks", sprint: 1, desc: "เพิ่ม CHECK constraints ตรวจความถูกต้องของ attributes ในระดับ MySQL" },
      { id: "20261114000000_sprint2_profile_and_selections", sprint: 2, desc: "เพิ่มตาราง academic_settings, student_group_ranges และ selections (composite PK)" },
      { id: "20261115000000_selection_update_timestamp", sprint: 2, desc: "ปรับคอลัมน์ updated_at ใน selections ให้ DB จัดการ timestamp อย่างถูกต้องตาม PBI 7" },
    ],
    files: [
      // Backend existing
      { path: "backend/server.js", layer: "backend", status: "existing", owner: "Beam", exports: "entrypoint", desc: "อ่าน PORT/TEAM_CODE, สร้าง PrismaClient, เรียก createApp() และเปิด server (graceful shutdown)" },
      { path: "backend/app.js", layer: "backend", status: "sprint3-edit", owner: "Beam + Dragon", exports: "createApp, compareSchedules, normalizeTime, toPublicSchedule", desc: "ประกอบ Express app, /api/v1/health, ผูก routes ทั้งหมด, เสิร์ฟ ../frontend สำหรับ local dev และ error handler 500 | Sprint 3: ติด auth middleware ก่อน validation + เพิ่ม routes ของ PBI 8 & 12" },
      { path: "backend/routes/schedule.routes.js", layer: "backend", status: "existing", owner: "Beam", exports: "createScheduleRouter, createGetYearLevelSchedulesRouter", desc: "จับคู่ GET /api/v1/schedules และ GET /api/v1/year-levels/:yearLevel/schedules" },
      { path: "backend/routes/student.routes.js", layer: "backend", status: "sprint3-edit", owner: "Alan / Beam / Dragon", exports: "createStudentRouter", desc: "จับคู่ GET /api/v1/students/:studentId | Sprint 3: เพิ่ม GET /:studentId/sessions และ role/self guard" },
      { path: "backend/routes/selection.routes.js", layer: "backend", status: "sprint3-edit", owner: "Beam + Dragon", exports: "createSelectionRouter", desc: "จับคู่ GET/POST/DELETE /students/:studentId/selections และ PUT/DELETE .../:courseId | Sprint 3: ติด auth + validation" },
      { path: "backend/controllers/schedule.controller.js", layer: "backend", status: "sprint3-edit", owner: "Beam + Alan", exports: "createGetSchedulesHandler, createGetYearLevelSchedulesHandler", desc: "ตรวจ query yearLevel/studentGroup, เรียงลำดับ และกรอง fixed/option | Sprint 3: เพิ่ม lecturers[] เฉพาะ year-levels + problem+json" },
      { path: "backend/controllers/student.controller.js", layer: "backend", status: "sprint3-edit", owner: "Alan", exports: "createGetStudentProfileHandler", desc: "รับ :studentId ส่งให้ student.service และตอบ 200 หรือ 404 | Sprint 3: แปลง 404 เป็น problem+json" },
      { path: "backend/controllers/selection.controller.js", layer: "backend", status: "sprint3-edit", owner: "Beam + Dragon", exports: "createGet/Post/Reset/Remove/Change handlers", desc: "จัดการ CRUD selections (200/201/204/404/409) | Sprint 3: เพิ่ม validation, clash 409 schedule-clash และ acceptClash" },
      { path: "backend/services/schedule.service.js", layer: "backend", status: "sprint3-edit", owner: "Beam + Alan", exports: "findSchedules", desc: "Query prisma.courseSchedule.findMany({ include: { course: true } }) | Sprint 3: include lecturers สำหรับ year-levels" },
      { path: "backend/services/student.service.js", layer: "backend", status: "existing", owner: "Alan", exports: "findStudentProfile", desc: "ตรวจรหัส 11 หลัก, เทียบ programCode จาก academic_settings (id=1), คำนวณ yearLevel และหา range ใน student_group_ranges" },
      { path: "backend/services/selection.service.js", layer: "backend", status: "sprint3-edit", owner: "Beam + Dragon", exports: "findSelections, createSelection, resetSelections, removeSelection, changeSelection", desc: "Logic เลือก/ลบ/เปลี่ยน section และจับ P2002 (ALREADY_SELECTED) | Sprint 3: เชื่อม clash.service.js และแยก selection-not-found vs section-not-found" },
      { path: "backend/utils/schedule.js", layer: "backend", status: "sprint3-edit", owner: "Beam", exports: "compareSchedules, normalizeTime, toPublicSchedule, countSectionsByCourse, toYearLevelSchedule", desc: "Sort 6 ระดับ (DAY_ORDER Map), แปลง TIME(0)→HH:MM, สร้าง object nested course: {...}, คำนวณ isFixed()" },
      { path: "backend/app.test.js", layer: "backend", status: "existing", owner: "ทั้งทีม", exports: "node:test suite", desc: "ชุดทดสอบ Backend อัตโนมัติ รันด้วย npm test" },
      // Frontend existing
      { path: "frontend/index.html", layer: "frontend", status: "existing", owner: "Dragon", exports: "Guest UI", desc: "หน้า Home (PBI 1–2): ปุ่ม All/Year 1–4, ตาราง 9 คอลัมน์ (ไม่มี Room), ลิงก์ ./my-schedule.html และ #error-dialog" },
      { path: "frontend/app.js", layer: "frontend", status: "sprint3-edit", owner: "Dragon / Beam", exports: "Guest controller", desc: "โหลด ./api/v1/schedules ครั้งเดียวเก็บใน allSchedules, กรองจาก cache, pushState | Sprint 3 (PBI 9): ล้าง ?yearLevel ที่ผิดเป็น All โดยไม่ reload" },
      { path: "frontend/my-schedule.html", layer: "frontend", status: "sprint3-edit", owner: "Alan + Beam", exports: "My Schedule UI", desc: "โครงหน้าส่วนตัว 2 ตาราง (my-schedule, course-options) + 4 dialogs | Sprint 3: Beam เพิ่ม clash dialog, Alan เพิ่มปุ่มสลับ Weekly Timetable + Instructor" },
      { path: "frontend/scripts/my-schedule.js", layer: "frontend", status: "sprint3-edit", owner: "Alan (จุดรวม)", exports: "entry bundle source", desc: "State หลัก { studentId, schedules, selections }, เรียก signIn → getStudentProfile → Promise.all([schedules, selections]) | build เป็น frontend/my-schedule.js" },
      { path: "frontend/scripts/auth.js", layer: "frontend", status: "sprint3-edit", owner: "Alan → Dragon (S3)", exports: "signIn, signOut, isLecturer", desc: "ตั้งค่า Keycloak (realm itb-csv, clientId ip26-zen, PKCE S256) และเช็ก role | Sprint 3: Dragon เพิ่ม token refresh (updateToken)" },
      { path: "frontend/scripts/api.js", layer: "frontend", status: "sprint3-edit", owner: "Dragon (S3)", exports: "apiRequest, getJson", desc: "Wrapper กลางสำหรับ fetch() ทุกตัวของหน้า My Schedule | Sprint 3: แนบ Authorization: Bearer + refresh token ก่อนส่ง" },
      { path: "frontend/scripts/profile.js", layer: "frontend", status: "existing", owner: "Alan", exports: "getStudentProfile", desc: "เรียก ./api/v1/students/{id} — คืน null เฉพาะ 404, สถานะอื่น throw เพื่อเปิด error dialog" },
      { path: "frontend/scripts/course-tables.js", layer: "frontend", status: "sprint3-edit", owner: "Beam → Alan (S3)", exports: "renderTables", desc: "แยก mySchedules และ options, render แถวพร้อมปุ่ม Select/Remove/Change ในช่อง remarks | Sprint 3: Alan เพิ่มคอลัมน์ Instructor" },
      { path: "frontend/scripts/dialogs.js", layer: "frontend", status: "sprint3-edit", owner: "Dragon → Beam (S3)", exports: "showError, showMessage, askRemove, askChange", desc: "จัดการ <dialog> ทั้ง 4 ตัวแบบ Promise | Sprint 3: Beam เพิ่ม askClash() สำหรับ PBI 11" },
      { path: "frontend/scripts/selections.js", layer: "frontend", status: "sprint3-edit", owner: "Dragon → Beam (S3)", exports: "createSelectionHandlers", desc: "handleSelect, handleRemove, handleChange พร้อม selectionPending lock | Sprint 3: Beam แยก already-selected vs schedule-clash + ส่ง acceptClash: true" },
      // Prisma & Infra existing
      { path: "prisma/schema.prisma", layer: "prisma", status: "sprint3-edit", owner: "Alan + Dragon", exports: "5 Prisma Models", desc: "Course, CourseSchedule, AcademicSettings, StudentGroupRange, Selection | Sprint 3: เพิ่ม Lecturer, ScheduleLecturer, Calendar, Session" },
      { path: "prisma/seed.js & seed-data.json", layer: "prisma", status: "sprint3-edit", owner: "Alan + Dragon", exports: "Idempotent seed", desc: "Upsert 51 courses, 92 schedules, 1 settings, 8 ranges | Sprint 3: เพิ่ม schedules 93–97, lecturers 26, links 70, calendar" },
      { path: "compose.yaml & nginx/default.conf.template", layer: "infra", status: "existing", owner: "Dragon", exports: "4-container stack", desc: "ตั้งค่า proxy, frontend, backend, database (mysql:8.4 utf8mb4) และ routing /intproj26/${TEAM_PATH}/" },
      // Sprint 3 new files planned
      { path: "backend/utils/problem.js", layer: "sprint3", status: "sprint3-new", owner: "Beam", exports: "sendProblem", desc: "[สร้างใหม่ S3] Helper สร้าง error มาตรฐาน application/problem+json ใช้ร่วมกันทั้งทีม (400–499)" },
      { path: "backend/middleware/validate-request.js", layer: "sprint3", status: "sprint3-new", owner: "Beam", exports: "validators", desc: "[สร้างใหม่ S3] ตรวจ path/query/body ทุก endpoint และรวมทุก field ที่ผิดลง errors ของ 400" },
      { path: "backend/middleware/auth.js", layer: "sprint3", status: "sprint3-new", owner: "Dragon", exports: "requireToken, requireRole, requireSelf", desc: "[สร้างใหม่ S3] ตรวจ JWT signature ด้วย JWKS, iss, exp, azp === TEAM-CODE และ role/เจ้าของข้อมูล" },
      { path: "backend/services/clash.service.js", layer: "sprint3", status: "sprint3-new", owner: "Beam", exports: "findScheduleClashes", desc: "[สร้างใหม่ S3] ตรวจเวลาเรียนชนกัน 3 เงื่อนไข (วัน + เวลา < + สัปดาห์ <=) และเรียงผล clashes[]" },
      { path: "backend/routes/lecturer.routes.js (+ controller/service)", layer: "sprint3", status: "sprint3-new", owner: "Alan", exports: "GET /lecturers/:username/schedules", desc: "[สร้างใหม่ S3] API ตารางสอนอาจารย์ผ่านตาราง schedule_lecturer" },
      { path: "backend/routes/semester.routes.js + session.controller/service.js", layer: "sprint3", status: "sprint3-new", owner: "Beam", exports: "GET /semester, GET .../sessions", desc: "[สร้างใหม่ S3] API ภาคเรียนและตารางรายสัปดาห์ (weekStart–weekEnd, holidays, sessions)" },
      { path: "prisma/generate-sessions.js", layer: "sprint3", status: "sprint3-new", owner: "Dragon", exports: "1,181 sessions", desc: "[สร้างใหม่ S3] สร้าง sessions 1,181 แถว (id 1–1181) รวมวันหยุดและตัดช่วงสอบ (รวม 26/10/2026)" },
      { path: "frontend/scripts/lecturer.js & timetable.js", layer: "sprint3", status: "sprint3-new", owner: "Alan", exports: "Teaching Schedule & Weekly View", desc: "[สร้างใหม่ S3] หน้าตารางสอนอาจารย์ (PBI 8) และตารางรายสัปดาห์พร้อม cache รายสัปดาห์ (PBI 12)" },
    ],
  },

  timeline: [
    { date: "27 ต.ค. 2569", sprint: "Intro", text: "Class 1 — Course Brief และภาพรวมระบบ itb-csv" },
    { date: "3 พ.ย. 2569", sprint: "Sprint 1", text: "Class 2 — เริ่ม Sprint 1 (PBI 1–2: Guest Schedule & Year Filter)" },
    { date: "9 พ.ย. 2569 · 23:59", sprint: "Sprint 1", text: "Snapshot Sprint 1" },
    { date: "10 พ.ย. 2569", sprint: "Sprint 2", text: "Class 3 — เริ่ม Sprint 2 (PBI 3–7: Keycloak, My Schedule, Select/Remove/Change)" },
    { date: "16 พ.ย. 2569 · 18:00 / 23:59", sprint: "Sprint 2", text: "Trial (18:00) และ Snapshot Sprint 2 (23:59)" },
    { date: "17 พ.ย. 2569", sprint: "Sprint 3", text: "Class 4 — ปล่อยรายละเอียด Sprint 3 (PBI 8–12) และบันทึก Commitment" },
    { date: "19 พ.ย. 2569", sprint: "Sprint 3", text: "ปล่อยชุดทดสอบ Sprint 3 (tests/expected)" },
    { date: "23 พ.ย. 2569 · 18:00 / 23:59", sprint: "Sprint 3", text: "Trial (18:00) และ Snapshot สุดท้าย (23:59) — PBI 1–12 ต้องผ่านทั้งหมด" },
  ],

  teamRoles: [
    {
      name: "Alan",
      color: "indigo",
      sprint1: "Database + Prisma Schema, Migration, Seed 51 Courses / 92 Schedules, MySQL utf8mb4",
      sprint2: "PBI 3 Sign In/Out (Keycloak), academic_settings & student_group_ranges, Profile API/UI, Config Deploy",
      sprint3: "PBI 8 View Lecturer Schedule (DB/API/UI + Instructor column) และ PBI 12 Frontend Weekly Timetable (timetable.js)",
    },
    {
      name: "Beam",
      color: "emerald",
      sprint1: "Backend Express API (/health, /schedules + filter & 6-level sort + no room), Backend Dockerfile",
      sprint2: "PBI 4 Year-level Schedules API (fixed/option + room) & 2 ตาราง My Schedule, PBI 5 Select Section (API + UI)",
      sprint3: "PBI 9 Validate Requests & application/problem+json (+ Home URL fix), PBI 11 Warn Selection Clash (API + Dialog), PBI 12 API (/semester, /sessions)",
    },
    {
      name: "Dragon",
      color: "amber",
      sprint1: "Frontend Guest UI (HTML/Tailwind/JS), Nginx Reverse Proxy, Frontend Dockerfile & Docker Compose (4 containers)",
      sprint2: "PBI 4/6/7 Selections schema + GET/reset, Remove & Change Section (API + UI + timestamp rules)",
      sprint3: "PBI 10 Protect API (JWKS/JWT middleware + Bearer token refresh), PBI 12 Calendar & generate-sessions (1,181 แถว), Config/Deploy บน VM",
    },
  ],

  pbis: [
    {
      id: "PBI1",
      sprint: 1,
      name: "VIEW-ALL-SCHEDULE",
      title: "ดูตารางเรียนสาธารณะทั้งหมด (Guest)",
      owners: ["Alan", "Beam", "Dragon"],
      tests: "TC-PBI1-1 ถึง TC-PBI1-11",
      summary: "หน้า Home แสดงตารางเรียน 92 แถวโดยไม่ Sign In, เรียงลำดับ 6 ระดับ และไม่ส่ง/ไม่แสดง room",
      details: [
        "GET /api/v1/health ตอบ 200 พร้อม { status: 'ok', team: '<TEAM-CODE>' } เท่านั้น",
        "GET /api/v1/schedules คืน 92 แถว เรียงตาม yearLevel → courseId → section → dayOfWeek (Monday..Sunday) → startTime → id",
        "Public API ห้ามคืน room และห้ามคืน fixed; studentGroup/remarks ที่ไม่มีค่าต้องเป็น null",
        "Frontend แสดง 9 คอลัมน์ (Code, Title, Type, Section, Group, Day, Time, Weeks, Remarks) พร้อม data-testid ครบ",
      ],
      traps: [
        "ห้ามเรียงวันตามตัวอักษร (FRIDAY จะมาก่อน MONDAY) ต้อง map ลำดับ Monday = 1 ถึง Sunday = 7",
        "Error modal ต้องมี role='dialog' และปิดด้วยปุ่ม Esc ไม่ได้",
        "หน้า Home ห้ามติดต่อ Keycloak และต้องโหลด /schedules เพียงครั้งเดียว",
      ],
    },
    {
      id: "PBI2",
      sprint: 1,
      name: "VIEW-SCHEDULE-BY-YEAR-LEVEL",
      title: "กรองตารางเรียนตามชั้นปี 1–4",
      owners: ["Beam", "Dragon"],
      tests: "TC-PBI2-1 ถึง TC-PBI2-9",
      summary: "ปุ่ม All / Year 1–4 กรองจาก cache ในหน้าเว็บโดยไม่ fetch ซ้ำ และอัปเดต URL ด้วย history.pushState()",
      details: [
        "Backend รองรับ GET /api/v1/schedules?yearLevel=1..4",
        "Frontend ใช้ปุ่ม <button> จริงพร้อม aria-pressed='true|false'",
        "เปลี่ยนชั้นปีโดยไม่ reload หน้า, อัปเดต URL ด้วย history.pushState() และรองรับการเปิดลิงก์ ?yearLevel=n โดยตรง",
      ],
      traps: [
        "หลังโหลดครั้งแรกแล้ว กดสลับ Year 1–4 หรือ All ห้ามยิง request ไป /api/v1/schedules ซ้ำ (TR-06)",
        "จำนวนแถวอ้างอิงใน seed: Year 1 = 27, Year 2 = 17, Year 3 = 28, Year 4 = 20 (รวม 92)",
      ],
    },
    {
      id: "PBI3",
      sprint: 2,
      name: "SIGN-IN",
      title: "เข้าสู่ระบบและออกจากระบบผ่าน Keycloak",
      owners: ["Alan"],
      tests: "TC-PBI3-1 ถึง TC-PBI3-6",
      summary: "ลิงก์ My Schedule จาก Home พาไป my-schedule.html ที่ใช้ Keycloak PKCE S256 และ Sign Out จบ session",
      details: [
        "my-schedule.html ใช้ keycloak-js: onLoad 'login-required', realm 'itb-csv', pkceMethod 'S256', clientId = TEAM-CODE",
        "แสดงชื่อเต็มจาก token และปุ่ม Sign Out ที่จบ Keycloak session แล้วกลับหน้า Home",
        "ใช้ preferred_username เป็น studentId/username และแยก role (student / lecturer) จาก token",
      ],
      traps: [
        "ห้ามสร้างตารางบัญชีหรือเก็บชื่อ/รหัสผ่านจาก Keycloak ลงฐานข้อมูล",
        "หลัง Sign Out แล้วเข้า My Schedule ใหม่ต้องถูกบังคับ Sign In อีกครั้ง",
      ],
    },
    {
      id: "PBI4",
      sprint: 2,
      name: "VIEW-MY-SCHEDULE",
      title: "ดูตารางเรียนส่วนตัวและวิชาเลือกของชั้นปี",
      owners: ["Alan", "Beam", "Dragon"],
      tests: "TC-PBI4-1 ถึง TC-PBI4-20",
      summary: "คำนวณปี/กลุ่มจาก Backend, แบ่งวิชา fixed vs option, แสดง 2 ตารางพร้อมคอลัมน์ Room",
      details: [
        "GET /api/v1/students/{id} ตรวจรหัส 11 หลัก (YY + programCode 6 หลัก + NNN) กับ academic_settings & student_group_ranges",
        "GET /api/v1/year-levels/{n}/schedules?studentGroup=A|B คืน fields เดิม + room + fixed",
        "กฎ fixed: CORE ที่มีกลุ่ม A/B หรือ CORE ไม่มีกลุ่มและมี section เดียว = fixed; CORE ไม่มีกลุ่มหลาย section และ ELECTIVE = option",
        "ขอ profile, schedules และ selections อย่างละ 1 ครั้งต่อ page load",
      ],
      traps: [
        "ต้องนับจำนวน distinct sections ของแต่ละ course ก่อนกรอง studentGroup เสมอ!",
        "เฉพาะ Profile 404 เท่านั้นที่แสดง 'Your account is not a student of the BSc.IT program.' — ถ้า selections ได้ 404 ให้ใช้ error dialog",
        "ใช้ courseId เป็นตัวระบุ ห้ามใช้ code เพราะ INT403/INT521/INT540 มีหลายหัวข้อ",
      ],
    },
    {
      id: "PBI5",
      sprint: 2,
      name: "SELECT-SECTION",
      title: "เลือก section เข้าตารางเรียน",
      owners: ["Beam"],
      tests: "TC-PBI5-1 ถึง TC-PBI5-14",
      summary: "ปุ่ม Select ส่ง POST ทันทีไม่ถามยืนยัน ย้ายทุกแถวของ section เข้า My Schedule โดยไม่ refetch schedules",
      details: [
        "POST /api/v1/students/{id}/selections ด้วย { courseId, section }",
        "201 สำเร็จ → ย้ายทุกแถวของ section ลง My Schedule และนำทุก option ของ course ออกจาก Courses to Choose",
        "409 ซ้ำ course (ทั้ง section เดิมหรือใหม่) → 'This course is already in your schedule.'",
        "404 ไม่ใช่ option ของปีนั้น / fixed / ไม่มี section → 'This section is not available to you.'",
      ],
      traps: [
        "เมื่อเกิด 404/409 แล้วกด OK หรือ Esc ต้อง reread selections (หรือ reload) เพื่อให้ 2 ตารางตรงกับ DB กรณีอีกแท็บแก้ข้อมูลไปก่อน",
        "เมื่อเลือกครบทุก course แล้ว ต้องซ่อนทั้ง heading และ table ของ Courses to Choose",
      ],
    },
    {
      id: "PBI6",
      sprint: 2,
      name: "REMOVE-SELECTION",
      title: "ลบ section ที่นักศึกษาเลือกเอง",
      owners: ["Dragon"],
      tests: "TC-PBI6-1 ถึง TC-PBI6-8",
      summary: "ปุ่ม Remove เฉพาะแถวที่เลือกเอง มี confirm dialog บนหน้าเว็บ (ไม่ใช้ browser confirm) และคืนทุก section ของ course",
      details: [
        "DELETE /api/v1/students/{id}/selections/{courseId} → 204 (ไม่มี response body) หรือ 404",
        "DELETE /api/v1/students/{id}/selections → reset ทั้งหมด (204 แม้เริ่มว่าง, 404 ถ้าไม่ใช่นักศึกษาในโปรแกรม)",
        "Dialog ถามยืนยัน เช่น 'Remove INT221 UI Design section 1?' พร้อมปุ่ม Remove / Cancel",
      ],
      traps: [
        "วิชา fixed ห้ามมีปุ่ม Remove; Cancel หรือ Esc ห้ามส่งคำสั่งลบ",
        "เมื่อลบสำเร็จต้องคืนทุก section ของ course นั้นกลับเข้า Courses to Choose ตามลำดับ PBI1 โดยไม่ reload/refetch schedules",
      ],
    },
    {
      id: "PBI7",
      sprint: 2,
      name: "CHANGE-SECTION",
      title: "เปลี่ยน section ในครั้งเดียว",
      owners: ["Dragon"],
      tests: "TC-PBI7-1 ถึง TC-PBI7-10",
      summary: "ปุ่ม Change เฉพาะวิชาที่เลือกและมีหลาย section พร้อม radio dialog ที่คง createdAt และจัดการ updatedAt ถูกต้อง",
      details: [
        "PUT /api/v1/students/{id}/selections/{courseId} ด้วย { section }",
        "Dialog แสดงเฉพาะ section อื่นเป็น radio เช่น 'Section 2: Thursday 14:00-17:00' และปุ่ม Change disabled จนกว่าจะเลือก",
        "200 แทนทุกแถวของ section เดิมด้วย section ใหม่และเรียงแบบ PBI1",
      ],
      traps: [
        "ส่ง section เดิมซ้ำต้องตอบ 200 โดยไม่เปลี่ยนข้อมูล รวมถึง updatedAt ต้องคงเดิม!",
        "เปลี่ยนเป็น section ใหม่จริงต้องคง createdAt เดิม และอัปเดต updatedAt ตามเวลา DB",
        "ถ้าวิชานั้นมี section เดียว ห้ามแสดงปุ่ม Change (หรือซ่อน/disabled)",
      ],
    },
    {
      id: "PBI8",
      sprint: 3,
      name: "VIEW-LECTURER-SCHEDULE",
      title: "ตารางสอนอาจารย์และคอลัมน์ Instructor",
      owners: ["Alan"],
      tests: "TC-PBI8-1 ถึง TC-PBI8-9",
      summary: "เพิ่มข้อมูล lecturers 26 คน / schedule_lecturer 70 แถว, หน้า Teaching Schedule ของอาจารย์ และคอลัมน์ Instructor ในตารางนักศึกษา",
      details: [
        "GET /api/v1/lecturers/{username}/schedules คืนตารางสอนของอาจารย์เรียงตาม PBI1",
        "year-level schedules เพิ่ม lecturers: [{ id, firstName, lastName }] เรียงตาม lecturer id (ไม่มีผู้สอนตอบ [])",
        "เพิ่มคอลัมน์ Instructor ระหว่าง Room กับ Remarks ใน My Schedule และ Courses to Choose (หลายชื่อคั่นด้วย ', ')",
      ],
      traps: [
        "Public GET /api/v1/schedules ห้ามเพิ่ม lecturers",
        "หน้า Courses ของอาจารย์ห้ามเรียก student endpoints และต้องแยกกรณี 'ไม่มี record' กับ 'ไม่มีชั้นเรียน'",
      ],
    },
    {
      id: "PBI9",
      sprint: 3,
      name: "VALIDATE-REQUESTS",
      title: "ตรวจสอบ input ทุก endpoint และ error แบบ application/problem+json",
      owners: ["Beam"],
      tests: "TC-PBI9-1 ถึง TC-PBI9-10",
      summary: "Validation path/query/body ครบทุก field, ตอบ 400–499 เป็น application/problem+json และล้าง yearLevel ที่ผิดในหน้า Home",
      details: [
        "ตรวจ yearLevel (1–4), studentGroup (A/B), studentId (11 หลัก), courseId (int 1..2147483647), section (int 1..99), JSON object, query ซ้ำ",
        "รายงานทุก field ที่ผิดรวมไว้ใน errors ของ 400; request ที่ไม่ผ่านต้องไม่แก้ข้อมูล",
        "ลำดับตรวจร่วมกับ PBI10: 401 → 403 → 400 → 404 → 409",
        "frontend/app.js: ถ้า ?yearLevel= ผิด ให้เลือก All และลบ parameter ที่ผิดโดยไม่ reload",
      ],
      traps: [
        "PUT ต้องตรวจ selection-not-found ก่อน section-not-found",
        "POST ต้องตรวจ already-selected ก่อน schedule-clash",
        "Content-Type ของ error 400–499 ต้องเป็น application/problem+json",
      ],
    },
    {
      id: "PBI10",
      sprint: 3,
      name: "PROTECT-API",
      title: "ป้องกัน API ด้วย Keycloak JWT / JWKS และ Role Guard",
      owners: ["Dragon"],
      tests: "TC-PBI10-1 ถึง TC-PBI10-11",
      summary: "ตรวจ signature ด้วย JWKS, iss, exp, azp (= TEAM-CODE), role และเจ้าของข้อมูล พร้อมแนบ/ต่ออายุ Bearer token จาก Frontend",
      details: [
        "Protected: /students/* (role student + preferred_username ตรง studentId), /lecturers/* (role lecturer + username ตรงกัน), /year-levels/* (student หรือ lecturer)",
        "Public: GET /health, GET /schedules, GET /semester",
        "ไม่มี/ผิด token → 401; role หรือเจ้าของข้อมูลไม่ตรง → 403",
        "Frontend ต่ออายุ token ก่อนส่ง (เช่น updateToken(30)) และถ้าต่อไม่ได้ให้ Sign In ใหม่กลับ URL เดิมรวม query",
      ],
      traps: [
        "Auth middleware ต้องทำงานก่อน validation middleware เพื่อให้ลำดับเป็น 401 → 403 → 400",
        "ได้ 401/403 บนหน้าเว็บให้ใช้ PBI1 error dialog",
      ],
    },
    {
      id: "PBI11",
      sprint: 3,
      name: "WARN-SELECTION-CLASH",
      title: "แจ้งเตือนเวลาเรียนชนกันตอน Select / Change",
      owners: ["Beam"],
      tests: "TC-PBI11-1 ถึง TC-PBI11-14",
      summary: "ตรวจวัน+เวลา+สัปดาห์ทับกัน ตอบ 409 schedule-clash พร้อม clash dialog ที่ให้กด Select/Change anyway (acceptClash: true)",
      details: [
        "ชนเมื่อ 3 เงื่อนไขพร้อมกัน: วันตรงกัน + เวลาทับกัน (startA < endB && startB < endA) + ช่วงสัปดาห์ทับกัน (startWeekA <= endWeekB && startWeekB <= endWeekA)",
        "ตอบ 409 type 'schedule-clash' พร้อม clashes เรียงตาม API โดยยังไม่บันทึก; ส่ง acceptClash: true เพื่อยืนยัน",
        "Frontend เพิ่ม askClash() ใน dialogs.js แสดง 'This section overlaps:', รายการที่ชน, ปุ่ม Select anyway / Change anyway / Cancel",
      ],
      traps: [
        "เวลาต่อกันพอดี (เช่น 12:30 กับ 12:30) ไม่ถือว่าชน; สัปดาห์ไม่ทับกันไม่ชน",
        "Change ต้องไม่นับ section เดิมของ course นั้นมาชนกับตัวเอง และ PUT section เดิมต้องตอบ 200 โดยไม่ตรวจ clash",
        "section ที่มีหลายวันต้องตรวจ clash ครบทุกแถว",
      ],
    },
    {
      id: "PBI12",
      sprint: 3,
      name: "WEEKLY-TIMETABLE",
      title: "ตารางเรียนรายสัปดาห์ (Sessions, Holidays, Semester)",
      owners: ["Alan", "Beam", "Dragon"],
      tests: "TC-PBI12-1 ถึง TC-PBI12-7 (API) + Frontend",
      summary: "Dragon สร้างปฏิทินและ sessions 1,181 แถว, Beam ทำ API /semester และ /sessions?date=, Alan ทำหน้า Weekly Timetable",
      details: [
        "GET /api/v1/semester (public) คืน academicYear, semester, startDate, endDate",
        "GET /api/v1/students/{id}/sessions?date=yyyy-mm-dd และ /lecturers/{username}/sessions?date= คืน weekStart, weekEnd, label, holidays, sessions",
        "Sessions ของนักศึกษา = fixed + selected; อาจารย์ = เฉพาะที่สอน; เรียง date → startTime → id",
        "Frontend สลับ Courses / Weekly Timetable (aria-pressed), รองรับ view/date ใน URL และ cache ผลตามสัปดาห์",
      ],
      traps: [
        "generate-sessions ต้องรวมชั้นเรียนที่ตรงวันหยุด แต่ไม่สร้าง session ในวันของ exam_periods (ระวัง 26/10/2026 อยู่ใน W11 แต่เป็นวันสอบ!)",
        "วันที่นอกภาคเรียนต้องรับได้โดยตอบ label: null และ sessions: []",
        "ห้ามขอสัปดาห์เดิมซ้ำใน page load เดียว และห้ามสรุปว่าวันหยุด = ยกเลิกเรียน",
      ],
    },
  ],

  lessons: [
    {
      id: "lesson-1",
      num: "บทที่ 1",
      title: "Architecture & 4-Layer Backend",
      subtitle: "เข้าใจภาพรวมโครงสร้างโค้ดและการไหลของ Request ตั้งแต่ Browser จนถึง MySQL",
      blocks: [
        {
          type: "text",
          heading: "ภาพรวมสถาปัตยกรรม 4 Containers + 4 Layers",
          body: "ระบบ itb-csv แยกการทำงานชัดเจนเป็น 4 Docker Containers (Nginx Reverse Proxy, Frontend Static, Backend Express API, MySQL Database) และในฝั่ง Backend แยกโค้ดเป็น 4 ชั้นเพื่อให้แบ่งงานทีม 3 คนได้โดยไม่ทับกัน:",
        },
        {
          type: "flow",
          steps: [
            { title: "Browser / Nginx", sub: "/intproj26/<TEAM-PATH>/" },
            { title: "app.js + Middleware", sub: "Auth (401/403) → Validate (400)" },
            { title: "routes/*.routes.js", sub: "จับคู่ Method + URL" },
            { title: "controllers/*.controller.js", sub: "แกะ req → ส่ง res" },
            { title: "services/*.service.js", sub: "Business Logic + Prisma" },
            { title: "MySQL (utf8mb4)", sub: "courses, selections, sessions" },
          ],
        },
        {
          type: "callout",
          tone: "warn",
          title: "กฎสำคัญห้ามสลับ: TEAM-CODE vs TEAM-PATH",
          body: "ตั้งแต่ Sprint 2 เป็นต้นไป Public URL, Nginx และ BASE_URL ต้องใช้ <TEAM-PATH> ส่วน GET /api/v1/health response, Keycloak clientId และ JWT azp ยังคงใช้ <TEAM-CODE> (เช่น ip26-zen) ห้ามสลับสองค่านี้เด็ดขาด",
        },
        {
          type: "code",
          label: "backend/app.js — โครงสร้างการเชื่อม Middleware และ Routes",
          code: `const app = express();
app.disable("x-powered-by");
app.use(express.json());

// Public endpoints (ไม่ต้องส่ง Bearer token)
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({ status: "ok", team: teamCode });
});
app.use("/api/v1/schedules", createScheduleRouter(prisma));
app.use("/api/v1/semester", createSemesterRouter(prisma));

// Protected endpoints (Sprint 3: Auth ก่อน Validation เสมอ)
app.use("/api/v1/year-levels", requireToken, createYearLevelRouter(prisma));
app.use("/api/v1/students", requireToken, createStudentRouter(prisma));
app.use("/api/v1/lecturers", requireToken, createLecturerRouter(prisma));`,
        },
      ],
    },
    {
      id: "lesson-2",
      num: "บทที่ 2",
      title: "Database, Prisma & Seeding",
      subtitle: "ออกแบบ Schema, ความสัมพันธ์ตาราง, UTF-8 และ Seed ที่รันซ้ำได้ไม่ซ้ำแถว",
      blocks: [
        {
          type: "text",
          heading: "หลักการออกแบบ Prisma Schema ของโปรเจกต์นี้",
          body: "โปรเจกต์ใช้ Prisma ORM เชื่อม MySQL 8 (charset utf8mb4 เพื่อไม่ให้ remarks ภาษาไทย/สัญลักษณ์เพี้ยน) โดยใช้ชื่อ Model/Field เป็น camelCase และ map ลงชื่อตาราง/คอลัมน์ snake_case ด้วย @map และ @@map",
        },
        {
          type: "code",
          label: "prisma/schema.prisma — ตัวอย่าง Composite Key และ Time(0)",
          code: `model CourseSchedule {
  id           Int           @id @default(autoincrement())
  courseId     Int           @map("course_id")
  course       Course        @relation(fields: [courseId], references: [id])
  section      Int
  startWeek    Int           @map("start_week")
  endWeek      Int           @map("end_week")
  dayOfWeek    DayOfWeek     @map("day_of_week")
  startTime    DateTime      @map("start_time") @db.Time(0)
  endTime      DateTime      @map("end_time") @db.Time(0)
  room         String?       @db.VarChar(20)
  studentGroup StudentGroup? @map("student_group")
  remarks      String?       @db.VarChar(255)

  @@map("courses_schedule")
}

model Selection {
  studentId String   @map("student_id") @db.Char(11)
  courseId  Int      @map("course_id")
  section   Int
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @default(now()) @map("updated_at")

  @@id([studentId, courseId]) // นักศึกษา 1 คนเลือก 1 วิชาได้สูงสุด 1 section
  @@map("selections")
}`,
        },
        {
          type: "callout",
          tone: "info",
          title: "ข้อควรระวังเรื่อง TIME(0) และ Idempotent Seed",
          body: "Prisma อ่านคอลัมน์ @db.Time(0) กลับมาเป็น Date object (UTC) ดังนั้น Backend ต้องแปลงเป็น string 'HH:MM' ด้วย getUTCHours()/getUTCMinutes() เสมอ และใน prisma/seed.js ต้องใช้ upsert ตาม original ID เพื่อรันซ้ำได้โดยไม่เกิดข้อมูลซ้ำ",
        },
      ],
    },
    {
      id: "lesson-3",
      num: "บทที่ 3",
      title: "Frontend Vanilla JS & Dialogs",
      subtitle: "การ Cache, URL Routing ด้วย pushState, Bundle build:js และรูปแบบ Dialogs",
      blocks: [
        {
          type: "text",
          heading: "กฎเหล็กฝั่ง Frontend ของ INT504",
          body: "Frontend เขียนด้วย HTML5 + Vanilla JS + Tailwind CSS โดยหน้า Guest (frontend/app.js) โหลด /api/v1/schedules เพียงครั้งเดียวแล้วกรองจาก cache ในหน่วยความจำ ส่วนหน้าส่วนตัว (frontend/my-schedule.html) เขียน source แยกโมดูลใน frontend/scripts/ แล้ว bundle เป็น frontend/my-schedule.js ด้วย npm run build:js",
        },
        {
          type: "callout",
          tone: "warn",
          title: "ห้ามแก้ frontend/my-schedule.js ด้วยมือ!",
          body: "ไฟล์ frontend/my-schedule.js เป็นไฟล์ผลลัพธ์จาก esbuild (npm run build:js) ให้แก้เฉพาะไฟล์ใน frontend/scripts/*.js แล้วค่อย build ใหม่เสมอ",
        },
        {
          type: "code",
          label: "ความต่างของ <dialog> 2 แบบในระบบ (PBI 1/4 vs PBI 5–7/11)",
          code: `// 1) Loading Error Dialog (PBI 1 & PBI 4): ห้ามปิดด้วย Esc และไม่มีปุ่ม OK
errorDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
});

// 2) Message / Confirm / Clash Dialog (PBI 5–7, 11): ปิดด้วย OK / Cancel / Esc ได้
function openRemoveDialog(item) {
  question.textContent = \`Remove \${item.code} \${item.title} section \${item.section}?\`;
  return new Promise((resolve) => {
    const onClose = () => {
      dialog.removeEventListener("close", onClose);
      resolve(dialog.returnValue === "remove");
    };
    dialog.addEventListener("close", onClose);
    dialog.returnValue = "cancel";
    dialog.showModal();
  });
}`,
        },
      ],
    },
    {
      id: "lesson-4",
      num: "บทที่ 4",
      title: "Business Logic: Sort, Fixed & Profile",
      subtitle: "สูตรคำนวณรหัสนักศึกษา 11 หลัก, ลำดับการ Sort 6 ระดับ และกฎ fixed vs option",
      blocks: [
        {
          type: "text",
          heading: "1. ลำดับการ Sort มาตรฐาน (PBI 1 — ใช้ทุกตาราง)",
          body: "ทุกตารางต้องเรียงตาม 6 ระดับนี้เสมอ: course.yearLevel → course.id → section → dayOfWeek (MONDAY=1..SUNDAY=7) → startTime ('HH:MM') → schedule.id",
        },
        {
          type: "text",
          heading: "2. สูตรแปลงรหัสนักศึกษา 11 หลัก (PBI 4)",
          body: "รหัสเช่น 68504504010 แบ่งเป็น 3 ท่อน: entryYear = '68' (2 หลักแรก), programCode = '504504' (6 หลักกลาง ตรงกับ academic_settings), studentNo = 10 (3 หลักท้าย เช็กช่วง fromNo..toNo ใน student_group_ranges) และคำนวณชั้นปีด้วย yearLevel = (currentAcademicYear % 100) - entryYear + 1 (ปี 2569: 69 - 68 + 1 = ปี 2)",
        },
        {
          type: "text",
          heading: "3. กฎแยกวิชา fixed กับ option และจำนวนแถวอ้างอิง (เมื่อยังไม่มี selections)",
          body: "ต้องนับจำนวน distinct sections ของแต่ละ course จากทุกแถวของชั้นปีก่อน แล้วค่อยกรองตาม studentGroup (เก็บทุก option และเก็บ fixed เฉพาะที่ studentGroup ตรงหรือเป็น null):",
        },
        {
          type: "table",
          headers: ["ชั้นปี", "API ทั้งปี", "API กลุ่ม A/B", "My Schedule (fixed)", "Courses to Choose (option)"],
          rows: [
            ["Year 1", "27 แถว", "18 แถว", "9 แถว", "9 แถว"],
            ["Year 2", "17 แถว", "11 แถว", "7 แถว", "4 แถว"],
            ["Year 3", "28 แถว", "28 แถว", "0 แถว", "28 แถว"],
            ["Year 4", "20 แถว", "20 แถว", "3 แถว", "17 แถว"],
          ],
        },
      ],
    },
    {
      id: "lesson-5",
      num: "บทที่ 5",
      title: "Sprint 3: Validation & Problem Details (PBI9)",
      subtitle: "การตรวจ input ทุกจุด, การรวม error หลาย field และลำดับตรวจ 401→403→400→404→409",
      blocks: [
        {
          type: "text",
          heading: "มาตรฐาน application/problem+json (RFC 7807)",
          body: "ใน Sprint 3 ทุก error ช่วง 400–499 ต้องตั้ง Content-Type เป็น application/problem+json และคืนโครงสร้างที่มี type, title, status ชัดเจน เพื่อให้ทั้งทีม (Beam + Dragon + Alan) และชุดทดสอบอ่านได้ตรงกัน",
        },
        {
          type: "code",
          label: "backend/utils/problem.js — ตัวช่วยส่ง Problem Details กลางของทีม",
          code: `function sendProblem(res, { status, type, title, detail, ...extra }) {
  return res
    .status(status)
    .type("application/problem+json")
    .json({
      type,
      title,
      status,
      ...(detail !== undefined ? { detail } : {}),
      ...extra,
    });
}

// ตัวอย่างการใช้งาน:
// sendProblem(res, { status: 400, type: "validation-error", title: "Validation Error", errors })
// sendProblem(res, { status: 409, type: "schedule-clash", title: "Schedule Clash", clashes })`,
        },
        {
          type: "callout",
          tone: "ok",
          title: "ลำดับการตรวจสอบที่ห้ามสลับเด็ดขาด",
          body: "401 Unauthorized (token ไม่มี/ผิด) → 403 Forbidden (role/เจ้าของข้อมูลไม่ตรง) → 400 Bad Request (format/range ผิด, รายงานครบทุก field) → 404 Not Found (PUT เช็ก selection-not-found ก่อน section-not-found) → 409 Conflict (POST เช็ก already-selected ก่อน schedule-clash)",
        },
      ],
    },
    {
      id: "lesson-6",
      num: "บทที่ 6",
      title: "Sprint 3: Clash, JWT Auth & Sessions (PBI10–12)",
      subtitle: "อัลกอริทึมตรวจเวลาชน 3 เงื่อนไข, Keycloak JWKS และตารางรายสัปดาห์ 1,181 sessions",
      blocks: [
        {
          type: "text",
          heading: "1. สูตรตรวจเวลาเรียนชนกัน (PBI 11)",
          body: "สองแถวตารางเรียน A และ B จะชนกันก็ต่อเมื่อเข้าเงื่อนไขครบทั้ง 3 ข้อพร้อมกัน (ใช้เครื่องหมาย < กับเวลา เพื่อให้ 12:30 ต่อ 12:30 ไม่ชน แต่ใช้ <= กับสัปดาห์ เพราะเรียนสัปดาห์เดียวกันถือว่าทับ):",
        },
        {
          type: "code",
          label: "backend/services/clash.service.js — ฟังก์ชันเช็กการชนของ 2 schedule rows",
          code: `function isScheduleClash(a, b) {
  // 1) วันเดียวกัน
  if (a.dayOfWeek !== b.dayOfWeek) return false;

  // 2) เวลาทับกัน (ต่อกันพอดีเช่น 12:30 กับ 12:30 ไม่ชน)
  const timeOverlap = a.startTime < b.endTime && b.startTime < a.endTime;
  if (!timeOverlap) return false;

  // 3) ช่วงสัปดาห์มีส่วนร่วมกัน
  const weekOverlap = a.startWeek <= b.endWeek && b.startWeek <= a.endWeek;
  return weekOverlap;
}`,
        },
        {
          type: "text",
          heading: "2. การป้องกัน API ด้วย JWT / JWKS (PBI 10)",
          body: "Dragon ทำ middleware ตรวจลายเซ็น JWT จาก JWKS endpoint ของ Keycloak realm itb-csv ตรวจ iss, exp และ azp === TEAM-CODE จากนั้นแยก guard: students/* ต้องเป็น role student + preferred_username ตรง studentId; lecturers/* ต้องเป็น role lecturer + username ตรงกัน; year-levels/* รับได้ทั้งสอง role",
        },
        {
          type: "text",
          heading: "3. การสร้าง Sessions 1,181 แถว และ API รายสัปดาห์ (PBI 12)",
          body: "Dragon สร้างตาราง academic_weeks (19 แถว), holidays (7 แถว), exam_periods (3 แถว) และ generate sessions 1,181 แถว (id 1–1181) โดยรวมคาบที่ตรงวันหยุดแต่ตัดคาบที่ตรง exam_periods ออก (ระวังวันที่ 26/10/2026 อยู่ใน W11 แต่เป็นวันสอบ) จากนั้น Beam นำมาเปิด GET /api/v1/semester และ GET .../sessions?date=yyyy-mm-dd ให้ Alan แสดงบน Weekly Timetable",
        },
      ],
    },
    {
      id: "lesson-7",
      num: "บทที่ 7",
      title: "Docker Compose, Nginx & VM Deploy",
      subtitle: "โครงสร้าง 4 Containers, Reverse Proxy ใต้ TEAM-PATH และขั้นตอนอัปเดตบน VM",
      blocks: [
        {
          type: "text",
          heading: "โครงสร้าง 4 Containers ตาม Technical Requirement (TR-02)",
          body: "บนเครื่อง VM ของทีมต้องมีอย่างน้อย 4 containers แยกกันชัดเจน: proxy (Nginx publish port 443), frontend (เสิร์ฟไฟล์ static + bundle), backend (Node.js + Express + @prisma/client), และ database (MySQL 8 utf8mb4)",
        },
        {
          type: "code",
          label: "ขั้นตอน Deploy หลัง Merge บน VM (ห้ามลบ DB Volume!)",
          code: `# 1. ดึงโค้ดล่าสุดบน VM
git pull origin main

# 2. Build frontend & backend images ใหม่ (รวมไฟล์ที่เพิ่งเพิ่ม)
docker compose build backend frontend

# 3. รัน containers จาก images ใหม่
docker compose up -d

# 4. รัน migration และ seed (upsert ซ้ำได้)
docker compose exec backend npm run prisma:migrate
docker compose exec backend npm run prisma:seed

# 5. ตรวจ created time ของ containers และทดสอบ public health endpoint
docker compose ps`,
        },
        {
          type: "callout",
          tone: "warn",
          title: "ข้อห้ามสำคัญบน VM และ Course Runner Gate",
          body: "ห้ามลบ database volume, ห้ามแก้หรือลบบัญชี int504check / int504, ห้าม commit .env หรือ TEAM-PATH จริงลง public repo และต้องทดสอบผ่าน Run Now บน Sprint Portal (เรียกได้ทุก 15 นาที ปิดวันจันทร์ 17:30–18:30 และ 23:30–00:30)",
        },
      ],
    },
  ],

  apis: [
    {
      sprint: 1,
      method: "GET",
      path: "/api/v1/health",
      auth: "Public",
      owner: "Beam",
      statuses: ["200"],
      desc: "ตรวจสอบสถานะเซิร์ฟเวอร์และรหัสทีม (ต้องใช้ TEAM-CODE เสมอ)",
      sample: `{ "status": "ok", "team": "ip26-zen" }`,
    },
    {
      sprint: 1,
      method: "GET",
      path: "/api/v1/schedules?yearLevel=1..4",
      auth: "Public",
      owner: "Beam",
      statuses: ["200", "400"],
      desc: "คืนตารางเรียนสาธารณะ 92 แถว (หรือกรองตามชั้นปี 1–4) เรียง 6 ระดับ ห้ามมี room/fixed/lecturers",
      sample: `[{ "id": 1, "course": { "id": 1, "code": "INT100", "title": "Design Thinking", "type": "CORE", "yearLevel": 1 }, "section": 1, "startWeek": 1, "endWeek": 15, "dayOfWeek": "MONDAY", "startTime": "09:30", "endTime": "12:30", "studentGroup": "A", "remarks": null }]`,
    },
    {
      sprint: 2,
      method: "GET",
      path: "/api/v1/students/{studentId}",
      auth: "Bearer (student + self)",
      owner: "Alan",
      statuses: ["200", "400", "401", "403", "404"],
      desc: "คำนวณชั้นปีและกลุ่มจาก academic_settings & student_group_ranges",
      sample: `{ "studentId": "68504504010", "yearLevel": 2, "studentGroup": "A" }`,
    },
    {
      sprint: 2,
      method: "GET",
      path: "/api/v1/year-levels/{n}/schedules?studentGroup=A|B",
      auth: "Bearer (student | lecturer)",
      owner: "Beam / Alan",
      statuses: ["200", "400", "401", "403"],
      desc: "คืนตารางเรียนของชั้นปีพร้อม room, fixed (Sprint 2) และ lecturers[] (Sprint 3 PBI8)",
      sample: `[{ "...publicFields", "room": "CB2301", "fixed": true, "lecturers": [{ "id": 1, "firstName": "...", "lastName": "..." }] }]`,
    },
    {
      sprint: 2,
      method: "GET",
      path: "/api/v1/students/{studentId}/selections",
      auth: "Bearer (student + self)",
      owner: "Dragon",
      statuses: ["200", "400", "401", "403", "404"],
      desc: "คืนรายการ section ที่นักศึกษาเลือกไว้ เรียงตาม courseId (หรือ [] ถ้ายังว่าง)",
      sample: `[{ "studentId": "68504504010", "courseId": 45, "section": 9, "createdAt": "2026-11-18T00:00:00.000Z", "updatedAt": "2026-11-18T00:00:00.000Z" }]`,
    },
    {
      sprint: 2,
      method: "POST",
      path: "/api/v1/students/{studentId}/selections",
      auth: "Bearer (student + self)",
      owner: "Beam",
      statuses: ["201", "400", "401", "403", "404", "409"],
      desc: "เลือก section ใหม่ (Sprint 3 เพิ่ม clash check + acceptClash: true ใน body)",
      sample: `// Body: { "courseId": 45, "section": 9, "acceptClash": false }\n// 409 clash -> { "type": "schedule-clash", "title": "...", "status": 409, "clashes": [...] }`,
    },
    {
      sprint: 2,
      method: "PUT",
      path: "/api/v1/students/{studentId}/selections/{courseId}",
      auth: "Bearer (student + self)",
      owner: "Dragon / Beam",
      statuses: ["200", "400", "401", "403", "404", "409"],
      desc: "เปลี่ยน section ในครั้งเดียว (ส่ง section เดิมตอบ 200 คง updatedAt เดิม; Sprint 3 เพิ่ม clash check)",
      sample: `// Body: { "section": 10, "acceptClash": false }`,
    },
    {
      sprint: 2,
      method: "DELETE",
      path: "/api/v1/students/{studentId}/selections/{courseId}",
      auth: "Bearer (student + self)",
      owner: "Dragon",
      statuses: ["204", "400", "401", "403", "404"],
      desc: "ลบ section ที่เลือก (204 ต้องไม่มี response body)",
      sample: `// 204 No Content (empty body)`,
    },
    {
      sprint: 2,
      method: "DELETE",
      path: "/api/v1/students/{studentId}/selections",
      auth: "Bearer (student + self)",
      owner: "Dragon",
      statuses: ["204", "400", "401", "403", "404"],
      desc: "ล้าง selections ทั้งหมดของนักศึกษาสำหรับชุดทดสอบ (204 แม้เริ่มว่าง)",
      sample: `// 204 No Content (empty body)`,
    },
    {
      sprint: 3,
      method: "GET",
      path: "/api/v1/lecturers/{username}/schedules",
      auth: "Bearer (lecturer + self)",
      owner: "Alan",
      statuses: ["200", "400", "401", "403", "404"],
      desc: "คืนตารางสอนของอาจารย์ผ่านตาราง schedule_lecturer เรียงแบบ PBI1",
      sample: `[{ "id": 12, "code": "INT201", "title": "...", "yearLevel": 2, "section": 1, "room": "CB2304", "..." : "..." }]`,
    },
    {
      sprint: 3,
      method: "GET",
      path: "/api/v1/semester",
      auth: "Public",
      owner: "Beam",
      statuses: ["200"],
      desc: "คืนข้อมูลภาคเรียนปัจจุบันสำหรับ Weekly Timetable",
      sample: `{ "academicYear": 2569, "semester": 1, "startDate": "2026-08-10", "endDate": "2026-12-18" }`,
    },
    {
      sprint: 3,
      method: "GET",
      path: "/api/v1/students/{id}/sessions?date=yyyy-mm-dd",
      auth: "Bearer (student + self)",
      owner: "Beam",
      statuses: ["200", "400", "401", "403", "404"],
      desc: "คืนตารางรายสัปดาห์ จันทร์–อาทิตย์ (fixed + selected), วันหยุด และ label สัปดาห์ (มี endpoint เดียวกันสำหรับ /lecturers/{username}/sessions)",
      sample: `{ "weekStart": "2026-11-16", "weekEnd": "2026-11-22", "label": "W14", "holidays": [], "sessions": [...] }`,
    },
  ],

  dbTables: [
    { name: "courses", sprint: 1, rows: "51 แถว", keys: "PK id, UNIQUE(code, title)", cols: "id, code(6), title(100), type(CORE|ELECTIVE), year_level" },
    { name: "courses_schedule", sprint: 1, rows: "92 → 97 แถว (S3)", keys: "PK id, FK course_id", cols: "id, course_id, section, start_week, end_week, day_of_week, start_time, end_time, room, student_group, remarks" },
    { name: "academic_settings", sprint: 2, rows: "1 แถว", keys: "PK id", cols: "id, current_academic_year (2569), current_semester (1), program_code ('504504'), program_name ('BSc.IT') [+ start/end date S3]" },
    { name: "student_group_ranges", sprint: 2, rows: "8 แถว", keys: "PK id, UNIQUE(entry_year, student_group)", cols: "id, entry_year (66–69), student_group (A|B), from_no, to_no" },
    { name: "selections", sprint: 2, rows: "เริ่มว่าง", keys: "Composite PK(student_id, course_id)", cols: "student_id(11), course_id, section, created_at, updated_at" },
    { name: "lecturers & schedule_lecturer", sprint: 3, rows: "26 / 70 แถว", keys: "PK id, FK schedule_id + lecturer_id", cols: "ข้อมูลผู้สอน (username, firstName, lastName) และตารางเชื่อมความสัมพันธ์ M:N กับ schedules" },
    { name: "academic_weeks / holidays / exam_periods", sprint: 3, rows: "19 / 7 / 3 แถว", keys: "PK id", cols: "ปฏิทินการศึกษา, วันหยุดนักขัตฤกษ์ และช่วงสอบ (ใช้ตอน generate sessions)" },
    { name: "sessions", sprint: 3, rows: "1,181 แถว (id 1–1181)", keys: "PK id, UNIQUE(schedule_id, date)", cols: "คาบเรียนรายวันที่แตกจาก courses_schedule + teaching weeks (รวม holiday แต่ตัด exam_periods)" },
  ],

  studentRanges: [
    { entryYear: 69, studentGroup: "A", fromNo: 1, toNo: 70 },
    { entryYear: 69, studentGroup: "B", fromNo: 71, toNo: 140 },
    { entryYear: 68, studentGroup: "A", fromNo: 1, toNo: 67 },
    { entryYear: 68, studentGroup: "B", fromNo: 68, toNo: 135 },
    { entryYear: 67, studentGroup: "A", fromNo: 1, toNo: 65 },
    { entryYear: 67, studentGroup: "B", fromNo: 66, toNo: 130 },
    { entryYear: 66, studentGroup: "A", fromNo: 1, toNo: 60 },
    { entryYear: 66, studentGroup: "B", fromNo: 61, toNo: 120 },
  ],

  quiz: [
    {
      q: "ข้อใดใช้ค่า <TEAM-CODE> (ไม่ใช่ <TEAM-PATH>) ตามข้อกำหนดตั้งแต่ Sprint 2?",
      options: [
        "Public URL บนเบราว์เซอร์ (/intproj26/.../)",
        "Nginx reverse proxy path prefix",
        "GET /api/v1/health response, Keycloak clientId และ JWT azp",
        "BASE_URL ของชุดทดสอบ E2E",
      ],
      answer: 2,
      explain: "Public URL, Nginx และ BASE_URL ใช้ TEAM-PATH ส่วน health response, Keycloak clientId และ JWT azp ยังคงใช้ TEAM-CODE เสมอ",
    },
    {
      q: "ในหน้า Home (PBI 1–2) เมื่อผู้ใช้คลิกเปลี่ยนจาก All → Year 2 → Year 3 หน้าเว็บควรยิง GET /api/v1/schedules กี่ครั้ง?",
      options: [
        "3 ครั้ง (ทุกครั้งที่เปลี่ยนปุ่ม)",
        "1 ครั้งตอนเปิดหน้าเท่านั้น แล้วกรองจาก cache ในหน่วยความจำ",
        "2 ครั้ง (เฉพาะตอนกด Year 2 และ Year 3)",
        "0 ครั้ง เพราะดึงจาก localStorage",
      ],
      answer: 1,
      explain: "ตาม TR-06 หน้า Guest ต้องดึงทุก Schedule เพียงครั้งเดียวต่อการเปิดหน้า จากนั้นกรองจาก cache โดยไม่ fetch ใหม่และไม่ reload หน้า",
    },
    {
      q: "Public API GET /api/v1/schedules ต้องเรียงวันและคืน field อย่างไร?",
      options: [
        "เรียงวันตามตัวอักษร (FRIDAY ก่อน) และคืน room ด้วย",
        "เรียงวันตามปฏิทิน (MONDAY ถึง SUNDAY) และห้ามคืน room หรือ fixed",
        "เรียงตาม schedule.id อย่างเดียว และคืน room เป็น null",
        "เรียงตาม course.code และคืน lecturers[] ด้วย",
      ],
      answer: 1,
      explain: "ต้องเรียงตาม yearLevel → courseId → section → วัน (Monday..Sunday) → startTime → id และ Public API ห้ามส่ง room, fixed หรือ lecturers",
    },
    {
      q: "รหัสนักศึกษา 68504504068 ในปีการศึกษา 2569 (programCode = 504504) จะได้ผลลัพธ์จาก GET /api/v1/students/{id} เป็นอะไร?",
      options: [
        "200 { yearLevel: 2, studentGroup: 'A' }",
        "200 { yearLevel: 2, studentGroup: 'B' }",
        "200 { yearLevel: 1, studentGroup: 'B' }",
        "404 Not Found",
      ],
      answer: 1,
      explain: "entryYear 68 → yearLevel = 69 - 68 + 1 = 2 และปี 68 กลุ่ม B คือเลขลำดับ 068–135 ดังนั้น 068 คือ Year 2 · Group B",
    },
    {
      q: "วิชาประเภท CORE ที่ไม่มี studentGroup (null) และมี 2 sections แตกต่างกัน จัดเป็น fixed หรือ option?",
      options: [
        "เป็น fixed เสมอเพราะเป็นวิชา CORE",
        "เป็น option เพราะเป็น CORE ไม่มีกลุ่มที่มีหลาย section",
        "เป็น fixed เฉพาะ section 1",
        "ขึ้นอยู่กับว่านักศึกษาอยู่ Group A หรือ B",
      ],
      answer: 1,
      explain: "กฎ PBI 4: CORE ที่มีกลุ่ม A/B หรือ CORE ไม่มีกลุ่มที่มี section เดียว = fixed; ส่วน CORE ไม่มีกลุ่มที่มีหลาย section และ ELECTIVE = option",
    },
    {
      q: "ตอนทำ PBI 4 หากเรียก GET /api/v1/students/{id} ได้ 200 แต่ GET /api/v1/students/{id}/selections ได้ 404 หน้าเว็บต้องแสดงอะไร?",
      options: [
        "แสดงข้อความ Your account is not a student of the BSc.IT program.",
        "แสดง loading error dialog แบบ PBI 1 ('There is a problem. Please try again later.')",
        "ซ่อนตารางแล้วแสดงตารางว่าง",
        "Redirect กลับไปหน้า Home",
      ],
      answer: 1,
      explain: "เฉพาะ Profile API 404 เท่านั้นที่แสดง not-student — หาก selections หรือ year-level schedules พังตอนโหลดหน้า ให้แสดง loading error dialog แบบ PBI 1",
    },
    {
      q: "ใน PBI 7 (Change Section) หากส่ง PUT ด้วย section เดิมที่นักศึกษาเลือกไว้อยู่แล้ว Backend ต้องตอบอย่างไร?",
      options: [
        "409 Conflict (already-selected)",
        "400 Bad Request",
        "200 OK โดยไม่เปลี่ยนข้อมูล รวมถึง updatedAt ต้องคงเดิม (และไม่ตรวจ clash)",
        "200 OK พร้อมอัปเดต updatedAt เป็นเวลาปัจจุบัน",
      ],
      answer: 2,
      explain: "PUT section เดิมต้องเป็น idempotent: ตอบ 200 OK โดยคงทั้ง createdAt และ updatedAt เดิมไว้ และใน Sprint 3 ไม่ต้องตรวจ clash ด้วย",
    },
    {
      q: "ลำดับการตรวจสอบ Error ที่ถูกต้องใน Sprint 3 (PBI 9 + PBI 10 + PBI 11) คือข้อใด?",
      options: [
        "400 → 401 → 403 → 404 → 409",
        "401 → 403 → 400 → 404 → 409",
        "404 → 400 → 401 → 403 → 409",
        "401 → 400 → 403 → 409 → 404",
      ],
      answer: 1,
      explain: "ต้องตรวจ Auth/Token (401) → Role/Self (403) → Input Validation (400) → Not Found (404) → Conflict (409)",
    },
    {
      q: "ใน PBI 11 วิชา A เรียนวันจันทร์ 09:30–12:30 (สัปดาห์ 1–15) และวิชา B เรียนวันจันทร์ 12:30–15:30 (สัปดาห์ 1–15) ถือว่าชนกัน (schedule-clash) หรือไม่?",
      options: [
        "ชนกัน เพราะเวลา 12:30 ตรงกัน",
        "ไม่ชนกัน เพราะเวลาต่อกันพอดีไม่ได้ทับซ้อนกัน (startA < endB && startB < endA เป็น false)",
        "ชนกันเฉพาะวิชา CORE",
        "ชนกันถ้าเรียนคนละห้อง",
      ],
      answer: 1,
      explain: "เงื่อนไขเวลาทับกันใช้ strictly less than (startA < endB && startB < endA) ดังนั้น 12:30 ต่อ 12:30 ไม่ถือว่าชน",
    },
    {
      q: "เมื่อ POST selection ใน Sprint 3 พบว่าเวลาชนกันและยังไม่ได้ส่ง acceptClash: true Backend ต้องทำอย่างไร?",
      options: [
        "บันทึกลง DB แล้วตอบ 201 พร้อม warning",
        "ตอบ 409 (application/problem+json, type: schedule-clash) พร้อม clashes โดยยังไม่บันทึกลง DB",
        "ตอบ 400 validation-error",
        "ลบวิชาเก่าออกแล้วแทนที่ด้วยวิชาใหม่",
      ],
      answer: 1,
      explain: "ต้องตอบ 409 type schedule-clash พร้อมรายการ clashes โดยยังไม่บันทึก จะบันทึกต่อเมื่อ client ส่ง request เดิมซ้ำพร้อม acceptClash: true",
    },
    {
      q: "ใน PBI 12 การสร้าง sessions 1,181 แถว ต้องจัดการวันหยุด (holidays) และช่วงสอบ (exam_periods) อย่างไร?",
      options: [
        "ตัดออกทั้งวันหยุดและวันสอบ",
        "รวมคาบเรียนที่ตรงวันหยุดไว้ใน sessions แต่ไม่สร้าง session ในวันของ exam_periods (รวมถึง 26/10/2026)",
        "สร้าง session ทุกวันโดยไม่สนวันสอบ",
        "เปลี่ยนวันหยุดให้ย้ายไปวันอาทิตย์อัตโนมัติ",
      ],
      answer: 1,
      explain: "ระบบต้องยังสร้าง session ในวันหยุด (Frontend แสดง Note: Holiday แต่ห้ามสรุปว่ายกเลิกเรียน) แต่ห้ามสร้าง session ในช่วง exam_periods",
    },
    {
      q: "หากต้องการแก้โค้ดในหน้า My Schedule (เช่น เพิ่ม clash dialog) ควรแก้ไฟล์ไหนและทำอะไรต่อ?",
      options: [
        "แก้ตรงๆ ใน frontend/my-schedule.js ได้เลย",
        "แก้ใน frontend/scripts/*.js (และ my-schedule.html) แล้วรัน npm run build:js",
        "แก้ใน backend/app.js อย่างเดียว",
        "แก้ใน node_modules/keycloak-js",
      ],
      answer: 1,
      explain: "frontend/scripts/ คือ source code ส่วน frontend/my-schedule.js เป็น bundle ที่สร้างจาก esbuild ผ่าน npm run build:js ห้ามแก้ไฟล์ bundle ด้วยมือ",
    },
  ],

  resources: {
    videos: [
      {
        category: "Frontend (Vanilla JS + DOM + Tailwind)",
        items: [
          { title: "Tailwind & JavaScript Project - Products Filtering UI (Traversy Media)", query: "Traversy Media Tailwind JavaScript Products Filtering UI", desc: "ฝึก filter รายการด้วย Vanilla JS + DOM + Tailwind CSS คล้ายหน้า Guest" },
          { title: "Code a Real App with JavaScript & Tailwind (Tapascript)", query: "Tapascript Code a Real App with JavaScript Tailwind", desc: "ต่อ Fetch API + render DOM แบบไม่ใช้ framework" },
          { title: "How to Easily Set Up Tailwind CSS with Vanilla JavaScript (James Q Quick)", query: "James Q Quick Set Up Tailwind CSS Vanilla JavaScript", desc: "ตั้งค่า Tailwind CLI กับโปรเจกต์ HTML/JS" },
        ],
      },
      {
        category: "Backend (Node.js + Express + Prisma + MySQL)",
        items: [
          { title: "สอนทำ CRUD ด้วย ExpressJS, NodeJS, Prisma เชื่อมต่อ MySQL (รอยไถ พัฒนา)", query: "รอยไถ พัฒนา ExpressJS Prisma MySQL CRUD", desc: "ภาษาไทย ครบตั้งแต่ Prisma migration, Express CRUD ถึงทดสอบ API" },
          { title: "Prisma | สอนใช้ Prisma ทำ REST API เพื่อจัดการ Database (Theerakarn M.)", query: "Theerakarn M Prisma REST API", desc: "ภาษาไทย เจาะลึกการใช้งาน Prisma ORM" },
          { title: "Backend with Node.js + Express + MySQL + PRISMA Crash Course", query: "Backend with Node.js Express MySQL PRISMA Crash Course", desc: "ภาษาอังกฤษ ปูพื้นฐาน REST API ครบจบในคลิปเดียว" },
        ],
      },
      {
        category: "Auth (Keycloak PKCE & JWT Verification)",
        items: [
          { title: "Keycloak JavaScript PKCE + Express JWT Verification", query: "Keycloak Nodejs Express PKCE JWT verification middleware", desc: "ดูแนวทางตั้ง public client (PKCE S256) และตรวจ Bearer token ด้วย JWKS" },
        ],
      },
      {
        category: "Docker Compose & Nginx Reverse Proxy",
        items: [
          { title: "Docker Compose Full Stack Web (MySQL, Node.js) | หมีไลฟ์โค้ด EP.81", query: "หมีไลฟ์โค้ด Docker Compose Full Stack Web MySQL Node.js", desc: "ภาษาไทย การผูก multi-container ด้วย Docker Compose" },
          { title: "ใช้ Docker Deploy MySQL, API, Nginx ขึ้น Cloud", query: "ใช้ Docker Deploy MySQL API Nginx ขึ้น Cloud", desc: "ภาษาไทย การตั้ง Nginx reverse proxy หน้า API และ DB" },
          { title: "Full NGINX Tutorial - Demo Project with Node.js, Docker", query: "Full NGINX Tutorial Demo Project Node.js Docker", desc: "ภาษาอังกฤษ เจาะลึก Nginx reverse proxy กับ Node.js Container" },
        ],
      },
    ],
    commands: [
      { label: "รัน Backend & Frontend ในเครื่อง", cmd: "npm start" },
      { label: "รัน Backend แบบ auto-reload (dev)", cmd: "npm run dev" },
      { label: "รัน Unit Tests ของ Backend", cmd: "npm test" },
      { label: "Build Tailwind CSS", cmd: "npm run build:css" },
      { label: "Bundle Frontend Scripts (esbuild)", cmd: "npm run build:js" },
      { label: "Generate Prisma Client + Migrate + Seed", cmd: "npm run prisma:generate && npm run prisma:migrate && npm run prisma:seed" },
      { label: "Build & Start 4 Containers (Docker Compose)", cmd: "docker compose up -d --build" },
      { label: "ทดสอบ Health API ผ่าน curl", cmd: "curl -s http://localhost:3000/api/v1/health" },
    ],
  },
};
