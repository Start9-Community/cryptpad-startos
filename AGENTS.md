# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **The two origins are CryptPad's security model, not a StartOS quirk.** `httpUnsafeOrigin` and `httpSafeOrigin` must differ or the browser stops isolating the document iframe, so `main.ts` refuses to start on matching origins and both setter actions reject one at submit time. Don't collapse the two interfaces to one, and don't relax the guard to a hostname comparison — a different port is a different origin, and that is what StartOS produces on a LAN with no domain.
- **`config.js` is generated into the subcontainer rootfs, never onto the volume.** The upstream entrypoint's `[ ! -f "$CPAD_CONF" ]` guard is what lets our pre-written file win; if that guard ever disappears upstream the entrypoint will regenerate the config and silently take back control. `UPDATING.md` lists it first among the claims to re-verify on a bump.
- **`writeLoginSalt`'s file-existence guard is what makes restore safe.** Restore replays init as `kind === 'install'`; without the guard every restore would mint a new `loginSalt` and invalidate every existing user's password. Never make that write unconditional.
- **Everything CryptPad reads must be owned by UID/GID 4001.** The service runtime is root, so anything package code creates needs an explicit `chown` — see the `VOLUME_SUBDIRS` / `VOLUME_FILES` passes in `main.ts`.
- **The decree log is read through a `FileHelper`, and that is load-bearing.** A bare `readFile` is invisible to `setupOnInit` reactivity, so the setup-token task never appeared once the daemon created the file. Don't "simplify" `fileModels/decreeLog.ts` back to `node:fs`.
- **`setup.ts` deliberately excludes `wizardCompletedNotified` from its `.const()` selector.** Selecting a field the same handler writes trips the SDK's `Canceled: write after const` guard; it is read with `.once()` instead.
- **`startos/setupState.ts` is import-free on purpose** so `test/setupState.test.ts` runs under plain `node --test` with no SDK, no framework, and no devDependency. Tests live in `test/`, outside the SDK's `startos/`-only type-check and lint globs.
- **No reverse proxy in the image.** CryptPad's Node server already emits the CSP/COEP/CORP headers `/checkup/` tests; a second set from an in-container proxy breaks them, and StartOS terminates TLS anyway.
- **`/checkup/` reports 51 of 55 on a correctly configured instance.** Tests 14, 34 and 36 are optional `/admin/` content; test 54 (HSTS) cannot be satisfied by any StartOS package. Don't chase them.
- **The image build needs network access to GitHub.** `install-onlyoffice.sh` clones `cryptpad/onlyoffice-builds` and pulls release archives from `cryptpad/onlyoffice-editor` and `cryptpad/onlyoffice-x2t-wasm`, adding roughly 210 MB on top of upstream's image. Offline builds do not work.
- **`make arm` needs a `qemu-aarch64` binfmt handler**, or it dies at `exec /bin/sh: exec format error` before any package code runs. `docker run --privileged --rm tonistiigi/binfmt --install arm64` registers one; otherwise let CI's native arm runner be the check.
- **Default branch is `master`.** Its CI workflows reference `master`; leave them.

## Inspecting a running install

`start-cli package attach cryptpad -n cryptpad-sub -- <cmd>` — the package runs one subcontainer, named `cryptpad-sub`.
