# Core Engine Checklist: Classic Tic Tac Toe Against Computer

**Purpose**: Validate that the core engine requirements fully specify deterministic rules, unbeatable computer strategy, and the engine-to-app boundary for the current browser stage.
**Created**: 2026-04-14
**Feature**: [spec.md](../spec.md)

**Note**: This checklist validates the quality of the written requirements for the core engine domain. It does not test the implementation.

## Requirement Completeness

- [x] CHK001 Are board representation requirements complete enough to define the flat 9-cell row-major structure, allowed cell values, and addressable index domain without relying on implementation inference? [Completeness, Spec §FR-001, §FR-005, §FR-020; Data Model §Board]
- [x] CHK002 Are player-role and starting-turn requirements fully specified for new-game initialization, ongoing play, and terminal states? [Completeness, Spec §FR-003, §FR-004, §FR-019, §FR-020; Data Model §GameState]
- [x] CHK003 Are core transition requirements complete for all state-changing paths: valid human move, invalid move, automatic computer response, terminal move, and restart? [Completeness, Spec §FR-006, §FR-011, §FR-013, §FR-019; Data Model §State Transitions]
- [x] CHK004 Are engine boundary requirements complete enough to distinguish single-move rule application from full-turn orchestration responsibilities? [Completeness, Plan §Architecture Decomposition; Contract: Game Core; Contract: Application Orchestration]

## Requirement Clarity

- [x] CHK005 Is `fully resolved post-computer state` defined precisely enough to avoid ambiguity about when intermediate human-only states may appear? [Clarity, Spec §FR-013, §FR-020]
- [x] CHK006 Is `optimal` operationalized clearly enough to cover non-loss, immediate-win preference, immediate-block preference, and lowest-index tie-breaking? [Clarity, Spec §FR-015, §FR-016, §FR-017, §FR-018; Research §Decision 1]
- [x] CHK007 Is terminal-state behavior clear enough to define both status precedence and `currentPlayer = none` without conflicting interpretations? [Clarity, Spec §FR-010, §FR-011, §FR-012, §FR-020; Data Model §GameStatus, §GameState]
- [x] CHK008 Are move-input requirements explicit enough about malformed values, such as non-integer indexes, or is that behavior currently left to inference? [Ambiguity, Gap, Spec §FR-005, §FR-006; Data Model §MoveInput]

## Requirement Consistency

- [x] CHK009 Do the spec, data model, and core contract consistently describe the board as a flat 9-element row-major array? [Consistency, Spec §FR-001, §FR-020; Data Model §Board; Contract: Game Core]
- [x] CHK010 Do the spec, plan, and contracts consistently assign automatic computer-turn coordination to orchestration rather than the pure rules module? [Consistency, Spec §FR-013; Plan §Architecture Decomposition; Contract: Game Core; Contract: Application Orchestration]
- [x] CHK011 Do the turn-ownership rules remain consistent between the fully resolved human action flow and the terminal-state rule that `currentPlayer` becomes `none`? [Consistency, Spec §FR-004, §FR-013, §FR-020; Data Model §GameState]
- [x] CHK012 Are the restart/reset requirements consistent about which prior-match data must be cleared and which initial defaults must be restored? [Consistency, Spec §FR-019; User Story 5; Data Model §Restart]

## Acceptance Criteria Quality

- [x] CHK013 Are the non-loss requirements measurable independently of UI behavior, with objective evidence expectations rather than informal play testing? [Acceptance Criteria, Spec §SC-001; Research §Decision 2]
- [x] CHK014 Are determinism requirements measurable for both repeated strategy selection and repeated state exposure after accepted human moves? [Acceptance Criteria, Spec §SC-002, §SC-006]
- [x] CHK015 Are invalid-move success criteria specific enough to identify exactly which state fields must remain unchanged? [Acceptance Criteria, Spec §SC-003, §FR-006, §FR-020]
- [x] CHK016 Is the plan's engine response performance target intentionally non-binding, or should the specification define a measurable non-functional requirement for core move-evaluation latency? [Gap, Plan §Technical Context]

## Scenario Coverage

- [x] CHK017 Do the requirements cover all primary engine scenarios: initialization, valid human move, automatic computer response, win detection, draw detection, terminal lockout, and restart? [Coverage, User Stories 1-5]
- [x] CHK018 Are exception-flow requirements complete for occupied cells, out-of-range indexes, and attempts to move after game over? [Coverage, Spec §FR-005, §FR-006, §FR-012; Edge Cases]
- [x] CHK019 Are strategy requirements complete for immediate-win, immediate-block, forced-draw, and repeated-state tie scenarios? [Coverage, Spec §FR-015, §FR-016, §FR-017, §FR-018; User Story 3]
- [x] CHK020 Are engine-to-app contract requirements complete for the case where a valid human move ends the game before any computer move should occur? [Coverage, Spec Edge Cases; Contract: Application Orchestration]

## Edge Case Coverage

- [x] CHK021 Is the precedence rule between a final-move win and a draw stated unambiguously enough to avoid conflicting terminal outcomes? [Edge Case, Spec Edge Cases; §FR-010, §FR-011]
- [x] CHK022 Are requirements defined for strategy invocation boundaries, including whether the AI may be called only on non-terminal states with at least one legal move? [Gap, Contract: Computer Strategy]
- [x] CHK023 Are requirements clear about whether fixed human/computer marks and starting-player defaults are stable engine rules for this stage or temporary assumptions that may later vary? [Assumption, Spec §FR-003; Assumptions; Plan §Decisions And Assumptions]

## Non-Functional Requirements

- [x] CHK024 Are purity and side-effect boundaries for the rules and strategy layers specified strongly enough to support independent testing outside React and future runtime integrations? [Non-Functional, Plan §Summary, §Architecture Decomposition; Contracts]
- [x] CHK025 Are exhaustive validation obligations for the unbeatable strategy captured strongly enough in the requirements, rather than only in planning guidance? [Gap, Spec §SC-001; Research §Decision 2; Plan §Test Strategy]

## Dependencies & Assumptions

- [x] CHK026 Are deferred Electron packaging and SQLite persistence concerns excluded clearly enough that current core engine requirements cannot accidentally depend on runtime or storage behavior outside this stage? [Scope, Plan §Summary; Deferred Beyond Current Stage; Research §Decision 4]
- [x] CHK027 Is the optional `ComputerMove.reason` field intentionally non-normative, or should the requirements clarify whether that metadata is internal only or part of the exposed contract? [Ambiguity, Data Model §ComputerMove]

## Notes

- Focus areas selected: pure rules/state transitions, unbeatable strategy requirements, and engine-to-app contract edges.
- Depth level: standard reviewer checklist.
- Intended use: requirements review before task generation or implementation.
- Review completed on 2026-04-14 against the current spec, plan, contracts, and data model.
- All checklist items are now satisfied by the current spec, plan, contracts, and data model.