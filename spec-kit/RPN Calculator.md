---
url: https://chatgpt.com/g/g-p-69de610325f08191aaf60c2de8f32282-tic-tac-toe-spec-kit-copilot/c/69e139f9-f2f0-838d-9ccf-d3621e78eeab
---
# Baseline Greenfield RPN Calculator Prototype

Feature: greenfield-proto

MVP = *smallest usable vertical slice that proves the core model works*.
For an RPN calculator app, this definition means “User can perform basic calculations and see results”

## User Stories

| #   | Name                                                         | Description                                                                                                      | Stage                 | Priority |
| --- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | --------------------- | -------- |
| 1   | Start a New Calculation Session                              | System initializes an empty stack and ready state.                                                               | MVP / tracer bullet   | P1       |
| 2   | Apply Valid Tokens to the Stack                              | User can input operands and apply supported operators, producing correct stack transformations.                  | MVP / tracer bullet   | P1       |
| 3   | Inspect Current Stack                                        | User can view the full stack and/or top-of-stack at any time.                                                    | MVP / tracer bullet   | P1       |
| 4   | Reject Operations With Insufficient Operands                 | System rejects operations that cannot be applied due to insufficient operands, preserving state.                 | MVP / tracer bullet   | P1       |
| 5   | Reject Invalid Tokens and Unsupported Operations             | System rejects malformed operands and unknown operators without altering the stack.                              | correctness hardening | P2       |
| 6   | Handle Arithmetic Domain Errors and Numeric Limits Correctly | System detects and handles invalid mathematical operations and numeric overflow/limits without corrupting state. | correctness hardening | P2       |
| 7   | Reset Calculator                                             | User can clear all state and restart from a clean session.                                                       | convenience           | P3       |
| 8   | Undo the Last Accepted Token                                 | User can revert the most recent accepted stack mutation.                                                         | convenience           | P3       |


## Milestones 

| #   | Name                                                                          |
| --- | ----------------------------------------------------------------------------- |
| 1   | GF Proto 1 - Setup                                                            |
| 2   | GF Proto 2 - Foundational                                                     |
| 3   | GF Proto 3 - US1 Start a New Calculation Session (MVP)                        |
| 4   | GF Proto 4 - US2 Apply Valid Tokens to the Stack (MVP Core Execution)         |
| 5   | GF Proto 5 - US3 Inspect Current Stack (MVP Observability)                    |
| 6   | GF Proto 6 - US4 Reject Operations With Insufficient Operands (MVP Stability) |
| 7   | GF Proto 7 - US5 Reject Invalid Tokens & Unsupported Operations               |
| 8   | GF Proto 8 - US6 Handle Arithmetic Domain Errors & Numeric Limits             |
| 9   | GF Proto 9 - US7 Reset Calculator                                             |
| 10  | GF Proto 10 - US8 Undo Last Accepted Token                                    |
| 11  | GF Proto 11 - Documentation & Developer Experience                            |

## Phases

### Phase 1: Setup

**Purpose**: Establish the browser-only React and TypeScript workspace for the greenfield RPN calculator prototype.

- [ ] T001 Create the browser app toolchain configuration in package.json, tsconfig.json, vite.config.ts, and index.html
- [ ] T002 Configure browser test bootstrap in tests/setup.ts and package.json
- [ ] T003 Create the application entry shell in src/app/main.tsx, src/app/App.tsx, and src/ui/styles/app.css

---

### Phase 2: Foundational

**Purpose**: Define shared calculator domain structure, immutable stack primitives, and architecture seams that all user stories depend on.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [ ] T004 Create shared calculator domain types and token/operator definitions in src/calculator/core/types.ts
- [ ] T005 Create shared immutable stack state helpers and exported initial-session primitives in src/calculator/core/state.ts
- [ ] T006 Create the empty orchestration hook and UI component shells in src/app/hooks/useRpnCalculator.ts, src/ui/components/TokenInput.tsx, src/ui/components/StackView.tsx, src/ui/components/CalculatorStatusPanel.tsx, src/ui/components/ResetButton.tsx, and src/ui/components/UndoButton.tsx

