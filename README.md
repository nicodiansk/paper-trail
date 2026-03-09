# Paper Trail

> Follow the citations. Build the map. Know the ingredients.

A Claude skill that turns any topic into a rigorous, structured study program in Notion - then keeps it sharp by surfacing missing foundational papers, unexplained concepts, and citation chains you haven't covered yet.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Works with Claude](https://img.shields.io/badge/Works%20with-Claude-blueviolet)](https://claude.ai)

---

## The problem

You're studying a new field. You read a paper. It cites 9 other papers as intellectual foundations - but you don't realize this. You spend hours Googling terms the authors assumed you knew, and your study program accumulates gaps you can't see.

paper-trail fixes that. It builds the study program, finds the gaps, tracks your progress, and tells you what to do next.

---

## What it does

| Operation | What happens |
|-----------|-------------|
| **SETUP** | Intake conversation to understand your background and goals. Landscape preview to orient you in the field before going deep. Research Mode to map sources. Builds the full Notion hierarchy: modules, papers with read-tracking checkboxes, foundational references, building blocks, study questions, synthesis exercises, and a reusable deep-dive prompt. |
| **AUDIT** | Three-gap analysis on any module: **(A)** foundational papers cited but not listed, **(B)** technical concepts referenced but never explained, **(C)** study questions that don't cover the new material. Recommends the highest-leverage next paper to expand from. |
| **EXPAND** | Drop a paper or blog post URL. Fetches the full text, evaluates every citation (foundational vs. tangential vs. already covered), and adds the relevant ones to the right module. Flags cross-module imbalances afterward. |
| **PROMPT** | Generates a reusable deep-dive prompt page you paste into a new Claude session to go deep on any module - ingredient-first, architecture-level, synthesis-focused. |
| **STATUS** | Program health check: papers read, modules audited, questions answered, content depth vs. study progress. Recommends the single highest-impact next action. |

---

## What makes this different

**It understands you first.** The intake conversation calibrates everything - depth, pacing, source types, module structure - to your background and goals. A med student studying pharmacokinetics gets a different program than an engineer studying the same topic.

**Landscape preview before deep research.** After intake, you get a quick sketch of the field's major branches, active debates, and non-obvious angles - so you're a co-researcher, not a form-filler.

**Progress tracking built in.** Every paper gets `- [ ] Read` / `- [ ] Can explain to someone else` checkboxes. Study questions and synthesis exercises are trackable too. STATUS reads all of this and tells you where you actually stand.

**Changesets, not reports.** Every operation presents the exact Notion-ready content it will write - formatted as it will appear on the page - and waits for your confirmation before touching anything. Confirmed changes are written immediately, tracked across turns, and never dropped mid-conversation.

**Proactive, not reactive.** Operations don't end with "what do you want to do next?" - they analyze program state and offer to start the specific highest-leverage action. Thin module? It offers to audit it now. Unaudited module that shares topics with the one you just audited? Same thing - one "yes" and it's running.

**Works for any domain.** Not hardcoded for AI papers. The skill adapts its research strategy, source types, and module structure to whatever you're studying:

- **AI/ML research** - papers, architectures, production systems
- **Medicine & life sciences** - pharmacology, clinical research, pathophysiology
- **Law** - case law, statutory analysis, legal theory
- **Economics & finance** - monetary policy, market microstructure, behavioral econ
- **History & philosophy** - primary sources, historiography, major debates
- **Engineering** - systems design, materials science, signal processing

---

## Install

### Claude.ai (recommended)

Works on Free, Pro, Max, Team, and Enterprise plans.

1. Download `paper-trail.skill` from this repo
2. Go to **Customize → Skills → "+" → Upload a skill**
3. Upload the file - done

> **Notion required.** Go to **Customize → Integrations → Notion → Connect**, and share the pages where you want your study program to live.

### Claude Code

```bash
git clone https://github.com/nicodiansk/paper-trail ~/.claude/skills/paper-trail
```

