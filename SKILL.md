---
name: paper-trail
description: Build and maintain rigorous, structured study programs in Notion on any topic. Use when a user wants to study a subject deeply, create a reading program, audit a study module for missing papers or concepts, expand a module from a paper or blog URL, generate deep dive prompts, or check their study progress. Trigger when users mention studying, learning roadmaps, reading lists, paper reviews, or building a study plan.
---

# Paper Trail

A fully parametric deep-study assistant for any topic, any Notion workspace, any user.

## What This Skill Does

Helps users build and maintain rigorous, structured study programs in Notion. Five core operations:

1. **SETUP** — Create a full study program in Notion from scratch (topic + optional reading list)
2. **AUDIT** — Examine an existing module, find missing foundational papers and unexplained concepts
3. **EXPAND** — Fetch cited papers from source URLs, auto-add them to the right module
4. **PROMPT** — Generate a deep dive study prompt page for any module
5. **STATUS** — Check program health, progress, and get a recommended next action

---

## Step 0: Resolve User Configuration

### Check persistent memory first
Look for any stored study program config (Notion URL, topic, module list).
- **Claude.ai**: call `memory_user_edits` with `command: "view"`
- **Claude Code**: check the project's `CLAUDE.md` or memory files for stored program info

If found: fetch the Notion URL, confirm the program is still there, skip to Step 1.

### If no config found — route by intent

Ask one question:

> "Do you have an existing Notion study program you want to work on, or are you starting a new one from scratch?"

- **Existing program** → ask for the Notion URL, fetch it, extract the structure, go to Step 1.
- **New program from scratch** → route to `references/setup-wizard.md`. The wizard handles everything from here: Notion check, intake conversation, research mode, roadmap design, building.

### Persist to memory after any setup
Once a program is confirmed, save the config so future sessions skip onboarding:
- **Claude.ai**: call `memory_user_edits` with `command: "add"`: `Study program: [topic] — Notion: [url] — [N] modules`
- **Claude Code**: write to the project's `CLAUDE.md` or memory files

---

## Step 1: Route to the Right Operation

Based on what the user asked, route to the appropriate reference file. Read it before proceeding.

| User says... | Operation | Read |
|---|---|---|
| "Create a study program on X" / "I want to study X" | SETUP | `references/setup-wizard.md` |
| "Audit this module" / "What am I missing?" / "Check this" | AUDIT | `references/audit.md` |
| "Add citations from this paper" / "Expand this module" | EXPAND | `references/expand.md` |
| "Make a deep dive prompt" / "Create a study prompt" | PROMPT | `references/prompts.md` |
| "How's my program?" / "What should I do next?" / "Status" | STATUS | `references/status.md` |
| Shares a URL and asks "is this covered?" | EXPAND + AUDIT | Both |

If ambiguous, ask one clarifying question before routing.

---

## Core Principles (apply to all operations)

**Depth over breadth.** The goal is genuine architectural understanding, not survey-level familiarity. Explain concepts well enough to whiteboard them.

**Ingredients first.** Every paper builds on prior work. Surface the foundational "ingredients" — the concepts and papers that must be understood before the listed paper makes sense.

**Practical applicability.** Always connect research to what the user can actually *do* with it — whether that's building software, passing an exam, writing a thesis, making clinical decisions, or arguing a case.

**No bloat.** Only add content that is genuinely missing and genuinely relevant. Don't pad modules with tangentially related work.

**Formatting consistency.** Match the style of the existing module exactly. Never invent new header levels or bullet patterns.

**Never overwrite.** Use `insert_content_after` in Notion, not `replace_content`. Existing content is never touched without explicit user confirmation.

---

## Notion Editing Rules

- Always `Notion:notion-fetch` a page before editing it
- Use `insert_content_after` for all additions — pick a distinctive `selection_with_ellipsis` from the end of the section being extended
- Use `replace_content_range` only for targeted corrections, never wholesale rewrites
- If a page update fails with "string not found", re-fetch the page and retry with a fresh selection
- After updating, confirm what was added in a brief summary to the user

---

## Output Format (when reporting to the user)

After any operation, summarize:
```
✅ Added: [list what was added]
⚠️  Flagged: [anything you couldn't verify or that needs user confirmation]
💡 Next: [1-2 suggested follow-up actions]
```
