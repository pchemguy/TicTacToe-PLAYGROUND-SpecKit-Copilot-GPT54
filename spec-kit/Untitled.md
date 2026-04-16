---
url: https://chatgpt.com/g/g-p-69de610325f08191aaf60c2de8f32282-tic-tac-toe-spec-kit-copilot/c/69df9aab-b8f0-8396-88a1-f1b93f099921?tab=sources
---
````markdown
---
description: Create GitHub issues, labels, milestones, and a task-to-issue mapping from tasks.md using a layered execution strategy.
---
````

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding, if not empty.

## Goal

Your objective is to convert `tasks.md` into a complete GitHub execution layer consisting of:

* GitHub issues
* structured labels
* milestones
* `task-to-issue.md`

Use a layered strategy that maximizes the chance of success while preserving deterministic, traceable, task-level issue creation.

## Core Rules

### 1. One Task = One Issue

* Every task MUST map to exactly one GitHub issue
* Tasks MUST NOT be merged into a single issue
* Each issue MUST remain:
    * small
    * focused
    * independently testable

### 2. Milestones Represent Delivery Phases

* Milestones MUST reflect the execution phases defined in `tasks.md`
* Each issue MUST belong to exactly one milestone
* Milestones MUST preserve:
    * execution order
    * MVP or tracer-bullet sequencing
    * staged delivery model

### 3. Labels Encode Metadata

Each issue MUST include labels representing, where applicable:

* `feature:<feature-name>`
* `phase:<phase-shortcut>` (e.g., `phase:us5-restart`, `phase:foundational`, `phase:docs-dx`)
* one or more task-type labels such as:
    * `type:setup`
    * `type:config`
    * `type:core`
    * `type:strategy`
    * `type:ui`
    * `type:orchestration`
    * `type:test`
    * `type:validation`
    * `type:docs`
* priority label:
    * `priority:p1`
    * `priority:p2`
    * `priority:p3`
* risk label when applicable:
    * `risk:blocking`
    * `risk:mvp`
    * `risk:high`
    * `risk:medium`
    * `risk:low`
* user-story label when applicable:
    * `story:<story-shortcut>` (e.g., `story:us1-new-match`, `story:us6-inspect-game-state`)

Labels MUST be consistent across all issues.

#### Label design requirements

Labels MUST use:

* descriptive names
* meaningful descriptions
* a coherent color scheme

Color guidance:

* labels within a dimension that do not imply ordering SHOULD share one color family
    * example: all `story:*` labels may share one color
* labels with inherent urgency or severity SHOULD use a priority-emphasizing color scale
    * example: `priority:p1` and `risk:blocking` may use stronger red tones than lower-priority values

### 4. Traceability Is Mandatory

The result MUST allow:

* tracing any task to its GitHub issue
* tracing any GitHub issue back to its task
* reconstructing delivery order
* validating coverage and completeness

## Feature Context Initialization

Run `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks` once from repo root and parse:

* `FEATURE_DIR`
* `AVAILABLE_DOCS`

Derive:

* `TASKS = FEATURE_DIR/tasks.md`
* `PLAN = FEATURE_DIR/plan.md`
* `SPEC = FEATURE_DIR/spec.md`
* `TASK_TO_ISSUE = FEATURE_DIR/task-to-issue.md`

Abort with a clear error if `tasks.md` is missing.

For single quotes in args like "I'm Groot", use escape syntax: e.g. `'I'\''m Groot'` or use double quotes when possible.

## Required Source Loading

Load and use:

* `tasks.md` as the source of task truth
* `plan.md` for phase structure, architecture, and feature naming cues
* `spec.md` for user-story names, priorities, and MVP/tracer-bullet context

Do not infer issue grouping from convenience. Derive it from governed artifacts.

## Remote Validation

Determine the Git remote:

```bash
git config --get remote.origin.url
```

Proceed only if the remote is a GitHub repository.

Abort if:

* no remote is configured
* the remote is not GitHub
* the target repository cannot be determined confidently

Under no circumstances create issues in a repository that does not match the validated Git remote.

## Semantic Extraction

Before creating anything, build internal normalized models for:

* feature name
* task list
* phase list
* user-story list
* milestone list
* label set
* per-task metadata:
    * task ID
    * title
    * phase
    * story, if any
    * priority
    * risk
    * task type labels
    * dependent or blocking context, if relevant

Do not create issues until this normalization step is complete.

## Tool Selection and Use

Use the following layered strategy in order:

### 1. GitHub CLI for labels and issues

Preferred commands:

* labels:
    * `gh label create <name> -c <RGB_HEX_COLOR> -f -d <description>`
* issues:
    * `gh issue create -t "<title>" [-l "<label>"]... -m "<milestone>" -F <file-or->`

### 2. GitHub CLI milestone support

First try:

```text
gh milestone create -t "<name>" -d "<description>"
```

If milestone support is unavailable:

```bash
gh extension install valeriobelli/gh-milestone
```

Then retry milestone creation.

### 3. GitHub CLI API fallback

If milestone creation still fails, use `gh api` against the repository API.

### 4. GitHub MCP server as last resort

Use MCP only as a fallback when the higher-confidence CLI and CLI API layers cannot complete the required operation.

Do not prefer MCP when a more direct and more deterministic GitHub CLI path is available.

## Required Execution Order

Follow this exact order:

1. derive full metadata model
2. create or update all required labels
3. create or update all required milestones
4. create all GitHub issues
5. generate `task-to-issue.md`
6. validate completeness and consistency

Do not create issues before milestones and labels are ready unless forced by a tool limitation. If forced, document the deviation and reconcile the metadata before completion.

## Minimum Validation

Before reporting success, verify:

* every task has exactly one issue
* issue count equals eligible task count
* every issue has the required labels
* every issue is assigned to exactly one milestone
* milestone set reflects the phase structure in `tasks.md`
* `task-to-issue.md` is complete and consistent with the actual created issues

If any validation check fails, report the failure clearly and do not claim completion.

