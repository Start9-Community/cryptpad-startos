import { i18n } from '../i18n'
import { mainUrl } from '../primaryUrl'
import { sdk } from '../sdk'

/**
 * Returns the URL to CryptPad's built-in /checkup/ self-test, prefixed
 * with the configured Main URL so the test fetches happen against the
 * correct origin (the checkup tests CSP/COEP/CORP headers, which are
 * sensitive to the request origin).
 */
export const runDiagnostics = sdk.Action.withoutInput(
  'run-diagnostics',

  async ({ effects }) => ({
    name: i18n('Run Diagnostics'),
    description: i18n(
      "Open the URL returned by this action in a browser to run CryptPad's built-in self-diagnostic tests. Use this to verify your install or troubleshoot. NOTE: four tests fail by design on a fresh instance and are not configuration errors — encrypted support tickets, terms of service, and privacy policy are optional settings you enable in /admin/, and HSTS is handled by StartOS at the TLS edge so CryptPad cannot set it. See the Instructions tab for details.",
    ),
    warning: null,
    allowedStatuses: 'only-running',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const url = await mainUrl.bestUsable(effects).once()

    // 'only-running' plus setupMain's own null check make this unreachable.
    if (!url) {
      throw new Error(
        i18n(
          'Main URL is not set; cannot construct diagnostics URL. Run the Set Main URL action and try again.',
        ),
      )
    }

    const base = url.replace(/\/$/, '')
    return {
      version: '1' as const,
      title: i18n('CryptPad Diagnostics'),
      message: i18n(
        "Open this URL in a browser to run CryptPad's diagnostic checkup.",
      ),
      result: {
        type: 'single' as const,
        value: `${base}/checkup/`,
        copyable: true,
        masked: false,
        qr: false,
        launchable: true,
      },
    }
  },
)
