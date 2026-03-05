# Status

Check the health of an existing study program and recommend the highest-impact next action.

## Inputs needed

- **Program URL**: the Notion URL of the main study program page (from memory or ask the user)

---

## Phase 1: Fetch All Modules

1. `Notion:notion-fetch` the main program page
2. Extract all module sub-page URLs from the Module Index
3. `Notion:notion-fetch` each module page

---

## Phase 2: Analyze Each Module

For each module, count:
- **Total papers**: count `### N.X —` entries
- **Papers read**: count `- [x] Read`
- **Papers unread**: count `- [ ] Read`
- **Has foundational papers section?** look for `## 📌`
- **Has building blocks section?** look for `## 🔧`
- **Study questions**: total vs completed (count `- [ ]` vs `- [x]` under Study Questions)
- **Synthesis exercise completed?** check `- [x]` vs `- [ ]` under Synthesis Exercise

---

## Phase 3: Assess Program Health

Score each module on **content depth**:
- **Dense**: 6+ papers, has foundational + building blocks sections
- **Adequate**: 4-5 papers, has at least one of the two sections
- **Thin**: <4 papers or missing both sections
- **Untouched**: no checkboxes checked at all

Score each module on **study progress**:
- **Complete**: all papers read + all study questions answered + synthesis done
- **In progress**: some papers read or some questions answered
- **Not started**: no checkboxes checked

A module can be "Dense" on content but "Not started" on progress — flag this in the report as a priority to begin studying.

Flag imbalances:
- Modules with 2x+ more papers than the thinnest module
- Modules never audited (no foundational papers section = likely never audited)

---

## Phase 4: Recommend Next Action

Priority order:
1. If any module is "Thin" → suggest audit or expand
2. If modules are imbalanced → suggest auditing the weakest
3. If a module has papers but 0 read → suggest starting the deep dive
4. If everything looks healthy → suggest expanding from a new URL or generating a prompt page

---

## Phase 5: Report

```
📊 Program Health: [Title]

| Module | Papers (read/total) | Foundational | Building Blocks | Questions (done/total) | Content | Progress |
|--------|---------------------|--------------|-----------------|------------------------|---------|----------|
| ...    | ...                 | ...          | ...             | ...                    | ...     | ...      |

💡 Recommendation: [specific, actionable next step with reasoning]
```
