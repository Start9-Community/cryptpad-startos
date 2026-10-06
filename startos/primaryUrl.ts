import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'

const refuseSameOrigin = (url: string, other: string | null | undefined) => {
  if (other && new URL(url).origin === new URL(other).origin) {
    throw new Error(
      i18n(
        'Main URL and Sandbox URL must be different origins so the browser can enforce sandbox isolation. Two addresses differ if either the hostname or the port differs. Pick a different one.',
      ),
    )
  }
}

export const mainUrl = sdk.setupPrimaryUrl({
  id: 'set-main-url',
  hostId: 'ui-multi',
  interfaceId: 'ui',
  metadata: {
    name: i18n('Set Main URL'),
    description: i18n(
      'Choose the URL CryptPad serves its app on: the address users open in their browser, and the one Open UI opens. CryptPad answers only on this address and restarts to apply a change. It will not start until one is chosen, and stops if the chosen hostname is no longer one of its addresses. If only the port changes, as after a restore, CryptPad follows it.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },
  field: { name: i18n('URL'), description: null },
  get: storeJson.read((s) => s.mainUrl),
  set: async (effects, url) => {
    refuseSameOrigin(url, await sandboxUrl.bestUsable(effects).once())
    await storeJson.merge(effects, { mainUrl: url })
  },
})

export const sandboxUrl = sdk.setupPrimaryUrl({
  id: 'set-sandbox-url',
  hostId: 'sandbox-multi',
  interfaceId: 'sandbox',
  metadata: {
    name: i18n('Set Sandbox URL'),
    description: i18n(
      'Choose which URL CryptPad should use as its sandbox iframe origin. It must be a different ORIGIN from the Main URL. A different port on the same hostname is enough — StartOS assigns the two interfaces different ports automatically — or use a different hostname if you are serving CryptPad over a domain. The browser relies on that difference to isolate document rendering.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },
  field: { name: i18n('URL'), description: null },
  get: storeJson.read((s) => s.sandboxUrl),
  set: async (effects, url) => {
    refuseSameOrigin(url, await mainUrl.bestUsable(effects).once())
    await storeJson.merge(effects, { sandboxUrl: url })
  },
})
