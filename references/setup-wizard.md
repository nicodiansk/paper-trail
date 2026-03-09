# Setup Wizard

Build a deep study program from scratch. The quality of the final roadmap depends entirely on understanding the *person* before touching the topic. Do not skip the intake conversation.

---

## Phase 0: Notion Setup Check

Before anything else, verify Notion is connected.

Try a quick test: attempt `Notion:notion-fetch` on any URL the user has mentioned, or simply try to list workspace pages. If the tool is unavailable or returns an auth error, stop and tell the user:

> **Notion isn't connected yet.** Here's how to fix it in two minutes:
> 1. Go to **claude.ai → Settings → Integrations**
> 2. Find **Notion** and click **Connect**
> 3. Authorize Claude in your Notion workspace — when prompted, share access to the pages/workspace where you want the study program to live
> 4. Come back here and say "ready" and we'll pick up where we left off

Do not proceed until Notion is confirmed working.

---

## Phase 1: Intake Conversation

This is the most important phase. A generic study program is useless. You need to understand the person before designing the roadmap. A bad intake = a roadmap that doesn't fit.

**Run this as a real conversation, not a form.** Ask questions one or two at a time. Listen carefully to the answers. Follow up on anything interesting. The goal is to understand: who this person is, what they already know, what they actually want to achieve, and how they learn best.

### 1a. Opening

Start warm and open, not clinical:

> "Before I build anything, I want to understand what you're actually trying to achieve — not just the topic, but the *why* behind it. The more I know about where you're starting from and where you want to go, the better I can design this.
>
> Let's start: **what's the topic, and why now?**"

Let them answer. Then dig into what they say.

### 1b. Core intake questions

Work through these naturally — don't fire them all at once as a list. Adapt based on their answers.

**Background calibration** — you need to know what to skip and what to explain:
- "What do you already know about [topic]? Starting from scratch, or building on foundations?"
- "What's your day job or main context? I want to know how this connects to what you already do."
- "Is there a specific angle or subtopic you already know you care most about?"

**Goal clarity** — push for concrete, not vague:
- "What does success look like at the end of this? What will you be able to *do* that you can't do now?" — if they say "understand it better", push back: "more specifically?"
- "Is this for applying in production, writing/publishing, passing an exam, research, a career move, or something else?"
- "Is there a deadline or event driving this — a conference, project, interview, presentation?"

**Learning style and constraints:**
- "How much time per week are you realistically putting into this? Be honest."
- "Do you prefer going paper-heavy (primary sources, technical depth) or a mix of papers, blog posts, and code/tutorials?"
- "Deep on fewer topics, or broader coverage across more territory?"

**Seed content** — this reveals a lot about their taste and angle:
- "Do you have papers, blog posts, or articles you've already bookmarked or want to include? Drop URLs."
- "Any specific papers or authors you've already read and liked? That tells me a lot about the angle you want."

**Known gaps:**
- "Is there anything you already know you're weak on that you specifically want this program to address?"

### 1c. Synthesize before researching

Before doing any research, reflect back what you've understood:

> "Okay, let me make sure I have this right:
> You're [background] with [existing knowledge]. You want to [concrete goal] by [timeline if any]. You prefer [learning style]. The angle you care most about is [angle]. Does that sound right, or did I miss something?"

Get confirmation or correction before moving on.

### 1d. Landscape Preview

Before asking the user to switch to Research Mode, run 2-3 quick web searches based on their topic and goals. Then present a landscape sketch:

> "Before we go deep, here's a quick lay of the land based on what I'm seeing:
>
> - **Major branches/approaches:** [3-4 branches in the field]
> - **Active debates:** [X vs Y, or the open questions people disagree on]
> - **Typical starting point:** Most people with your background start with [Z]
> - **Less obvious angle:** Given your specific goal, the path worth considering is [W]
>
> What resonates? Anything surprise you? This shapes the modules I'll propose."

Wait for the user to react. Their response — what excites them, what they push back on, what they didn't know — directly informs the full Research Mode searches in Phase 2.

---

## Phase 2: Research Mode

Tell the user to activate Research Mode before you start mapping the landscape. This is important — Research Mode runs significantly deeper multi-step searches and produces much better topic coverage.

Say this:

