"use strict";

import { meta } from "../meta";
import { debugLog } from "./util/debuglog";

import { commands as subCommmands } from "./commands";
import { defaultState } from "../commands/defaultState";

const inputHandler = function(msg) {
  if (msg.type !== "api" || typeof msg.content !== "string") {
    return;
  }

  debugLog(`handle input > ${msg.content}`);

  let args = msg.content.split(" ");
  debugLog(JSON.stringify(args));
  args = args.filter(arg => typeof arg === "string" && arg.length);
  debugLog(JSON.stringify(args));
  args = args.map(str => str.trim());

  debugLog(JSON.stringify(args));

  if (args[0] === `!${meta.command}`) {
    debugLog(`command was called! < ${args.join()}`);
    args.shift();
    const subCommand = args[0];

    args.shift();

    debugLog(
      JSON.stringify({
        subCommand,
        hasOwnSubProp: subCommmands.hasOwnProperty(subCommand),
        hasOwnHandler:
          subCommmands.hasOwnProperty(subCommand) &&
          subCommmands[subCommand].hasOwnProperty("handler")
      })
    );
    if (
      subCommand &&
      subCommmands.hasOwnProperty(subCommand) &&
      subCommmands[subCommand].hasOwnProperty("handler")
    ) {
      debugLog(`subcommand was called! < ${subCommand}`);
      subCommmands[subCommand].handler(args);
    } else {
      debugLog("invalid args");
      subCommmands.help.handler(args, `Arguments invalid: ${args.join(" ")}`);
    }
  }
};

const turnorderHandler = (obj, prev) => {
  if (obj.get("turnorder") === prev.turnorder) return;

  let turnorder =
    obj.get("turnorder") === "" ? [] : JSON.parse(obj.get("turnorder"));
  let prevTurnorder = prev.turnorder === "" ? [] : JSON.parse(prev.turnorder);

  if (obj.get("turnorder") === "[]") {
    return;
  }

  if (
    turnorder.length &&
    prevTurnorder.length &&
    turnorder[0].id !== prevTurnorder[0].id
  ) {
    // reset the movement remaining on each turn
    state.combatActions.movementRemainingThisTurn =
      defaultState.movementRemainingThisTurn;
  }
};

const registerEventHandlers = function() {
  debugLog("register event handler <");
  on("chat:message", inputHandler);
  on("change:campaign:turnorder", turnorderHandler);
};

const checkInstall = function() {
  // check state and set defaults here if needed
  debugLog(`state keys: ${Object.keys(state).join()}`);

  state.combatActions = state.combatActions || defaultState;
};

on("ready", function() {
  debugLog("on ready <");
  checkInstall();
  registerEventHandlers();
});
