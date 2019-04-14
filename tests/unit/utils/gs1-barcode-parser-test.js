import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import gs1BarcodeParser from 'ember-barcode-input/utils/gs1-barcode-parser';

module('Unit | Utility | gs1-barcode-parser', function(hooks) {
  setupTest(hooks);

  test("Keys To Code", function(assert){

    let keyEvents = [
      {
        which: 50,
        location: 0
      },
      {
        which: 49,
        location: 0
      },
      {
        which: 97,
        location: 0
      },
      {
        which: 98,
        location: 0
      },
      {
        which: 99,
        location: 0
      },
      {
        which: 48,
        location: 3
      },
      {
        which: 48,
        location: 3
      },
      {
        which: 50,
        location: 3
      },
      {
        which: 57,
        location: 3
      },
      {
        which: 48,
        location: 0
      },
      {
        which: 49,
        location: 0
      },
      {
        which: 97,
        location: 0
      },
      {
        which: 98,
        location: 0
      },
      {
        which: 99,
        location: 0
      },
    ];

    let code = gs1BarcodeParser.keysToBarcode(keyEvents, ['3048304830503057'], gs1BarcodeParser.FNC1Code);
    let expected = `21abc${gs1BarcodeParser.FNC1}01abc`;
    assert.equal(code, expected);

  });

  test("AIs to Data", function(assert) {
    let AI_01 = gs1BarcodeParser.findAI("01");
    let value = "hello";
    let AIs = [
      {
        AI: AI_01,
        value
      }
    ];

    let data = gs1BarcodeParser.AIsToData(AIs);

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
      this.barcode = `01003617550050242116708357803969${gs1BarcodeParser.FNC1}17190831108148200167`;
    });

    test('GTIN Parser', function(assert) {
      let AIs = [];
      let startPos = 0;

      let AI = gs1BarcodeParser.findAI("01");

      let result = AI.parser(AIs, AI, this.barcode, startPos);

      assert.equal(result, startPos+AI.code.length+AI.length);
      assert.equal(AIs[0].value, barcodeData.gtin);
    });

    test('Expiration Date Parser', function(assert) {
      let AIs = [];
      let startPos = 33;

      let AI = gs1BarcodeParser.findAI("17");

      let result = AI.parser(AIs, AI, this.barcode, startPos);

      assert.equal(result, startPos+AI.code.length+AI.length);
      assert.equal(AIs[0].value, barcodeData.exp);
    });

    test('Serial Number Parser', function(assert) {
      let AIs = [];
      let startPos = 16;

      let AI = gs1BarcodeParser.findAI("21");

      let result = AI.parser(AIs, AI, this.barcode, startPos);

      assert.equal(result, startPos+AI.code.length+barcodeData.serialNumber.length+1);
      assert.equal(AIs[0].value, barcodeData.serialNumber);
    });

    test('Lot Number Parser', function(assert) {
      let AIs = [];
      let startPos = 41;

      let AI = gs1BarcodeParser.findAI("10");

      let result = AI.parser(AIs, AI,this.barcode, startPos);

      assert.equal(result, startPos+AI.code.length+barcodeData.lotNumber.length+1);
      assert.equal(AIs[0].value, barcodeData.lotNumber);
    });

    test('Parses the barcode', function(assert) {
      let result = gs1BarcodeParser.parseBarcode(this.barcode);

      assert.equal(4, result.length);

      let check = function(a, code, value) {
        let AI = a.find(item => {
          return item.AI.code === code;
        });

        assert.equal(AI.value, value);
      };

      check(result,"01", barcodeData.gtin);
      check(result,"10", barcodeData.lotNumber);
      check(result,"17", barcodeData.exp);
      check(result,"21", barcodeData.serialNumber);
    });

  });


});
