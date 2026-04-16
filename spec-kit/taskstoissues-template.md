
# Task to Issue Mapping

Feature: `[FEATURE_NAME]`  
Repository: `[owner/repo]`  
Remote: `[git remote URL]`

<!-- 
  ============================================================================
  IMPORTANT AGENT INSTRUCTIONS:
  The Milestones and Task Mapping tables below represent a one-shot example derived for a sample feature with
  the following set of user stories:

 - User Story 1 - Start a New Match
 - User Story 2 - Make a Valid Human Move
 - User Story 3 - Receive an Optimal Computer Response
 - User Story 4 - End the Game Correctly
 - User Story 5 - Restart From a Clean State
 - User Story 6 - Inspect Current Game State

The agent MUST replace these samples with the actual contents derived for the actual feature under development.

  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Milestones

```
For a sample set of user stories (from spec.md)

 - User Story 1 - Start a New Match
 - User Story 2 - Make a Valid Human Move
 - User Story 3 - Receive an Optimal Computer Response
 - User Story 4 - End the Game Correctly
 - User Story 5 - Restart From a Clean State
 - User Story 6 - Inspect Current Game State

A milestone table may look like:

| # | Name                                                        |
| - | ----------------------------------------------------------- |
| 1 | Phase 1 - Setup                                             |
| 2 | Phase 2 - Foundational                                      |
| 3 | Phase 3 - US1 New Match (MVP)                               |
| 4 | Phase 4 - US2 Valid Human Move (MVP)                        |
| 5 | Phase 5 - US4 Terminal Core (MVP)                           |
| 6 | Phase 6 - US3 Optimal Response & Playable UI (MVP Playable) |
| 7 | Phase 7 - US5 Restart Flow                                  |
| 8 | Phase 8 - US6 State Exposure                                |
| 9 | Phase 9 - Documentation & Developer Experience              |
```

---

I want to tackle speckit.taskstoissues.agent.md in a staged manner, starting with the core. The current prompt says use MCP server, which is a BS instruction. That goes. It should go something like the following.

```
Your objective is to create GitHub issues with structured metadata (colored labels and milestones) from tasks.md. You should use a layered strategy to maximize the chances of success.

### Core Rules

#### 1. One Task = One Issue

- Every task MUST map to exactly one GitHub issue
- Tasks MUST NOT be merged into a single issue
- Issues MUST remain:
    - small
    - focused
    - independently testable

---

#### 2. Milestones Represent Delivery Phases

- Milestones MUST reflect the **execution phases** defined in `tasks.md`
- Each issue MUST belong to exactly one milestone
- Milestones MUST preserve:
    - execution order
    - MVP / tracer-bullet sequencing
    - staged delivery model

---

#### 3. Labels Encode Metadata

Each issue MUST include labels representing:

- `feature:<feature-name>`
- `phase:<phase-shortcut>` (e.g., `phase:us5-restart`, `phase:foundational`, `phase:docs-dx`)
- task type (e.g., `type:core`, `type:ui`, `type:orchestration`, `type:docs`, `type:test`)
- priority (e.g., `priority:p1`, `priority:p2`)
- risk classification (if applicable, e.g., `risk:mvp`, `risk:blocking`)
- user story (if applicable, e.g., `story:us1-new-match`, `story:us6-inspect-game-state`)

Lables should use descriptive titles, descriptions, and smart color scheme to make it easy to distinguish between different aspects. When different values within one dimension have no inherent priority (e.g., user stories are prioritized, but priority is an explicit label, so the names of the user stories have no inherent priority) should use one color. When there is inherent priority, consider using different colors or pseudo color scale with red tones emphasizing the important end, such has high priority or high risk.
Labels MUST be consistent across all issues.

---

#### 4. Traceability Is Mandatory

This mapping MUST allow:

- tracing any task → issue
- tracing any issue → task
- reconstructing delivery sequence
- validating coverage and completeness

### Tool Selection and Use

1. GitHub CLI `gh` dedicated commands for
   - labels (`gh label create <name> -c <RGB_HEX_COLOR> -f -d <description>`, e.g., `gh label create "priority:p1" -c FF0000 -f -d "User story or phase priority."`) and
   - issues (`gh issue create -t "<name>" [-l "<label_name>"]*  -m "<milestone_name>" -F <issue_text_file OR std_dash>`)
2. GitHub CLI extension for missing `milestone` command:
   - try 
     `gh milestone create -t <name> -d <description>`
     if fails, install GH extension
     `gh extension install valeriobelli/gh-milestone`
     and try again. If still fails, try CLI api command
3. GitHub CLI API
   gh api --method POST \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2026-03-10" \
    /repos/:<OWNER>/:<REPO>/milestones \
    -f "title=<milestone_title>" \
    -f "state=open" \
    -f "description=<milestone_description>"
4. GitHub MCP server as a fallback.

### Issue Body Template

TBD

### Protocol

1. Create all labels
2. Create all milestones
3. Create issues.
```








