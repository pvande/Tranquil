Tranquil['calendar'] = Tranquil.buildPanel((60).seconds(), function(obj, data) {
  if (!this.childNodes.length) {
    this.appendChild(document.createElement('div'));
    this.appendChild(document.createElement('div'));
  }

  var tmpl = obj.template || {};
  if (!('title' in tmpl)) { tmpl.title = '{{title}}' };
  if (!('event' in tmpl)) { tmpl.event = '{{.}}' };
  var events = '{{#events}}<div>' + tmpl.event + '</div>{{/events}}';

  this.firstChild.innerHTML = Milk.render(tmpl.title, data);
  this.lastChild.innerHTML = Milk.render(events, data);
});
