import { showSetupTokenUrl } from '../actions/showSetupTokenUrl'
import { decreeLog } from '../fileModels/decreeLog'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { parseSetupState } from '../setupState'

/**
 * Raises the 'important' setup-token task while the decree log holds an
 * install token and no admin key, and posts the setup-complete notification
 * once. 'important', not 'critical': a critical task here blocked startup
 * with nothing left to clear it.
 */
export const setup = sdk.setupOnInit(async (effects) => {
  // Reactive, and load-bearing: this is what re-runs the watcher when the
  // daemon first creates the decree log. See fileModels/decreeLog.ts.
  const state = parseSetupState(await decreeLog.read((s) => s).const(effects))

  if (state.kind === 'pending') {
    await sdk.action.createOwnTask(effects, showSetupTokenUrl, 'important', {
      replayId: 'setup-token-pending',
      reason: i18n(
        'Open this URL once and complete the wizard to create your CryptPad administrator account.',
      ),
    })
  } else {
    await sdk.action.clearTask(effects, 'setup-token-pending')
  }

  // The latch is read with `.once()`: a `.const()` read of the field this
  // handler writes cancels the write ("Canceled: write after const").
  const alreadyNotified = await storeJson
    .read((s) => s.wizardCompletedNotified)
    .once()
  if (state.kind === 'done' && !alreadyNotified) {
    await sdk.notification.create(effects, {
      level: 'success',
      title: i18n('CryptPad setup complete'),
      message: i18n(
        'Your administrator account is active. Open the /admin/ panel inside CryptPad for further configuration.',
      ),
    })
    await storeJson.merge(effects, { wizardCompletedNotified: true })
  }
})
