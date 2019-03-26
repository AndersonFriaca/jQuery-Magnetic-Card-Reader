(function() {
  var defaultRegex = new RegExp(/(;(\d{11,16})=\d{1,}=\d{1}=\d{2}\?)?$/);
  var defaultCallback = function() {};
  var defaultEventKey = $.magneticCardReader.defaultOptions.eventKeyType;
  var defaultTrailValue = ';01234567890=123=1=12?';

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

  var generateEventKey = function(keyCode, eventType) {
    return $.Event(eventType || defaultEventKey, {
      keyCode: keyCode,
      which: keyCode
    });
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
    var instance = getInstance(element);
    var eventKeyPressed = generateEventKey(12);
    element.val(';01234567890=123=1=12?');
    var spyIsPressedEnterKey = sinon.spy(instance, 'isPressedEnterKey');
    var spyInitTimeout = sinon.spy(instance, 'initTimeout');
    element.trigger(eventKeyPressed);
    assert.ok(spyIsPressedEnterKey.withArgs(eventKeyPressed).calledOnce);
    assert.ok(spyInitTimeout.notCalled);
    assert.equal(element.val(), ';01234567890=123=1=12?');
  });

  QUnit.test('Watch enter key pressed', function(assert) {
    var element = createDefaultInstance();
    var instance = getInstance(element);
    var eventKeyEnterPressed = generateEventKey(13);
    element.val(defaultTrailValue);
    var spyIsPressedEnterKey = sinon.spy(instance, 'isPressedEnterKey');
    var spyInitTimeout = sinon.spy(instance, 'initTimeout');
    var spyCaptureTrail = sinon.spy(instance, 'captureTrail');
    element.trigger(eventKeyEnterPressed);
    assert.ok(spyIsPressedEnterKey.called);
    assert.ok(spyInitTimeout.called);
    if (
      instance.captured.firstTrail === null &&
      instance.options.regExpFirstTrail
    ) {
      assert.ok(
        spyCaptureTrail.withArgs(
          instance.options.regExpFirstTrail,
          defaultTrailValue
        ).calledOnce
      );
    } else {
      assert.notOk(
        spyCaptureTrail.withArgs(
          instance.options.regExpFirstTrail,
          defaultTrailValue
        ).calledOnce
      );
    }
    assert.equal(element.val(), '');
  });

  QUnit.test('Can be captured first trail if not captured', function(assert) {
    var trail = '%NAME?';
    var element = $('#card').magneticCardReader({
      regExpFirstTrail: new RegExp(/(%(.*)?)/),
      regExpSecondTrail: defaultRegex,
      callback: defaultCallback
    });
    var instance = getInstance(element);
    var eventKeyEnterPressed = generateEventKey(13);
    var spyCaptureTrail = sinon.spy(instance, 'captureTrail');
    element.val(trail);
    element.trigger(eventKeyEnterPressed);
    assert.notEqual(instance.captured.firstTrail, null);
    assert.ok(
      spyCaptureTrail.withArgs(instance.options.regExpFirstTrail, trail)
        .calledOnce
    );
    element.trigger(eventKeyEnterPressed);
    assert.ok(
      spyCaptureTrail.withArgs(instance.options.regExpFirstTrail, trail)
        .calledOnce
    );
  });

  QUnit.test('Can be captured first trail only if not captured', function(
    assert
  ) {
    var trail = '%NAME?';
    var element = $('#card').magneticCardReader({
      regExpFirstTrail: new RegExp(/(;(.*)?)/),
      regExpSecondTrail: defaultRegex,
      callback: defaultCallback
    });
    var instance = getInstance(element);
    var eventKeyEnterPressed = generateEventKey(13);
    var spyCaptureTrail = sinon.spy(instance, 'captureTrail');
    element.val(trail);
    element.trigger(eventKeyEnterPressed);
    assert.equal(instance.captured.firstTrail, null);
    assert.ok(
      spyCaptureTrail.withArgs(instance.options.regExpFirstTrail, trail).called
    );
    element.trigger(eventKeyEnterPressed);
    assert.ok(
      spyCaptureTrail.withArgs(instance.options.regExpFirstTrail, trail)
        .calledOnce
    );
  });

  QUnit.test('Can be captured second trail if not captured', function(assert) {
    var element = createDefaultInstance();
    var instance = getInstance(element);
    var eventKeyEnterPressed = generateEventKey(13);
    var spyCaptureTrail = sinon.spy(instance, 'captureTrail');
    element.val(defaultTrailValue);
    element.trigger(eventKeyEnterPressed);
    assert.notEqual(instance.captured.secondTrail, null);
    element.trigger(eventKeyEnterPressed);
    assert.ok(
      spyCaptureTrail.withArgs(
        instance.options.regExpSecondTrail,
        defaultTrailValue
      ).calledOnce
    );
  });

  QUnit.test('Can be captured third trail if not captured', function(assert) {
    var trail = '%NAME?';
    var element = $('#card').magneticCardReader({
      regExpThirdTrail: new RegExp(/(%(.*)?)/),
      regExpSecondTrail: defaultRegex,
      callback: defaultCallback
    });
    var instance = getInstance(element);
    var eventKeyEnterPressed = generateEventKey(13);
    var spyCaptureTrail = sinon.spy(instance, 'captureTrail');
    element.val(trail);
    element.trigger(eventKeyEnterPressed);
    assert.notEqual(instance.captured.thirdTrail, null);
    assert.ok(
      spyCaptureTrail.withArgs(instance.options.regExpThirdTrail, trail).called
    );
    element.trigger(eventKeyEnterPressed);
    assert.ok(
      spyCaptureTrail.withArgs(instance.options.regExpThirdTrail, trail)
        .calledOnce
    );
  });

  QUnit.test('Can be captured third trail only if not captured', function(assert) {
    var trail = '%NAME?';
    var element = $('#card').magneticCardReader({
      regExpThirdTrail: new RegExp(/(;(.*)?)/),
      regExpSecondTrail: defaultRegex,
      callback: defaultCallback
    });
    var instance = getInstance(element);
    var eventKeyEnterPressed = generateEventKey(13);
    var spyCaptureTrail = sinon.spy(instance, 'captureTrail');
    element.val(trail);
    element.trigger(eventKeyEnterPressed);
    assert.equal(instance.captured.thirdTrail, null);
    assert.ok(
      spyCaptureTrail.withArgs(instance.options.regExpThirdTrail, trail).called
    );
    element.trigger(eventKeyEnterPressed);
    assert.ok(
      spyCaptureTrail.withArgs(instance.options.regExpThirdTrail, trail)
        .calledOnce
    );
  });

  QUnit.test('Can not build data if has not taken', function(assert) {
    var buildDataFirstTrailCallback = sinon.spy();
    var buildDataSecondTrailCallback = sinon.spy();
    var buildDataThirdTrailCallback = sinon.spy();
    var element = $('#card').magneticCardReader({
      regExpFirstTrail: new RegExp(/(%(.*)?)/),
      regExpSecondTrail: defaultRegex,
      callback: defaultCallback,
      buildDataFirstTrail: buildDataFirstTrailCallback,
      buildDataSecondTrail: buildDataSecondTrailCallback,
      buildDataThirdTrail: buildDataThirdTrailCallback
    });
    var captured = {
      firstTrail: null,
      secondTrail: null,
      thirdTrail: null
    };
    element.trigger('completed.magnetic-card-reader', captured);
    assert.ok(buildDataFirstTrailCallback.notCalled);
    assert.ok(buildDataSecondTrailCallback.notCalled);
    assert.ok(buildDataThirdTrailCallback.notCalled);
  });

  QUnit.test('Can build trail data if has taken', function(assert) {
    var buildDataFirstTrailCallback = sinon.spy();
    var buildDataSecondTrailCallback = sinon.spy();
    var buildDataThirdTrailCallback = sinon.spy();
    var element = $('#card').magneticCardReader({
      regExpFirstTrail: new RegExp(/(%(.*)\?)/),
      regExpSecondTrail: defaultRegex,
      regExpThirdTrail: new RegExp(/(;(\d{4}-\d{2})?)/),
      callback: defaultCallback,
      buildDataFirstTrail: buildDataFirstTrailCallback,
      buildDataSecondTrail: buildDataSecondTrailCallback,
      buildDataThirdTrail: buildDataThirdTrailCallback
    });
    var captured = {
      firstTrail: '%NAME?',
      secondTrail: defaultTrailValue,
      thirdTrail: ';2019-03?'
    };
    element.trigger('completed.magnetic-card-reader', captured);
    assert.ok(buildDataFirstTrailCallback.called);
    assert.ok(buildDataSecondTrailCallback.called);
    assert.ok(buildDataThirdTrailCallback.called);
  });

  QUnit.test(
    'Should be can animate the element when init with default option',
    function(assert) {
      var element = createDefaultInstance();
      var instance = getInstance(element);
      var event = generateEventKey(13);
      var spyAnimationOnInit = sinon.spy(instance, 'animationOnInitDefault');
      element.val(defaultTrailValue);
      element.trigger(event);
      assert.ok(spyAnimationOnInit.calledOnce);
    }
  );

  QUnit.test(
    'Should be can animate the element when init with option',
    function(assert) {
      var animationOnInitCallback = sinon.spy();
      var element = $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: defaultCallback,
        animationOnInit: animationOnInitCallback
      });
      var event = generateEventKey(13);
      element.val(defaultTrailValue);
      element.trigger(event);
      assert.ok(animationOnInitCallback.calledOnce);
    }
  );

  QUnit.test(
    'Should be can animate the element when complete with default option',
    function(assert) {
      var element = createDefaultInstance();
      var instance = getInstance(element);
      var event = generateEventKey(13);
      var clock = sinon.useFakeTimers();
      var spyAnimationOnComplete = sinon.spy(
        instance,
        'animationOnCompleteDefault'
      );
      element.val(defaultTrailValue);
      element.trigger(event);
      clock.tick($.magneticCardReader.defaultOptions.timerLimit++);
      assert.ok(spyAnimationOnComplete.calledOnce);
    }
  );

  QUnit.test(
    'Should be can animate the element when complete with option',
    function(assert) {
      var animationOnCompleteCallback = sinon.spy();
      var element = $('#card').magneticCardReader({
        regExpSecondTrail: defaultRegex,
        callback: defaultCallback,
        animationOnComplete: animationOnCompleteCallback
      });
      var clock = sinon.useFakeTimers();
      var event = generateEventKey(13);
      element.val(defaultTrailValue);
      element.trigger(event);
      clock.tick($.magneticCardReader.defaultOptions.timerLimit++);
      assert.ok(animationOnCompleteCallback.calledOnce);
    }
  );
})();
