# Task-to-Issue Mapping

Feature: `[FEATURE_ID-or-NAME]`  
Repository: `[owner/repo]`  
Remote: `[git remote URL]`

---

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

- feature scope
- phase
- task type (e.g., core, UI, orchestration, docs, test)
- priority (e.g., p1, p2)
- risk classification (if applicable)
- user story (if applicable)

Labels MUST be consistent across all issues.

---

### 4. Traceability Is Mandatory

This mapping MUST allow:

- tracing any task → issue
- tracing any issue → task
- reconstructing delivery sequence
- validating coverage and completeness

---

## Milestones

| Milestone # | Milestone Name |
|-------------|----------------|
| 1 | Phase 1 - Setup |
| 2 | Phase 2 - Foundational |
| 3 | Phase 3 - [User Story 1 / MVP] |
| 4 | Phase 4 - [User Story 2] |
| ... | ... |
| N | Final Phase - Documentation & Developer Experience |

> Milestones MUST align with phases defined in `tasks.md`.

---

## Task Mapping

| Task ID | GitHub Issue | Milestone | Labels |
|--------|-------------|-----------|--------|
| T001 | #[issue-number] | Phase 1 - Setup | `feature:[name]`, `phase:setup`, `type:setup`, `priority:p1` |
| T002 | #[issue-number] | Phase 1 - Setup | ... |
| T003 | #[issue-number] | Phase 2 - Foundational | ... |

> Each row MUST represent a **single task → single issue mapping**.

---

## Issue URLs

| Task ID | Issue URL |
|--------|-----------|
| T001 | https://github.com/[owner]/[repo]/issues/[id] |
| T002 | https://github.com/[owner]/[repo]/issues/[id] |

---

## Validation Requirements

Before completion, verify:

- Every task in `tasks.md` has a corresponding issue
- No issue represents more than one task
- Every issue is assigned:
    - a milestone
    - required labels
- Milestones reflect correct execution order
- Issue count == task count
- Mapping table and URL table are consistent

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

## Relationship to Other Artifacts

This file depends on:

- `tasks.md` (source of truth for tasks)
- GitHub Issues (execution layer)

This file is consumed by:

- implementation workflows
- progress tracking
- audit and validation processes

---

## Completion Criteria

This file is complete when:

- all tasks are mapped
- all issues exist and are correctly configured
- milestones and labels are consistent
- traceability is verifiable end-to-end
