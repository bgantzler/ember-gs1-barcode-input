import Service from '@ember/service';
import gs1BarcodeParser from 'ember-barcode-input/utils/gs1-barcode-parser';

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

  keysToBarcode(keyEvents) {
    return gs1BarcodeParser.keysToBarcode(keyEvents, this.groupSeparators, gs1BarcodeParser.FNC1Code);
  }

  partsToData(AIs) {
    return gs1BarcodeParser.partsToData(AIs);
  }

  parseBarcode(barcode) {
    return gs1BarcodeParser.parseBarcode(barcode);
  }
}

export default BarcodeParser;
