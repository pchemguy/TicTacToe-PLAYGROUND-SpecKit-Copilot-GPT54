---
url: https://chatgpt.com/g/g-p-69de610325f08191aaf60c2de8f32282-tic-tac-toe-spec-kit-copilot/c/69de6109-3f34-838e-98fa-86c7f2d44c76
---

# Short

Generate tasks strictly following the constitution: small, independently testable increments with inseparable code-and-test development. This stage is a browser-based React + TypeScript web app only; do not include Electron, SQLite, persistence, or networking. The feature is human vs computer Tic Tac Toe with an unbeatable (optimal) computer strategy that must never lose. Tasks must reflect clear separation of concerns: pure game rules/state logic, computer strategy logic, application state orchestration, and UI components. Every behavior-changing task MUST include corresponding test work. Include unit tests for game rules and state transitions, unit tests for computer strategy, and explicit validation that the computer never loses (via exhaustive or equivalent deterministic validation). Include basic integration tests for the playable web flow. Order tasks to deliver an MVP early: (1) deterministic game engine, (2) computer strategy, (3) minimal playable UI, then enhancements (optimality validation, restart flow, UI improvements). Ensure full requirement coverage, explicit edge case handling (invalid moves, terminal states), and no orphan tasks. Add a final mandatory phase “Documentation & Developer Experience” including tasks to create/update README.md, DEVELOPMENT.md, and docs/ (architecture, game rules, testing/optimality validation). Documentation must reflect the implemented system, not speculation. Use strict checklist format (T###, [P], [US#], file paths), organize by phases (Setup → Foundational → User Stories → Documentation), and define independent test criteria per user story.

# Long

Generate a task list that strictly follows the constitution and enforces small, independently testable increments with inseparable code-and-test development.

This stage is a browser-based web application only. Do not include Electron packaging or SQLite persistence. Those are explicitly out of scope for this task set.

The feature is a human vs computer Tic Tac Toe game with an unbeatable (optimal) computer strategy. The computer must never lose under any valid sequence of human moves. This requirement must be reflected explicitly in both implementation and validation tasks.

## Decomposition Requirements

Tasks MUST reflect clear separation of concerns:

- deterministic game state and rules (pure logic, no UI)
- computer move strategy (pure logic, independent module)
- application state orchestration (React state layer)
- UI / rendering layer (React components)

Do not mix these concerns within the same task unless strictly necessary.

## Test Strategy (MANDATORY)

Every task that introduces or modifies behavior MUST include corresponding test work in the same phase.

Include:

- unit tests for game rules and state transitions
- unit tests for computer strategy correctness
- validation tests ensuring the computer never loses:
  - either exhaustive state-space validation OR
  - equivalent deterministic invariant-based validation
- integration-level tests for basic user interaction flow (web layer)

Tests must be introduced BEFORE or alongside implementation tasks within each user story phase.

## MVP and Sequencing

Tasks MUST be ordered to deliver an MVP as early as possible:

User Story 1 (MVP):
- deterministic game engine (rules, state transitions)
- basic computer move logic (can be naive initially but must evolve to optimal within same story or clearly staged sub-tasks)
- minimal playable loop (no styling concerns)

Subsequent stories:
- enforce optimal (unbeatable) strategy with full validation
- UI improvements and interaction handling
- restart flow and state exposure

## Task Granularity

Enforce:

- small, single-purpose tasks
- explicit file paths
- no bundling of unrelated work
- parallel markers [P] only when safe (different files, no dependency)

If a task cannot be safely implemented and tested in one pass, it MUST be split.

## Coverage Requirements

Ensure:

- every functional requirement from spec.md is covered by at least one task
- every task maps to a user story
- no orphan tasks (tasks without requirement linkage)
- explicit tasks for:
  - edge cases (invalid moves, terminal state behavior)
  - rejection semantics (no state mutation on invalid input)
  - win/draw detection correctness

## Explicit Constraints

- no persistence tasks
- no Electron / packaging tasks
- no networking tasks
- no external services

## Documentation Tasks (CRITICAL)

The current tasks agent does NOT generate comprehensive documentation. You MUST include documentation tasks as the FINAL phase.

Add a dedicated final phase:

"Documentation & Developer Experience"

This phase MUST include tasks for:

- updating README.md:
    - feature overview
    - how to run the web app locally
    - how to play the game
- creating/updating DEVELOPMENT.md:
    - project structure
    - architecture and separation of concerns
    - how to run tests
    - how to extend the game logic
- creating docs/ structure:
    - docs/architecture.md (core vs UI separation, module boundaries)
    - docs/game-rules.md (formalized behavior summary)
    - docs/testing.md (test strategy, especially optimality validation)
- reviewing README.md, DEVELOPMENT.md, and docs/ content against the implemented code to remove speculative content and correct mismatches

These documentation tasks MUST appear AFTER all functional tasks and MUST be required for completion.

## Output Expectations

- Strict checklist task format (T###, [P], [US#], file paths)
- Phases: Setup → Foundational → User Stories → Documentation
- Clear MVP identification (User Story 1)
- Explicit independent test criteria per user story
- Explicit validation tasks for unbeatable strategy

Do not omit test tasks. Do not defer validation. Do not merge documentation into implementation tasks.

# Comments

## Why this works (important)

This prompt explicitly patches **three real gaps** in the stock agent:

1. **Test rigor escalation**
    - Forces handling of the _“never lose”_ constraint as a **first-class validation problem**
    - Prevents shallow minimax-without-proof implementations
2. **Architecture enforcement**
    - Aligns with your functional-core / shell model (even though not named explicitly)
    - Prevents React-state leakage into game logic
3. **Docs as deliverable (your key addition)**
    - Injects a **missing artifact class** into the workflow
    - Keeps it **post-MVP**, which matches your constitution sequencing
