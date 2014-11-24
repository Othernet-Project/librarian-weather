(function (window) {
  var clock = $('#clock');

  setInterval(updateTime, 1000);
  updateTime();

  function updateTime () {
    var ts = new Date();
    clock.text(strftime('%A, %d %B %Y %H:%M', ts));
  };
}(this));
