
const FNC1Code = "0029";
const FNC1 = String.fromCharCode(Number(FNC1Code));

function _fixedString(AIs, AI, barcode, startPos) {
  AIs.push({
    AI,
    value: barcode.substr(startPos + AI.code.length, AI.length)
  });
  return startPos + AI.code.length + AI.length;
}

function _variableString(AIs, AI, barcode, startPos) {
  let endPos = barcode.indexOf(AI.gs, startPos);
  if (endPos === -1) {
    endPos = barcode.length;
  }
  AIs.push({
    AI,
    value: barcode.substring(startPos + AI.code.length, endPos)
  });
  return endPos+1;
}

const AI_00 = {
  code: "00",
  name: "SSCC",
  description: "Serial Shipping Container Code",
  length: 18,
  parser: _fixedString
};

const AI_01 = {
  code: "01",
  name: "GTIN",
  description: "Global Trade Number",
  length: 14,
  parser: _fixedString
};

const AI_10 = {
  code: "10",
  name: "BATCH",
  description: "Batch or Lot number",
  gs: FNC1,
  parser: _variableString,
};

const AI_11 = {
  code: "11",
  name: "PROD_DATE",
  description: "Production date (YYMMDD)",
  length: 6,
  parser: _fixedString
};

const AI_12 = {
  code: "12",
  name: "DUE_DATE",
  description: "Due date (YYMMDD)",
  length: 6,
  parser: _fixedString
};

const AI_13 = {
  code: "13",
  name: "PACK_DATE",
  description: "Packaging date (YYMMDD)",
  length: 6,
  parser: _fixedString
};

const AI_15 = {
  code: "15",
  name: "BEST_DATE",
  description: "Best before date (YYMMDD)",
  length: 6,
  parser: _fixedString
};

const AI_16 = {
  code: "16",
  name: "SELL_DATE",
  description: "Sell by date (YYMMDD)",
  length: 6,
  parser: _fixedString
};

const AI_17 = {
  code: "17",
  name: "EXP_DATE",
  description: "Expiration date (YYMMDD)",
  length: 6,
  parser: _fixedString
};

const AI_21 = {
  code: "21",
  name: "SERIAL",
  description: "Serial number",
  gs: FNC1,
  parser: _variableString
};

const AIs = [
  AI_00,
  AI_01,
  AI_10,
  AI_11,
  AI_12,
  AI_13,
  AI_15,
  AI_16,
  AI_17,
  AI_21
];

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
 * @param AIs
 * @constructor
 */
function AIsToData(AIs) {
  return AIs.reduce((accumulator, currentValue) => {
    accumulator[currentValue.AI.name] = currentValue.value;
    return accumulator;
  }, {})
}

/**
 *
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
      startPos = AI.parser(result, AI, barcode, startPos);
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
  AIsToData,
  AIs,
  FNC1,
  FNC1Code
}
