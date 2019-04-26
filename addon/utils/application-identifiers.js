function _fixedString(parts, AI, gs, barcode, startPos) {
  parts.push({
    AI,
    value: barcode.substr(startPos + AI.code.length, AI.length)
  });
  return startPos + AI.code.length + AI.length;
}

function _variableString(parts, AI, gs, barcode, startPos) {
  let endPos = barcode.indexOf(gs, startPos);
  if (endPos === -1) {
    endPos = barcode.length;
  }
  parts.push({
    AI,
    value: barcode.substring(startPos + AI.code.length, endPos)
  });
  return endPos+1;
}

const AIs= {};

const AI_00 = {
  code: "00",
  name: "SSCC",
  description: "Serial Shipping Container Code",
  length: 18,
  parser: _fixedString
};
AIs[AI_00.code] = AI_00;

const AI_01 = {
  code: "01",
  name: "GTIN",
  description: "Global Trade Number",
  length: 14,
  parser: _fixedString
};
AIs[AI_01.code] = AI_01;

const AI_10 = {
  code: "10",
  name: "BATCH",
  description: "Batch or Lot number",
  parser: _variableString,
};
AIs[AI_10.code] = AI_10;

const AI_11 = {
  code: "11",
  name: "PROD_DATE",
  description: "Production date (YYMMDD)",
  length: 6,
  parser: _fixedString
};
AIs[AI_11.code] = AI_11;

const AI_12 = {
  code: "12",
  name: "DUE_DATE",
  description: "Due date (YYMMDD)",
  length: 6,
  parser: _fixedString
};
AIs[AI_12.code] = AI_12;

const AI_13 = {
  code: "13",
  name: "PACK_DATE",
  description: "Packaging date (YYMMDD)",
  length: 6,
  parser: _fixedString
};
AIs[AI_13.code] = AI_13;

const AI_15 = {
  code: "15",
  name: "BEST_DATE",
  description: "Best before date (YYMMDD)",
  length: 6,
  parser: _fixedString
};
AIs[AI_15.code] = AI_15;

const AI_16 = {
  code: "16",
  name: "SELL_DATE",
  description: "Sell by date (YYMMDD)",
  length: 6,
  parser: _fixedString
};
AIs[AI_16.code] = AI_16;

const AI_17 = {
  code: "17",
  name: "EXP_DATE",
  description: "Expiration date (YYMMDD)",
  length: 6,
  parser: _fixedString
};
AIs[AI_17.code] = AI_17;

const AI_21 = {
  code: "21",
  name: "SERIAL",
  description: "Serial number",
  parser: _variableString
};
AIs[AI_21.code] = AI_21;

/**
 *
 * @type {*[]}
 */
// const AIs = [
//   AI_00,
//   AI_01,
//   AI_10,
//   AI_11,
//   AI_12,
//   AI_13,
//   AI_15,
//   AI_16,
//   AI_17,
//   AI_21
// ];

/**
 * This is an object detailing every application identifier
 *
 */
export default AIs;
