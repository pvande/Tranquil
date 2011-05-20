Tranquil['chart'] = function(obj) {
  var div = this;
  div.innerHTML = Milk.render(
    '<table><tr>'+
      '{{#.}}<td><table>' +
      '<tr><td>' + (obj.info || '{{info}}') + '</td></tr>' +
      '<tr><td class="bar" style="height: {{percentage}}%; background-color: {{color}}"></td></tr>' +
    '</table></td>{{/.}}' +
    '</tr><tfoot><tr>' +
      '{{#.}}<td>' + (obj.title || '{{title}}') + '</td>{{/.}}' +
    '</tr></tfoot></table>', (obj.data || []));
};
