import { convertFont } from '../lib/util/fonts';

const colour = '#7E2D40';
const divstyle = 'style="width: 189px; border: 1px solid black; background-color: #ffffff; padding: 5px;"'
const astyle1 = `style="text-align:center; border: 1px solid black; margin: 1px; padding: 2px; background-color: ${colour}; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;"`;
const astyle2 = `style="text-align:center; border: 1px solid black; margin: 1px; padding: 2px; background-color: ${colour}; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;"`;
const tablestyle = 'style="text-align:center;"';
const arrowstyle = `style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid ${colour}; margin-bottom: 2px; margin-top: 2px;"`;
const headstyle = `style="color: ${colour}; font-size: 18px; text-align: left; font-constiant: small-caps; font-family: Times, serif;"`;
const substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';

// Roll20 adds userscript- to every tags classes

const images = {
  scroll: {
    top: 'https://raw.githubusercontent.com/therebelbeta/custom_r20_imports/master/Top.png',
    middle: 'https://raw.githubusercontent.com/therebelbeta/custom_r20_imports/master/Middle.png',
    bottom: 'https://raw.githubusercontent.com/therebelbeta/custom_r20_imports/master/Bottom.png',
  }
}

const colors = {
  text: '#787878',
  redText: '#750000',
  greenText: '#00751f',
}

const style = {
  caScrollTop: `
    box-sizing: border-box;
    width: 100%;
    height: 133px;
    background-image: url(${images.scroll.top});
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: bottom center;
    position: relative;
    left: -22px;
  `.split('\n').join(''),
  caTopTitle:`
    font-family: Palatino, Georgia, serif;
    font-size: 15px;
    color: #3d0500;
    position: absolute;
    bottom: 25px;
    left: 51px;
  `.split('\n').join(''),
  caTopSubtitle:`
    font-family: Arial;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 8px;
    font-weight: lighter;
    color: ${colors.text};
    position: absolute;
    bottom: 2px;
    left: 51px;
  `.split('\n').join(''),
  caScrollMiddle: `
    width: 100%;
    height: auto;
    background-image: url(${images.scroll.middle});
    background-repeat: repeat-y;
    background-size: 100% auto;
    background-position: top left;
    position: relative;
    left: -22px;
  `.split('\n').join(''),
  caMiddleParagraph:`
    font-family: Palatino, Georgia, serif;
    font-size: 12px;
    color: #363636;
    position: relative;
    width: 60%;
    left: 65px;
    top: -21px;
  `.split('\n').join(''),
  caScrollBottom: `
    width: 100%;
    height: 133px;
    background-image: url(${images.scroll.bottom});
    background-repeat: no-repeat;
    background-size: 98% auto;
    background-position: top center;
    position: relative;
    top: -9px;
    left: -20px;
  `.split('\n').join(''),
  roll: `
    font-weight: bold;
    font-size: 20px;
    color: ${colors.text};
  `.split('\n').join(''),
  rollFail: `
    font-size: 22px;
    color: ${colors.redText};
    `.split('\n').join(''),
  rollSuccess: `
    font-size: 22px;
    color: ${colors.greenText};
  `.split('\n').join(''),
}
const formattedMessage = (title, subtitle, contents) => `
  <div>
    <div style="${style.caScrollTop}">
      <h1 style="${style.caTopTitle}">${convertFont(title, 'gothic')}</h1>
      <h2 style="${style.caTopSubtitle}">${subtitle}</h2>
    </div>
    <div style="${style.caScrollMiddle}">
      <p style="${style.caMiddleParagraph}">
        ${contents.split('\n').join('<br/><br/>')}
      </p>
    </div>
    <div style="${style.caScrollBottom}"></div>
  </div>
  `.split('\n').join('')

const hr = '\n---------------------------\n'

export const renderRoll = (roll, isNatFail, isNatSuccess) => {
  return `<span style="${style.roll} ${isNatFail?style.rollFail:isNatSuccess?style.rollSuccess:''}">${String(roll)}</span>`
}

