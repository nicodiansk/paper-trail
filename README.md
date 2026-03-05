# paper-trail

A Claude skill that turns any topic into a rigorous, structured study program in Notion — then keeps it sharp by surfacing missing foundational papers, unexplained concepts, and citation chains you haven't covered yet.

> Follow the citations. Build the map. Know the ingredients.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Works with Claude](https://img.shields.io/badge/Works%20with-Claude-blueviolet)](https://claude.ai)

---

## The problem

You're reading a research paper. It cites 9 other papers as intellectual foundations. You don't realize this. You read confused, spend hours Googling terms the authors assumed you already knew, and end up with a study program full of gaps you didn't know existed.

paper-trail fixes that.

---

## What it does

| Operation | What happens |
|-----------|-------------|
| **SETUP** | Runs an intake conversation to understand your background and goals. Activates Research Mode to map the landscape, proposes a module structure, and builds the full Notion hierarchy: modules, papers, foundational references, building blocks, study questions, and a reusable deep-dive prompt. |
| **AUDIT** | Three-gap analysis on any module: **(A)** foundational papers cited but not explained, **(B)** technical concepts referenced but never defined, **(C)** study questions that don't cover the new material. |
| **EXPAND** | Drop a paper or blog post URL. Fetches the full text, evaluates every citation (foundational vs. tangential vs. already covered), and adds the relevant ones to the right module. |
| **PROMPT** | Generates a reusable deep-dive prompt page you paste into a new Claude session to go deep on any module — ingredient-first, architecture-level, synthesis-focused. |
| **STATUS** | Checks program health — papers read, modules audited, question progress — and recommends the highest-impact next action. |

---

## Install

### Claude.ai (recommended)

Works on Free, Pro, Max, Team, and Enterprise plans.

1. Download `paper-trail.skill` from this repo (it's a ZIP file)
2. In Claude.ai, go to **Customize → Skills → click "+" → Upload a skill**
3. Select the `paper-trail.skill` file
4. Done — Claude will auto-activate it when you ask to study something

> **Note:** You also need Notion connected. Go to **Customize → Integrations → Notion → Connect**, and share the pages/workspace where you want your study program to live.

### Claude Code

```bash
git clone https://github.com/nicodiansk/paper-trail ~/.claude/skills/paper-trail
```

Then add Notion as an MCP server in your Claude Code config:

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

Once installed, just talk to Claude naturally:

**Start a new study program:**
```
"I want to build a deep study program on transformer architectures"
"Help me study constitutional law — I'm preparing for the bar exam"
"Create a study program on pharmacokinetics, I'm a 2nd-year med student"
"I want to understand the history of the Bretton Woods system"
```

**Audit an existing module:**
```
"Audit Module 2 — what foundational papers am I missing?"
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
"Give me a status check on my study program"
```

**Generate a study session:**
```
"Generate a deep dive prompt page for my RAG module"
"Create a study prompt for Module 3"
```

On first use, Claude runs a short intake conversation to understand your background, goals, and learning style — then saves your Notion program URL to memory so future sessions skip the setup.

---

## How it works

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   You: "I want to study X"                              │
│         │                                               │
│         ▼                                               │
│   ┌───────────┐    ┌──────────────┐    ┌─────────────┐  │
│   │  INTAKE   │───▶│   RESEARCH   │───▶│  BUILD IN   │  │
│   │  who you  │    │  map the     │    │   NOTION    │  │
│   │  are +    │    │  landscape   │    │  modules,   │  │
│   │  goals    │    │  + sources   │    │  papers,    │  │
│   └───────────┘    └──────────────┘    │  questions  │  │
│                                        └──────┬──────┘  │
│                                               │         │
│                    ┌──────────────────────────┐│         │
│                    │                          ││         │
│                    ▼                          ▼│         │
│              ┌───────────┐             ┌──────┴──────┐  │
│              │  EXPAND   │◀───────────▶│    AUDIT    │  │
│              │  add new  │             │  find gaps  │  │
│              │  papers   │             │  A, B, C    │  │
│              │  from URL │             │             │  │
│              └───────────┘             └─────────────┘  │
│                                                         │
│   PROMPT: paste into new session for deep study ────▶   │
│                                                         │
│   STATUS: "where am I?" → health check + next action    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

The skill adapts its research strategy to your field. It's not hardcoded for any specific domain, conference list, or paper format.

---

## Works for any domain

- **AI/ML research** — papers, architectures, production systems
- **Medicine & life sciences** — pharmacology, clinical research, pathophysiology
- **Law** — case law, statutory analysis, legal theory
- **Economics & finance** — monetary policy, market microstructure, behavioral econ
- **History & philosophy** — primary sources, historiography, major debates
- **Engineering** — systems design, materials science, signal processing

The intake conversation calibrates everything — depth, pacing, source types, and module structure — to your background and goals.

---

## Origin story

Built by [Nicholas Previtali](https://github.com/nicodiansk) while studying the convergence of Agentic AI, RAG, and Recommendation Systems.

The audit workflow was validated against Spotify's research blog on Semantic IDs — which had 9 cited foundational papers and building blocks (vLLM, Redis, LFQ quantization, residual codebooks, beam search with Bloom filters) that weren't explained anywhere in the existing module. After running the audit, all 9 were surfaced, explained, and pushed into Notion automatically.

Also check out [turbocharge](https://github.com/nicodiansk/turbocharge) — a Claude Code plugin for development workflows.

---

## Repo structure

```
paper-trail/
├── paper-trail.skill          # Upload this in Claude.ai (ZIP)
├── SKILL.md                   # Same content, for Claude Code
├── references/
│   ├── setup-wizard.md        # Intake conversation + Notion build
│   ├── audit.md               # Three-gap analysis logic
│   ├── expand.md              # Citation chain fetching
│   ├── prompts.md             # Deep-dive prompt generation
│   └── status.md              # Program health check + next action
└── README.md
```

---

## License

MIT — use it, fork it, adapt it.
