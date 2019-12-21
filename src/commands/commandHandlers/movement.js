import { debugLog } from '../../lib/util/debuglog';
import { convertArgs } from '../../lib/util/convertArgs';

const move = (args) => {
  debugLog('move')
}
const climb = (args) => {
  debugLog('climb')
}
const swim = (args) => {
  debugLog('swim')
}
const dropProne = (args) => {
  debugLog('dropProne')
}
const crawl = (args) => {
  debugLog('crawl')
}
const standUp = (args) => {
  debugLog('standUp')
}
const highJump = (args) => {
  debugLog('highJump')
}
const longJump = (args) => {
  debugLog('longJump')
}
const moveWhileGrappled = (args) => {
  debugLog('moveWhileGrappled')
}
const improvise = (args) => {
  debugLog('improvise')
}

export const movementHandler = (args, error) => {
  debugLog('movementHandler handler was called! <');

  args = convertArgs(args)

  switch(args['--type']) {
    case 'move':
      move(args);
      break;
    case 'climb':
      climb(args);
      break;
    case 'swim':
      swim(args);
      break;
    case 'dropProne':
      dropProne(args);
      break;
    case 'crawl':
      crawl(args);
      break;
    case 'standUp':
      standUp(args);
      break;
    case 'highJump':
      highJump(args);
      break;
    case 'longJump':
      longJump(args);
      break;
    case 'moveWhileGrappled':
      moveWhileGrappled(args);
      break;
    case 'improvise':
      improvise(args);
      break;
  }
};
