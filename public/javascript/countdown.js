Tranquil['countdown'] = function(obj) {
  var div = this;
  obj.filter = eval('(' + (obj.filter || 'Object') + ')')
  div.update = function() {
    reqwest({
      url: obj.url,
      type: 'jsonp',
      success: function(data) {
        data = obj.filter(data);
        div.innerHTML = Milk.render(obj.template, data);
      },
    });
  };
  div.update();
  setInterval(div.update, obj.interval || 1000 * 60 * 60);
};