**Checkpoint**: Browser app scaffold and calculator architecture seams are in place for story-by-story implementation.

---

### Phase 3: User Story 1 - Start a New Calculation Session (Priority: P1) 🎯 MVP

**Goal**: A user can start a deterministic new calculation session with an empty stack and ready state.

**Independent Test**: Run the unit and integration coverage for initialization and verify the system exposes an empty stack, no prior error, no prior result, and ready input state before any token is accepted.

- [ ] T007 [US1] Add initialization unit coverage in tests/unit/core/state.test.ts and implement the new-session state factory in src/calculator/core/state.ts
- [ ] T008 [US1] Add initialization orchestration coverage in tests/integration/app-flow.test.ts and implement initial exposed session state in src/app/hooks/useRpnCalculator.ts

**Checkpoint**: User Story 1 is independently functional through pure session creation and orchestration exposure.

---

### Phase 4: User Story 2 - Apply Valid Tokens to the Stack (Priority: P1) 🎯 MVP

**Goal**: A user can submit valid operands and supported operators, and the calculator applies deterministic stack transformations for accepted tokens.

**Independent Test**: Run the token-application unit and orchestration tests and verify valid operand pushes append values to the stack while valid unary and binary operators consume the correct operands and push the correct result.

- [ ] T009 [US2] Add token-application unit coverage for valid operand pushes and supported unary and binary operator execution in tests/unit/core/evaluate.test.ts and implement accepted-token evaluation in src/calculator/core/evaluate.ts
- [ ] T010 [US2] Add orchestration coverage for accepted token flow in tests/integration/app-flow.test.ts and implement accepted-token handling in src/app/hooks/useRpnCalculator.ts

**Checkpoint**: User Story 2 is independently functional through the pure evaluation engine and orchestration layer without UI dependency.

---

### Phase 5: User Story 3 - Inspect Current Stack (Priority: P1) 🎯 MVP

**Goal**: The current stack is consistently exposed so a user can inspect full-stack and top-of-stack state after each accepted token.

**Independent Test**: Run the state-exposure integration and browser rendering coverage and verify the full stack and top-of-stack are correctly exposed after initialization, operand pushes, and successful operator application.

- [ ] T011 [US3] Add stack-exposure integration coverage in tests/integration/app-flow.test.ts and implement stable current-stack exposure in src/app/hooks/useRpnCalculator.ts
- [ ] T012 [US3] Add stack-rendering browser coverage in tests/ui/stack-view.test.tsx and implement full-stack and top-of-stack presentation in src/ui/components/StackView.tsx and src/app/App.tsx

**Checkpoint**: User Story 3 makes the calculator observably usable as an MVP.

---

### Phase 6: User Story 4 - Reject Operations With Insufficient Operands (Priority: P1) 🎯 MVP

**Goal**: The calculator rejects operators that cannot be applied because the stack does not contain enough operands and preserves pre-error state.

**Independent Test**: Run the operand-count validation unit and orchestration coverage and verify unary and binary operators are rejected when the stack is too small, the stack remains unchanged, and the error state is exposed consistently.

- [ ] T013 [US4] Add insufficient-operands unit coverage for unary and binary operators in tests/unit/core/evaluate.test.ts and implement operand-count rejection semantics in src/calculator/core/evaluate.ts
- [ ] T014 [US4] Add rejected-operation orchestration coverage in tests/integration/app-flow.test.ts and implement unchanged-state and surfaced-error handling in src/app/hooks/useRpnCalculator.ts

**Checkpoint**: The MVP tracer bullet is complete and stable against the most immediate execution failure mode.

---

### Phase 7: User Story 5 - Reject Invalid Tokens and Unsupported Operations (Priority: P2)

**Goal**: The calculator rejects malformed operands and unknown operators without altering stack state.

**Independent Test**: Run the token-validation unit and browser input coverage and verify malformed numeric literals and unsupported operator tokens are rejected, the stack remains unchanged, and the user sees a stable rejection signal.

