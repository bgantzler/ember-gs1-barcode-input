export { default as AIs} from './application-identifiers';
import AIs from './application-identifiers';

export const FNC1Code = "0029";
export const FNC1 = String.fromCharCode(Number(FNC1Code));

/**
 *
 * @param parts
 * @constructor
 */
export function partsToData(parts) {
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
export function parseBarcode(barcode) {
  let startPos = 0;
  let len = barcode.length;
  let result = [];

  while (startPos < len) {
    let aiLen = 2;
    let AI;
    let ai;
    while (aiLen < 4) {
      ai = barcode.substr(startPos, aiLen);
      AI = AIs[ai];

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

/**
 * Export Functions
 */
// export default {
//   parseBarcode,
//   keysToBarcode,
//   partsToData,
//   AIs,
//   FNC1,
//   FNC1Code
// }


/*
01003617550050242116708357803969002917190831108148200167

00361755005024      GTIN (interstingly is the NDC)
16708357803969   Serial Number
8148200167  Lot #
  190831   expiration 2019/08/31
01              21              002917      10      unknown (markers?)

01 marker is GTIN +14 (14 characters that make up the GTIN
10 Lot number
17 marker expiration date
21 serial number




010035551371001521100006613963002917201100101090512C

*/
