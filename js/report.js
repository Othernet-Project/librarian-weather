(function (window, $) {
  var WEEKDAYS = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ');

  function Report (data) {
    var weather = data.weather[0];
    this.timestamp = new Date(data.dt * 1000);
    this.weather = weather.main;
    this.description = weather.description;
    this.icon = weather.icon.slice(0, 2);
    this.humidity = data.humidity;
    this.pressure = data.pressure;
    this.temps = data.temp;
  }

  Report.prototype.tempRound = function (temp) {
    return Math.round(temp * 10) / 10;
  };

  Report.prototype.tempC = function (key) {
    return this.tempRound(this.temps[key]);
  };

  Report.prototype.tempF = function (key) {
    return this.tempRound(this.temps[key] * 1.8 + 32);
  };

  Report.prototype.iconPath = function () {
    return 'icons/' + this.icon + this.timeOfDay() + '.png';
  };

  Report.prototype.timeOfDay = function () {
    var hour = (new Date()).getHours();
    return (hour > 4 && hour < 19) ? 'd' : 'n';
  };

  window.weatherReport = function (datapoint) {
    return new Report(datapoint);
  };
}(this, jQuery));
