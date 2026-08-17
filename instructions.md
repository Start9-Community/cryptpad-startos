# CryptPad

> [!IMPORTANT]
> **CryptPad needs two addresses, not one** — a *main* address for the app and a separate *sandbox* address for the document iframe. The browser uses the difference between them to isolate document rendering, so CryptPad will not start until you have set both.
>
> On a local network there is nothing to arrange: your server gives the two addresses different ports on the same hostname, and a different port is already a different address as far as the browser is concerned. If you are serving CryptPad over a domain, plan for two hostnames — see [Getting set up](#getting-set-up).

> [!WARNING]
> **Already had CryptPad before you updated your server? It's still there, as CryptPad (Legacy).** This is a separate, much newer service, and nothing moves across on its own — so your old one is kept alongside it rather than replaced, and both keep working.
>
> To bring your documents over: open **CryptPad (Legacy)**, sign in, and export your drive. Then finish setting this one up and import your pads back in. Uninstall CryptPad (Legacy) once you're happy everything arrived — uninstalling deletes its data.

## Documentation

- [CryptPad Admin Guide](https://docs.cryptpad.org/en/admin_guide/index.html) — the upstream guide for instance configuration, the `/admin/` panel, and ongoing operation.
- [CryptPad user documentation](https://docs.cryptpad.org/en/user_guide/index.html) — how to use the applications themselves: pads, sheets, forms, drive and sharing.

## What you get on StartOS

- A privacy-first collaboration suite — documents, spreadsheets, presentations, whiteboards, kanban boards, code editor, forms — all encrypted in your browser before touching the server.
- The OnlyOffice editors (Document, Sheet, Presentation) are built into the package, so they open immediately. Installed any other way, CryptPad downloads them the first time you open an office document and you wait ten to fifteen minutes.
- Everything persistent — pads, uploads, your account data and your instance's login salt — is on one volume and is included in your server's backups.

## Getting set up

**Do this first: trust your server's Root CA on every device and browser you will use CryptPad from.** Download it from your server under *System → Root CA* and install it in your operating system or browser trust store.

This matters more for CryptPad than for other services. Your server issues its own certificates for `.local`, IP and Tor addresses, and a browser that has not been told to trust them shows a warning. For an ordinary service you click *"Accept the risk and continue"* once and move on — but **CryptPad loads its sandbox in an iframe, and browsers never offer that option for content inside an iframe.** There is no "proceed anyway" button. Documents silently fail to render, or you get a certificate error naming a port you never typed, with no way to dismiss it.

If you would rather not install the Root CA yet, there is a stopgap: open the service's **Interfaces** tab, find **Sandbox Origin**, and **click** one of its addresses to open it as an ordinary page. Accept the warning there, then go back to your main address. Click the address rather than typing it — a bare `my-server.local:55491` in the address bar is not a URL, and the browser will offer to hand it to another application instead of loading it. You have to repeat this whenever the sandbox address changes, which includes after every restore. Trusting the Root CA is the fix that keeps working.

Two **Set URL** tasks appear the moment the install completes. Both must be done before CryptPad will run.

1. **Run the *Set Main URL* action.** Pick the address people will open in their browser. This is the primary CryptPad address.
2. **Run the *Set Sandbox URL* action.** The sandbox must be a *different address* from the main one. What that takes depends on how you reach CryptPad:

   - **Local access, no domain.** Nothing to arrange. Your server gives the two a different port on the same hostname — say `https://my-server.local:65223` for main and `https://my-server.local:55041` for sandbox — and a different port is enough for the browser to isolate the sandbox. Pick the sandbox entry for the same hostname you used for main.
   - **Access over a domain.** Use a **different hostname**, normally a subdomain — `cryptpad.example.com` for main and `cryptpad-sandbox.example.com` for sandbox. This is not about isolation, which the ports already give you: restrictive networks often block traffic on unusual ports, so an instance reached over the internet should use two real hostnames on standard ports.
3. **Start CryptPad.** Clearing the two tasks unblocks the service but does not start it — press **Start** yourself. Give it about half a minute to come up.
4. **Run the *Complete CryptPad Initial Setup* task.** It appears once CryptPad is running, and hands you a single-use URL. Open it to run CryptPad's own setup wizard: create your first administrator account, name and brand the instance, choose which applications to offer, and decide whether to leave registration open. The task clears itself when the wizard finishes.

## Using CryptPad

### Web interface

Your main address opens straight into CryptPad — anonymous visitors land on the welcome page, signed-in users land in their drive.

The sandbox address is internal machinery, loaded automatically by the main interface. It is not somewhere you visit, and it does not get an **Open** button on the service page. It is still listed on the **Interfaces** tab with clickable addresses, like every interface — opening one just gives you a broken-looking page.

Instance configuration — name, branding, registration, maximum upload size, which applications are available, the support help-desk, the public directory, 2FA requirements — lives in CryptPad's own `/admin/` panel, reachable from the user menu once you sign in as an administrator.

### CryptPad only answers on your main address

Most services answer at every address your server exposes. **CryptPad does not.** It serves only the address you chose as the main one and refuses every other with:

> This page can only be accessed via `https://<your-main-url>`

The page usually stops at *Loading…* rather than redirecting, so it can look like a hang. It isn't — you are at the wrong address.

> [!WARNING]
> **A login attempt from the wrong address fails as "invalid username or password".** This is the most confusing symptom of being in the wrong place, because it looks like your account is broken. It isn't, and your password has not changed — CryptPad derives login keys differently when the page has not fully initialised for your instance. Go to your main address and log in there; the same credentials will work.

One thing to act on: **the launch button on the service page may not open your main address.** Your server picks from the addresses you have enabled and does not know which one CryptPad accepts. If clicking it lands you on the error above, either bookmark your main address and use that, or go to the **Interfaces** tab and disable the addresses you are not using, leaving only the one you chose.

Tabs you already have open are unaffected until you reload them — an established session keeps working, reconnects, and saves normally. The same is true if you change the main address later.

### Actions

- **Set Main URL** — change the primary CryptPad address at any time. CryptPad restarts to pick up the new one.
- **Set Sandbox URL** — change the sandbox address. It has to stay different from the main one; a different port on the same hostname counts.
- **Add Administrator by Public Key** — manage the administrator list CryptPad reads from its config file. Each row takes either a bare public signing key (CryptPad → Settings → Account → Public Signing Key) or the full `[user@host/key=]` profile link. The list is the new state in full — to remove an administrator, delete its row and submit.

  > **CryptPad keeps two separate administrator lists, and this action manages one of them.** Expect it to be **empty on a new install even though you already have an administrator** — that is not a bug.
  >
  > | Administrator created by                 | Shown in this action? | Removable in `/admin/`?                          |
  > | ---------------------------------------- | --------------------- | ------------------------------------------------ |
  > | Setup wizard, or promoted inside CryptPad | No                    | Yes                                              |
  > | This action                              | Yes                   | No — delete the row here and submit instead      |
  >
  > Use it to get administrator access back if you missed the setup URL, or to add and remove administrators from outside the running app.
  >
  > **Keys are checked for shape, not for existence.** A key of the right shape is accepted even if no such account exists, so a typo produces an administrator nobody can use — copy and paste rather than typing. CryptPad itself works the same way: because it is end-to-end encrypted, the server has no list of accounts to check against. Granting admin means "whoever holds the private half of this key".
  >
  > **If you add a key that is already an administrator** — the account the setup wizard created, say — its **Remove** button disappears from `/admin/`, because the config-file entry takes precedence. Nothing is lost: delete the key from this action's list and submit, and after the restart it goes back to being removable.
- **Run Diagnostics** — hands you the URL of CryptPad's built-in `/checkup/` self-test. A correctly set-up instance passes 51 of 55; the four that fail are expected, not configuration errors:
  - **Encrypted support tickets not enabled** (test 14) — optional; turn it on in `/admin/` → Support.
  - **No terms of service** (test 34) and **no privacy policy** (test 36) — optional instance content; add them in `/admin/` if other people register on your instance.
  - **HSTS not required** (test 54) — your server handles certificates for every service centrally, so this is not something CryptPad can set. It affects neither functionality nor the encryption of your data.

  The checkup will also note that `application_config.js` has been customized. That is expected — it is where your instance's login salt is kept.

## Restoring from a backup

Two things to expect, both normal.

**Restoring takes a long time** — tens of minutes even for a small instance, and far longer than the backup took. The progress bar advances slowly but steadily. As long as the percentage is climbing it has not stalled; let it finish.

**You will be asked to set both addresses again.** Your service is assigned new ports when it is reinstalled, so the ones saved before the backup no longer exist. Both *Set Main URL* and *Set Sandbox URL* come back, noting that your previous choice is no longer available. Pick the entries for the same hostnames you used before — the new ports are filled in for you — then start the service.

Nothing else changes: accounts, documents, uploads, administrators and branding all come back, and your existing passwords still work.

## Limitations

- **No email.** CryptPad has no email support in any current release, so there is nothing to configure and no SMTP settings to fill in. Account recovery and the support help-desk both run through CryptPad's own end-to-end encrypted messaging instead.
