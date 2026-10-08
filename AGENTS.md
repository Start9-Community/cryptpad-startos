# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes. This file restates neither:
whoever changes the package has both, so it carries only what they don't — repo mechanics,
a change that looks right and is not, where the next thing gets added, a naming trap, a
build or test invocation particular to this repo.

**Fix a defect you spot rather than reporting it** — you have the package open and the
context to be sure. File **a GitHub issue on this repo** only when the call isn't yours to
make: you can't pin the cause down, two defensible fixes exist, or it's too large to ride on
the work in hand. An open issue is a report, not a queue — implement one when you're asked
to or when it's labelled `Approved`, then close it with `Closes #<n>`.

Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **Keep `httpUnsafeOrigin` and `httpSafeOrigin` different.** The browser isolates the document iframe only across origins, so `main.ts` refuses matching origins and both URL actions reject one at submit time. Don't collapse the two interfaces to one, and don't relax the guard to a hostname comparison — a different port is a different origin, and that is what StartOS produces on a LAN with no domain.
- **Never make `writeLoginSalt`'s write unconditional.** Restore replays init as `kind === 'install'`; without the file-existence guard every restore mints a new `loginSalt` and invalidates every existing user's password.
- **Keep `2026.5.1:0` in `versions/index.ts`'s `other[]` with `up: IMPOSSIBLE`, as the lowest declared version, and never give it an `up`.** The retired 0.3.x package shares this id and sorts below it; the graph anchors a version's inbound range at its predecessor, so this node is what keeps StartOS from offering this package as that one's update. Revisit only with a written and tested 5.2.1 migration.
- **Don't read the decree log with `node:fs`.** It goes through `fileModels/decreeLog.ts` so `.const()` re-runs `init/setup.ts` when the daemon first creates the file; a bare `readFile` leaves the setup-token task never appearing.
- **`startos/setupState.ts` stays import-free** so `test/setupState.test.ts` runs under plain `node --test`. The `Makefile` runs `npm test` as part of `make javascript/index.js`; tests live in `test/`, outside the SDK's `startos/`-only type-check and lint.
