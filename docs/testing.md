# Testing And Validation

The implemented test suite is organized around the same boundaries as the code: pure core logic, pure strategy, orchestration, and browser UI behavior.

## Commands

```bash
npm test
npm run lint
npm run build
```

- `npm test` runs the full Vitest suite.
- `npm run lint` runs TypeScript no-emit validation.
- `npm run build` verifies the Vite production build.

## Test Layout

- `tests/unit/core/state.test.ts`: initial-state creation, immutable board helpers, and reset-oriented state primitives
- `tests/unit/core/rules.test.ts`: valid moves, rejected moves, all win lines, draw detection, final-cell win precedence, and terminal lockout
- `tests/unit/ai/select-computer-move.test.ts`: immediate wins, forced blocks, and deterministic lowest-index tie-breaking
- `tests/unit/ai/minimax-validation.test.ts`: representative terminal scores plus exhaustive non-loss validation
- `tests/integration/app-flow.test.ts`: exposed state shape, automatic computer response flow, invalid input handling, and terminal orchestration behavior
- `tests/integration/restart-flow.test.ts`: restart from both in-progress and finished games
- `tests/ui/playable-game.test.tsx`: browser click flow, restart control, and rendered current-player or terminal status messaging

## Why The Test Layers Matter

- Unit tests keep core rules and AI deterministic without involving React rendering.
- Integration tests verify that the hook composes the pure layers correctly and exposes stable state to consumers.
- UI tests verify that the browser shell renders the resolved state and wires input correctly.

## Optimality Validation

The computer strategy is backed by minimax scoring in `src/game/ai/minimax.ts` and validated in two ways:

1. Scenario tests check tactical behavior such as taking an immediate win, blocking an immediate loss, and choosing the lowest legal index when multiple moves score equally.
2. The non-loss validation test recursively enumerates every valid human move sequence from a new game. After each human move, it applies the implemented computer selector and asserts that play never reaches a terminal state where the human wins.

This second check is the strongest proof in the current repository that the implemented computer strategy does not lose under valid human play.

## When To Add Or Update Tests

- Update `tests/unit/core` when the state model or rule semantics change.
- Update `tests/unit/ai` when computer move selection or scoring changes.
- Update `tests/integration` when the hook changes its turn resolution or exposed state behavior.
- Update `tests/ui` when rendered copy, click behavior, or browser-facing interaction changes.

## Documentation Validation

The documentation in this repository should stay aligned with the same command set and file layout described above. The final documentation review task verifies that these docs match the shipped browser-only implementation and do not claim unimplemented platform or persistence behavior.