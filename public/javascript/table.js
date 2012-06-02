Tranquil['table'] = Tranquil.buildPanel((1).minute(), function(obj, data) {
  (obj.template = obj.template || {}).__proto__ = Tranquil['table'].template;

  obj.template.__proto__ = {
    _content: '<table>{{>_row}}</table>',
    _row: Milk.render(
      '{{=| |=}}|#tr|{{#|&.|}}<tr>|#td|<td>|&.|</td>|/td|</tr>{{/|&.|}}|/tr|',
      { tr: (obj.keys || []), td: obj.template.cells }
    ),
  };

  this.innerHTML = Milk.render("{{>_content}}", data, obj.template);
});

Tranquil['table'].template = {
  cells: [],
};
