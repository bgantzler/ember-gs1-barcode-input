import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | barcode-input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{barcode-input}}`);

    assert.equal(this.element.textContent.trim(), '');

  });

  // test("Keys To Code", function(assert){
  //
  //   let keyEvents = [
  //     {
  //       which: 50,
  //       location: 0
  //     },
  //     {
  //       which: 49,
  //       location: 0
  //     },
  //     {
  //       which: 97,
  //       location: 0
  //     },
  //     {
  //       which: 98,
  //       location: 0
  //     },
  //     {
  //       which: 99,
  //       location: 0
  //     },
  //     {
  //       which: 48,
  //       location: 3
  //     },
  //     {
  //       which: 48,
  //       location: 3
  //     },
  //     {
  //       which: 50,
  //       location: 3
  //     },
  //     {
  //       which: 57,
  //       location: 3
  //     },
  //     {
  //       which: 48,
  //       location: 0
  //     },
  //     {
  //       which: 49,
  //       location: 0
  //     },
  //     {
  //       which: 97,
  //       location: 0
  //     },
  //     {
  //       which: 98,
  //       location: 0
  //     },
  //     {
  //       which: 99,
  //       location: 0
  //     },
  //   ];
  //
  //   let code = gs1BarcodeParser.keysToBarcode(keyEvents, ['3048304830503057'], gs1BarcodeParser.FNC1Code);
  //   let expected = `21abc${gs1BarcodeParser.FNC1}01abc`;
  //   assert.equal(code, expected);
  //
  // });

});
