requirejs(["jquery", "jquery.magnetic-card-reader"], function($) {
  QUnit.module('RequireJS');
  QUnit.test("Integration with RequireJS", function(assert) {
    assert.ok(!!$.fn.magneticCardReader, "Should load the plugin via RequireJS");
  });
});
