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

  // @tracked
  _barcode = "";

  _keypress(ev) {
    this._keyEvents.push(ev);
    console.log(ev);
    if (ev.which === 13){
      this._keypressEnter(this._keyEvents);
      this.set("_keyEvents", []);
      this.set("_barcode", "");
    }
  }

  _keypressEnter(keyEvents) {
    // Convert Keys to a barcode
    let keys;
    if(this.onParseKeys) {
      keys = this.onParseKeys(keyEvents);
    }
    keys = keys || keyEvents;
    let code = this.barcodeParser.keysToBarcode(keys);

    // Convert the Barcode to an array of AIs
    let AIs = this.barcodeParser.parseBarcode(code);
    let ais;
    if (this.onParseAIs) {
      ais = this.onParseAIs(AIs);
    }
    ais = ais || AIs;
    console.log(AIs);

    let barcodeData = this.barcodeParser.AIsToData(ais);

    this.onParse(barcodeData);
  }
}

export default BarcodeInput;
