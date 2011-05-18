Tranquil['ticker'] = function(obj) {
  var div = this;
  var ticker = document.createElement('div');
  ticker.className = 'ticker';
  div.appendChild(ticker);

  var error = "Could not read from " + obj.url;
  ticker.innerHTML = '<span class="error">[' + error + ']</span>';

  var url = 'http://github.com/pvande/Milk/raw/master/dist/v1.2.0/milk.min.js';
  requireJavascript(url, function() {
    reqwest({
      url: obj.url + '?callback=?',
      type: 'jsonp',
      success: function(data) {
        ticker.removeChild(ticker.childNodes[0]);
        var tmpl = '{{#.}}' + obj.template + '{{/.}}';
        ticker.innerHTML += Milk.render(tmpl, data);
      }
    });
  });
};
