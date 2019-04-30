import Controller from '@ember/controller';
import * as gs1BarcodeParser from 'ember-gs1-barcode-input/utils/gs1-barcode-parser';

export default class ApplicationIdentifiersController extends Controller {
  AIs = gs1BarcodeParser.AIs;

  get AICodes() {
    let AICodes = [];
    for (let code in gs1BarcodeParser.AIs) {
      AICodes.push(code);
    }

    return AICodes.sort();
  }

}
