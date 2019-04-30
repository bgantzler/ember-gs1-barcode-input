import Component from '@ember/component';
import layout from '../templates/components/barcode-input';
import {inject as service} from '@ember/service';
// import { tracked } from '@glimmer/tracking';

/**
 * Input field that parses the entered barcode and breaks it down into
 * the GS1 defines segments
 *
 */
class BarcodeInput extends Component {
  layout = layout;

  @service
  barcodeParser;

  _keyEvents = [];

  /**
   * Action to inform the use of the barcode entered
   *
   * @returns barcode: the keyEvents processed as a string. Separators have been replaced with the
   *                   generally accepted separator, ascii code 29barcode - the barcode parsed and formatted for GS1
   *          rawBarcode - the barcode string as processed by the input control
   *          keyEvents: an array of the keyEvents making up the barcode
   */
  onParse;

  // @tracked
  _barcode = "";

  _keypress(ev) {
    this._keyEvents.push(ev);
    if (ev.which === 13){
      this._keypressEnter(this._keyEvents);
      this.set("_keyEvents", []);
      this.set("_barcode", "");
    }
  }

  /**
   * Processes the enterKey
   *
   * @param keyEvents
   * @private
   */
  _keypressEnter(keyEvents) {
    // Convert Keys to a barcode
    let barcode = this.barcodeParser.keysToBarcode(keyEvents);

    this.onParse(barcode, this._barcode, keyEvents);
  }

}

export default BarcodeInput;
