# TODO — CryptPad on StartOS

Live worklist. Remove items as they're finished; add items when work is deferred.

## Platform gaps raised upstream

None of these block this package; each is an issue or PR against `Start9Labs/start-technologies`.

- [ ] **Restore is far slower than a fresh install of the same package.** Measured on x86_64: a
      fresh install of the CryptPad `.s9pk` finishes in under a minute; restoring a near-empty
      backup of that same package took roughly forty, progressing steadily through an "unpacking"
      phase. The backup itself took seconds. Installing the identical image is fast, so the image
      is not the variable. Before filing, confirm it reproduces with a small non-CryptPad package,
      to establish whether the cost scales with image size, with file count, or is fixed overhead.

- [ ] **Interfaces carry no primary/preferred address.** An interface is reachable at every
      enabled gateway address and the launch button picks one by heuristic
      (`InterfaceService.launchableAddress`), so any service that pins a single origin — CryptPad
      via `httpUnsafeOrigin`, and to a lesser degree Ghost, Gitea and Synapse — can have the
      launcher send users somewhere the service rejects. Scope: whether this belongs as an
      optional field on `createInterface`, an effect the package calls when its URL setting
      changes, or a per-interface user preference on the Interfaces tab. Check whether the other
      `recipe-primary-url.md` packages want it before proposing.

- [ ] **StartOS emits no `Strict-Transport-Security`.** `add_security_headers`
      (`shared-libs/crates/start-core/src/net/static_server.rs`) sets only CSP and
      `X-Content-Type-Options`, on StartOS UI-origin responses. Because the OS terminates TLS and
      proxies plain HTTP to containers, no package can set HSTS — CryptPad's `/checkup/` test 54
      fails on every StartOS install. Adding it at the reverse proxy would fix it fleet-wide.
      Note the hazard: HSTS pins a hostname to HTTPS for its `max-age`, which can lock users out
      of a `.local` address whose certificate later changes, so a short max-age or an explicit
      opt-in is probably required.

- [ ] **Ask Start9 to add CryptPad to the 0.4.0 update guide's "Services with special
      handling" list**, alongside Ghost and Synapse, with export-then-reimport guidance. The
      retired 0.3.x package has no successor here — different volume layout, years of upstream
      data-format drift, and an empty `up` migration — and `canMigrateFrom` is derived from the
      version graph, so the platform will treat this as a valid upgrade regardless. Documented
      defensively in `README.md` and `instructions.md` in the meantime. **Unverified:** nobody has
      run 0.3.5.1 → 0.4.0 with CryptPad installed; don't assert a specific failure mode.