export const renderTemplate = {
  movement: {
    move: (remainingSpeed, currentMovement, canMove) => formattedMessage('Movement: Move', `Feet Remaining: ${remainingSpeed} ft.`,`
      <strong>${canMove ? `You moved ${currentMovement} ft.`: `You cannot move ${currentMovement} ft. You only have ${remainingSpeed} ft. remaining this turn.`}</strong>
      ${state.combatActions.difficultTerrain ? '<strong>You are moving over difficult terrain, which is 2 ft. for every 1 ft. taken</strong>\n':''}${hr}
      ${remainingSpeed > 1 ? `You can switch back and forth between your walking and your flying speeds during your move. Whenever you switch, subtract the distance you've already moved from the new speed.
      ` : ''}You can move through a non-hostile creature's space.
      You can move through a hostile creature's space only if the creature is at least two sizes larger or smaller than you.
      Another creature's space is difficult terrain for you.
      Whether a creature is a friend or an enemy, you can't willingly end your move in its space.
    `),
    climb: (remainingSpeed, currentMovement, canMove) => formattedMessage('Movement: Climb', `Feet Remaining: ${remainingSpeed} ft.`,`
      <strong>${canMove ? `You climbed ${currentMovement} ft.`: `You cannot climb ${currentMovement} ft. You only have ${remainingSpeed} ft. remaining this turn.`}</strong>
      ${state.combatActions.difficultTerrain ? '<strong>You are climbing over difficult terrain, which is 4 ft. (difficult + climb) for every 1 ft. taken</strong>\n':''}${hr}
      ${canMove ? 'This may involve a Strength (Athletics) check if the climb is difficult. The result is below if needed:':''}
    `),
    swim: (remainingSpeed, currentMovement, canMove) => formattedMessage('Movement: Swim', `Feet Remaining: ${remainingSpeed} ft.`,`
      <strong>${canMove ? `You swam ${currentMovement} ft.`: `You cannot swim ${currentMovement} ft. You only have ${remainingSpeed} ft. remaining this turn.`}</strong>
      ${state.combatActions.difficultTerrain ? '<strong>You are swimming over difficult terrain, which is 4 ft. (difficult + swim) for every 1 ft. taken</strong>\n':''}${hr}
      ${canMove ? 'This may involve a Strength (Athletics) check if the swim is difficult. The result is below if needed:':''}
    `),
    dropProne: (remainingSpeed, currentMovement, canMove) => formattedMessage('Movement: Drop Prone', `Feet Remaining: ${remainingSpeed} ft.`,`
      <strong>You dropped prone.</strong>${hr}
      You can drop prone without using any of your speed
      To move while prone, you must crawl or use magic such as teleportation
      Dropping prone adds the <i>Prone</i> condition (melee attacks against you have advantage, ranged attacks against you have disadvantage, your own attacks have disadvantage)
    `),
    crawl: (remainingSpeed, currentMovement, canMove) => formattedMessage('Movement: Crawl', `Feet Remaining: ${remainingSpeed} ft.`,`
      <strong>${canMove ? `You crawled ${currentMovement} ft.`: `You cannot crawl ${currentMovement} ft. You only have ${remainingSpeed} ft. remaining this turn.`}</strong>
      ${state.combatActions.difficultTerrain ? '<strong>You are crawling over difficult terrain, which is 4 ft. (difficult + crawl) for every 1 ft. taken</strong>\n':''}${hr}
    `),
    standUp: (remainingSpeed, currentMovement, canMove) => formattedMessage('Movement: Stand Up', `Feet Remaining: ${remainingSpeed} ft.`,`
      <strong>${canMove ? `You stood up.`: `You cannot stand up. Standing up takes half your speed, and you only have ${remainingSpeed} ft. remaining this turn.`}</strong>
      ${state.combatActions.difficultTerrain ? '<strong>You are standing up over difficult terrain, which is 4 ft. (difficult + crawl) for every 1 ft. taken</strong>\n':''}
    `),
    highJump: (remainingSpeed, currentMovement, canMove, mod) => formattedMessage('Movement: High Jump', `Feet Remaining: ${remainingSpeed} ft.`,`
      <strong>${canMove ? `You jumped up ${currentMovement} ft. + ${mod} ft. run`: `You cannot jump. You only have ${remainingSpeed} ft. remaining this turn.`}</strong>${hr}
      You leap into the air a number of feet equal to <b>3 + your Strength modifier</b> if you move at least 10 feet on foot immediately before the jump.",
      When you make a standing high jump, you can jump only half that distance.
      You can extend your arms half your height above yourself during the jump.
      In some circumstances, your DM might allow you to make a Strength (Athletics) check to jump higher than you normally can.
    `),
    longJump: (remainingSpeed, currentMovement, canMove, mod) => formattedMessage('Movement: Long Jump', `Feet Remaining: ${remainingSpeed} ft.`,`
      <strong>${canMove ? `You jumped ${currentMovement} ft. + ${mod} ft. run`: `You cannot jump. You only have ${remainingSpeed} ft. remaining this turn.`}</strong>${hr}
      You cover a number of feet up to your <b>Strength score</b> if you move at least 10 feet on foot immediately before the jump.
      When you make a standing long jump, you can leap only half that distance
      May involve a DC 10 Strength (Athletics) check to clear a low obstacle (no taller than a quarter of the jump's distance). You hit the obstacle on a failed check.
      ${state.combatActions.difficultTerrain ? 'You are landing on difficult terrain. Roll a DC 10 Dexterity (Acrobatics) check to land on your feet. You land prone on a failed check.':''}
    `),
    moveWhileGrappling: (remainingSpeed, currentMovement, canMove) => formattedMessage('Movement: Move w/ Grapple', `Feet Remaining: ${remainingSpeed} ft.`,`
      <strong>${canMove ? `You drag or carry the grappled creature with you ${currentMovement} ft.`: `You cannot move ${currentMovement} ft. You only have ${remainingSpeed} ft. remaining this turn.`}</strong>
      ${state.combatActions.difficultTerrain ? '<strong>You are climbing over difficult terrain, which is 4 ft. (difficult + climb) for every 1 ft. taken</strong>\n':''}${hr}
      If you move while grappling another creature, your speed is halved, unless the creature is two or more sizes smaller than you.
    `),
    improvise: (remainingSpeed) => formattedMessage('Movement: Improvise', `Feet Remaining: ${remainingSpeed} ft.`,`
      When you describe a kind of movement not detailed elsewhere, your DM tells you whether it is possible and what kind of roll you need to make, if any, to determine success or failure.
    `),
  }
}
