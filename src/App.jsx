import { useState } from "react";
import "./App.css";

const SECTIONS = [
  { id: "hierarchy", label: "CDCR Hierarchy", icon: "⬡" },
  { id: "record",    label: "Disputed Record", icon: "◈" },
  { id: "redress",   label: "Avenues of Redress", icon: "◎" },
  { id: "timeline",  label: "Strategic Sequence", icon: "▹" },
];

const hierarchy = [
  { title: "CDCR Secretary",                    name: "Jeff Macomber",               scope: "Statewide Authority",            tier: 0, highlight: false },
  { title: "Undersecretary of Operations",       name: "Jason Johnson",               scope: "Operational Divisions",          tier: 1, highlight: false },
  { title: "DAPO Director",                      name: "Bryan Bishop",                scope: "Adult Parole Operations",        tier: 2, highlight: false },
  { title: "DAPO Deputy Director",               name: "Heather Bowlds",              scope: "Adult Parole Operations",        tier: 2, highlight: false },
  { title: "Asst. Deputy Director, Field Ops",   name: "Cory Alvarez",                scope: "Field Supervision Mgmt",         tier: 3, highlight: false },
  { title: "Chief Deputy Regional Admin",        name: "Marco Cruz / Jaimee Lacey",   scope: "Northern Region Oversight",      tier: 4, highlight: false },
  { title: "Parole Administrator",               name: "Keely Dodd",                  scope: "Northern Region Final Review",   tier: 5, highlight: true  },
  { title: "Unit Supervisor",                    name: "Gary Noguchi",                scope: "Stockton 2 GPS Unit",            tier: 6, highlight: false },
  { title: "Parole Agent",                       name: "Long Moua",                   scope: "Direct Supervision",             tier: 7, highlight: false },
];