Create GitHub label via CLI:

```text
gh label create <name> -c <RGB_HEX_COLOR> -f -d <description>
```

e.g.,

```
gh label create "priority:p1" -c FF0000 -f -d "User story or phase priority."
```

Create GitHub milestone via CLI:

gh milestone create -t <name> -d <description>


gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2026-03-10" \
  /repos/:<OWNER>/:<REPO>/milestones \
   -f "title=v1.0"  -f "state=open" -f "description=Tracking milestone for version 1.0"

gh api --method POST -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2026-03-10" /repos/:pchemguy/:TicTacToe-PLAYGROUND-SpecKit-Copilot-GPT54/milestones -f "title=v1.0"  -f "state=open" -f "description=Tracking milestone for version 1.0"

gh milestone create -t "Phase 9 - Documentation & Developer Experience" -d "Implemented-system documentation and documentation review."

gh extension install valeriobelli/gh-milestone


gh issue create -t "ABC ABC" -l qaz -l mns -m m1 -F <file or std>


`https://github.com/<owner>/<repo>/issues/<GH_issue_ID>`

## Purpose

This document defines a **one-to-one mapping between implementation tasks and GitHub issues**.

It serves as the authoritative traceability artifact linking:

- tasks defined in `tasks.md`
- GitHub issues used for execution
- milestones representing staged delivery
- labels representing classification and metadata

This file MUST be generated alongside issue creation and MUST remain consistent with both `tasks.md` and the GitHub repository state.

---

## Core Rules

### 1. One Task = One Issue

- Every task MUST map to exactly one GitHub issue
- Tasks MUST NOT be merged into a single issue
- Issues MUST remain:
    - small
    - focused
    - independently testable

---

### 2. Milestones Represent Delivery Phases

- Milestones MUST reflect the **execution phases** defined in `tasks.md`
- Each issue MUST belong to exactly one milestone
- Milestones MUST preserve:
    - execution order
    - MVP / tracer-bullet sequencing
    - staged delivery model

---

### 3. Labels Encode Metadata

Each issue MUST include labels representing:

- `feature:<feature-name>`
- `phase:<phase-shortcut>` (e.g., `phase:us5-restart`, `phase:foundational`, `phase:docs-dx`)
- task type (e.g., `type:core`, `type:ui`, `type:orchestration`, `type:docs`, `type:test`)
- priority (e.g., `priority:p1`, `priority:p2`)
- risk classification (if applicable, e.g., `risk:mvp`, `risk:blocking`)
- user story (if applicable, e.g., `story:us1-new-match`, `story:us6-inspect-game-state`)

Labels MUST be consistent across all issues.

---

### 4. Traceability Is Mandatory

This mapping MUST allow:

- tracing any task → issue
- tracing any issue → task
- reconstructing delivery sequence
- validating coverage and completeness

---





## Validation Requirements

Before completion, verify:

- Every task in `tasks.md` has a corresponding issue
- No issue represents more than one task
- Every issue is assigned:
    - a milestone
    - required labels
- Milestones reflect correct execution order
- Issue count = task count
- Mapping table is consistent

---

## Execution Notes

- Issues SHOULD be created in the same order as tasks
- Issue descriptions MUST:
    - include task description
    - include acceptance criteria
    - include test expectations (per constitution)
- After creation:
    - issues MUST be assigned to milestones
    - labels MUST be applied
    - mapping MUST be persisted in this file




---

## Completion Criteria

This file is complete when:

- all tasks are mapped
- all issues exist and are correctly configured
- milestones and labels are consistent
- traceability is verifiable end-to-end
