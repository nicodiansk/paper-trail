# Prompts

Generate a Deep Dive Prompt page in Notion — a reusable page that gives any user a single, copy-pasteable prompt to deep-study any individual module in a new Claude session.

## When to use

- After creating a new study program (called automatically by setup-wizard.md)
- When the user asks to "create a study prompt" or "make a deep dive page"
- When the existing prompt page is missing or outdated

---

## Phase 1: Understand the Program

`Notion:notion-fetch` the main program page. Extract:
- Program title and topic domain → becomes `[DOMAIN]`
- The user's stated goal (if any) → becomes `[GOAL]`; if none stated, infer from topic (e.g. "understand the architectures well enough to build with them")
- User's role/context if available from memory → becomes `[USER_ROLE]`; if unknown, use a generic "researcher / practitioner"
- List of all modules (names + Notion URLs)

These four values are used to personalize the prompt template. Fill them in before writing the page — do not leave them as literal `[DOMAIN]` placeholders in the final Notion page.

---

## Phase 2: Determine Prompt Page Placement

The prompt page should live as a sub-page under the main program page, at the same level as the module pages. Check if one already exists:
- Search the main page content for links to a page with "prompt", "deep dive", or "study" in the title
- If found: update it (`Notion:notion-update-page`) rather than creating a duplicate
- If not found: create a new sub-page

---

## Phase 3: Build the Prompt Page Content

The page has four sections:

### Section 1: Overview
Brief explanation of what the page is and how to use it. One short paragraph.

### Section 2: The Deep Dive Prompt
A single, copy-pasteable prompt that the user pastes into a new Claude session. The prompt should be wrapped in a code block for easy copying.

**The prompt must be parametric** — it references `[MODULE_URL]` and `[PROGRAM_CONTEXT]` as placeholders the user replaces. It should instruct Claude to:

1. **Fetch the module page first** — use the Notion tool to read the full module before doing anything
2. **Run an ingredient audit** — check for unnamed concepts and unexplained building blocks before reading papers
3. **Concept primer** — teach the building blocks before diving into papers
4. **Paper-by-paper deep analysis** — for each paper: problem, architecture (whiteboard-level), key results, novel contributions, limitations, connections, production applicability
5. **Synthesis** — dependency map, design patterns, open questions, "if I were building this", contrarian takes
6. **Hard questions** — 5 synthesis/application questions (not recall)

Tailor the prompt's framing to the program's topic and the user's stated goal. A medical researcher's prompt looks different from a software engineer's.

### Section 3: Module Quick-Reference
A list of all modules with their Notion URLs for easy copy-paste:

```
Module 1 — [Name]: [URL]
Module 2 — [Name]: [URL]
...
```

### Section 4: When to Use This vs the Master Prompt
Brief note explaining:
- **Master Prompt** (if the program has one): for broad discovery + synthesis across the module
- **Deep Dive Prompt**: for precision understanding of what's already in the module, ingredient-first

---

## Phase 4: Create or Update the Page

### Creating new:
Use `Notion:notion-create-pages` with the main program page as parent.

Page title: `🔬 Deep Dive Study Prompt`

### Updating existing:
`Notion:notion-fetch` the existing page first. Use `replace_content_range` for targeted section updates, not `replace_content`.

---

## Template: The Parametric Deep Dive Prompt

Adapt this template to the user's domain and goal. Replace `[DOMAIN]`, `[GOAL]`, and `[USER_ROLE]` based on program context. Keep `[MODULE_URL]` and `[PROGRAM_CONTEXT]` as literal placeholders for the user.

````
Module Notion URL: [MODULE_URL]
Additional context: [PROGRAM_CONTEXT — e.g. your background, what you'll do with this knowledge]

---

You are my deep technical study partner. I'm studying [DOMAIN] with the goal of [GOAL].
I want to understand the material well enough to [specific outcome — e.g. "whiteboard the architectures", "apply it in production", "write technically credible content about it"].

## STEP 0 — FETCH THE MODULE
Use your Notion tool to fetch the full module page at the URL I provided. Read every paper entry, study question, and note carefully. Do not proceed until you have the full page content.

## STEP 1 — INGREDIENT AUDIT
Before diving in, flag:
- Concepts referenced in the module that aren't explained (unnamed ingredients)
- Papers listed without a direct URL or key-idea summary
- Foundational prior work that the listed papers build on but that isn't in the module

Present this as a quick table: Concept/Paper | Status | Gap

## STEP 2 — CONCEPT PRIMER
Before touching the papers, teach me the core technical building blocks this module relies on. For each:
- What problem does it solve?
- How does it work mechanically? (enough to whiteboard it)
- Failure modes and limitations
- How it connects to other concepts in this module

## STEP 3 — PAPER-BY-PAPER ANALYSIS
For each paper in the module:
- **Problem**: What gap does this address?
- **Architecture**: Describe it clearly enough to draw on a whiteboard
- **Key results**: Numbers, benchmarks, ablations
- **Novel contributions**: What's genuinely new vs incremental?
- **Limitations**: What the authors acknowledge + what they miss
- **Connections**: How does it relate to other papers in this module?
- **Production applicability**: What can I actually use from this in a real system?

## STEP 4 — SYNTHESIS
- **Dependency map**: which papers must be read before others? Which are in tension?
- **Design patterns**: 3-5 reusable patterns from this module, with names and example applications outside this domain
- **Open questions**: 2-3 research gaps nobody has solved yet
- **If I were building this**: a concrete system design combining insights from 3+ papers in this module
- **Contrarian takes**: where do you see overreach or unstated assumptions in the papers?

## STEP 5 — HARD QUESTIONS
End with 5 hard synthesis/application questions — the kind a senior researcher would ask in a technical discussion. Not recall questions. Questions that require connecting multiple papers or applying concepts to a new context.

Be direct. If something is unclear or flawed, say so.
````

---

## Phase 5: Report

```
✅ Created Deep Dive Prompt page: [URL]
   Covers [N] modules

💡 Next: paste the prompt into a new Claude session with Module 1's URL to start studying.
```
