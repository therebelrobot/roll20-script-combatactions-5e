import { debugLog } from '../../lib/util/debuglog';
import { convertArgs } from '../../lib/util/convertArgs';
import { meta } from '../../meta';
import { renderTemplate } from '../../helpers/renderTemplate';

const genericMove = (target, distance, speedMultiplier = 1, templateName = 'move', mod = 0) => {
  debugLog(`generic move ${target.get('name')}`)
  const characterId = target.get('id')
  const speed = getAttrByName(characterId, 'speed')
  debugLog(`speed: ${speed} ft.`)

  if(!state.combatActions.movementRemainingThisTurn[characterId]) {
    state.combatActions.movementRemainingThisTurn[characterId] = speed
  }

  const remainingMovement = state.combatActions.movementRemainingThisTurn[characterId]
  const movementMade = Number(distance)
  renderTemplate.movement.move(remainingMovement)

  if (templateName !== 'dropProne' && (!movementMade || movementMade < 0)) {
    return
  }
  const isDifficultTerrain = state.combatActions.difficultTerrain
  const movementWithRatio = speedMultiplier ? ((Number(movementMade) + mod) / speedMultiplier) : 0 // 30
  const newRemainingMovement = Number(remainingMovement)-(movementWithRatio + (isDifficultTerrain ? movementWithRatio : 0));

  if (newRemainingMovement < 0) {
    sendChat('Movement', renderTemplate.movement[templateName](remainingMovement, movementMade, false, mod))
    return false
  }
  state.combatActions.movementRemainingThisTurn[characterId] = newRemainingMovement;
  sendChat('Movement', renderTemplate.movement[templateName](newRemainingMovement, movementMade, true, mod))
  return true
}

const move = (args, target) => {
  genericMove(target, args['--distance'], 1, 'move')
}
const climb = (args, target) => {
  const successful = genericMove(target, args['--distance'], 0.5, 'climb')
  if (!successful) return;
  const character = target.get('name')
  sendChat(character, `/gmroll d20+@{selected|strength_mod}`)
}
const swim = (args, target) => {
  debugLog('swim')
  const successful = genericMove(target, args['--distance'], 0.5, 'swim')
  if (!successful) return;
  const character = target.get('name')
  sendChat(character, `/gmroll d20+@{selected|strength_mod}`)
}
const dropProne = (args, target) => {
  debugLog('dropProne')
  const successful = genericMove(target, 0, 0, 'dropProne')
}
const crawl = (args, target) => {
  debugLog('crawl')
  const successful = genericMove(target, args['--distance'], 0.5, 'crawl')
}
const standUp = (args, target) => {
  const characterId = target.get('id')
  const speed = getAttrByName(characterId, 'speed')

  const successful = genericMove(target, speed/2, 1, 'standUp')
}
const highJump = (args, target) => {
  const characterId = target.get('id')
  const strength_mod = getAttrByName(characterId, 'strength_mod')
  const mod = args['--standing'] ? 2 : 1;
  const successful = genericMove(target, ((3 + Number(strength_mod))/mod), 0.5, 'highJump', args['--standing'] ? 0 : 10)
  if (!successful) return;
  const character = target.get('name')
  sendChat(character, `/gmroll d20+@{selected|strength_mod}`)
}
const longJump = (args, target) => {
  const characterId = target.get('id')
  const strength = getAttrByName(characterId, 'strength')
  const mod = args['--standing'] ? 2 : 1;
  const successful = genericMove(target, (Number(strength)/mod), 0.5, 'highJump', args['--standing'] ? 0 : 10)
  if (!successful) return;
  const character = target.get('name')
  sendChat(character, `/gmroll d20+@{selected|strength_mod}>10`)
  if (state.combatActions.difficultTerrain) {
    sendChat(character, `/gmroll d20+@{selected|dexterity_mod}>10`)
  }
}
const moveWhileGrappling = (args, target) => {
  debugLog('moveWhileGrappling')
  const successful = genericMove(target, args['--distance'], 0.5, 'moveWhileGrappling')
}
const improvise = (args, target) => {
  debugLog('improvise')
  const characterId = target.get('id')
  const speed = getAttrByName(characterId, 'speed')
  debugLog(`speed: ${speed} ft.`)

  if(!state.combatActions.movementRemainingThisTurn[characterId]) {
    state.combatActions.movementRemainingThisTurn[characterId] = speed
  }
  const remainingMovement = state.combatActions.movementRemainingThisTurn[characterId]
  sendChat('Movement', renderTemplate.movement.improvise(remainingMovement))
}

export const movementHandler = (args, error) => {
  debugLog('movementHandler handler was called! <');

  args = convertArgs(args)

  debugLog(JSON.stringify(args))
  debugLog(JSON.stringify(state.combatActions))
  if(args.hasOwnProperty('--enableDifficultTerrain')) {
    debugLog('enable')
    state.combatActions.difficultTerrain = true
    sendChat('Movement:', 'Difficult terrain enabled (speed is halved)')
    debugLog(JSON.stringify(state.combatActions))
    return
  }

  if(args.hasOwnProperty('--disableDifficultTerrain')) {
    debugLog('disable')
    state.combatActions.difficultTerrain = false
    sendChat('Movement:', 'Difficult terrain disabled (speed is back to normal)')
    debugLog(JSON.stringify(state.combatActions))
    return
  }

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
    case 'moveWhileGrappling':
      moveWhileGrappling(args, target);
      break;
    case 'improvise':
      improvise(args, target);
      break;
  }
};
