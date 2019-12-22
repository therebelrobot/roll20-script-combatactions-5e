import { debugLog } from '../../lib/util/debuglog';
import { convertArgs } from '../../lib/util/convertArgs';
import { meta } from '../../meta';
import { getCharAttr } from '../../lib/util/GetCharAttr';
import { renderTemplate } from '../../helpers/renderTemplate';

const move = (args, target) => {
  debugLog(`move ${target.get('name')}`)
  const characterId = target.get('id')
  const speed = getCharAttr(characterId, 'speed')
  debugLog(`speed: ${speed} ft.`)

  if(!state.combatActions.movementRemainingThisTurn[characterId]) {
    state.combatActions.movementRemainingThisTurn[characterId] = speed
  }

  const remainingMovement = state.combatActions.movementRemainingThisTurn[characterId]
  const movementMade = Number(args['--distance'])
  renderTemplate.movement.move(remainingMovement)

  if (!movementMade || movementMade < 0) {
    return
  }

  const newRemainingMovement = Number(remainingMovement)-Number(movementMade);

  if (newRemainingMovement < 0) {
    sendChat(`Movement`, `You cannot move ${movementMade} ft. You only have ${remainingMovement} ft. remaining this turn.`)
    return
  }

  state.combatActions.movementRemainingThisTurn[characterId] = newRemainingMovement;
  sendChat('Movement', `You moved ${movementMade} ft. You have ${newRemainingMovement} ft. remaining.`)
}
const climb = (args, target) => {
  debugLog('climb')
}
const swim = (args, target) => {
  debugLog('swim')
}
const dropProne = (args, target) => {
  debugLog('dropProne')
}
const crawl = (args, target) => {
  debugLog('crawl')
}
const standUp = (args, target) => {
  debugLog('standUp')
}
const highJump = (args, target) => {
  debugLog('highJump')
}
const longJump = (args, target) => {
  debugLog('longJump')
}
const moveWhileGrappled = (args, target) => {
  debugLog('moveWhileGrappled')
}
const improvise = (args, target) => {
  debugLog('improvise')
}

export const movementHandler = (args, error) => {
  debugLog('movementHandler handler was called! <');

  args = convertArgs(args)

  if (!args['--target']) {
    sendChat(`${meta.command} Error:`, 'You must select a target for combat actions')
    return;
  }
  const targetToken = findObjs({ type: 'graphic', id: args['--target'] })[0]
  debugLog(args['--target'])
  if (!targetToken) return
  // debugLog(Object.keys(targetToken).join())
  const representsId = targetToken.get('represents')
  // debugLog(representsId)
  const target = findObjs({ type: 'character', id: representsId })[0]
  if (!target) return

  switch(args['--type']) {
    case 'move':
      move(args, target);
      break;
    case 'climb':
      climb(args, target);
      break;
    case 'swim':
      swim(args, target);
      break;
    case 'dropProne':
      dropProne(args, target);
      break;
    case 'crawl':
      crawl(args, target);
      break;
    case 'standUp':
      standUp(args, target);
      break;
    case 'highJump':
      highJump(args, target);
      break;
    case 'longJump':
      longJump(args, target);
      break;
    case 'moveWhileGrappled':
      moveWhileGrappled(args, target);
      break;
    case 'improvise':
      improvise(args, target);
      break;
  }
};
