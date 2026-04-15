---
url: https://chatgpt.com/g/g-p-69de610325f08191aaf60c2de8f32282-tic-tac-toe-spec-kit-copilot/c/69de6109-3f34-838e-98fa-86c7f2d44c76
---

# Spec Kit Dev Highlights

This project has a well developed phased decomposition of the target feature development. See

- [spec](spec.md)
- [plan](specs/001-add-tictactoe-ai/plan.md)
- [research](research.md)
- [tasks](specs/001-add-tictactoe-ai/tasks.md)
- [task-to-issue](task-to-issue.md)

## Constitution

Consider introducing constitution examples into Spec Kit project and using [constitution](.specify/memory/constitution.md) as an example (*Obsidian.md will not open this link in a dotted directory*).

## Task to Issue Mapping

- Use [task-to-issue](task-to-issue.md) as the basis for creating `speckit.taskstoissues` template for saving the mapping
- Integrate [taskstoissues](taskstoissues.md) into `speckit.taskstoissues`.
- IMPORTANT: Remove the `tools:` YAML key from `speckit.taskstoissues`. This key, if present, is a white list, and disables all tools not explicitly named. As result, GitHub interaction get crippled, as well as the ability to create on-disk files.

## Implement

- Integrate [implement](implement.md) (with conditionals on available labels/milestones/mapping, which must be created by patched `speckit.taskstoissues`) into `speckit.implement`. Note: missing instructions to close completed milestones.

