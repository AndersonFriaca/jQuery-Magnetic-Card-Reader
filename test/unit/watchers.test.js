(function() {
  var defaultRegex = new RegExp(/(;(\d{11,16})=\d{1,}=\d{1}=\d{2}\?)?$/);
  var defaultCallback = function() {};

  var createDefaultInstance = function() {
    return $('#card').magneticCardReader({
      regExpSecondTrail: defaultRegex,
      callback: defaultCallback
    });
  };

  var getInstance = function(element) {
    if (element === undefined) {
      return createDefaultInstance().data('magnetic-card-reader-instance');
    } else {
      return element.data('magnetic-card-reader-instance');
    }
  };

  QUnit.test('Can block submit event from element initialized', function(
    assert
  ) {
    var element = createDefaultInstance();
    var preventDefault = sinon.spy();
    var stopPropagation = sinon.spy();
    var event = $.Event('submit', {
      preventDefault: preventDefault,
      stopPropagation: stopPropagation,
      originalEvent: {
        explicitOriginalTarget: element[0]
      }
    });
    element.trigger(event);
    assert.ok(preventDefault.called);
  });

  QUnit.test('Can not block submit event from another element', function(
    assert
  ) {
    var element = createDefaultInstance();
    var preventDefault = sinon.spy();
    var stopPropagation = sinon.spy();
    var event = $.Event('submit', {
      preventDefault: preventDefault,
      stopPropagation: stopPropagation,
      originalEvent: {
        explicitOriginalTarget: $('#another')[0]
      }
    });
    element.trigger(event);
    assert.ok(preventDefault.notCalled);
  });

  QUnit.test('Watch keypress', function(assert) {
    var element = createDefaultInstance();
    var eventKeyPressed = $.Event('keydown', {
      keyCode: 12,
      which: 12
    });
    element.val(';01234567890=123=1=12?');
    element.trigger(eventKeyPressed);

    assert.equal(element.val(), ';01234567890=123=1=12?');
  });

  QUnit.test('Watch enter key pressed', function(assert) {
    var element = createDefaultInstance();
    var instance = getInstance(element);
    var eventKeyEnterPressed = $.Event('keydown', {
      keyCode: 13,
      which: 13
    });
    element.val(';01234567890=123=1=12?');
    var spy = sinon.spy(instance, 'isPressedEnterKey');
    element.trigger(eventKeyEnterPressed);
    assert.ok(spy.called);
    assert.equal(element.val(), '');
  });
})();
