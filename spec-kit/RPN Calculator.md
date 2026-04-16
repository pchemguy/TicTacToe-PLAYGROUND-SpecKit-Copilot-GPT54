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
| 7   | GF Proto 7 - US5 Reject Invalid Tokens and Unsupported Operations             |
| 8   | GF Proto 8 - US6 Handle Arithmetic Domain Errors and Numeric Limits Correctly |
| 9   | GF Proto 9 - US7 Reset Calculator                                             |
| 10  | GF Proto 10 - US8 Undo Last Accepted Token                                    |
| 11  | GF Proto 11 - Documentation & Developer Experience                            |