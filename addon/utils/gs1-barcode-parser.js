import AIs from './application-identifiers';

const FNC1Code = "0029";
const FNC1 = String.fromCharCode(Number(FNC1Code));

/**
 * Search the AI definitions for a specific AI code
 *
 * @param code
 * @returns {AI}
 */
function findAI(code) {
  return AIs.find(item => {
    return item.code === code;
  })
}

/**
 * Takes an array of Key Events and converts them into a barcode string
 *
 * @param keyEvents
 * @param groupSeparators
 * @param fnc1
 * @returns {string}
 */
function keysToBarcode(keyEvents, groupSeparators, fnc1Code) {
  let code = "";
  keyEvents.forEach(key => {
    let c = `${key.location}${(("000")+key.which).slice(-3)}`;
    code = code + c;
  });

  groupSeparators.forEach(sep => {
    code = code.replace(sep, fnc1Code);
  });

  let barcode = "";
  let startPos = 0;
  let len = code.length;
  while (startPos < len) {
    let c = code.substr(startPos+1, 3);
    barcode = barcode + String.fromCharCode(Number(c));
    startPos = startPos + 4;
  }
  return barcode;
}

/**
 *
 * @param parts
 * @constructor
 */
function partsToData(parts) {
  return parts.reduce((accumulator, currentValue) => {
    accumulator[currentValue.AI.name] = currentValue.value;
    return accumulator;
  }, {})
}

/**
 * Parses a barcode string into a hash where each part found is represented
 *
 * @param barcode
 * @returns {Array}
 */
function parseBarcode(barcode) {
  let startPos = 0;
  let len = barcode.length;
  let result = [];

  while (startPos < len) {
    let aiLen = 2;
    let AI;
    let ai;
    while (aiLen < 4) {
      ai = barcode.substr(startPos, aiLen);
      AI = findAI(ai);

      if (AI !== undefined) {
        break;
      }
      aiLen++;
    }

    if (AI !== undefined) {
      startPos = AI.parser(result, AI, FNC1, barcode, startPos);
    } else {
      throw new Error(`Value "${ai}" at position ${startPos} does not match an AI`);
    }
  }

  return result;
}

export default {
  parseBarcode,
  findAI,
  keysToBarcode,
  partsToData,
  AIs,
  FNC1,
  FNC1Code
}
