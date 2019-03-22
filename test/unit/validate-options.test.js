(function() {
  var defaultRegex = new RegExp(/(;(\d{11,16})=\d{1,}=\d{1}=\d{2}\?)?$/);
  var htmlInputText =
    '<input type="text" name="another-field-test" id="anothe-field-test" />';
  var htmlInputNumber =
    '<input type="number" name="test-case" id="test-case" />';
  var defaultCallback = function() {};

  QUnit.module('Validate options');

  QUnit.test('Element must be a input text', function(assert) {
    assert.throws(function() {
      var form = $('#form');
      var input = $(htmlInputNumber);
      form.append(input);
      input.magneticCardReader({
        regExpSecondTrail: defaultRegex
      });
    }, new Error('This plugin can be used only with input text'));
  });

  QUnit.test('Element must be have a parent form', function(assert) {
    assert.throws(function() {
      var input = $(htmlInputText).appendTo('body');
      input.magneticCardReader({
        regExpSecondTrail: defaultRegex
      });
    }, new Error(
      'Can not initialize MagneticCardReader plugin, must be have an parent form'
    ));
  });

  QUnit.test('Should be pass a valid allowed event key type', function(assert) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        eventKeyType: 'click'
      });
    }, new Error(
      'The value of option eventKeyType must be one of: keydown, keypress or keyup'
    ));
  });

  QUnit.test('Should be pass a regExpSecondTrail', function(assert) {
    assert.throws(function() {
      $('#card').magneticCardReader({});
    }, new Error('The option regExpSecondTrail must be provided'));
  });

  QUnit.test('The option regExpFirstTrail should be a RegExp', function(
    assert
  ) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        regExpFirstTrail: 'test'
      });
    }, new Error('The option regExpFirstTrail is not a RegExp'));
  });

  QUnit.test('The option regExpSecondTrail should be a RegExp', function(
    assert
  ) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: 'test'
      });
    }, new Error('The option regExpSecondTrail is not a RegExp'));
  });

  QUnit.test('The option regExpThirdTrail should be a RegExp', function(
    assert
  ) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        regExpThirdTrail: 'test'
      });
    }, new Error('The option regExpThirdTrail is not a RegExp'));
  });

  QUnit.test('Should be pass a callback', function(assert) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex
      });
    }, new Error('The option callback must be provided'));
  });

  QUnit.test('The option callback should be a function', function(assert) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: 'test'
      });
    }, new Error('The option callback must be a function'));
  });

  QUnit.test('The option buildDataFirstTrail should be a function', function(
    assert
  ) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: defaultCallback,
        buildDataFirstTrail: 'test'
      });
    }, new Error('The options buildDataFirstTrail must be a function'));
  });

  QUnit.test('The option buildDataSecondTrail should be a function', function(
    assert
  ) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: defaultCallback,
        buildDataSecondTrail: 'test'
      });
    }, new Error('The options buildDataSecondTrail must be a function'));
  });

  QUnit.test('The option buildDataThirdTrail should be a function', function(
    assert
  ) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: defaultCallback,
        buildDataThirdTrail: 'test'
      });
    }, new Error('The options buildDataThirdTrail must be a function'));
  });

  QUnit.test('The option animationOnInit should be a function', function(
    assert
  ) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: defaultCallback,
        animationOnInit: 'test'
      });
    }, new Error('The option animationOnInit must be a function'));
  });

  QUnit.test('The option animationOnComplete should be a function', function(
    assert
  ) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: defaultCallback,
        animationOnComplete: 'test'
      });
    }, new Error('The option animationOnComplete must be a function'));
  });

  QUnit.test('The option colorToHide could not should be a null', function(
    assert
  ) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: defaultCallback,
        colorToHide: null
      });
    }, new Error(
      'The option colorToHide must be a valid color or empty string'
    ));
  });

  QUnit.test('The option colorToHide should be a string', function(assert) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: defaultCallback,
        colorToHide: 123
      });
    }, new Error(
      'The option colorToHide must be a valid color or empty string'
    ));
  });

  QUnit.test('The option colorToHide should be a valid color', function(
    assert
  ) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: defaultCallback,
        colorToHide: 'cFFF'
      });
    }, new Error(
      'The option colorToHide must be a valid color or empty string'
    ));
  });

  QUnit.test('The option colorToShow could not should be a null', function(
    assert
  ) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: defaultCallback,
        colorToShow: null
      });
    }, new Error(
      'The option colorToShow must be a valid color or empty string'
    ));
  });

  QUnit.test('The option colorToShow should be a string', function(assert) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: defaultCallback,
        colorToShow: 123
      });
    }, new Error(
      'The option colorToShow must be a valid color or empty string'
    ));
  });

  QUnit.test('The option colorToShow should be a valid color', function(
    assert
  ) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: defaultCallback,
        colorToShow: 'cFFF'
      });
    }, new Error(
      'The option colorToShow must be a valid color or empty string'
    ));
  });

  QUnit.test(
    'The option styleCursorOnInit could not should be a null',
    function(assert) {
      assert.throws(function() {
        $('#card').magneticCardReader({
          regExpSecondTrail: defaultRegex,
          callback: defaultCallback,
          styleCursorOnInit: null
        });
      }, new Error('The option styleCursorOnInit must be a string'));
    }
  );

  QUnit.test('The option styleCursorOnInit should be a string', function(
    assert
  ) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: defaultCallback,
        styleCursorOnInit: 123
      });
    }, new Error('The option styleCursorOnInit must be a string'));
  });

  QUnit.test('The option timerLimit could not should be a null', function(
    assert
  ) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: defaultCallback,
        timerLimit: null
      });
    }, new Error('The option timerLimit must be a number'));
  });

  QUnit.test('The option timerLimit should be a number', function(assert) {
    assert.throws(function() {
      $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: defaultCallback,
        timerLimit: '123a'
      });
    }, new Error('The option timerLimit must be a number'));
  });
})();
