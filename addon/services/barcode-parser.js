import Service from '@ember/service';
import gs1BarcodeParser from 'ember-barcode-input/utils/gs1-barcode-parser';

class BarcodeParser extends Service {
  /**
   * Group separator is an array of strings that could represent a group separator
   *
   * These strings are the key location + the 3 digit ascii. Location is used to denote numpad
   *
   * @type {string[]}
   */
  groupSeparators = [
    "3048304830503057"    // this is numpad 0 0 2 9
  ];

  keysToBarcode(keyEvents) {
    return gs1BarcodeParser.keysToBarcode(keyEvents, this.groupSeparators, gs1BarcodeParser.FNC1Code);
  }

  AIsToData(AIs) {
    return gs1BarcodeParser.AIsToData(AIs);
  }

  parseBarcode(barcode) {
    return gs1BarcodeParser.parseBarcode(barcode);
  }
}

export default BarcodeParser;
