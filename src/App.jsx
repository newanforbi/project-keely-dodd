import { useState } from "react";

const SECTIONS = [
  { id: "hierarchy", label: "CDCR Hierarchy", icon: "⬡" },
  { id: "record", label: "Disputed Record", icon: "◈" },
  { id: "redress", label: "Avenues of Redress", icon: "◎" },
  { id: "timeline", label: "Strategic Sequence", icon: "▹" },
];

const hierarchy = [
  { title: "CDCR Secretary", name: "Jeff Macomber", scope: "Statewide Authority", tier: 0, highlight: false },
  { title: "Undersecretary of Operations", name: "Jason Johnson", scope: "Operational Divisions", tier: 1, highlight: false },
  { title: "DAPO Director", name: "Bryan Bishop", scope: "Adult Parole Operations", tier: 2, highlight: false },
  { title: "DAPO Deputy Director", name: "Heather Bowlds", scope: "Adult Parole Operations", tier: 2, highlight: false },
  { title: "Asst. Deputy Director, Field Ops", name: "Cory Alvarez", scope: "Field Supervision Mgmt", tier: 3, highlight: false },
  { title: "Chief Deputy Regional Admin", name: "Marco Cruz / Jaimee Lacey", scope: "Northern Region Oversight", tier: 4, highlight: false },
  { title: "Parole Administrator", name: "Keely Dodd", scope: "Northern Region Final Review", tier: 5, highlight: true },
  { title: "Unit Supervisor", name: "Gary Noguchi", scope: "Stockton 2 GPS Unit", tier: 6, highlight: false },
  { title: "Parole Agent", name: "Long Moua", scope: "Direct Supervision", tier: 7, highlight: false },
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
  const [hoveredIdx, setHoveredIdx] = useState(null);
  return (
    <div style={{ padding: "0 8px" }}>
      <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.6, marginBottom: 28, maxWidth: 680 }}>
        Keely Dodd's position within the CDCR command structure — several layers below the Secretary, 
        yet wielding final administrative signatory authority for the Northern Region. Her signature on the 
        1502-DR transforms field recommendations into enforceable state action.
      </p>
      <div style={{ position: "relative" }}>
        {hierarchy.map((h, i) => {
          const isHovered = hoveredIdx === i;
          const indent = Math.min(h.tier * 18, 144);
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                marginLeft: indent,
                marginBottom: 2,
                display: "flex",
                alignItems: "stretch",
                transition: "all 0.2s ease",
              }}
            >
              {i > 0 && (
                <div style={{
                  width: 2,
                  background: h.highlight ? "#C45C4A" : "#334155",
                  marginRight: 12,
                  flexShrink: 0,
                  borderRadius: 1,
                }} />
              )}
              <div
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  background: h.highlight
                    ? (isHovered ? "rgba(196,92,74,0.25)" : "rgba(196,92,74,0.15)")
                    : (isHovered ? "rgba(148,163,184,0.08)" : "transparent"),
                  border: h.highlight ? "1px solid rgba(196,92,74,0.5)" : "1px solid transparent",
                  borderRadius: 6,
                  cursor: "default",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                  <span style={{
                    color: h.highlight ? "#E8A090" : "#CBD5E1",
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}>
                    {h.title}
                  </span>
                  <span style={{
                    color: h.highlight ? "#F0C4B8" : "#F8FAFC",
                    fontSize: 14,
                    fontWeight: 700,
                  }}>
                    {h.name}
                  </span>
                </div>
                <div style={{
                  color: "#64748B",
                  fontSize: 11,
                  marginTop: 2,
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}>
                  {h.scope}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{
        marginTop: 28,
        padding: "14px 18px",
        background: "rgba(196,92,74,0.08)",
        border: "1px solid rgba(196,92,74,0.25)",
        borderRadius: 8,
        fontSize: 12,
        color: "#CBD5E1",
        lineHeight: 1.6,
      }}>
        <strong style={{ color: "#E8A090" }}>Key Implication:</strong> Dodd's actions are subordinate to the Assistant Deputy Directors, the DAPO Directorate, and the CDCR Secretary. Accountability mechanisms must leverage horizontal oversight (OIG) or vertical escalation (OOA → Secretary) to bypass regional loyalties.
      </div>
    </div>
  );
}

