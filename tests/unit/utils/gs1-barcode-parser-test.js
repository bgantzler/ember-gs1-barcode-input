import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { parseBarcode, partsToData, GS1ApplicationIdentifiers, FNC1} from 'ember-gs1-barcode-input';

module('Unit | Utility | gs1-barcode-parser', function(hooks) {
  setupTest(hooks);

  test("Parts to Data", function(assert) {
    let AI_01 = GS1ApplicationIdentifiers["01"];
    let value = "hello";
    let AIs = [
      {
        AI: AI_01,
        value
      }
    ];

    let data = partsToData(AIs);

    assert.equal(data[AI_01.name], value);
  });

  module("GTIN, SERIAL, EXP, LOT", function(hooks) {

    let barcodeData = {
      gtin: "00361755005024",
      exp: "190831",
      serialNumber: "16708357803969",
      lotNumber: "8148200167"
    };

    hooks.beforeEach(function() {
      this.barcode = `01003617550050242116708357803969${FNC1}17190831108148200167`;
    });

    test('GTIN Parser', function(assert) {
      let AIs = [];
      let startPos = 0;

      let AI = GS1ApplicationIdentifiers["01"];

      let result = AI.parser(AIs, AI, FNC1, this.barcode, startPos);

      assert.equal(result, startPos+AI.code.length+AI.length);
      assert.equal(AIs[0].value, barcodeData.gtin);
    });

    test('Expiration Date Parser', function(assert) {
      let AIs = [];
      let startPos = 33;

      let AI = GS1ApplicationIdentifiers["17"];

      let result = AI.parser(AIs, AI, FNC1, this.barcode, startPos);

      assert.equal(result, startPos+AI.code.length+AI.length);
      assert.equal(AIs[0].value, barcodeData.exp);
    });

    test('Serial Number Parser', function(assert) {
      let AIs = [];
      let startPos = 16;

      let AI = GS1ApplicationIdentifiers["21"];

      let result = AI.parser(AIs, AI, FNC1, this.barcode, startPos);

      assert.equal(result, startPos+AI.code.length+barcodeData.serialNumber.length+1);
      assert.equal(AIs[0].value, barcodeData.serialNumber);
    });

    test('Lot Number Parser', function(assert) {
      let AIs = [];
      let startPos = 41;

      let AI = GS1ApplicationIdentifiers["10"];

      let result = AI.parser(AIs, AI, FNC1, this.barcode, startPos);

      assert.equal(result, startPos+AI.code.length+barcodeData.lotNumber.length+1);
      assert.equal(AIs[0].value, barcodeData.lotNumber);
    });

    test('Parses the barcode', function(assert) {
      let result = parseBarcode(this.barcode);

      assert.equal(result.applicationIdentifiers.length, 4);

      assert.ok(result.data);
      assert.ok(result.applicationIdentifiers);

      assert.equal(result.data[GS1ApplicationIdentifiers["01"].name], barcodeData.gtin);
      assert.equal(result.data[GS1ApplicationIdentifiers["10"].name], barcodeData.lotNumber);
      assert.equal(result.data[GS1ApplicationIdentifiers["17"].name], barcodeData.exp);
      assert.equal(result.data[GS1ApplicationIdentifiers["21"].name], barcodeData.serialNumber);
    });

  });


});
