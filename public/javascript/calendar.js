Tranquil['calendar'] = Tranquil.buildPanel((60).seconds(), function(obj, data) {
  obj.template.__proto__ = {
    title: '{{title}}',
    event: '{{.}}',
  };

  var tmpl = '<div>{{>title}}</div>';
  tmpl    += '<div>{{#events}}<div>{{>event}}</div>{{/events}}</div>';
  this.innerHTML = Milk.render(tmpl, data, obj.template);
});
