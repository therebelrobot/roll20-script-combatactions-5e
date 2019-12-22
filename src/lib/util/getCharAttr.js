import { debugLog } from './debuglog';

export const getCharAttr = (_characterid, attr) => {
  let results

  const CharAttr = findObjs({
    name: attr,
    _characterid,
  });

  CharAttr.forEach((atrSpd) => {
    results =  atrSpd.get("current");
  });
  
  if (isNaN(results)) {
    debugLog('couldn\'t find speed')
    results = "";
  }
  
  return results;
};