# Development Workflow

This repository currently ships a browser-only React and TypeScript Tic Tac Toe app. The implementation is intentionally split so game rules, AI, orchestration, and rendering can evolve independently and stay testable outside the browser UI.

## Local Commands

Install dependencies once:

```bash
npm install
```

Run the browser app:

```bash
npm run dev:web
```

Run validation commands:

```bash
npm test
npm run lint
npm run build
```

## Source Layout

- `src/game/core`: domain types, immutable board helpers, move validation, win detection, draw detection, and terminal-state semantics
- `src/game/ai`: deterministic computer move selection and minimax scoring
- `src/app`: React composition and the orchestration hook that resolves a full human turn plus the automatic computer response
- `src/ui`: render-focused board, cell, status, and restart components plus browser styling
- `tests/unit`: pure engine and AI coverage
- `tests/integration`: hook-level orchestration and restart coverage
- `tests/ui`: browser interaction and rendered status coverage

## Boundary Rules

- Keep game rules in `src/game/core`. Do not move win detection, move validation, or terminal-state handling into React components.
- Keep strategy logic in `src/game/ai`. The UI must not choose computer moves directly.
- Keep the full turn loop in `src/app/hooks/useTicTacToeGame.ts`. The hook accepts human input, applies rules, and triggers the computer response when the game remains ongoing.
- Keep UI components render-focused. `src/ui/components` should consume state and callbacks, not implement domain decisions.
- Preserve the current browser-first scope. Do not add Electron, persistence, or networking guidance to this workflow document unless those capabilities are actually implemented.

## Typical Change Flow

1. Update or add the smallest relevant test first.
2. Implement the matching code change in the appropriate layer.
3. Expand coverage outward only when behavior crosses layers.
4. Run `npm test` for behavior validation.
5. Run `npm run lint` before commit to keep the TypeScript surface clean.
6. Run `npm run build` before closing work that changes the browser app or its documented workflow.

## Choosing The Right Test Layer

- Use `tests/unit/core` for board state, move validation, terminal-state rules, and immutable helper behavior.
- Use `tests/unit/ai` for move selection and minimax scoring guarantees.
- Use `tests/integration` for hook behavior such as automatic computer turns, invalid input handling, and restart flow.
- Use `tests/ui` when the rendered browser experience changes, including click behavior or visible status copy.

## Extending The Game Safely

- Add new rule semantics in the pure core first, then update the orchestration hook, then adjust the UI only if presentation needs to change.
- If computer behavior changes, update the AI tests and any proof-style validation before adjusting the UI.
- Keep state shape changes deliberate. The current integration suite checks that the exposed `GameState` keys and player assignments remain stable.
- Favor deterministic behavior. The current implementation relies on stable move ordering and repeatable results for both tests and gameplay.

## Current Limitations

- Only a single local browser session is supported.
- The human player is fixed as `X` and the computer is fixed as `O`.
- Restart resets to the original empty state; no history or persistence is stored.
- Future desktop or persistence work should be introduced in separate implementation stages, not folded into the current browser workflow.