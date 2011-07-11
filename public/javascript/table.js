Tranquil['table'] = Tranquil.buildPanel((1).minute(), function(obj, data) {
  (obj.template = obj.template || {}).__proto__ = {
    cells: [],
    _content: '<table>{{>_row}}</table>',
  };

  obj.template.__proto__._row = Milk.render(
    '{{=| |=}}|#tr|{{#|&.|}}<tr>|#td|<td>|&.|</td>|/td|</tr>{{/|&.|}}|/tr|',
    { tr: (obj.keys || []), td: obj.template.cells }
  );

  this.innerHTML = Milk.render("{{>_content}}", data, obj.template);
});
