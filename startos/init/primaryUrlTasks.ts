import { i18n } from '../i18n'
import { mainUrl, sandboxUrl } from '../primaryUrl'

export const mainUrlTask = mainUrl.setupTask('critical', {
  reason: i18n('Choose the primary domain for the CryptPad UI.'),
})

export const sandboxUrlTask = sandboxUrl.setupTask('critical', {
  reason: i18n(
    "Choose the sandbox domain for CryptPad's document iframe isolation.",
  ),
})
