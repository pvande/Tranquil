Tranquil['chart'] = function(obj) {
  var div = this;
  obj.filter = eval('(' + (obj.filter || 'Object') + ')')
  div.update = function() {
    reqwest({
      url: obj.url,
      type: 'jsonp',
      success: function(data) {
        data = obj.filter(data);
        var style = 'height: {{percentage}}%; background-color: {{color}}';
        div.innerHTML = Milk.render(
          '<table><tr>'+
            '{{#.}}<td><table>' +
            '<tr><td>' + (obj.info || '{{info}}') + '</td></tr>' +
            '<tr><td class="bar" style="' + style + '"></td></tr>' +
          '</table></td>{{/.}}' +
          '</tr><tfoot><tr>' +
            '{{#.}}<td>' + (obj.title || '{{title}}') + '</td>{{/.}}' +
          '</tr></tfoot></table>', data);
      },
    });
  };
  div.update();
  setInterval(div.update, obj.interval || 60000);
};