- [ ] T015 [US5] Add token-validation unit coverage for malformed operands and unsupported operator tokens in tests/unit/core/parse-token.test.ts and implement token parsing and recognition in src/calculator/core/parseToken.ts
- [ ] T016 [US5] Add invalid-token integration and browser input coverage in tests/integration/app-flow.test.ts and tests/ui/token-input.test.tsx and implement invalid-token handling in src/app/hooks/useRpnCalculator.ts and src/ui/components/TokenInput.tsx

**Checkpoint**: User Story 5 completes lexical and operator-recognition hardening without changing accepted-token semantics.

---

### Phase 8: User Story 6 - Handle Arithmetic Domain Errors and Numeric Limits Correctly (Priority: P2)

**Goal**: The calculator detects invalid arithmetic operations and numeric-limit failures while preserving pre-error stack state.

**Independent Test**: Run the arithmetic-error unit and orchestration coverage and verify divide-by-zero, invalid unary-domain operations, and numeric overflow or out-of-range results are rejected without corrupting the stack.

- [ ] T017 [US6] Add arithmetic-domain and numeric-limit unit coverage in tests/unit/core/evaluate-errors.test.ts and implement arithmetic failure handling in src/calculator/core/evaluate.ts
- [ ] T018 [US6] Add arithmetic-error orchestration coverage in tests/integration/app-flow.test.ts and implement surfaced arithmetic failure state in src/app/hooks/useRpnCalculator.ts and src/ui/components/CalculatorStatusPanel.tsx

**Checkpoint**: User Story 6 completes correctness hardening for mathematical and numeric failure modes.

---

### Phase 9: User Story 7 - Reset Calculator (Priority: P3)

**Goal**: A user can clear all state and restart from a clean calculation session.

**Independent Test**: Run the reset integration and browser coverage and verify reset clears the stack, removes current error state, removes prior derived results, and restores ready input state.

- [ ] T019 [US7] Add reset integration coverage in tests/integration/reset-flow.test.ts and implement reset state restoration in src/app/hooks/useRpnCalculator.ts and src/calculator/core/state.ts
- [ ] T020 [US7] Add reset browser coverage in tests/ui/reset-flow.test.tsx and implement the reset control in src/ui/components/ResetButton.tsx and src/app/App.tsx

**Checkpoint**: User Story 7 is independently testable through reset behavior in the browser app.

---

### Phase 10: User Story 8 - Undo the Last Accepted Token (Priority: P3)

**Goal**: A user can revert the most recent accepted stack mutation and return to the immediately previous stable calculator state.

**Independent Test**: Run the undo integration and browser coverage and verify undo restores the prior stack after accepted operand pushes and accepted operator applications while leaving rejected-token history out of scope unless explicitly recorded.

- [ ] T021 [US8] Add undo integration coverage for accepted operand and operator transitions in tests/integration/undo-flow.test.ts and implement prior-state history tracking and undo semantics in src/app/hooks/useRpnCalculator.ts
- [ ] T022 [US8] Add undo browser coverage in tests/ui/undo-flow.test.tsx and implement the undo control in src/ui/components/UndoButton.tsx and src/app/App.tsx

**Checkpoint**: User Story 8 completes the requested convenience rollback behavior for accepted-token mutations.

---

### Phase 11: Documentation & Developer Experience

**Purpose**: Document the implemented calculator system and developer workflow after feature behavior is complete.

- [ ] T023 Update browser-only usage, setup, and test commands in README.md and specs/001-greenfield-proto/quickstart.md
- [ ] T024 Create implementation-focused developer workflow notes in DEVELOPMENT.md
- [ ] T025 Document the implemented architecture and separation of concerns in docs/architecture.md
- [ ] T026 Document the implemented token model, stack semantics, evaluation rules, and error invariants in docs/calculator-rules.md
- [ ] T027 Document the implemented testing strategy and failure-mode coverage in docs/testing.md
- [ ] T028 Append the implemented feature summary to .specify/memory/progress.md, including feature name, branch name, spec directory name, and a brief scope/functionality summary for project-evolution traceability
- [ ] T029 Review README.md, DEVELOPMENT.md, specs/001-greenfield-proto/quickstart.md, docs/ content, and .specify/memory/progress.md against the implemented code and test workflow to remove speculation and correct mismatches

