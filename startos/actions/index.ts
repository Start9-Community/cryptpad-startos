import { mainUrl, sandboxUrl } from '../primaryUrl'
import { sdk } from '../sdk'
import { addAdminKey } from './addAdminKey'
import { runDiagnostics } from './runDiagnostics'
import { showSetupTokenUrl } from './showSetupTokenUrl'

export const actions = sdk.Actions.of()
  .addAction(mainUrl.action)
  .addAction(sandboxUrl.action)
  .addAction(showSetupTokenUrl)
  .addAction(addAdminKey)
  .addAction(runDiagnostics)