Add Notion as an MCP server in your Claude Code config:

```json
{
  "mcpServers": {
    "notion": {
      "url": "https://mcp.notion.com/mcp",
      "headers": { "Authorization": "Bearer YOUR_NOTION_TOKEN" }
    }
  }
}
```

---

## Usage

Just talk to Claude naturally:

**Start a new study program:**
```
"I want to build a deep study program on transformer architectures"
"Help me study constitutional law - I'm preparing for the bar exam"
"Create a study program on pharmacokinetics, I'm a 2nd-year med student"
"I want to understand the history of the Bretton Woods system"
```

**Audit an existing module:**
```
"Audit Module 2 - what foundational papers am I missing?"
"Check my RAG module for unexplained building blocks"
"What concepts in my philosophy of mind module are referenced but never defined?"
```

**Expand from a source:**
```
"I just read this Spotify research post, expand my study program from it: [URL]"
"Add citations from this paper to my recommendation systems module: [URL]"
"Is this blog post already covered in my program? [URL]"
```

**Check program status:**
```
"How's my program looking?"
"What should I do next?"
"Am I on track?"
```

**Generate a study session:**
```
"Generate a deep dive prompt page for my RAG module"
"Create a study prompt for Module 3"
```

On first use, Claude runs the intake conversation to understand your background and goals, then saves your Notion program URL to memory so future sessions skip the setup.

---

## How it works

```
You: "I want to study X"
         │
         ▼
   ┌───────────┐    ┌──────────────┐    ┌──────────────┐    ┌─────────────┐
   │  INTAKE   │───▶│  LANDSCAPE   │───▶│   RESEARCH   │───▶│  BUILD IN   │
   │  who you  │    │  preview the │    │  deep search │    │   NOTION    │
   │  are +    │    │  field, get  │    │  map sources │    │  modules +  │
   │  goals    │    │  reactions   │    │  + structure │    │  checkboxes │
   └───────────┘    └──────────────┘    └──────────────┘    └──────┬──────┘
                                                                   │
                         ┌─────────────────────────────────────────┘
                         │
                         ▼
   ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐
   │  EXPAND   │◀─▶│   AUDIT   │   │  PROMPT   │   │  STATUS   │
   │  add new  │   │  find gaps │   │  deep     │   │  health   │
   │  papers   │   │  A, B, C  │   │  dive     │   │  check +  │
   │  from URL │   │           │   │  session  │   │  next step│
   └───────────┘   └───────────┘   └───────────┘   └───────────┘
         │               │
         └───────┬───────┘
                 ▼
     Proactive chaining:
     each operation analyzes
     program state and suggests
     the next highest-impact action
```

---

## Origin story

Built by [Nicholas Previtali](https://github.com/nicodiansk) while studying the convergence of Agentic AI, RAG, and Recommendation Systems.

The audit workflow was validated against Spotify's research blog on Semantic IDs - which had 9 cited foundational papers and building blocks (vLLM, Redis, LFQ quantization, residual codebooks, beam search with Bloom filters) that weren't explained anywhere in the existing module. After running the audit, all 9 were surfaced, explained, and pushed into Notion automatically.

Also check out [turbocharge](https://github.com/nicodiansk/turbocharge) - a Claude Code plugin for development workflows.

---

## Repo structure

```
paper-trail/
├── paper-trail.skill          # Upload this in Claude.ai (ZIP)
├── SKILL.md                   # Skill router + core principles + execution protocol
├── references/
│   ├── setup-wizard.md        # Intake + landscape preview + Notion build
│   ├── audit.md               # Three-gap analysis logic
│   ├── expand.md              # Citation chain fetching
│   ├── prompts.md             # Deep-dive prompt generation
│   └── status.md              # Program health check + next action
├── build-skill.js             # ZIP builder (Node.js, no dependencies)
└── README.md
```

---

## License

MIT - use it, fork it, adapt it.
