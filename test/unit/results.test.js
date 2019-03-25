(function() {
  var defaultFirstRegex = new RegExp(/(%(.*)\?)$/);
  var defaultSecondRegex = new RegExp(/(;(\d{11,16})=\d{1,}=\d{1}=\d{2}\?)?$/);
  var defaultThirdRegex = new RegExp(/(;(\d{4}-\d{2})\?)$/);
  var defaultEventKey = $.magneticCardReader.defaultOptions.eventKeyType;
  var defaultFirstTrailValue = '%NAME?';
  var defaultSecondTrailValue = ';01234567890=123=1=12?';
  var defaultThirdTrailValue = ';2019-03?';

  var generateEventKey = function(keyCode, eventType) {
    return $.Event(eventType || defaultEventKey, {
      keyCode: keyCode,
      which: keyCode
    });
  };

  QUnit.test('Should be receive results', function(assert) {
    var callback = sinon.spy();
    var element = $('#card').magneticCardReader({
      regExpSecondTrail: defaultSecondRegex,
      callback: callback
    });
    var clock = sinon.useFakeTimers();
    var event = generateEventKey(13);
    var firstTrailResponse = { captured: null, data: null };
    var secondTrailResponse = { captured: defaultSecondTrailValue, data: null };
    var thirdTrailResponse = { captured: null, data: null };
    element.val(defaultSecondTrailValue);
    element.trigger(event);
    clock.tick($.magneticCardReader.defaultOptions.timerLimit++);
    assert.ok(
      callback.calledWithMatch(
        {},
        firstTrailResponse,
        secondTrailResponse,
        thirdTrailResponse
      )
    );
  });

  QUnit.test('Should be receive results from all trails', function(assert) {
    var callback = sinon.spy();
    var element = $('#card').magneticCardReader({
      regExpFirstTrail: defaultFirstRegex,
      regExpSecondTrail: defaultSecondRegex,
      regExpThirdTrail: defaultThirdRegex,
      callback: callback
    });
    var clock = sinon.useFakeTimers();
    var event = generateEventKey(13);
    var firstTrailResponse = { captured: defaultFirstTrailValue, data: null };
    var secondTrailResponse = { captured: defaultSecondTrailValue, data: null };
    var thirdTrailResponse = { captured: defaultThirdTrailValue, data: null };
    element.val(defaultFirstTrailValue);
    element.trigger(event);
    element.val(defaultSecondTrailValue);
    element.trigger(event);
    element.val(defaultThirdTrailValue);
    element.trigger(event);
    clock.tick($.magneticCardReader.defaultOptions.timerLimit++);
    assert.ok(
      callback.calledWithMatch(
        {},
        firstTrailResponse,
        secondTrailResponse,
        thirdTrailResponse
      )
    );
  });

  QUnit.test(
    'Should be receive results from all trails with build data',
    function(assert) {
      var callback = sinon.spy();
      var element = $('#card').magneticCardReader({
        regExpFirstTrail: defaultFirstRegex,
        buildDataFirstTrail: function(trail) {
          var pattern = new RegExp(/(?:%(.*)\?)$/);
          var match = trail.match(pattern);
          if (match === null || match[1] === undefined) {
            return null;
          } else {
            return match[1];
          }
        },
        regExpSecondTrail: defaultSecondRegex,
        buildDataSecondTrail: function(trail) {
          var pattern = new RegExp(/(?:;(\d{11,16})=\d{1,}=\d{1}=\d{2}\?)?$/);
          var match = trail.match(pattern);
          if (match === null || match[1] === undefined) {
            return null;
          } else {
            return match[1];
          }
        },
        regExpThirdTrail: defaultThirdRegex,
        buildDataThirdTrail: function(trail) {
          var pattern = new RegExp(/(?:;(\d{4}-\d{2})\?)$/);
          var match = trail.match(pattern);
          if (match === null || match[1] === undefined) {
            return null;
          } else {
            return match[1];
          }
        },
        callback: callback
      });
      var clock = sinon.useFakeTimers();
      var event = generateEventKey(13);
      var firstTrailResponse = {
        captured: defaultFirstTrailValue,
        data: 'NAME'
      };
      var secondTrailResponse = {
        captured: defaultSecondTrailValue,
        data: '01234567890'
      };
      var thirdTrailResponse = {
        captured: defaultThirdTrailValue,
        data: '2019-03'
      };
      element.val(defaultFirstTrailValue);
      element.trigger(event);
      element.val(defaultSecondTrailValue);
      element.trigger(event);
      element.val(defaultThirdTrailValue);
      element.trigger(event);
      clock.tick($.magneticCardReader.defaultOptions.timerLimit++);
      assert.ok(
        callback.calledWithMatch(
          {},
          firstTrailResponse,
          secondTrailResponse,
          thirdTrailResponse
        )
      );
    }
  );
})();
