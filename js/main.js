(function (window, $, _) {
  var templates = loadTemplates();
  var citiesList = $('#cities-list');
  var citiesURL = $.librarian.files.url('weather/cities.json');
  var dataURL = $.librarian.files.url('weather/weather.json');
  var weatherData;
  var xhr;
  
  // --------->
  // START
  // --------->

  citiesList.change(citySelected);
  xhr = $.getJSON(dataURL)
  xhr.done(dataLoaded);
  xhr.fail(dataError);

  // Functions

  function dataLoaded(data) {
    var xhr;
    weatherData = data;

    xhr = $.getJSON(citiesURL);
    xhr.done(populateCities);
    xhr.fail(citiesError);
  }

  function dataError() {
    citiesList.html(errorOption);
  }

  function populateCities(data) {
    var html = templates.empty;

    data.sort();
    html += _(data).map(function (city) {
      return _.template(templates.option, {city: city});
    }).join('');
    citiesList.html(html);
    $(window).trigger('citiesLoaded');
  }

  function citiesError() {
    citiesList.html(templates.error);
  }

  function citySelected() {
    var html;
    var city = citiesList.val();
    var forecast = weatherData[city];
    var reports = _(forecast).map(function (f) {
      return weatherReport(f);  
    });

    var todayReport = reports.find(function (report) {
      return timeutils.isToday(report.timestamp);
    });
    if (todayReport == null) {
      $('#today').text('No report data for today');
    } else {
      $('#today').html(_.template(templates.report, {
        report: todayReport,
        day: 'today',
      }));
    }

    var forecastReports = reports.filter(function (report) {
      return timeutils.isAfterToday(report.timestamp);
    }).valueOf().slice(0, 6);

    if (forecastReports.length) {
      html = _.map(forecastReports, function (report) {
        return _.template(templates.forecastDay, {report: report});
      }).join('');
    } else {
      html = templates.noForecasts;
    }

    $('#forecast').html(html);
  }

  function loadTemplates() {
    var templates = {};
    $('script[type="text/template"]').each(function () {
      var el = $(this);
      var name = el.attr('id');
      templates[name] = $.trim(el.html());
    });
    return templates;
  }

}(this, jQuery, _));
