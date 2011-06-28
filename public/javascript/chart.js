Tranquil['chart'] = Tranquil.buildPanel((1).minute(), function(obj, data) {
  (obj.template = obj.template || {}).__proto__ = {
    title: '{{title}}',
    info: '{{info}}',
    _bar: '<table style="height: {{percentage}}%">' +
         '<tr><td class="info">{{>info}}</td></tr>' +
         '<tr><td class="bar"></td></tr>' +
         '</table>',
  };

  var template = '<table>' +
                 '<tr>{{#.}}<td>{{>_bar}}</td>{{/.}}</tr>' +
                 '<tfoot>' +
                 '<tr>{{#.}}<td class="title">{{>title}}</td>{{/.}}</tr>' +
                 '</tfoot>' +
                 '</table>';

  this.innerHTML = Milk.render(template, data, obj.template);
});
