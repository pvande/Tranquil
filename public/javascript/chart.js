Tranquil['chart'] = Tranquil.buildPanel((1).minute(), function(obj, data) {
  (obj.template = obj.template || {}).__proto__ = Tranquil['chart'].template;
  Tranquil['chart'].template.__proto__ = {
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

Tranquil['chart'].stylesheet = '/stylesheets/layout/chart.css';
Tranquil['chart'].javascript = '/javascript/vendor/milk.min.js';

Tranquil['chart'].template = {
  title: '{{title}}',
  info: '{{info}}',
};
