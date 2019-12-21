import { helpHandler } from './help';
import { movementHandler } from './movement';

// add handler in this file

export const commandHandlers = {
  help: helpHandler,
  movement: movementHandler
}