const redressAvenues = [
  {
    id: "internal",
    category: "INTERNAL",
    title: "Administrative Grievance (CDCR 602)",
    color: "#D4A843",
    steps: [
      "File CDCR Form 602-1 within 30 calendar days of retention notice",
      "Submit concurrent CDCR Form 22 to Parole Agent of Record",
      "First Level Review: Chief Deputy Regional Admin (Cruz/Lacey) or Asst. Deputy Director (Alvarez) — bypasses Dodd's level",
      "If denied → Second Level: Office of Appeals (OOA) in Sacramento, acting on behalf of CDCR Secretary",
      "OOA issues final binding decision + CDCR Form 602-2 within 10 business days",
      "Administrative remedies officially EXHAUSTED upon OOA final decision",
    ],
    note: "MANDATORY first step — exhaustion required before judicial intervention.",
  },
  {
    id: "misconduct",
    category: "INTERNAL",
    title: "Staff Misconduct — Office of Internal Affairs (OIA)",
    color: "#C45C4A",
    steps: [
      "Allege deliberate misconduct: intentional violation of law, falsification, retaliation, or unethical conduct",
      "602-1 forwarded to Centralized Screening Team (CST) at CDCR HQ — bypasses regional chain of command",
      "CST applies Allegation Decision Index (ADI) to assess threshold",
      "If complex/sensitive → referred to Allegation Investigation Unit (AIU)",
      "AIU Special Agents collect evidence, conduct recorded interviews, supported by Vertical Advocate attorney",
      "Findings submitted to Hiring Authority → Employee Disciplinary Matrix applied",
      "Dodd entitled to Skelly Hearing before adverse action; may appeal to State Personnel Board (SPB)",
    ],
    note: "Activated when conduct goes beyond error into deliberate statutory subversion.",
  },
  {
    id: "oig",
    category: "INDEPENDENT",
    title: "Office of the Inspector General (OIG)",
    color: "#5A8FA8",
    steps: [
      "File complaint via OIG secure portal, toll-free hotline (800-700-5952), or mail",
      "OIG monitors OIA/AIU investigations through 3-pronged assessment system",
      "Assessment 3: Evidence preservation, interview prep, confidentiality compliance",
      "Assessment 4: Legal advice quality, scheduling diligence, deadline adherence",
      "Assessment 5: Appropriateness of findings, timeliness, avoidance of improper leniency",
      "OIG issues concurrence or non-concurrence with Hiring Authority determinations",
      "Public performance ratings: Satisfactory / Adequate / Improvement Needed / Inadequate",
    ],
    note: "Non-concurrence creates powerful independent evidence for subsequent litigation.",
  },
  {
    id: "ombudsman",
    category: "INDEPENDENT",
    title: "Office of the Ombudsman",
    color: "#7A9A6D",
    steps: [
      "File Ombudsman Assistance Request Form (CDCR Form 1707)",
      "Independent review of procedural fairness surrounding discharge denial",
      "Analysis of whether Northern Region systematically misapplies Policy 19-03",
      "Can propose sweeping policy changes directly to CDCR Secretary",
    ],
    note: "Institutional pressure mechanism — cannot overturn decisions but drives systemic reform.",
  },
  {
    id: "habeas",
    category: "JUDICIAL",
    title: "State Writ of Habeas Corpus",
    color: "#B8860B",
    steps: [
      "File in Superior Court of supervising county (San Joaquin County)",
      "Allege retention unsupported by law, arbitrary/capricious, or violates due process",
      "Court applies 'some evidence' standard to administrative record",
      "Challenge: legally flawed interpretation of PC 3000(b)(5)(B), pretextual reliance on incomplete treatment",
      "If granted → court invalidates 1502-DR and orders immediate discharge from parole",
    ],
    note: "Requires exhaustion of administrative remedies. Targets legality of custody itself.",
  },
  {
    id: "mandate",
    category: "JUDICIAL",
    title: "Writ of Mandate (CCP § 1085)",
    color: "#9B59B6",
    steps: [
      "Allege Dodd failed to perform ministerial duty to discharge under PC 3000.01 / 3000(b)(5)(B)",
      "Argue discharge obligation was non-discretionary once statutory criteria met",
      "Court order directly commands correction of administrative record",
      "Forces reversal of 'Retain On Parole' and immediate processing of discharge",
      "Must file within 30 days after notice of entry of challenged order",
    ],
    note: "Targets the specific official's failure to act — not just custody status.",
  },
  {
    id: "1983",
    category: "JUDICIAL",
    title: "Federal Civil Rights — 42 U.S.C. § 1983",
    color: "#E74C3C",
    steps: [
      "Allege person acting under color of state law deprived plaintiff of constitutional rights",
      "Fourteenth Amendment: procedural and substantive due process violations",
      "Must pierce qualified immunity: show violation of 'clearly established' right",
      "Argue Dodd knowingly relied on incompatible Policy 19-03 to prolong supervision against unambiguous statute",
      "Exposes Dodd to personal financial liability for civil damages",
      "Bypasses state claims process — files directly in federal court",
    ],
    note: "Nuclear option. Personal liability exposure for egregious constitutional violations.",
  },
  {
    id: "tort",
    category: "JUDICIAL",
    title: "California Government Claims Act (GC § 810 et seq.)",
    color: "#E67E22",
    steps: [
      "Present formal government claim within 6 months of accrual",
      "Detail circumstances, specific CDCR personnel actions, and damages suffered",
      "Entity has 45 days to act: reject, allow, or constructive denial by inaction",
      "Only after formal/constructive rejection → file civil lawsuit in state court",
      "Sue department and Dodd in individual or official capacity",
    ],
    note: "Prerequisite to state tort claims. Clock starts running at accrual.",
  },
];