> **Switch to Research Mode before we continue.**
>
> Look for the **research icon** (usually a globe or telescope) next to the message input, or a toggle that says "Research". Turn it on.
>
> Research Mode lets me run many more searches, follow citation chains, and synthesize across dozens of sources — which is exactly what we need to map out a solid study landscape for you.
>
> Once it's on, send me a message like "research mode on, let's go" and I'll start mapping [topic].
>
> *(If you don't see Research Mode, you may need Claude Pro. It's worth it for this kind of work — but if you don't have it, just let me know and we'll proceed with standard search, just a bit more carefully.)*

Once Research Mode is confirmed active (or you've confirmed it's unavailable and will proceed without):

### 2a. Landscape mapping

Run targeted searches adapted to what you learned in the intake. The user's background and goal should shape what you look for — don't just run generic searches.

**Always run these:**
- `[topic] survey overview 2024 2025`
- `[topic] foundational seminal papers`
- `[topic] learning roadmap resources`

**Adapt by domain:**

*Technical/scientific (AI, ML, medicine, biology, engineering, physics):*
- Top-conference papers: NeurIPS, ICML, ICLR, ACL, KDD, RecSys, CVPR, SIGIR — pick the relevant ones
- Major company research blogs relevant to the topic
- `[specific subtopic user mentioned] production system implementation`

*Humanities/social science (philosophy, history, law, economics, politics):*
- `[topic] syllabus essential readings top university`
- `[topic] primary sources key texts`
- `[topic] academic debate major positions`

*Professional/applied (business, finance, design, architecture):*
- `[topic] framework best practices industry`
- `[topic] case studies examples`
- Practitioner publications and thought leaders in the field

**Always also run:** specific searches based on the user's stated angle and goal. If they said "I care about production deployment" — search for that. If they said "I want to understand the math" — search for mathematical treatments. Personalize the research.

### 2b. Fetch and read the best sources

`web_fetch` the 3-5 most promising results. Read them properly. You're looking for:
- How this field is typically structured and sequenced
- What concepts are universally treated as foundational
- What the active open questions or debates are
- What prior knowledge is assumed in primary sources

### 2c. Build the topic map

From the research, identify 3-7 core sub-topics that will become modules. Good modules:
- Have a clear central question or problem they address
- Build on each other logically — foundational concepts come first
- Are scoped to match the user's goal (no modules irrelevant to what they want)
- Each have 5-12 quality sources available
- Have a reason to exist as a *separate* module, not combined with another

The sequence matters as much as the modules themselves. Ask: what does the user need to understand first before Module 2 makes sense? What's the critical path?

---

## Phase 3: Collaborative Roadmap Design

**Do not build anything in Notion yet.** Present the structure and iterate until the user confirms it.

### 3a. Present the proposed roadmap

```
📚 Proposed Study Program: [Title]

Goal: [what you will concretely be able to do when finished]
Estimated depth: ~[X] total resources, ~[Y] total hours over [N] weeks

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Module 1: [Name]
[1-2 sentences: what this covers and why it comes first]
Central questions:
  → [question this module answers]
  → [question this module answers]
Preview resources: [2-3 titles]

Module 2: [Name]
[description]
...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Recommended pace: [X] hours/week → [N] weeks total
```

Then open it up genuinely:

> "Before I build anything — does this feel like the right structure for what you're trying to do?
>
> Specifically:
> - Does the sequence make sense? Can you see yourself going 1 → 2 → 3 naturally?
> - Any modules that feel too broad, too narrow, or obviously missing?
> - Does anything from your seed content not fit anywhere?
>
> Be honest here. It's much easier to reshape this now than after I've built 6 Notion pages."

### 3b. Iterate genuinely

This is a design conversation — engage with their feedback, don't just implement every suggestion robotically.

If they ask to merge two modules: only agree if the topics genuinely belong together.
If they want to remove a module: flag it if it's foundational to a later one.
If they want to add something: check if it fits the program's stated goal.
If they push back on the sequence: explain the reasoning, but be open to being wrong.

When the structure is settled:

> "Perfect — here's what we're building: [final module list]. I'll create the Notion structure now."

---

## Phase 4: Build the Notion Structure

### 4a. Ask where to place it

> "Where in Notion do you want this to live? I can create it as a top-level page, or paste a Notion URL if you want it inside an existing folder or workspace area."

### 4b. Create the main program page

Use `Notion:notion-create-pages`. Content:

