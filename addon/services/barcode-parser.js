import Service from '@ember/service';
import { parseBarcode, partsToData, FNC1Code } from 'ember-gs1-barcode-input';

class BarcodeParser extends Service {
  /**
   * Group separator is an array of strings that could represent a group separator
   *
   * These strings are formatted as following
   *
   * char 1 - location. 0 or a 3. This indicates where on the keyboard the key is. Used in Numpad
   * char 2-4 - ASCII code of the key.
   *
   * This can denote a single key or a group of keys
   *
   * As an example, if your scanner is sending a numpad 0 as the group separator, you would use
   * "3048". 3 denotes the numpad, most other keys will have a 0 in this position.
   *
   * The scanner I experimented with sent numpad "0", "0", "2", "9" as the separator. These 4 keys would
   * be represented as the string "3048304830503057".
   *
   * @type {string[]}
   */
  groupSeparators = [
    "3048304830503057"    // this is numpad 0 0 2 9
  ];

  /**
   * Takes an array of Key Events and converts them into a barcode string
   *
   * @param keyEvents
   * @param groupSeparators
   * @param fnc1
   * @returns {string}
   */
  keysToBarcode(keyEvents) {
    let code = "";
    keyEvents.forEach(key => {
      let c = `${key.location}${(("000")+key.which).slice(-3)}`;
      code = code + c;
    });

    this.groupSeparators.forEach(sep => {
      code = code.replace(sep, FNC1Code);
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
   * @param AIs Array
   * @returns Object
   */
  partsToData = partsToData;

  /**
   *
   * @param barcode
   * @return [] of AIs
   */
  parseBarcode = parseBarcode;
}

export default BarcodeParser;
