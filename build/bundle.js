(function () {
  'use strict';

  var meta = {
    command: 'combatActions',
    version: '0.0.2',
    debug: true
  };

  var debugLog = function debugLog(msg) {
    {
      var message = "**  (v".concat(meta.version, "): ").concat(msg);
      log("".concat(meta.command, "_debug ").concat(message));
      sendChat("".concat(meta.command, "_debug"), message);
    }
  };

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var helpMeta = {
    command: 'help',
    helpText: 'This help dialog.'
  };

  var movementMeta = {
    command: 'movement',
    helpText: "Perform a movement. available options:\n  - move\n  - climb\n  - swim\n  - dropProne\n  - crawl\n  - standUp\n  - highJump\n  - longJump\n  - moveWithGrapple\n  - improvise\n"
  };

  var commandMetas = {
    help: helpMeta,
    movement: movementMeta
  };

  var formatHelp = function formatHelp(name, helpText) {
    return "____**".concat(name, "**: *").concat(helpText, "*\n");
  };

  var helpHandler = function helpHandler(args, error) {
    debugLog('sub_command handler was called! <');
    sendChat('module_help', "\n**command**: *&excl;".concat(meta.command, " help*\n__*options*:"));

    for (var _i = 0, _Object$keys = Object.keys(commandMetas); _i < _Object$keys.length; _i++) {
      var commandName = _Object$keys[_i];
      var command = commandMetas[commandName];
      sendChat('module_help', formatHelp(command.command, command.helpText));
    }

    if (error) {
      sendChat('module_help', "\n    \n\n    ERROR: ".concat(error));
    }
  };

  var chunkArray = function chunkArray(myArray, chunk_size) {
    var arrayLength = myArray.length;
    var tempArray = [];
    var myChunk;

    for (var index = 0; index < arrayLength; index += chunk_size) {
      myChunk = myArray.slice(index, index + chunk_size); // Do something if you want with the group

      tempArray.push(myChunk);
    }

    return tempArray;
  };

  var convertArgs = function convertArgs(argsArray) {
    var chunkedArgs = chunkArray(argsArray, 2);
    var argObj = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = chunkedArgs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var chunk = _step.value;
        argObj[chunk[0]] = chunk[1];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return argObj;
  };

  var fonts = {
    gothicBold: {
      A: '𝕬',
      B: '𝕭',
      C: '𝕮',
      D: '𝕯',
      E: '𝕰',
      F: '𝕱',
      G: '𝕲',
      H: '𝕳',
      I: '𝕴',
      J: '𝕵',
      K: '𝕶',
      L: '𝕷',
      M: '𝕸',
      N: '𝕹',
      O: '𝕺',
      P: '𝕻',
      Q: '𝕼',
      R: '𝕽',
      S: '𝕾',
      T: '𝕿',
      U: '𝖀',
      V: '𝖁',
      W: '𝖂',
      X: '𝖃',
      Y: '𝖄',
      Z: '𝖅',
      a: '𝖆',
      b: '𝖇',
      c: '𝖈',
      d: '𝖉',
      e: '𝖊',
      f: '𝖋',
      g: '𝖌',
      h: '𝖍',
      i: '𝖎',
      j: '𝖏',
      k: '𝖐',
      l: '𝖑',
      m: '𝖒',
      n: '𝖓',
      o: '𝖔',
      p: '𝖕',
      q: '𝖖',
      r: '𝖗',
      s: '𝖘',
      t: '𝖙',
      u: '𝖚',
      v: '𝖛',
      w: '𝖜',
      x: '𝖝',
      y: '𝖞',
      z: '𝖟'
    },
    gothic: {
      A: '𝔄',
      B: '𝔅',
      C: 'ℭ',
      D: '𝔇',
      E: '𝔈',
      F: '𝔉',
      G: '𝔊',
      H: 'ℌ',
      I: 'ℑ',
      J: '𝔍',
      K: '𝔎',
      L: '𝔏',
      M: '𝔐',
      N: '𝔑',
      O: '𝔒',
      P: '𝔓',
      Q: '𝔔',
      R: 'ℜ',
      S: '𝔖',
      T: '𝔗',
      U: '𝔘',
      V: '𝔙',
      W: '𝔚',
      X: '𝔛',
      Y: '𝔜',
      Z: 'ℨ',
      a: '𝔞',
      b: '𝔟',
      c: '𝔠',
      d: '𝔡',
      e: '𝔢',
      f: '𝔣',
      g: '𝔤',
      h: '𝔥',
      i: '𝔦',
      j: '𝔧',
      k: '𝔨',
      l: '𝔩',
      m: '𝔪',
      n: '𝔫',
      o: '𝔬',
      p: '𝔭',
      q: '𝔮',
      r: '𝔯',
      s: '𝔰',
      t: '𝔱',
      u: '𝔲',
      v: '𝔳',
      w: '𝔴',
      x: '𝔵',
      y: '𝔶',
      z: '𝔷'
    },
    halfling: {
      A: 'ค',
      B: '๒',
      C: 'ς',
      D: '๔',
      E: 'є',
      F: 'Ŧ',
      G: 'ﻮ',
      H: 'ђ',
      I: 'เ',
      J: 'ן',
      K: 'к',
      L: 'ɭ',
      M: '๓',
      N: 'ภ',
      O: '๏',
      P: 'ק',
      Q: 'ợ',
      R: 'г',
      S: 'ร',
      T: 'Շ',
      U: 'ย',
      V: 'ש',
      W: 'ฬ',
      X: 'א',
      Y: 'ץ',
      Z: 'չ',
      a: 'ค',
      b: '๒',
      c: 'ς',
      d: '๔',
      e: 'є',
      f: 'Ŧ',
      g: 'ﻮ',
      h: 'ђ',
      i: 'เ',
      j: 'ן',
      k: 'к',
      l: 'ɭ',
      m: '๓',
      n: 'ภ',
      o: '๏',
      p: 'ק',
      q: 'ợ',
      r: 'г',
      s: 'ร',
      t: 'Շ',
      u: 'ย',
      v: 'ש',
      w: 'ฬ',
      x: 'א',
      y: 'ץ',
      z: 'չ'
    },
    dwarvish: {
      A: 'ል',
      B: 'ጌ',
      C: 'ር',
      D: 'ዕ',
      E: 'ቿ',
      F: 'ቻ',
      G: 'ኗ',
      H: 'ዘ',
      I: 'ጎ',
      J: 'ጋ',
      K: 'ጕ',
      L: 'ረ',
      M: 'ጠ',
      N: 'ክ',
      O: 'ዐ',
      P: 'የ',
      Q: 'ዒ',
      R: 'ዪ',
      S: 'ነ',
      T: 'ፕ',
      U: 'ሁ',
      V: 'ሀ',
      W: 'ሠ',
      X: 'ሸ',
      Y: 'ሃ',
      Z: 'ጊ',
      a: 'ል',
      b: 'ጌ',
      c: 'ር',
      d: 'ዕ',
      e: 'ቿ',
      f: 'ቻ',
      g: 'ኗ',
      h: 'ዘ',
      i: 'ጎ',
      j: 'ጋ',
      k: 'ጕ',
      l: 'ረ',
      m: 'ጠ',
      n: 'ክ',
      o: 'ዐ',
      p: 'የ',
      q: 'ዒ',
      r: 'ዪ',
      s: 'ነ',
      t: 'ፕ',
      u: 'ሁ',
      v: 'ሀ',
      w: 'ሠ',
      x: 'ሸ',
      y: 'ሃ',
      z: 'ጊ'
    }
  };
  var convertFont = function convertFont(message, type) {
    if (!fonts[type]) return message;
    return message.split('').map(function (letter) {
      return fonts[type][letter] || letter;
    }).join('');
  };

  var images = {
    scroll: {
      top: 'https://raw.githubusercontent.com/therebelbeta/custom_r20_imports/master/Top.png',
      middle: 'https://raw.githubusercontent.com/therebelbeta/custom_r20_imports/master/Middle.png',
      bottom: 'https://raw.githubusercontent.com/therebelbeta/custom_r20_imports/master/Bottom.png'
    }
  };
  var colors = {
    text: '#787878',
    redText: '#750000',
    greenText: '#00751f'
  };
  var style = {
    caScrollTop: "\n    box-sizing: border-box;\n    width: 100%;\n    height: 133px;\n    background-image: url(".concat(images.scroll.top, ");\n    background-repeat: no-repeat;\n    background-size: 100% auto;\n    background-position: bottom center;\n    position: relative;\n    left: -22px;\n  ").split('\n').join(''),
    caTopTitle: "\n    font-family: Palatino, Georgia, serif;\n    font-size: 15px;\n    color: #3d0500;\n    position: absolute;\n    bottom: 25px;\n    left: 51px;\n  ".split('\n').join(''),
    caTopSubtitle: "\n    font-family: Arial;\n    text-transform: uppercase;\n    letter-spacing: 1px;\n    font-size: 8px;\n    font-weight: lighter;\n    color: ".concat(colors.text, ";\n    position: absolute;\n    bottom: 2px;\n    left: 51px;\n  ").split('\n').join(''),
    caScrollMiddle: "\n    width: 100%;\n    height: auto;\n    background-image: url(".concat(images.scroll.middle, ");\n    background-repeat: repeat-y;\n    background-size: 100% auto;\n    background-position: top left;\n    position: relative;\n    left: -22px;\n  ").split('\n').join(''),
    caMiddleParagraph: "\n    font-family: Palatino, Georgia, serif;\n    font-size: 12px;\n    color: #363636;\n    position: relative;\n    width: 60%;\n    left: 65px;\n    top: -21px;\n  ".split('\n').join(''),
    caScrollBottom: "\n    width: 100%;\n    height: 133px;\n    background-image: url(".concat(images.scroll.bottom, ");\n    background-repeat: no-repeat;\n    background-size: 98% auto;\n    background-position: top center;\n    position: relative;\n    top: -9px;\n    left: -20px;\n  ").split('\n').join(''),
    roll: "\n    font-weight: bold;\n    font-size: 20px;\n    color: ".concat(colors.text, ";\n  ").split('\n').join(''),
    rollFail: "\n    font-size: 22px;\n    color: ".concat(colors.redText, ";\n    ").split('\n').join(''),
    rollSuccess: "\n    font-size: 22px;\n    color: ".concat(colors.greenText, ";\n  ").split('\n').join('')
  };

  var formattedMessage = function formattedMessage(title, subtitle, contents) {
    return "\n  <div>\n    <div style=\"".concat(style.caScrollTop, "\">\n      <h1 style=\"").concat(style.caTopTitle, "\">").concat(convertFont(title, 'gothic'), "</h1>\n      <h2 style=\"").concat(style.caTopSubtitle, "\">").concat(subtitle, "</h2>\n    </div>\n    <div style=\"").concat(style.caScrollMiddle, "\">\n      <p style=\"").concat(style.caMiddleParagraph, "\">\n        ").concat(contents.split('\n').join('<br/><br/>'), "\n      </p>\n    </div>\n    <div style=\"").concat(style.caScrollBottom, "\"></div>\n  </div>\n  ").split('\n').join('');
  };

  var hr = '\n---------------------------\n';
  var renderTemplate = {
    movement: {
      move: function move(remainingSpeed, currentMovement, canMove) {
        return formattedMessage('Movement: Move', "Feet Remaining: ".concat(remainingSpeed, " ft."), "\n      <strong>".concat(canMove ? "You moved ".concat(currentMovement, " ft.") : "You cannot move ".concat(currentMovement, " ft. You only have ").concat(remainingSpeed, " ft. remaining this turn."), "</strong>\n      ").concat(state.combatActions.difficultTerrain ? '<strong>You are moving over difficult terrain, which is 2 ft. for every 1 ft. taken</strong>\n' : '').concat(hr, "\n      ").concat(remainingSpeed > 1 ? "You can switch back and forth between your walking and your flying speeds during your move. Whenever you switch, subtract the distance you've already moved from the new speed.\n      " : '', "You can move through a non-hostile creature's space.\n      You can move through a hostile creature's space only if the creature is at least two sizes larger or smaller than you.\n      Another creature's space is difficult terrain for you.\n      Whether a creature is a friend or an enemy, you can't willingly end your move in its space.\n    "));
      },
      climb: function climb(remainingSpeed, currentMovement, canMove) {
        return formattedMessage('Movement: Climb', "Feet Remaining: ".concat(remainingSpeed, " ft."), "\n      <strong>".concat(canMove ? "You climbed ".concat(currentMovement, " ft.") : "You cannot climb ".concat(currentMovement, " ft. You only have ").concat(remainingSpeed, " ft. remaining this turn."), "</strong>\n      ").concat(state.combatActions.difficultTerrain ? '<strong>You are climbing over difficult terrain, which is 4 ft. (difficult + climb) for every 1 ft. taken</strong>\n' : '').concat(hr, "\n      ").concat(canMove ? 'This may involve a Strength (Athletics) check if the climb is difficult. The result is below if needed:' : '', "\n    "));
      },
      swim: function swim(remainingSpeed, currentMovement, canMove) {
        return formattedMessage('Movement: Swim', "Feet Remaining: ".concat(remainingSpeed, " ft."), "\n      <strong>".concat(canMove ? "You swam ".concat(currentMovement, " ft.") : "You cannot swim ".concat(currentMovement, " ft. You only have ").concat(remainingSpeed, " ft. remaining this turn."), "</strong>\n      ").concat(state.combatActions.difficultTerrain ? '<strong>You are swimming over difficult terrain, which is 4 ft. (difficult + swim) for every 1 ft. taken</strong>\n' : '').concat(hr, "\n      ").concat(canMove ? 'This may involve a Strength (Athletics) check if the swim is difficult. The result is below if needed:' : '', "\n    "));
      },
      dropProne: function dropProne(remainingSpeed, currentMovement, canMove) {
        return formattedMessage('Movement: Drop Prone', "Feet Remaining: ".concat(remainingSpeed, " ft."), "\n      <strong>You dropped prone.</strong>".concat(hr, "\n      You can drop prone without using any of your speed\n      To move while prone, you must crawl or use magic such as teleportation\n      Dropping prone adds the <i>Prone</i> condition (melee attacks against you have advantage, ranged attacks against you have disadvantage, your own attacks have disadvantage)\n    "));
      },
      crawl: function crawl(remainingSpeed, currentMovement, canMove) {
        return formattedMessage('Movement: Crawl', "Feet Remaining: ".concat(remainingSpeed, " ft."), "\n      <strong>".concat(canMove ? "You crawled ".concat(currentMovement, " ft.") : "You cannot crawl ".concat(currentMovement, " ft. You only have ").concat(remainingSpeed, " ft. remaining this turn."), "</strong>\n      ").concat(state.combatActions.difficultTerrain ? '<strong>You are crawling over difficult terrain, which is 4 ft. (difficult + crawl) for every 1 ft. taken</strong>\n' : '').concat(hr, "\n    "));
      },
      standUp: function standUp(remainingSpeed, currentMovement, canMove) {
        return formattedMessage('Movement: Stand Up', "Feet Remaining: ".concat(remainingSpeed, " ft."), "\n      <strong>".concat(canMove ? "You stood up." : "You cannot stand up. Standing up takes half your speed, and you only have ".concat(remainingSpeed, " ft. remaining this turn."), "</strong>\n      ").concat(state.combatActions.difficultTerrain ? '<strong>You are standing up over difficult terrain, which is 4 ft. (difficult + crawl) for every 1 ft. taken</strong>\n' : '', "\n    "));
      },
      highJump: function highJump(remainingSpeed, currentMovement, canMove, mod) {
        return formattedMessage('Movement: High Jump', "Feet Remaining: ".concat(remainingSpeed, " ft."), "\n      <strong>".concat(canMove ? "You jumped up ".concat(currentMovement, " ft. + ").concat(mod, " ft. run") : "You cannot jump. You only have ".concat(remainingSpeed, " ft. remaining this turn."), "</strong>").concat(hr, "\n      You leap into the air a number of feet equal to <b>3 + your Strength modifier</b> if you move at least 10 feet on foot immediately before the jump.\",\n      When you make a standing high jump, you can jump only half that distance.\n      You can extend your arms half your height above yourself during the jump.\n      In some circumstances, your DM might allow you to make a Strength (Athletics) check to jump higher than you normally can.\n    "));
      },
      longJump: function longJump(remainingSpeed, currentMovement, canMove, mod) {
        return formattedMessage('Movement: Long Jump', "Feet Remaining: ".concat(remainingSpeed, " ft."), "\n      <strong>".concat(canMove ? "You jumped ".concat(currentMovement, " ft. + ").concat(mod, " ft. run") : "You cannot jump. You only have ".concat(remainingSpeed, " ft. remaining this turn."), "</strong>").concat(hr, "\n      You cover a number of feet up to your <b>Strength score</b> if you move at least 10 feet on foot immediately before the jump.\n      When you make a standing long jump, you can leap only half that distance\n      May involve a DC 10 Strength (Athletics) check to clear a low obstacle (no taller than a quarter of the jump's distance). You hit the obstacle on a failed check.\n      ").concat(state.combatActions.difficultTerrain ? 'You are landing on difficult terrain. Roll a DC 10 Dexterity (Acrobatics) check to land on your feet. You land prone on a failed check.' : '', "\n    "));
      },
      moveWhileGrappling: function moveWhileGrappling(remainingSpeed, currentMovement, canMove) {
        return formattedMessage('Movement: Move w/ Grapple', "Feet Remaining: ".concat(remainingSpeed, " ft."), "\n      <strong>".concat(canMove ? "You drag or carry the grappled creature with you ".concat(currentMovement, " ft.") : "You cannot move ".concat(currentMovement, " ft. You only have ").concat(remainingSpeed, " ft. remaining this turn."), "</strong>\n      ").concat(state.combatActions.difficultTerrain ? '<strong>You are climbing over difficult terrain, which is 4 ft. (difficult + climb) for every 1 ft. taken</strong>\n' : '').concat(hr, "\n      If you move while grappling another creature, your speed is halved, unless the creature is two or more sizes smaller than you.\n    "));
      },
      improvise: function improvise(remainingSpeed) {
        return formattedMessage('Movement: Improvise', "Feet Remaining: ".concat(remainingSpeed, " ft."), "\n      When you describe a kind of movement not detailed elsewhere, your DM tells you whether it is possible and what kind of roll you need to make, if any, to determine success or failure.\n    ");
      }
    }
  };

  var genericMove = function genericMove(target, distance) {
    var speedMultiplier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var templateName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'move';
    var mod = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    debugLog("generic move ".concat(target.get('name')));
    var characterId = target.get('id');
    var speed = getAttrByName(characterId, 'speed');
    debugLog("speed: ".concat(speed, " ft."));

    if (!state.combatActions.movementRemainingThisTurn[characterId]) {
      state.combatActions.movementRemainingThisTurn[characterId] = speed;
    }

    var remainingMovement = state.combatActions.movementRemainingThisTurn[characterId];
    var movementMade = Number(distance);
    renderTemplate.movement.move(remainingMovement);

    if (templateName !== 'dropProne' && (!movementMade || movementMade < 0)) {
      return;
    }

    var isDifficultTerrain = state.combatActions.difficultTerrain;
    var movementWithRatio = speedMultiplier ? (Number(movementMade) + mod) / speedMultiplier : 0; // 30

    var newRemainingMovement = Number(remainingMovement) - (movementWithRatio + (isDifficultTerrain ? movementWithRatio : 0));

    if (newRemainingMovement < 0) {
      sendChat('Movement', renderTemplate.movement[templateName](remainingMovement, movementMade, false, mod));
      return false;
    }

    state.combatActions.movementRemainingThisTurn[characterId] = newRemainingMovement;
    sendChat('Movement', renderTemplate.movement[templateName](newRemainingMovement, movementMade, true, mod));
    return true;
  };

  var move = function move(args, target) {
    genericMove(target, args['--distance'], 1, 'move');
  };

  var climb = function climb(args, target) {
    var successful = genericMove(target, args['--distance'], 0.5, 'climb');
    if (!successful) return;
    var character = target.get('name');
    sendChat(character, "/gmroll d20+@{selected|strength_mod}");
  };

  var swim = function swim(args, target) {
    debugLog('swim');
    var successful = genericMove(target, args['--distance'], 0.5, 'swim');
    if (!successful) return;
    var character = target.get('name');
    sendChat(character, "/gmroll d20+@{selected|strength_mod}");
  };

  var dropProne = function dropProne(args, target) {
    debugLog('dropProne');
    var successful = genericMove(target, 0, 0, 'dropProne');
  };

  var crawl = function crawl(args, target) {
    debugLog('crawl');
    var successful = genericMove(target, args['--distance'], 0.5, 'crawl');
  };

  var standUp = function standUp(args, target) {
    var characterId = target.get('id');
    var speed = getAttrByName(characterId, 'speed');
    var successful = genericMove(target, speed / 2, 1, 'standUp');
  };

  var highJump = function highJump(args, target) {
    var characterId = target.get('id');
    var strength_mod = getAttrByName(characterId, 'strength_mod');
    var mod = args['--standing'] ? 2 : 1;
    var successful = genericMove(target, (3 + Number(strength_mod)) / mod, 0.5, 'highJump', args['--standing'] ? 0 : 10);
    if (!successful) return;
    var character = target.get('name');
    sendChat(character, "/gmroll d20+@{selected|strength_mod}");
  };

  var longJump = function longJump(args, target) {
    var characterId = target.get('id');
    var strength = getAttrByName(characterId, 'strength');
    var mod = args['--standing'] ? 2 : 1;
    var successful = genericMove(target, Number(strength) / mod, 0.5, 'highJump', args['--standing'] ? 0 : 10);
    if (!successful) return;
    var character = target.get('name');
    sendChat(character, "/gmroll d20+@{selected|strength_mod}>10");

    if (state.combatActions.difficultTerrain) {
      sendChat(character, "/gmroll d20+@{selected|dexterity_mod}>10");
    }
  };

  var moveWhileGrappling = function moveWhileGrappling(args, target) {
    debugLog('moveWhileGrappling');
    var successful = genericMove(target, args['--distance'], 0.5, 'moveWhileGrappling');
  };

  var improvise = function improvise(args, target) {
    debugLog('improvise');
    var characterId = target.get('id');
    var speed = getAttrByName(characterId, 'speed');
    debugLog("speed: ".concat(speed, " ft."));

    if (!state.combatActions.movementRemainingThisTurn[characterId]) {
      state.combatActions.movementRemainingThisTurn[characterId] = speed;
    }

    var remainingMovement = state.combatActions.movementRemainingThisTurn[characterId];
    sendChat('Movement', renderTemplate.movement.improvise(remainingMovement));
  };

  var movementHandler = function movementHandler(args, error) {
    debugLog('movementHandler handler was called! <');
    args = convertArgs(args);
    debugLog(JSON.stringify(args));
    debugLog(JSON.stringify(state.combatActions));

    if (args.hasOwnProperty('--enableDifficultTerrain')) {
      debugLog('enable');
      state.combatActions.difficultTerrain = true;
      sendChat('Movement:', 'Difficult terrain enabled (speed is halved)');
      debugLog(JSON.stringify(state.combatActions));
      return;
    }

    if (args.hasOwnProperty('--disableDifficultTerrain')) {
      debugLog('disable');
      state.combatActions.difficultTerrain = false;
      sendChat('Movement:', 'Difficult terrain disabled (speed is back to normal)');
      debugLog(JSON.stringify(state.combatActions));
      return;
    }

    if (!args['--target']) {
      sendChat("".concat(meta.command, " Error:"), 'You must select a target for combat actions');
      return;
    }

    var targetToken = findObjs({
      type: 'graphic',
      id: args['--target']
    })[0];
    debugLog(args['--target']);
    if (!targetToken) return; // debugLog(Object.keys(targetToken).join())

    var representsId = targetToken.get('represents'); // debugLog(representsId)

    var target = findObjs({
      type: 'character',
      id: representsId
    })[0];
    if (!target) return;

    switch (args['--type']) {
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

  var commandHandlers = {
    help: helpHandler,
    movement: movementHandler
  };

  var commandObj = {};

  for (var _i = 0, _Object$keys = Object.keys(commandMetas); _i < _Object$keys.length; _i++) {
    var metaName = _Object$keys[_i];
    commandObj[commandMetas[metaName].command] = _objectSpread2({}, commandMetas[metaName], {
      handler: commandHandlers[metaName]
    });
  }

  var commands = commandObj;

  var defaultState = {
    movementRemainingThisTurn: {},
    difficultTerrain: false
  };

  var inputHandler = function inputHandler(msg) {
    if (msg.type !== 'api' || typeof msg.content !== 'string') {
      return;
    }

    debugLog("handle input > ".concat(msg.content));
    var args = msg.content.split(' ').filter(function (arg) {
      return typeof arg === 'string' && arg.length;
    }).map(function (str) {
      return str.trim();
    });

    if (args[0] === "!".concat(meta.command)) {
      debugLog("command was called! < ".concat(args.join()));
      args.shift();
      var subCommand = args[0];
      args.shift();
      debugLog(JSON.stringify({
        subCommand: subCommand,
        hasOwnSubProp: commands.hasOwnProperty(subCommand),
        hasOwnHandler: commands.hasOwnProperty(subCommand) && commands[subCommand].hasOwnProperty('handler')
      }));

      if (subCommand && commands.hasOwnProperty(subCommand) && commands[subCommand].hasOwnProperty('handler')) {
        debugLog("subcommand was called! < ".concat(subCommand));
        commands[subCommand].handler(args);
      } else {
        debugLog('invalid args');
        commands.help.handler(args, "Arguments invalid: ".concat(args.join(' ')));
      }
    }
  };

  var turnorderHandler = function turnorderHandler(obj, prev) {
    if (obj.get('turnorder') === prev.turnorder) return;
    var turnorder = obj.get('turnorder') === '' ? [] : JSON.parse(obj.get('turnorder'));
    var prevTurnorder = prev.turnorder === '' ? [] : JSON.parse(prev.turnorder);

    if (obj.get('turnorder') === "[]") {
      return;
    }

    if (turnorder.length && prevTurnorder.length && turnorder[0].id !== prevTurnorder[0].id) {
      // reset the movement remaining on each turn
      state.combatActions.movementRemainingThisTurn = defaultState.movementRemainingThisTurn;
    }
  };

  var registerEventHandlers = function registerEventHandlers() {
    debugLog('register event handler <');
    on('chat:message', inputHandler);
    on('change:campaign:turnorder', turnorderHandler);
  };

  var checkInstall = function checkInstall() {
    // check state and set defaults here if needed
    debugLog("state keys: ".concat(Object.keys(state).join()));
    state.combatActions = state.combatActions || defaultState;
  };

  on('ready', function () {
    debugLog('on ready <');
    checkInstall();
    registerEventHandlers();
  });

}());