```
[Program title]

[Goal statement — concrete, specific to what the user said, not generic boilerplate]

How to use this program:
Each module is a sub-page. Work through them in order. 
For deep study sessions, use the 🔬 Deep Dive Prompt page — paste the prompt 
into a new Claude session with the module's URL for a rigorous, ingredient-first 
study session that audits the module for gaps and takes you paper by paper.

Module Index:
[list of module names]

Suggested Schedule:
[table: Week | Module | Est. Hours]
```

Before creating, show the user the main page content with their specific goal statement and module index filled in. One confirmation for this page.

### 4c. Create each module sub-page

For each module:

**Header:**
```
Why this module matters: [1-2 sentences — tied to the user's specific goal, not generic]

What you'll learn:
- [Key concept 1]
- [Key concept 2]
- [Key concept 3]
```

**Progress section** (top of each module, after the header):
```
## Progress
- [ ] Papers reviewed
- [ ] Foundational papers complete
- [ ] Building blocks understood
- [ ] Study questions answered
- [ ] Synthesis exercise completed
```

**Papers & Articles section:**
```
### [N.X] — [Title] ([Venue/Source Year])
- [ ] Read
- [ ] Can explain to someone else
**[One-line description of what this resource does]**
- Paper/Blog: [URL]
- Authors/Source: [Author(s) — Institution or Publication]
- Key idea: [2-3 sentences: problem, approach, why it matters to this module]
- Key numbers: [main results if applicable]
- Connection to module: [how it fits the module's theme]
```

Include seed papers from the user in the appropriate modules. Add 3-5 high-quality resources per module from Phase 2 research.

**📌 Foundational Papers** (if applicable):
Papers the listed resources cite as their intellectual basis — the prior work you must understand before the main papers make sense. Use the format from `audit.md`.

**🔧 Technical Building Blocks** (if applicable):
Named concepts, tools, or algorithms that appear in this module's papers but aren't explained. Explain each enough to whiteboard it, not just name it. Use the format from `audit.md`.

**Study Questions** (checkbox format):
```
## Study Questions
- [ ] [Question requiring synthesis across papers...]
- [ ] [Question requiring domain transfer...]
- [ ] [Question connecting 3+ papers...]
```
5-8 questions requiring synthesis not recall. At least 2 must ask the user to apply concepts outside the paper's original domain.

**Synthesis Exercise** (checkbox format):
```
## Synthesis Exercise
- [ ] [Open-ended design task tailored to the user's stated goal...]
```
"If I were building [X — something relevant to what the user said they want to do], here's how I'd use the patterns from this module..."

**Build sequence:**
1. Build Module 1 first. Show the user the complete page content (header, papers, building blocks, study questions, synthesis exercise) as it will appear in Notion. Ask: "Here's Module 1 - does this format and depth look right? If yes, I'll build the remaining modules the same way."
2. After Module 1 is confirmed and written: build all remaining modules without individual confirmation, since the format is established. Name each module as you create it so the user can see progress.
3. If any module has notably different structure (e.g., fewer papers, no building blocks section), flag it briefly as you build.

### 4d. Create the Deep Dive Prompt page

Read `prompts.md` and create the 🔬 Deep Dive Prompt sub-page after all modules are created.

---

## Phase 5: Handoff

```
✅ Built: "[Program title]"
   [N] modules · ~[total resource count] resources · Main page: [URL]

Modules:
  Module 1: [Name] — [count] resources
  Module 2: [Name] — [count] resources
  ...

🔬 Deep Dive Prompt page: [URL]

⚠️ Flagged: [unverified URLs, modules thinner than ideal, anything to revisit]
```

Close with:

> "One last thing: is there anything about the structure that feels off now that you see the full thing? Easier to fix now than midway through studying."

Then, assess which modules came out thinnest and offer a proactive next step — but only if there's a meaningful imbalance (e.g. one module has notably fewer papers than the others, not when all modules are equally thin from a fresh build):

```
💡 I noticed Module [N] is thinner than the others ([X] papers vs [Y] average).
   Want me to audit it now, or should I research more sources for it first?
```

If they're happy and don't want immediate follow-up:

> "To get started: open Module 1, then start a **new Claude session** and paste the Deep Dive Prompt with Module 1's URL. That session will run a gap audit on the module, explain any unexplained building blocks, and walk you through the papers properly. Good luck."
