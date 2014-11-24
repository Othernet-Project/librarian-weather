(function (window) {
  window.timeutils = {
    _today: null,
    _tomorrow: null,

    getToday: function () {
      var dt;
      if (this._today == null) {
        dt = new Date();
        dt.setHours(0);
        dt.setMinutes(0);
        dt.setSeconds(0);
        dt.setMilliseconds(0);
        this._today = dt;
      }
      // Always create a copy, even when returning a cached version, so that we
      // can freely manipulate the copy afterwards without messing up the
      // cached value.
      return new Date(this._today.getTime());
    },

    getDaysOffset: function (dt, n) {
      dt.setDate(dt.getDate() + n);
      return dt;
    },

    getTomorrow: function () {
      var dt;
      if (this._tomorrow == null) {
        dt = this.getDaysOffset(this.getToday(), 1);
        this._tomorrow = dt;
      }
      return new Date(this._tomorrow.getTime());
    },

    isToday: function (dt) {
      var dtmin = (this.getToday()).getTime();
      var dtmax = (this.getTomorrow()).getTime();
      var dttime = dt.getTime();
      return dttime >= dtmin && dttime <= dtmax;
    },

    isAfterToday: function (dt) {
      var dtmin = (this.getTomorrow()).getTime();
      return dt.getTime() >= dtmin;
    }
  };
}(this));
