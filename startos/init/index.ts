import { actions } from '../actions'
import { restoreInit } from '../backups'
import { dependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { sdk } from '../sdk'
import { versionGraph } from '../versions'
import { mainUrlTask, sandboxUrlTask } from './primaryUrlTasks'
import { seedFiles } from './seedFiles'
import { setup } from './setup'
import { writeLoginSalt } from './writeLoginSalt'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  seedFiles,
  setInterfaces,
  actions,
  mainUrlTask,
  sandboxUrlTask,
  dependencies,
  writeLoginSalt,
  setup,
)

export const uninit = sdk.setupUninit(versionGraph)
