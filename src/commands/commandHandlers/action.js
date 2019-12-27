import { debugLog } from "../../lib/util/debuglog";
import { convertArgs } from "../../lib/util/convertArgs";
import { meta } from "../../meta";
import { renderTemplate } from "../../helpers/renderTemplate";

const getRepeatingAttrs = (_characterid, type, isExpanded = false) => {
  const rawCharacterAttributes = findObjs({ _type: "attribute", _characterid });
  const matchingAttr = rawCharacterAttributes.filter(r20object => {
    const filterRegex = type ? new RegExp(`repeating_${type}`) : /repeating_/;
    const matches = r20object.get("name").match(filterRegex);
    if (!matches || !matches.length) return false;
    return true;
  });
  if (!matchingAttr || !matchingAttr.length) return matchingAttr;
  const consolidatedList = {};
  for (const rawAttribute of matchingAttr) {
    const { name: attributeName, current, max, _id } = rawAttribute.attributes;
    const [_, __, sharedId, name] = attributeName.split("_");
    if (!name || !name.length) continue;
    consolidatedList[sharedId] = consolidatedList[sharedId] || {};
    consolidatedList[sharedId][name] = isExpanded
      ? {
          name,
          current,
          max,
          attributeName,
          attributeId: _id
        }
      : current;
  }
  const consolidatedArray = [];
  for (const sharedId of Object.keys(consolidatedList)) {
    consolidatedArray.push({
      ...consolidatedList[sharedId],
      sharedId
    });
  }
  return consolidatedArray;
};

const attack = (args, target) => {
  debugLog("attack handler");
  // retrieve list of repeating actions
  // show character list of actions to perform
  const characterId = target.get("id");
  const characterName = target.get("name");
  const repeatingAttacks = getRepeatingAttrs(characterId, "attack");

  // options-flag
  // itemid
  // atkname
  // dmgbase
  // dmgtype
  // atkattr_base
  // dmgattr
  // atkmagic
  // atkdmgtype
  // rollbase_dmg
  // rollbase_crit
  // atkbonus
  // rollbase

  const attackString = repeatingAttacks
    .filter(r => !!r.atkname)
    .map(
      r =>
        `[${r.atkname} - ${r.dmgbase} ${r.dmgtype}](~selected|repeating_attack_${r.sharedId}_attack)`
    )
    .join("\n");
  sendChat("Action", renderTemplate.action.attack(attackString, characterName));
};
const grapple = (args, target) => {
  debugLog("grapple handler");
};
const shove = (args, target) => {
  debugLog("shove handler");
};
const castSpell = (args, target) => {
  debugLog("castSpell handler");
};
const blind = (args, target) => {
  debugLog("blind handler");
};
const disarm = (args, target) => {
  debugLog("disarm handler");
};
const dash = (args, target) => {
  debugLog("dash handler");
};
const disengage = (args, target) => {
  debugLog("disengage handler");
};
const dodge = (args, target) => {
  debugLog("dodge handler");
};
const escape = (args, target) => {
  debugLog("escape handler");
};
const help = (args, target) => {
  debugLog("help handler");
};
const useObject = (args, target) => {
  debugLog("useObject handler");
};
const useShield = (args, target) => {
  debugLog("useShield handler");
};
const equipObject = (args, target) => {
  debugLog("equipObject handler");
};
const unequipObject = (args, target) => {
  debugLog("unequipObject handler");
};
const takeCover = (args, target) => {
  debugLog("takeCover handler");
};
const hide = (args, target) => {
  debugLog("hide handler");
};
const assistAllyAttack = (args, target) => {
  debugLog("assistAllyAttack handler");
};
const search = (args, target) => {
  debugLog("search handler");
};
const ready = (args, target) => {
  debugLog("ready handler");
};
const setTrap = (args, target) => {
  debugLog("setTrap handler");
};
const stabilize = (args, target) => {
  debugLog("stabilize handler");
};
const classFeature = (args, target) => {
  debugLog("classFeature handler");
};
const leverageEnvironment = (args, target) => {
  debugLog("leverageEnvironment handler");
};
const improvise = (args, target) => {
  debugLog("improvise handler");
};

export const actionHandler = (args, error) => {
  debugLog("actionHandler handler was called! <");

  args = convertArgs(args);

  debugLog(JSON.stringify(args));
  debugLog(JSON.stringify(state.combatActions));

  if (!args["--target"]) {
    sendChat(
      `${meta.command} Error:`,
      "You must select a target for combat actions"
    );
    return;
  }

  const targetToken = findObjs({ type: "graphic", id: args["--target"] })[0];
  debugLog(args["--target"]);
  if (!targetToken) return;
  const representsId = targetToken.get("represents");
  const target = findObjs({ type: "character", id: representsId })[0];
  if (!target) return;

  switch (args["--type"]) {
    case "attack":
      attack(args, target);
      break;
    case "grapple":
      grapple(args, target);
      break;
    case "shove":
      shove(args, target);
      break;
    case "castSpell":
      castSpell(args, target);
      break;
    case "blind":
      blind(args, target);
      break;
    case "disarm":
      disarm(args, target);
      break;
    case "dash":
      dash(args, target);
      break;
    case "disengage":
      disengage(args, target);
      break;
    case "dodge":
      dodge(args, target);
      break;
    case "escape":
      escape(args, target);
      break;
    case "help":
      help(args, target);
      break;
    case "useObject":
      useObject(args, target);
      break;
    case "useShield":
      useShield(args, target);
      break;
    case "equipObject":
      equipObject(args, target);
      break;
    case "unequipObject":
      unequipObject(args, target);
      break;
    case "takeCover":
      takeCover(args, target);
      break;
    case "hide":
      hide(args, target);
      break;
    case "assistAllyAttack":
      assistAllyAttack(args, target);
      break;
    case "search":
      search(args, target);
      break;
    case "ready":
      ready(args, target);
      break;
    case "setTrap":
      setTrap(args, target);
      break;
    case "stabilize":
      stabilize(args, target);
      break;
    case "classFeature":
      classFeature(args, target);
      break;
    case "leverageEnvironment":
      leverageEnvironment(args, target);
      break;
    case "improvise":
      improvise(args, target);
      break;
  }
};
