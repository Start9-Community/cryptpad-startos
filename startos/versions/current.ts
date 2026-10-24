import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.10.0:0',
  releaseNotes: {
    en_US: `Updated CryptPad to 2026.10.0.

- CryptPad runs on its new, faster server, and the Document, Sheet and Presentation editors are now based on Euro-Office 9.3.
- Two-factor authentication settings, login sessions, invitations and an uploaded instance logo are kept across restarts.
- Stops trusting certificates from a compromised certificate authority (eMudhra).

[Full upstream release notes](https://github.com/cryptpad/cryptpad/releases/tag/2026.10.0)`,
    es_ES: `Actualiza CryptPad a 2026.10.0.

- CryptPad funciona con su nuevo servidor, más rápido, y los editores de Documento, Hoja de cálculo y Presentación ahora se basan en Euro-Office 9.3.
- La configuración de autenticación en dos pasos, las sesiones iniciadas, las invitaciones y el logotipo subido para la instancia se conservan entre reinicios.
- Deja de confiar en los certificados de una autoridad de certificación comprometida (eMudhra).

[Notas completas de la versión original](https://github.com/cryptpad/cryptpad/releases/tag/2026.10.0)`,
    de_DE: `Aktualisiert CryptPad auf 2026.10.0.

- CryptPad läuft auf seinem neuen, schnelleren Server, und die Editoren für Dokumente, Tabellen und Präsentationen basieren jetzt auf Euro-Office 9.3.
- Einstellungen der Zwei-Faktor-Authentifizierung, Anmeldesitzungen, Einladungen und ein hochgeladenes Instanz-Logo bleiben über Neustarts hinweg erhalten.
- Vertraut Zertifikaten einer kompromittierten Zertifizierungsstelle (eMudhra) nicht mehr.

[Vollständige Upstream-Versionshinweise](https://github.com/cryptpad/cryptpad/releases/tag/2026.10.0)`,
    pl_PL: `Aktualizuje CryptPad do wersji 2026.10.0.

- CryptPad działa na nowym, szybszym serwerze, a edytory dokumentów, arkuszy i prezentacji są teraz oparte na Euro-Office 9.3.
- Ustawienia uwierzytelniania dwuskładnikowego, sesje logowania, zaproszenia i przesłane logo instancji są zachowywane po ponownym uruchomieniu.
- Przestaje ufać certyfikatom przejętego urzędu certyfikacji (eMudhra).

[Pełne informacje o wydaniu upstream](https://github.com/cryptpad/cryptpad/releases/tag/2026.10.0)`,
    fr_FR: `Met à jour CryptPad vers 2026.10.0.

- CryptPad fonctionne sur son nouveau serveur, plus rapide, et les éditeurs de documents, tableurs et présentations reposent désormais sur Euro-Office 9.3.
- Les réglages de l'authentification à deux facteurs, les sessions de connexion, les invitations et le logo téléversé pour l'instance sont conservés entre les redémarrages.
- Ne fait plus confiance aux certificats d'une autorité de certification compromise (eMudhra).

[Notes de version complètes en amont](https://github.com/cryptpad/cryptpad/releases/tag/2026.10.0)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
