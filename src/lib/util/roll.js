export const roll = (sides = 20, mod = 0) => {
  const baseRoll = randomInteger(sides);
  return {
    result: baseRoll + mod,
    nat: baseRoll === 20 ? 'success' : baseRoll === 1,
  }
}