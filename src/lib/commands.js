
// Help
import { commandMetas } from '../commands/commandMetas'
import { commandHandlers } from '../commands/commandHandlers'
import { debugLog } from './util/debuglog'

const commandObj = {}

for (const metaName of Object.keys(commandMetas)) {
  commandObj[commandMetas[metaName].command] = {
    ...commandMetas[metaName],
    handler: commandHandlers[metaName],
  }
}
debugLog(`commands: ${Object.keys(commandObj).join()}`)
export const commands = commandObj;