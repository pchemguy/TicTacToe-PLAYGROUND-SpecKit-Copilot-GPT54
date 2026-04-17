---
url: https://chatgpt.com/g/g-p-69de610325f08191aaf60c2de8f32282-tic-tac-toe-spec-kit-copilot/c/69e1b9f2-9504-83eb-a2a4-022c189f2f8b
---
You’re on the right track conceptually, but your current framing mixes two concerns:

1. **Constitution = invariant rules (slow-changing, normative)**
2. **Progress = state/context (fast-changing, descriptive)**

Right now, your constitution *implicitly assumes context exists*, but doesn’t formalize it. That’s the gap you need to close.

---

# What you actually need to add

Not a vague “project context” section — that would dilute the constitution.

You need a **strict interface contract between:**

* `.specify/memory/constitution.md` (normative)
* `.specify/memory/progress.md` (descriptive runtime context)

---

# Recommended change (minimal, precise, enforceable)

## Add a new section to constitution:

```markdown
## VIII. Project Context Must Be Explicit And Machine-Readable

The repository MUST maintain a project-level context document at:

- `.specify/memory/progress.md`

This document serves as the authoritative, continuously updated summary of project evolution and implemented feature history.

### Role Of `progress.md`

`progress.md` MUST:

- provide a chronological record of implemented features;
- map each feature to its specification, plan, and task artifacts;
- summarize implemented behavior and scope at a level sufficient for agent context initialization;
- distinguish between implemented, in-progress, deprecated, and superseded features; and
- enable deterministic reconstruction of project state without relying on conversation context.

### Relationship To Constitution

- The constitution defines **invariants and rules**.
- `progress.md` defines **current state and evolution history**.
- Both documents MUST be loaded together for agent initialization.

The constitution MUST NOT be modified to reflect routine feature evolution. Such changes MUST be recorded in `progress.md` instead.

### Required Structure

Each feature entry in `progress.md` MUST follow a standardized structure:

- feature title
- feature short name
- branch name
- spec directory
- milestone prefix
- status
- completion date
- summary (3–6 lines)
- references to spec, plan, and tasks

and start with a Markdown top heading `# [FEATURE TITLE]`.

### Lifecycle Rules

- `progress.md` MUST be created if missing.
- Every completed feature MUST append exactly one new entry.
- Entries MUST NOT be rewritten retroactively except to:
  - correct factual errors, or
  - mark status transitions (e.g., deprecated, superseded).
- "BROWNFIELD SUMMARY" entries MAY be used to establish baseline state when no prior history exists or when out-of-band changes occurred.

### Enforcement

- Task lists MUST include a task to update `progress.md`.
- Implementation MUST update `progress.md` as part of feature completion.
- Reviewers MUST reject completion if `progress.md` is missing or inconsistent with implemented artifacts.

Rationale: agentic workflows require a stable, compact, and explicit project state representation. Without a canonical evolution log, agents reconstruct context heuristically, leading to drift, inconsistency, and loss of traceability.
```

---

# Why this is correct (and your current version is not fully there)

### What you did right

* You defined the structure — good
* You defined purpose — good
* You distinguished greenfield vs brownfield — very good

### What was missing

You didn’t:

* **bind it to the workflow**
* **define enforcement**
* **separate invariants vs state strongly enough**
* **make it a required artifact**

Right now it's *guidance*. You need it to be *law*.

---

# Required version bump

This is a **MINOR version bump (1.5.0 → 1.6.0)** because:

* You are adding a new **mandatory section**
* You are introducing a new **required artifact + workflow constraint**

---

# Additional small but important tweak

In your existing Section VII (Documentation), add one bullet:

```diff
- supporting documentation (e.g., domain behavior, constraints, testing strategy)
+ supporting documentation (e.g., domain behavior, constraints, testing strategy, project evolution summary)
```

This ties documentation principle to `progress.md`.

---

# Optional but high-value refinement

You may want to slightly tighten **Agentic Delivery Requirements**:

Add:

```markdown
Agents MUST use `.specify/memory/progress.md` as the primary source of project state and feature history. Conversation context MUST NOT be treated as a reliable substitute for this document.
```

---

# Final outcome

After this change:

* Constitution = **rules + enforcement**
* progress.md = **state + history**
* Agents = **deterministic initialization**
* Workflow = **closed loop (spec → plan → tasks → implement → progress)**

---

# Suggested commit message

```bash
docs: amend constitution to v1.6.0 (introduce mandatory progress.md project context model)
```

---
