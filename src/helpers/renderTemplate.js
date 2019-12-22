export const renderTemplate = {
  movement: {
    move: (remainingSpeed) => `
    ${remainingSpeed > 1 ? 'You can switch back and forth between your walking and your flying speeds during your move. Whenever you switch, subtract the distance you\'ve already moved from the new speed.' : ''}
    You can move through a nonhostile creature's space.
    You can move through a hostile creature's space only if the creature is at least two sizes larger or smaller than you.
    Another creature's space is difficult terrain for you.
    Whether a creature is a friend or an enemy, you can't willingly end your move in its space.
    `
  }
}