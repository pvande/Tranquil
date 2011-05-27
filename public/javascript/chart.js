Tranquil['chart'] = Tranquil.buildPanel((1).minute(), function(obj, data) {
  var parts = { info: '{{info}}', title: '{{title}}', bar: '' };

  parts.bar += '<table>';
  parts.bar += '<tr><td>{{>info}}</td></tr>';
  parts.bar += '<tr><td class="bar" style="{{>style}}"></td></tr>';
  parts.bar += '</table>';
  parts.style = 'height: {{percentage}}%; background-color: {{color}}';

  if (obj.template && obj.template.info)  { parts.info  = obj.template.info  }
  if (obj.template && obj.template.title) { parts.title = obj.template.title }

  var template = '';
  template += '<table>';
  template += '<tr>{{#.}}<td>{{>bar}}</td>{{/.}}</tr>';
  template += '<tfoot><tr>{{#.}}<td>{{>title}}</td>{{/.}}</tr></tfoot>';
  template += '</table>';

  this.innerHTML = Milk.render(template, data, parts);
});