const unlawfulGrounds = [
  {
    title: "Statutory Miscalculation",
    desc: "Misinterpretation of PC 3000(b)(5)(B) maximum parole period, or outdated application of Policy 19-03 if legislative amendments (e.g., SB 384 tiered registration) modified the applicable term.",
    severity: "high",
  },
  {
    title: "Unsubstantiated Violations",
    desc: "GPS charging failures may stem from equipment malfunction. Missed treatment sessions may have been authorized for medical/employment conflicts. Using contested facts as primary retention basis = arbitrary & capricious.",
    severity: "high",
  },
  {
    title: "Incomplete Treatment as Absolute Bar",
    desc: "If HOPE or the state failed to offer reasonable accommodations, using incomplete treatment to deny discharge is punitive without a public safety nexus. Level 2 below-average risk undermines retention justification.",
    severity: "medium",
  },
  {
    title: "Substantive Due Process",
    desc: "15 CCR § 3722 requires retention to be linked to criminal activity, substance abuse, gang activities, or demonstrated supervision need. A low-risk assessment with 6+ additional years lacks substantive justification.",
    severity: "high",
  },
];

function HierarchyView() {
  return (
    <div className="section-wrap">
      <p className="section-intro">
        Keely Dodd's position within the CDCR command structure — several layers below the Secretary,
        yet wielding final administrative signatory authority for the Northern Region. Her signature on the
        1502-DR transforms field recommendations into enforceable state action.
      </p>
      <div className="hierarchy-tree">
        {hierarchy.map((h, i) => {
          const indent = Math.min(h.tier * 18, 144);
          return (
            <div key={i} className="hierarchy-node" style={{ marginLeft: indent }}>
              {i > 0 && (
                <div className={`hierarchy-connector${h.highlight ? " highlight" : ""}`} />
              )}
              <div className={`hierarchy-card${h.highlight ? " highlight" : ""}`}>
                <div className="hierarchy-name-row">
                  <span className="hierarchy-role">{h.title}</span>
                  <span className="hierarchy-name">{h.name}</span>
                </div>
                <div className="hierarchy-scope">{h.scope}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="hierarchy-note">
        <strong>Key Implication:</strong> Dodd's actions are subordinate to the Assistant Deputy Directors,
        the DAPO Directorate, and the CDCR Secretary. Accountability mechanisms must leverage horizontal
        oversight (OIG) or vertical escalation (OOA → Secretary) to bypass regional loyalties.
      </div>
    </div>
  );
}

function RecordView() {
  return (
    <div className="section-wrap">
      <p className="section-intro">
        The CDCR 1502-DR finalized November 19, 2025 — the specific administrative action triggering
        all avenues of redress. Three-tier review chain unanimously recommended retention.
      </p>

      <div className="record-card">
        <div className="record-card-header">
          <span className="record-form-label">CDCR FORM 1502-DR</span>
          <span className="record-status-badge">DISCHARGE DENIED</span>
        </div>
        <div className="record-body">
          <div className="record-meta-grid">
            {[
              ["Subject",                "Brendan N. Newanforbi"],
              ["CDC Number",             "BF3571"],
              ["CSRA Score",             "2 — Below Average Risk"],
              ["Unit",                   "Stockton 2 GPS"],
              ["Review Date",            "December 1, 2025"],
              ["Controlling Discharge",  "December 2, 2030"],
              ["Time Served on Parole",  "~4 years of 6.5yr minimum"],
              ["Treatment Phase",        "Core — Block 1 Module 4/7"],
            ].map(([k, v], i) => (
              <div key={i}>
                <div className="meta-key">{k}</div>
                <div className="meta-val">{v}</div>
              </div>
            ))}
          </div>

          <div className="review-chain">
            <div className="review-chain-label">Three-Tier Review Chain</div>
            {[
              {
                role:   "Parole Agent",
                name:   "Long Moua",
                date:   "Nov 14, 2025",
                action: "Retain on Parole — Discharge Denied",
                detail: "Cited multiple violations: missed treatment (Mar 4), PACT referral (Jun 26), GPS charging failures (Jul 15, Aug 18). Ineligible under DAPO Policy 19-03 — 4yr of 6.5yr minimum.",
              },
              {
                role:   "Unit Supervisor",
                name:   "Gary Noguchi",
                date:   "Nov 2025",
                action: "Concurred — Retain on Parole",
                detail: "Noted Stable 6/LSCMI 5 (Level 2 below-average risk). Acknowledged compliance with general supervision. Flagged 6 missed treatment sessions, Core Phase status, relapse prevention plan needed.",
              },
              {
                role:     "Parole Administrator",
                name:     "Keely Dodd (#6462)",
                date:     "Nov 19, 2025",
                action:   "Finalized — Retain on Parole / Discharge Denied",
                detail:   '"Concur with the Unit Supervisor, continued parole supervision is warranted and recommended at this time." Electronic signature transforms recommendation into enforceable state decree.',
                isTarget: true,
              },
            ].map((r, i) => (
              <div key={i} className={`review-item${r.isTarget ? " target" : ""}`}>
                <div className="review-item-top">
                  <div>
                    <span className="review-role">{r.role}</span>
                    <span className="review-name">{r.name}</span>
                  </div>
                  <span className="review-date">{r.date}</span>
                </div>
                <div className="review-action">{r.action}</div>
                <div className="review-detail">{r.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grounds-title">Grounds for "Unlawful" Designation</div>
      {unlawfulGrounds.map((g, i) => (
        <div key={i} className={`ground-item ${g.severity}`}>
          <div className="ground-header">
            <span className="ground-title">{g.title}</span>
            <span className={`ground-severity ${g.severity}`}>{g.severity}</span>
          </div>
          <div className="ground-desc">{g.desc}</div>
        </div>
      ))}
    </div>
  );
}

function RedressView() {
  const [expanded, setExpanded] = useState(null);
  const categories = ["INTERNAL", "INDEPENDENT", "JUDICIAL"];
  const catColors  = { INTERNAL: "#D4A843", INDEPENDENT: "#5A8FA8", JUDICIAL: "#C45C4A" };
  const catDescs   = {
    INTERNAL:    "Mandatory exhaustion required before judicial intervention",
    INDEPENDENT: "External oversight bypassing CDCR chain of command",
    JUDICIAL:    "Coercive court powers — activated after exhaustion",
  };

  return (
    <div className="section-wrap">
      <p className="section-intro">
        Eight distinct avenues spanning internal grievance mechanisms, independent state oversight, and
        judicial remedies. Click any avenue to expand the procedural steps.
      </p>

      {categories.map((cat) => (
        <div key={cat} className="redress-category" style={{ "--cat-color": catColors[cat] }}>
          <div className="redress-category-header">
            <span className="redress-category-label">{cat}</span>
            <span className="redress-category-desc">{catDescs[cat]}</span>
          </div>
          <div className="redress-list">
            {redressAvenues.filter((a) => a.category === cat).map((a) => {
              const isOpen = expanded === a.id;
              return (
                <div
                  key={a.id}
                  className={`redress-item${isOpen ? " open" : ""}`}
                  style={{ "--color": a.color }}
                  onClick={() => setExpanded(isOpen ? null : a.id)}
                >
                  <div className="redress-item-header">
                    <div className="redress-item-left">
                      <div className="redress-dot" />
                      <span className="redress-title">{a.title}</span>
                    </div>
                    <span className={`redress-chevron${isOpen ? " open" : ""}`}>▸</span>
                  </div>

                  {isOpen && (
                    <div className="redress-body">
                      <div className="redress-steps">
                        {a.steps.map((s, j) => (
                          <div key={j} className="redress-step">
                            <span className="redress-step-num">{String(j + 1).padStart(2, "0")}</span>
                            <span className="redress-step-text">{s}</span>
                          </div>
                        ))}
                        <div className="redress-note">{a.note}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function TimelineView() {
  const phases = [
    {
      phase:    "PHASE 1",
      title:    "Administrative Exhaustion",
      color:    "#D4A843",
      deadline: "30 days from retention notice",
      items: [
        "File CDCR 602-1 + Form 22 contesting 1502-DR",
        "Articulate statutory misinterpretations, factual errors, mitigating circumstances",
        "If disability-related → concurrent CDCR Form 1824",
        "If health-related → concurrent CDCR Form 602 HC",
        "Escalate through First Level → Second Level (OOA)",
        "Secure OOA final decision letter + CDCR 602-2",
      ],
    },
    {
      phase:    "PHASE 2",
      title:    "Misconduct & External Oversight",
      color:    "#C45C4A",
      deadline: "Concurrent with Phase 1",
      items: [
        "If deliberate misconduct alleged → 602-1 triggers CST/OIA referral",
        "File OIG complaint via portal/hotline for independent monitoring",
        "File Ombudsman Assistance Request (Form 1707) for systemic review",
        "Seek OIG non-concurrence documentation for future litigation leverage",
      ],
    },
    {
      phase:    "PHASE 3",
      title:    "Judicial Intervention",
      color:    "#5A8FA8",
      deadline: "After OOA exhaustion",
      items: [
        "State Habeas Corpus → San Joaquin County Superior Court",
        "Writ of Mandate (CCP § 1085) → compel ministerial discharge duty",
        "Government tort claim → within 6 months of accrual",
        "Federal § 1983 → pierce qualified immunity for personal liability",
      ],
    },
    {
      phase:    "PHASE 4",
      title:    "Legal Advocacy & Systemic Challenge",
      color:    "#7A9A6D",
      deadline: "Ongoing",
      items: [
        "Engage CRLA (Stockton office) for public interest representation",
        "Contact ACLU / RBGG for potential class action elevation",
        "Leverage OIG public data ratings as litigation evidence",
        "Frame individual dispute as systemic Policy 19-03 challenge",
      ],
    },
  ];

  return (
    <div className="section-wrap">
      <p className="section-intro">
        The architecture of accountability demands a sequential, strategic, and legally precise approach.
        Each phase builds the evidentiary and procedural foundation for the next.
      </p>

      <div className="timeline-track">
        <div className="timeline-spine" />
        {phases.map((p, i) => (
          <div key={i} className="timeline-entry" style={{ "--color": p.color }}>
            <div className="timeline-node">
              <span className="timeline-num">{i + 1}</span>
            </div>
            <div className="timeline-entry-body">
              <div className="timeline-phase-header">
                <span className="timeline-phase-tag">{p.phase}</span>
                <span className="timeline-phase-title">{p.title}</span>
              </div>
              <div className="timeline-deadline">⏱ {p.deadline}</div>
              <div className="timeline-items-card">
                {p.items.map((item, j) => (
                  <div key={j} className="timeline-item">
                    <span className="timeline-arrow">→</span>
                    <span className="timeline-item-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AccountabilityDashboard() {
  const [activeSection, setActiveSection] = useState("hierarchy");

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-eyebrow">ADMINISTRATIVE ACCOUNTABILITY ANALYSIS</div>
        <h1 className="header-title">Avenues of Redress</h1>
        <div className="header-meta">
          <strong>Subject Official:</strong> Keely Dodd, Parole Administrator — CDCR Northern Region
          <strong className="header-meta-line">
            <strong>Triggering Action:</strong> Finalization of CDCR 1502-DR • November 19, 2025 • Badge #6462
          </strong>
        </div>
      </header>

      <nav className="nav">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`nav-btn${activeSection === s.id ? " active" : ""}`}
            onClick={() => setActiveSection(s.id)}
          >
            <span className="nav-btn-icon">{s.icon}</span>
            {s.label}
          </button>
        ))}
      </nav>

      <main className="content">
        {activeSection === "hierarchy" && <HierarchyView />}
        {activeSection === "record"    && <RecordView />}
        {activeSection === "redress"   && <RedressView />}
        {activeSection === "timeline"  && <TimelineView />}
      </main>

      <footer className="footer">
        ANALYSIS DERIVED FROM CDCR ADMINISTRATIVE RECORDS • DAPO POLICY 19-03 • PC 3000(b)(5)(B) • 42 U.S.C. § 1983
      </footer>
    </div>
  );
}
