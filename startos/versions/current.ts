import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const current = VersionInfo.of({
  version: '2026.5.1:1',
  releaseNotes: {
    en_US: `- Open UI opens CryptPad at its Main URL.
- After a restore, CryptPad keeps the hostnames you chose for its Main URL and Sandbox URL at their new ports, without asking you to choose again.
- Set Main URL and Set Sandbox URL preselect the .local address.
- The diagnostics and setup links open in a new tab with one click.`,
    es_ES: `- Abrir interfaz abre CryptPad en su URL principal.
- Tras una restauración, CryptPad conserva los nombres de host que elegiste para su URL principal y su URL del sandbox en sus nuevos puertos, sin pedirte que vuelvas a elegirlos.
- Establecer URL principal y Establecer URL del sandbox preseleccionan la dirección .local.
- Los enlaces de diagnóstico y de configuración se abren en una pestaña nueva con un solo clic.`,
    de_DE: `- „Oberfläche öffnen“ öffnet CryptPad unter seiner Haupt-URL.
- Nach einer Wiederherstellung behält CryptPad die Hostnamen, die du für Haupt-URL und Sandbox-URL gewählt hast, auf ihren neuen Ports bei, ohne dich erneut wählen zu lassen.
- „Haupt-URL festlegen“ und „Sandbox-URL festlegen“ wählen die .local-Adresse vor.
- Die Diagnose- und Einrichtungslinks öffnen sich mit einem Klick in einem neuen Tab.`,
    pl_PL: `- „Otwórz interfejs” otwiera CryptPad pod jego głównym URL.
- Po przywróceniu CryptPad zachowuje nazwy hostów wybrane dla głównego URL i URL sandboxa, na ich nowych portach, bez ponownego pytania o wybór.
- „Ustaw główny URL” i „Ustaw URL sandboxa” wstępnie zaznaczają adres .local.
- Linki diagnostyki i konfiguracji otwierają się w nowej karcie jednym kliknięciem.`,
    fr_FR: `- Ouvrir l'interface ouvre CryptPad sur son URL principale.
- Après une restauration, CryptPad conserve les noms d'hôte choisis pour son URL principale et son URL du bac à sable, sur leurs nouveaux ports, sans vous demander de les choisir à nouveau.
- Définir l'URL principale et Définir l'URL du bac à sable présélectionnent l'adresse .local.
- Les liens de diagnostic et de configuration s'ouvrent dans un nouvel onglet en un clic.`,
  },
  migrations: {
    up: async ({ effects }) => {
      await sdk.action.clearTask(
        effects,
        'main-url-not-set',
        'main-url-unavailable',
        'sandbox-url-not-set',
        'sandbox-url-unavailable',
      )
    },
    down: IMPOSSIBLE,
  },
})
