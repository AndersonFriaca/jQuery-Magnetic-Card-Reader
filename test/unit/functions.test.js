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

  QUnit.module('Functions');

  QUnit.test('Should be able to generate event name', function(assert) {
    assert.equal(
      getInstance().generateEventName('test'),
      'test.magnetic-card-reader'
    );
  });

  QUnit.test('Should be a dispatch event', function(assert) {
    var callback = sinon.spy();
    var element = createDefaultInstance();
    element.on(getInstance(element).generateEventName('test'), callback);
    getInstance(element).dispatchEvent('test', true);
    assert.ok(callback.called);
  });

  QUnit.test('Should be able to clear informations of captured data', function(
    assert
  ) {
    var element = createDefaultInstance();
    getInstance(element).clearInformations();
    assert.ok(getInstance(element).captured.firstTrail === null);
    assert.ok(getInstance(element).captured.secondTrail === null);
    assert.ok(getInstance(element).captured.thirdTrail === null);
  });

  QUnit.test('Should be able to capture a trail', function(assert) {
    assert.equal(
      getInstance().captureTrail(defaultRegex, ';01234567890=123=1=12?'),
      ';01234567890=123=1=12?'
    );
  });

  QUnit.test('Should be able to return null on invalid capture trail', function(
    assert
  ) {
    assert.equal(
      getInstance().captureTrail(defaultRegex, 'a01234567890=123=1=12?'),
      null
    );
  });

  QUnit.test('Should be able to return null on invalid regex for trail', function(
    assert
  ) {
    assert.equal(
      getInstance().captureTrail(new RegExp(/(;(\d{4}-\d{2})\?)$/), 'a01234567890=123=1=12?'),
      null
    );
  });

  QUnit.test('Is RegExp', function(assert) {
    assert.ok(getInstance().isRegExp(defaultRegex));
    assert.notOk(getInstance().isRegExp(null));
    assert.notOk(getInstance().isRegExp({}));
  });

  QUnit.test('Is pressed enter key', function(assert) {
    var eventEnterKey = new Event('keypress');
    eventEnterKey.keyCode = 13;
    eventEnterKey.which = 13;
    assert.ok(getInstance().isPressedEnterKey(eventEnterKey));

    var anotherKey = new Event('keypress');
    anotherKey.keyCode = 50;
    anotherKey.which = 50;
    assert.notOk(getInstance().isPressedEnterKey(anotherKey));
  });
})();
