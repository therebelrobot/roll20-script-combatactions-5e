import { helpHandler } from './help';
import { movementHandler } from './movement';
import { actionHandler } from './action';

// add handler in this file

export const commandHandlers = {
  help: helpHandler,
  movement: movementHandler,
  action: actionHandler,
}
