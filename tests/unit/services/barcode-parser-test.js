import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | barcode-parser', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:barcode-parser');
    assert.ok(service);
  });
});