function RecordView() {
  return (
    <div style={{ padding: "0 8px" }}>
      <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.6, marginBottom: 24, maxWidth: 680 }}>
        The CDCR 1502-DR finalized November 19, 2025 — the specific administrative action triggering 
        all avenues of redress. Three-tier review chain unanimously recommended retention.
      </p>

      <div style={{
        background: "rgba(15,23,42,0.6)",
        border: "1px solid #1E293B",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 24,
      }}>
        <div style={{
          padding: "12px 18px",
          background: "#1E293B",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}>
          <span style={{ color: "#F8FAFC", fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
            CDCR FORM 1502-DR
          </span>
          <span style={{
            color: "#C45C4A",
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 10px",
            background: "rgba(196,92,74,0.15)",
            borderRadius: 4,
            letterSpacing: "0.08em",
          }}>
            DISCHARGE DENIED
          </span>
        </div>

        <div style={{ padding: "18px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
            {[
              ["Subject", "Brendan N. Newanforbi"],
              ["CDC Number", "BF3571"],
              ["CSRA Score", "2 — Below Average Risk"],
              ["Unit", "Stockton 2 GPS"],
              ["Review Date", "December 1, 2025"],
              ["Controlling Discharge", "December 2, 2030"],
              ["Time Served on Parole", "~4 years of 6.5yr minimum"],
              ["Treatment Phase", "Core — Block 1 Module 4/7"],
            ].map(([k, v], i) => (
              <div key={i}>
                <div style={{ color: "#64748B", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3, fontFamily: "'JetBrains Mono', monospace" }}>{k}</div>
                <div style={{ color: "#E2E8F0", fontSize: 13, fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #1E293B", paddingTop: 16 }}>
            <div style={{ color: "#64748B", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>
              Three-Tier Review Chain
            </div>
            {[
              {
                role: "Parole Agent",
                name: "Long Moua",
                date: "Nov 14, 2025",
                action: "Retain on Parole — Discharge Denied",
                detail: "Cited multiple violations: missed treatment (Mar 4), PACT referral (Jun 26), GPS charging failures (Jul 15, Aug 18). Ineligible under DAPO Policy 19-03 — 4yr of 6.5yr minimum.",
              },
              {
                role: "Unit Supervisor",
                name: "Gary Noguchi",
                date: "Nov 2025",
                action: "Concurred — Retain on Parole",
                detail: "Noted Stable 6/LSCMI 5 (Level 2 below-average risk). Acknowledged compliance with general supervision. Flagged 6 missed treatment sessions, Core Phase status, relapse prevention plan needed.",
              },
              {
                role: "Parole Administrator",
                name: "Keely Dodd (#6462)",
                date: "Nov 19, 2025",
                action: "Finalized — Retain on Parole / Discharge Denied",
                detail: '"Concur with the Unit Supervisor, continued parole supervision is warranted and recommended at this time." Electronic signature transforms recommendation into enforceable state decree.',
                isTarget: true,
              },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  padding: "12px 16px",
                  marginBottom: 8,
                  background: r.isTarget ? "rgba(196,92,74,0.1)" : "rgba(30,41,59,0.5)",
                  border: r.isTarget ? "1px solid rgba(196,92,74,0.35)" : "1px solid #1E293B",
                  borderRadius: 8,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
                  <div>
                    <span style={{ color: r.isTarget ? "#E8A090" : "#94A3B8", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {r.role}
                    </span>
                    <span style={{ color: "#F8FAFC", fontSize: 13, fontWeight: 600, marginLeft: 10 }}>{r.name}</span>
                  </div>
                  <span style={{ color: "#64748B", fontSize: 11 }}>{r.date}</span>
                </div>
                <div style={{ color: r.isTarget ? "#C45C4A" : "#D4A843", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{r.action}</div>
                <div style={{ color: "#94A3B8", fontSize: 12, lineHeight: 1.5 }}>{r.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <div style={{ color: "#F8FAFC", fontSize: 15, fontWeight: 700, marginBottom: 16, letterSpacing: "-0.01em" }}>
          Grounds for "Unlawful" Designation
        </div>
        {unlawfulGrounds.map((g, i) => (
          <div
            key={i}
            style={{
              padding: "14px 18px",
              marginBottom: 8,
              background: "rgba(15,23,42,0.5)",
              border: "1px solid #1E293B",
              borderRadius: 8,
              borderLeft: `3px solid ${g.severity === "high" ? "#C45C4A" : "#D4A843"}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ color: "#F8FAFC", fontSize: 13, fontWeight: 700 }}>{g.title}</span>
              <span style={{
                fontSize: 9,
                padding: "2px 7px",
                borderRadius: 3,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: g.severity === "high" ? "#C45C4A" : "#D4A843",
                background: g.severity === "high" ? "rgba(196,92,74,0.12)" : "rgba(212,168,67,0.12)",
              }}>
                {g.severity}
              </span>
            </div>
            <div style={{ color: "#94A3B8", fontSize: 12, lineHeight: 1.6 }}>{g.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RedressView() {
  const [expanded, setExpanded] = useState(null);
  const categories = ["INTERNAL", "INDEPENDENT", "JUDICIAL"];
  const catColors = { INTERNAL: "#D4A843", INDEPENDENT: "#5A8FA8", JUDICIAL: "#C45C4A" };
  const catDescs = {
    INTERNAL: "Mandatory exhaustion required before judicial intervention",
    INDEPENDENT: "External oversight bypassing CDCR chain of command",
    JUDICIAL: "Coercive court powers — activated after exhaustion",
  };

  return (
    <div style={{ padding: "0 8px" }}>
      <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.6, marginBottom: 24, maxWidth: 680 }}>
        Eight distinct avenues spanning internal grievance mechanisms, independent state oversight, and 
        judicial remedies. Click any avenue to expand the procedural steps.
      </p>

      {categories.map((cat) => (
        <div key={cat} style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
            <span style={{
              color: catColors[cat],
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.15em",
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {cat}
            </span>
            <span style={{ color: "#475569", fontSize: 11 }}>{catDescs[cat]}</span>
          </div>
          <div style={{ borderLeft: `2px solid ${catColors[cat]}30`, marginLeft: 4, paddingLeft: 16 }}>
            {redressAvenues.filter((a) => a.category === cat).map((a) => {
              const isOpen = expanded === a.id;
              return (
                <div
                  key={a.id}
                  style={{
                    marginBottom: 8,
                    background: isOpen ? "rgba(15,23,42,0.7)" : "rgba(15,23,42,0.35)",
                    border: isOpen ? `1px solid ${a.color}50` : "1px solid #1E293B",
                    borderRadius: 8,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => setExpanded(isOpen ? null : a.id)}
                >
                  <div style={{
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: a.color,
                        flexShrink: 0,
                        boxShadow: `0 0 8px ${a.color}40`,
                      }} />
                      <span style={{ color: "#F8FAFC", fontSize: 13, fontWeight: 600 }}>{a.title}</span>
                    </div>
                    <span style={{
                      color: "#64748B",
                      fontSize: 16,
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                      flexShrink: 0,
                    }}>
                      ▸
                    </span>
                  </div>

                  {isOpen && (
                    <div style={{ padding: "0 16px 16px" }}>
                      <div style={{
                        borderTop: `1px solid ${a.color}20`,
                        paddingTop: 12,
                      }}>
                        {a.steps.map((s, j) => (
                          <div key={j} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                            <span style={{
                              color: a.color,
                              fontSize: 10,
                              fontWeight: 800,
                              fontFamily: "'JetBrains Mono', monospace",
                              minWidth: 18,
                              marginTop: 2,
                            }}>
                              {String(j + 1).padStart(2, "0")}
                            </span>
                            <span style={{ color: "#CBD5E1", fontSize: 12, lineHeight: 1.6 }}>{s}</span>
                          </div>
                        ))}
                        <div style={{
                          marginTop: 10,
                          padding: "8px 12px",
                          background: `${a.color}10`,
                          borderRadius: 6,
                          fontSize: 11,
                          color: a.color,
                          fontWeight: 500,
                          lineHeight: 1.5,
                        }}>
                          {a.note}
                        </div>
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
      phase: "PHASE 1",
      title: "Administrative Exhaustion",
      color: "#D4A843",
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
      phase: "PHASE 2",
      title: "Misconduct & External Oversight",
      color: "#C45C4A",
      deadline: "Concurrent with Phase 1",
      items: [
        "If deliberate misconduct alleged → 602-1 triggers CST/OIA referral",
        "File OIG complaint via portal/hotline for independent monitoring",
        "File Ombudsman Assistance Request (Form 1707) for systemic review",
        "Seek OIG non-concurrence documentation for future litigation leverage",
      ],
    },
    {
      phase: "PHASE 3",
      title: "Judicial Intervention",
      color: "#5A8FA8",
      deadline: "After OOA exhaustion",
      items: [
        "State Habeas Corpus → San Joaquin County Superior Court",
        "Writ of Mandate (CCP § 1085) → compel ministerial discharge duty",
        "Government tort claim → within 6 months of accrual",
        "Federal § 1983 → pierce qualified immunity for personal liability",
      ],
    },
    {
      phase: "PHASE 4",
      title: "Legal Advocacy & Systemic Challenge",
      color: "#7A9A6D",
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
    <div style={{ padding: "0 8px" }}>
      <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.6, marginBottom: 28, maxWidth: 680 }}>
        The architecture of accountability demands a sequential, strategic, and legally precise approach. 
        Each phase builds the evidentiary and procedural foundation for the next.
      </p>

      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute",
          left: 15,
          top: 0,
          bottom: 0,
          width: 2,
          background: "linear-gradient(to bottom, #D4A843, #C45C4A, #5A8FA8, #7A9A6D)",
          borderRadius: 1,
        }} />

        {phases.map((p, i) => (
          <div key={i} style={{ display: "flex", gap: 20, marginBottom: 28, position: "relative" }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#0F172A",
              border: `2px solid ${p.color}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              zIndex: 1,
              boxShadow: `0 0 12px ${p.color}30`,
            }}>
              <span style={{ color: p.color, fontSize: 12, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>
                {i + 1}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{
                  color: p.color,
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {p.phase}
                </span>
                <span style={{ color: "#F8FAFC", fontSize: 14, fontWeight: 700 }}>{p.title}</span>
              </div>
              <div style={{
                color: "#64748B",
                fontSize: 11,
                marginBottom: 10,
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                ⏱ {p.deadline}
              </div>
              <div style={{
                background: "rgba(15,23,42,0.5)",
                border: "1px solid #1E293B",
                borderRadius: 8,
                padding: "12px 16px",
              }}>
                {p.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 8, marginBottom: j < p.items.length - 1 ? 6 : 0, alignItems: "flex-start" }}>
                    <span style={{ color: p.color, fontSize: 11, marginTop: 1, flexShrink: 0 }}>→</span>
                    <span style={{ color: "#CBD5E1", fontSize: 12, lineHeight: 1.5 }}>{item}</span>
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
    <div style={{
      minHeight: "100vh",
      background: "#0B1120",
      color: "#F8FAFC",
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0B1120; }
        ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 3px; }
      `}</style>

      {/* Header */}
      <div style={{
        padding: "32px 24px 24px",
        borderBottom: "1px solid #1E293B",
        background: "linear-gradient(180deg, rgba(196,92,74,0.06) 0%, transparent 100%)",
      }}>
        <div style={{
          color: "#C45C4A",
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.2em",
          fontFamily: "'JetBrains Mono', monospace",
          marginBottom: 8,
        }}>
          ADMINISTRATIVE ACCOUNTABILITY ANALYSIS
        </div>
        <h1 style={{
          fontSize: "clamp(22px, 4vw, 34px)",
          fontWeight: 900,
          fontFamily: "'Playfair Display', Georgia, serif",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          marginBottom: 8,
          background: "linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Avenues of Redress
        </h1>
        <div style={{ color: "#64748B", fontSize: 13, lineHeight: 1.5 }}>
          <span style={{ color: "#CBD5E1", fontWeight: 600 }}>Subject Official:</span> Keely Dodd, Parole Administrator — CDCR Northern Region
          <span style={{ display: "block", marginTop: 2 }}>
            <span style={{ color: "#CBD5E1", fontWeight: 600 }}>Triggering Action:</span> Finalization of CDCR 1502-DR • November 19, 2025 • Badge #6462
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        display: "flex",
        gap: 0,
        borderBottom: "1px solid #1E293B",
        overflowX: "auto",
      }}>
        {SECTIONS.map((s) => {
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                padding: "12px 20px",
                background: isActive ? "rgba(196,92,74,0.08)" : "transparent",
                border: "none",
                borderBottom: isActive ? "2px solid #C45C4A" : "2px solid transparent",
                color: isActive ? "#F8FAFC" : "#64748B",
                fontSize: 12,
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.03em",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 14 }}>{s.icon}</span>
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ padding: "24px 16px", maxWidth: 800, margin: "0 auto" }}>
        {activeSection === "hierarchy" && <HierarchyView />}
        {activeSection === "record" && <RecordView />}
        {activeSection === "redress" && <RedressView />}
        {activeSection === "timeline" && <TimelineView />}
      </div>

      {/* Footer */}
      <div style={{
        padding: "16px 24px",
        borderTop: "1px solid #1E293B",
        textAlign: "center",
        color: "#334155",
        fontSize: 10,
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: "0.05em",
      }}>
        ANALYSIS DERIVED FROM CDCR ADMINISTRATIVE RECORDS • DAPO POLICY 19-03 • PC 3000(b)(5)(B) • 42 U.S.C. § 1983
      </div>
    </div>
  );
}
