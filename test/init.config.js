(function() {
  var formDom;

  function createForm() {
    var form = $('<form id="form">');
    var inputCard = $('<input name="card" id="card" />');
    var anotherField = $('<input name="another" id="another" />');
    var submitButton = $('<button type="submit">Send</button>');
    formDom = form
      .append(inputCard)
      .append(anotherField)
      .append(submitButton);

    formDom.appendTo('body');
  }
  QUnit.testStart(function() {
    createForm();
  });

  QUnit.testDone(function() {
    formDom.remove();
    formDom = null;
  });
})();
