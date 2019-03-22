(function() {
  var defaultRegex = new RegExp(/(;(\d{11,16})=\d{1,}=\d{1}=\d{2}\?)?$/);
  var defaultCallback = function() {};

  var createDefaultInstance = function() {
    return $('#card').magneticCardReader({
      regExpSecondTrail: defaultRegex,
      callback: defaultCallback
    });
  };

  QUnit.module('Creation of instance');

  QUnit.test('Should be able to create instance from a element', function(
    assert
  ) {
    assert.ok(createDefaultInstance()[0] === $('#card')[0]);
  });

  QUnit.test(
    'Should be able to create instance from a static instance of jQuery',
    function(assert) {
      assert.ok(
        $.magneticCardReader($('#card'), {
          regExpSecondTrail: defaultRegex,
          callback: defaultCallback
        })
      );
    }
  );

  QUnit.test(
    'Should be able to create a unique instance on each element',
    function(assert) {
      assert.ok(createDefaultInstance()[0] === createDefaultInstance()[0]);
    }
  );
})();
