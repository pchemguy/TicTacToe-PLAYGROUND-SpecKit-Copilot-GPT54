# Analysis Resolution Plan

## Governing Inputs

- Constitution: principles I, II, III, IV, and VI
- Feature specification: `specs/001-add-tictactoe-ai/spec.md`
- Implementation plan: `specs/001-add-tictactoe-ai/plan.md`
- Tasks: `specs/001-add-tictactoe-ai/tasks.md`
- Analysis source of truth: `analyses/CUR/analysis-report.md`

## Planned Actions By Issue

### ARW-001

- Governing basis: Constitution I and IV require authoritative, traceable artifacts without malformed or duplicated content.
- Affected files: `specs/001-add-tictactoe-ai/plan.md`
- Intended change: Remove the appended patch-marker block and duplicated artifact content so `plan.md` ends cleanly at the complexity-tracking section.
- Rationale: The plan must remain a single coherent artifact that references, rather than embeds, the separate design documents.
- Dependency notes: None.
- Validation method: Read the tail of `plan.md` and confirm no `*** Add File:` markers or duplicated artifact sections remain.
- Expected downstream impact: Restores artifact integrity for later planning and implementation workflows.

### ARW-002

- Governing basis: Constitution II and VI, plus plan Stage 1, require deterministic core rules to be delivered before later AI/UI stages depend on them.
- Affected files: `specs/001-add-tictactoe-ai/tasks.md`
- Intended change: Reorder and rewrite the user-story task phases so terminal-state engine behavior is implemented before unbeatable AI orchestration and the playable browser MVP.
- Rationale: The current sequencing claims a playable AI/UI milestone before required terminal-state core behavior exists.
- Dependency notes: Keep task IDs sequential and preserve explicit code-and-test pairing within each behavior-changing task.
- Validation method: Check that terminal-state core tasks appear before AI orchestration and playable UI tasks, and that dependency notes align with the staged plan.
- Expected downstream impact: Aligns tasks with the plan, prevents false MVP checkpoints, and preserves deterministic sequencing.

### ARW-003

- Governing basis: Constitution I and workflow requirements require documentation to remain authoritative and explicitly validated.
- Affected files: `specs/001-add-tictactoe-ai/tasks.md`
- Intended change: Add a final documentation verification task that reviews README.md, DEVELOPMENT.md, and docs content against the implemented system.
- Rationale: Documentation creation alone does not guarantee documentation correctness or non-speculative content.
- Dependency notes: This review task must occur after all documentation-writing tasks.
- Validation method: Confirm the documentation phase includes a final non-parallel verification task after the doc creation tasks.
- Expected downstream impact: Tightens completion criteria and closes the documentation traceability gap.

## Coverage Verification

| Issue ID | Covered By Planned Action | Notes |
|----------|---------------------------|-------|
| ARW-001 | yes | `plan.md` cleanup |
| ARW-002 | yes | `tasks.md` sequencing correction |
| ARW-003 | yes | `tasks.md` documentation verification task |

## Clarification Reflection

No clarification artifact is required. The plan fully resolves all recorded issues using existing governed artifacts.
