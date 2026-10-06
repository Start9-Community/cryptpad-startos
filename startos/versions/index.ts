import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_2026_5_1_0 } from './v2026.5.1_0'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_2026_5_1_0],
})
