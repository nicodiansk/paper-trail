# Audit

Examine an existing study module and find what's missing: foundational papers, unexplained building blocks, and study questions that don't cover the new material.

## Inputs needed

- **Target**: which module(s) to audit. Could be a specific Notion URL, a module name, or "all modules".
- **Trigger paper** (optional): a specific paper/blog URL that prompted the audit. If provided, the audit focuses on *that paper's* citations and concepts.

---

## Phase 1: Fetch and Read

1. `Notion:notion-fetch` the target module page(s). Read everything.
2. If a trigger paper was provided, `web_fetch` it and read the full text, especially the References section.
3. For each paper already listed in the module, mentally note: what does it cite? What prior work does it build on?

---

## Phase 2: Three-Type Gap Analysis

### Gap Type A — Missing Foundational Papers

Papers that are *cited by* the papers already in the module, but not listed themselves. These are the "ingredients" — the work you must understand before the listed papers make sense.

**How to find them:**
- From the trigger paper (if provided): read every reference, identify which ones are genuinely foundational vs just adjacent
- From the module's existing papers: look for phrases like "building on [X]", "following [X]", "inspired by [X]", "as shown in [X]"
- Check whether the paper's core technique has a source paper (e.g. if a paper uses RQ-VAE, the TIGER paper that introduced RQ-VAE for RecSys is foundational)

**Criteria for "foundational" (must meet at least one):**
- The listed paper explicitly names it as the work they extend or compare against
- Understanding the technique used in the listed paper requires knowing this paper
- It's cited in the references section and appears to be a primary influence (not just a comparison baseline)

**For each gap found, prepare:**
```
### [Ref N] — [Paper Title] ([Venue Year])
- [ ] Read
- [ ] Can explain to someone else
**[One-line description of what this paper contributes]**
- Paper: [URL — verify this exists before writing]
- Authors: [First author et al.] ([Institution])
- Key idea: [What problem does it solve? How does it work mechanically? 2-3 sentences.]
- Why foundational: [Which existing module paper depends on this, and specifically which concept]
- Connection to [existing paper]: [explicit link]
```

### Gap Type B — Missing Technical Building Blocks

Concepts, tools, algorithms, or infrastructure components that are *referenced* in the module's papers but never explained. These are things a reader might hit and not understand without outside research.

**How to find them:**
- Read each paper entry looking for named techniques, tools, frameworks, or algorithms
- Flag anything that's used as a black box without explanation (e.g. "we use vLLM [6]" with no further explanation)
- Common categories: inference frameworks, quantization methods, training techniques, data structures, approximation algorithms

**Criteria for "building block worth explaining":**
- It's not explained anywhere in the existing module
- A reader would need to look it up externally to understand the paper's architecture
- It's a real technical choice (not just a name-drop) — the paper's design depends on it

**For each gap found, prepare:**
```
**[Component Name]** — [one-line what it is]
[The problem it solves — 1 sentence.]
[How it works mechanically — enough to whiteboard it. Include key design decisions and why they matter.]
[Failure modes or limitations — what breaks, when, under what conditions.]
[Why [paper/system] chose it — the specific reason this was the right tool for this use case.]
```

### Gap Type C — Missing Study Questions

Check whether the existing study questions cover:
- The newly identified foundational papers (can the user explain how they connect to the listed papers?)
- The newly identified building blocks (can the user explain the mechanism, not just the name?)
- Cross-paper synthesis (do any questions require connecting 3+ papers?)
- Application to new domains (do any questions ask "how would you apply this to [different domain]?")

For each gap, write a question that requires synthesis or application, not recall. Use checkbox format:
```
- [ ] [Question that requires cross-paper reasoning or domain transfer]
```

---

## Phase 3: Verify Before Writing

Before updating Notion, verify:
- **Paper URLs**: `web_fetch` or `web_search` to confirm each arxiv/paper URL exists and is the right paper
- **No duplicates**: search the full module text to confirm the paper isn't already listed under a different title or URL format
- **Author/venue accuracy**: don't guess — verify from the actual paper or abstract

If a URL can't be verified, include it with a note: `[URL unverified — confirm before using]`

Once verification is complete, present the full changeset to the user. Show every paper entry, building block, and study question exactly as it will appear on the Notion page - same markdown, same formatting. Group by gap type. End with: "Confirm and I'll push these to Notion, or tell me what to cut/change."

Do not proceed to Phase 4 until the user confirms.

---

## Phase 4: Update Notion

Only enter this phase after user confirmation. If 3+ changes are confirmed, use the change tracker.

### Placement rules:
- New foundational papers → after the last existing `### N.X —` paper entry, before the `---` divider that precedes Study Questions. If no `---` divider exists (older modules), insert before `## Study Questions` or `## 📌` instead
- New building blocks → inside the `## 🔧 Technical Building Blocks` section if it exists; if not, create it before `## Study Questions`
- New study questions → appended to the end of the existing list, using `- [ ]` checkbox format

### Creating a new "Foundational Papers" section:
If the module doesn't have one, create it as:
```
## 📌 Foundational Papers Cited in This Module

These papers are cited by the papers above as direct intellectual foundations. 
Understand these before going deep on the main papers.
```
Then add each foundational paper entry underneath.

### Creating a new "Technical Building Blocks" section:
If the module doesn't have one, create it as:
```
## 🔧 Technical Building Blocks

Concepts and infrastructure components that appear in this module's papers. 
Know these so they don't slow you down while reading.
```
Then add each building block entry underneath.

---

## Phase 5: Confirm Writes

After all confirmed changes are written to Notion:

```
✅ Written to [Module name]:
  - [N] foundational papers added
  - [N] building blocks added
  - [N] study questions added
⚠️  Flagged: [unverified URLs, uncertain attributions]
```

Then offer a proactive next step based on what you found:

```
💡 Of the [N] foundational papers found, [Paper X] is cited by [3+] papers
   in this module — it's the highest-leverage gap. Want me to expand from it?

   Or: Module [M] hasn't been audited yet and shares topics with this one.
   Want me to audit that next?
```
