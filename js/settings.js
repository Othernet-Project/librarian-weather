(function () {
  var C = 'celsius';
  var F = 'fahrenheit';

  var cButton = $('#' + C);
  var fButton = $('#' + F);
  var citySel = $('#cities-list');
  var mainPanel = $('#main');

  $(window).on('citiesLoaded', restoreCity);
  restoreUnits();

  citySel.change(rememberCity);
  cButton.click(switchCelsius);
  fButton.click(switchFahrenheit);
  
  function restoreCity() {
    var stored = memento.get('city');
    if (stored == null) { return; }
    citySel.val(stored);
    citySel.change();
  }

  function restoreUnits() {
    var units = memento.get('units');
    if (units === C || units == null) {
      switchCelsius();
    } else {
      switchFahrenheit();
    }
  }

  function rememberCity() {
    var city = citySel.val();
    memento.set('city', city);
  }

  function switchCelsius() {
    fButton.prop('disabled', false);
    cButton.prop('disabled', true);
    mainPanel.removeClass(F).addClass(C);
    memento.set('units', C);
  }

  function switchFahrenheit() {
    fButton.prop('disabled', true);
    cButton.prop('disabled', false);
    mainPanel.removeClass(C).addClass(F);
    memento.set('units', F);
  }
}(this));
