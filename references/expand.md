# Expand

Given a paper URL or blog post, fetch its citations, determine which module(s) they belong to, and add them. Also checks if the paper itself is already in the program — and adds it if not.

## Inputs needed

- **Source URL** (required): the paper/blog the user wants to expand from
- **Target module** (optional): if the user knows which module should receive the new content; otherwise this is inferred

---

## Phase 1: Fetch and Parse the Source

1. `web_fetch` the source URL. Read the full text.
2. Extract:
   - **Paper title, authors, venue, year**
   - **Abstract / key contribution** (2-3 sentences)
   - **All references** — title, authors, and URL if listed
   - **Key techniques/tools named** (these become building block candidates)
3. Identify the paper's domain and which module it most likely belongs to.

If the source is a blog post (not a paper), extract:
- The research papers cited inline or in a References section at the bottom
- Any tools, frameworks, or systems described
- The blog's main argument/finding

---

## Phase 2: Check If Source Paper Is Already in the Program

`Notion:notion-fetch` the **most likely module only** (infer from the paper's topic). Search the page text for:
- The paper's title (or a shortened version)
- The paper's first author's name
- The arxiv ID if available

If found → proceed to Phase 3. If not found → add it (Phase 2b), then Phase 3.

> **Note on duplicate checking:** Only check all modules if the paper's topic is ambiguous across multiple modules. Fetching all modules is expensive — use judgment to pick the 1-2 most likely targets first.

### Phase 2b — Add the Source Paper

Find the right module, then insert the paper entry in the correct numbered position:

```
### [N.X] — [Paper Title] ([Venue Year])
**[One-line description of what this paper does]**
- Paper: [URL]
- Authors: [First author et al.] ([Institution])
- Key idea: [Problem, approach, key contribution — 2-3 sentences]
- Key numbers: [Main results, benchmarks, or metrics if available]
- Why it matters: [Connection to this module's theme and to adjacent papers]
```

Present this entry to the user before writing: "This paper isn't in the program yet. Here's the entry I'll add to [Module Name] - confirm or adjust?"

---

## Phase 3: Evaluate All Citations

For each reference found in the source paper, decide: **add, skip, or flag**.

### Add if:
- It's a direct foundational paper (the source paper explicitly builds on it or extends it)
- It's a key comparison baseline that explains *why* the source paper's approach is better
- It introduces a technique or method that the source paper uses as a component
- It's from a highly relevant venue (NeurIPS, ICML, ICLR, RecSys, KDD, SIGIR, ACL, CVPR, arxiv preprint with significant citations)

### Skip if:
- It's already in the program (check all modules, not just the target)
- It's tangentially cited (e.g. "as observed in many systems [X, Y, Z]" where it's just filler)
- It's a dataset paper, evaluation benchmark, or tool documentation (add as a building block note instead)
- It's too foundational to the field *given the user's background from the intake* (e.g. "Attention is All You Need" for someone who already works in NLP — but include it if the user is new to the field)

### Flag if:
- It looks highly relevant but you can't verify the URL
- It seems to belong to a *different* module than the source paper

---

## Phase 4: Verify and Fetch Priority Citations

For each "add" candidate:
1. `web_search` the title to find the arxiv or conference URL
2. `web_fetch` the abstract to confirm it's the right paper and extract a key-idea summary
3. Note: venue, year, first author, institution

Do this for **foundational papers first** (Gap Type A from audit.md), then secondary citations.

Limit: aim for 5-10 high-quality additions per expansion. Don't bulk-add everything. Quality over quantity.

---

## Phase 4b: Present Changeset

Present the full set of additions grouped by module. Show each paper entry and building block exactly as it will appear in Notion. Include the source paper from Phase 2b if it hasn't been written yet.

End with: "Confirm and I'll push these to Notion?"

If changes span multiple modules, list them per-module so the user can confirm selectively.

---

## Phase 5: Update Notion

Only enter this phase after user confirmation.

Use `Notion:notion-fetch` on the target module, then `insert_content_after` to add:
1. New paper entries (in the Papers & Articles section)
2. New building blocks (in the Technical Building Blocks section, or create it)

Follow all formatting and placement rules from `audit.md`.

If citations span multiple modules, update each module separately. Do one at a time, re-fetching before each update.

---

## Phase 6: Confirm Writes

```
✅ Expanded from: [source paper title]
   [N] papers + [N] building blocks written to [module name(s)]
⚠️  Flagged: [unverified URLs, cross-module papers]
```

Then offer a proactive next step based on what changed:

```
💡 After this expansion, [Module A] now has [X] papers while [Module B]
   only has [Y]. Want me to audit [Module B] to balance the program?

   Or: The paper you expanded from cites [Paper Z] which looks foundational
   but landed in a different module. Want me to check if [Module C] covers it?
```
