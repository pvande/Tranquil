Tranquil['calendar'] = Tranquil.buildPanel((1).minute(), function(obj, data) {
  (obj.template = obj.template || {}).__proto__ = Tranquil['calendar'].template;

  var tmpl = '<div>{{>title}}</div>';
  tmpl    += '<div>{{#events}}<div>{{>event}}</div>{{/events}}</div>';
  this.innerHTML = Milk.render(tmpl, data, obj.template);
});

Tranquil['calendar'].stylesheet = '/stylesheets/layout/calendar.css';

Tranquil['calendar'].template = {
  title: '{{title}}',
  event: '{{.}}',
};
