QUnit.module('Validate options');

QUnit.test('Should be pass a regExpSecondTrail', function(assert) {
  assert.throws(function() {
    $('#card').magneticCardReader({});
  }, new Error('The option regExpSecondTrail must be provided'));
});
