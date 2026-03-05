# paper-trail

> Follow the citations. Build the map. Know the ingredients.

A Claude skill that turns any topic into a rigorous Notion study program — and keeps it sharp by automatically surfacing missing foundational papers, unexplained building blocks, and citation chains you haven't covered yet.

Built for people who want to actually understand something, not just survey it.

---

## The problem it solves

You're reading a research paper or blog post. It cites 9 other papers as intellectual foundations. You don't realize this. You read confused, spend hours Googling terms the authors assumed you already knew, and end up with a study program full of gaps you didn't know existed.

paper-trail fixes that.

---

## What it does

**SETUP — Build a study program from scratch**
Runs an intake conversation to understand who you are and what you want to achieve. Then activates Research Mode to map the landscape, proposes a module structure for your approval, and builds the full Notion hierarchy: modules, papers, foundational references, technical building blocks, study questions, and a reusable deep-dive prompt page.

**AUDIT — Find what's missing in an existing module**
Three-gap analysis on any Notion module:
- **Gap A** — Foundational papers cited by your listed papers but not explained
- **Gap B** — Technical concepts referenced but never defined (building blocks)
- **Gap C** — Study questions that don't cover the new material

**EXPAND — Follow a citation chain from any URL**
Drop a paper or blog post URL. It fetches the full text, evaluates every citation (foundational vs. tangential vs. already covered), and adds the relevant ones to the right module with proper context.

**PROMPT — Generate a deep-dive study session**
Creates a reusable prompt page you paste into a new Claude session to go deep on any single module — ingredient-first, architecture-level, synthesis-focused.

---

## Install

### Claude.ai Pro (recommended)

Requirements: Claude Pro plan + Notion connected under Settings → Integrations

```
1. Download paper-trail.skill from this repo
2. Claude.ai → Settings → Skills → Install from file
3. Upload the .skill zip
4. Done
```

Claude will automatically activate it when you ask to study something.

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

```
"I want to build a deep study program on transformer architectures"
"Audit Module 2 — what foundational papers am I missing?"
"I just read this Spotify research post, expand my study program from it: [URL]"
"Generate a deep dive prompt page for my RAG module"
```

On first use, Claude runs a short intake conversation to understand your background, goal, and learning style — then saves your Notion program URL to memory so future sessions skip the setup.

---

## Works for any domain

AI/ML research, medicine, law, economics, history, philosophy, engineering. The skill adapts its research strategy to the field — it's not hardcoded for technical papers or any specific conference list.

---

## How it was built

Built by [Nicholas Previtali](https://github.com/nicodiansk) while building a personal deep-study program on the convergence of Agentic AI, RAG, and Recommendation Systems.

The audit workflow was developed and validated against Spotify's research blog on Semantic IDs — which had 9 cited foundational papers and building blocks (vLLM, Redis, LFQ quantization, residual codebooks, beam search with Bloom filters) that weren't explained anywhere in the existing study module. After running the audit, all 9 were surfaced, explained, and pushed into Notion automatically.

Also check out [turbocharge](https://github.com/nicodiansk/turbocharge) — a Claude Code plugin for development workflows (TDD, debugging, epics, agent orchestration).

---

## Repo structure

```
paper-trail/
├── paper-trail.skill          # Install this in Claude.ai Pro
├── SKILL.md                   # Same content, for Claude Code
├── references/
│   ├── setup-wizard.md        # Intake conversation + Notion build
│   ├── audit.md               # Three-gap analysis logic
│   ├── expand.md              # Citation chain fetching
│   └── prompts.md             # Deep-dive prompt generation
└── README.md
```

---

## License

MIT — use it, fork it, adapt it.
