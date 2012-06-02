Tranquil['dynamic'] = Tranquil.buildPanel((1).minute(), function(obj, data) {
  (obj.template = obj.template || {}).__proto__ = Tranquil['dynamic'].template;
  this.innerHTML = Milk.render("{{>content}}", data, obj.template);
});

Tranquil['dynamic'].template = {
  content: 'Override <tt>template.content</tt> to hide this message.',
};